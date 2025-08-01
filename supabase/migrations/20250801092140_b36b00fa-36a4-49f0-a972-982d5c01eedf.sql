
-- Create enum for conversion types
CREATE TYPE conversion_type AS ENUM (
  'pdf_compress',
  'pdf_merge',
  'pdf_split',
  'pdf_to_word',
  'pdf_to_excel',
  'pdf_to_powerpoint',
  'pdf_to_image',
  'word_to_pdf',
  'excel_to_pdf',
  'powerpoint_to_pdf',
  'image_to_pdf',
  'image_compress',
  'image_resize',
  'image_format',
  'video_compress',
  'audio_convert',
  'text_case',
  'text_count',
  'base64_encode',
  'url_encode',
  'hash_generate',
  'qr_generate',
  'color_convert',
  'unit_convert',
  'currency_convert'
);

-- Create table for conversion jobs
CREATE TABLE public.conversion_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  conversion_type conversion_type NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  input_file_url TEXT,
  output_file_url TEXT,
  input_data JSONB,
  output_data JSONB,
  error_message TEXT,
  processing_time_ms INTEGER,
  file_size_input INTEGER,
  file_size_output INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on conversion_jobs
ALTER TABLE public.conversion_jobs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for conversion_jobs
CREATE POLICY "Users can view their own conversion jobs"
  ON public.conversion_jobs
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own conversion jobs"
  ON public.conversion_jobs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own conversion jobs"
  ON public.conversion_jobs
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create table for conversion usage statistics
CREATE TABLE public.conversion_usage_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  conversion_type conversion_type NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  count INTEGER DEFAULT 1,
  total_processing_time_ms BIGINT DEFAULT 0,
  total_input_size BIGINT DEFAULT 0,
  total_output_size BIGINT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, conversion_type, date)
);

-- Enable RLS on conversion_usage_stats
ALTER TABLE public.conversion_usage_stats ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for conversion_usage_stats
CREATE POLICY "Users can view their own usage stats"
  ON public.conversion_usage_stats
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert/update usage stats"
  ON public.conversion_usage_stats
  FOR ALL
  USING (true);

-- Create storage bucket for conversion files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('conversions', 'conversions', false)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for conversions bucket
CREATE POLICY "Users can upload their own conversion files"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'conversions' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own conversion files"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'conversions' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own conversion files"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'conversions' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create function to update usage statistics
CREATE OR REPLACE FUNCTION update_conversion_usage_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    INSERT INTO public.conversion_usage_stats (
      user_id,
      conversion_type,
      count,
      total_processing_time_ms,
      total_input_size,
      total_output_size
    )
    VALUES (
      NEW.user_id,
      NEW.conversion_type,
      1,
      COALESCE(NEW.processing_time_ms, 0),
      COALESCE(NEW.file_size_input, 0),
      COALESCE(NEW.file_size_output, 0)
    )
    ON CONFLICT (user_id, conversion_type, date)
    DO UPDATE SET
      count = conversion_usage_stats.count + 1,
      total_processing_time_ms = conversion_usage_stats.total_processing_time_ms + COALESCE(NEW.processing_time_ms, 0),
      total_input_size = conversion_usage_stats.total_input_size + COALESCE(NEW.file_size_input, 0),
      total_output_size = conversion_usage_stats.total_output_size + COALESCE(NEW.file_size_output, 0),
      updated_at = NOW();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for usage statistics
CREATE TRIGGER trigger_update_conversion_usage_stats
  AFTER UPDATE ON public.conversion_jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_conversion_usage_stats();

-- Create function to clean up old conversion files
CREATE OR REPLACE FUNCTION cleanup_old_conversions()
RETURNS void AS $$
BEGIN
  -- Delete conversion jobs older than 30 days
  DELETE FROM public.conversion_jobs
  WHERE created_at < NOW() - INTERVAL '30 days';
  
  -- Note: Storage cleanup would need to be handled separately
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

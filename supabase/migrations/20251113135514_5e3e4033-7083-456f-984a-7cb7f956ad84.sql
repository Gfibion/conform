-- Step 1: Fix CRITICAL security issue - Restrict conversion_usage_stats to service_role only
DROP POLICY IF EXISTS "System can insert/update usage stats" ON public.conversion_usage_stats;

-- Only system/service role can modify usage stats (prevents user manipulation)
CREATE POLICY "Service role can manage usage stats" 
ON public.conversion_usage_stats 
FOR ALL 
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Users can still view their own stats
-- (existing SELECT policy remains)

-- Step 2: Fix function search_path issues for security
-- Update handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email)
  );
  RETURN NEW;
END;
$function$;

-- Update update_conversion_usage_stats function
CREATE OR REPLACE FUNCTION public.update_conversion_usage_stats()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
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
$function$;

-- Update cleanup_old_conversions function
CREATE OR REPLACE FUNCTION public.cleanup_old_conversions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  -- Delete conversion jobs older than 30 days
  DELETE FROM public.conversion_jobs
  WHERE created_at < NOW() - INTERVAL '30 days';
END;
$function$;
/*
  # Conversion Tracking System
  
  Creates comprehensive tables for tracking conversions, usage, and performance metrics.

  ## New Tables
  
  ### `conversion_jobs`
  Tracks all conversion operations performed by users.
  - `id` (uuid, primary key) - Unique job identifier
  - `user_id` (uuid, nullable) - User who initiated the conversion (null for anonymous)
  - `conversion_type` (text) - Type of conversion (e.g., 'currency', 'pdf_to_word', 'ai_text_enhance')
  - `status` (text) - Job status: 'pending', 'processing', 'completed', 'failed'
  - `input_data` (jsonb) - Input parameters and data
  - `output_data` (jsonb, nullable) - Conversion results
  - `error_message` (text, nullable) - Error details if failed
  - `processing_time_ms` (integer, nullable) - Processing duration in milliseconds
  - `created_at` (timestamptz) - When job was created
  - `completed_at` (timestamptz, nullable) - When job finished
  
  ### `usage_stats`
  Aggregated daily usage statistics per user.
  - `id` (uuid, primary key) - Unique stat identifier
  - `user_id` (uuid) - User identifier
  - `date` (date) - Statistics date
  - `total_conversions` (integer) - Total conversions performed
  - `successful_conversions` (integer) - Successful conversions
  - `failed_conversions` (integer) - Failed conversions
  - `total_processing_time_ms` (bigint) - Total processing time
  - `conversion_types` (jsonb) - Breakdown by conversion type
  - `created_at` (timestamptz) - When record was created
  - `updated_at` (timestamptz) - Last update time

  ### `system_logs`
  System-wide logs for monitoring and debugging.
  - `id` (uuid, primary key) - Unique log identifier
  - `log_level` (text) - Log level: 'info', 'warning', 'error', 'critical'
  - `source` (text) - Source of the log (e.g., 'ai-convert', 'file-conversion')
  - `message` (text) - Log message
  - `metadata` (jsonb, nullable) - Additional context data
  - `user_id` (uuid, nullable) - Associated user if applicable
  - `created_at` (timestamptz) - When log was created

  ## Security
  
  ### Row Level Security (RLS)
  All tables have RLS enabled with appropriate policies:
  
  **conversion_jobs**
  - Users can view only their own conversion jobs
  - Anonymous conversions are not stored in the database
  - Users can insert their own conversion jobs
  
  **usage_stats**
  - Users can view only their own statistics
  - System can update statistics (service role)
  
  **system_logs**
  - Only service role can read/write logs
  - Regular users cannot access system logs

  ## Indexes
  - Index on `conversion_jobs.user_id` for fast user queries
  - Index on `conversion_jobs.status` for monitoring
  - Index on `conversion_jobs.created_at` for time-based queries
  - Index on `usage_stats(user_id, date)` for daily stats lookup
  - Index on `system_logs.created_at` for log retrieval
  
  ## Important Notes
  1. All timestamps use timestamptz for proper timezone handling
  2. JSONB is used for flexible data storage
  3. Default values prevent NULL errors
  4. RLS policies ensure data isolation per user
*/

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum for conversion job status
DO $$ BEGIN
  CREATE TYPE conversion_status AS ENUM ('pending', 'processing', 'completed', 'failed');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Create enum for log levels
DO $$ BEGIN
  CREATE TYPE log_level AS ENUM ('info', 'warning', 'error', 'critical');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Create conversion_jobs table
CREATE TABLE IF NOT EXISTS conversion_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  conversion_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  input_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  output_data JSONB DEFAULT NULL,
  error_message TEXT DEFAULT NULL,
  processing_time_ms INTEGER DEFAULT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ DEFAULT NULL,
  
  CONSTRAINT valid_status CHECK (status IN ('pending', 'processing', 'completed', 'failed'))
);

-- Create indexes for conversion_jobs
CREATE INDEX IF NOT EXISTS idx_conversion_jobs_user_id ON conversion_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_conversion_jobs_status ON conversion_jobs(status);
CREATE INDEX IF NOT EXISTS idx_conversion_jobs_created_at ON conversion_jobs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversion_jobs_type ON conversion_jobs(conversion_type);

-- Enable RLS on conversion_jobs
ALTER TABLE conversion_jobs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for conversion_jobs
CREATE POLICY "Users can view own conversion jobs"
  ON conversion_jobs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own conversion jobs"
  ON conversion_jobs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own conversion jobs"
  ON conversion_jobs
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create usage_stats table
CREATE TABLE IF NOT EXISTS usage_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  total_conversions INTEGER NOT NULL DEFAULT 0,
  successful_conversions INTEGER NOT NULL DEFAULT 0,
  failed_conversions INTEGER NOT NULL DEFAULT 0,
  total_processing_time_ms BIGINT NOT NULL DEFAULT 0,
  conversion_types JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  UNIQUE(user_id, date)
);

-- Create indexes for usage_stats
CREATE INDEX IF NOT EXISTS idx_usage_stats_user_date ON usage_stats(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_usage_stats_date ON usage_stats(date DESC);

-- Enable RLS on usage_stats
ALTER TABLE usage_stats ENABLE ROW LEVEL SECURITY;

-- RLS Policies for usage_stats
CREATE POLICY "Users can view own usage stats"
  ON usage_stats
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create system_logs table
CREATE TABLE IF NOT EXISTS system_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  log_level TEXT NOT NULL DEFAULT 'info',
  source TEXT NOT NULL,
  message TEXT NOT NULL,
  metadata JSONB DEFAULT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  CONSTRAINT valid_log_level CHECK (log_level IN ('info', 'warning', 'error', 'critical'))
);

-- Create indexes for system_logs
CREATE INDEX IF NOT EXISTS idx_system_logs_created_at ON system_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_system_logs_level ON system_logs(log_level);
CREATE INDEX IF NOT EXISTS idx_system_logs_source ON system_logs(source);
CREATE INDEX IF NOT EXISTS idx_system_logs_user_id ON system_logs(user_id);

-- Enable RLS on system_logs (only service role can access)
ALTER TABLE system_logs ENABLE ROW LEVEL SECURITY;

-- Function to update usage_stats
CREATE OR REPLACE FUNCTION update_usage_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' OR NEW.status = 'failed' THEN
    INSERT INTO usage_stats (
      user_id,
      date,
      total_conversions,
      successful_conversions,
      failed_conversions,
      total_processing_time_ms,
      conversion_types
    )
    VALUES (
      NEW.user_id,
      CURRENT_DATE,
      1,
      CASE WHEN NEW.status = 'completed' THEN 1 ELSE 0 END,
      CASE WHEN NEW.status = 'failed' THEN 1 ELSE 0 END,
      COALESCE(NEW.processing_time_ms, 0),
      jsonb_build_object(NEW.conversion_type, 1)
    )
    ON CONFLICT (user_id, date) DO UPDATE SET
      total_conversions = usage_stats.total_conversions + 1,
      successful_conversions = usage_stats.successful_conversions + 
        CASE WHEN NEW.status = 'completed' THEN 1 ELSE 0 END,
      failed_conversions = usage_stats.failed_conversions + 
        CASE WHEN NEW.status = 'failed' THEN 1 ELSE 0 END,
      total_processing_time_ms = usage_stats.total_processing_time_ms + COALESCE(NEW.processing_time_ms, 0),
      conversion_types = usage_stats.conversion_types || 
        jsonb_build_object(
          NEW.conversion_type,
          COALESCE((usage_stats.conversion_types->NEW.conversion_type)::integer, 0) + 1
        ),
      updated_at = now();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically update usage stats
DROP TRIGGER IF EXISTS trigger_update_usage_stats ON conversion_jobs;
CREATE TRIGGER trigger_update_usage_stats
  AFTER UPDATE ON conversion_jobs
  FOR EACH ROW
  WHEN (NEW.user_id IS NOT NULL AND (NEW.status = 'completed' OR NEW.status = 'failed'))
  EXECUTE FUNCTION update_usage_stats();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for usage_stats updated_at
DROP TRIGGER IF EXISTS trigger_usage_stats_updated_at ON usage_stats;
CREATE TRIGGER trigger_usage_stats_updated_at
  BEFORE UPDATE ON usage_stats
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
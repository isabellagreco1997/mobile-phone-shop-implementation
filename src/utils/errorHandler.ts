import { PostgrestError } from '@supabase/supabase-js';

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function handleSupabaseError(error: PostgrestError): AppError {
  const errorMap: Record<string, string> = {
    'PGRST116': 'Resource not found',
    'PGRST104': 'Invalid input syntax',
    '23505': 'Duplicate record',
    '23503': 'Foreign key violation',
    '42P01': 'Table not found',
  };

  const message = errorMap[error.code] || error.message || 'An unexpected error occurred';
  return new AppError(message, error.code, error);
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}
import { PostgrestError } from '@supabase/supabase-js';

export function isPostgrestError(value: unknown): value is PostgrestError {
  return (
    typeof value === 'object' &&
    value !== null &&
    'code' in value &&
    'message' in value &&
    'details' in value
  );
}

export function isValidData<T>(data: unknown): data is T {
  return !isPostgrestError(data);
}
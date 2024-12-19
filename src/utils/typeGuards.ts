import { SelectQueryError } from '@supabase/supabase-js';

export function isSelectQueryError(value: unknown): value is SelectQueryError<string> {
  return (
    typeof value === 'object' &&
    value !== null &&
    'error' in value &&
    (value as any).error === true
  );
}

export function isValidData<T>(data: unknown): data is T {
  return !isSelectQueryError(data);
}
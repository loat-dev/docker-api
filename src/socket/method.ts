/**
 * This array represents all possible methods for a request.
 */
export const method = [
  'GET',
  'HEAD',
  'POST',
  'PUT',
  'DELETE',
  'CONNECT',
  'OPTIONS',
  'TRACE',
  'PATCH'
] as const;

/**
 * This type represents possible methods.
 */
export type Method = typeof method[number];

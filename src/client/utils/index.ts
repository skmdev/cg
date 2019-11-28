export function getProtocol(protocol: string) {
  const withSecure = process.env.NODE_ENV === 'production';

  return protocol + (withSecure ? 's' : '');
}

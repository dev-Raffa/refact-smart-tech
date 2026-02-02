export function decodeJwtPayload(token?: string | null): any {
  if (!token) return null;
  const payload = token.split('.')[1];
  try {
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

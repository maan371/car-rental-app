export function getUserFromToken(request) {
  // Without JWT, we'll get user info from the request headers or session
  // For now, return null - routes can use email-based lookup or session
  return null;
}

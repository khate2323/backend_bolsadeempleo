export function generateCodeWithExpiration() {
  try {
    const code = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    return { code, expiresAt };
  } catch (error) {
    return { code: null, expiresAt: null };
  }
}

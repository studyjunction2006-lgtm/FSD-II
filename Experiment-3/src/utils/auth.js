export function generateToken(user) {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const payload = {
    name: user.name,
    email: user.email,
    role: user.role,
    loginTime: new Date().toLocaleString(),
  };

  return (
    btoa(JSON.stringify(header)) +
    "." +
    btoa(JSON.stringify(payload)) +
    ".signature"
  );
}

export function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}
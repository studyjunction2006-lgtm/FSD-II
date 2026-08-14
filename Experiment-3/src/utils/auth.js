export function generateToken(user) {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const payload = {
    name: user.name,
    email: user.email,
    role: user.role,
    iat: Date.now(),
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
    const parts = token.split(".");

    if (parts.length !== 3) {
      return null;
    }

    return JSON.parse(atob(parts[1]));
  } catch {
    return null;
  }
}

export function getCurrentUser() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  return decodeToken(token);
}

export function logout() {
  localStorage.removeItem("token");
}
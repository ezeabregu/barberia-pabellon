import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRES_IN = "8h";

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET env var");
}

export function signAdminToken() {
  return jwt.sign({ role: "admin" }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRES_IN,
  });
}

export function verifyAdmin(req) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) return false;

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload?.role === "admin";
  } catch {
    return false;
  }
}

export function protectedUpdateMovieRoute(req, res, next) {
  const token = req.headers["modtoken"];
  const secret = process.env.MOD_TOKEN;

  if (!token) {
    return res.status(401).json({ msg: "Access denied" });
  }

  try {
    if (secret === token) {
      next();
    } else {
      throw new Error("Invalid token");
    }
  } catch {
    return res.status(400).json({ msg: "Invalid token" });
  }
}

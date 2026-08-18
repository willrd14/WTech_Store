export function errorHandler(err, req, res, _next) {
  console.error("[ERROR]", err.message);

  if (err.statusCode) {
    return res.status(400).json({ error: err.message });
  }

  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  });
}

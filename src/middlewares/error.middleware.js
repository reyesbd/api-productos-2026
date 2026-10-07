export function notFoundHandler(req, res) {
  res.status(404).json({
    error: true,
    mensaje: `Ruta no encontrada: ${req.method} ${req.originalUrl}`
  });
}

export function errorHandler(error, _req, res, _next) {
  console.error(error);

  if (error?.code === "P2002") {
    return res.status(409).json({ error: true, mensaje: "El registro viola una restricción de unicidad" });
  }

  if (error?.code === "P2003") {
    return res.status(409).json({ error: true, mensaje: "La operación viola una relación entre registros" });
  }

  if (error?.code === "P2025") {
    return res.status(404).json({ error: true, mensaje: "El registro solicitado no existe" });
  }

  res.status(500).json({
    error: true,
    mensaje: "Ocurrió un error interno en el servidor"
  });
}

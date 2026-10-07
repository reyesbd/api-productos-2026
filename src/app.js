import "dotenv/config";
import express from "express";
import categoriaRoutes from "./routes/categoria.routes.js";
import productoRoutes from "./routes/producto.routes.js";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware.js";

const app = express();
const PORT = Number(process.env.PORT ?? 3000);

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    mensaje: "API de tienda de cómputo funcionando",
    recursos: {
      categorias: "/api/categorias",
      productos: "/api/productos"
    }
  });
});

app.use("/api/categorias", categoriaRoutes);
app.use("/api/productos", productoRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API disponible en http://localhost:${PORT}`);
});

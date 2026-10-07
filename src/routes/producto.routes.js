import { Router } from "express";
import {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  listarProductos,
  obtenerProducto
} from "../controllers/producto.controller.js";

const router = Router();

router.get("/", listarProductos);
router.post("/", crearProducto);
router.get("/:id", obtenerProducto);
router.put("/:id", actualizarProducto);
router.delete("/:id", eliminarProducto);

export default router;

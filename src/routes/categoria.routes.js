import { Router } from "express";
import {
  actualizarCategoria,
  crearCategoria,
  eliminarCategoria,
  listarCategorias,
  listarProductosCategoria,
  obtenerCategoria
} from "../controllers/categoria.controller.js";

const router = Router();

router.get("/", listarCategorias);
router.post("/", crearCategoria);
router.get("/:id/productos", listarProductosCategoria);
router.get("/:id", obtenerCategoria);
router.put("/:id", actualizarCategoria);
router.delete("/:id", eliminarCategoria);

export default router;





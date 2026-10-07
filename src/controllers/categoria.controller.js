import { categoriaService } from "../services/categoria.service.js";

const idValido = (valor) => Number.isInteger(Number(valor)) && Number(valor) > 0;

export const listarCategorias = async (_req, res, next) => {
  try {
    const categorias = await categoriaService.listar();
    res.json(categorias);
  } catch (error) {
    next(error);
  }
};

export const obtenerCategoria = async (req, res, next) => {
  try {
    if (!idValido(req.params.id)) {
      return res.status(400).json({ error: true, mensaje: "El id de categoría no es válido" });
    }

    const categoria = await categoriaService.obtenerPorId(Number(req.params.id));
    if (!categoria) {
      return res.status(404).json({ error: true, mensaje: "La categoría no existe" });
    }

    res.json(categoria);
  } catch (error) {
    next(error);
  }
};

export const crearCategoria = async (req, res, next) => {
  try {
    const nombre = String(req.body.nombre ?? "").trim();
    if (!nombre) {
      return res.status(400).json({ error: true, mensaje: "El nombre de la categoría es obligatorio" });
    }

    const existente = await categoriaService.obtenerPorNombre(nombre);
    if (existente) {
      return res.status(409).json({ error: true, mensaje: "La categoría ya existe" });
    }

    const categoria = await categoriaService.crear(nombre);
    res.status(201).json(categoria);
  } catch (error) {
    next(error);
  }
};

export const actualizarCategoria = async (req, res, next) => {
  try {
    if (!idValido(req.params.id)) {
      return res.status(400).json({ error: true, mensaje: "El id de categoría no es válido" });
    }

    const id = Number(req.params.id);
    const nombre = String(req.body.nombre ?? "").trim();
    if (!nombre) {
      return res.status(400).json({ error: true, mensaje: "El nombre de la categoría es obligatorio" });
    }

    const actual = await categoriaService.obtenerPorId(id);
    if (!actual) {
      return res.status(404).json({ error: true, mensaje: "La categoría no existe" });
    }

    const duplicada = await categoriaService.obtenerPorNombre(nombre);
    if (duplicada && duplicada.id !== id) {
      return res.status(409).json({ error: true, mensaje: "Ya existe otra categoría con ese nombre" });
    }

    const categoria = await categoriaService.actualizar(id, nombre);
    res.json(categoria);
  } catch (error) {
    next(error);
  }
};

export const eliminarCategoria = async (req, res, next) => {
  try {
    if (!idValido(req.params.id)) {
      return res.status(400).json({ error: true, mensaje: "El id de categoría no es válido" });
    }

    const id = Number(req.params.id);
    const categoria = await categoriaService.obtenerPorId(id);
    if (!categoria) {
      return res.status(404).json({ error: true, mensaje: "La categoría no existe" });
    }

    if (categoria.productos.length > 0) {
      return res.status(409).json({
        error: true,
        mensaje: "No se puede eliminar una categoría que contiene productos"
      });
    }

    await categoriaService.eliminar(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const listarProductosCategoria = async (req, res, next) => {
  try {
    if (!idValido(req.params.id)) {
      return res.status(400).json({ error: true, mensaje: "El id de categoría no es válido" });
    }

    const categoria = await categoriaService.obtenerPorId(Number(req.params.id));
    if (!categoria) {
      return res.status(404).json({ error: true, mensaje: "La categoría no existe" });
    }

    res.json(categoria);
  } catch (error) {
    next(error);
  }
};

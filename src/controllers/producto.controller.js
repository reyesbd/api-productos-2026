import { categoriaService } from "../services/categoria.service.js";
import { productoService } from "../services/producto.service.js";

const idValido = (valor) => Number.isInteger(Number(valor)) && Number(valor) > 0;

function validarProducto(body, parcial = false) {
  const errores = [];
  const data = {};

  if (!parcial || body.nombre !== undefined) {
    const nombre = String(body.nombre ?? "").trim();
    if (!nombre) errores.push("El nombre del producto es obligatorio");
    else data.nombre = nombre;
  }

  if (!parcial || body.precio !== undefined) {
    const precio = Number(body.precio);
    if (!Number.isFinite(precio) || precio <= 0) errores.push("El precio debe ser un número mayor que cero");
    else data.precio = precio;
  }

  if (!parcial || body.categoriaId !== undefined) {
    const categoriaId = Number(body.categoriaId);
    if (!Number.isInteger(categoriaId) || categoriaId <= 0) errores.push("categoriaId debe ser un entero positivo");
    else data.categoriaId = categoriaId;
  }

  return { errores, data };
}

export const listarProductos = async (req, res, next) => {
  try {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);
    const precioMin = req.query.precioMin === undefined ? undefined : Number(req.query.precioMin);
    const precioMax = req.query.precioMax === undefined ? undefined : Number(req.query.precioMax);

    if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1 || limit > 100) {
      return res.status(400).json({ error: true, mensaje: "page y limit deben ser enteros positivos; limit máximo es 100" });
    }

    if ((precioMin !== undefined && !Number.isFinite(precioMin)) ||
        (precioMax !== undefined && !Number.isFinite(precioMax)) ||
        (precioMin !== undefined && precioMin < 0) ||
        (precioMax !== undefined && precioMax < 0) ||
        (precioMin !== undefined && precioMax !== undefined && precioMin > precioMax)) {
      return res.status(400).json({ error: true, mensaje: "El rango de precios no es válido" });
    }

    const resultado = await productoService.listar({
      categoria: req.query.categoria?.trim() || undefined,
      buscar: req.query.buscar?.trim() || undefined,
      precioMin,
      precioMax,
      page,
      limit
    });

    res.json(resultado);
  } catch (error) {
    next(error);
  }
};

export const obtenerProducto = async (req, res, next) => {
  try {
    if (!idValido(req.params.id)) {
      return res.status(400).json({ error: true, mensaje: "El id del producto no es válido" });
    }

    const producto = await productoService.obtenerPorId(Number(req.params.id));
    if (!producto) {
      return res.status(404).json({ error: true, mensaje: "El producto no existe" });
    }

    res.json(producto);
  } catch (error) {
    next(error);
  }
};

export const crearProducto = async (req, res, next) => {
  try {
    const { errores, data } = validarProducto(req.body);
    if (errores.length) {
      return res.status(400).json({ error: true, mensaje: "Datos inválidos", detalles: errores });
    }

    const categoria = await categoriaService.obtenerPorId(data.categoriaId);
    if (!categoria) {
      return res.status(400).json({ error: true, mensaje: "La categoría indicada no existe" });
    }

    const producto = await productoService.crear(data);
    res.status(201).json(producto);
  } catch (error) {
    next(error);
  }
};

export const actualizarProducto = async (req, res, next) => {
  try {
    if (!idValido(req.params.id)) {
      return res.status(400).json({ error: true, mensaje: "El id del producto no es válido" });
    }

    const id = Number(req.params.id);
    const actual = await productoService.obtenerPorId(id);
    if (!actual) {
      return res.status(404).json({ error: true, mensaje: "El producto no existe" });
    }

    const { errores, data } = validarProducto(req.body, true);
    if (errores.length) {
      return res.status(400).json({ error: true, mensaje: "Datos inválidos", detalles: errores });
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ error: true, mensaje: "No se proporcionaron campos válidos para actualizar" });
    }

    if (data.categoriaId !== undefined) {
      const categoria = await categoriaService.obtenerPorId(data.categoriaId);
      if (!categoria) {
        return res.status(400).json({ error: true, mensaje: "La categoría indicada no existe" });
      }
    }

    const producto = await productoService.actualizar(id, data);
    res.json(producto);
  } catch (error) {
    next(error);
  }
};

export const eliminarProducto = async (req, res, next) => {
  try {
    if (!idValido(req.params.id)) {
      return res.status(400).json({ error: true, mensaje: "El id del producto no es válido" });
    }

    const id = Number(req.params.id);
    const producto = await productoService.obtenerPorId(id);
    if (!producto) {
      return res.status(404).json({ error: true, mensaje: "El producto no existe" });
    }

    await productoService.eliminar(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

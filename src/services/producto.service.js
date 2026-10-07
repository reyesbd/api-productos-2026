import  prisma  from "../lib/prisma.js";

export const productoService = {
  async listar({ categoria, precioMin, precioMax, buscar, page = 1, limit = 10 }) {
    const where = {};

    if (buscar) {
      where.nombre = { contains: buscar };
    }

    if (categoria) {
      where.categoria = { nombre: categoria };
    }

    if (precioMin !== undefined || precioMax !== undefined) {
      where.precio = {};
      if (precioMin !== undefined) where.precio.gte = precioMin;
      if (precioMax !== undefined) where.precio.lte = precioMax;
    }

    const skip = (page - 1) * limit;

    const [data, total] = await prisma.$transaction([
      prisma.producto.findMany({
        where,
        include: { categoria: true },
        orderBy: { id: "asc" },
        skip,
        take: limit
      }),
      prisma.producto.count({ where })
    ]);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  },

  obtenerPorId(id) {
    return prisma.producto.findUnique({
      where: { id },
      include: { categoria: true }
    });
  },

  crear(data) {
    return prisma.producto.create({
      data,
      include: { categoria: true }
    });
  },

  actualizar(id, data) {
    return prisma.producto.update({
      where: { id },
      data,
      include: { categoria: true }
    });
  },

  eliminar(id) {
    return prisma.producto.delete({
      where: { id },
      include: { categoria: true }
    });
  }
};

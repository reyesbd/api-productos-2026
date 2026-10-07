import  prisma  from "../lib/prisma.js";

export const categoriaService = {
  listar() {
    return prisma.categoria.findMany({
      orderBy: { nombre: "asc" },
      include: { _count: { select: { productos: true } } }
    });
  },

  obtenerPorId(id) {
    return prisma.categoria.findUnique({
      where: { id },
      include: { productos: { orderBy: { nombre: "asc" } } }
    });
  },

  obtenerPorNombre(nombre) {
    return prisma.categoria.findUnique({ where: { nombre } });
  },

  crear(nombre) {
    return prisma.categoria.create({ data: { nombre } });
  },

  actualizar(id, nombre) {
    return prisma.categoria.update({ where: { id }, data: { nombre } });
  },

  eliminar(id) {
    return prisma.categoria.delete({ where: { id } });
  }
};

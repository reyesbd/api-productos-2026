import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client.ts";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db"
});
const prisma = new PrismaClient({ adapter });

const categorias = [
  "Computadoras", "Laptops", "Monitores", "Teclados", "Mouse",
  "Almacenamiento", "Redes", "Impresoras", "Audio", "Accesorios"
];

const productos = [
  ["PC de escritorio Lenovo ThinkCentre", 13999.00, "Computadoras"],
  ["Mini PC ASUS PN64", 11299.00, "Computadoras"],
  ["Laptop Lenovo ThinkPad E14", 18999.00, "Laptops"],
  ["Laptop HP ProBook 440", 17499.00, "Laptops"],
  ["Monitor LG 24 pulgadas", 3499.90, "Monitores"],
  ["Monitor Samsung 27 pulgadas", 4599.00, "Monitores"],
  ["Teclado mecánico Logitech G413", 1699.00, "Teclados"],
  ["Teclado inalámbrico Logitech K380", 799.00, "Teclados"],
  ["Mouse inalámbrico Logitech M720", 899.00, "Mouse"],
  ["Mouse gaming Logitech G502", 1299.00, "Mouse"],
  ["SSD Kingston NV2 1 TB", 1199.00, "Almacenamiento"],
  ["Disco duro externo WD 2 TB", 1699.00, "Almacenamiento"],
  ["Router TP-Link WiFi 6 AX3000", 1599.00, "Redes"],
  ["Impresora HP LaserJet M111w", 2899.00, "Impresoras"],
  ["Webcam Logitech C920", 1399.00, "Accesorios"],
  ["Adaptador USB-C a HDMI", 499.00, "Accesorios"],
  ["Audífonos Logitech H390", 699.00, "Audio"]
];

async function main() {
  for (const nombre of categorias) {
    await prisma.categoria.upsert({
      where: { nombre },
      update: {},
      create: { nombre }
    });
  }

  const mapaCategorias = new Map(
    (await prisma.categoria.findMany()).map((categoria) => [categoria.nombre, categoria.id])
  );

  await prisma.producto.deleteMany();

  for (const [nombre, precio, categoria] of productos) {
    await prisma.producto.create({
      data: {
        nombre,
        precio,
        categoriaId: mapaCategorias.get(categoria)
      }
    });
  }

  console.log(`Seed completado: ${categorias.length} categorías y ${productos.length} productos.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

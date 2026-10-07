import "dotenv/config";
import prisma from "./lib/prisma.js";

async function main() {

  const categorias = await prisma.categoria.findMany();

  console.log(categorias);
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

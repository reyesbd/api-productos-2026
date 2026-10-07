# Tienda API

API REST didáctica para administrar productos y categorías de una tienda de equipo y accesorios de cómputo.

## Tecnologías

- Node.js 24 LTS
- Express 5
- Prisma ORM 7.10.0
- SQLite
- JavaScript ES Modules

## Modelo

`Categoria 1 ─── N Producto`

### Categoria
- id: Int, llave primaria autoincremental
- nombre: String, único

### Producto
- id: Int, llave primaria autoincremental
- nombre: String
- precio: Float, validado como mayor que cero
- categoriaId: Int, llave foránea

## Instalación

```bash
npm install
```

Generar Prisma Client:

```bash
npm run prisma:generate
```

Crear/aplicar la base de datos:

```bash
npx prisma migrate dev
```

Cargar datos iniciales:

```bash
npm run db:seed
```

Ejecutar en modo desarrollo:

```bash
npm run dev
```

La API queda disponible en:

```text
http://localhost:3000
```

## Endpoints de categorías

| Método | Endpoint | Acción |
|---|---|---|
| GET | `/api/categorias` | Listar categorías |
| POST | `/api/categorias` | Crear categoría |
| GET | `/api/categorias/:id` | Obtener categoría |
| PUT | `/api/categorias/:id` | Actualizar categoría |
| DELETE | `/api/categorias/:id` | Eliminar categoría |
| GET | `/api/categorias/:id/productos` | Productos de una categoría |

Ejemplo de creación:

```json
{
  "nombre": "Componentes"
}
```

## Endpoints de productos

| Método | Endpoint | Acción |
|---|---|---|
| GET | `/api/productos` | Listar productos |
| POST | `/api/productos` | Crear producto |
| GET | `/api/productos/:id` | Obtener producto |
| PUT | `/api/productos/:id` | Actualizar producto |
| DELETE | `/api/productos/:id` | Eliminar producto |

Ejemplo de creación:

```json
{
  "nombre": "Monitor LG 24 pulgadas",
  "precio": 3499.90,
  "categoriaId": 3
}
```

## Consultas

Búsqueda por nombre:

```http
GET /api/productos?buscar=logitech
```

Filtro por categoría:

```http
GET /api/productos?categoria=Monitores
```

Filtro por rango de precios:

```http
GET /api/productos?precioMin=1000&precioMax=5000
```

Paginación:

```http
GET /api/productos?page=1&limit=10
```

Los filtros pueden combinarse.

## Prisma Studio

```bash
npm run db:studio
```

## Estructura

```text
tienda-api/
├── generated/              # Prisma Client generado (después de prisma generate)
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.js
├── src/
│   ├── controllers/
│   ├── lib/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   └── app.js
├── .env
├── .env.example
├── package.json
├── prisma.config.ts
└── README.md
```

## Secuencia didáctica sugerida

1. Ejecutar únicamente la ruta raíz y explicar Express.
2. Revisar `schema.prisma` y la relación 1:N.
3. Ejecutar la migración y observar SQLite con Prisma Studio.
4. Probar CRUD de categorías.
5. Probar CRUD de productos.
6. Analizar el uso de `include` para recuperar la categoría.
7. Probar filtros, búsqueda y paginación.
8. Provocar errores de validación y analizar los códigos HTTP.

## Referencias oficiales

- Node.js: https://nodejs.org/
- Express: https://expressjs.com/
- Prisma ORM: https://www.prisma.io/docs/orm
- Prisma + SQLite: https://www.prisma.io/docs/orm/overview/databases/sqlite
- SQLite: https://sqlite.org/docs.html

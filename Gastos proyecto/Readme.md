# Control de gastos — Fundación Kinal

Sistema de gestión de inventario para la bodega de Kinal, desarrollado con **TypeScript, Node.js, Express, Prisma, PostgreSQL** y **Angular**.

## Descripción del Proyecto

Siste para un cliente para que pueda controlar sus gastos dependiendo de cuantos es su sueldo al mes, cuando genera, sus gastos, deudas, gastos extras etc.


El proyecto sigue una arquitectura limpia, con separación de responsabilidades (Controllers, Services, Routes) en el backend y una estructura por componentes en el frontend.

##Características Principales

Funcionalidad 
por el momento solo llebamos el:
Login funcional 
## Tecnologías Utilizadas

### Backend

 Tecnologías
 **Node.js** | v20+ 
**TypeScript** | v5.9.3 
**Express** | v4.22.2 
 **Prisma** | v5.22.0 
**PostgreSQL** | v14+ 
**Zod** | v3.25.76 
**JWT** | v9.0.3 
**bcryptjs** | v2.4.3 
**CORS** | v2.8.6 
**Dotenv** | v16.6.1 
**Nodemon** | v3.1.14 

### Frontend

 Tecnología 
 **Angular** | v22.0.8 
 **TypeScript** | v6.0.3 
 **Angular Router** | v22.0.8 
 **Angular Forms** | v22.0.8 


## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

 **Node.js**  v18+  node -v 
 **pnpm**  v11.5.1  pnpm -v 
 **PostgreSQL**  v14+  psql --version 
 **Angular CLI** v17+  ng version 

## Instalación y Configuración

-- Configurar el Backend
# Navegar al backend
cd backend

# Instalar dependencias
pnpm install

 Configurar el .env
 DATABASE_URL="postgresql://postgres:contaseña@localhost:5432/Gastos proyecto?schema=public"
ADMIN_PASSWORD_HASH="hash_generado"
 PORT=3000


# Instalar dependencias
pnpm install

--Ejecutar la Aplicación
Terminal 1 - Backend:
cd C:\Users\Jefferson\Desktop\2025178\Gastos proyecto\backend                    
pnpm build
pnpm start
Servidor en http://localhost:3000

--Terminal 2 - Frontend:
cd C:\Users\Jefferson\Desktop\2025178\Gastos proyecto\frontend
pnpm start
Abre http://localhost:4200

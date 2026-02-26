# Suite de Pruebas de Calidad de Software - Jest & Supertest

## 📋 Descripción del Proyecto

Implementación de pruebas unitarias y de integración utilizando **Jest** y **Supertest** para validar la lógica de negocio y los endpoints de la API REST.

---

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (v14 o superior)
- npm (v6 o superior)

### Instalación de Dependencias

```bash
npm install
```

### Dependencias del Proyecto

**Dependencias de Producción:**

- `express`: Framework web para Node.js
- `cookie-parser`: Middleware para manejo de cookies
- `morgan`: Logger de peticiones HTTP
- `debug`: Utilidad de debugging

**Dependencias de Desarrollo:**

- `jest`: Framework de testing
- `supertest`: Librería para testing de APIs HTTP
- `eslint`: Linter de código
- `prettier`: Formateador de código

---

## 🧪 Ejecución de Pruebas

### Ejecutar todas las pruebas:

```bash
npm test
```

### Ejecutar pruebas en modo watch:

```bash
npm test -- --watch
```

### Ejecutar pruebas con coverage:

```bash
npm test -- --coverage
```

---

## 📁 Estructura del Proyecto

```
fast-api-dev/
├── app.js                    # Configuración principal de Express
├── package.json              # Dependencias y scripts
├── lib/
│   └── logic.js             # Lógica de negocio (funciones de cálculo)
├── routes/
│   ├── index.js             # Rutas principales (/health)
│   ├── items.js             # Rutas de items (/items)
│   └── users.js             # Rutas de usuarios
├── tests/
│   └── app.test.js          # Suite de pruebas
└── public/                   # Archivos estáticos
```

---

## 💻 Implementación Base

### 1. Lógica de Negocio (`lib/logic.js`)

```javascript
const calculateValue = (price, stock) => {
  if (price < 0 || stock < 0) return 0
  return price * stock
}

module.exports = { calculateValue }
```

**Descripción:** Función que calcula el valor total del inventario multiplicando precio por stock, retornando 0 si algún valor es negativo.

---

### 2. Suite de Pruebas (`tests/app.test.js`)

#### Pruebas Unitarias - Jest (Lógica de Inventario)

**Pruebas Base:**

1. ✅ **Cálculo correcto del valor total**
   - Input: `calculateValue(10, 5)`
   - Expected: `50`
   - Validación: Multiplicación básica

2. ✅ **Manejo de valores negativos**
   - Input: `calculateValue(-10, 5)`
   - Expected: `0`
   - Validación: Protección contra valores inválidos

**Validaciones Adicionales Implementadas:**

3. ✅ **Manejo de valores cero** (VALIDACIÓN ADICIONAL 1)

   ```javascript
   test('Debe retornar 0 cuando ambos valores son cero', () => {
     const result = calculateValue(0, 0)
     expect(result).toBe(0)
   })
   ```

   - **Objetivo:** Validar casos edge donde no hay precio ni stock
   - **Valor de negocio:** Asegura que el sistema maneja correctamente inventarios vacíos

4. ✅ **Soporte de números decimales** (VALIDACIÓN ADICIONAL 2)
   ```javascript
   test('Debe calcular correctamente con números decimales (15.5 * 3 = 46.5)', () => {
     const result = calculateValue(15.5, 3)
     expect(result).toBe(46.5)
   })
   ```

   - **Objetivo:** Verificar precisión con precios decimales
   - **Valor de negocio:** Esencial para cálculos monetarios precisos

---

#### Pruebas de Integración - Supertest (API Endpoints)

**Pruebas Base:**

1. ✅ **Health Check Básico**

   ```javascript
   test('GET /health - Debe responder con status 200 y JSON correcto', async () => {
     const response = await request(app).get('/health')
     expect(response.statusCode).toBe(200)
     expect(response.body).toHaveProperty('status', 'OK')
   })
   ```

   - **Endpoint:** `GET /health`
   - **Validaciones:** Status 200, propiedad 'status' con valor 'OK'

2. ✅ **Validación de Estructura del Inventario**
   ```javascript
   test('GET /items - Debe validar la estructura del inventario', async () => {
     const response = await request(app).get('/items')
     expect(response.statusCode).toBe(200)
     expect(Array.isArray(response.body)).toBe(true)
     expect(response.body[0]).toHaveProperty('id')
     expect(response.body[0]).toHaveProperty('stock')
   })
   ```

   - **Endpoint:** `GET /items`
   - **Validaciones:** Status 200, array, propiedades requeridas

**Validaciones Adicionales Implementadas:**

3. ✅ **Validación de Uptime en Health Check** (VALIDACIÓN ADICIONAL 1)

   ```javascript
   test('GET /health - Debe incluir la propiedad uptime en la respuesta', async () => {
     const response = await request(app).get('/health')
     expect(response.statusCode).toBe(200)
     expect(response.body).toHaveProperty('uptime')
     expect(typeof response.body.uptime).toBe('number')
   })
   ```

   - **Objetivo:** Verificar que el endpoint incluye tiempo de actividad del servidor
   - **Valor de negocio:** Permite monitoreo del estado del servidor

4. ✅ **Validación Completa de Datos del Inventario** (VALIDACIÓN ADICIONAL 2)
   ```javascript
   test('GET /items - Debe retornar exactamente 2 items en el inventario', async () => {
     const response = await request(app).get('/items')
     expect(response.statusCode).toBe(200)
     expect(response.body).toHaveLength(2)
     expect(response.body[0]).toHaveProperty('name', 'Laptop')
     expect(response.body[1]).toHaveProperty('name', 'Mouse')
   })
   ```

   - **Objetivo:** Validar contenido exacto del inventario
   - **Valor de negocio:** Garantiza integridad de datos en la respuesta

---

## 📊 Resultados de las Pruebas

### Ejecución Completa

```
PASS  tests/app.test.js
  Suite de Pruebas de Calidad de Software
    Pruebas Unitarias - Lógica de Inventario
      ✓ Debe calcular correctamente el valor total (10 * 5 = 50)
      ✓ Debe retornar 0 si se ingresan valores negativos
      ✓ Debe retornar 0 cuando ambos valores son cero
      ✓ Debe calcular correctamente con números decimales (15.5 * 3 = 46.5)
    Pruebas de Integración - API Endpoints
      ✓ GET /health - Debe responder con status 200 y JSON correcto (13 ms)
      ✓ GET /items - Debe validar la estructura del inventario (4 ms)
      ✓ GET /health - Debe incluir la propiedad uptime en la respuesta (1 ms)
      ✓ GET /items - Debe retornar exactamente 2 items en el inventario (1 ms)

Test Suites: 1 passed, 1 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        0.293 s
```

### Métricas de Calidad

| Métrica                    | Valor                      |
| -------------------------- | -------------------------- |
| **Test Suites**            | 1 passed / 1 total         |
| **Tests Totales**          | 8 passed / 8 total         |
| **Pruebas Unitarias**      | 4 (2 base + 2 adicionales) |
| **Pruebas de Integración** | 4 (2 base + 2 adicionales) |
| **Tiempo de Ejecución**    | 0.293 segundos             |
| **Success Rate**           | 100%                       |

---

## 🎯 Validaciones Implementadas

### Resumen de Validaciones Adicionales

#### Jest (Pruebas Unitarias - Lógica de Negocio)

1. **Validación de Valores Cero:** Asegura comportamiento correcto cuando no hay inventario
2. **Validación de Decimales:** Garantiza precisión en cálculos monetarios

#### Supertest (Pruebas de Integración - API)

1. **Validación de Uptime:** Verifica métricas de monitoreo del servidor
2. **Validación de Datos Completos:** Asegura integridad del inventario retornado

---

## 🛠️ Scripts Disponibles

| Comando            | Descripción                                      |
| ------------------ | ------------------------------------------------ |
| `npm start`        | Inicia el servidor en modo producción            |
| `npm test`         | Ejecuta la suite completa de pruebas con Jest    |
| `npm run lint`     | Ejecuta ESLint para análisis de código           |
| `npm run lint:fix` | Ejecuta ESLint y corrige errores automáticamente |
| `npm run format`   | Formatea el código con Prettier                  |

---

## 📝 Endpoints de la API

### GET /health

**Descripción:** Health check del servidor  
**Respuesta:**

```json
{
  "status": "OK",
  "uptime": 123.456
}
```

### GET /items

**Descripción:** Obtiene el inventario completo  
**Respuesta:**

```json
[
  { "id": 1, "name": "Laptop", "stock": 10 },
  { "id": 2, "name": "Mouse", "stock": 50 }
]
```

---

## 👥 Autor

**Actividad de Calidad de Software**  
Implementación de Jest y Supertest con validaciones extendidas

---

## 📄 Licencia

Este proyecto es parte de una actividad académica de evaluación.

---

## 🔍 Notas Técnicas

- Todas las pruebas se ejecutan en memoria sin necesidad de base de datos
- Los tests de integración usan Supertest para simular peticiones HTTP
- Las pruebas unitarias validan la lógica de negocio de forma aislada
- La suite está configurada para ejecutarse en modo verbose para mejor visibilidad

**Fecha de implementación:** Febrero 2026

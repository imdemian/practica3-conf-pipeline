const request = require('supertest')
const app = require('../app')
const { calculateValue } = require('../lib/logic')

describe('Suite de Pruebas de Calidad de Software', () => {
  describe('Pruebas Unitarias - Lógica de Inventario', () => {
    test('Debe calcular correctamente el valor total (10 * 5 = 50)', () => {
      const result = calculateValue(10, 5)
      expect(result).toBe(50)
    })

    test('Debe retornar 0 si se ingresan valores negativos', () => {
      const result = calculateValue(-10, 5)
      expect(result).toBe(0)
    })

    // Pruebas Adicionales

    test('Debe retornar 0 cuando ambos valores son cero', () => {
      const result = calculateValue(0, 0)
      expect(result).toBe(0)
    })

    test('Debe calcular correctamente con números decimales (15.5 * 3 = 46.5)', () => {
      const result = calculateValue(15.5, 3)
      expect(result).toBe(46.5)
    })
  })

  describe('Pruebas de Integración - API Endpoints', () => {
    test('GET /health - Debe responder con status 200 y JSON correcto', async () => {
      const response = await request(app).get('/health')
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty('status', 'NOK')
    })

    test('GET /items - Debe validar la estructura del inventario', async () => {
      const response = await request(app).get('/items')
      expect(response.statusCode).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
      expect(response.body[0]).toHaveProperty('id')
      expect(response.body[0]).toHaveProperty('stock')
    })

    test('GET /health - Debe incluir la propiedad uptime en la respuesta', async () => {
      const response = await request(app).get('/health')
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty('uptime')
      expect(typeof response.body.uptime).toBe('number')
    })

    test('GET /items - Debe retornar exactamente 2 items en el inventario', async () => {
      const response = await request(app).get('/items')
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveLength(2)
      expect(response.body[0]).toHaveProperty('name', 'Laptop')
      expect(response.body[1]).toHaveProperty('name', 'Mouse')
    })
  })
})

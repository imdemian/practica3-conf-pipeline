import http from 'k6/http'
import { sleep, check } from 'k6'

export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '1m', target: 10 },
    { duration: '10s', target: 0 }
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01']
  }
}

const BASE_URL = 'http://localhost:3000'

export default function () {
  // Vista 1: Health Check
  const health = http.get(`${BASE_URL}/health`)
  check(health, {
    'health status 200': (r) => r.status === 200,
    'health tiene status OK': (r) => JSON.parse(r.body).status === 'OK'
  })

  sleep(1)

  // Vista 2: Items (Inventario)
  const items = http.get(`${BASE_URL}/items`)
  check(items, {
    'items status 200': (r) => r.status === 200,
    'items es un array': (r) => Array.isArray(JSON.parse(r.body))
  })

  sleep(1)
}

// Zero-dependency registration API (node:http).
// POST /api/register  { complexName, ceoName, phone } -> { ok, id }
// GET  /api/health    -> { ok: true }
import { createServer } from 'node:http'
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { randomUUID } from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, '..', 'data')
const DATA_FILE = path.join(DATA_DIR, 'registrations.json')
const PORT = process.env.PORT || 8000

function readRegistrations() {
  if (!existsSync(DATA_FILE)) return []
  try {
    return JSON.parse(readFileSync(DATA_FILE, 'utf8'))
  } catch {
    return []
  }
}

function saveRegistration(entry) {
  mkdirSync(DATA_DIR, { recursive: true })
  const all = readRegistrations()
  all.push(entry)
  writeFileSync(DATA_FILE, JSON.stringify(all, null, 2))
}

function json(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  })
  res.end(JSON.stringify(payload))
}

function validate(body) {
  const complexName = String(body.complexName ?? '').trim()
  const ceoName = String(body.ceoName ?? '').trim()
  const phone = String(body.phone ?? '').trim()
  if (complexName.length < 2 || complexName.length > 120) return null
  if (ceoName.length < 2 || ceoName.length > 120) return null
  if (!/^[+0-9][0-9\s-]{6,19}$/.test(phone)) return null
  return { complexName, ceoName, phone }
}

const server = createServer((req, res) => {
  const { method } = req
  const url = new URL(req.url, `http://localhost:${PORT}`)

  if (method === 'GET' && url.pathname === '/api/health') {
    return json(res, 200, { ok: true })
  }

  if (method === 'POST' && url.pathname === '/api/register') {
    let raw = ''
    let overflow = false
    req.on('data', (chunk) => {
      raw += chunk
      if (raw.length > 10_000) {
        overflow = true
        req.destroy()
      }
    })
    req.on('end', () => {
      if (overflow) return
      let body
      try {
        body = JSON.parse(raw || '{}')
      } catch {
        return json(res, 400, { ok: false, error: 'Invalid JSON body.' })
      }
      const entry = validate(body)
      if (!entry) {
        return json(res, 400, {
          ok: false,
          error: 'Please complete all fields with valid values.',
        })
      }
      const id = randomUUID()
      saveRegistration({ id, ...entry, createdAt: new Date().toISOString() })
      return json(res, 201, { ok: true, id })
    })
    return
  }

  json(res, 404, { ok: false, error: 'Not found.' })
})

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Registration API listening on http://127.0.0.1:${PORT}`)
})

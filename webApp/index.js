const express = require('express')
const promClient = require('prom-client')
const app = express()
const PORT = 9999

const defaultMetrics = promClient.collectDefaultMetrics
defaultMetrics({timeout: 5000})

const httpResponsesTotal = new promClient.Counter({
  name: 'http_responses_total',
  help: 'HTTP responses (Total)',
  labelNames: ['status'],
})

app.use((req, res, next) => {
  res.on('finish', () => {
    httpResponsesTotal.inc({ status: res.statusCode })
  })
  next()
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType)
  const metrics = await promClient.register.metrics()
  res.end(metrics)
})

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`)
})

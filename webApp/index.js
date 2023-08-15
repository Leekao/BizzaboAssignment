const express = require('express')
const promClient = require('prom-client')
const app = express()
const PORT = 9999

const defaultMetrics = promClient.collectDefaultMetrics
defaultMetrics({ timeout: 5000 })

let responseTimestamps = []  // Queue to store response timestamps

app.use((req, res, next) => {
  res.on('finish', () => {
    const now = Date.now()

    if (res.statusCode !== 200) {
      responseTimestamps.push(now)
    }
    while (responseTimestamps.length && (now - responseTimestamps[0] > 60000)) {
      responseTimestamps.shift()
    }
  })

  next()
})

const httpNon200ResponsesLastMinute = new promClient.Gauge({
  name: 'http_non_200_responses_last_minute',
  help: 'HTTP non-200 responses in the last minute',
})

app.get('/metrics', async (req, res) => {
  httpNon200ResponsesLastMinute.set(responseTimestamps.length)

  res.set('Content-Type', promClient.register.contentType)
  const metrics = await promClient.register.metrics()
  res.end(metrics)
})

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`)
})

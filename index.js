const express = require('express')
const app = express()
const PORT = 9999

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`)
})
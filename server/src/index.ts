import express from 'express'
import cors from 'cors'
import dishesRouter from './routes/dishes.js'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.use('/api/dishes', dishesRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

import express from 'express'
import dotenv from 'dotenv'
import pageRouter from './routes/page.routes'
import empolyeeRouter from './routes/employee.routes'
import cors from 'cors'
dotenv.config()

const app = express()

//MW
app.use(express.json())
app.use(cors()) //Allow frontend to send request

//Routes
app.use("/", pageRouter)
app.use("/employee", empolyeeRouter)

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})
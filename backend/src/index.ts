import dotenv from 'dotenv'
import express, {Express} from 'express'
import  {createUser} from '../controllers/userController/createUser'
import{ loginUser} from '../controllers/userController/login'
import validateUser from '../utilis/validation'
import cookieParser = require('cookie-parser')
dotenv.config()

const app : Express = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(cookieParser())

app.post("/api/users", validateUser, createUser);
app.post('/login', loginUser)

app.listen(port, () => console.log(`Server running on port ${port}`))
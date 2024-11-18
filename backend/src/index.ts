import dotenv from 'dotenv'
import express, {Express} from 'express'
// import * as express from "express";
import  {createUser} from '../controllers/userController/createUser'
import{ loginUser} from '../controllers/userController/login'
import validateUser from '../utilis/validation'
import cookieParser = require('cookie-parser')
import createEvent from '../controllers/eventController/createEvent'
import authenticateUser from '../utilis/auth'
import getEvent from '../controllers/eventController/retrieveEvents'
import updateUserEvent from '../controllers/eventController/updateEvent'
import deleteEvent from '../controllers/eventController/DeleteEvent'
dotenv.config()

const app : Express = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(cookieParser())

app.post("/api/users", validateUser, createUser);
app.post('/api/login', loginUser)
app.post('/events',authenticateUser, createEvent)
app.get('/event/user/:id',authenticateUser, getEvent)
app.put('/event/:id',authenticateUser, updateUserEvent)
app.delete('/delete/event/:id',authenticateUser, deleteEvent)


app.listen(port, () => console.log(`Server running on port ${port}`))
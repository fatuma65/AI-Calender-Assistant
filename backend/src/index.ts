import dotenv from 'dotenv'
import express, {Express} from 'express'
import  {createUser} from '../controllers/userController/createUser'
import{ loginUser} from '../controllers/userController/login'
import validateUser from '../utilis/validation'
import cookieParser = require('cookie-parser')
import createEvent from '../controllers/eventController/createEvent'
import authenticateUser from '../utilis/auth'
import getEvent from '../controllers/eventController/retrieveEvents'
import updateUserEvent from '../controllers/eventController/updateEvent'
import deleteEvent from '../controllers/eventController/DeleteEvent'
import updateUserInformation from '../controllers/userController/updateUserAccount'
import deleteUser from '../controllers/userController/deleteUser'
import createUserPerfreances from '../controllers/userPreferances/createUserPreferances'
import updatePreferances from '../controllers/userPreferances/updatePreferances'
import deletePreferances from '../controllers/userPreferances/deletePreferances'
import getPreferance from '../controllers/userPreferances/getPreferances'

dotenv.config()

const app : Express = express()
const port = process.env.PORT || 3000
const route = express.Router()


app.use(express.json())
app.use(cookieParser())

app.post("/api/users", validateUser, createUser);
app.post('/api/login', loginUser)
app.put('/api/update/:id', authenticateUser, updateUserInformation)
app.delete('/api/delete/:id', authenticateUser, deleteUser)
app.post('/events',authenticateUser, createEvent)
app.get('/event/user/:id',authenticateUser, getEvent)
app.put('/event/:id',authenticateUser, updateUserEvent)
app.delete('/delete/event/:id',authenticateUser, deleteEvent)
app.post('/user/preferance', authenticateUser, createUserPerfreances)
app.put('/user/update/preferance/:id', authenticateUser, updatePreferances)
app.delete('/user/delete/preferance/:id', authenticateUser, deletePreferances)
app.get('/user/preferances', authenticateUser, getPreferance)


app.listen(port, () => console.log(`Server running on port ${port}`))
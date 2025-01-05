import getEvent from '../controllers/eventController/retrieveEvents'
import updateUserEvent from '../controllers/eventController/updateEvent'
import deleteEvent from '../controllers/eventController/DeleteEvent'
import createEvent from '../controllers/eventController/createEvent'
import authenticateUser from '../middlewares/auth'
import { Express }  from "express";

const route : Express = require('express').Router()

route.post('/', authenticateUser, createEvent)
route.get('/events', authenticateUser,  getEvent)
route.delete('/events/:id', authenticateUser, deleteEvent)
route.put('/events/:id', authenticateUser, updateUserEvent)

export default route
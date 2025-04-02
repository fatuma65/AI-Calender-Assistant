import updateUserEvent from '../controllers/eventController/updateEvent'
import deleteEvent from '../controllers/eventController/DeleteEvent'
import authenticateUser from '../middlewares/auth'
import { Express }  from "express";
import getEvent from '../controllers/eventController/retrieveEvents'
import { handleNaturalLanguageCommand } from '../controllers/eventController/createEvent';

const route : Express = require('express').Router()

route.post('/', authenticateUser, handleNaturalLanguageCommand)
route.get('/events', authenticateUser,  getEvent)
route.delete('/:id', authenticateUser, deleteEvent)
route.put('/:id', authenticateUser, updateUserEvent)

export default route
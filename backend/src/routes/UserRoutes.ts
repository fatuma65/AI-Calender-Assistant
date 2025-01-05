import { Express }  from "express";
const route : Express = require('express').Router()

import {createUser} from '../controllers/userController/createUser'
import { loginUser } from "../controllers/userController/login";
import validateUser from "../middlewares/validation";
import updateUserInformation from "../controllers/userController/updateUserAccount";
import deleteUser from "../controllers/userController/deleteUser";

route.post('/register',validateUser, createUser)
route.post('/login', loginUser)
route.put('/:id', updateUserInformation)
route.delete('/:id', deleteUser)

export default route
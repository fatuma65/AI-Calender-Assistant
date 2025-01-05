import { Express }  from "express";
const route : Express = require('express').Router()

import {createUser} from '../controllers/userController/createUser'
import { loginUser } from "../controllers/userController/login";
import validateUser from "../middlewares/validation";

route.post('/register',validateUser, createUser)
route.post('/login', loginUser)

export default route
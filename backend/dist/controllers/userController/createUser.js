"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const {PrismaClient} = require('@prisma/client')
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
// const bcrypt = require('bcrypt')
const prisma = new client_1.PrismaClient();
// import  from 'express'
// const { Request, Response } = require('express')
// type userType = {
//     body : {
//         firstname: string,
//         lastname:string,
//         email:string,
//         password: string,
//     }
// }
// "start": "nodemon --exec npx ts-node ./index.ts",
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const createUser = async (req : userType, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { Message: string }): any; new(): any } } }) => {
    const { firstname, lastname, email, password } = req.body;
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        console.log(hashedPassword);
        const newUser = prisma.user.create({
            data: {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: hashedPassword
            }
        });
        return (console.log(newUser),
            res.status(201).json({ "Message": "User created successfully" }));
    }
    catch (error) {
        console.log(error);
    }
});
module.exports = { createUser };

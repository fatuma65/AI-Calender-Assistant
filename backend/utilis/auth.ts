
import { Request, Response, NextFunction } from "express"
import jwt, { Secret } from "jsonwebtoken"

interface CustomUser extends Request {
    user: any
}
const secretKey : Secret = process.env.SECRET_KEY || "cathyfatuma"
const authenticateUser = (req: CustomUser, res: Response, next: NextFunction) => {

    const token = req.cookies.authToken
    console.log(token)

    if (!token) {
        console.log('You are not authorized')
        res.status(401).json({error: "You are not Authorized"})
    }
    else {
        try{
            const decodedToken = jwt.verify(token, secretKey)
            console.log(decodedToken)
            req.user = decodedToken
            next()
        }
        catch(error) {
            console.log('Invalid token provided')
        }
    }
}

export default authenticateUser
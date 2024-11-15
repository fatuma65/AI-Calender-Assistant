
import * as express from "express"
declare global {
    namespace Express {
        interface Request {
            user? : JwtPayload, any
            // user? : Record<string, any>
        }
    }
}
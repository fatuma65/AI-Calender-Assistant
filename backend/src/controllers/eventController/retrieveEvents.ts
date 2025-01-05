import prisma from '../../client'
import { Request, Response } from 'express'
import { CustomRequest } from '../../middlewares/auth'

const getEvent = async (req:Request, res:Response) => {
    const id = (req as CustomRequest).user.id
    try {
    const userEvents = await prisma.event.findMany({
        where: {userId : id},
        include: {
           reminders: true ,
           locationData: true
        }
    })

    console.log(userEvents)
    res.status(200).json({message: "Event retrieved successfully", data: userEvents})
}
catch(error) {
    console.log(error)
    res.status(500).json({error: "Internal Server Error"})
}
}

export default getEvent
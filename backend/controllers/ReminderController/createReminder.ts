import {Request, Response} from 'express'
import prisma from '../../src/client'
import { CustomRequest } from '../../utilis/auth'

const createReminder = async (req:Request, res:Response):Promise<any> => {

    try {
    const {reminderTime, status, reminderMethod} = req.body

    const id = (req as CustomRequest).user.id
    const reminder = await prisma.reminder.create({
        data: {
            userId: id,
            eventId: req.params.id,
            reminderTime: new Date(reminderTime),
            reminderMethod: reminderMethod,
            status: status
        }
    })
    if(!reminder) {
        console.log('You need to put on the reminder')
        res.status(400).json({error: 'You need a reminder'})
    }
    return (
        console.log(reminder),
        res.status(201).json({Message: 'Reminder created successfully'})
    )
}
catch(error){
    console.log('An error has occured')
    res.status(500).json({error:'Internal Server Error'})
}

}

export default createReminder
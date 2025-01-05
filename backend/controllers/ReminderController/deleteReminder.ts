import {Request, Response} from 'express'
import prisma from '../../src/client'

const deleteReminder = async (req:Request, res:Response):Promise<any> => {

    try {
    const reminder = await prisma.reminder.delete({
        where: {
            id: req.params.id
        }
    })
    if(!reminder) {
        console.log('Reminder not found')
        res.status(404).json({error: 'Reminder not found'})
    }
    return (
        console.log(reminder),
        res.status(200).json({Message: 'Reminder deleted successfully'})
    )
}
catch(error){
    console.log('An error has occured')
    res.status(500).json({error:'Internal Server Error'})
}

}

export default deleteReminder
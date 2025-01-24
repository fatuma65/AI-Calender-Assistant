import prisma from '../../client'
import { Request, Response } from 'express'
import { CustomRequest } from '../../middlewares/auth'
import calendar from '../../services/googleCalendar';
import { googleUser } from '../../services/googleCalendar';

const getEvent = async (req: Request, res: Response):Promise<any> => {
  // const user = req.user;
  const user = (req as CustomRequest).user;
  // const code = req.query.code as string;
  // const { tokens } = await googleUser.getToken(code);
  // googleUser.setCredentials(tokens);

  // user.googleAccessToken = tokens.access_token
  // console.log(user.googleAccessToken)
  // if (!user ) {
  if (!user || !user.googleAccessToken ) {
    return res.status(401).json({error: 'User not authenticated'})
  }
  try {

    googleUser.setCredentials({access_token: user.googleAccessToken})
    // const userEvents = await prisma.event.findMany({
    //   where: { userId: id },
    //   include: {
    //     reminders: true,
    //     locationData: true,
    //   },
    // });
    // if (!userEvents || userEvents.length === 0) {
    //   console.log("Event not found");
    //   res.status(404).json({ error: "Event not found" });
    //   return;
    // } else {
    //   console.log(userEvents);
    //   res
    //     .status(200)
    //     .json({ message: "Event retrieved successfully", data: userEvents });
    // }
    const response = calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime'
    })

    const events = (await response).data.items

    if(!events || events.length === 0) {
      return res.status(200).json({message: 'No upcoming events found'})
    }

    res.status(200).json({message: 'Events retrieved successfully', data: events})
    // , (error, result) => {
      // if(error) {
      //   console.log(error)
      //   res.send(JSON.stringify({error: error}))
      // }
      // else {
      //   if(result?.data.items?.length) {
      //     res.send(JSON.stringify({message: 'No upcoming events found'}))
      //   }
      // }
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getEvent;

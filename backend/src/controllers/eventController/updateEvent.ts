import { Response, Request } from "express";
import prisma from "../../client";
import { updateEvent } from "../../services/googleCalendar";
const updateUserEvent = async (req: Request, res: Response) => {
  try {

    const {eventDetails} = req.body
    
    const updatedEvent = await prisma.event
      .update({
        where: { id: req.params.id },
        data: eventDetails,
      })
      .catch(() => {
        throw (
          (new Error(`Event with id ${req.params.id} is not found`),
          res
            .status(404)
            .json({ error: `Event with id ${req.params.id} is not found` }))
        );
      });

      await updateEvent(eventDetails)
    res
      .status(200)
      .json({ message: "Event updated successfully", data: updatedEvent });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default updateUserEvent;
import { Response, Request } from "express";
import prisma from "../../src/client";

const deleteEvent = async (req: Request, res: Response) => {
  try {
    const eventToDelete = await prisma.event
      .delete({
        where: { id: req.params.id },
      })
      .catch(() => {
        throw (
          (new Error(`Event with id ${req.params.id} not found`),
          res.status(404).json({ error: "Event not found" }))
        )
      });
    if (eventToDelete) {
        console.log("Event deleted successfully");
        res.status(200).json({ message: "Event deleted successfully" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default deleteEvent;

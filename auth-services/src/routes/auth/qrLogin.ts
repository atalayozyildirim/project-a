import { Subject } from "microserivce-common";
import type { json, Request, Response } from "express";
import express from "express";
import jwt from "jsonwebtoken";
import { Auth } from "../../model/AuthModel";
import reqIp from "request-ip";
import { NotificationsPublisher } from "../../event/publisher.ts/notification";
import { rabbit } from "../../event/rabbitmqWrapper";

const router = express.Router();

router.post("/login/qr/:token", async (req: Request, res: Response) => {
  const { token } = req.params;
  const { id } = req.query;

  const decodedToken = jwt.verify(token, Bun.env.JWT_KEY as string);

  if (!decodedToken) throw new Error("Invalid token");

  const auth = await Auth.findOne({ where: { id } });

  if (!auth) throw new Error("Invalid id");

  const jwtToken = jwt.sign({ id: auth.id }, Bun.env.JWT_KEY as string, {
    expiresIn: "1h",
  });

  const ip = reqIp.getClientIp(req);

  await new NotificationsPublisher(rabbit.client!).publish(
    Subject.NotifactionCreated,
    {
      message: `User ${
        auth.email
      } logged in from IP address ${ip} at ${new Date().toLocaleString()}`,
      userId: auth.id,
    }
  );

  res.json({ token: jwtToken });
});

export default router;

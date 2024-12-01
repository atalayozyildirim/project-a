import bull from "bull";
import { ExpirationPublisher } from "../event/publisher/Expirations-Publisher";
import { rabbit } from "../event/rabbitmqWrapper";
import { Subject } from "microserivce-common";
export interface Payload {
  orderId: string;
}

const expirtationsQueue = new bull<Payload>("order:expiration", {
  redis: {
    host: process.env.REDIS_URL,
  },
});

expirtationsQueue.process(async (job) => {
  console.log("Processing job", job.data);

  new ExpirationPublisher(rabbit.client!).publish(Subject.ExpirationComplete, {
    orderId: job.data.orderId,
  });
});

export { expirtationsQueue };

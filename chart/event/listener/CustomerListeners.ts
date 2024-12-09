import {
  BaseConsumer,
  Subject,
  type CustomerCreatedEvent,
} from "microserivce-common";
import type { Message, Channel } from "amqplib";
import { Customer } from "../../db/Customer";

export class CustomerListener extends BaseConsumer<CustomerCreatedEvent> {
  Subject: Subject.CustomerCreated = Subject.CustomerCreated;
  queueGroupName = "order-created";

  async onMessage(data: CustomerCreatedEvent["data"], msg: Message & Channel) {
    console.log("Event data!", data);

    if (!data) {
      throw new Error("Customer data is required");
    }

    const CustoemrData = await Customer.build({
      name: data.name,
      surname: data.surname,
      email: data.email,
      phoneNumber: data.phoneNumber,
    });
    CustoemrData.save();
  }
}

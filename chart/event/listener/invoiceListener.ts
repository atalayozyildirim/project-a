import {
  BaseConsumer,
  Subject,
  type InvoiceCreatedEvent,
} from "microserivce-common";

import type { Message, Channel } from "amqplib";
import { Invoice } from "../../db/InvoiceModel";

export class InvoiceListener extends BaseConsumer<InvoiceCreatedEvent> {
  Subject: Subject.InvoiceCreated = Subject.InvoiceCreated;
  queueGroupName = "invoice-service";

  async onMessage(data: InvoiceCreatedEvent["data"], msg: Message & Channel) {
    if (data.status === "paid") {
      const invoice = Invoice.build({
        invoiceNumber: data.id,
        invoiceDate: data.createdDate,
        totalAmount: data.totalAmount,
        status: data.status,
      });
      console.log("Invoice created!", invoice);
      await invoice.save();
    }

    console.log("Event data!", data);
  }
}

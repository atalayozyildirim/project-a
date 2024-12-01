import { Subject } from "./subject";

export interface NotifactionCreatedEvent {
  subject: Subject.NotifactionCreated;
  data: {
    message: string;
    userId: string;
  };
}

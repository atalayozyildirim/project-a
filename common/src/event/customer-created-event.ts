import { Subject } from "./subject";

export interface CustomerCreatedEvent {
  subject: Subject.CustomerCreated;
  data: {
    id: string;
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
  };
}

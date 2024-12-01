import type { Subject } from "./subject";

export interface AuthCreatedEvent {
  subject: Subject.LoginCreated;
  data: {
    id: string;
    email: string;
    ipAddress: string;
  };
}

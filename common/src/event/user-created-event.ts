import type { Subject } from "./subject";

export interface UserCreatedEvent {
  subject: Subject.UserCreated;
  data: {
    id: string;
    email: string;
    name: string;
    role: string;
    tasks: string[];
  };
}

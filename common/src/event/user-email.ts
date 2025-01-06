import type { Subject } from "./subject";

export interface UserCreatedEmailEvent {
  subject: Subject.UserEmailCreatad;
  data: {
    id: string;
    email: string;
    name: string;
    role: string;
    tasks: string[];
  };
}

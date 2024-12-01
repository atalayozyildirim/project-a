import { Subject } from "./subject";

export interface ProductCreatedEvent {
  subject: Subject.ProductCreated;
  data: {
    id: string;
    name: string;
    description: string;
    price: number;
    v: number;
  };
}

import { Subject } from "./subject";

export interface ProductUpdateEvent {
  subject: Subject.ProductUpdated;
  data: {
    id: string;
    name: string;
    description: string;
    price: number;
    v: number;
  };
}

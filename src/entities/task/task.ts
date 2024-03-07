import { TaskStatus } from "./taskStatus";

export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  status: TaskStatus;
}

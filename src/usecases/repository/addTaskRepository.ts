import { Task } from "../../entities/task/task";
import { AddATaskModel } from "../addTask";

export interface AddTaskRepository {
  add(taskData: AddATaskModel): Promise<Task>;
}

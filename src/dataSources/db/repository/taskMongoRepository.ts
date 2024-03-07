import { Task } from "../../../entities/task/task";
import { AddTaskModel } from "../../../usecases/addTask";
import { AddTaskRepository } from "../../../usecases/repository/addTaskRepository";
import { MongoDbManager } from "../config/mongoDbManager";

export default class TaskMongoRepository implements AddTaskRepository {
  async add(taskData: AddTaskModel): Promise<Task> {
    const taskCollection = MongoDbManager.getInstance().getCollection("tasks");

    const { insertedId } = await taskCollection.insertOne(taskData);

    const taskById = await taskCollection.findOne({ _id: insertedId });
    if (!taskById) throw new Error("Task not found");

    const task: Task = {
      id: taskById._id.toHexString(),
      title: taskById.title,
      description: taskById.description,
      date: taskById.date,
    };
    return task;
  }
}

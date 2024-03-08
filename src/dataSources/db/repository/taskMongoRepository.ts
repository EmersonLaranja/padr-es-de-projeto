import { ObjectId } from "mongodb";
import { Task } from "../../../entities/task/task";
import {
  AddTaskModel,
  DeleteTaskModel,
  AddTaskRepository,
  DeleteTaskRepository,
} from "../../../usecases";

import { MongoDbManager } from "../config/mongoDbManager";
import {
  InvalidParamError,
  NotFoundError,
} from "../../../adapters/presentations/api/errors";

export default class TaskMongoRepository
  implements AddTaskRepository, DeleteTaskRepository
{
  async add(taskData: AddTaskModel): Promise<Task> {
    const taskCollection = MongoDbManager.getInstance().getCollection("tasks");

    const { insertedId } = await taskCollection.insertOne(taskData);

    const taskById = await taskCollection.findOne({ _id: insertedId });
    if (!taskById) throw new NotFoundError("task");

    const task: Task = {
      id: taskById._id.toHexString(),
      title: taskById.title,
      description: taskById.description,
      date: taskById.date,
    };
    return task;
  }

  async delete(taskData: DeleteTaskModel): Promise<void | Error> {
    const taskCollection = MongoDbManager.getInstance().getCollection("tasks");

    if (!ObjectId.isValid(taskData.id)) {
      return new InvalidParamError(taskData.id);
    }
    const { deletedCount } = await taskCollection.deleteOne({
      _id: new ObjectId(taskData.id),
    });
    if (!deletedCount) return new NotFoundError("task");
  }
}

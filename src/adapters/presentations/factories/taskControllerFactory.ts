import { DbAddTask } from "../../../dataSources/db/dbAddTask";
import TaskMongoRepository from "../../../dataSources/db/repository/addTaskMongoRepository";
import TaskController from "../../controllers/task/task";
import DateValidatorAdapter from "../../dateValidatorAdapter";
import { Controller } from "../../interfaces/controller";
import { HttpRequest, HttpResponse } from "../../interfaces/http";

class LogController implements Controller {
  constructor(private readonly controller: Controller) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest);
    if (httpResponse.statusCode === 500) {
      console.log("<LOG>:", httpResponse.body);
    }
    return httpResponse;
  }
}

export const taskControllerFactory = (): Controller => {
  const dateValidatorAdapter = new DateValidatorAdapter();
  const taskMongoRepository = new TaskMongoRepository();
  const dbAddTask = new DbAddTask(taskMongoRepository);
  const taskController = new TaskController(dbAddTask, dateValidatorAdapter);
  return new LogController(taskController);
};

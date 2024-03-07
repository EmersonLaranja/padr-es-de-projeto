import { DbAddTask } from "../../dataSources/db/dbAddTask";
import { LogErrorMongoRepository } from "../../dataSources/db/repository/logErrorMongoRepository";
import TaskMongoRepository from "../../dataSources/db/repository/taskMongoRepository";

import TaskController from "../controllers/task/task";
import DateValidatorAdapter from "../dateValidatorAdapter";
import { LogErrorControllerDecorator } from "../decorators/logErrorControllerDecorator";
import { Controller } from "../interfaces/controller";
import { taskValidationCompositeFactory } from "./taskValidationCompositeFactory";

export const taskControllerFactory = (): Controller => {
  const taskMongoRepository = new TaskMongoRepository();
  const dbAddTask = new DbAddTask(taskMongoRepository);
  const taskController = new TaskController(
    dbAddTask,
    taskValidationCompositeFactory()
  );
  const logMongoRepository = new LogErrorMongoRepository();
  return new LogErrorControllerDecorator(taskController, logMongoRepository);
};

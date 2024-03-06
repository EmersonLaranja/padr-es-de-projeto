import { DbAddTask } from "../../dataSources/db/dbAddTask";
import { LogErrorMongoRepository } from "../../dataSources/db/repository/logErrorMongoRepository";
import TaskMongoRepository from "../../dataSources/db/repository/taskMongoRepository";

import TaskController from "../controllers/task/task";
import DateValidatorAdapter from "../dateValidatorAdapter";
import { LogErrorControllerDecorator } from "../decorators/logErrorControllerDecorator";
import { Controller } from "../interfaces/controller";

export const taskControllerFactory = (): Controller => {
  const dateValidatorAdapter = new DateValidatorAdapter();
  const taskMongoRepository = new TaskMongoRepository();
  const dbAddTask = new DbAddTask(taskMongoRepository);
  const taskController = new TaskController(dbAddTask, dateValidatorAdapter);
  const logMongoRepository = new LogErrorMongoRepository();
  return new LogErrorControllerDecorator(taskController, logMongoRepository);
};

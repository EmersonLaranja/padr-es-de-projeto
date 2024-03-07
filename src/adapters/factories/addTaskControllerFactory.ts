import { DbAddTask } from "../../dataSources/db/dbAddTask";
import { LogErrorMongoRepository } from "../../dataSources/db/repository/logErrorMongoRepository";
import TaskMongoRepository from "../../dataSources/db/repository/taskMongoRepository";

import { AddTaskController } from "../controllers/task/addTask";
import { LogErrorControllerDecorator } from "../decorators/logErrorControllerDecorator";
import { Controller } from "../interfaces/controller";
import { addTaskValidationCompositeFactory } from "./addTaskValidationCompositeFactory";

export const addTaskControllerFactory = (): Controller => {
  const taskMongoRepository = new TaskMongoRepository();
  const dbAddTask = new DbAddTask(taskMongoRepository);
  const taskController = new AddTaskController(
    dbAddTask,
    addTaskValidationCompositeFactory()
  );
  const logMongoRepository = new LogErrorMongoRepository();
  return new LogErrorControllerDecorator(taskController, logMongoRepository);
};

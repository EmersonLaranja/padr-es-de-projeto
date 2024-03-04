import { DbAddTask } from "../../../dataSources/db/dbAddTask";
import TaskMongoRepository from "../../../dataSources/db/repository/addTaskMongoRepository";
import TaskController from "../../controllers/task/task";
import DateValidatorAdapter from "../../dateValidatorAdapter";

export const taskControllerFactory = (): TaskController => {
  const dateValidatorAdapter = new DateValidatorAdapter();
  const taskMongoRepository = new TaskMongoRepository();
  const dbAddTask = new DbAddTask(taskMongoRepository);
  return new TaskController(dbAddTask, dateValidatorAdapter);
};

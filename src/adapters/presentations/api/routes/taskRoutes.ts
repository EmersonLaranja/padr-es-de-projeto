import { Router } from "express";
import TaskController from "../../../controllers/task/task";
import { expressRouteAdapter } from "../../../expressRouteAdapter";
import DateValidatorAdapter from "../../../dateValidatorAdapter";
import { DbAddTask } from "../../../../dataSources/db/dbAddTask";
import TaskMongoRepository from "../../../../dataSources/db/repository/addTaskMongoRepository";

export default (router: Router): void => {
  const dateValidatorAdapter = new DateValidatorAdapter();
  const taskMongoRepository = new TaskMongoRepository();
  const dbAddTask = new DbAddTask(taskMongoRepository);
  const taskController = new TaskController(dbAddTask, dateValidatorAdapter);
  router.post("/tasks", expressRouteAdapter(taskController));
};

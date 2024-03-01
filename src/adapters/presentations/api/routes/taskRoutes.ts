import { Router } from "express";
import TaskController from "../../../controllers/task/task";
import { expressRouteAdapter } from "../../../expressRouteAdapter";
import DateValidatorAdapter from "../../../dateValidatorAdapter";

export default (router: Router): void => {
  const dateValidatorAdapter = new DateValidatorAdapter();
  const taskController = new TaskController(dateValidatorAdapter);
  router.post("/tasks", expressRouteAdapter(taskController));
};

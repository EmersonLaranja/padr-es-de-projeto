import { Router } from "express";
import { expressRouteAdapter } from "../../../expressRouteAdapter";
import { addTaskControllerFactory } from "../../../factories/addTaskControllerFactory";

export default (router: Router): void => {
  router.post("/tasks", expressRouteAdapter(addTaskControllerFactory()));
};

import { Request, Response, Router } from "express";
import TaskController from "../../../controllers/task/task";

export default (router: Router): void => {
  const taskController = new TaskController();
  router.post(
    "/tasks",
    async (req: Request, res: Response) => await taskController.handle(req, res)
  );
};

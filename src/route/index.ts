import express from "express";
import TodoValidator from "../validator"
import Middleware from "../middleware";
import TodoController from "../controller"

const todoRouter = express.Router();

todoRouter.post(
  "/create",
  TodoValidator.checkCreateTodo(),
  Middleware.handleValidationError,
  TodoController.create
);

todoRouter.get(
  "/read",
  TodoValidator.checkReadTodo(),
  Middleware.handleValidationError,
  TodoController.readPagination
);

todoRouter.get(
  "/read/:id",
  TodoValidator.checkIdParam(),
  Middleware.handleValidationError,
  TodoController.readById
);

todoRouter.put(
  "/update/:id",
  TodoValidator.checkIdParam(),
  Middleware.handleValidationError,
  TodoController.update
);

todoRouter.delete(
  "/delete/:id",
  TodoValidator.checkIdParam(),
  Middleware.handleValidationError,
  TodoController.delete
);

export default todoRouter;

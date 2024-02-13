import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { TodoInstance } from "../model";


class TodoController {
  async readPagination(req: Request, res: Response) {
    try {
      const limit = req.query?.limit as number | undefined;
      const offset = req.query?.offset as number | undefined;
      const records = await TodoInstance.findAll({ where: {}, limit, offset });
      return res.json(records);
    } catch (error) {
      return res.json({
        msg: "Fail to read",
        status: 500,
        route: "/read"
      });
    }
  };

  async readById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const record = await TodoInstance.findOne({ where: { id } });
      return res.json(record);
    } catch (error) {
      return res.json({
        msg: "Fail to read",
        status: 500,
        route: "/read/:id"
      })
    }
  };

  async create(req: Request, res: Response) {
    const id = uuidv4();

    try {
      const record = await TodoInstance.create({ ...req.body, id });
      return res.json({
        record,
        msg: "Successfully create todo"
      });
    } catch (error) {
      return res.json({
        msg: "Fail to create",
        status: 500,
        route: "/create"
      });
    }
  };

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const record = await TodoInstance.findOne({ where: { id } });

      if (!record) {
        return res.json({ mg: "Can not find existing record" });
      }

      const updatedRecord = await record.update(
        { completed: !record.getDataValue("completed") }
      );
      return res.json({ record: updatedRecord });
    } catch (error) {
      return res.json({
        msg: "Fail to update",
        status: 500,
        route: "/update/:id"
      })
    }
  };

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const record = await TodoInstance.findOne({ where: { id } });

      if (!record) {
        return res.json({ msg: "Can not find existing record" });
      }

      const deletedRecord = await record.destroy();
      res.json({ record: deletedRecord });
    } catch (error) {
      return res.json({
        msg: "Fail to delete",
        status: 500,
        route: "/delete/:id"
      })
    }
  };
}

export default new TodoController();

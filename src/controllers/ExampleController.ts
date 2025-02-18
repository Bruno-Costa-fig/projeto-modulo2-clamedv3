import { Request, Response } from "express";

class ExampleController {
  constructor() {
    console.log("ExampleController created");
  }

  create = (req: Request, res: Response) => {};

  update = (req: Request, res: Response) => {};

  delete = (req: Request, res: Response) => {};
}

export default ExampleController;

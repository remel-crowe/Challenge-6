import cors from "cors";
import express from "express";

export default class Server {
  #app;
  #port;
  #server;
  #authRouter;
  #garageRouter;

  constructor(port, routers) {
    this.#app = express();
    this.#port = port;
    this.#server = null;
    this.#authRouter = routers.authRouter;
    this.#garageRouter = routers.garageRouter;

    this.#app.use(cors());
    this.#app.use(express.json());

    this.#app.use((req, res, next) => {
      res.header(
        "Access-Control-Allow-Headers",
        "X-Access-Token, Origin, Content-Type, Accept"
      );
      next();
    });

    // Routes
    this.#app.use(this.#authRouter.getPath(), this.#authRouter.getRouter());
    this.#app.use(this.#garageRouter.getPath(), this.#garageRouter.getRouter());
  }

  start() {
    this.#server = this.#app.listen(this.#port);
  }

  close() {
    this.#server?.close();
  }

  getApp() {
    return this.#app;
  }
}

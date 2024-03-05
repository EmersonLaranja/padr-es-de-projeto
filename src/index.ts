import env from "./adapters/presentations/api/config/env";
import app from "./adapters/presentations/api/config/app";
import { MongoDbManager } from "./dataSources/db/config/mongoDbManager";

const connector = MongoDbManager.getInstance();

connector
  .connect(env.mongoUrl)
  .then(() =>
    app.listen(env.port, () => {
      console.log(`Server is running on port http://localhost:${env.port}`);
    })
  )
  .catch(console.error);

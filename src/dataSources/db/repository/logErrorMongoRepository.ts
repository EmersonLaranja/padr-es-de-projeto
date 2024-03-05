import { LogErrorRepository } from "../../../usecases/repository/logErrorRepository";
import { MongoDbManager } from "../config/mongoDbManager";

export class LogErrorMongoRepository implements LogErrorRepository {
  async log(stack: string): Promise<void> {
    const errorCollection =
      MongoDbManager.getInstance().getCollection("errors");
    await errorCollection.insertOne({ stack, date: new Date() });
  }
}

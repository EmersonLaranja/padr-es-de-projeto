import { Collection, MongoClient } from "mongodb";

export class MongoDbManager {
  private static instance: MongoDbManager;
  private client: MongoClient | null = null;
  private constructor() {}

  public static getInstance(): MongoDbManager {
    if (!MongoDbManager.instance) {
      MongoDbManager.instance = new MongoDbManager();
    }
    return MongoDbManager.instance;
  }
  public async connect(uri: string): Promise<void> {
    if (!this.client) {
      this.client = await MongoClient.connect(uri);
    }
  }

  public getCollection(name: string): Collection {
    if (!this.client)
      throw new Error("Database not connected. Call 'connect' method first.");
    return this.client?.db().collection(name);
  }
}

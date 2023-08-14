import { get, set } from "firebase/database";

export class FirebaseController {
  constructor(config, database) {
    this.firebase = config;
    this.database = database;
  }

  getSessions(reference) {
    return get(reference);
  }
}
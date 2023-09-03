import { SessionsController } from "./modules/sessions/controllers/SessionsController";
import { firebeseConfig } from "./modules/firebase/config/firebase-config";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child } from "firebase/database";

const firebase = initializeApp(firebeseConfig);
const database = getDatabase(firebase);

const sessionsController = new SessionsController(firebase, database);

export {
  sessionsController
}
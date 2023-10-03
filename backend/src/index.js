import { SessionsController } from "./modules/sessions/controllers/SessionsController";
import { firebaseConfig } from "../configs/firebase-config";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

const sessionsController = new SessionsController(firebase, database);

export { sessionsController };

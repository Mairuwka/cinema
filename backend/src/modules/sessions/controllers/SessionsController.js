import { FirebaseController } from "../../firebase/controllers/FirebaseController";
import {
  child as firebaseChild,
  get as firebaseGet,
  set as firebaseSet,
  ref as firebaseRef,
} from "firebase/database";

export class SessionsController extends FirebaseController {
  getSessionsOfDay(date) {
    try {
      const ref = firebaseChild(firebaseRef(this.database, "sessions"), date);

      return firebaseGet(ref);
    }
    catch (e) {
      throw e;
    }
  }

  setSessionsOfDay(data) {
    try {
      const ref = firebaseRef(this.database, "sessions");

      return firebaseSet(ref, data);
    }
    catch (e) {
      throw e;
    }
  }
}

import { FirebaseController } from "../../firebase/controllers/FirebaseController";
import {
  child as firebaseChild,
  get as firebaseGet,
  set as firebaseSet,
  ref as firebaseRef,
} from "firebase/database";

export class SessionsController extends FirebaseController {
  getSessionsOfDay(date) {
    // eslint-disable-next-line no-useless-catch
    try {
      const ref = firebaseChild(firebaseRef(this.database, "sessions"), date);

      return firebaseGet(ref);
    }
    catch (e) {
      throw e;
    }
  }

  setSessionsOfDay(data) {
    // eslint-disable-next-line no-useless-catch
    try {
      const ref = firebaseRef(this.database, "sessions");

      return firebaseSet(ref, data);
    }
    catch (e) {
      throw e;
    }
  }
}

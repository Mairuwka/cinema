import {FirebaseController} from "../../firebase/controllers/FirebaseController";
import {
  child as firebaseChild,
  get as firebaseGet,
  set as firebaseSet,
  ref as firebaseRef
} from "firebase/database";

export class SessionsController extends FirebaseController {
  get(date) {
    const ref = firebaseChild(firebaseRef(this.database, "sessions"), date);

    return firebaseGet(ref);
  }

  set(data) {
    const ref = firebaseRef(this.database, "sessions");

    return firebaseSet(ref, data);
  }
}
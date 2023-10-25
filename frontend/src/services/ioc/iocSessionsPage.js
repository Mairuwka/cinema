import { SessionsService } from "@/services/session/SessionsService";
import { sessionsController } from "../../../../backend/src";
import { SessionsApi } from "@/api/sessions/SessionsApi";

const sessionsApi = new SessionsApi(sessionsController);
const sessionsService = new SessionsService(sessionsApi);

export { sessionsService };

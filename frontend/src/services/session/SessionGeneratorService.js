import dayjs from "dayjs";
import { Session } from "@/services/session/Session";
import {
  MAX_COUNT_SHOW_SESSION,
  MAX_DURATION_SESSION,
} from "@/components/sessions/constants/constants";

export class SessionGeneratorService {
  constructor() {
    this.amountSession = MAX_COUNT_SHOW_SESSION;
    this.sessionDuration = MAX_DURATION_SESSION;
  }

  generateSessions(date) {
    const minSessionStartTime = dayjs(date).set("hour", 10).set("minute", 0);

    return Array.from({ length: this.amountSession }, (_, elem) => {
      const sessionStartTime = minSessionStartTime.add(
        elem * this.sessionDuration,
        "hour"
      );
      const sessionEndTime = sessionStartTime.add(this.sessionDuration, "hour");

      return new Session({
        title: "Terminator",
        date: date,
        startTime: sessionStartTime,
        endTime: sessionEndTime,
        totalSeats: 50,
        ticketsSold: 0,
      });
    });
  }
}

import { LocalStorage } from "@/helpers/LocalStorage";
import { Session } from "@/services/session/Session";
import {
  MAX_COUNT_SHOW_SESSION,
  MAX_DURATION_SESSION,
} from "@/components/sessions/constants/constants";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export class SessionsService {
  constructor() {
    this.sessions = {};
    this.amountSession = MAX_COUNT_SHOW_SESSION;
    this.sessionDuration = MAX_DURATION_SESSION;
  }
  setSessions(date, sessions) {
    LocalStorage.set(date, sessions);
    this.sessions[date] = sessions;
  }

  getSessions(date) {
    return this.sessions[date] ?? LocalStorage.get(date);
  }

  isWithinRange(dateToCheck) {
    const currentDate = dayjs().startOf("day");
    const startDate = currentDate.subtract(7, "day");
    const endDate = currentDate.add(7, "day");

    return dateToCheck.isBetween(startDate, endDate, null, "[]");
  }

  isSessionExpiredToBuyTickets(date) {
    const currentTime = dayjs();
    const startTimeObj = dayjs(date, "YYYY-MM-DD HH:mm");

    return currentTime.isBefore(startTimeObj);
  }

  transformSessionsForDisplay(sessionsForDay) {
    return sessionsForDay.map((session) => {
      const cardActive = this.isSessionExpiredToBuyTickets(session.startTime);

      return {
        title: session.title,
        sessionStartTime: dayjs(session.startTime).format("HH:mm"),
        sessionEndTime: dayjs(session.endTime).format("HH:mm"),
        isActiveCard: cardActive,
      };
    });
  }

  generateSessionsForDate(date) {
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

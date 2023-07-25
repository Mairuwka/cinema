import { LocalStorage } from "@/helpers/LocalStorage";
import { Session } from "./Session";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
import {
  MAX_DURATION_SESSION,
  MAX_COUNT_SHOW_SESSION,
} from "@/components/sessions/constants/constants";

export class SessionsService {
  constructor() {
    this.sessions = {};
    this.amountSession = MAX_COUNT_SHOW_SESSION;
    this.sessionDuration = MAX_DURATION_SESSION;
  }
  setSessions(date) {
    if (this.isWithinRange(date)) this.createSessions(date);
  }

  getSessions(date) {
    let selectedDate = dayjs(date);

    if (!LocalStorage.get(selectedDate.format("YYYY-MM-DD"))) {
      this.setSessions(selectedDate);
    }

    return (
      this.sessions[date] ?? LocalStorage.get(selectedDate.format("YYYY-MM-DD"))
    );
  }

  createSessions(date) {
    const daySessions = this._generateSessions(date);

    const formattedDate = date.format("YYYY-MM-DD");

    LocalStorage.set(formattedDate, daySessions);
    this.sessions[formattedDate] = daySessions;
  }

  _generateSessions(date) {
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

  isWithinRange(dateToCheck) {
    const currentDate = dayjs().startOf("day");
    const startDate = currentDate.subtract(7, "day");
    const endDate = currentDate.add(7, "day");

    return dateToCheck.isBetween(startDate, endDate, null, "[]");
  }

  isCurrentTimeAfter(date) {
    const currentTime = dayjs();
    const startTimeObj = dayjs(date, "YYYY-MM-DD HH:mm");

    return currentTime.isAfter(startTimeObj);
  }

  transformSessionsForDisplay(sessionsForDay) {
    return sessionsForDay.map((session) => {
      const cardActive = !this.isCurrentTimeAfter(session.startTime);

      return {
        title: session.title,
        sessionStartTime: dayjs(session.startTime).format("HH:mm"),
        sessionEndTime: dayjs(session.endTime).format("HH:mm"),
        isActiveCard: cardActive,
      };
    });
  }
}

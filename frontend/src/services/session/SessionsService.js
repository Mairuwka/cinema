import { LocalStorage } from "@/helpers/LocalStorage";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { SessionGeneratorService } from "@/services/session/SessionGeneratorService";
dayjs.extend(isBetween);

export class SessionsService {
  constructor() {
    this.sessions = {};
  }
  setSessions(date) {
    if (this.isWithinRange(date)) {
      const sessionGeneratorService = new SessionGeneratorService();
      const daySessions = sessionGeneratorService.generateSessions(date);

      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      LocalStorage.set(formattedDate, daySessions);
      this.sessions[formattedDate] = daySessions;
    }
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

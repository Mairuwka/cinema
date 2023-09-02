import { Session } from "@/services/session/Session";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export class SessionsService {
  constructor(controller) {
    this.controller = controller;
  }

  async getSessions(date) {
    try {
      const snapshot = await this.controller.getSessions(date);

      if (snapshot.exists()) {
        const sessions = snapshot.val();
        return sessions.map((session) => new Session(session));
      }
    } catch (error) {
      throw "Ошибка при получении сессий: " + error;
    }
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
}

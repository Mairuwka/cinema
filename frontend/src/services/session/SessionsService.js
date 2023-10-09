import { Session } from "@/services/session/Session";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export class SessionsService {
  constructor(api) {
    this.api = api;
  }

  async getSessionsOfDay(date) {
    let sessions = [];

    // eslint-disable-next-line no-useless-catch
    try {
      const snapshot = await this.api.getSessionsOfDay(date);

      if (snapshot.exists() && this.isWithinRange(dayjs(date))) {
        sessions = snapshot.val();
      } else {
        throw new Error("Сессии отсутствуют");
      }
    } catch (error) {
      throw error.message || "Что-то пошло не так, повторите попытку позже";
    }

    return this.transformSessionsForDisplay(
      sessions.map((session) => new Session(session))
    );
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
}

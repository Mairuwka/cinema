import { sessionsController } from "../../../../backend/src/index";
import { Session } from "@/services/session/Session";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export class SessionsService {
  async get(date) {
    let result = {
      success: true,
      data: [],
    };

    try {
      const snapshot = await sessionsController.get(date);

      if (snapshot.exists()) {
        const sessions = snapshot.val();

        result.data = sessions.map((session) => new Session(session));
      }
    } catch (error) {
      result.success = false;
      result.error = error;
    }

    return result;
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

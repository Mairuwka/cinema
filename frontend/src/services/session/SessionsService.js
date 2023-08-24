import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export class SessionsService {
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

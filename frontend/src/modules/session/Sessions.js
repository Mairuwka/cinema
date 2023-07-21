import { LocalStorage } from "@/helpers/LocalStorage";
import { Session } from "./Session";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export class Sessions {
  constructor() {
    this.sessions = {};
    this.amountSession = 6;
    this.sessionDuration = 2;
  }
  setSessions(date) {
    if (this.isWithinRange(date)) this.createSessions(date);
  }

  getSessions(key, date) {
    let selectedDate = dayjs(date);

    if (!LocalStorage.get(selectedDate.format("YYYY-MM-DD"))) {
      this.setSessions(selectedDate);
    }

    return (
      this.sessions[key] ?? LocalStorage.get(selectedDate.format("YYYY-MM-DD"))
    );
  }

  createSessions(date) {
    const sessionsDayArr = [];

    const minSessionStartTime = dayjs(date).set("hour", 10).set("minute", 0);

    for (let i = 0; i < this.amountSession; i++) {
      const sessionStartTime = minSessionStartTime.add(
        i * this.sessionDuration,
        "hour"
      );
      const sessionEndTime = sessionStartTime.add(this.sessionDuration, "hour");

      sessionsDayArr.push(
        new Session({
          title: "Terminator",
          date: date,
          startTime: sessionStartTime,
          endTime: sessionEndTime,
          totalSeats: 50,
          ticketsSold: 0,
        })
      );
    }

    const formattedDate = date.format("YYYY-MM-DD");

    LocalStorage.set(formattedDate, sessionsDayArr);
    this.sessions[formattedDate] = sessionsDayArr;
  }

  isWithinRange(dateToCheck) {
    const currentDate = dayjs().startOf("day");
    const startDate = currentDate.subtract(7, "day");
    const endDate = currentDate.add(7, "day");

    return dateToCheck.isBetween(startDate, endDate, null, "[]");
  }

  createSessionBlock(title, start, end, active) {
    return `
            <a href="#" class="card ${
              active ? "card-active" : "card-inactive"
            }">
                <div class="card__title">${title}</div>
                <div class="card__timestamp">${start} - ${end}</div>
            </a>
        `;
  }
}

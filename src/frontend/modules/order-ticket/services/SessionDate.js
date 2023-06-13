import LocalStorage from "./LocalStorage";
import dayjs from "dayjs";

export default class SessionDate {
    constructor() {
        this.sessions = {};
    }

    setSessionData(currentDate) {
        this.createDatesAndSessionObj(currentDate);

        LocalStorage.set("schedule", this.sessions);
    }

    createDatesAndSessionObj(currentDate) {
        this.sessions[currentDate] = this.createSessionsArr()

        this.calculationDate(this.sessions, currentDate, "-", 7);
        this.calculationDate(this.sessions, currentDate, "+", 7);
    }

    calculationDate(obj, date, operator, numDays) {
        for (let i = 1; i <= numDays; i++) {
            let newDate = dayjs(date);
            if(operator === "-"){
                newDate = newDate.subtract(i, 'day');
            } else {
                newDate = newDate.add(i, 'day');
            }
            obj[newDate.format('YYYY-MM-DD')] = this.createSessionsArr();
        }
    }

    createSessionsArr() {
        const sessionArr = [];

        const minSessionStartTime = dayjs().set("hour", 10).set("minute", 0);
        const sessionDuration = 2;

        for (let i = 0; i < 6; i++) {
            const sessionStartTime = minSessionStartTime.add(i * sessionDuration, 'hour');
            const sessionEndTime = sessionStartTime.add(sessionDuration, 'hour');

            sessionArr.push({
                'title': "Terminator",
                "sessionStartTime": sessionStartTime.format("HH:mm"),
                "sessionEndTime": sessionEndTime.format("HH:mm"),
                'totalSeats': 50,
                'ticketsSold': 0
            })
        }

        return sessionArr;
    }
}
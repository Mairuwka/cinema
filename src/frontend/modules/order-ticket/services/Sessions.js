import { LocalStorage } from "../../../js/helpers/LocalStorage";
import { Session } from "./Session"
import dayjs from "dayjs";
const isBetween = require('dayjs/plugin/isBetween');
dayjs.extend(isBetween);

export class Sessions {
    setSession(date) {
        if(this.isWithinRange(date))
            LocalStorage.set(date.format('YYYY-MM-DD'), this.createSessionsArr(date));
    }

    getSessions(key, date) {
        let selectedDate = dayjs(date);
        this.setSession(selectedDate)

        return LocalStorage.get(key);
    }

    createSessionsArr(date) {
        const sessionsDayArr = [];

        const minSessionStartTime = dayjs(date).set("hour", 10).set("minute", 0);
        const sessionDate = date;
        const sessionDuration = 2;

        for (let i = 0; i < 6; i++) {
            const sessionStartTime = minSessionStartTime.add(i * sessionDuration, 'hour');
            const sessionEndTime = sessionStartTime.add(sessionDuration, 'hour');

            sessionsDayArr.push(new Session({
                "title": "Terminator",
                "date": sessionDate,
                "startTime": sessionStartTime,
                "endTime": sessionEndTime,
                "totalSeats": 50,
                "ticketsSold": 0
            }))
        }

        return sessionsDayArr;
    }

    isWithinRange(dateToCheck) {
        const currentDate = dayjs().startOf('day');
        const startDate = currentDate.subtract(7, 'day');
        const endDate = currentDate.add(7, 'day');

        return dateToCheck.isBetween(startDate, endDate, null, '[]');
    }
}
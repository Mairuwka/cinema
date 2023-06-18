import dayjs from "dayjs";

export class Validation {
    static isCurrentTimeAfter(date) {
        const currentTime = dayjs();
        const startTimeObj = dayjs(date, 'YYYY-MM-DD HH:mm');

        return currentTime.isAfter(startTimeObj);
    }
}
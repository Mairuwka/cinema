import { Sessions } from "./services/Sessions";
import { Validation } from "../../js/helpers/Validation";

import dayjs from 'dayjs';
import './ui/styles/style.scss';

const datepicker = document.querySelector('.date-picker');
const date = dayjs();
const currentFormatDate = date;
datepicker.value = currentFormatDate.format("YYYY-MM-DD");
datepicker.addEventListener('change', showSessionInPage)

let sessions = new Sessions();

sessions.setSession(currentFormatDate);
showSessionInPage(currentFormatDate.format('YYYY-MM-DD'))

function showSessionInPage(currentDate = null) {
    let date = this ? this.value : currentDate;
    let key = this ? this.value : currentDate;

    const sessionsForDay = sessions.getSessions(key, date)

    const blockSessions = document.querySelector('.sessions')

    blockSessions.innerHTML = '';

    if(!sessionsForDay) {
        blockSessions.innerHTML = 'Сеансов на заданный день нет';
        return;
    }

    for (const session in sessionsForDay) {
        const title = sessionsForDay[session].title;
        const startTime = sessionsForDay[session].startTime;
        const endTime = sessionsForDay[session].endTime;

        const formattedStartTime = dayjs(startTime).format('HH:mm');
        const formattedEndTime = dayjs(endTime).format('HH:mm');

        let cardActive = true;
        if(Validation.hasTimePassedSession(startTime)) {
            cardActive = false
        }

        let sessionBlock = `
            <a href="#" class="card ${cardActive ? 'card-active' : 'card-inactive'}">
                <div class="card__title">${title}</div>
                <div class="card__timestamp">${formattedStartTime} - ${formattedEndTime}</div>
            </a>
        `
        blockSessions.innerHTML += sessionBlock;
    }
}

import { Sessions } from "./services/Sessions";
import { Validation } from "../../js/helpers/Validation";

import dayjs from 'dayjs';
import './ui/styles/style.scss';

const datepicker = document.querySelector('.date-picker');
const date = dayjs();
const currentFormatDate = date;
datepicker.value = currentFormatDate.format("YYYY-MM-DD");
datepicker.addEventListener('change', showSessionInPage)

const sessions = new Sessions();

sessions.setSessions(currentFormatDate);
showSessionInPage(currentFormatDate.format('YYYY-MM-DD'))

function showSessionInPage(currentDate = null) {
    const date = this ? this.value : currentDate;
    const key = this ? this.value : currentDate;

    const sessionsForDay = sessions.getSessions(key, date)

    const blockSessions = document.querySelector('.sessions')

    blockSessions.innerHTML = '';

    if(!sessionsForDay) {
        blockSessions.innerHTML = 'Сеансов на заданный день нет';
        return;
    }

    let blockSessionsStr = '';

    for (const session of sessionsForDay) {
        const title = session.title;
        const startTime = session.startTime;
        const endTime = session.endTime;

        const formattedStartTime = dayjs(startTime).format('HH:mm');
        const formattedEndTime = dayjs(endTime).format('HH:mm');

        let cardActive = true;
        if(Validation.isCurrentTimeAfter(startTime)) {
            cardActive = false
        }

        let sessionBlock = `
            <a href="#" class="card ${cardActive ? 'card-active' : 'card-inactive'}">
                <div class="card__title">${title}</div>
                <div class="card__timestamp">${formattedStartTime} - ${formattedEndTime}</div>
            </a>
        `
        blockSessionsStr += sessionBlock;
    }

    blockSessions.innerHTML = blockSessionsStr;
}

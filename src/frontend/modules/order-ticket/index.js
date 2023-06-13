import SessionDate from "./services/SessionDate";
import Sessions from "./services/Sessions";

import dayjs from 'dayjs';
import './ui/styles/style.scss';

const datepicker = document.querySelector('.date-picker');

const date = dayjs();

const currentFormatDate = date.format('YYYY-MM-DD');

datepicker.addEventListener('change', addSessionInPage)

datepicker.value = currentFormatDate;

let sessionDate = new SessionDate();
let sessions = new Sessions();

sessionDate.setSessionData(currentFormatDate);

addSessionInPage(currentFormatDate)

function addSessionInPage(currentDate = null) {
    let sessionsForDay = sessions.getSessionsData('schedule', this ? this.value : currentDate)

    const blockSessions = document.querySelector('.sessions')

    blockSessions.innerHTML = '';

    if(!Array.isArray(sessionsForDay)) {
        blockSessions.innerHTML = 'Сеансов на заданный день нет';
        return;
    }

    for (const session in sessionsForDay) {
        let sessionBlock = `
            <a href="#" class="card">
                <div class="card-title">${sessionsForDay[session].title}</div>
                <div class="card-time">${sessionsForDay[session].sessionStartTime} - ${sessionsForDay[session].sessionEndTime}</div>
            </a>
        `
        blockSessions.innerHTML += sessionBlock;
    }
}

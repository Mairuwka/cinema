export class Session {
    constructor(session) {
        this.title = session.title;
        this.date = session.date;
        this.startTime = session.startTime;
        this.endTime = session.endTime;
        this.totalSeats = session.totalSeats;
        this.ticketsSold = session.ticketsSold;
    }
}
export class SessionsApi {
  constructor(controller) {
    this.controller = controller;
  }

  async getSessionsOfDay(date) {
    let sessions = [];

    sessions = await this.controller.getSessionsOfDay(date);

    return sessions;
  }
}

export class SessionsApi {
  constructor(controller) {
    this.controller = controller;
  }

  async getSessionsOfDay(date) {
    let sessions = [];

    // eslint-disable-next-line no-useless-catch
    try {
      sessions = await this.controller.getSessionsOfDay(date);
    } catch (error) {
      throw error;
    }

    return sessions;
  }
}

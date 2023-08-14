import { SessionsService } from "@/services/session/SessionsService";
import dayjs from "dayjs";

describe("SessionService", () => {
  let sessionsService, daySessions;
  beforeEach(() => {
    sessionsService = new SessionsService();
    daySessions = [
      {
        title: "Session 1",
        startTime: "09:00",
        endTime: "10:30",
      },
      {
        title: "Session 2",
        startTime: "11:00",
        endTime: "12:30",
      },
    ];
  });

  afterEach(() => {
    jest.clearAllMocks();
    sessionsService = null;
    daySessions = null;
  });

  describe("Constructor", () => {
    it("checking for instance", () => {
      expect(sessionsService).toBeInstanceOf(SessionsService);
    });
  });

  describe("Method isSessionExpiredToBuyTickets", () => {
    it("should return true if the time has not yet expired", () => {
      const date = dayjs().startOf("day").add(1, "day");

      const result = sessionsService.isSessionExpiredToBuyTickets(date);

      expect(result).toBeTruthy();
    });

    it("should return false if the time has expired", () => {
      const date = dayjs().startOf("day").subtract(1, "day");

      const result = sessionsService.isSessionExpiredToBuyTickets(date);

      expect(result).toBeFalsy();
    });
  });

  describe("Method transformSessionsForDisplay", () => {
    it("transforms sessions correctly", () => {
      sessionsService.isSessionExpiredToBuyTicketsMock = jest
        .fn()
        .mockImplementationOnce(() => false);

      const sessions = sessionsService.transformSessionsForDisplay(daySessions);

      expect(sessions).toStrictEqual([
        {
          title: "Session 1",
          sessionStartTime: "09:00",
          sessionEndTime: "10:30",
          isActiveCard: false,
        },
        {
          title: "Session 2",
          sessionStartTime: "11:00",
          sessionEndTime: "12:30",
          isActiveCard: false,
        },
      ]);
    });
  });
});
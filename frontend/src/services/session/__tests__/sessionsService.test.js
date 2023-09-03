import { SessionsService } from "@/services/session/SessionsService";
import dayjs from "dayjs";
import { Session } from "@/services/session/Session";

function sessionsServiceFactory(controllerMock) {
  return new SessionsService(controllerMock);
}

describe("SessionService", () => {
  let daySessions;

  beforeEach(() => {
    daySessions = [
      new Session({
        title: "Session 1",
        startTime: dayjs().hour(9).minute(0),
        endTime: dayjs().hour(11).minute(0),
      }),
      new Session({
        title: "Session 2",
        startTime: dayjs().hour(11).minute(0),
        endTime: dayjs().hour(13).minute(0),
      }),
    ];
  });

  afterEach(() => {
    jest.clearAllMocks();
    daySessions = null;
  });

  describe("Constructor", () => {
    it("checking for instance", () => {
      const sessionsControllerMock = {
        getSessions: jest.fn().mockReturnValue({
          exists: jest.fn().mockReturnValue(true),
          val: jest.fn().mockImplementation(() => daySessions),
        }),
      };
      const sessionsService = sessionsServiceFactory(sessionsControllerMock);

      expect(sessionsService).toBeInstanceOf(SessionsService);
    });
  });

  describe("Method get", () => {
    it("should return array if current day", async () => {
      const date = dayjs().startOf("day").add(1, "day").format("YYYY-MM-DD");
      const sessionsControllerMock = {
        getSessions: jest.fn().mockReturnValue({
          exists: jest.fn().mockReturnValue(true),
          val: jest.fn().mockImplementation(() => daySessions),
        }),
      };
      const sessionsService = sessionsServiceFactory(sessionsControllerMock);
      const getSessionsServiceSpyOn = jest.spyOn(
        sessionsControllerMock,
        "getSessions"
      );

      const sessions = await sessionsService.getSessions(date);

      expect(getSessionsServiceSpyOn).toHaveBeenCalled();
      expect(sessions).toStrictEqual(daySessions);
    });
  });

  describe("Method isSessionExpiredToBuyTickets", () => {
    it("should return true if the time has not yet expired", () => {
      const date = dayjs().startOf("day").add(1, "day");
      const sessionsControllerMock = {
        getSessions: jest.fn().mockReturnValue({
          exists: jest.fn().mockReturnValue(true),
          val: jest.fn().mockImplementation(() => daySessions),
        }),
      };
      const sessionsService = sessionsServiceFactory(sessionsControllerMock);

      const result = sessionsService.isSessionExpiredToBuyTickets(date);

      expect(result).toBeTruthy();
    });

    it("should return false if the time has expired", () => {
      const date = dayjs().startOf("day").subtract(1, "day");
      const sessionsControllerMock = {
        getSessions: jest.fn().mockReturnValue({
          exists: jest.fn().mockReturnValue(true),
          val: jest.fn().mockImplementation(() => daySessions),
        }),
      };
      const sessionsService = sessionsServiceFactory(sessionsControllerMock);

      const result = sessionsService.isSessionExpiredToBuyTickets(date);

      expect(result).toBeFalsy();
    });
  });

  describe("Method transformSessionsForDisplay", () => {
    it("transforms sessions correctly", () => {
      const sessionsControllerMock = {
        getSessions: jest.fn().mockReturnValue({
          exists: jest.fn().mockReturnValue(true),
          val: jest.fn().mockImplementation(() => daySessions),
        }),
      };
      const sessionsService = sessionsServiceFactory(sessionsControllerMock);
      sessionsService.isSessionExpiredToBuyTickets = jest
        .fn()
        .mockImplementation(() => false);

      const sessions = sessionsService.transformSessionsForDisplay(daySessions);

      expect(sessions).toStrictEqual([
        {
          title: "Session 1",
          sessionStartTime: "09:00",
          sessionEndTime: "11:00",
          isActiveCard: false,
        },
        {
          title: "Session 2",
          sessionStartTime: "11:00",
          sessionEndTime: "13:00",
          isActiveCard: false,
        },
      ]);
    });
  });
});

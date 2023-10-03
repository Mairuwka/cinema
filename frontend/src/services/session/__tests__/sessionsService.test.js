import { SessionsService } from "@/services/session/SessionsService";
import dayjs from "dayjs";
import { Session } from "@/services/session/Session";

function createService(controllerMock) {
  return new SessionsService(controllerMock);
}

describe("SessionService", () => {
  let daySessions, sessionsControllerMock;

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
    sessionsControllerMock = {
      getSessions: jest.fn().mockReturnValue(() => daySessions),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
    daySessions = null;
    sessionsControllerMock = null;
  });

  describe("Constructor", () => {
    it("Проверка экземпляра", () => {
      const sessionsService = createService(sessionsControllerMock);

      expect(sessionsService).toBeInstanceOf(SessionsService);
    });
  });

  describe("Method get", () => {
    it("Если корректный день, проверить что вызвался метод getSessions", async () => {
      const date = dayjs().startOf("day").add(1, "day").format("YYYY-MM-DD");
      sessionsControllerMock.getSessions = jest.fn().mockReturnValue({
        exists: jest.fn().mockReturnValue(true),
        val: jest.fn().mockImplementation(() => daySessions),
      });
      const sessionsService = createService(sessionsControllerMock);
      const getSessionsServiceSpyOn = jest.spyOn(
        sessionsControllerMock,
        "getSessions"
      );

      await sessionsService.getSessions(date);

      expect(getSessionsServiceSpyOn).toHaveBeenCalled();
    });

    it("Если корректный день, вернуть массив сеансов", async () => {
      const date = dayjs().startOf("day").add(1, "day").format("YYYY-MM-DD");
      sessionsControllerMock.getSessions = jest.fn().mockReturnValue({
        exists: jest.fn().mockReturnValue(true),
        val: jest.fn().mockImplementation(() => daySessions),
      });
      const sessionsService = createService(sessionsControllerMock);
      const expectedResult = sessionsService.transformSessionsForDisplay(
        daySessions.map((session) => new Session(session))
      );

      const sessions = await sessionsService.getSessions(date);

      expect(sessions).toStrictEqual(expectedResult);
    });
  });

  describe("Method isSessionExpiredToBuyTickets", () => {
    it("Должно вернуть true, если время еще не истекло", () => {
      const date = dayjs().startOf("day").add(1, "day");
      const sessionsService = createService(sessionsControllerMock);

      const result = sessionsService.isSessionExpiredToBuyTickets(date);

      expect(result).toBeTruthy();
    });

    it("Должен вернуть false, если время истекло", () => {
      const date = dayjs().startOf("day").subtract(1, "day");
      const sessionsService = createService(sessionsControllerMock);

      const result = sessionsService.isSessionExpiredToBuyTickets(date);

      expect(result).toBeFalsy();
    });
  });

  describe("Method transformSessionsForDisplay", () => {
    it("Трансформация сессий корректно выполнилась", () => {
      const sessionsService = createService(sessionsControllerMock);
      sessionsService.isSessionExpiredToBuyTickets = jest
        .fn()
        .mockImplementation(() => false);
      const expectedResult = [
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
      ];

      const sessions = sessionsService.transformSessionsForDisplay(daySessions);

      expect(sessions).toStrictEqual(expectedResult);
    });
  });

  describe("Method isWithinRange", () => {
    it("Должен вернуть false, если дата вне диапазона", () => {
      const date = dayjs().startOf("day").add(8, "day");
      const sessionsService = createService(sessionsControllerMock);

      const result = sessionsService.isWithinRange(date);

      expect(result).toBeFalsy();
    });

    it("Должен вернуть true, если дата в диапазоне", () => {
      const date = dayjs();
      const sessionsService = createService(sessionsControllerMock);

      const result = sessionsService.isWithinRange(date);

      expect(result).toBeTruthy();
    });
  });
});

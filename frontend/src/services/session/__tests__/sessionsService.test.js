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
      getSessionsOfDay: jest.fn().mockReturnValue({
        exists: jest.fn().mockReturnValue(true),
        val: jest.fn().mockImplementation(() => daySessions),
      }),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
    daySessions = null;
    sessionsControllerMock = null;
  });

  describe("Конструктор", () => {
    it("Проверка экземпляра", () => {
      const sessionsService = createService(sessionsControllerMock);

      expect(sessionsService).toBeInstanceOf(SessionsService);
    });
  });

  describe("Метод getSessionsOfDay", () => {
    it("Должен вызвать метод getSessionsOfDay из контроллера, если передан корректный день", async () => {
      const date = dayjs().startOf("day").add(1, "day").format("YYYY-MM-DD");
      const sessionsService = createService(sessionsControllerMock);
      const getSessionsOfDayServiceSpyOn = jest.spyOn(
        sessionsControllerMock,
        "getSessionsOfDay"
      );

      await sessionsService.getSessionsOfDay(date);

      expect(getSessionsOfDayServiceSpyOn).toHaveBeenCalled();
    });

    it("Должен вернуть массив сеансов, если передан корректный день", async () => {
      const date = dayjs().startOf("day").add(1, "day").format("YYYY-MM-DD");
      const sessionsService = createService(sessionsControllerMock);
      const expectedResult =
        sessionsService.transformSessionsForDisplay(daySessions);

      const sessions = await sessionsService.getSessionsOfDay(date);

      expect(sessions).toStrictEqual(expectedResult);
    });
  });

  describe("Метод isSessionExpiredToBuyTickets", () => {
    it("Должен вернуть true, если время сеанса еще не истекло", () => {
      const date = dayjs().startOf("day").add(1, "day");
      const sessionsService = createService(sessionsControllerMock);

      const result = sessionsService.isSessionExpiredToBuyTickets(date);

      expect(result).toBeTruthy();
    });

    it("Должен вернуть false, если время сеанса истекло", () => {
      const date = dayjs().startOf("day").subtract(1, "day");
      const sessionsService = createService(sessionsControllerMock);

      const result = sessionsService.isSessionExpiredToBuyTickets(date);

      expect(result).toBeFalsy();
    });
  });

  describe("Метод transformSessionsForDisplay", () => {
    it("Должен корректно трансформировать сеансы", () => {
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

  describe("Метод isWithinRange", () => {
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

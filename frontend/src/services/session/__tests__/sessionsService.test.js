import { SessionsService } from "@/services/session/SessionsService";
import { LocalStorage } from "@/helpers/LocalStorage";
import dayjs from "dayjs";
import { SessionGeneratorService } from "@/services/session/SessionGeneratorService";

describe("SessionService", () => {
  let sessionsService;
  beforeEach(() => {
    sessionsService = new SessionsService();
  });

  afterEach(() => {
    jest.clearAllMocks();
    sessionsService = null;
  });

  describe("Constructor", () => {
    it("Checking for instance", () => {
      expect(sessionsService).toBeInstanceOf(SessionsService);
    });
  });

  describe("getSessions method", () => {
    it("Should return null if there is no data", () => {
      const date = dayjs().format("YYYY-MM-DD");
      const getLocalStorageSpy = jest.spyOn(LocalStorage, "get");

      const result = sessionsService.getSessions(date);

      expect(getLocalStorageSpy).toHaveBeenCalled();
      expect(result).toBeNull();
    });

    it("Should return data if available", () => {
      const date = dayjs().format("YYYY-MM-DD");
      const sessionGeneratorService = new SessionGeneratorService();
      const daySessions = sessionGeneratorService.generateSessions(date);
      const setLocalStorageSpy = jest.spyOn(LocalStorage, "set");

      sessionsService.setSessions(date, daySessions);
      const result = sessionsService.getSessions(date);

      expect(setLocalStorageSpy).toHaveBeenCalled();
      expect(sessionsService.sessions[date]).not.toBeUndefined();
      expect(result).toBe(daySessions);
    });
  });

  describe("setSessions method", () => {
    it("Should write data", () => {
      const date = dayjs().format("YYYY-MM-DD");
      const sessionGeneratorService = new SessionGeneratorService();
      const daySessions = sessionGeneratorService.generateSessions(date);
      const setLocalStorageSpy = jest.spyOn(LocalStorage, "set");

      sessionsService.setSessions(date, daySessions);

      expect(setLocalStorageSpy).toHaveBeenCalled();
      expect(sessionsService.sessions[date]).not.toBeUndefined();
    });
  });

  describe("isWithinRange method", () => {
    it("Should return false if date is not in range", () => {
      const date = dayjs().startOf("day").add(8, "day");

      const result = sessionsService.isWithinRange(date);

      expect(result).toBeFalsy();
    });

    it("Should return true if date is in range", () => {
      const date = dayjs();

      const result = sessionsService.isWithinRange(date);

      expect(result).toBeTruthy();
    });
  });

  describe("isSessionExpiredToBuyTickets method", () => {
    it("Should return true if the time has not yet expired", () => {
      const date = dayjs().startOf("day").add(1, "day");

      const result = sessionsService.isSessionExpiredToBuyTickets(date);

      expect(result).toBeTruthy();
    });

    it("Should return false if the time has expired", () => {
      const date = dayjs().startOf("day").subtract(1, "day");

      const result = sessionsService.isSessionExpiredToBuyTickets(date);

      expect(result).toBeFalsy();
    });
  });

  describe("transformSessionsForDisplay method", () => {
    it("transforms sessions correctly", () => {
      const sessionsForDay = [
        {
          title: "Session 1",
          startTime: dayjs().set("hour", 9).set("minute", 0),
          endTime: dayjs().set("hour", 10).set("minute", 30),
        },
        {
          title: "Session 2",
          startTime: dayjs().set("hour", 11).set("minute", 0),
          endTime: dayjs().set("hour", 12).set("minute", 30),
        },
      ];
      sessionsService.isSessionExpiredToBuyTicketsMock = jest
        .fn()
        .mockImplementationOnce(() => false);

      const sessions =
        sessionsService.transformSessionsForDisplay(sessionsForDay);

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

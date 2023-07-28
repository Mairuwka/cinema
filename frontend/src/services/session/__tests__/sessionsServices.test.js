import { SessionsService } from "@/services/session/SessionsService";
import dayjs from "dayjs";
import { LocalStorage } from "@/helpers/LocalStorage";

describe("SessionService", () => {
  let sessionsService;
  beforeEach(() => {
    sessionsService = new SessionsService();
  });

  afterEach(() => {
    jest.clearAllMocks();
    sessionsService = null;
  });

  describe("Check instance", () => {
    it("Checking for instance", () => {
      expect(sessionsService).toBeInstanceOf(SessionsService);
    });
  });

  describe("Test getSessions method", () => {
    it("should call setSessions and return sessions from LocalStorage", () => {
      sessionsService.setSessions = jest.fn();

      const date = dayjs().format("YYYY-MM-DD");

      jest.spyOn(LocalStorage, "get").mockReturnValueOnce(null);

      const result = sessionsService.getSessions(date);

      expect(sessionsService.setSessions).toHaveBeenCalledWith(dayjs(date));

      expect(result).toBeNull();
    });

    it("should return sessions from this.sessions if available", () => {
      const date = dayjs().format("YYYY-MM-DD");
      const sessions = [
        { id: 1, name: "Session 1" },
        { id: 2, name: "Session 2" },
      ];

      jest.spyOn(sessionsService, "getSessions").mockReturnValueOnce(sessions);

      sessionsService.sessions[date] = sessions;

      const result = sessionsService.getSessions(date);

      expect(result).toEqual(sessions);
    });

    it("should return null for non-existing dates", () => {
      const date = dayjs().format("YYYY-MM-DD");

      jest.spyOn(sessionsService, "getSessions").mockReturnValueOnce(null);

      const result = sessionsService.getSessions(date);

      expect(result).toBeNull();
    });
  });
});

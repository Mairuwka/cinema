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

  describe("Constructor", () => {
    it("Checking for instance", () => {
      expect(sessionsService).toBeInstanceOf(SessionsService);
    });
  });

  describe("getSessions method", () => {
    it("Should call setSessions if there is no saved date with sessions", () => {
      const date = dayjs().format("YYYY-MM-DD");
      const setSessionsSpy = jest.spyOn(sessionsService, "setSessions");

      sessionsService.getSessions(date);

      expect(setSessionsSpy).toHaveBeenCalled();
      expect(setSessionsSpy).toHaveBeenCalledWith(dayjs(date));
    });

    it("Should create sessions and return them", () => {
      const date = dayjs().format("YYYY-MM-DD");
      const getSessionsSpy = jest.spyOn(sessionsService, "getSessions");

      const result = sessionsService.getSessions(date);

      expect(getSessionsSpy).toHaveBeenCalled();
      expect(getSessionsSpy).toHaveBeenCalledWith(date);
      expect(result).not.toHaveLength(0);
    });

    it("Should return null if the date is not between the week before and the week after", () => {
      const date = dayjs().add(8, "day").format("YYYY-MM-DD");

      const result = sessionsService.getSessions(date);

      expect(result).toBeNull();
    });
  });
});

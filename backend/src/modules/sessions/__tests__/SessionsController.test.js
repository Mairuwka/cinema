import { sessionsController } from "../../../index";
import { get, set } from "firebase/database";

jest.mock("firebase/database");

describe("SessionsController", () => {
  let mockData;

  beforeEach(() => {
    mockData = {
      "2023-10-03": [
        {
          date: "2023-08-24",
          endTime: "2023-08-24 12:00",
          startTime: "2023-08-24 10:00",
          ticketsSold: 0,
          title: "Terminator",
          totalSeats: 50
        }
      ]
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockData = null;
  });

  describe("Метод get", () => {
    it("Проверка на возврат данных из Firebase", async () => {
      const selectedDate = "2023-10-03";
      get.mockReturnValue(Promise.resolve(mockData));

      const result = await sessionsController.getSessionsOfDay(selectedDate);

      expect(result).toEqual(mockData);
    });

    it("Проверка на ошибку при возврате данных из Firebase", async () => {
      const selectedDate = "2023-10-03";
      const mockError = new Error('Firebase get error');
      get.mockRejectedValueOnce(mockError);

      try {
        await sessionsController.getSessionsOfDay(selectedDate);
      } catch (error) {
        expect(error).toBe(mockError);
      }
    });
  });

  describe("Метод set", () => {
    it("Проверка на корректную установку данных Firebase", async () => {
      const setSpy = jest.spyOn(sessionsController, "setSessionsOfDay");
      set.mockReturnValue(Promise.resolve());

      await sessionsController.setSessionsOfDay(mockData);

      expect(setSpy).toHaveBeenCalled();
      expect(setSpy).toHaveBeenCalledWith(mockData);
    });

    it("Проверка на некорректную установку данных Firebase", async () => {
      const mockError = new Error('Firebase set error');
      set.mockRejectedValueOnce(mockError);

      try {
        await sessionsController.setSessionsOfDay(mockData);
      } catch (error) {
        expect(error).toBe(mockError);
      }
    });
  });
});

import { sessionsController } from "../../../index";
import { get, set } from "firebase/database";

jest.mock("firebase/database");

describe("SessionsController", () => {
  describe("get Method", () => {
    it("Проверка на возврат данных из Firebase", async () => {
      const selectedDate = "2023-10-03";
      const mockData = {
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
      get.mockReturnValue(Promise.resolve(mockData));

      const result = await sessionsController.getSessions(selectedDate);

      expect(result).toEqual(mockData);
    });
  });

  describe("set Method", () => {
    it("Проверка на корректную установку данных Firebase", async () => {
      const mockData = {
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
      const setSpy = jest.spyOn(sessionsController, "setSessions");
      set.mockReturnValue(Promise.resolve());

      await sessionsController.setSessions(mockData);

      expect(setSpy).toHaveBeenCalled();
      expect(setSpy).toHaveBeenCalledWith(mockData);
    });
  });
});

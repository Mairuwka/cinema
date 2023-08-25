import { sessionsController } from "../../../index";
import { get, set, ref } from 'firebase/database';
import dayjs from "dayjs";

jest.mock('firebase/database');

describe('SessionsController', () => {
  describe('get Method', () => {
    it('get returns data from Firebase', async () => {
      const selectedDate = dayjs().format();
      const mockData = {};
      get.mockReturnValue(Promise.resolve(mockData));

      const result = await sessionsController.get(selectedDate);

      expect(result).toEqual(mockData);
    });
  });

  describe('set Method', () => {
    it('set correctly updates data in Firebase', async () => {
      const mockData = {};
      const setSpy = jest.spyOn(sessionsController, 'set');
      set.mockReturnValue(Promise.resolve());

      await sessionsController.set(mockData);

      expect(setSpy).toHaveBeenCalled();
      expect(setSpy).toHaveBeenCalledWith(mockData);
    });
  });
});
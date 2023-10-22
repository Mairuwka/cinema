import SessionsPage from "@/components/pages/SessionsPage.vue";
import SessionCalendar from "@/components/sessions/SessionCalendar.vue";
import SessionsList from "@/components/sessions/SessionsList.vue";
import { shallowMount } from "@vue/test-utils";

jest.mock("~/index", () => {
  return {
    sessionsController: jest.fn(),
  };
});

describe("SessionsPage", () => {
  let wrapper;

  const createComponent = () => {
    wrapper = shallowMount(SessionsPage);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Должен вернуть true, если SessionsPage отрисован", () => {
    createComponent();

    expect(wrapper.exists()).toBeTruthy();
  });

  describe("setSessionsOfDay", () => {
    it("Должен вызываться, если передана дата", async () => {
      createComponent();
      const selectedDate = "2023-10-22";
      const setSessionsOfDayMock = jest.fn();
      wrapper.setMethods({ setSessionsOfDay: setSessionsOfDayMock });
      const sessionCalendar = wrapper.findComponent(SessionCalendar);

      sessionCalendar.vm.$emit("date-selected", selectedDate);
      await wrapper.vm.$nextTick();

      expect(setSessionsOfDayMock).toHaveBeenCalled();
      expect(setSessionsOfDayMock).toHaveBeenCalledWith(selectedDate);
    });
  });

  describe("SessionsList", () => {
    it("Должен отрендерить список сессий если он не пустой", async () => {
      createComponent();
      const sessions = [
        {
          id: 1,
          title: "Session 1",
          sessionStartTime: "10:00",
          sessionEndTime: "12:00",
          isActiveCard: true,
        },
        {
          id: 2,
          title: "Session 2",
          sessionStartTime: "12:00",
          sessionEndTime: "14:00",
          isActiveCard: true,
        },
      ];
      const setSessionsOfDayMock = jest.fn().mockResolvedValue(sessions);
      wrapper.setMethods({ setSessionsOfDay: setSessionsOfDayMock });
      wrapper.setData({ sessions: sessions });

      await wrapper.vm.$nextTick();
      const sessionsList = wrapper.findComponent(SessionsList);

      expect(sessionsList.exists()).toBe(true);
      expect(sessionsList.props("sessions")).toEqual(sessions);
    });
  });
});

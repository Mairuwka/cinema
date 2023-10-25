import SessionsPage from "@/components/pages/SessionsPage.vue";
import SessionCalendar from "@/components/sessions/SessionCalendar.vue";
import { shallowMount } from "@vue/test-utils";

jest.mock("~/index", () => {
  return {
    sessionsController: jest.fn(),
  };
});
jest.mock("vue-toast-notification", () => {
  return {
    VueToast: jest.fn(),
  };
});

const sessions = [
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

describe(SessionsPage.name, () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(SessionsPage, options);
  };

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.destroy();
    wrapper = null;
  });

  it("Должен вернуть true, если SessionsPage отрисован", () => {
    createComponent();

    expect(wrapper.exists()).toBeTruthy();
  });

  describe("метод setSessionsOfDay", () => {
    it("Должен вызываться, если передана дата", async () => {
      const mockToastOpen = jest.fn();
      const setSessionsOfDayMock = jest.fn();
      createComponent({
        mocks: {
          $toast: {
            open: mockToastOpen,
          },
        },
      });
      wrapper.vm.setSessionsOfDay = setSessionsOfDayMock;
      const selectedDate = "2023-10-22";
      const sessionCalendar = wrapper.findComponent(SessionCalendar);

      sessionCalendar.vm.$emit("date-selected", selectedDate);
      await wrapper.vm.$nextTick();

      expect(setSessionsOfDayMock).toHaveBeenCalledWith(selectedDate);
    });

    // TODO: После добавления нормального api backend удалить
    it.skip("Должна установиться сессии, если не произошло никаких ошибок", async () => {
      const mockToastOpen = jest.fn();
      createComponent({
        mocks: {
          $toast: {
            open: mockToastOpen,
          },
          sessionsService: {
            getSessionsOfDay: jest.fn().mockResolvedValue(sessions),
          },
        },
      });
      const selectedDate = "2023-10-22";

      await wrapper.vm.setSessionsOfDay(selectedDate);

      expect(wrapper.vm.sessions).toEqual(sessions);
    });

    // TODO: После добавления нормального api backend удалить
    it.skip("Должна показываться нотификация, если произошла ошибка", async () => {
      const mockToastOpen = jest.fn();
      createComponent({
        mocks: {
          $toast: {
            open: mockToastOpen,
          },
        },
      });

      const selectedDate = "2023-10-22";

      await wrapper.vm.setSessionsOfDay(selectedDate);

      expect(mockToastOpen).toHaveBeenCalledWith({
        message: "Произошла ошибка",
        type: "error",
      });
    });
  });
});

import App from "@/App.vue";
import SessionsPage from "@/components/pages/SessionsPage.vue";
import SessionCalendar from "@/components/sessions/SessionCalendar.vue";
import { shallowMount, enableAutoUnmount } from "@vue/test-utils";

enableAutoUnmount(afterEach);

jest.mock("~/index", () => ({
  sessionsController: jest.fn(),
}));

jest.mock("vue-toast-notification", () => ({
  ToastPlugin: jest.fn(),
}));

describe(SessionsPage.name, () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(SessionsPage, options);
  };

  it("Должен вернуть true, если SessionsPage отрисован", () => {
    createComponent();

    expect(wrapper.exists()).toBeTruthy();
  });

  describe("метод setSessionsOfDay", () => {
    it("Должен вызываться, если передана дата", async () => {
      const mockToastOpen = jest.fn();
      const setSessionsOfDayMock = jest.fn();
      createComponent({
        global: {
          mocks: {
            $toast: {
              open: mockToastOpen,
            },
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
  });
});

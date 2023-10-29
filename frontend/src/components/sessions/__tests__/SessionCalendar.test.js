import App from "@/App.vue";
import SessionCalendar from "@/components/sessions/SessionCalendar.vue";
import { shallowMount, enableAutoUnmount } from "@vue/test-utils";

enableAutoUnmount(afterEach);

jest.mock("vue-toast-notification", () => ({
  ToastPlugin: jest.fn(),
}));

describe(SessionCalendar.name, () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(SessionCalendar, options);
  };

  it("Должен вернуть true, если SessionsCalendar отрисован", () => {
    createComponent();

    expect(wrapper.exists()).toBeTruthy();
  });

  it("Должен выбрасывать наверх событие date-selected когда выбрана дата", async () => {
    createComponent({});
    const selectedDate = "2023-10-22";
    const input = wrapper.find("input.date-picker");

    await input.setValue(selectedDate);

    expect(wrapper.emitted("date-selected")).toBeTruthy();
    expect(wrapper.emitted("date-selected")[1][0]).toEqual(selectedDate);
  });

  it("Должен пропускать эмит события date-selected когда выбрана невалидная дата", async () => {
    const mockToastOpen = jest.fn();
    createComponent({
      global: {
        mocks: {
          $toast: {
            open: mockToastOpen,
          },
        },
      },
    });
    const selectedDate = "2023-10-дд";
    const input = wrapper.find("input.date-picker");

    await input.setValue(selectedDate);

    expect(mockToastOpen).toHaveBeenCalled();
  });
});

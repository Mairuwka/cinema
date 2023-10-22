import SessionCalendar from "@/components/sessions/SessionCalendar.vue";
import { shallowMount } from "@vue/test-utils";

describe("SessionsCalendar", () => {
  let wrapper;

  const createComponent = () => {
    wrapper = shallowMount(SessionCalendar);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Должен вернуть true, если SessionsCalendar отрисован", () => {
    createComponent();

    expect(wrapper.exists()).toBeTruthy();
  });

  it("Должен выбрасывать наверх событие date-selected когда выбрана дата", async () => {
    createComponent();
    const selectedDate = "2023-10-22";
    const input = wrapper.find("input.date-picker");

    await input.setValue(selectedDate);

    expect(wrapper.emitted("date-selected")).toBeTruthy();
    expect(wrapper.emitted("date-selected")[0][0]).toEqual(selectedDate);
  });
});

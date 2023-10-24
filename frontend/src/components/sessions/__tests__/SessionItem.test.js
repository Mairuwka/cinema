import SessionItem from "@/components/sessions/SessionItem.vue";
import { shallowMount } from "@vue/test-utils";

describe(SessionItem.name, () => {
  let wrapper;

  const createComponent = (props) => {
    wrapper = shallowMount(SessionItem, {
      propsData: props,
    });
  };

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.destroy();
    wrapper = null;
  });

  it("Должен отображать компонент с заданными свойствами", async () => {
    const title = "Test Title";
    const sessionStartTime = "Test Start Time";
    const sessionEndTime = "Test End Time";
    const isActiveCard = true;

    createComponent({
      title,
      sessionStartTime,
      sessionEndTime,
      isActiveCard,
    });
    const sessionCard = wrapper.find(".session-item__card");

    expect(wrapper.text()).toContain(title);
    expect(wrapper.text()).toContain(sessionStartTime);
    expect(wrapper.text()).toContain(sessionEndTime);
    expect(sessionCard.classes()).toContain("card-active");
  });
});

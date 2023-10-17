import SessionsPage from "@/components/pages/SessionsPage.vue";
import { mount } from "@vue/test-utils";

describe("SessionsPage", () => {
  let wrapper;

  const createComponent = () => {
    wrapper = mount(SessionsPage);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("test", () => {
    createComponent();

    // Check if the component is rendered
    expect(wrapper.exists()).toBe(true);
  });
});

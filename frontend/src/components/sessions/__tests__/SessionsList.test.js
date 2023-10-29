import App from "@/App.vue";
import SessionsList from "@/components/sessions/SessionsList.vue";
import SessionItem from "@/components/sessions/SessionItem.vue";
import { shallowMount, enableAutoUnmount } from "@vue/test-utils";

enableAutoUnmount(afterEach);

describe(SessionsList.name, () => {
  let wrapper;

  const createComponent = (props) => {
    wrapper = shallowMount(SessionsList, {
      propsData: props,
    });
  };

  it("Должен отображать список сессий, если они переданы через props 'sessions'", () => {
    const sessions = [
      {
        id: 1,
        title: "Сессия 1",
        sessionStartTime: "10:00",
        sessionEndTime: "12:00",
        isActiveCard: true,
      },
      {
        id: 2,
        title: "Сессия 2",
        sessionStartTime: "12:00",
        sessionEndTime: "14:00",
        isActiveCard: true,
      },
    ];

    createComponent({
      sessions,
    });
    const sessionItems = wrapper.findAllComponents(SessionItem);

    expect(sessionItems).toHaveLength(sessions.length);
  });

  it("Должен не отображать список сессий, если props 'sessions' пуст", () => {
    createComponent({
      sessions: [],
    });

    const sessionItems = wrapper.findAllComponents(SessionItem);
    expect(sessionItems).toHaveLength(0);
  });
});

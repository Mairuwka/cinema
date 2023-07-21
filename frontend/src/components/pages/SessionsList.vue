<template>
  <div>
    <base-calendar>
      <input
        v-model="selectedDate"
        type="date"
        class="date-picker"
        placeholder="Pick a date"
      />
    </base-calendar>
    <ul v-if="sessions.length">
      <session-item
        v-for="session in sessions"
        :key="session.id"
        :title="session.title"
        :start="session.start"
        :end="session.end"
        :active="session.active"
      ></session-item>
    </ul>
    <div v-else>Сессий на данный период нет</div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { Sessions } from "@/modules/session/Sessions";
import { Validation } from "@/helpers/Validation";
import SessionItem from "@/components/sessions/SessionItem.vue";

export default {
  components: {
    SessionItem,
  },
  data() {
    return {
      instanceSessions: new Sessions(),
      selectedDate: null,
      sessions: [],
    };
  },
  created() {
    const date = dayjs();
    this.selectedDate = date.format("YYYY-MM-DD");

    this.instanceSessions.setSessions(dayjs(this.selectedDate));
  },
  watch: {
    selectedDate(selectedDate) {
      this.sessions = [];

      const sessionsForDay = this.instanceSessions.getSessions(
        selectedDate,
        selectedDate
      );

      for (const session of sessionsForDay) {
        let cardActive = true;
        if (Validation.isCurrentTimeAfter(session.startTime)) {
          cardActive = false;
        }

        this.sessions.push({
          title: session.title,
          start: dayjs(session.startTime).format("HH:mm"),
          end: dayjs(session.endTime).format("HH:mm"),
          active: cardActive,
        });
      }
    },
  },
};
</script>

<style lang="scss">
.date-picker {
  display: block;
  width: 200px;
  height: 36px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>

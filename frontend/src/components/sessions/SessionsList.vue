<template>
  <ul v-if="sessions.length">
    <session-item
      v-for="session in sessions"
      :key="session.id"
      :title="session.title"
      :sessionStartTime="session.sessionStartTime"
      :sessionEndTime="session.sessionEndTime"
      :isActiveCard="session.isActiveCard"
    ></session-item>
  </ul>
  <div v-else>Сессий на данный период нет</div>
</template>

<script>
import dayjs from "dayjs";
import { SessionsService } from "@/modules/session/SessionsService";
import { Validation } from "@/helpers/Validation";
import SessionItem from "@/components/sessions/SessionItem.vue";

const sessionsService = new SessionsService();

export default {
  props: {
    selectedDate: {
      type: String,
      default: null,
    },
  },
  components: {
    SessionItem,
  },
  data() {
    return {
      sessions: [],
    };
  },
  watch: {
    selectedDate: {
      immediate: true,
      handler(selectedDate) {
        this.sessions = [];

        const sessionsForDay = sessionsService.getSessions(
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
            sessionStartTime: dayjs(session.startTime).format("HH:mm"),
            sessionEndTime: dayjs(session.endTime).format("HH:mm"),
            isActiveCard: cardActive,
          });
        }
      },
    },
  },
};
</script>

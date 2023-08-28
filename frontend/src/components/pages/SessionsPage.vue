<template>
  <div>
    <SessionCalendar @date-selected="updateSelectedDate" />
    <SessionsList :sessions="sessions" />
  </div>
</template>

<script>
import SessionsList from "@/components/sessions/SessionsList.vue";
import SessionCalendar from "@/components/sessions/SessionCalendar.vue";
import { SessionsService } from "@/services/session/SessionsService";
import { sessionsController } from "../../../../backend/src/index";

const sessionsService = new SessionsService({
  sessionsController,
});

export default {
  components: {
    SessionsList,
    SessionCalendar,
  },
  data() {
    return {
      selectedDate: null,
      sessions: [],
    };
  },
  watch: {
    async selectedDate(selectedDate) {
      this.sessions = [];

      const sessionsForDay = await sessionsService.get(selectedDate);

      if (!sessionsForDay.success) {
        console.log(sessionsForDay.error);
        return;
        // TODO дальнейшая реализация показа ошибки
      }

      if (sessionsForDay.success && !sessionsForDay.data) {
        return;
      }

      this.sessions = sessionsService.transformSessionsForDisplay(
        sessionsForDay.data
      );
    },
  },
  methods: {
    updateSelectedDate(date) {
      this.selectedDate = date;
    },
  },
};
</script>

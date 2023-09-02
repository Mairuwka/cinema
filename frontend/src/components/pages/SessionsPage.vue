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

const sessionsService = new SessionsService(sessionsController);

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
      let sessionsForDay = [];

      try {
        sessionsForDay = await sessionsService.getSessions(selectedDate);
      } catch (e) {
        console.log(e);
        return;
        // TODO дальнейшая реализация показа ошибки
      }

      if (!sessionsForDay) {
        return;
      }

      this.sessions =
        sessionsService.transformSessionsForDisplay(sessionsForDay);
    },
  },
  methods: {
    updateSelectedDate(date) {
      this.selectedDate = date;
    },
  },
};
</script>

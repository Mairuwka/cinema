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
const sessionsService = new SessionsService();

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
    selectedDate: {
      immediate: true,
      handler(selectedDate) {
        this.sessions = [];

        const sessionsForDay = sessionsService.getSessions(selectedDate);

        if (!sessionsForDay) return;

        this.sessions =
          sessionsService.transformSessionsForDisplay(sessionsForDay);
      },
    },
  },
  methods: {
    updateSelectedDate(date) {
      this.selectedDate = date;
    },
  },
};
</script>

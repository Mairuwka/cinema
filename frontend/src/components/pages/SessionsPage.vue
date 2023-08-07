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
import dayjs from "dayjs";

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
    selectedDate(selectedDate) {
      this.sessions = [];
      let fullDateFormat = dayjs(selectedDate);

      if (
        !sessionsService.getSessions(selectedDate) &&
        sessionsService.isWithinRange(fullDateFormat)
      ) {
        const daySessions =
          sessionsService.generateSessionsForDate(selectedDate);

        sessionsService.setSessions(selectedDate, daySessions);
      }

      const sessionsForDay = sessionsService.getSessions(selectedDate);

      if (!sessionsForDay) return;

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

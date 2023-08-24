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
import { Session } from "@/services/session/Session";
import { sessionsController } from "../../../../backend/src/index";

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
    async selectedDate(selectedDate) {
      this.sessions = [];

      let sessionsForDay = [];

      try {
        const snapshot = await sessionsController.get(selectedDate);

        if (snapshot.exists()) {
          sessionsForDay = snapshot.val();

          sessionsForDay = sessionsForDay.map(
            (session) => new Session(session)
          );
        }
      } catch (error) {
        console.log(error);
      }

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

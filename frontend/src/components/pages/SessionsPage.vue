<template>
  <div>
    <SessionCalendar @date-selected="setSessionsOfDay($event)" />
    <SessionsList :sessions="sessions" />
  </div>
</template>

<script>
import SessionsList from "@/components/sessions/SessionsList.vue";
import SessionCalendar from "@/components/sessions/SessionCalendar.vue";
import { SessionsService } from "@/services/session/SessionsService";
import { sessionsController } from "../../../../backend/src/index";
import { SessionsApi } from "@/api/sessions/SessionsApi";

const sessionsApi = new SessionsApi(sessionsController);
const sessionsService = new SessionsService(sessionsApi);

export default {
  components: {
    SessionsList,
    SessionCalendar,
  },
  data() {
    return {
      sessions: [],
    };
  },
  methods: {
    async setSessionsOfDay(selectedDate) {
      this.sessions = [];

      try {
        this.sessions = await sessionsService.getSessionsOfDay(selectedDate);
      } catch (e) {
        this.$toast.open({
          message: e,
          type: "error",
        });
      }
    },
  },
};
</script>

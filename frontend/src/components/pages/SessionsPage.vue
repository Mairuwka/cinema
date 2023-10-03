<template>
  <div>
    <SessionCalendar @date-selected="onDateSelected" />
    <SessionsList :sessions="sessions" />
    <ErrorPopup v-if="error" :error-message="error" @close-popup="clearError" />
  </div>
</template>

<script>
import SessionsList from "@/components/sessions/SessionsList.vue";
import SessionCalendar from "@/components/sessions/SessionCalendar.vue";
import ErrorPopup from "@/components/popup/ErrorPopup.vue";
import { SessionsService } from "@/services/session/SessionsService";
import { sessionsController } from "../../../../backend/src/index";
import { SessionsApi } from "@/api/sessions/SessionsApi";

const sessionsApi = new SessionsApi(sessionsController);
const sessionsService = new SessionsService(sessionsApi.controller);

export default {
  components: {
    SessionsList,
    SessionCalendar,
    ErrorPopup,
  },
  data() {
    return {
      sessions: [],
      error: "",
    };
  },
  methods: {
    onDateSelected(date) {
      this.setSessions(date);
    },
    async setSessions(selectedDate) {
      this.sessions = [];
      this.error = "";

      try {
        this.sessions = await sessionsService.getSessions(selectedDate);
      } catch (e) {
        this.error =
          e.message || "Что-то пошло не так, повторите попытку позже";
      }
    },
    clearError() {
      this.error = "";
    },
  },
};
</script>

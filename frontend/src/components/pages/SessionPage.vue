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
  methods: {
    updateSelectedDate(date) {
      this.selectedDate = date;
      this.sessions = [];

      const sessionsForDay = sessionsService.getSessions(this.selectedDate);

      if (!sessionsForDay) return;

      this.sessions = sessionsForDay.map((session) => {
        const cardActive = !sessionsService.isCurrentTimeAfter(
          session.startTime
        );

        return {
          title: session.title,
          sessionStartTime: dayjs(session.startTime).format("HH:mm"),
          sessionEndTime: dayjs(session.endTime).format("HH:mm"),
          isActiveCard: cardActive,
        };
      });
    },
  },
};
</script>

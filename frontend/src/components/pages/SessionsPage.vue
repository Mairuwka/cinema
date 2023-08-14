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

import { FirebaseController } from "../../../../backend/modules/firebase/api/FirebaseController";
import { firebeseConfig } from "../../../../backend/modules/firebase/config/firebase-config";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child } from "firebase/database";

const firebase = initializeApp(firebeseConfig);
const database = getDatabase(firebase);

const sessionsService = new SessionsService();
const firebaseController = new FirebaseController(firebase, database);

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

      const sessionsRef = child(ref(database, "sessions"), selectedDate);
      let sessionsForDay = [];

      try {
        const snapshot = await firebaseController.getSessions(sessionsRef);

        if (snapshot.exists()) {
          sessionsForDay = snapshot.val();

          sessionsForDay = sessionsForDay.map(
            (session) => new Session(session)
          );
        }
      } catch (error) {
        console.log(error);
      }

      console.log(sessionsForDay);
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

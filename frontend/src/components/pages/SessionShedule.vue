<template>
  <div>
    <session-calendar @date-selected="updateSelectedDate"></session-calendar>
    <sessions-list :selected-date="selectedDate"></sessions-list>
  </div>
</template>

<script>
import SessionsList from "@/components/sessions/SessionsList.vue";
import SessionCalendar from "@/components/sessions/SessionCalendar.vue";
import dayjs from "dayjs";

export default {
  components: {
    SessionsList,
    SessionCalendar,
  },
  data() {
    return {
      selectedDate: dayjs().format("YYYY-MM-DD"),
    };
  },
  methods: {
    updateSelectedDate(date) {
      this.selectedDate = date;
    },
  },
};
</script>

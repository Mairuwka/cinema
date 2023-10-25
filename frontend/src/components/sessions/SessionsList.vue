<template>
  <div v-if="sessions.length">
    <SessionItem
      v-for="session in sessions"
      :key="session.id"
      :title="session.title"
      :sessionStartTime="session.sessionStartTime"
      :sessionEndTime="session.sessionEndTime"
      :isActiveCard="session.isActiveCard"
    />
  </div>
</template>

<script>
import SessionItem from "@/components/sessions/SessionItem.vue";

export default {
  name: "SessionsList",
  props: {
    sessions: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    SessionItem,
  },
};
</script>

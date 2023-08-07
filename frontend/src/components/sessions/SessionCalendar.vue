<template>
  <span class="calendar">
    <input
      type="date"
      class="date-picker"
      placeholder="Pick a date"
      v-model="selectedDate"
    />
  </span>
</template>

<script>
import dayjs from "dayjs";

export default {
  data() {
    return {
      selectedDate: dayjs().format("YYYY-MM-DD"),
    };
  },
  watch: {
    selectedDate: {
      immediate: true,
      handler(selectedDate) {
        this.$emit("date-selected", selectedDate);
      },
    },
  },
};
</script>

<style lang="scss">
.calendar {
  display: flex;
  justify-content: center;
}
.date-picker {
  display: block;
  width: 200px;
  height: 36px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>

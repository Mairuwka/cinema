<template>
  <span class="calendar">
    <input
      type="date"
      class="date-picker"
      placeholder="Pick a date"
      v-model="selectedDate"
      @input="onDateSelected"
    />
  </span>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "SessionCalendar",
  data() {
    return {
      selectedDate: dayjs().format("YYYY-MM-DD"),
    };
  },
  mounted() {
    this.onDateSelected();
  },
  methods: {
    onDateSelected() {
      if (dayjs(this.selectedDate).isValid()) {
        this.$emit("date-selected", this.selectedDate);
      } else {
        this.$toast.open({
          message: "Укажите правильную дату",
          type: "error",
        });
      }
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

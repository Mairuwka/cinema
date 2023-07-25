<template>
  <div class="session-item">
    <a class="session-item__card" :class="[isActiveCard ? 'card-active' : '']">
      <div class="session-item__title">{{ title }}</div>
      <div class="session-item__timestamp">
        {{ sessionStartTime }} - {{ sessionEndTime }}
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Title",
    },
    sessionStartTime: {
      type: String,
      default: "StartTime",
    },
    sessionEndTime: {
      type: String,
      default: "EndTime",
    },
    isActiveCard: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.session-item {
  display: flex;
  justify-content: center;
  margin: 16px 0;

  &__card {
    display: block;
    width: 200px;
    height: 150px;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
    text-decoration: none;
    transition: box-shadow 0.2s ease;
    background-color: #f9f9f9;
  }

  &__title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  &__timestamp {
    font-size: 14px;
    color: #888;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.card-active {
  background-color: #42b983;
  color: #fff;
}
</style>

<template>
  <li class="card-container">
    <a class="card" :class="[isActiveCard ? 'card-active' : 'card-inactive']">
      <div class="card__title">{{ title }}</div>
      <div class="card__timestamp">
        {{ sessionStartTime }} - {{ sessionEndTime }}
      </div>
    </a>
  </li>
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
      default: true,
    },
  },
};
</script>

<style lang="scss">
.card-container {
  display: flex;
  justify-content: center;
  margin: 16px 0;

  &:last-child {
    margin-bottom: 0;
  }
}

.card {
  display: block;
  width: 200px;
  height: 150px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  text-decoration: none;
  transition: box-shadow 0.2s ease;

  &__title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  &__timestamp {
    font-size: 14px;
    color: #888;
  }

  &-inactive {
    background-color: #f9f9f9;
  }

  &-active {
    background-color: #42b983;
    color: #fff;
  }
}
</style>

<template>
  <div class="error-popup-modal" v-if="errorMessage">
    <div class="error-popup">
      <div class="error-message">{{ errorMessage }}</div>
      <button @click="closePopup">OK</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    errorMessage: {
      type: String,
      required: true,
    },
  },
  methods: {
    closePopup() {
      this.$emit("close-popup");
    },
  },
};
</script>

<style scoped>
.error-popup-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.error-popup {
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}

.error-message {
  margin-bottom: 10px;
  font-weight: bold;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>

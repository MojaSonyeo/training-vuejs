<template>
  <div>
    <h1>Page C</h1>
    <label for="superId">Super</label>
    <input id="superId" v-model="message">
    <br>
    <button @click="goToPageD">Go to Page D</button>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        message: undefined,
      }
    },
    methods: {
      goToPageD: function() {
        this.$router.push({ name: 'PageD', params: { message: this.message } });
      }
    }
  };
</script>
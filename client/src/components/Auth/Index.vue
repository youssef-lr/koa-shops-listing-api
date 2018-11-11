<template>
  <div class="container mx-auto h-screen text-center flex items-center justify-center">
    <div class="h-64 w-1/2">
      <transition name="fade" mode="out-in">
        <login v-if="view === 'Login'" />
        <signup v-if="view === 'Signup'" />
      </transition>
    </div>
  </div>
</template>

<script>
import Login from './Login';
import Signup from './Signup';

export default {
  mounted() {
    this.view = this.$router.history.current.name;
  },
  data() {
    return {
      view: '',
    };
  },
  watch: {
    $route(to) {
      this.view = to.name;
    },
  },
  components: {
    Login,
    Signup,
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>


<template>
  <div id="app" class="h-screen bg-black relative overflow-auto">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>


  </div>
</template>

<script>
import { isAuthenticated } from './auth';

export default {
  name: 'App',
  data() {
    return {
      isAuthenticated: isAuthenticated(),
    };
  },
};
</script>

<style lang="postcss">
@tailwind preflight;
@tailwind components;
@tailwind utilities;

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

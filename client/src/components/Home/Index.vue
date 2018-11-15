<template>
  <div class="h-screen bg-white overflow-auto">
    <div class="container mx-auto p-10">

      <header class="flex items-center justify-around md:justify-end w-full">
        <router-link to="/" class="md:mr-10 no-underline text-blue border-b border-blue" exact>
          Nearby Shops
        </router-link>

        <router-link to="/favorites"
                     class="no-underline text-blue border-b border-blue md:mr-10" exact
        >
          My preferred Shops
        </router-link>
        <router-link to="/logout">
          <!-- eslint-disable -->
          <svg class="fill-current text-blue h-5 w-5 opacity-75 hover:opacity-100"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 20 20"
          >
            <path d="M4.16 4.16l1.42 1.42A6.99 6.99 0 0 0 10 18a7 7 0 0 0 4.42-12.42l1.42-1.42a9 9 0 1 1-11.69 0zM9 0h2v8H9V0z"/>
          </svg>
          <!-- eslint-enable -->
        </router-link>
      </header>

      <transition name="fade" mode="out-in">
        <router-view>

        </router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {};
  },
};
</script>

<style>
.router-link-active {
  @apply border-transparent;
}

.notif-enter,
.notif-leave-to {
  opacity: 0;
  transform: translateY(70px);
  transition: all 0.4s ease-out;
}
</style>


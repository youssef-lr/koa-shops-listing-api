<template>
  <div class="h-screen bg-white overflow-auto">
    <div class="container mx-auto mt-10">
      <header class="flex items-center justify-end w-full">
        <router-link to="/" class="mr-10 no-underline text-blue border-b border-blue" exact>
          Nearby Shops
        </router-link>
        <router-link to="/favorites" class="no-underline text-blue border-b border-blue" exact>
          My preferred Shops
        </router-link>
        <!-- eslint-disable -->
        <!-- eslint-enable -->
      </header>

      <transition name="fade" mode="out-in">
        <router-view>

        </router-view>
      </transition>

      <div class="absolute pin-b pin-r p-8">
        <router-link to="/logout" class="no-underline border-b text-blue font-bold text-md">
          Logout
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ShopList from './Shops/ShopList';

export default {
  components: {
    ShopList,
  },
};
</script>

<style>
.router-link-active {
  @apply border-transparent;
}
</style>


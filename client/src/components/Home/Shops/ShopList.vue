<template>
  <transition-group name="shop" class="mt-3 justify-center flex flex-wrap xs:px-20 p-2"
  >
    <shop-card :shop="shop" :key="shop.id" v-for="shop in shops"
               @shop-liked-disliked="handleLikeChange"
    >

    </shop-card>
  </transition-group>
</template>

<script>
import { getAll } from '@/api/shops';
import ShopCard from './ShopCard';

export default {
  async created() {
    const res = await getAll();
    if (res.shops) {
      this.shops = res.shops;
    }
  },
  data() {
    return {
      shops: [],
    };
  },
  methods: {
    handleLikeChange(shopId) {
      const index = this.shops.findIndex(s => s.id === shopId);
      if (index > -1) {
        this.shops.splice(index, 1);
      }
    },
  },
  components: {
    ShopCard,
  },
};
</script>

<style>
.shop-move {
  transition: all 600ms ease-in-out 50ms;
}
.shop-enter-active {
  transition: all 0.2s ease-out;
}

.shop-leave-active {
  position: absolute;
  z-index: 0;
  opacity: 0;
  transition: all 0.3s ease-in;
}

.shop-enter,
.shop-leave-to {
  opacity: 0;
}
.shop-enter {
  transform: scale(0.9);
}
</style>

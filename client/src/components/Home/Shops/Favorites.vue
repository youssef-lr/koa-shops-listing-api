<template>
  <transition-group name="shop" class="mt-3 justify-center flex flex-wrap xs:px-20 p-2"
  >    <shop-card on-favorites="true" :shop="shop" :key="shop.id" v-for="shop in shops"
                  @shop-liked-disliked="handleLikeChange"
  >
  </shop-card>
  </transition-group>
</template>

<script>
import { getFavorites } from '@/api/shops';
import ShopCard from './ShopCard';

export default {
  async created() {
    const res = await getFavorites();
    if (res.favorites) {
      this.shops = res.favorites;
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


<template>
  <div class="w-1/4 p-2">
    <div class="border border-black w-full h-full p-2">
      <h4 class="font-semibold">{{ shop.name }}</h4>
      <img style="height: 256px" class="mt-2" :src="shopImage(shop)" :alt="shop.name">
      <div class="flex justify-around mt-2">
        <button v-if="!onFavorites"
                class="w-24 px-5 py-1 rounded bg-green text-white font-semibold hover:shadow-md"
                style="transition: all .4s"
                @click="like"
        >
          Like
        </button>
        <button class="w-24 px-5 py-1 rounded bg-red text-white font-semibold hover:shadow-md"
                style="transition: all .4s"
                @click="dislike"
        >
          <template v-if="onFavorites">
            Remove
          </template>
          <template v-else>
            Dislike
          </template>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { likeDislike, cancelLikeDislike } from '@/api/shops';
import emitter from '@/utils/events';

export default {
  props: ['shop', 'onFavorites'],
  methods: {
    shopImage(shop) {
      const base = process.env.API_URL;
      return `${base}/images/${shop.image}`;
    },
    async like() {
      const res = await likeDislike(this.shop.id, 'liked');
      emitter.emit('shop-liked', this.shop.id);

      if (res.success) {
        this.$emit('shop-liked-disliked', this.shop.id);
      }
    },
    async dislike() {
      if (this.onFavorites) {
        this.removeFromFavorites();
        return;
      }

      const res = await likeDislike(this.shop.id, 'disliked');

      if (res.success) {
        this.$emit('shop-liked-disliked', this.shop.id);
        emitter.emit('shop-disliked', this.shop.id);
      }
    },
    async removeFromFavorites() {
      const res = await cancelLikeDislike(this.shop.id);

      if (res.success) {
        this.$emit('shop-liked-disliked', this.shop.id);
      }
    },
  },
};
</script>

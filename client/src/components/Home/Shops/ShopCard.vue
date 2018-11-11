<template>
  <div class="w-1/4 p-2">
    <div class="border border-black w-full h-full p-2">
      <h4 class="font-semibold">{{ shop.name }}</h4>
      <img class="w-full mt-2" src="../../../assets/storeA.jpg" alt="">
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
import { likeDislike, removeFavorite } from '@/api/shops';

export default {
  props: ['shop', 'onFavorites'],
  methods: {
    async like() {
      const res = await likeDislike(this.shop.id, 'liked');

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
      }
    },
    async removeFromFavorites() {
      const res = await removeFavorite(this.shop.id);

      if (res.success) {
        this.$emit('shop-liked-disliked', this.shop.id);
      }
    },
  },
};
</script>

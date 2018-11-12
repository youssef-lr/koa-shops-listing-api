<template>
  <div class="h-full flex items-center justify-center">
    <div class="flex flex-col justify-center" @keyup.enter="login">
      <input placeholder="Email" type="text" class="input mb-6 p-3" v-model="email">
      <input placeholder="Password" type="password" class="input mb-6 p-3" v-model="password">
      <transition name="fade">
        <span v-if="error" class="input text-sm font-bold -mt-3 mb-2 block" style="color: #D6375A">
          {{ error }}
        </span>
      </transition>

      <button class="input bg-beige text-white font-bold mb-3 opacity-75 hover:opacity-100"
              @click="login"
      >
        <img class="align-middle" v-if="loading" src="../../assets/loading.svg" alt="">
        <template v-else>Login</template>

      </button>

      <span class="text-sm text-white font-bold">Don't have an account?
        <router-link class="text-beige" to="/signup">Sign-up</router-link>
      </span>
    </div>
  </div>
</template>

<script>
import { saveToken } from '../../auth';
import { authenticate } from '../../api/auth';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
      loading: false,
    };
  },
  methods: {
    async login() {
      this.loading = true;

      const result = await authenticate({
        email: this.email,
        password: this.password,
      });

      if (result.token) {
        this.loading = false;
        saveToken(result.token);
        this.$router.push('/');
        return;
      }

      this.error = result.message;
      setTimeout(() => {
        this.error = '';
      }, 2000);
      this.loading = false;
    },
  },
};
</script>

<style>
.input {
  @apply block h-8 rounded w-64;
}
</style>


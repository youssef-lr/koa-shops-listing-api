<template>
  <div class="h-full flex items-center justify-center">
    <div class="flex flex-col justify-center" @keyup.enter="signup">
      <input placeholder="Email" type="text" class="input p-3" v-model="email">
      <transition name="fade">
        <span  v-if="errors.email" class="input text-red text-sm font-bold mt-3 -mb-6">
          {{ errors.email }}
        </span>
      </transition>

      <input placeholder="Password" type="password" class="input mt-6 p-3" v-model="password">
      <transition name="fade">
        <span v-if="errors.password" class="input text-red text-sm font-bold mt-3 -mb-6">
          {{ errors.password }}
        </span>
      </transition>

      <input placeholder="Confirm password" type="password" class="input mt-6 p-3"
             v-model="confirm"
      >
      <transition name="fade">
        <span v-if="errors.confirm" class="input text-red text-sm font-bold mt-3 -mb-6">
          {{ errors.confirm }}
        </span>
      </transition>

      <button class="input bg-beige text-white font-bold mt-6 mb-3 opacity-75 hover:opacity-100"
              @click="signup">
        <!-- eslint-disable -->
        
        <!-- eslint-enable -->
        <img class="align-middle" v-if="loading" src="../../assets/loading.svg" alt="">
        <span v-else>Signup</span>
      </button>

      <span class="text-sm text-white font-bold">Already have an account?
        <router-link class="text-beige" to="/login">Login</router-link>
      </span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { saveToken } from '../../auth';

export default {
  data() {
    return {
      email: '',
      password: '',
      confirm: '',
      errors: {},
      loading: false,
    };
  },
  methods: {
    hideError() {
      setTimeout(() => {
        this.error = '';
      }, 2000);
    },
    async signup() {
      this.loading = true;
      let res;
      try {
        res = await axios.post('/auth/register', {
          email: this.email,
          password: this.password,
          confirm: this.confirm,
        });
      } catch (error) {
        this.errors = error.response.data.errors;
        this.loading = false;
        return;
      }
      this.loading = false;

      saveToken(res.data.token);

      this.$router.push('/');
    },
  },
};
</script>

<style>
.input {
  @apply block h-8 rounded w-64;
}
</style>


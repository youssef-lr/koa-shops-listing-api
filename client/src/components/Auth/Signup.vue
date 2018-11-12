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

      <input placeholder="Confirm password" type="password" class="input mt-6 p-3">

      <button class="input bg-beige text-white font-bold mt-6 mb-3 opacity-75 hover:opacity-100"
              @click="signup">
        <!-- eslint-disable -->
        <svg class="fill-current" v-if="loading" version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             width="30px" height="30px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
          <path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
            <animateTransform attributeType="xml"
                              attributeName="transform"
                              type="rotate"
                              from="0 25 25"
                              to="360 25 25"
                              dur="0.6s"
                              repeatCount="indefinite"/>
          </path>
        </svg>
        <!-- eslint-enable -->

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


<script>
import { mapActions } from 'vuex'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'register',
  data() {
    return {
      firstName: '',
      lastName: '',
      age: null,
      email: '',
      password: '',

      backendError: null,
    }
  },
  methods: {
    ...mapActions(['register']),
    async submitLogin(e) {
      e.preventDefault()

      try {
        await this.register({
          firstName: this.firstName,
          lastName: this.lastName,
          age: this.age,
          email: this.email,
          password: this.password,
        })

        this.$router.push('/login')
      } catch (e) {
        this.backendError = e.response.data.message
      }
    },
  },
}
</script>

<template lang="pug">
.register
    form( @submit="submitLogin")
      h1 Create a new account
      label(for="firstName") FirstName:&nbsp;
        input(v-model="firstName" id="firstName" type="text" placeholder="Your first name" required)
      label(for="lastName") LastName:&nbsp;
        input(v-model="lastName" id="lastName" type="text" placeholder="Your last name" required)
      label(for="age") Age:&nbsp;
        input(v-model="age" id="age" type="number" placeholder="Your age" required)
      label(for="email") Email:&nbsp;
        input(v-model="email" id="email" type="email" placeholder="Your email" required)
      label(for="password") Password:&nbsp;
        input(v-model="password" id="password" type="password" placeholder="Your password" required)
      input(type="submit" value="Register")
    div(v-if="backendError") {{ backendError }}
    div Already have an account? <router-link to="/login">Log in</router-link>
</template>

<style lang="scss" scoped>
label {
  display: block;
  margin: 1rem 0;
}
</style>

<template lang="pug">
  .home
    img (alt="Vue logo" src="../assets/logo.png")
    HelloWorld(msg="Welcome to Your Vue.js App")
    div(v-for="user in users") {{ user.name }} has {{ user.teams.length }} teams
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
  },
  data() {
    return {
      users: [],
    }
  },
  async created() {
    const userRequest = await axios.get('/api/users')

    this.users = userRequest.data
  },
};
</script>

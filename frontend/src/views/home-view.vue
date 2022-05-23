<script>
// @ is an alias to /src
import axios from 'axios'
import UserCard from '@/components/user-card.vue'

export default {
  name: 'HomeView',
  components: {
    UserCard,
  },
  data() {
    return {
      users: [],
      time: new Date(),
    }
  },
  async created() {
    const userRequest = await axios.get('/api/users')
    this.users = userRequest.data
  },
}
</script>

<template lang="pug">
  .home
    h1 TeamUp
    p The time is: {{ time }}
    user-card(v-for="user in users" :user="user")
</template>

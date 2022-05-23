<script>
export default {
  name: 'UserCard',
  props: ['user'],
  data() {
    return {}
  },
}
</script>

<template lang="pug">
.box
  h1 {{ user.firstName }} {{ user.lastName }}
  p Age: {{ user.age }}
  h2 Teams ({{ user.teams.length }})

  .team(v-for="team in user.teams")
    h3 {{ team.teamName }}
    p(v-if="!team.members.length")
      | no members yet!
    p(v-else)
      | {{ team.members.map(user => user.firstName).join(', ') }}
</template>

<style lang="scss" scoped>
.box {
  padding: 2rem;
  border: 1px solid #333;
  background: #dd0;
  border-radius: 0.3rem;
}
</style>

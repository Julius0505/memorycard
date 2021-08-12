<template>
  <div>
    <card v-for="card in $store.state.board" :key="card.id" :id="card.id" />
  </div>
</template>

<script>
import Card from './Card.vue'

export default {
  components: {
    Card
  }
}
</script>

<style scoped lang="scss">
div {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>

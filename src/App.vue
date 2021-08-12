<template>
  <div id="app">
    <h2>Memory Cards</h2>

    <game-board />

    <form @submit.prevent="restartGame">
      <button>Restart</button>
    </form>

    <transition name="fade">
      <modal v-if="$store.state.modal" @closed="$store.commit('hideModal'); $store.commit('resetValues');" :title="$store.state.modal.title" :message="$store.state.modal.message" />
    </transition>
  
  </div>
</template>

<script>
import GameBoard from './components/GameBoard.vue'
import Modal from './components/Modal.vue'

export default {
  data() {
    return {
      pairs: 5,
      color: 0
    }
  },
  created() {
    this.restartGame();
    this.color = Math.floor(Math.random() * 360);
  },
  methods: {
    restartGame() {
      this.$store.dispatch('restartGame');
    },
  },
  components: {
    GameBoard,
    Modal
  }
}
</script>

<style lang="scss">
:root {
  --main-color: rgb(217, 255, 0);
  --bg-color: rgba(37, 37, 37, 0.301);
}
body {
  background-color: black;
  color: var(--main-color);
  text-shadow: 0 0 6px black;
}
#app {
  input, button {
    padding: 10px;
    border-radius: 10px;
  }
  input {
    margin: 0 10px;
    text-shadow: 0 0 6px black;
  }
  span {
    font-size: 16px;
    vertical-align: middle;
  }
  button {
    background-color: var(--main-color);
    color: white;
    border: none;
    cursor: pointer;
    width: 100px;
    font-size: 20px;
    transition: box-shadow 0.2s ease-in;
    text-shadow: 0 0 6px black;
    margin-top: 10px;
  }
  button:hover {
    box-shadow: 2px 2px 0 rgb(0, 0, 0);
  }
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  background-color: var(--bg-color);
  padding: 20px 10px;
  max-width: 500px;
  margin: 80px auto;
  border-radius: 14px;
  border: 1px solid  var(--main-color);;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .9s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

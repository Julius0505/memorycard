import Vue from 'vue'
import Vuex from 'vuex'
// import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    board: [],
    lastOpenedId: -1,
    playerControllable: true,
    playing: false,
    modal: false
  },
  mutations: {
    resetValues(state) {
      state.lastOpenedId = -1;
      state.playerControllable = true;
      state.board = [];
      state.playing = false;
    },
    createCard(state, {id, randomPairItem}) {
      state.board.push({
        id,
        value: randomPairItem,
        found: false,
        opened: false,
        animating: false
      });
    },
    toggleCard(state, id) {
      state.board[id].opened = !state.board[id].opened;
      state.lastOpenedId = id;

      if(!state.playing) {
        state.playing = true;
      }
    },
    setAsFound(state, typeID) {
      state.board.forEach(card => {
        if(card.value === typeID) {
          card.found = true;
        }
      });
    },
    togglePlayerControllable(state, cntrlValue) {
      state.playerControllable = cntrlValue;
    },
    animateCard(state, id) {
      if(!state.board[id]) return;
      state.board[id].animating = !state.board[id].animating;
    },
    setModal(state, modalObj) {
      state.modal = modalObj;
    },
    hideModal(state) {
      state.modal = false;
    }
  },
  actions: {
    restartGame({dispatch, commit}) {
      commit('resetValues');
      dispatch('createGameBoard');
    },
    createGameBoard({commit}) {
      let pairs = 8;  
      let itemPairs = new Array(pairs).fill(0);
      for (let i = 0; i < pairs * 2; i++) {
        do {
          var randomPairItem = Math.floor(Math.random() * pairs);
        } while (itemPairs[randomPairItem] > 1);
        itemPairs[randomPairItem]++;
        commit('createCard', { id: i, randomPairItem });
      }
    },
    openCard({dispatch, state, commit}, id) {
      if(!state.playerControllable) return;
      dispatch('cardAnimation', id);
      if(state.board.some(card => card.opened) && state.lastOpenedId !== id) {
        dispatch('hideCards', [id, state.lastOpenedId]);
      }
      commit('toggleCard', id);
    },
    hideCards({commit, dispatch, state}, cardsArr) {
      commit('togglePlayerControllable', 0);

      setTimeout(() => {
        let neededType = state.board[cardsArr[0]].value;
        let sameType = true;
        cardsArr.forEach(cardID => {
          commit('toggleCard', cardID);
          if (neededType !== state.board[cardID].value) {
            sameType = false;
          }
        });
        if (sameType) {
          commit('setAsFound', state.board[cardsArr[0]].value);
          dispatch('checkForGameEnd');
        }
        commit('togglePlayerControllable', 1);

        cardsArr.forEach(el => {
          if(!state.board[el].found)
            dispatch('cardAnimation', el)
        });
      }, 1200); // 2 sec
    },
    checkForGameEnd({state, commit}) {
      let gameEnd = state.board.every(card => card.found);
      if(gameEnd) {
        commit('setModal', {
          title: 'Game end',
          message: 'Yeahh, the game just ended. You can play one more time'
        });
      }
    },
    cardAnimation({commit}, id) {
      commit('animateCard', id);
      setTimeout(() => commit('animateCard', id), 200);
    }
  }
})

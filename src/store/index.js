import Vue from 'vue';
import Vuex from 'vuex';

import { getProducts, deleteProducts } from '../service/api/request'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: undefined,
    error: undefined,
    deleteMessage: undefined,
    isLoading: false
  },

  mutations: {
    setProducts(state, products) {
      state.products = products
    },
    setError(state, error) {
      state.error = error
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading
    },
    setDeleteMessage(state, deleteMessage) {
      state.deleteMessage = deleteMessage
    }
  },

  actions: {
    async getProducts({ commit }) {
      try {
        commit('setIsLoading', true)
        const result = await getProducts()

        if (result) {
          commit('setProducts', result)
        }
      } catch (error) {
        commit('setError', error)
      } finally {
        commit('setIsLoading', false)
      }
    },
    async deleteProducts({ commit, state }, products) {

      try {
        let removeProducts = []

        commit('setIsLoading', true)

        if (typeof products !== 'object' || !Array.isArray(products)) {
          throw new Error({
            error: 'Wrong type'
          })
        }

        if (typeof products === 'object') {
          removeProducts.push(products)
        }

        removeProducts = removeProducts.map(product => product.id)

        const result = await deleteProducts()

        if (result) {
          commit('setDeleteMessage', result)
          commit('setProducts', state.products.filter(product => !removeProducts.includes(product.id) ))
        }
      } catch (error) {
        commit('setError', error)
      } finally {
        commit('setIsLoading', false)
      }
    }
  },

  getters: {
    products: state => state.products,
    error: state => state.error,
    isLoading: state => state.isLoading,
    deleteMessage: state => state.deleteMessage
  }
});

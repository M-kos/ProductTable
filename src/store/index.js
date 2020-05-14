import Vue from 'vue'
import Vuex from 'vuex'

import { getProducts, deleteProducts } from '../service/api/request'

Vue.use(Vuex)

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
          commit('setError')
          commit('setProducts', result)
        }
      } catch (error) {
        commit('setError', error)
      } finally {
        commit('setIsLoading', false)
      }
    },
    async deleteProducts({ commit, state }, products) {
      let removeProducts = products
      try {
        commit('setIsLoading', true)

        if (typeof removeProducts === 'number') {
          removeProducts = [ removeProducts ]
        }

        if (typeof removeProducts !== 'object') {
          throw new Error('Wrong type')
        }

        const result = await deleteProducts()

        if (result) {
          commit('setDeleteMessage', result)
          commit('setError')
          commit('setProducts', state.products.filter(product => !removeProducts.includes(product.id) ))
        }
      } catch (error) {
        commit('setError', error)
      } finally {
        removeProducts.splice(0)
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
})

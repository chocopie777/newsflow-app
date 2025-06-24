import { Article } from "@/types"
import { Module } from "vuex"
import { AppState } from ".."

export interface CategoriesNewsState {
  articles: Article[],
  loading: boolean,
  errorMessage: string | null,
}

export default {
  namespaced: true,
  state(): CategoriesNewsState {
    return {
      articles: [],
      loading: false,
      errorMessage: null
    }
  },
  mutations: {
    GET_ARTICLES_REQUEST: function(state){
      state.loading = true
    },
    GET_ARTICLES_SUCCESS: function(state, payload){
      state.loading = false
      state.articles = payload.articles
      state.errorMessage = null
    },
    GET_ARTICLES_FAILED: function(state, payload){
      state.loading = false
      state.articles = []
      state.errorMessage = payload.error
    },
  },
  actions: {
    getArticles: async function(context, payload) {
      try {
        context.commit('GET_ARTICLES_REQUEST')
        const response = await (await fetch(`https://newsdata.io/api/1/latest?apikey=${process.env.VUE_APP_API_KEY}&country=ru${payload.category ? `&category=${payload.category}` : ''}`)).json()
        if(response.status === 'success') {
          context.commit('GET_ARTICLES_SUCCESS', {articles: response.results})
        } else {
          context.commit('GET_ARTICLES_FAILED', {error: response.results.message})
        }
      } catch (error) {
        context.commit('GET_ARTICLES_FAILED', {error})
      }
    },
  }
} as Module<CategoriesNewsState, AppState>
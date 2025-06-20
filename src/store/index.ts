import { Article } from '@/types'
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

// define your typings for the store state
export interface State {
  articles: Article[],
  loading: boolean,
  errorMessage: string | null,
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export default createStore<State>({
  state: {
    articles: [],
    loading: false,
    errorMessage: null
  },
  mutations: {
    GET_ARTICLES_REQUEST: function(state){
      state.loading = true
    },
    GET_ARTICLES_SUCCESS: function(state, payload){
      state.loading = false
      state.articles = payload.articles
    },
    GET_ARTICLES_FAILED: function(state, payload){
      state.loading = false
      state.errorMessage = payload.error
    }
  },
  actions: {
    getArticles: async function(context) {
      try {
        context.commit('GET_ARTICLES_REQUEST')
        const response = await (await fetch(`https://newsdata.io/api/1/latest?apikey=${process.env.VUE_APP_API_KEY}&country=ru`)).json()
        console.log(response);
        context.commit('GET_ARTICLES_SUCCESS', {articles: response.results})
      } catch (error) {
        context.commit('GET_ARTICLES_FAILED', {error})
      }
    }
    // getArticleById: async function(context, payload) {
      
    // }
  }
})

export function useStore () {
  return baseUseStore(key)
}

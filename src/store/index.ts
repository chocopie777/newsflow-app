import { Article } from '@/types'
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import article, { ArticleState } from './modules/article'

// define your typings for the store state
export interface State {
  articles: Article[],
  loading: boolean,
  errorMessage: string | null,
}
export type AppState = State & {article: ArticleState}

// define injection key
export const key: InjectionKey<Store<AppState>> = Symbol()

export default createStore<State>({
  state() {
    return {
      articles: [],
      loading: false,
      errorMessage: null
    }
  },
  modules: {
    article
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
    }
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
})

export function useStore () {
  return baseUseStore(key)
}

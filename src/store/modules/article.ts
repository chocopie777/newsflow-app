import { Article } from "@/types"
import { ActionContext, Module } from "vuex"
import { State } from ".."

export interface ArticleState {
  article: Article | null,
  loading: boolean,
  errorMessage: string | null,
}

export default {
  namespaced: true,
  state(): ArticleState {
    return {
      article: null,
      loading: false,
      errorMessage: null
    }
  },
  mutations: {
    GET_ARTICLES_REQUEST: function (state: ArticleState) {
      state.loading = true
    },
    GET_ARTICLES_SUCCESS: function (state: ArticleState, payload: {article: Article}) {
      state.loading = false
      state.article = payload.article
      state.errorMessage = null
    },
    GET_ARTICLES_FAILED: function (state: ArticleState, payload: {error: string | null}) {
      state.loading = false
      state.article = null
      state.errorMessage = payload.error
    },
  },
  actions: {
    getArticleById: async function (context: ActionContext<ArticleState, State>, payload: {id: string}) {
      try {
        context.commit('GET_ARTICLES_REQUEST')
        const response = await (await fetch(`https://newsdata.io/api/1/latest?apikey=${process.env.VUE_APP_API_KEY}&id=${payload.id}`)).json()
        if(response.status === 'success') {
          context.commit('GET_ARTICLES_SUCCESS', { article: response.results[0] })
        } else {
          context.commit('GET_ARTICLES_FAILED', {error: response.results.message})
        }
      } catch (error) {
        context.commit('GET_ARTICLES_FAILED', { error })
      }
    }
  }
} as Module<ArticleState, State>
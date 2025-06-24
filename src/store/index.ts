import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import article, { ArticleState } from './modules/article'
import lastNews, { LastNewsState } from './modules/lastNews'
import categoriesNews, { CategoriesNewsState } from './modules/categoriesNews'
import searchNews, { SearchNewsState } from './modules/searchNews'

export interface AppState {
  article: ArticleState;
  lastNews: LastNewsState;
  searchNews: SearchNewsState;
  categoriesNews: CategoriesNewsState;
}

// define injection key
export const key: InjectionKey<Store<AppState>> = Symbol()

export default createStore<AppState>({
  modules: {
    article,
    lastNews,
    categoriesNews,
    searchNews
  },
})

export function useStore() {
  return baseUseStore(key)
}

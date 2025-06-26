<template>
  <template v-if="!store.state.article.loading">
    <v-row v-if="!store.state.article.errorMessage">
      <v-col offset="0" cols="12" sm="10" offset-sm="1" md="8" offset-md="2" lg="6" offset-lg="3">
        <div class="w-100 h-100 rounded-b-xl overflow-hidden">
          <img 
            v-if="store.state.article.article?.image_url" 
            :src="store.state.article.article?.image_url" 
            alt="image" 
            style="width: 100%; height: 100%; object-fit: cover;"
          >
          <div v-else class="position-relative w-100 d-flex justify-center align-center" style="height: 400px;">
            <div class="bg-black opacity-30 w-100 h-100">
            </div>
            <svg class="w-25 position-absolute" style="top:50%;transform: translateY(-50%)" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M4.27209 20.7279L10.8686 14.1314C11.2646 13.7354 11.4627 13.5373 11.691 13.4632C11.8918 13.3979 12.1082 13.3979 12.309 13.4632C12.5373 13.5373 12.7354 13.7354 13.1314 14.1314L19.6839 20.6839M14 15L16.8686 12.1314C17.2646 11.7354 17.4627 11.5373 17.691 11.4632C17.8918 11.3979 18.1082 11.3979 18.309 11.4632C18.5373 11.5373 18.7354 11.7354 19.1314 12.1314L22 15M10 9C10 10.1046 9.10457 11 8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9ZM6.8 21H17.2C18.8802 21 19.7202 21 20.362 20.673C20.9265 20.3854 21.3854 19.9265 21.673 19.362C22 18.7202 22 17.8802 22 16.2V7.8C22 6.11984 22 5.27976 21.673 4.63803C21.3854 4.07354 20.9265 3.6146 20.362 3.32698C19.7202 3 18.8802 3 17.2 3H6.8C5.11984 3 4.27976 3 3.63803 3.32698C3.07354 3.6146 2.6146 4.07354 2.32698 4.63803C2 5.27976 2 6.11984 2 7.8V16.2C2 17.8802 2 18.7202 2.32698 19.362C2.6146 19.9265 3.07354 20.3854 3.63803 20.673C4.27976 21 5.11984 21 6.8 21Z"
                  stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </g>
            </svg>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col offset="0" cols="12" sm="10" offset-sm="1" md="8" offset-md="2" lg="6" offset-lg="3">
        <div v-if="!store.state.article.errorMessage" class="px-3">
          <hr>
          <div class="mb-5 mt-5 flex position-relative">
            <div class="d-flex justify-space-between">
              <div class="mb-5">
                {{ store.state.article.article?.pubDate }}
              </div>
              <div class="mb-5 d-flex" style="padding-right: 30px;">
                {{ store.state.article.article?.source_name }}
              </div>
              <button class="position-absolute" style="right: 0; z-index: 10; top: 0;" v-if="favorites.some(obj => obj.article_id === store.state.article.article?.article_id)" @click.stop="favoriteHandler(store.state.article.article)">
              <svg width="22" height="30" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.3333 0.333374H1.66659C1.31296 0.333374 0.973826 0.47385 0.723777 0.723898C0.473728 0.973947 0.333252 1.31309 0.333252 1.66671V20.2867C0.333041 20.551 0.411364 20.8093 0.558275 21.029C0.705186 21.2487 0.91406 21.4197 1.15838 21.5204C1.40269 21.6212 1.67143 21.647 1.93047 21.5947C2.1895 21.5424 2.42716 21.4143 2.61325 21.2267L6.97325 16.88L11.3933 21.28C11.5801 21.4658 11.8178 21.592 12.0763 21.6428C12.3348 21.6935 12.6026 21.6666 12.8458 21.5653C13.089 21.464 13.2968 21.293 13.4429 21.0737C13.5889 20.8544 13.6668 20.5968 13.6666 20.3334V1.66671C13.6666 1.31309 13.5261 0.973947 13.2761 0.723898C13.026 0.47385 12.6869 0.333374 12.3333 0.333374Z"
                  class="selected-color" />
              </svg>
              </button>
              <button class="position-absolute" style="right: 0; z-index: 10; top: 0;" v-else
                @click.stop="favoriteHandler(store.state.article.article)">
                <svg width="22" height="30" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.3333 0.333374H1.66659C1.31296 0.333374 0.973826 0.47385 0.723777 0.723898C0.473728 0.973947 0.333252 1.31309 0.333252 1.66671V20.2867C0.333041 20.551 0.411364 20.8093 0.558275 21.029C0.705186 21.2487 0.91406 21.4197 1.15838 21.5204C1.40269 21.6212 1.67143 21.647 1.93047 21.5947C2.1895 21.5424 2.42716 21.4143 2.61325 21.2267L6.97325 16.88L11.3933 21.28C11.5801 21.4658 11.8178 21.592 12.0763 21.6428C12.3348 21.6935 12.6026 21.6666 12.8458 21.5653C13.089 21.464 13.2968 21.293 13.4429 21.0737C13.5889 20.8544 13.6668 20.5968 13.6666 20.3334V1.66671C13.6666 1.31309 13.5261 0.973947 13.2761 0.723898C13.026 0.47385 12.6869 0.333374 12.3333 0.333374Z"
                    class="unselected-color" />
                </svg>
              </button>
            </div>
            <hr>
          </div>
          <h2 class="text-h4 font-weight-bold mb-5" style="word-break: break-word;">
            {{ store.state.article.article?.title }}
          </h2>
          <p class="text-subtitle-1">
            {{ store.state.article.article?.description }}
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row v-if="store.state.article.errorMessage">
      <v-col cols="12">
        <div class="bg-red text-center py-5 px-10 text-center" style="word-break: break-word;">{{ store.state.article.errorMessage }}</div>
      </v-col>
    </v-row>
  </template>
  <div v-else class="d-flex justify-center mt-5">
    <v-progress-circular indeterminate></v-progress-circular>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { defineProps } from "vue";
import { Article } from '@/types';
const route = useRoute()
const store = useStore()
//хранение избранных
const favorites = ref<Article[]>([])

//получение пропсов
const props = defineProps({
  changeAppBarTitle: { type: Function, required: true },
  changeIsBackArrow: {type:Function, required: true}
})

//отобразить кнопку назад в приложении
props.changeIsBackArrow(true)

onMounted(async () => {
  //вызвать action модуля article/getArticleById
  await store.dispatch('article/getArticleById', { id: route.params.id })
  //изменить заголовок приложения
  await props.changeAppBarTitle(store.state.article.article?.title)
  // при монтировании загрузить избранное из LocalStorage
  if (localStorage.getItem('favorites')) {
    favorites.value = JSON.parse(localStorage.getItem('favorites') || '[]')
  }
})

//обработчик нажатия кнопки для добавления/удаления избранного
function favoriteHandler(data: Article | null) {
  // Если data null, выходим из функции
  if (data === null) {
    return;
  }

  try {
    if(localStorage.getItem('favorites')) {
      favorites.value = JSON.parse(localStorage.getItem('favorites') || '[]')
      // Если фильм есть в избранном, то удалить. Иначе добавить в избранное
      if(favorites.value.some(obj => obj.article_id === data.article_id)) {
        const index = favorites.value.findIndex(obj => obj.article_id === data.article_id)
        if(index !== -1) {
          favorites.value.splice(index, 1)
        }
      } else {
        favorites.value.unshift(data)
      }
  
      localStorage.setItem('favorites', JSON.stringify(favorites.value))
    } else {
      favorites.value.unshift(data)
      localStorage.setItem('favorites', JSON.stringify([data]))
    }
  } catch(e) {
    console.log(e);
    
  }
}
</script>

<style scoped>
.selected-color {
  fill: rgb(var(--v-theme-primary))
}

.unselected-color {
  fill: #414B5A;
}
.rounded-b-xl {
  overflow: hidden; /* Обрезает всё, что выходит за границы */
  max-height: 50vh; /* Ограничивает максимальную высоту */
}
</style>
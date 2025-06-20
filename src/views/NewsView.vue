<template>
  <v-row>
    <v-col cols="12">
      <h2 class="text-center text-h3 mt-5 mb-5">News</h2>
    </v-col>
  </v-row>
  <v-row class="mt-5 ml-5">
    <v-col cols="6">
      <v-card height="150" class="ma-3 cursor-pointer d-flex" v-for="article of store.state.articles"
        :key="article.article_id" @click="$router.push(`/article/${article.article_id}`)">
        <v-avatar class="ma-3 align-self-center" rounded size="125">
          <img v-if="article.image_url" :src="article.image_url" alt="image">
          <div v-else class="position-relative h-100 w-100 d-flex justify-center align-center">
            <div class="bg-black opacity-30 w-100 h-100">
            </div>
            <svg class="w-50 position-absolute" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M4.27209 20.7279L10.8686 14.1314C11.2646 13.7354 11.4627 13.5373 11.691 13.4632C11.8918 13.3979 12.1082 13.3979 12.309 13.4632C12.5373 13.5373 12.7354 13.7354 13.1314 14.1314L19.6839 20.6839M14 15L16.8686 12.1314C17.2646 11.7354 17.4627 11.5373 17.691 11.4632C17.8918 11.3979 18.1082 11.3979 18.309 11.4632C18.5373 11.5373 18.7354 11.7354 19.1314 12.1314L22 15M10 9C10 10.1046 9.10457 11 8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9ZM6.8 21H17.2C18.8802 21 19.7202 21 20.362 20.673C20.9265 20.3854 21.3854 19.9265 21.673 19.362C22 18.7202 22 17.8802 22 16.2V7.8C22 6.11984 22 5.27976 21.673 4.63803C21.3854 4.07354 20.9265 3.6146 20.362 3.32698C19.7202 3 18.8802 3 17.2 3H6.8C5.11984 3 4.27976 3 3.63803 3.32698C3.07354 3.6146 2.6146 4.07354 2.32698 4.63803C2 5.27976 2 6.11984 2 7.8V16.2C2 17.8802 2 18.7202 2.32698 19.362C2.6146 19.9265 3.07354 20.3854 3.63803 20.673C4.27976 21 5.11984 21 6.8 21Z"
                  stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </g>
            </svg>
          </div>
        </v-avatar>
        <div class="flex-grow-1 justify-space-between flex-column d-flex" style="min-width: 0; overflow: hidden;">
          <div>
            <v-card-title class="text-wrap text-truncate">
              {{ article.title }}
            </v-card-title>
            <v-card-subtitle class="text-wrap text-truncate">
              {{ article.description }}
            </v-card-subtitle>
          </div>
          <div class="d-flex justify-space-between">
            <v-card-text class="font-weight-bold">
              {{ article.source_name }}
            </v-card-text>
            <v-card-text class="text-right font-weight-bold">
              {{ article.pubDate }}
            </v-card-text>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { onMounted } from 'vue';
const store = useStore()

onMounted(() => {
  store.dispatch('getArticles')
})
</script>

<style scoped></style>
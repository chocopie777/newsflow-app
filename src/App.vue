<template>
  <v-app>
    <v-navigation-drawer color="primary" height="25">
      <v-list-item class="py-10 text-center">
        <svg cl width="29" height="26" viewBox="0 0 29 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M26.538 3.13719L24.1867 0.803467L21.853 3.13719L19.5193 0.803467L17.1856 3.13719L14.8343 0.803467L12.5006 3.13719L10.1493 0.803467L7.81559 3.13719L5.48187 0.803467L3.1306 3.13719L0.796875 0.803467V22.737C0.796875 24.1933 1.97251 25.369 3.42889 25.369H26.2397C27.6961 25.369 28.8717 24.1933 28.8717 22.737V0.803467L26.538 3.13719ZM26.2397 12.2089H3.42889V6.94484H26.2397V12.2089ZM16.1503 14.8409H26.2397V17.4729H16.1503V14.8409ZM3.42889 14.8409H13.5183V22.737H3.42889V14.8409ZM16.1503 22.737V20.1049H26.2397V22.737H16.1503Z"
            fill="#fff" />
        </svg>
        <span class="text-h4 ml-2">NEWSFLOW</span>
      </v-list-item>
      <v-divider></v-divider>
      <router-link to="/news" custom v-slot="{ navigate }">
        <v-list-item link title="News" @click="(e) => navigate()"></v-list-item>
      </router-link>
      <v-divider></v-divider>
      <v-list class="p-0" density="compact">
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="Categories"></v-list-item>
          </template>
          <v-list-item v-for="category of categories" :key="category" :title="category" @click="$router.push(`/categories/${category}`)"></v-list-item>
        </v-list-group>
      </v-list>
      <v-divider></v-divider>
      <router-link to="/favorites" custom v-slot="{ navigate }">
        <v-list-item link title="Favorites" @click="(e) => navigate()"></v-list-item>
      </router-link>
      <v-divider></v-divider>
    </v-navigation-drawer>
    <v-main height="100">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { categories } from './utils/categories';
</script>

<style>
.v-list {
  padding: 0;
}
</style>

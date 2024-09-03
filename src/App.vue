<template>
  <v-app>
    <v-navigation-drawer
      floating
      permanent
    >
      <v-list
        density="compact"
        nav
      >
        <v-list-item @click="$router.push('/home')" prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
        <v-list-item @click="$router.push('/coinsearch')" prepend-icon="mdi-forum" title="CoinSearch" value="about"></v-list-item>
        <v-list-item @click="$router.push('/CoinSearch')" prepend-icon="mdi-forum" title="CoinList" value="about"></v-list-item>
        <v-list-item @click="$router.push('/CoinSearch')" prepend-icon="mdi-forum" title="Warning" value="about"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({}),
  methods: {}
}
</script>

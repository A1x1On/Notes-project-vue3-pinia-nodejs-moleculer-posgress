<template>
  <v-container class="error-page">
    <v-row class="py-10">
      <div class="error-page__404">404 NOT FOUND</div>
    </v-row>

    <v-row>
      <router-link to="/menu" class="error-page__menu text-decoration-none">
        <div class="menu-page__routes-item">GO TO MENU</div>
      </router-link>
    </v-row>
  </v-container>
</template>

<script lang="ts">
export default defineComponent({
  name: 'menu',
  components: {},
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.error-page {
  &__404 {
    margin: 50px auto;
    color: var(--text-color);
    font-size: var(--fs-title);
  }

  &__menu {
    margin: 0px auto;
    color: var(--text-color-2);
    font-size: var(--fs-text);
  }
}
</style>

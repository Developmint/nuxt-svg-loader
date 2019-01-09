<template>
  <nuxt-logo viewBox="1 2 3 4" width="100" />
  <nuxt-logo-two />
</template>

<script>
export default {
  loading: false,
  components: {
    NuxtLogo: () => import('../components/Nuxt.svg'),
    NuxtLogoTwo: () => import('../components/NuxtTwo.svg')
  }
}
</script>

<template>
  <div>
    <Header />
    <SiderMemu />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import SiderMemu from "./SiderMenu.vue";
export default {
  components: {
    Header,
    Footer,
    SiderMemu,
  },
};
</script>

<style></style>

<template>
  <div id="app">
    <a-button>按钮</a-button>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style lang="less"></style>

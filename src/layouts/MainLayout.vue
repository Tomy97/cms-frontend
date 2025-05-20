<script setup lang="ts">
import Sidebar from './components/Sidebar.vue'
</script>

<template>
  <div class="app‑container">
    <Sidebar/>
    <main class="app‑content">
      <RouterView/>
    </main>
  </div>
</template>

<style scoped>
.app‑container {
  display: flex;
  height: 100vh; /* altura completa */
  overflow: hidden;
}

.app‑content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}
</style>
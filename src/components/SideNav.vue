<template>
  <nav class="w-16 bg-[#1a1a1a] dark:bg-[#121212] border-r border-[#2a2a2a] dark:border-[#333333] flex flex-col items-center py-4 pixel-border-right">
    <div class="w-12 h-12 mb-6 pixel-logo"></div>
    
    <div class="flex flex-col gap-4">
      <router-link 
        to="/optimization/quick" 
        class="w-12 h-12 flex items-center justify-center"
        :class="[
          isActive('quick') 
            ? 'pixel-border-sm neon-border text-purple-400' 
            : 'text-gray-500 hover:text-purple-400 hover:bg-purple-900/20'
        ]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
        </svg>
        <span class="sr-only">快速优化</span>
      </router-link>

      <router-link 
        to="/optimization/fine" 
        class="w-12 h-12 flex items-center justify-center"
        :class="[
          isActive('fine') 
            ? 'pixel-border-sm neon-border text-purple-400' 
            : 'text-gray-500 hover:text-purple-400 hover:bg-purple-900/20'
        ]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
        </svg>
        <span class="sr-only">精细优化</span>
      </router-link>

      <router-link 
        to="/optimization/settings" 
        class="w-12 h-12 flex items-center justify-center"
        :class="[
          isActive('settings') 
            ? 'pixel-border-sm neon-border text-purple-400' 
            : 'text-gray-500 hover:text-purple-400 hover:bg-purple-900/20'
        ]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
        <span class="sr-only">设置</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const isActive = (tab: string) => {
  return route.path.includes(tab)
}
</script>

<style scoped>
.pixel-logo {
  background-color: #805AD5;
  clip-path: polygon(
    0% 0%, 100% 0%, 100% 20%, 80% 20%, 80% 40%, 100% 40%, 
    100% 60%, 80% 60%, 80% 80%, 100% 80%, 100% 100%, 0% 100%
  );
  box-shadow: 
    0 0 5px #805AD5,
    0 0 10px #805AD5;
}

.pixel-border-right {
  position: relative;
  box-shadow: 
    3px 0 0 0 #4A3490;
}

/* 鼠标悬停时的动画效果 */
@keyframes pixel-hover {
  0% { box-shadow: 0 0 0 0 rgba(128, 90, 213, 0.4); }
  70% { box-shadow: 0 0 0 5px rgba(128, 90, 213, 0); }
  100% { box-shadow: 0 0 0 0 rgba(128, 90, 213, 0); }
}

.router-link-active {
  animation: pixel-hover 2s infinite;
}
</style> 
<template>
  <nav
    class="w-16 bg-[#1a1a1a]/95 dark:bg-[#121212]/95 border-r border-[#2a2a2a]/30 dark:border-[#333333]/30 flex flex-col items-center py-6 backdrop-blur-md">
    <div class="w-12 h-12 mb-8 pixel-logo"></div>

    <div class="flex flex-col gap-5">
      <router-link to="/optimization/quick"
        class="w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200" :class="[
          isActive('quick')
            ? 'bg-purple-500/20 text-purple-400 shadow-inner'
            : 'text-gray-500 hover:text-purple-400 hover:bg-purple-500/10'
        ]" v-tooltip="'快速优化'">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
        </svg>
        <span class="sr-only">快速优化</span>
      </router-link>

      <router-link to="/optimization/fine"
        class="w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200" :class="[
          isActive('fine')
            ? 'bg-purple-500/20 text-purple-400 shadow-inner'
            : 'text-gray-500 hover:text-purple-400 hover:bg-purple-500/10'
        ]" v-tooltip="'精细优化'">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
        </svg>
        <span class="sr-only">精细优化</span>
      </router-link>

      <router-link to="/optimization/settings"
        class="w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200" :class="[
          isActive('settings')
            ? 'bg-purple-500/20 text-purple-400 shadow-inner'
            : 'text-gray-500 hover:text-purple-400 hover:bg-purple-500/10'
        ]" v-tooltip="'设置'">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path
            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z">
          </path>
        </svg>
        <span class="sr-only">设置</span>
      </router-link>

      <!-- 底部帮助按钮 -->
      <div class="mt-auto pt-10">
        <button
          class="w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 text-gray-500 hover:text-purple-400 hover:bg-purple-500/10"
          v-tooltip="'帮助'">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <span class="sr-only">帮助</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const isActive = (tab: string) => {
  return route.path.includes(tab)
}
</script>

<style scoped>
.pixel-logo {
  background-color: #805AD5;
  clip-path: polygon(0% 0%, 100% 0%, 100% 20%, 80% 20%, 80% 40%, 100% 40%,
      100% 60%, 80% 60%, 80% 80%, 100% 80%, 100% 100%, 0% 100%);
  box-shadow:
    0 0 5px #805AD5,
    0 0 10px #805AD5;
  animation: pulse 5s infinite alternate;
}

@keyframes pulse {
  0% {
    box-shadow:
      0 0 5px #805AD5,
      0 0 10px #805AD5;
  }

  100% {
    box-shadow:
      0 0 8px #805AD5,
      0 0 15px #805AD5;
  }
}

/* 添加自定义tooltip指令 - 需要在main.js中实现 */
</style>
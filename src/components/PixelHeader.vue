<template>
  <header class="h-14 border-b border-[#2a2a2a] dark:border-[#333333] bg-[#1a1a1a] dark:bg-[#121212] flex items-center px-4 justify-between pixel-border-bottom">
    <div class="flex items-center">
      <div class="w-8 h-8 mr-2 pixel-logo"></div>
      <h1 class="text-xl font-bold text-purple-400 tracking-wider pixel-font neon-text">NeonOcto</h1>
      <div class="ml-2 px-2 py-0.5 bg-purple-900/30 rounded-none border border-purple-500/30 pixel-border-sm">
        <span class="text-[10px] text-purple-300 pixel-font">v1.0</span>
      </div>
    </div>
    
    <div class="flex items-center gap-3">
      <button class="w-8 h-8 bg-transparent hover:bg-gray-800 text-yellow-400 rounded-none pixel-button-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
        </svg>
        <span class="sr-only">能量</span>
      </button>
      
      <button 
        class="w-8 h-8 bg-transparent hover:bg-gray-800 rounded-none pixel-button-sm"
        @click="toggleTheme"
      >
        <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-400">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-400">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
        <span class="sr-only">切换主题</span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref(false)

onMounted(() => {
  // 初始化主题
  const savedTheme = localStorage.getItem('theme') || 'dark'
  isDark.value = savedTheme === 'dark'
  applyTheme()
})

function toggleTheme() {
  isDark.value = !isDark.value
  applyTheme()
}

function applyTheme() {
  const theme = isDark.value ? 'dark' : 'light'
  localStorage.setItem('theme', theme)
  
  // 应用主题到文档
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
</script>

<style scoped>
.pixel-border-bottom {
  box-shadow: 0 3px 0 0 #4A3490;
}

.pixel-logo {
  background-color: #805AD5;
  clip-path: polygon(
    0% 0%, 100% 0%, 100% 20%, 80% 20%, 80% 40%, 100% 40%, 
    100% 60%, 80% 60%, 80% 80%, 100% 80%, 100% 100%, 0% 100%
  );
  box-shadow: 
    0 0 5px #805AD5,
    0 0 8px #805AD5;
}

.pixel-button-sm {
  position: relative;
  border: none;
  background: transparent;
  color: white;
  transform: translate(0, 0);
  transition: transform 0.05s linear, box-shadow 0.1s linear;
  box-shadow: 
    -2px 0 0 0 #4A3490,
    2px 0 0 0 #4A3490,
    0 -2px 0 0 #4A3490,
    0 2px 0 0 #4A3490;
}

.pixel-button-sm:hover {
  box-shadow: 
    -2px 0 0 0 #805AD5,
    2px 0 0 0 #805AD5,
    0 -2px 0 0 #805AD5,
    0 2px 0 0 #805AD5,
    0 0 5px #805AD5;
}

.pixel-button-sm:active {
  transform: translate(0, 2px);
  box-shadow: 
    -2px 0 0 0 #4A3490,
    2px 0 0 0 #4A3490,
    0 -2px 0 0 #4A3490,
    0 0 0 0 #4A3490;
}
</style> 
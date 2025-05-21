<template>
  <header
    class="h-14 border-b border-[#2a2a2a]/30 dark:border-[#333333]/30 bg-[#1a1a1a]/95 dark:bg-[#121212]/95 backdrop-blur-md flex items-center px-6 justify-between">
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 pixel-logo"></div>
      <div class="flex items-baseline gap-2">
        <h1 class="text-xl flex items-baseline gap-0.5">
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 pixel-text neon-text">Neon</span>
          <span class="text-white pixel-text neon-text-white">Octo</span>
        </h1>
        <div class="px-2 py-0.5 bg-purple-900/20 rounded-md border border-purple-500/20 translate-y-[1px] neon-border">
          <span class="text-[10px] text-purple-300 font-pixel">v1.0</span>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <button
        class="w-8 h-8 bg-transparent hover:bg-gray-800/30 text-yellow-400 rounded-md flex items-center justify-center transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
        </svg>
        <span class="sr-only">能量</span>
      </button>

      <button
        class="w-8 h-8 bg-transparent hover:bg-gray-800/30 rounded-md flex items-center justify-center transition-colors"
        @click="toggleTheme">
        <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-400">
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
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-400">
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
@font-face {
  font-family: 'Press Start 2P';
  src: url('/fonts/PressStart2P-Regular.ttf') format('truetype');
  font-display: swap;
}

.font-pixel {
  font-family: 'Press Start 2P', monospace;
}

.pixel-logo {
  background-color: #805AD5;
  clip-path: polygon(0% 0%, 100% 0%, 100% 20%, 80% 20%, 80% 40%, 100% 40%,
      100% 60%, 80% 60%, 80% 80%, 100% 80%, 100% 100%, 0% 100%);
  box-shadow:
    0 0 10px rgba(128, 90, 213, 0.8),
    0 0 20px rgba(128, 90, 213, 0.6),
    0 0 30px rgba(128, 90, 213, 0.4);
  animation: pulse 5s infinite alternate;
}

.pixel-text {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.875rem;
  line-height: 1;
  letter-spacing: 0.5px;
  transform: translateY(1px);
}

.neon-text {
  text-shadow:
    0 0 5px rgba(168, 85, 247, 0.8),
    0 0 10px rgba(168, 85, 247, 0.5),
    0 0 15px rgba(168, 85, 247, 0.3);
  animation: neonPulse 4s ease-in-out infinite;
}

.neon-text-white {
  text-shadow:
    0 0 5px rgba(255, 255, 255, 0.8),
    0 0 10px rgba(168, 85, 247, 0.5),
    0 0 15px rgba(168, 85, 247, 0.3);
  animation: neonPulseWhite 4s ease-in-out infinite;
}

.neon-border {
  box-shadow:
    0 0 5px rgba(168, 85, 247, 0.4),
    0 0 10px rgba(168, 85, 247, 0.3),
    inset 0 0 5px rgba(168, 85, 247, 0.4),
    inset 0 0 10px rgba(168, 85, 247, 0.3);
  animation: borderPulse 4s ease-in-out infinite;
}

@keyframes neonPulse {

  0%,
  100% {
    text-shadow:
      0 0 5px rgba(168, 85, 247, 0.8),
      0 0 10px rgba(168, 85, 247, 0.5),
      0 0 15px rgba(168, 85, 247, 0.3);
  }

  50% {
    text-shadow:
      0 0 10px rgba(168, 85, 247, 0.9),
      0 0 20px rgba(168, 85, 247, 0.6),
      0 0 30px rgba(168, 85, 247, 0.4);
  }
}

@keyframes neonPulseWhite {

  0%,
  100% {
    text-shadow:
      0 0 5px rgba(255, 255, 255, 0.8),
      0 0 10px rgba(168, 85, 247, 0.5),
      0 0 15px rgba(168, 85, 247, 0.3);
  }

  50% {
    text-shadow:
      0 0 10px rgba(255, 255, 255, 0.9),
      0 0 20px rgba(168, 85, 247, 0.6),
      0 0 30px rgba(168, 85, 247, 0.4);
  }
}

@keyframes borderPulse {

  0%,
  100% {
    box-shadow:
      0 0 5px rgba(168, 85, 247, 0.4),
      0 0 10px rgba(168, 85, 247, 0.3),
      inset 0 0 5px rgba(168, 85, 247, 0.4),
      inset 0 0 10px rgba(168, 85, 247, 0.3);
  }

  50% {
    box-shadow:
      0 0 8px rgba(168, 85, 247, 0.5),
      0 0 15px rgba(168, 85, 247, 0.4),
      inset 0 0 8px rgba(168, 85, 247, 0.5),
      inset 0 0 15px rgba(168, 85, 247, 0.4);
  }
}

@keyframes pulse {
  0% {
    box-shadow:
      0 0 10px rgba(128, 90, 213, 0.8),
      0 0 20px rgba(128, 90, 213, 0.6),
      0 0 30px rgba(128, 90, 213, 0.4);
  }

  100% {
    box-shadow:
      0 0 15px rgba(128, 90, 213, 0.9),
      0 0 30px rgba(128, 90, 213, 0.7),
      0 0 45px rgba(128, 90, 213, 0.5);
  }
}
</style>
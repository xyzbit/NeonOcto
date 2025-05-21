<template>
  <div class="min-h-screen flex flex-col">
    <PixelHeader />

    <main
      class="flex-grow flex items-center justify-center bg-gradient-to-b from-[#151515] to-[#101010] dark:from-[#0d0d0d] dark:to-[#080808]">
      <div class="container mx-auto px-4 py-12 max-w-4xl">
        <div
          class="border border-[#2a2a2a]/30 dark:border-[#333333]/30 bg-[#1a1a1a]/90 dark:bg-[#121212]/90 backdrop-blur-md shadow-2xl rounded-xl p-8 text-center">
          <div class="mx-auto mb-8 w-24 h-24 pixel-logo"></div>

          <h1
            class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-4 tracking-tight font-pixel neon-title">
            NeonOcto 提示词优化平台</h1>

          <p class="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            NeonOcto 是一个专业的AI提示词优化平台，可以帮助您创建更加高效、准确的提示词，提升AI模型的输出质量。
            通过智能分析和优化建议，让您的AI交互更加精准和高效。
          </p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div
              class="bg-[#252525]/50 backdrop-blur-sm p-5 rounded-lg border border-[#333333]/30 hover:border-blue-500/30 transition-all duration-300 hover:shadow-md hover:shadow-blue-900/10">
              <div
                class="w-10 h-10 rounded-md bg-blue-600/80 mx-auto flex items-center justify-center mb-3 shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round">
                  <path d="M5 3v4M3 5h4M6 17v4M4 19h4M13 3l4 4L3 21l4-4z"></path>
                </svg>
              </div>
              <h3 class="text-blue-400 font-semibold mb-2 font-mono tracking-wide">快速优化</h3>
              <p class="text-gray-400 text-sm">一键优化您的提示词，提升AI响应的质量和准确性。</p>
            </div>

            <div
              class="bg-[#252525]/50 backdrop-blur-sm p-5 rounded-lg border border-[#333333]/30 hover:border-purple-500/30 transition-all duration-300 hover:shadow-md hover:shadow-purple-900/10">
              <div
                class="w-10 h-10 rounded-md bg-purple-600/80 mx-auto flex items-center justify-center mb-3 shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round">
                  <path
                    d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2">
                  </path>
                </svg>
              </div>
              <h3 class="text-purple-400 font-semibold mb-2 font-mono tracking-wide">精细调整</h3>
              <p class="text-gray-400 text-sm">通过测试用例和反馈，迭代优化您的提示词系统。</p>
            </div>

            <div
              class="bg-[#252525]/50 backdrop-blur-sm p-5 rounded-lg border border-[#333333]/30 hover:border-green-500/30 transition-all duration-300 hover:shadow-md hover:shadow-green-900/10">
              <div
                class="w-10 h-10 rounded-md bg-green-600/80 mx-auto flex items-center justify-center mb-3 shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round">
                  <path
                    d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z">
                  </path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <h3 class="text-green-400 font-semibold mb-2 font-mono tracking-wide">多模型支持</h3>
              <p class="text-gray-400 text-sm">支持多种AI模型，针对不同平台优化您的提示词。</p>
            </div>
          </div>

          <router-link to="/optimization"
            class="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg inline-flex items-center justify-center whitespace-nowrap shadow-lg shadow-purple-700/20 transition-all duration-300 backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" width="24" height="24" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
            </svg>
            开始使用
            <span class="ml-1 text-[10px] font-mono opacity-80">⌘+O</span>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import PixelHeader from '../components/PixelHeader.vue'
</script>

<style scoped>
.font-pixel {
  font-family: 'Press Start 2P', monospace;
}

.neon-title {
  text-shadow:
    0 0 5px rgba(168, 85, 247, 0.8),
    0 0 10px rgba(168, 85, 247, 0.5),
    0 0 15px rgba(168, 85, 247, 0.3);
  animation: titlePulse 4s ease-in-out infinite;
  font-size: 1.5rem;
  letter-spacing: 1px;
}

@keyframes titlePulse {

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

.pixel-logo {
  background-color: #805AD5;
  clip-path: polygon(0% 0%, 100% 0%, 100% 20%, 80% 20%, 80% 40%, 100% 40%,
      100% 60%, 80% 60%, 80% 80%, 100% 80%, 100% 100%, 0% 100%);
  box-shadow:
    0 0 10px rgba(128, 90, 213, 0.8),
    0 0 20px rgba(128, 90, 213, 0.6),
    0 0 30px rgba(128, 90, 213, 0.4);
  animation: logoPulse 5s infinite alternate;
}

@keyframes logoPulse {
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
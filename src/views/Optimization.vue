<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-br from-[#151515] to-[#101010] dark:from-[#0d0d0d] dark:to-[#080808]">
    <PixelHeader />

    <main class="flex-grow flex">
      <SideNav />

      <div class="flex-1 flex flex-col">
        <!-- 组件内容区域 -->
        <div class="flex-grow p-4">
          <QuickOptimization v-if="currentTab === 'quick'" />
          <FineOptimization v-if="currentTab === 'fine'" />
          <Settings v-if="currentTab === 'settings'" />
        </div>

        <!-- 页脚信息 -->
        <footer
          class="py-2 px-4 bg-[#1a1a1a]/80 dark:bg-[#121212]/80 border-t border-[#2a2a2a]/30 dark:border-[#333333]/30 backdrop-blur-md text-xs text-gray-500 flex justify-between items-center">
          <div class="flex items-center">
            <span class="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            <span>模型状态: 在线</span>
          </div>
          <div class="font-mono">NeonOcto v1.0</div>
          <div class="flex items-center">
            <span class="font-mono mr-1">最后更新:</span>
            <span>{{ getCurrentDateTime() }}</span>
          </div>
        </footer>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import PixelHeader from '../components/PixelHeader.vue'
import SideNav from '../components/SideNav.vue'
import QuickOptimization from '../components/QuickOptimization.vue'
import FineOptimization from '../components/FineOptimization.vue'
import Settings from '../components/Settings.vue'

const route = useRoute()
const currentTab = computed(() => {
  const path = route.path
  if (path.includes('quick')) return 'quick'
  if (path.includes('fine')) return 'fine'
  if (path.includes('settings')) return 'settings'
  return 'quick' // 默认显示快速优化
})

// 获取当前日期时间
function getCurrentDateTime() {
  const now = new Date()
  return now.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
/* 添加适合Mac风格的阴影效果 */
.min-h-screen {
  box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.3);
}
</style>
<template>
  <div class="min-h-screen flex flex-col">
    <PixelHeader />
    
    <main class="flex-grow flex">
      <SideNav />
      
      <div class="flex-1 flex flex-col">
        <!-- 组件内容区域 -->
        <div class="flex-grow">
          <QuickOptimization v-if="currentTab === 'quick'" />
          <FineOptimization v-if="currentTab === 'fine'" />
          <Settings v-if="currentTab === 'settings'" />
        </div>
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
</script> 
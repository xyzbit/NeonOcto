import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface PromptVersion {
  id: number
  content: string
  isOptimized: boolean
  timestamp: Date
}

export interface TestCase {
  id: number
  scenario: string
  expectedResult: string
}

export const usePromptStore = defineStore('prompt', () => {
  // 当前活跃的提示词
  const currentPrompt = ref<string>('')
  
  // 提示词历史版本
  const promptVersions = ref<PromptVersion[]>([])
  
  // 当前选中的模型
  const selectedModel = ref<string>('Claude-3.5')
  
  // 当前选中的编辑器
  const selectedEditor = ref<string>('Cursor')
  
  // 测试场景
  const testScenario = ref<string>('')
  
  // 测试用例
  const testCases = ref<TestCase[]>([
    { id: 1, scenario: '用户询问', expectedResult: '详细解释' },
    { id: 2, scenario: '用户要求', expectedResult: '性能更佳' }
  ])
  
  // 性能指标
  const modelLatency = ref<number>(2.34)
  const tokenUsage = ref<number>(1245)
  
  // 计算属性：最新的优化版本和原始版本
  const latestOptimizedVersion = computed(() => 
    promptVersions.value.filter(v => v.isOptimized).sort((a, b) => 
      b.timestamp.getTime() - a.timestamp.getTime()
    )[0] || null
  )
  
  const originalVersion = computed(() => 
    promptVersions.value.filter(v => !v.isOptimized).sort((a, b) => 
      a.timestamp.getTime() - b.timestamp.getTime()
    )[0] || null
  )
  
  // 添加新的提示词版本
  function addPromptVersion(content: string, isOptimized: boolean) {
    const newVersion: PromptVersion = {
      id: promptVersions.value.length + 1,
      content,
      isOptimized,
      timestamp: new Date()
    }
    promptVersions.value.push(newVersion)
    return newVersion.id
  }
  
  // 更新当前提示词
  function updateCurrentPrompt(content: string) {
    currentPrompt.value = content
  }
  
  // 执行优化
  function optimizePrompt() {
    // 在实际应用中，这里会调用API进行优化
    // 这里仅做简单模拟
    if (currentPrompt.value.trim() === '') return
    
    // 先保存当前版本作为原始版本（如果没有原始版本）
    if (originalVersion.value === null) {
      addPromptVersion(currentPrompt.value, false)
    }
    
    // 模拟优化结果
    const optimized = currentPrompt.value + '，【请确保使用索引并添加错误处理】'
    
    // 保存优化版本
    addPromptVersion(optimized, true)
    
    // 更新当前提示词为优化版本
    updateCurrentPrompt(optimized)
    
    // 更新性能指标（模拟）
    modelLatency.value = Math.random() * 3 + 1
    tokenUsage.value = Math.floor(Math.random() * 1000) + 500
  }
  
  return {
    currentPrompt,
    promptVersions,
    selectedModel,
    selectedEditor,
    testScenario,
    testCases,
    modelLatency,
    tokenUsage,
    latestOptimizedVersion,
    originalVersion,
    addPromptVersion,
    updateCurrentPrompt,
    optimizePrompt
  }
}) 
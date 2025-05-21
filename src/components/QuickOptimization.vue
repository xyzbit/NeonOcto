<template>
  <div
    class="h-full flex flex-col p-4 overflow-auto bg-gradient-to-b from-[#151515] to-[#101010] dark:from-[#0d0d0d] dark:to-[#080808]">
    <!-- 添加页面标题 -->
    <div class="flex items-center mb-6">
      <h2 class="text-xl text-purple-400 pixel-text-lg">快速优化</h2>
    </div>

    <!-- 平台和模型选择栏 -->
    <div
      class="flex items-center gap-4 mb-4 p-3 bg-[#1a1a1a] dark:bg-[#121212] border border-[#2a2a2a] dark:border-[#333333] rounded-lg">
      <div class="flex items-center gap-2">
        <span class="text-sm text-purple-300 pixel-text-sm">模拟平台:</span>
        <select v-model="selectedPlatform"
          class="w-[140px] h-8 text-xs bg-[#252525] border-[#333333] text-purple-200 rounded-md pixel-text-sm">
          <option value="openai">OpenAI</option>
          <option value="anthropic">Anthropic</option>
          <option value="google">Google</option>
        </select>
      </div>

      <div class="flex items-center gap-2">
        <span class="text-sm text-purple-300 pixel-text-sm">优化模型:</span>
        <select v-model="optimizationModel"
          class="w-[140px] h-8 text-xs bg-[#252525] border-[#333333] text-purple-200 rounded-md pixel-text-sm">
          <option value="gemini">Gemini</option>
          <option value="gpt4">GPT-4</option>
          <option value="claude">Claude</option>
        </select>
      </div>

      <div class="flex items-center gap-2">
        <span class="text-sm text-purple-300 pixel-text-sm">回复模型:</span>
        <select v-model="responseModel"
          class="w-[140px] h-8 text-xs bg-[#252525] border-[#333333] text-purple-200 rounded-md pixel-text-sm">
          <option value="gpt4">GPT-4</option>
          <option value="gpt35">GPT-3.5</option>
          <option value="claude">Claude</option>
          <option value="gemini">Gemini</option>
        </select>
      </div>
    </div>

    <!-- 提示词编辑区域 -->
    <div class="grid grid-cols-2 gap-4 mb-4">
      <!-- 原始提示 -->
      <div class="border border-[#2a2a2a] dark:border-[#333333] bg-[#1a1a1a] dark:bg-[#121212] shadow-lg rounded-lg">
        <div class="p-3">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-sm text-blue-400 pixel-text-sm">原始提示</h3>
            <div class="bg-blue-900/30 border border-blue-500/30 px-2 py-0.5 rounded-md">
              <span class="text-[10px] text-blue-300 pixel-text-sm">INPUT</span>
            </div>
          </div>
          <textarea v-model="originalPrompt" placeholder="输入您的原始提示..."
            class="min-h-[200px] w-full text-sm pixel-input"></textarea>
        </div>
      </div>

      <!-- 优化后提示 -->
      <div class="border border-[#2a2a2a] dark:border-[#333333] bg-[#1a1a1a] dark:bg-[#121212] shadow-lg rounded-lg">
        <div class="p-3">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-sm text-green-400 pixel-text-sm">优化后提示</h3>
            <div class="bg-green-900/30 border border-green-500/30 px-2 py-0.5 rounded-md">
              <span class="text-[10px] text-green-300 pixel-text-sm">OUTPUT</span>
            </div>
          </div>
          <div class="min-h-[200px] w-full text-sm pixel-output" :class="{ 'typing': isOptimizing }">
            <div>{{ displayedOutput }}</div>
          </div>

          <div v-if="optimizedPrompt" class="mt-4">
            <div class="text-sm text-green-400">应用的优化要求</div>
            <div class="text-xs bg-[#252525] p-2 rounded-md border border-[#333333] text-green-200 font-mono">
              {{ optimizationRequirements || "应用通用优化规则" }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 优化控制区域 -->
    <div
      class="flex justify-between items-center mb-4 p-3 bg-[#1a1a1a] dark:bg-[#121212] border border-[#2a2a2a] dark:border-[#333333] rounded-lg">
      <div class="flex items-center gap-2 flex-1 max-w-[500px]">
        <span class="text-sm text-purple-300 whitespace-nowrap pixel-text-sm">优化要求:</span>
        <input v-model="optimizationRequirements" placeholder="输入特定的优化要求，不填则应用通用规则..."
          class="text-sm flex-1 bg-[#252525] border-[#333333] text-purple-200 rounded-md p-2" />
      </div>

      <div class="flex gap-2">
        <button @click="handleOptimize" :disabled="!originalPrompt || isOptimizing" class="btn btn-primary btn-icon">
          <span v-if="isOptimizing" class="mr-1">
            <svg class="animate-spin h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
          </span>
          <span v-else class="mr-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5">
              <path d="M15 4V2"></path>
              <path d="M15 22v-2"></path>
              <path d="M8 22v-2"></path>
              <path d="M8 4V2"></path>
              <path d="M2 8h2"></path>
              <path d="M2 15h2"></path>
              <path d="M22 8h-2"></path>
              <path d="M22 15h-2"></path>
              <path d="M16 12h-2a4 4 0 1 1 0-8h2a4 4 0 0 1 0 8z"></path>
              <path d="M8 12h2a4 4 0 1 1 0 8H8a4 4 0 0 1 0-8z"></path>
            </svg>
          </span>
          {{ isOptimizing ? '优化中...' : '优化提示' }}
        </button>

        <button v-if="optimizedPrompt" @click="continueOptimization" class="btn btn-secondary btn-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="h-3.5 w-3.5 mr-1">
            <polyline points="17 1 21 5 17 9"></polyline>
            <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
            <polyline points="7 23 3 19 7 15"></polyline>
            <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
          </svg>
          继续优化
        </button>
      </div>

      <!-- 开始对比按钮 -->
      <button @click="handleCompare" :disabled="!testQuestion || isComparing" class="btn btn-primary btn-icon">
        <span v-if="isComparing" class="mr-1">
          <svg class="animate-spin h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
        </span>
        <span v-else class="mr-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="8 9 12 5 16 9"></polyline>
            <line x1="12" y1="5" x2="12" y2="19"></line>
          </svg>
        </span>
        {{ isComparing ? '对比中...' : '开始对比' }}
      </button>
    </div>

    <!-- 测试区域 -->
    <div v-if="optimizedPrompt"
      class="border border-[#2a2a2a] dark:border-[#333333] bg-[#1a1a1a] dark:bg-[#121212] shadow-lg rounded-lg p-3">
      <div class="flex justify-between items-center mb-3">
        <h3 class="text-purple-400 pixel-text-lg">测试问题</h3>
        <div class="bg-purple-900/30 border border-purple-500/30 px-2 py-0.5 rounded-md">
          <span class="text-[10px] text-purple-300 pixel-text-sm">TEST</span>
        </div>
      </div>

      <div class="mb-4">
        <textarea v-model="testQuestion" placeholder="输入测试问题来比较优化前后的回复效果..."
          class="w-full h-20 text-sm bg-[#252525] border-[#333333] text-purple-200 font-mono resize-none rounded-md p-2"></textarea>
      </div>

      <div class="flex justify-center mb-4">
        <button @click="handleCompare" :disabled="!testQuestion || isComparing"
          class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
          <span v-if="isComparing" class="mr-2">
            <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
          </span>
          <span v-else class="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" width="24" height="24" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="8 9 12 5 16 9"></polyline>
              <line x1="12" y1="5" x2="12" y2="19"></line>
            </svg>
          </span>
          {{ isComparing ? '对比中...' : '开始对比' }}
        </button>
      </div>

      <!-- 对比结果区域 -->
      <div v-if="originalResponse || optimizedResponse" class="grid grid-cols-2 gap-4">
        <!-- 原始提示回复 -->
        <div class="border border-[#333333] rounded-lg p-3">
          <div class="flex justify-between items-center mb-2">
            <h4 class="text-blue-400 pixel-text-sm">原始提示回复</h4>
            <div class="flex items-center gap-1">
              <button @click="setResponseFeedback('original', 'thumbsUp', !originalThumbsUp)" :class="[
                'h-6 w-6 rounded-md flex items-center justify-center',
                originalThumbsUp ? 'bg-blue-900/30 text-blue-400' : 'text-gray-500 hover:text-blue-400'
              ]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path
                    d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3">
                  </path>
                </svg>
              </button>
              <button @click="setResponseFeedback('original', 'thumbsDown', !originalThumbsDown)" :class="[
                'h-6 w-6 rounded-md flex items-center justify-center',
                originalThumbsDown ? 'bg-red-900/30 text-red-400' : 'text-gray-500 hover:text-red-400'
              ]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path
                    d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17">
                  </path>
                </svg>
              </button>
            </div>
          </div>
          <div v-if="isComparing && !originalResponse" class="flex justify-center items-center h-32">
            <svg class="animate-spin h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
          </div>
          <div v-else class="text-sm text-blue-200 whitespace-pre-line bg-[#252525] p-3 rounded-md">{{ originalResponse
            }}</div>

          <div v-if="originalThumbsDown" class="mt-2">
            <textarea v-model="originalFeedback" placeholder="请提供改进建议..."
              class="w-full h-20 resize-none bg-[#1f1f1f] border-[#333333] text-red-200 font-mono p-2 text-sm rounded-md"></textarea>
          </div>
        </div>

        <!-- 优化后提示回复 -->
        <div class="border border-[#333333] rounded-lg p-3">
          <div class="flex justify-between items-center mb-2">
            <h4 class="text-green-400 pixel-text-sm">优化后提示回复</h4>
            <div class="flex items-center gap-1">
              <button @click="setResponseFeedback('optimized', 'thumbsUp', !optimizedThumbsUp)" :class="[
                'h-6 w-6 rounded-md flex items-center justify-center',
                optimizedThumbsUp ? 'bg-green-900/30 text-green-400' : 'text-gray-500 hover:text-green-400'
              ]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path
                    d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3">
                  </path>
                </svg>
              </button>
              <button @click="setResponseFeedback('optimized', 'thumbsDown', !optimizedThumbsDown)" :class="[
                'h-6 w-6 rounded-md flex items-center justify-center',
                optimizedThumbsDown ? 'bg-red-900/30 text-red-400' : 'text-gray-500 hover:text-red-400'
              ]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path
                    d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17">
                  </path>
                </svg>
              </button>
            </div>
          </div>
          <div v-if="isComparing && !optimizedResponse" class="flex justify-center items-center h-32">
            <svg class="animate-spin h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
          </div>
          <div v-else class="text-sm text-green-200 whitespace-pre-line bg-[#252525] p-3 rounded-md">{{
            optimizedResponse }}</div>

          <div v-if="optimizedThumbsDown" class="mt-2">
            <textarea v-model="optimizedFeedback" placeholder="请提供改进建议..."
              class="w-full h-20 resize-none bg-[#1f1f1f] border-[#333333] text-red-200 font-mono p-2 text-sm rounded-md"></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

// 模型和平台选择
const selectedPlatform = ref('openai')
const optimizationModel = ref('gemini')
const responseModel = ref('gpt4')

// 提示词状态
const originalPrompt = ref('')
const optimizedPrompt = ref('')
const optimizationRequirements = ref('')

// 测试状态
const testQuestion = ref('')
const originalResponse = ref('')
const optimizedResponse = ref('')

// 处理状态
const isOptimizing = ref(false)
const isComparing = ref(false)

// 反馈状态
const originalThumbsUp = ref(false)
const originalThumbsDown = ref(false)
const originalFeedback = ref('')
const optimizedThumbsUp = ref(false)
const optimizedThumbsDown = ref(false)
const optimizedFeedback = ref('')

// 用于流式输出的显示文本
const displayedOutput = ref('')

// 处理优化
const handleOptimize = () => {
  isOptimizing.value = true
  displayedOutput.value = ''

  // 模拟优化过程
  setTimeout(() => {
    const result = "已优化的提示：" +
      originalPrompt.value +
      "\n\n" +
      (optimizationRequirements.value || "应用通用优化规则") +
      "\n\n" +
      "1. 更清晰的指令\n2. 更精确的上下文\n3. 更好的格式化"

    optimizedPrompt.value = result

    // 实现流式输出效果
    let currentIndex = 0
    const outputInterval = setInterval(() => {
      if (currentIndex <= result.length) {
        displayedOutput.value = result.slice(0, currentIndex)
        currentIndex++
      } else {
        clearInterval(outputInterval)
        isOptimizing.value = false
      }
    }, 30) // 每30ms输出一个字符
  }, 1000)
}

// 处理对比
const handleCompare = () => {
  if (!testQuestion.value) return

  isComparing.value = true
  originalResponse.value = ''
  optimizedResponse.value = ''

  // 模拟原始响应
  let originalText = "这是使用原始提示生成的回复。可能不够清晰或结构化。"
  let currentIndex = 0

  const originalInterval = setInterval(() => {
    if (currentIndex <= originalText.length) {
      originalResponse.value = originalText.slice(0, currentIndex)
      currentIndex++
    } else {
      clearInterval(originalInterval)

      // 开始优化后的响应
      setTimeout(() => {
        let optimizedText = "这是使用优化后提示生成的回复：\n\n" +
          "1. 更清晰的结构\n" +
          "2. 更精确的回答\n" +
          "3. 更好的格式化\n\n" +
          "希望这个回答对您有所帮助！"

        let optimizedIndex = 0
        const optimizedInterval = setInterval(() => {
          if (optimizedIndex <= optimizedText.length) {
            optimizedResponse.value = optimizedText.slice(0, optimizedIndex)
            optimizedIndex++
          } else {
            clearInterval(optimizedInterval)
            isComparing.value = false
          }
        }, 30)
      }, 500)
    }
  }, 30)
}

// 继续优化
const continueOptimization = () => {
  originalPrompt.value = optimizedPrompt.value
  optimizationRequirements.value = ''
  optimizedPrompt.value = ''
  originalResponse.value = ''
  optimizedResponse.value = ''
}

// 设置响应反馈
const setResponseFeedback = (type: 'original' | 'optimized', feedback: 'thumbsUp' | 'thumbsDown', value: boolean) => {
  if (type === 'original') {
    if (feedback === 'thumbsUp') {
      originalThumbsUp.value = value
      if (value) originalThumbsDown.value = false
    } else {
      originalThumbsDown.value = value
      if (value) originalThumbsUp.value = false
    }
  } else {
    if (feedback === 'thumbsUp') {
      optimizedThumbsUp.value = value
      if (value) optimizedThumbsDown.value = false
    } else {
      optimizedThumbsDown.value = value
      if (value) optimizedThumbsUp.value = false
    }
  }
}
</script>

<style scoped>
/* 特定组件样式 */
.pixel-input,
.pixel-output {
  font-family: 'Share Tech Mono', monospace;
  line-height: 1.6;
  white-space: pre-wrap;
}

.pixel-output {
  transition: all 0.3s ease;
}

.pixel-output.typing {
  border-color: rgba(74, 222, 128, 0.5);
  box-shadow: 0 0 10px rgba(74, 222, 128, 0.2);
}
</style>
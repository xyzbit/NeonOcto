<template>
  <div
    class="h-full flex flex-col p-4 overflow-auto bg-gradient-to-b from-[#151515] to-[#101010] dark:from-[#0d0d0d] dark:to-[#080808]">
    <!-- 添加页面标题 -->
    <div class="flex items-center mb-6">
      <h2 class="text-xl text-purple-400">精细优化</h2>
    </div>

    <!-- 平台和模型选择栏 -->
    <div
      class="flex items-center gap-4 mb-4 p-3 bg-[#1a1a1a] dark:bg-[#121212] border border-[#2a2a2a] dark:border-[#333333]">
      <div class="flex items-center gap-2">
        <span class="text-sm text-purple-300">模拟平台:</span>
        <select v-model="selectedPlatform"
          class="w-[140px] h-8 text-xs bg-[#252525] border-[#333333] text-purple-200 rounded-md">
          <option value="openai">OpenAI</option>
          <option value="anthropic">Anthropic</option>
          <option value="google">Google</option>
        </select>
      </div>

      <div class="flex items-center gap-2">
        <span class="text-sm text-purple-300">优化模型:</span>
        <select v-model="optimizationModel"
          class="w-[140px] h-8 text-xs bg-[#252525] border-[#333333] text-purple-200 rounded-md">
          <option value="gemini">Gemini</option>
          <option value="gpt4">GPT-4</option>
          <option value="claude">Claude</option>
        </select>
      </div>

      <div class="flex items-center gap-2">
        <span class="text-sm text-purple-300">回复模型:</span>
        <select v-model="responseModel"
          class="w-[140px] h-8 text-xs bg-[#252525] border-[#333333] text-purple-200 rounded-md">
          <option value="gpt4">GPT-4</option>
          <option value="gpt35">GPT-3.5</option>
          <option value="claude">Claude</option>
          <option value="gemini">Gemini</option>
        </select>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="grid grid-cols-2 gap-4 flex-1 overflow-hidden">
      <!-- 左侧内容 - System Prompt和测试用例 -->
      <div class="flex flex-col gap-4 overflow-hidden">
        <!-- System Prompt -->
        <div
          class="flex-1 overflow-hidden border border-[#2a2a2a] dark:border-[#333333] bg-[#1a1a1a] dark:bg-[#121212] shadow-lg rounded-lg">
          <div class="p-3 h-full flex flex-col">
            <div class="flex justify-between items-center mb-2">
              <div class="flex items-center gap-2">
                <h3 class="text-sm text-purple-400">System Prompt</h3>
                <select v-model="activeVersion"
                  class="h-7 text-xs w-[120px] bg-[#252525] border-[#333333] text-purple-200 rounded-md">
                  <option v-for="(version, index) in promptVersions" :key="version.id" :value="version.id">
                    版本 {{ index + 1 }}{{ version.active ? ' (当前)' : '' }}
                  </option>
                </select>
              </div>

              <div class="flex gap-2">
                <button @click="createNewVersion" class="btn btn-sm btn-primary btn-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="M12 5v14M5 12h14"></path>
                  </svg>
                  新版本
                </button>
              </div>
            </div>

            <!-- 当前版本标签 -->
            <div class="flex flex-wrap gap-1 mb-2">
              <span v-if="currentPromptVersion?.requirements && currentPromptVersion.requirements !== '初始版本'"
                class="px-2 py-0.5 bg-purple-900/20 text-xs text-purple-300 rounded-md border border-purple-500/30">
                {{ currentPromptVersion.requirements }}
              </span>
            </div>

            <!-- 编辑器 -->
            <div class="flex-1 relative overflow-hidden">
              <textarea v-model="systemPrompt" placeholder="输入系统提示词..."
                class="w-full h-full resize-none pixel-input"></textarea>
            </div>
          </div>
        </div>

        <!-- 测试用例部分 -->
        <div class="border border-[#2a2a2a] dark:border-[#333333] bg-[#1a1a1a] dark:bg-[#121212] shadow-lg rounded-lg">
          <div class="p-3">
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-sm text-blue-400">测试用例</h3>
              <button @click="addTestCase" class="btn btn-sm btn-secondary btn-icon">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" width="24" height="24" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 5v14M5 12h14"></path>
                </svg>
                添加用例
              </button>
            </div>

            <div class="space-y-2 max-h-[300px] overflow-y-auto">
              <div v-for="testCase in testCases" :key="testCase.id"
                class="bg-[#252525] border border-[#333333] rounded-md p-2">
                <div class="flex justify-between items-start mb-1">
                  <span class="text-xs text-blue-300">测试用例 #{{ testCase.id }}</span>
                  <button v-if="testCases.length > 1" @click="removeTestCase(testCase.id)"
                    class="text-red-400 h-5 w-5 flex items-center justify-center hover:bg-red-900/20 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" width="24" height="24" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 6L6 18M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                <textarea v-model="testCase.question" placeholder="输入测试问题..."
                  class="w-full h-20 resize-none pixel-input"
                  @input="updateTestCase(testCase.id, ($event.target as HTMLTextAreaElement).value)"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧内容 - 测试结果 -->
      <div
        class="border border-[#2a2a2a] dark:border-[#333333] bg-[#1a1a1a] dark:bg-[#121212] shadow-lg rounded-lg overflow-hidden flex flex-col">
        <div class="p-3 flex-1 overflow-hidden flex flex-col">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-sm text-green-400">测试结果</h3>
            <button @click="startOptimization" :disabled="isOptimizing || testCases.some(tc => !tc.question)"
              class="btn btn-sm btn-success btn-icon">
              <span v-if="isOptimizing" class="mr-1">
                <svg class="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
              </span>
              <span v-else class="mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" width="24" height="24" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path
                    d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2">
                  </path>
                </svg>
              </span>
              {{ isOptimizing ? '测试中...' : '开始测试' }}
            </button>
          </div>

          <!-- 测试结果内容 -->
          <div class="flex-1 overflow-auto">
            <div v-if="isOptimizing" class="flex items-center justify-center h-full">
              <div class="text-center">
                <svg class="animate-spin h-8 w-8 mx-auto mb-4 text-green-400" xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
                <p class="text-green-300">正在测试系统提示效果...</p>
              </div>
            </div>

            <div v-else-if="filteredResponses.length === 0" class="flex items-center justify-center h-full">
              <div class="text-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-4 text-gray-600" width="24"
                  height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14.7 6.7l1.3-1.3M9 2h6m-3-1v2M3 6v15h18V6"></path>
                </svg>
                <p>请添加测试用例并点击"开始测试"</p>
              </div>
            </div>

            <div v-else class="space-y-4">
              <div v-for="response in filteredResponses" :key="response.id"
                class="bg-[#252525] border border-[#333333] rounded-md p-3">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <span class="text-xs text-green-300">测试用例 #{{ response.testCaseId }}</span>
                    <p class="text-sm text-white mt-1">{{ getTestCaseQuestion(response.testCaseId) }}</p>
                  </div>
                  <div class="flex items-center gap-1">
                    <button @click="setResponseFeedback(response.id, 'thumbsUp', !response.thumbsUp)" :class="[
                      'h-6 w-6 rounded flex items-center justify-center',
                      response.thumbsUp ? 'bg-green-900/30 text-green-400' : 'text-gray-500 hover:text-green-400'
                    ]">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path
                          d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3">
                        </path>
                      </svg>
                    </button>
                    <button @click="setResponseFeedback(response.id, 'thumbsDown', !response.thumbsDown)" :class="[
                      'h-6 w-6 rounded flex items-center justify-center',
                      response.thumbsDown ? 'bg-red-900/30 text-red-400' : 'text-gray-500 hover:text-red-400'
                    ]">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path
                          d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17">
                        </path>
                      </svg>
                    </button>
                  </div>
                </div>

                <div class="mt-2 p-3 bg-[#1f1f1f] rounded-md text-sm text-green-200 whitespace-pre-line pixel-output"
                  :class="{ 'typing': isOptimizing }">
                  <div>{{ response.displayedResponse }}</div>
                </div>

                <div v-if="response.thumbsDown" class="mt-2">
                  <textarea v-model="response.feedback" placeholder="请提供改进建议..."
                    class="w-full h-20 resize-none pixel-input"></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface PromptVersion {
  id: number
  prompt: string
  requirements: string
  active: boolean
}

interface TestCase {
  id: number
  question: string
}

interface Response {
  id: number
  testCaseId: number
  versionId: number
  question: string
  response: string
  displayedResponse: string
  feedback: string
  thumbsUp: boolean
  thumbsDown: boolean
}

// 模型和平台选择
const selectedPlatform = ref('openai')
const optimizationModel = ref('gemini')
const responseModel = ref('gpt4')

// 系统提示词状态
const systemPrompt = ref('')
const promptVersions = ref<PromptVersion[]>([
  { id: 1, prompt: '', requirements: '初始版本', active: true }
])
const activeVersion = ref(1)

// 测试用例
const testCases = ref<TestCase[]>([
  { id: 1, question: '' }
])

// 响应结果
const responses = ref<Response[]>([])
const isOptimizing = ref(false)

// 获取当前活跃的提示词版本
const currentPromptVersion = computed(() => {
  return promptVersions.value.find(v => v.id === activeVersion.value)
})

// 获取当前版本的响应
const filteredResponses = computed(() => {
  return responses.value.filter(r => r.versionId === activeVersion.value)
})

// 添加测试用例
function addTestCase() {
  testCases.value.push({ id: Date.now(), question: '' })
}

// 更新测试用例
function updateTestCase(id: number, question: string) {
  const index = testCases.value.findIndex(tc => tc.id === id)
  if (index !== -1) {
    testCases.value[index].question = question
  }
}

// 删除测试用例
function removeTestCase(id: number) {
  testCases.value = testCases.value.filter(tc => tc.id !== id)
}

// 获取测试用例问题
function getTestCaseQuestion(id: number) {
  const testCase = testCases.value.find(tc => tc.id === id)
  return testCase?.question || ''
}

// 开始优化测试
function startOptimization() {
  isOptimizing.value = true

  // 更新当前版本的提示词
  const versionIndex = promptVersions.value.findIndex(v => v.id === activeVersion.value)
  if (versionIndex !== -1) {
    promptVersions.value[versionIndex].prompt = systemPrompt.value
  }

  // 模拟优化过程
  setTimeout(() => {
    const newResponses = testCases.value.map(tc => {
      const responseText = `这是对测试用例 "${tc.question.substring(0, 20)}${tc.question.length > 20 ? '...' : ''}" 的回复。\n\n这是版本 ${activeVersion.value} 的系统提示生成的回复。`

      return {
        id: Date.now() + tc.id,
        testCaseId: tc.id,
        versionId: activeVersion.value,
        question: tc.question,
        response: responseText,
        displayedResponse: '',
        feedback: '',
        thumbsUp: false,
        thumbsDown: false
      }
    })

    responses.value = [...responses.value, ...newResponses]

    // 为每个新响应实现流式输出
    newResponses.forEach(response => {
      let currentIndex = 0
      const outputInterval = setInterval(() => {
        const targetResponse = responses.value.find(r => r.id === response.id)
        if (targetResponse && currentIndex <= response.response.length) {
          targetResponse.displayedResponse = response.response.slice(0, currentIndex)
          currentIndex++
        } else {
          clearInterval(outputInterval)
        }
      }, 30)
    })

    isOptimizing.value = false
  }, 1000)
}

// 设置响应反馈
function setResponseFeedback(responseId: number, type: 'thumbsUp' | 'thumbsDown' | 'feedback', value: boolean | string) {
  const index = responses.value.findIndex(r => r.id === responseId)
  if (index !== -1) {
    if (type === 'thumbsUp') {
      responses.value[index].thumbsUp = value as boolean
      if (value) {
        responses.value[index].thumbsDown = false
      }
    } else if (type === 'thumbsDown') {
      responses.value[index].thumbsDown = value as boolean
      if (value) {
        responses.value[index].thumbsUp = false
      }
    } else if (type === 'feedback') {
      responses.value[index].feedback = value as string
    }
  }
}

// 创建新版本
function createNewVersion() {
  const hasFeedback = responses.value.some(r =>
    r.versionId === activeVersion.value && (r.thumbsDown || r.feedback)
  )

  if (!hasFeedback) return

  const newVersionId = Date.now()
  const currentPrompt = promptVersions.value.find(v => v.id === activeVersion.value)?.prompt || systemPrompt.value

  // 收集反馈作为优化要求
  const requirements = responses.value
    .filter(r => r.versionId === activeVersion.value && (r.thumbsDown || r.feedback))
    .map(r => r.feedback || '改进回复质量')
    .join('\n')

  // 更新所有版本为非活跃
  promptVersions.value = promptVersions.value.map(v => ({ ...v, active: false }))

  // 添加新版本
  promptVersions.value.push({
    id: newVersionId,
    prompt: currentPrompt + '\n\n// 基于反馈优化:\n' + requirements,
    requirements: requirements,
    active: true
  })

  activeVersion.value = newVersionId
}

// 当版本变化时，更新编辑器内容
watch(activeVersion, (newVersion) => {
  const version = promptVersions.value.find(v => v.id === newVersion)
  if (version) {
    systemPrompt.value = version.prompt
  }
})
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
<template>
  <div
    class="h-full flex flex-col p-4 overflow-auto bg-gradient-to-b from-[#151515] to-[#101010] dark:from-[#0d0d0d] dark:to-[#080808]">
    <div class="flex items-center mb-6">
      <h2 class="text-xl text-purple-400">系统设置</h2>
    </div>

    <!-- 选项卡 -->
    <div class="flex-1">
      <div class="border-b border-[#2a2a2a] mb-4">
        <div class="flex bg-transparent">
          <button @click="activeTab = 'model-service'" :class="[
            'py-2 px-4 border-0 text-gray-400',
            activeTab === 'model-service' ? 'bg-[#252525] text-purple-400 border-b-2 border-purple-500' : ''
          ]">
            模型服务
          </button>
          <button @click="activeTab = 'data-settings'" :class="[
            'py-2 px-4 border-0 text-gray-400',
            activeTab === 'data-settings' ? 'bg-[#252525] text-purple-400 border-b-2 border-purple-500' : ''
          ]">
            数据设置
          </button>
        </div>
      </div>

      <!-- 模型服务内容 -->
      <div v-if="activeTab === 'model-service'" class="space-y-4">
        <div class="grid grid-cols-3 gap-4 h-full">
          <!-- 左侧菜单 -->
          <div class="col-span-1 border-r border-[#2a2a2a] pr-4">
            <div class="relative mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-2.5 h-4 w-4 text-gray-500" width="24"
                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input placeholder="搜索模型平台..."
                class="pl-10 w-full bg-[#252525] border-[#333333] text-gray-300 rounded-md p-2" />
            </div>

            <div class="space-y-1">
              <button
                class="w-full justify-start px-2 py-6 bg-[#252525] hover:bg-[#303030] text-white rounded-none border-l-4 border-blue-500 flex">
                <div class="flex items-center">
                  <div
                    class="w-8 h-8 mr-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" width="24" height="24"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round">
                      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
                    </svg>
                  </div>
                  <span>火山引擎</span>
                </div>
              </button>
            </div>
          </div>

          <!-- 右侧内容 -->
          <div class="col-span-2 pl-4">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg text-blue-400">火山引擎</h3>
              <button
                class="border border-blue-700 text-blue-300 hover:bg-blue-900/20 px-3 py-1 rounded-md flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" width="24" height="24" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                打开
              </button>
            </div>

            <!-- API 密钥设置 -->
            <div
              class="border border-[#2a2a2a] dark:border-[#333333] bg-[#1a1a1a] dark:bg-[#121212] shadow-lg rounded-lg p-4">
              <div class="space-y-4">
                <div class="space-y-2">
                  <label for="api-key" class="text-sm text-blue-300 block">
                    API 密钥
                  </label>
                  <div class="relative">
                    <input id="api-key" :type="showApiKey ? 'text' : 'password'" v-model="apiKey" placeholder="API 密钥"
                      class="w-full pr-10 bg-[#252525] border-[#333333] text-blue-200 font-mono rounded-md p-2" />
                    <button class="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400"
                      @click="showApiKey = !showApiKey">
                      <svg v-if="showApiKey" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path
                          d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24">
                        </path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </button>
                  </div>
                  <p class="text-xs text-blue-300/70">
                    <button class="p-0 h-auto text-xs text-blue-400">
                      点击这里获取密钥
                    </button>
                    <span class="ml-2">多个密钥使用逗号分隔</span>
                  </p>
                </div>

                <div class="space-y-2">
                  <label for="api-url" class="text-sm text-blue-300 block">
                    API 地址
                  </label>
                  <input id="api-url" v-model="apiUrl" placeholder="API 地址"
                    class="w-full bg-[#252525] border-[#333333] text-blue-200 font-mono rounded-md p-2" />
                  <p class="text-xs text-gray-400">https://ark.cn-beijing.volces.com/api/v3/chat/completions</p>
                </div>

                <!-- 模型列表 -->
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <label class="text-sm text-blue-300">模型列表</label>
                    <button @click="showAddModelDialog = true" class="h-6 w-6 text-blue-400 hover:text-blue-300">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </button>
                  </div>

                  <draggable v-model="modelList" :animation="150" ghost-class="ghost" class="space-y-2" item-key="id">
                    <template #item="{ element }">
                      <div class="flex items-center justify-between p-2 border border-[#333] bg-[#1f1f1f] cursor-move"
                        :class="{ 'border-blue-500': element.id === selectedModel }">
                        <div class="flex-1" @click="editModel(element)">
                          <div class="flex items-center">
                            <div class="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center mr-3">
                              <span class="text-xs text-white font-bold">DS</span>
                            </div>
                            <div class="flex items-center">
                              <span class="text-blue-200">{{ element.name }}</span>
                              <span v-if="element.description" class="text-sm text-gray-400 ml-2">({{
                                element.description }})</span>
                            </div>
                          </div>
                        </div>
                        <div class="flex items-center gap-2">
                          <button @click.stop="removeModel(element.id)" class="h-6 w-6 text-red-400 hover:text-red-300">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </template>
                  </draggable>
                </div>
              </div>
            </div>

            <!-- 保存按钮 -->
            <div class="flex justify-end">
              <button @click="saveModelSettings"
                class="bg-blue-900 hover:bg-blue-800 text-blue-100 border border-blue-700 px-3 py-2 rounded-md flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" width="24" height="24" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                保存设置
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 数据设置内容 -->
      <div v-if="activeTab === 'data-settings'" class="space-y-4">
        <div
          class="border border-[#2a2a2a] dark:border-[#333333] bg-[#1a1a1a] dark:bg-[#121212] shadow-lg rounded-lg p-4">
          <h3 class="text-lg text-blue-400 mb-4">数据设置</h3>

          <div class="space-y-4">
            <div class="space-y-2">
              <label class="text-sm text-blue-300 block">数据存储位置</label>
              <div class="flex">
                <input v-model="dataStoragePath" placeholder="选择数据存储位置..."
                  class="flex-1 bg-[#252525] border-[#333333] text-blue-200 rounded-l-md p-2" readonly />
                <button class="bg-blue-900 text-blue-100 px-3 py-2 rounded-r-md">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-sm text-blue-300 block">自动备份</label>
              <div class="flex items-center">
                <input type="checkbox" id="auto-backup" v-model="autoBackup"
                  class="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600" />
                <label for="auto-backup" class="text-sm text-blue-200">启用自动备份</label>
              </div>

              <div v-if="autoBackup" class="pl-6 mt-2 space-y-2">
                <div>
                  <label class="text-sm text-blue-300 block">备份频率</label>
                  <select v-model="backupFrequency"
                    class="w-full mt-1 bg-[#252525] border-[#333333] text-blue-200 rounded-md p-2">
                    <option value="daily">每天</option>
                    <option value="weekly">每周</option>
                    <option value="monthly">每月</option>
                  </select>
                </div>

                <div>
                  <label class="text-sm text-blue-300 block">保留备份数</label>
                  <input type="number" v-model="backupRetention" min="1" max="30"
                    class="w-full mt-1 bg-[#252525] border-[#333333] text-blue-200 rounded-md p-2" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 保存按钮 -->
        <div class="flex justify-end">
          <button
            class="bg-blue-900 hover:bg-blue-800 text-blue-100 border border-blue-700 px-3 py-2 rounded-md flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" width="24" height="24" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
            保存设置
          </button>
        </div>
      </div>
    </div>

    <!-- 添加模型对话框 -->
    <div v-if="showAddModelDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-[#1a1a1a] p-4 rounded-lg w-96">
        <h3 class="text-lg text-blue-400 mb-4">添加新模型</h3>
        <div class="space-y-4">
          <div>
            <label class="text-sm text-blue-300 block mb-2">模型 ID</label>
            <input v-model="newModelId" class="w-full bg-[#252525] border-[#333333] text-blue-200 rounded-md p-2"
              placeholder="输入模型 ID" />
          </div>
          <div>
            <label class="text-sm text-blue-300 block mb-2">模型名称</label>
            <input v-model="newModelName" class="w-full bg-[#252525] border-[#333333] text-blue-200 rounded-md p-2"
              placeholder="输入模型名称" />
          </div>
          <div>
            <label class="text-sm text-blue-300 block mb-2">模型描述 (选填)</label>
            <textarea v-model="newModelDescription" rows="3"
              class="w-full bg-[#252525] border-[#333333] text-blue-200 rounded-md p-2" placeholder="输入模型描述"></textarea>
          </div>
          <div class="flex justify-end space-x-2">
            <button @click="showAddModelDialog = false" class="px-4 py-2 text-gray-400 hover:text-gray-300">
              取消
            </button>
            <button @click="addNewModel" class="px-4 py-2 bg-blue-900 text-blue-100 rounded-md hover:bg-blue-800">
              添加
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 编辑模型对话框 -->
    <div v-if="showEditModelDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-[#1a1a1a] p-4 rounded-lg w-96">
        <h3 class="text-lg text-blue-400 mb-4">编辑模型</h3>
        <div class="space-y-4">
          <div>
            <label class="text-sm text-blue-300 block mb-2">模型 ID</label>
            <input :value="editingModel?.id" class="w-full bg-[#252525] border-[#333333] text-gray-500 rounded-md p-2"
              readonly />
          </div>
          <div>
            <label class="text-sm text-blue-300 block mb-2">模型名称</label>
            <input v-model="editingModel!.name"
              class="w-full bg-[#252525] border-[#333333] text-blue-200 rounded-md p-2" placeholder="输入模型名称" />
          </div>
          <div>
            <label class="text-sm text-blue-300 block mb-2">模型描述 (选填)</label>
            <textarea v-model="editingModel!.description" rows="3"
              class="w-full bg-[#252525] border-[#333333] text-blue-200 rounded-md p-2" placeholder="输入模型描述"></textarea>
          </div>
          <div class="flex justify-end space-x-2">
            <button @click="showEditModelDialog = false" class="px-4 py-2 text-gray-400 hover:text-gray-300">
              取消
            </button>
            <button @click="saveModelEdit" class="px-4 py-2 bg-blue-900 text-blue-100 rounded-md hover:bg-blue-800">
              保存
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useModelSettingsStore } from '../stores/modelSettings'
import { storeToRefs } from 'pinia'
import draggable from 'vuedraggable'

// 选项卡状态
const activeTab = ref('model-service')

// 存储服务
const modelSettingsStore = useModelSettingsStore()
const { platforms } = storeToRefs(modelSettingsStore)

// 计算属性获取当前平台配置
const currentPlatformConfig = computed(() => platforms.value.volcengine)

// 模型服务设置
const apiKey = ref('')
const apiUrl = ref('')
const showApiKey = ref(false)
const selectedModel = ref('')

// 新增模型相关
const showAddModelDialog = ref(false)
const newModelId = ref('')
const newModelName = ref('')
const newModelDescription = ref('')

// 编辑模型相关
const showEditModelDialog = ref(false)
const editingModel = ref<{ id: string, name: string, description?: string } | null>(null)

// 数据设置
const dataStoragePath = ref('/Users/data/neonocto')
const autoBackup = ref(true)
const backupFrequency = ref('weekly')
const backupRetention = ref(5)

// 计算属性：用于拖拽排序
const modelList = computed({
  get: () => currentPlatformConfig.value?.models || [],
  set: (value) => {
    if (currentPlatformConfig.value) {
      modelSettingsStore.updatePlatformConfig('volcengine', {
        ...currentPlatformConfig.value,
        models: value
      })
    }
  }
})

// 初始化数据
onMounted(async () => {
  await modelSettingsStore.initFromIndexDB()
  apiKey.value = currentPlatformConfig.value?.apiKey || ''
  apiUrl.value = currentPlatformConfig.value?.baseUrl || ''
  selectedModel.value = currentPlatformConfig.value?.models[0]?.id || ''
})

// 监听配置变化
watch(currentPlatformConfig, (newConfig) => {
  if (newConfig) {
    apiKey.value = newConfig.apiKey
    apiUrl.value = newConfig.baseUrl
  }
}, { deep: true })

// 保存设置
const saveModelSettings = async () => {
  await modelSettingsStore.updatePlatformConfig('volcengine', {
    apiKey: apiKey.value,
    baseUrl: apiUrl.value,
    models: currentPlatformConfig.value?.models || []
  })
}

// 编辑模型
const editModel = (model: { id: string, name: string, description?: string }) => {
  editingModel.value = { ...model }
  showEditModelDialog.value = true
}

// 保存模型编辑
const saveModelEdit = async () => {
  if (editingModel.value) {
    await modelSettingsStore.updateModel('volcengine', editingModel.value.id, {
      name: editingModel.value.name,
      description: editingModel.value.description
    })
    showEditModelDialog.value = false
    editingModel.value = null
  }
}

// 添加新模型
const addNewModel = async () => {
  if (newModelId.value && newModelName.value) {
    await modelSettingsStore.addModel('volcengine', {
      id: newModelId.value,
      name: newModelName.value,
      description: newModelDescription.value
    })
    newModelId.value = ''
    newModelName.value = ''
    newModelDescription.value = ''
    showAddModelDialog.value = false
  }
}

// 删除模型
const removeModel = async (modelId: string) => {
  await modelSettingsStore.removeModel('volcengine', modelId)
}
</script>

<style scoped>
.ghost {
  opacity: 0.5;
  background: #252525;
}

.cursor-move {
  cursor: move;
}
</style>
<template>
  <div class="h-full flex flex-col p-4 overflow-auto bg-gradient-to-b from-[#151515] to-[#101010] dark:from-[#0d0d0d] dark:to-[#080808]">
    <div class="flex items-center mb-6">
      <h2 class="text-xl text-purple-400">系统设置</h2>
    </div>

    <!-- 选项卡 -->
    <div class="flex-1">
      <div class="border-b border-[#2a2a2a] mb-4">
        <div class="flex bg-transparent">
          <button 
            @click="activeTab = 'model-service'" 
            :class="[
              'py-2 px-4 border-0 text-gray-400',
              activeTab === 'model-service' ? 'bg-[#252525] text-purple-400 border-b-2 border-purple-500' : ''
            ]"
          >
            模型服务
          </button>
          <button 
            @click="activeTab = 'data-settings'" 
            :class="[
              'py-2 px-4 border-0 text-gray-400',
              activeTab === 'data-settings' ? 'bg-[#252525] text-purple-400 border-b-2 border-purple-500' : ''
            ]"
          >
            数据设置
          </button>
        </div>
      </div>

      <!-- 模型服务内容 -->
      <div v-if="activeTab === 'model-service'" class="mt-0 space-y-4">
        <div class="grid grid-cols-3 gap-4 h-full">
          <!-- 左侧菜单 -->
          <div class="col-span-1 border-r border-[#2a2a2a] pr-4">
            <div class="relative mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-2.5 h-4 w-4 text-gray-500" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                placeholder="搜索模型平台..."
                class="pl-10 w-full bg-[#252525] border-[#333333] text-gray-300 rounded-md p-2"
              />
            </div>

            <div class="space-y-1">
              <button
                class="w-full justify-start px-2 py-6 bg-[#252525] hover:bg-[#303030] text-white rounded-none border-l-4 border-blue-500 flex"
              >
                <div class="flex items-center">
                  <div class="w-8 h-8 mr-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
              <button class="border border-blue-700 text-blue-300 hover:bg-blue-900/20 px-3 py-1 rounded-md flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                打开
              </button>
            </div>

            <!-- API 密钥设置 -->
            <div class="border border-[#2a2a2a] dark:border-[#333333] bg-[#1a1a1a] dark:bg-[#121212] shadow-lg rounded-lg mb-6">
              <div class="p-4 space-y-4">
                <div class="space-y-2">
                  <label for="api-key" class="text-sm text-blue-300 block">
                    API 密钥
                  </label>
                  <div class="relative">
                    <input
                      id="api-key"
                      :type="showApiKey ? 'text' : 'password'"
                      v-model="apiKey"
                      placeholder="API 密钥"
                      class="w-full pr-10 bg-[#252525] border-[#333333] text-blue-200 font-mono rounded-md p-2"
                    />
                    <button
                      class="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400"
                      @click="showApiKey = !showApiKey"
                    >
                      <svg v-if="showApiKey" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                  <input
                    id="api-url"
                    v-model="apiUrl"
                    placeholder="API 地址"
                    class="w-full bg-[#252525] border-[#333333] text-blue-200 font-mono rounded-md p-2"
                  />
                  <p class="text-xs text-gray-400">https://ark.cn-beijing.volces.com/api/v3/chat/completions</p>
                </div>

                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <label class="text-sm text-blue-300">模型</label>
                    <button class="h-6 w-6 text-blue-400">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                    </button>
                  </div>

                  <div class="space-y-2">
                    <div class="p-2 border border-[#333] bg-[#252525]">
                      <div class="flex items-center justify-between">
                        <div class="flex items-center">
                          <div class="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center mr-3">
                            <span class="text-xs text-white font-bold">DS</span>
                          </div>
                          <span class="text-blue-200">DeepSeek</span>
                        </div>
                        <button class="h-6 w-6 p-0">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 9L12 15L18 9"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div class="space-y-1 pl-4">
                      <div
                        v-for="model in ['DeepSeek-R1', 'DeepSeek-R1-Distill-Qwen-32B', 'DeepSeek-R1-Distill-Qwen-7B', 'DeepSeek-V3']"
                        :key="model"
                        class="flex items-center justify-between p-2 border border-[#333] bg-[#1f1f1f]"
                        :class="{ 'border-blue-500': model === selectedModel }"
                        @click="selectedModel = model"
                      >
                        <div class="flex items-center">
                          <div class="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center mr-3">
                            <span class="text-xs text-white font-bold">DS</span>
                          </div>
                          <span class="text-blue-200">{{ model }}</span>
                        </div>
                        <div class="flex items-center gap-2">
                          <button class="h-6 w-6 text-blue-400">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 保存按钮 -->
            <div class="flex justify-end">
              <button class="bg-blue-900 hover:bg-blue-800 text-blue-100 border border-blue-700 px-3 py-2 rounded-md flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
      <div v-if="activeTab === 'data-settings'" class="mt-0 space-y-4">
        <div class="border border-[#2a2a2a] dark:border-[#333333] bg-[#1a1a1a] dark:bg-[#121212] shadow-lg rounded-lg p-4">
          <h3 class="text-lg text-blue-400 mb-4">数据设置</h3>
          
          <div class="space-y-4">
            <div class="space-y-2">
              <label class="text-sm text-blue-300 block">数据存储位置</label>
              <div class="flex">
                <input
                  v-model="dataStoragePath"
                  placeholder="选择数据存储位置..."
                  class="flex-1 bg-[#252525] border-[#333333] text-blue-200 rounded-l-md p-2"
                  readonly
                />
                <button class="bg-blue-900 text-blue-100 px-3 py-2 rounded-r-md">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            <div class="space-y-2">
              <label class="text-sm text-blue-300 block">自动备份</label>
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="auto-backup"
                  v-model="autoBackup"
                  class="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600"
                />
                <label for="auto-backup" class="text-sm text-blue-200">启用自动备份</label>
              </div>
              
              <div v-if="autoBackup" class="pl-6 mt-2 space-y-2">
                <div>
                  <label class="text-sm text-blue-300 block">备份频率</label>
                  <select v-model="backupFrequency" class="w-full mt-1 bg-[#252525] border-[#333333] text-blue-200 rounded-md p-2">
                    <option value="daily">每天</option>
                    <option value="weekly">每周</option>
                    <option value="monthly">每月</option>
                  </select>
                </div>
                
                <div>
                  <label class="text-sm text-blue-300 block">保留备份数</label>
                  <input
                    type="number"
                    v-model="backupRetention"
                    min="1"
                    max="30"
                    class="w-full mt-1 bg-[#252525] border-[#333333] text-blue-200 rounded-md p-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 保存按钮 -->
        <div class="flex justify-end">
          <button class="bg-blue-900 hover:bg-blue-800 text-blue-100 border border-blue-700 px-3 py-2 rounded-md flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 选项卡状态
const activeTab = ref('model-service')

// 模型服务设置
const apiKey = ref('')
const apiUrl = ref('https://ark.cn-beijing.volces.com/api/v3/')
const showApiKey = ref(false)
const selectedModel = ref('DeepSeek-R1')

// 数据设置
const dataStoragePath = ref('/Users/data/neonocto')
const autoBackup = ref(true)
const backupFrequency = ref('weekly')
const backupRetention = ref(5)
</script>

<style scoped>
/* 特定组件样式 */
</style> 
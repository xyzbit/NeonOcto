<template>
  <div
    class="relative font-mono text-sm bg-[#1E1E1E] rounded-lg overflow-hidden border border-[#2a2a2a]/30 dark:border-[#333333]/30 shadow-xl backdrop-blur-lg">
    <!-- 编辑器头部 -->
    <div
      class="editor-header flex items-center px-3 py-2 bg-[#252525]/80 backdrop-blur-md border-b border-[#333333]/30">
      <div class="flex space-x-2">
        <div class="mac-btn red"></div>
        <div class="mac-btn yellow"></div>
        <div class="mac-btn green"></div>
      </div>
      <div class="mx-auto text-xs text-gray-400 font-mono">prompt.md</div>
    </div>

    <!-- 编辑器内容 -->
    <div class="code-editor-container">
      <div v-for="(line, index) in lines" :key="index" class="flex hover:bg-[#2A2A2A]/40 transition-colors">
        <div class="text-gray-500 py-1 px-2 text-right min-w-[40px] select-none bg-[#252525]/50">{{ index + 1 }}</div>
        <div class="py-1 px-2 flex-grow text-gray-200" contenteditable="true" @input="updateContent($event, index)"
          @keydown="handleKeydown($event, index)" :data-placeholder="!line ? '输入提示词...' : ''">{{ line }}</div>
      </div>
    </div>

    <!-- 编辑器状态栏 -->
    <div
      class="editor-footer flex items-center justify-between px-3 py-1 bg-[#252525]/80 backdrop-blur-md border-t border-[#333333]/30 text-xs text-gray-500">
      <div class="flex items-center">
        <span class="mr-4 text-purple-400">
          <span class="pixel-dot mr-1"></span>
          已保存
        </span>
        <span>{{ lines.length }}行</span>
      </div>
      <div>Markdown</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

const props = defineProps<{
  modelValue: string;
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>()

const lines = ref<string[]>([''])

// 根据传入的modelValue初始化行
onMounted(() => {
  if (props.modelValue) {
    lines.value = props.modelValue.split('\n')
    if (lines.value.length === 0) {
      lines.value = ['']
    }
  }
})

// 监听modelValue的变化
watch(() => props.modelValue, (newValue) => {
  if (newValue !== getContent()) {
    lines.value = newValue.split('\n')
    if (lines.value.length === 0) {
      lines.value = ['']
    }
  }
})

// 获取当前内容
function getContent() {
  return lines.value.join('\n')
}

// 更新内容
function updateContent(event: Event, lineIndex: number) {
  const target = event.target as HTMLElement
  lines.value[lineIndex] = target.innerText
  emit('update:modelValue', getContent())
}

// 处理键盘事件
function handleKeydown(event: KeyboardEvent, lineIndex: number) {
  // 处理Enter键，创建新行
  if (event.key === 'Enter') {
    event.preventDefault()
    const target = event.target as HTMLElement
    const currentLineContent = target.innerText
    const cursorPosition = window.getSelection()?.anchorOffset || 0

    // 分割当前行
    const contentBeforeCursor = currentLineContent.substring(0, cursorPosition)
    const contentAfterCursor = currentLineContent.substring(cursorPosition)

    // 更新当前行和创建新行
    lines.value[lineIndex] = contentBeforeCursor
    lines.value.splice(lineIndex + 1, 0, contentAfterCursor)

    emit('update:modelValue', getContent())

    // 焦点设置到新行（这需要在DOM更新后进行）
    setTimeout(() => {
      const newLineElement = event.target?.parentElement?.nextElementSibling?.lastElementChild as HTMLElement
      if (newLineElement) {
        newLineElement.focus()
        // 将光标放在开头
        const range = document.createRange()
        const selection = window.getSelection()
        range.setStart(newLineElement, 0)
        range.collapse(true)
        selection?.removeAllRanges()
        selection?.addRange(range)
      }
    }, 0)
  }
}
</script>

<style scoped>
.code-editor-container {
  max-height: 400px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #444 #1E1E1E;
}

.code-editor-container::-webkit-scrollbar {
  width: 8px;
}

.code-editor-container::-webkit-scrollbar-track {
  background: #1E1E1E;
}

.code-editor-container::-webkit-scrollbar-thumb {
  background-color: #444;
  border-radius: 4px;
}

[contenteditable] {
  outline: none;
  white-space: pre-wrap;
  position: relative;
}

[contenteditable]:empty::before {
  content: attr(data-placeholder);
  color: #555;
  position: absolute;
  pointer-events: none;
}

.mac-btn {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.mac-btn.red {
  background-color: #FF5F56;
}

.mac-btn.yellow {
  background-color: #FFBD2E;
}

.mac-btn.green {
  background-color: #27C93F;
}

.pixel-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: #805AD5;
  box-shadow: 0 0 3px #805AD5;
}
</style>
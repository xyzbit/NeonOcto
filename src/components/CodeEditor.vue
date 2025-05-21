<template>
  <div class="code-editor-container border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-sm">
    <div v-for="(line, index) in lines" :key="index" class="flex">
      <div class="text-gray-400 p-1 text-right w-8 select-none bg-gray-50 dark:bg-gray-800">{{ index + 1 }}</div>
      <div class="p-1 flex-grow" contenteditable="true" @input="updateContent($event, index)" @keydown="handleKeydown($event, index)">{{ line }}</div>
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
  max-height: 500px;
  overflow-y: auto;
}

[contenteditable] {
  outline: none;
  white-space: pre-wrap;
}
</style> 
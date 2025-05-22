<template>
    <div class="pixel-io">
        <div class="input-section">
            <div class="input-cursor">
                <input v-model="inputText" class="pixel-input input-glow" :placeholder="placeholder"
                    @keyup.enter="handleInput" />
            </div>
        </div>

        <div v-if="output" class="output-box">
            <div class="typewriter" v-html="formattedOutput"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import '../assets/io-effects.css'

defineProps<{
    placeholder?: string
}>()

const emit = defineEmits<{
    (e: 'input', value: string): void
}>()

const inputText = ref('')
const output = ref('')

// 处理输入
const handleInput = () => {
    if (!inputText.value.trim()) return
    emit('input', inputText.value)
    inputText.value = ''
}

// 格式化输出内容
const formattedOutput = computed(() => {
    return output.value.replace(/\n/g, '<br>')
})

// 打字机效果方法
const typeWriter = (text: string, delay = 30) => {
    output.value = ''
    let i = 0
    const timer = setInterval(() => {
        if (i < text.length) {
            output.value += text.charAt(i)
            i++
        } else {
            clearInterval(timer)
        }
    }, delay)
}

// 暴露方法给父组件
defineExpose({
    typeWriter
})
</script>

<style scoped>
.pixel-io {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
}

.input-section {
    margin-bottom: 16px;
}
</style>
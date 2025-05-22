import { createApp } from 'vue'
import type { Directive, DirectiveBinding as VueDirectiveBinding } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// 先导入全局样式
import './style.css'
// 再导入像素风格样式
import './assets/pixel-style.css'

// 添加字体样式
const fontStyles = document.createElement('link')
fontStyles.rel = 'stylesheet'
fontStyles.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&family=Share+Tech+Mono&display=swap'
document.head.appendChild(fontStyles)

// 添加字体预加载
const fontPreload = document.createElement('link')
fontPreload.rel = 'preload'
fontPreload.as = 'style'
fontPreload.href = fontStyles.href
document.head.appendChild(fontPreload)

// 扩展HTMLElement类型
interface TooltipElement extends HTMLElement {
    _tooltip?: HTMLElement;
    _showTooltip?: () => void;
    _hideTooltip?: () => void;
}

const app = createApp(App)

// 添加自定义tooltip指令
app.directive('tooltip', {
    mounted(el: TooltipElement, binding: VueDirectiveBinding) {
        // 创建tooltip元素
        const tooltip = document.createElement('div')
        tooltip.className = 'opacity-0 bg-[#121212]/90 border border-purple-500/50 text-white px-3 py-1 absolute z-50 pointer-events-none transition-opacity duration-200 pixel-text-sm'
        tooltip.textContent = binding.value
        tooltip.style.whiteSpace = 'nowrap'
        // 添加像素风格边框
        tooltip.style.boxShadow = '0 0 5px #805AD5'
        document.body.appendChild(tooltip)

        // 显示tooltip
        const showTooltip = () => {
            const rect = el.getBoundingClientRect()
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 8}px`
            tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`
            tooltip.classList.remove('opacity-0')
            tooltip.classList.add('opacity-100')
        }

        // 隐藏tooltip
        const hideTooltip = () => {
            tooltip.classList.remove('opacity-100')
            tooltip.classList.add('opacity-0')
        }

        // 添加事件监听
        el.addEventListener('mouseenter', showTooltip)
        el.addEventListener('mouseleave', hideTooltip)

        // 保存引用以便清理
        el._tooltip = tooltip
        el._showTooltip = showTooltip
        el._hideTooltip = hideTooltip
    },
    beforeUnmount(el: TooltipElement) {
        // 移除事件监听
        if (el._showTooltip) {
            el.removeEventListener('mouseenter', el._showTooltip)
        }
        if (el._hideTooltip) {
            el.removeEventListener('mouseleave', el._hideTooltip)
        }

        // 移除tooltip元素
        if (el._tooltip) {
            document.body.removeChild(el._tooltip)
        }
    }
})

app.use(createPinia())
app.use(router)

app.mount('#app')

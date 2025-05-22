import { defineStore } from 'pinia'
import { ref } from 'vue'

interface ModelInfo {
    id: string
    name: string
    description?: string
}

interface PlatformConfig {
    apiKey: string
    baseUrl: string
    models: ModelInfo[]
}

interface ModelSettings {
    platforms: {
        [key: string]: PlatformConfig
    }
}

interface StorageData {
    platforms: {
        [key: string]: {
            apiKey: string
            baseUrl: string
            models: Array<{
                id: string
                name: string
                description?: string
            }>
        }
    }
}

const defaultVolcengineConfig: PlatformConfig = {
    apiKey: '',
    baseUrl: 'https://ark.cn-beijing.volces.com/api/v3/',
    models: [
        { id: 'deepseek-v3-250324', name: 'DeepSeek-V3', description: '最新的 DeepSeek V3 模型' },
        { id: 'deepseek-r1-250120', name: 'DeepSeek-R1', description: 'DeepSeek R1 基础模型' },
        { id: 'doubao-1-5-thinking-pro-250415', name: 'Doubao-1-5-thinking-pro', description: '豆包思考专业版' },
        { id: 'doubao-1.5-vision-pro-250328', name: 'doubao-1.5-vision-pro', description: '豆包视觉专业版' }
    ]
}

function toStorageData(data: ModelSettings): StorageData {
    const result: StorageData = { platforms: {} }

    for (const [key, platform] of Object.entries(data.platforms)) {
        result.platforms[key] = {
            apiKey: platform.apiKey || '',
            baseUrl: platform.baseUrl || '',
            models: platform.models.map(model => ({
                id: model.id,
                name: model.name,
                description: model.description
            }))
        }
    }

    return result
}

function fromStorageData(data: StorageData): ModelSettings {
    const result: ModelSettings = { platforms: {} }

    for (const [key, platform] of Object.entries(data.platforms)) {
        result.platforms[key] = {
            apiKey: platform.apiKey || '',
            baseUrl: platform.baseUrl || '',
            models: platform.models.map(model => ({
                id: model.id,
                name: model.name,
                description: model.description
            }))
        }
    }

    return result
}

export const useModelSettingsStore = defineStore('modelSettings', () => {
    const platforms = ref<ModelSettings['platforms']>({
        volcengine: { ...defaultVolcengineConfig }
    })

    async function initFromIndexDB() {
        try {
            const db = await openDB()
            const transaction = db.transaction(['modelSettings'], 'readonly')
            const store = transaction.objectStore('modelSettings')

            return new Promise((resolve) => {
                const request = store.get('settings')

                request.onsuccess = () => {
                    const data = request.result
                    if (data) {
                        try {
                            const parsedData = fromStorageData(data)
                            platforms.value = {
                                volcengine: {
                                    ...defaultVolcengineConfig,
                                    ...parsedData.platforms.volcengine
                                }
                            }
                        } catch (e) {
                            console.error('Error parsing data from IndexDB:', e)
                        }
                    }
                    resolve(platforms.value)
                }

                request.onerror = () => {
                    console.error('Failed to load settings from IndexDB:', request.error)
                    resolve(platforms.value)
                }
            })
        } catch (error) {
            console.error('Failed to load settings from IndexDB:', error)
            return platforms.value
        }
    }

    async function saveToIndexDB() {
        try {
            const db = await openDB()
            const transaction = db.transaction(['modelSettings'], 'readwrite')
            const store = transaction.objectStore('modelSettings')

            const dataToSave = toStorageData({ platforms: platforms.value })
            await store.put(dataToSave, 'settings')
        } catch (error) {
            console.error('Failed to save settings to IndexDB:', error)
            throw error
        }
    }

    async function openDB(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('neonocto', 1)

            request.onerror = () => reject(request.error)
            request.onsuccess = () => resolve(request.result)

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result
                if (!db.objectStoreNames.contains('modelSettings')) {
                    db.createObjectStore('modelSettings')
                }
            }
        })
    }

    async function updatePlatformConfig(
        platformId: string,
        config: Partial<PlatformConfig>
    ) {
        const safeConfig = {
            apiKey: config.apiKey || platforms.value[platformId]?.apiKey || '',
            baseUrl: config.baseUrl || platforms.value[platformId]?.baseUrl || '',
            models: config.models?.map(model => ({
                id: model.id,
                name: model.name,
                description: model.description
            })) || platforms.value[platformId]?.models || []
        }

        platforms.value[platformId] = {
            ...platforms.value[platformId],
            ...safeConfig
        }

        await saveToIndexDB()
    }

    async function addModel(platformId: string, model: ModelInfo) {
        if (!platforms.value[platformId]) {
            platforms.value[platformId] = {
                ...defaultVolcengineConfig,
                models: []
            }
        }

        const safeModel = {
            id: model.id,
            name: model.name,
            description: model.description
        }

        const existingModelIndex = platforms.value[platformId].models.findIndex(
            m => m.id === safeModel.id
        )

        if (existingModelIndex === -1) {
            platforms.value[platformId].models.push(safeModel)
        } else {
            platforms.value[platformId].models[existingModelIndex] = safeModel
        }

        await saveToIndexDB()
    }

    async function removeModel(platformId: string, modelId: string) {
        if (platforms.value[platformId]) {
            platforms.value[platformId].models = platforms.value[platformId].models.filter(
                m => m.id !== modelId
            )
            await saveToIndexDB()
        }
    }

    async function updateModel(platformId: string, modelId: string, updates: Partial<ModelInfo>) {
        if (platforms.value[platformId]) {
            const modelIndex = platforms.value[platformId].models.findIndex(m => m.id === modelId)
            if (modelIndex !== -1) {
                const currentModel = platforms.value[platformId].models[modelIndex]
                const updatedModel = {
                    ...currentModel,
                    name: updates.name || currentModel.name,
                    description: updates.description
                }
                platforms.value[platformId].models[modelIndex] = updatedModel
                await saveToIndexDB()
                return updatedModel
            }
        }
        throw new Error(`Model ${modelId} not found in platform ${platformId}`)
    }

    return {
        platforms,
        initFromIndexDB,
        saveToIndexDB,
        updatePlatformConfig,
        addModel,
        removeModel,
        updateModel
    }
}) 
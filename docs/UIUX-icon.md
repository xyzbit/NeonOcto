


### 一、必准备的SVG像素图标清单（按功能模块分类）

#### **1. 平台/模型标识类（核心视觉资产）**
| 图标名称            | 用途                  | 设计要求                                                       | 推荐尺寸 | 格式    | 示例参考链接                                                                                          |
| ------------------- | --------------------- | -------------------------------------------------------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------- |
| `cursor-logo`       | 左侧导航栏/Cursor平台 | 像素风格代码编辑器图标，带键盘/屏幕元素，主色#00ff00（荧光绿） | 48x48px  | SVG/PNG | [Game-icons: Computer](https://game-icons.net/1x1/computer/)                                          |
| `volc-logo`         | 左侧导航栏/火山引擎   | 像素火箭+数据流，主色#ff6b6b（火山红），尾部带火焰像素动画帧   | 48x48px  | SVG/PNG | 自定义设计（参考代码生成图标示例）                                                                    |
| `model-recommended` | 模型标签-推荐         | 绿色像素星星（⭐️），边缘带8bit闪烁效果                          | 16x16px  | SVG     | [Open Pixel Art: Star](https://openpixelart.org/artists/kenney)                                       |
| `model-multimodal`  | 模型标签-多模态       | 相机+大脑组合图标，主色#4a90e2（科技蓝）                       | 16x16px  | SVG     | [Game-icons: Camera](https://game-icons.net/1x1/camera/) + [Brain](https://game-icons.net/1x1/brain/) |
| `model-highspeed`   | 模型标签-高速         | 闪电形状，带像素化速度线（▍▍▍）                                | 16x16px  | SVG     | [Game-icons: Lightning](https://game-icons.net/1x1/lightning/)                                        |

#### **2. 功能操作类（高频交互按钮）**
| 图标名称       | 用途            | 设计要求                                              | 推荐尺寸 | 格式       | 实现细节                                                                 |
| -------------- | --------------- | ----------------------------------------------------- | -------- | ---------- | ------------------------------------------------------------------------ |
| `optimize-btn` | 优化按钮图标    | 火箭发射/齿轮组合，文字“🚀”+像素火焰，点击时火焰帧动画 | 24x24px  | SVG+帧动画 | 参考`vue-pixel-ui`按钮组件                                               |
| `save-version` | 保存版本按钮    | 软盘/硬盘像素图标，主色#888，悬停变#fff               | 20x20px  | SVG        | 可复用[Game-icons: Disk](https://game-icons.net/1x1/disk/)               |
| `compare-btn`  | 重新对比按钮    | 双向箭头（↔），带像素化虚线连接                       | 20x20px  | SVG        | 线条宽度2px，颜色#4a90e2                                                 |
| `add-case`     | 测试用例“+”按钮 | 加号（+），背景红色像素方块，点击时弹性动画           | 16x16px  | SVG        | 参考[Vue Pixel UI: Button](https://github.com/caoxiemeihao/vue-pixel-ui) |
| `delete-case`  | 测试用例“-”按钮 | 减号（-），背景灰色像素方块                           | 16x16px  | SVG        | 与`add-case`保持视觉一致性                                               |

#### **3. 状态与反馈类（信息展示）**
| 图标名称            | 用途             | 设计要求                                   | 推荐尺寸 | 格式               | 特殊说明                  |
| ------------------- | ---------------- | ------------------------------------------ | -------- | ------------------ | ------------------------- |
| `loading-indicator` | 加载状态图标     | 像素齿轮旋转/触手环绕，支持透明背景        | 32x32px  | SVG+JSON（Lottie） | 需导出为Lottie动效文件    |
| `success-tag`       | 优化成功标签     | 绿色对勾（✅），带像素描边                  | 12x12px  | SVG                | 用于历史记录时间轴        |
| `error-tag`         | 优化失败标签     | 红色叉号（❌），带像素化警告边框            | 12x12px  | SVG                | 需配合提示tooltip使用     |
| `metrics-icon`      | 实时指标卡片图标 | 折线图/柱状图像素组合，主色#ffd700（金色） | 24x24px  | SVG                | 数据点用8x8px像素方块表示 |


### 二、Lottie动效清单（关键交互场景）
#### **1. 按钮交互动效**
| 动效名称                 | 触发场景            | 设计要求                                                       | 工具建议      | 输出格式 | 参考案例                                            |
| ------------------------ | ------------------- | -------------------------------------------------------------- | ------------- | -------- | --------------------------------------------------- |
| `button-pixel-glow`      | 优化按钮点击        | 红色按钮边缘闪烁8bit像素光，持续0.5秒，模拟CRT显示器扫描线效果 | LottieFiles   | JSON     | [Pixel Button Glow](https://lottiefiles.com/123456) |
| `dropdown-slide`         | 平台/模型下拉框展开 | 选项卡以像素颗粒下落动画展开，每个选项带0.1秒延迟的错位入场    | bodymovin     | JSON     | 参考《茶杯头》式复古动画                            |
| `version-diff-highlight` | 差异对比高亮        | 红色像素框逐行扫描高亮差异文本，类似早期终端编辑器的块选择效果 | After Effects | JSON     | 分帧绘制1px红色方块移动动画                         |

#### **2. 数据可视化动效**
| 动效名称         | 触发场景       | 设计要求                                                                     | 工具建议  | 输出格式 | 实现细节                        |
| ---------------- | -------------- | ---------------------------------------------------------------------------- | --------- | -------- | ------------------------------- |
| `metrics-update` | 实时指标更新   | 数据曲线以像素点逐帧绘制，新增数据点带弹跳动画（如Token消耗曲线）            | Lottie    | JSON     | 坐标轴使用8px等高像素字体       |
| `history-scroll` | 版本时间轴滑动 | 时间轴卡片以像素化平移过渡，切换版本时左右卡片带挤压变形（类似游戏切换场景） | Bodymovin | JSON     | 边缘添加0.5px黑色描边保持像素感 |

#### **3. 加载与反馈动效**
| 动效名称            | 触发场景            | 设计要求                                                                             | 工具建议      | 输出格式 | 扩展用途             |
| ------------------- | ------------------- | ------------------------------------------------------------------------------------ | ------------- | -------- | -------------------- |
| `neon-octo-loading` | 初始化加载/批量测试 | 霓虹章鱼触手旋转成加载环，颜色随平台切换动态变化（Cursor绿→火山红→未来平台自定义色） | After Effects | JSON     | 可作为全局加载态标识 |
| `typing-animation`  | 提示词编辑框输入    | 光标（▌）以8bit闪烁频率跳动，输入文字带打字机动画（逐字符显示）                      | Lottie        | JSON     | 支持中英文混排场景   |


### 三、资源准备优先级建议
#### **1. 第一阶段（MVP必做）**
- **图标**：  
  ✅ `cursor-logo`/`volc-logo`（平台标识）  
  ✅ `optimize-btn`/`save-version`（核心操作按钮）  
  ✅ `model-recommended`/`model-highspeed`（模型标签）  
- **动效**：  
  ✅ `button-pixel-glow`（优化按钮反馈）  
  ✅ `loading-indicator`（全局加载态）  

#### **2. 第二阶段（迭代优化）**  
- **图标**：  
  ✅ 扩展未来平台图标（预留`replit-logo`/`jupyter-logo`等）  
  ✅ 新增`prompt-history`（历史记录图标）、`rule-editor`（规则编辑图标）  
- **动效**：  
  ✅ `version-diff-highlight`（对比界面核心动效）  
  ✅ `typing-animation`（提升输入体验）  

#### **3. 资源管理建议**  
- **图标库管理**：  
  - 建立`src/assets/icons/`目录，按功能分类（platforms/buttons/metrics/）  
  - 使用SVGO压缩工具优化SVG文件体积（推荐配置：`--enable=cleanupIDs,convertPathData`）  
- **动效集成**：  
  - 通过`lottie-web`库在Vue中加载动效：  
    ```vue  
    <template>  
      <lottie-player src="/static/animations/loading.json" :loop="true" :autoplay="true"></lottie-player>  
    </template>  
    <script>  
    import LottiePlayer from 'lottie-web-vue';  
    export default { components: { LottiePlayer } };  
    </script>  
    ```  
  - 复杂动效可拆分为“基础帧动画”+“数据驱动部分”，通过Vue状态动态控制（如加载环颜色绑定平台主题色）。  


### 四、开源工具链推荐  
#### **1. 图标生成**  
- **Pixel Frog-Logo Generator**：自动生成像素风格LOGO（https://www.pixelfrog-website-building-tool.com/pixel-art-logo-generator）  
- **Iconjar**：本地图标管理工具，支持SVG预览和批量导出（https://iconjar.com/）  

#### **2. 动效制作**  
- **LottieFiles**：在线动效库，支持搜索“pixel”“geek”标签快速获取素材（https://lottiefiles.com/）  
- **Piskel**：像素动画编辑器，支持导出Lottie兼容的JSON帧数据（https://www.piskelapp.com/）  

通过以上清单，可系统化准备UI所需的视觉资源，确保极客风像素化风格的一致性和扩展性。建议优先实现核心场景的图标与动效，后续通过版本迭代逐步完善细节。
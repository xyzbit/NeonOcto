// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function () {
    // 平台和模型选择器交互
    const selects = document.querySelectorAll('.pixel-select');
    selects.forEach(select => {
        select.addEventListener('click', function () {
            // 模拟下拉框展开效果
            const options = ['Cursor', '火山引擎', '未来平台'];
            const overlay = document.createElement('div');
            overlay.className = 'select-overlay';
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.zIndex = '99';

            const dropdown = document.createElement('div');
            dropdown.className = 'pixel-dropdown';
            dropdown.style.position = 'absolute';
            dropdown.style.background = '#1a1a1a';
            dropdown.style.border = '3px solid #4a4a4a';
            dropdown.style.width = `${this.offsetWidth}px`;
            dropdown.style.zIndex = '100';

            // 获取选择器在页面中的位置
            const rect = this.getBoundingClientRect();
            dropdown.style.left = `${rect.left}px`;
            dropdown.style.top = `${rect.bottom + 5}px`;

            options.forEach(option => {
                const item = document.createElement('div');
                item.className = 'dropdown-item';
                item.textContent = option;
                item.style.padding = '8px 12px';
                item.style.cursor = 'pointer';
                item.style.fontSize = '10px';

                item.addEventListener('mouseover', function () {
                    this.style.backgroundColor = '#4a90e2';
                    this.style.color = '#fff';
                });

                item.addEventListener('mouseout', function () {
                    this.style.backgroundColor = '';
                    this.style.color = '';
                });

                item.addEventListener('click', function (e) {
                    e.stopPropagation();
                    select.querySelector('span:first-child').textContent = option;
                    document.body.removeChild(overlay);
                });

                dropdown.appendChild(item);
            });

            overlay.appendChild(dropdown);
            document.body.appendChild(overlay);

            overlay.addEventListener('click', function () {
                document.body.removeChild(this);
            });
        });
    });

    // 左侧菜单项点击切换
    const menuItems = document.querySelectorAll('.menu li:not(.disabled)');
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            // 仅处理非禁用菜单项的点击
            if (!this.classList.contains('disabled')) {
                // 移除其他项的active类
                document.querySelectorAll('.menu li').forEach(mi => mi.classList.remove('active'));
                // 添加当前项的active类
                this.classList.add('active');

                // 更新顶部logo图标
                const iconName = this.getAttribute('data-icon');
                const logo = document.querySelector('.logo img');
                if (logo && iconName) {
                    logo.src = `assets/icons/${iconName}`;
                    logo.alt = this.textContent.trim();
                }

                // 更新平台选择器
                const platformSelect = document.querySelector('.selectors .selector:first-child .pixel-select span:first-child');
                if (platformSelect) {
                    platformSelect.textContent = 'Cursor'; // 始终显示Cursor平台
                }

                // 固定为首页界面的模型选项
                updateModelOptions('Cursor');
            }
        });
    });

    // 根据平台更新模型选择项
    function updateModelOptions(platform) {
        const modelSelect = document.querySelector('.selectors .selector:nth-child(2) .pixel-select span:first-child');
        const modelTag = document.querySelector('.selectors .selector:nth-child(2) .pixel-select .tag');

        if (modelSelect && modelTag) {
            // 根据不同平台设置不同的模型和标签
            switch (platform) {
                case 'Cursor':
                    modelSelect.textContent = 'Claude-3.5';
                    modelTag.textContent = '🟢 推荐';
                    modelTag.className = 'tag recommended';
                    modelTag.style.color = '#4caf50';
                    modelTag.style.borderColor = '#4caf50';
                    break;
                case '火山引擎':
                    modelSelect.textContent = '豆包-13B';
                    modelTag.textContent = '🔄 多模态';
                    modelTag.className = 'tag multimodal';
                    modelTag.style.color = '#4a90e2';
                    modelTag.style.borderColor = '#4a90e2';
                    break;
                case '未来平台':
                    modelSelect.textContent = 'GPT-5';
                    modelTag.textContent = '⚡️ 高速';
                    modelTag.className = 'tag fast';
                    modelTag.style.color = '#ffd700';
                    modelTag.style.borderColor = '#ffd700';
                    break;
            }
        }
    }

    // 模拟版本数据
    const mockVersions = [
        {
            id: 1,
            title: '初始版本',
            original: `请生成一个查询用户数据的SQL语句`,
            optimized: `请生成一个查询用户数据的SQL语句，请确保使用索引并添加错误处理`
        },
        {
            id: 2,
            title: '细化查询条件',
            original: `请生成一个查询用户数据的SQL语句`,
            optimized: `请生成一个查询用户数据的SQL语句，查询过去30天内活跃用户，并按照活跃度排序，请确保使用索引并添加错误处理`
        },
        {
            id: 3,
            title: '完善查询需求',
            original: `请生成一个查询用户数据的SQL语句`,
            optimized: `请生成一个高效的SQL查询，查询用户表中过去30天内活跃用户，并按照活跃度排序。

要求：
1. 使用适当的索引
2. 考虑查询性能
3. 添加必要的错误处理
4. 提供注释解释查询逻辑`
        }
    ];

    // 版本对比控制变量
    let currentVersionIndex = 0;
    let comparisonMode = 'initial'; // 'initial' 或 'incremental'

    // 优化按钮点击效果
    const optimizeBtn = document.querySelector('.optimize-btn');
    if (optimizeBtn) {
        optimizeBtn.addEventListener('click', function () {
            // 按钮闪烁动画
            this.style.transition = 'none';

            const flash = () => {
                this.style.backgroundColor = '#ff6b6b';
                setTimeout(() => {
                    this.style.backgroundColor = '#ffffff';
                    setTimeout(() => {
                        this.style.backgroundColor = '#ff6b6b';
                        setTimeout(() => {
                            this.style.backgroundColor = '#ffffff';
                            setTimeout(() => {
                                this.style.backgroundColor = '#ff6b6b';
                                setTimeout(() => {
                                    // 显示版本对比区域
                                    showVersionComparison();
                                }, 100);
                            }, 100);
                        }, 100);
                    }, 100);
                }, 100);
            };

            flash();
        });
    }

    // 显示版本对比区域
    function showVersionComparison() {
        const versionsComparison = document.querySelector('.versions-comparison');
        if (versionsComparison) {
            versionsComparison.style.display = 'flex';

            // 初始化版本卡片
            renderVersionCards();

            // 设置当前版本
            updateVersionIndicator();
        }
    }

    // 关闭版本对比区域
    const closeComparisonBtn = document.querySelector('.close-comparison-btn');
    if (closeComparisonBtn) {
        closeComparisonBtn.addEventListener('click', function () {
            const versionsComparison = document.querySelector('.versions-comparison');
            if (versionsComparison) {
                versionsComparison.style.display = 'none';
            }
        });
    }

    // 对比模式切换
    const modeBtns = document.querySelectorAll('.mode-btn');
    modeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // 移除其他按钮的active类
            modeBtns.forEach(b => b.classList.remove('active'));
            // 添加当前按钮的active类
            this.classList.add('active');

            // 更新比较模式
            comparisonMode = this.getAttribute('data-mode');

            // 重新渲染版本卡片
            renderVersionCards();
        });
    });

    // 滑动控制
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            if (currentVersionIndex > 0) {
                currentVersionIndex--;
                slideToVersion(currentVersionIndex);
                updateVersionIndicator();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            if (currentVersionIndex < mockVersions.length - 1) {
                currentVersionIndex++;
                slideToVersion(currentVersionIndex);
                updateVersionIndicator();
            }
        });
    }

    // 键盘左右键滑动
    document.addEventListener('keydown', function (e) {
        const versionsComparison = document.querySelector('.versions-comparison');
        if (versionsComparison && versionsComparison.style.display === 'flex') {
            if (e.key === 'ArrowLeft' && currentVersionIndex > 0) {
                currentVersionIndex--;
                slideToVersion(currentVersionIndex);
                updateVersionIndicator();
            } else if (e.key === 'ArrowRight' && currentVersionIndex < mockVersions.length - 1) {
                currentVersionIndex++;
                slideToVersion(currentVersionIndex);
                updateVersionIndicator();
            }
        }
    });

    // 滑动到指定版本
    function slideToVersion(index) {
        const versionCards = document.querySelector('.version-cards');
        if (versionCards) {
            const cardWidth = 520; // 卡片宽度 + 边距
            versionCards.style.transform = `translateX(-${index * cardWidth}px)`;
        }
    }

    // 更新版本指示器
    function updateVersionIndicator() {
        const currentVersionEl = document.querySelector('.current-version');
        const totalVersionsEl = document.querySelector('.total-versions');

        if (currentVersionEl && totalVersionsEl) {
            currentVersionEl.textContent = currentVersionIndex + 1;
            totalVersionsEl.textContent = mockVersions.length;
        }

        // 更新按钮禁用状态
        if (prevBtn) {
            prevBtn.disabled = currentVersionIndex === 0;
            prevBtn.style.opacity = currentVersionIndex === 0 ? '0.5' : '1';
        }

        if (nextBtn) {
            nextBtn.disabled = currentVersionIndex === mockVersions.length - 1;
            nextBtn.style.opacity = currentVersionIndex === mockVersions.length - 1 ? '0.5' : '1';
        }
    }

    // 渲染版本卡片
    function renderVersionCards() {
        const versionCardsContainer = document.querySelector('.version-cards');
        if (!versionCardsContainer) return;

        // 清除现有卡片
        versionCardsContainer.innerHTML = '';

        // 根据不同模式创建卡片
        mockVersions.forEach((version, index) => {
            const card = document.createElement('div');
            card.className = 'version-card';

            const header = document.createElement('div');
            header.className = 'version-card-header';

            const title = document.createElement('div');
            title.className = 'version-card-title';
            title.textContent = version.title;

            const id = document.createElement('div');
            id.className = 'version-card-id';
            id.textContent = `版本 ${version.id}`;

            header.appendChild(title);
            header.appendChild(id);

            const content = document.createElement('div');
            content.className = 'version-card-content';

            const original = document.createElement('div');
            original.className = 'version-card-original';

            const originalLabel = document.createElement('div');
            originalLabel.className = 'version-card-label';

            const originalText = document.createElement('div');
            originalText.className = 'version-card-text';

            original.appendChild(originalLabel);
            original.appendChild(originalText);

            const optimized = document.createElement('div');
            optimized.className = 'version-card-optimized';

            const optimizedLabel = document.createElement('div');
            optimizedLabel.className = 'version-card-label';
            optimizedLabel.textContent = '优化版本';

            const optimizedText = document.createElement('div');
            optimizedText.className = 'version-card-text';

            optimized.appendChild(optimizedLabel);
            optimized.appendChild(optimizedText);

            content.appendChild(original);
            content.appendChild(optimized);

            card.appendChild(header);
            card.appendChild(content);

            // 根据比较模式设置内容
            if (comparisonMode === 'initial') {
                // 初版对比模式：每个版本都与初始版本对比
                originalLabel.textContent = '初始版本';
                originalText.innerHTML = mockVersions[0].original;
                optimizedText.innerHTML = highlightDiffs(mockVersions[0].original, version.optimized);
            } else {
                // 增量对比模式：每个版本与前一个版本对比
                if (index === 0) {
                    // 第一个版本
                    originalLabel.textContent = '原始版本';
                    originalText.innerHTML = version.original;
                    optimizedText.innerHTML = highlightDiffs(version.original, version.optimized);
                } else {
                    // 后续版本
                    originalLabel.textContent = `版本 ${index}`;
                    originalText.innerHTML = mockVersions[index - 1].optimized;
                    optimizedText.innerHTML = highlightDiffs(mockVersions[index - 1].optimized, version.optimized);
                }
            }

            versionCardsContainer.appendChild(card);
        });

        // 重置滑动位置
        slideToVersion(currentVersionIndex);
    }

    // 高亮文本差异
    function highlightDiffs(original, optimized) {
        // 这是一个简化的差异高亮实现，实际项目中可能需要更复杂的算法
        if (original === optimized) {
            return optimized; // 无变化
        }

        // 尝试找出新增的内容
        let result = optimized;

        // 简单替换，实际项目中应使用更复杂的差异算法
        const uniquePartsInOptimized = optimized.replace(original, '');
        if (uniquePartsInOptimized && optimized.includes(original)) {
            // 如果优化版本包含原始版本，高亮新增内容
            result = optimized.replace(
                uniquePartsInOptimized,
                `<span class="diff-addition">${uniquePartsInOptimized}</span>`
            );
        } else {
            // 如果无法简单识别差异，整体高亮
            const words1 = original.split(' ');
            const words2 = optimized.split(' ');

            // 找出新增和删除的单词（简化处理）
            const addedWords = words2.filter(word => !words1.includes(word));

            // 高亮新增单词
            addedWords.forEach(word => {
                if (word.trim() !== '') {
                    const regex = new RegExp(`(${word})`, 'g');
                    result = result.replace(regex, '<span class="diff-addition">$1</span>');
                }
            });
        }

        return result;
    }

    // 添加测试用例按钮交互
    const addBtn = document.querySelector('.add-btn');
    if (addBtn) {
        addBtn.addEventListener('click', function () {
            const tableBody = document.querySelector('.pixel-table tbody');
            if (tableBody) {
                const rowCount = tableBody.children.length;
                const newRow = document.createElement('tr');

                newRow.innerHTML = `
                    <td>${rowCount + 1}</td>
                    <td>新测试场景</td>
                    <td>预期结果描述</td>
                    <td>
                        <button class="pixel-btn small">-</button>
                    </td>
                `;

                tableBody.appendChild(newRow);

                // 为新添加的删除按钮添加事件
                const deleteBtn = newRow.querySelector('.pixel-btn');
                deleteBtn.addEventListener('click', function () {
                    tableBody.removeChild(newRow);

                    // 更新序号
                    const rows = tableBody.querySelectorAll('tr');
                    rows.forEach((row, index) => {
                        row.children[0].textContent = index + 1;
                    });
                });
            }
        });
    }

    // 为已存在的删除按钮添加事件
    const deleteBtns = document.querySelectorAll('.pixel-table .pixel-btn');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const row = this.closest('tr');
            const tableBody = row.parentElement;

            tableBody.removeChild(row);

            // 更新序号
            const rows = tableBody.querySelectorAll('tr');
            rows.forEach((row, index) => {
                row.children[0].textContent = index + 1;
            });
        });
    });

    // 历史记录版本点击交互
    const versions = document.querySelectorAll('.version');
    versions.forEach(version => {
        version.addEventListener('click', function () {
            // 移除其他版本的active类
            versions.forEach(v => v.classList.remove('active'));
            // 为当前点击的版本添加active类
            this.classList.add('active');
        });
    });

    // 为了演示效果，添加模拟打字机效果
    const promptEditor = document.querySelector('.prompt-editor textarea');
    if (promptEditor) {
        const sampleText = `请生成一个高效的SQL查询，查询用户表中过去30天内活跃用户，并按照活跃度排序。

要求：
1. 使用适当的索引
2. 考虑查询性能
3. 添加必要的错误处理
4. 提供注释解释查询逻辑`;

        let i = 0;
        const typeEffect = () => {
            if (i < sampleText.length) {
                promptEditor.value += sampleText.charAt(i);
                i++;
                setTimeout(typeEffect, 30);
            }
        };

        // 延迟1秒后开始打字效果
        setTimeout(typeEffect, 1000);
    }
}); 
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

    // 左侧菜单项点击切换平台
    const menuItems = document.querySelectorAll('.menu li');
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            // 移除其他项的active类
            menuItems.forEach(mi => mi.classList.remove('active'));
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
                platformSelect.textContent = this.textContent.trim();
            }

            // 根据平台更新模型选择器选项
            updateModelOptions(this.textContent.trim());
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
                                    // 显示对比模态框
                                    const modal = document.querySelector('.comparison-modal');
                                    if (modal) {
                                        modal.style.display = 'flex';
                                    }
                                }, 100);
                            }, 100);
                        }, 100);
                    }, 100);
                }, 100);
            };

            flash();
        });
    }

    // 关闭对比模态框
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            const modal = document.querySelector('.comparison-modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
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

    // 实现键盘快捷键
    document.addEventListener('keydown', function (e) {
        // 检查是否按下Ctrl键
        if (e.ctrlKey) {
            const modal = document.querySelector('.comparison-modal');
            if (modal && modal.style.display === 'flex') {
                // Ctrl+[
                if (e.key === '[') {
                    console.log('切换到上一个版本');
                    // 这里可以实现版本切换逻辑
                }
                // Ctrl+]
                else if (e.key === ']') {
                    console.log('切换到下一个版本');
                    // 这里可以实现版本切换逻辑
                }
            }
        }
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
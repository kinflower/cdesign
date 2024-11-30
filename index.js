var current = {}
var records = Array(2000)
var curIndex = 0

function getNode(name) { // 获取节点
    return document.getElementById(name)
}

function removeEvent() { // 移除所有事件
    document.onmousemove = null
    document.onmouseup = null
}

function rgbToHex(r, g, b) {
    let rHex = (r < 16 ? '0' : '') + Math.max(0, Math.min(255, Math.round(r))).toString(16);
    let gHex = (g < 16 ? '0' : '') + Math.max(0, Math.min(255, Math.round(g))).toString(16);
    let bHex = (b < 16 ? '0' : '') + Math.max(0, Math.min(255, Math.round(b))).toString(16);
    return `#${rHex}${gHex}${bHex}`;
}

function rgbStringToHex(rgbString) {
    const [, red, green, blue] = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    return rgbToHex(parseInt(red), parseInt(green), parseInt(blue));
}

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}

function getval(target) { // 获取组件配置信息
    var init_config = {
        com: [
            { id: "title_content", display: 'flex' },
            { id: "value_content", display: 'flex' },
            { id: "fsize_content", display: 'flex' },
            { id: "color_content", display: 'flex' },
            { id: "fts_content", display: 'flex' },
            { id: "hint_content", display: 'flex' },
            { id: "path_content", display: 'flex' },
            { id: "hs_content", display: 'flex' },
            { id: "vs_content", display: 'flex' },
            { id: "arrange_content", display: 'flex' },
            { id: "ftcm_content", display: 'flex' },
            { id: "inputtype_content", display: 'flex' }
        ]
    }
    
    if(current.nodeName) {
        current.classList.remove('active')
    }
    current = target
    target.classList.add('active')
    switch (target.dataset.type) { // 控制是否显示配置项
        case 'button':
        case 'text':
            init_config.com.forEach(item => {
                if (['value_content', 'hs_content', 'inputtype_content', 'hint_content', 'vs_content', 'path_content', 'arrange_content'].includes(item.id)) {
                    item.display = 'none'
                } else {
                    item.display = 'flex'
                }
            })
            break
        case 'input':
            init_config.com.forEach(item => {
                if (['title_content', 'path_content', 'ftcm_content', 'hs_content', 'vs_content', 'arrange_content'].includes(item.id)) {
                    item.display = 'none'
                } else {
                    item.display = 'flex'
                }
            })
            getNode('hint').value = target.placeholder
            getNode('hint').onchange = (e) => {
                current.placeholder = e.target.value
                handleRecords()
            }
            getNode('inputtype').value = target.placeholder
            getNode('inputtype').onchange = (e) => {
                current.type = e.target.value
                handleRecords()
            }
            break
        case 'img':
            init_config.com.forEach(item => {
                if (['title_content', 'color_content', 'hs_content', 'ftcm_content', 'value_content', 'fsize_content', 'fts_content',
                    'hint_content', 'vs_content', 'arrange_content', 'inputtype_content'].includes(item.id)) {
                    item.display = 'none'
                } else {
                    item.display = 'flex'
                }
            })
            getNode('path').value = target.src
            getNode('path').onchange = (e) => {
                current.src = e.target.value
                handleRecords()
            }
            break
        case 'div':
            init_config.com.forEach(item => {
                if (['title_content', 'color_content', 'value_content', 'fts_content', 'fsize_content', 'hint_content', 'inputtype_content', 'path_content'].includes(item.id)) {
                    item.display = 'none'
                } else {
                    item.display = 'flex'
                }
            })
            break
    }

    init_config.com.forEach(item => {
        getNode(item.id).style.display = item.display
    })

    // 配置项值写入
    getNode('title').value = target.innerHTML
    getNode('title').onchange = (e) => {
        current.innerHTML = e.target.value
        handleRecords()
    }
    getNode('value').value = target.value
    getNode('value').onchange = (e) => {
        current.value = e.target.value
        handleRecords()
    }
    getNode('bds').value = target.style.borderStyle
    getNode('bds').onchange = (e) => {
        current.style.borderStyle = e.target.value
        handleRecords()
    }
    getNode('ols').value = target.style.outlineStyle
    getNode('ols').onchange = (e) => {
        current.style.outlineStyle = e.target.value
        handleRecords()
    }
    getNode('fts').value = target.style.fontWeight
    getNode('fts').onchange = (e) => {
        current.style.fontWeight = e.target.value
        handleRecords()
    }
    getNode('ftcm').value = target.style.textAlign
    getNode('ftcm').onchange = (e) => {
        current.style.textAlign = e.target.value
        handleRecords()
    }
    getNode('zindex').value = target.style.zIndex
    getNode('zindex').onchange = (e) => {
        if (e.target.value > 1000) {
            current.style.zIndex = 1000
            e.target.value = 1000
        } else {
            current.style.zIndex = e.target.value
        }
        handleRecords()
    }
    getNode('height').value = target.style.height ? parseInt(target.style.height) : target.style.height
    getNode('height').onchange = (e) => {
        current.style.height = e.target.value + 'px'
        handleRecords()
    }
    getNode('width').value = target.style.width ? parseInt(target.style.width) : target.style.width
    getNode('width').onchange = (e) => {
        current.style.width = e.target.value + 'px'
        handleRecords()
    }
    getNode('padding').value = target.style.padding ? parseInt(target.style.padding) : target.style.padding
    getNode('padding').onchange = (e) => {
        current.style.padding = e.target.value + 'px'
        handleRecords()
    }
    getNode('margin').value = target.style.margin ? parseInt(target.style.margin) : target.style.margin
    getNode('margin').onchange = (e) => {
        current.style.margin = e.target.value + 'px'
        handleRecords()
    }
    getNode('x').value = target.style.left ? parseInt(target.style.left) : target.style.left
    getNode('x').onchange = (e) => {
        current.style.left = e.target.value + 'px'
        handleRecords()
    }
    getNode('y').value = target.style.top ? parseInt(target.style.top) : target.style.top
    getNode('y').onchange = (e) => {
        current.style.top = e.target.value + 'px'
        handleRecords()
    }
    getNode('fsize').value = target.style.fontSize ? parseInt(target.style.fontSize) : target.style.fontSize
    getNode('fsize').onchange = (e) => {
        current.style.fontSize = e.target.value + 'px'
        handleRecords()
    }
    getNode('color').value = target.style.color ? rgbStringToHex(target.style.color) : '#000000'
    getNode('color').onchange = (e) => {
        current.style.color = e.target.value
        handleRecords()
    }
    getNode('bg').value = target.style.background ? rgbStringToHex(target.style.background) : '#000000'
    getNode('bg').onchange = (e) => {
        current.style.background = e.target.value
        handleRecords()
    }
    getNode('bdw').value = target.style.borderWidth ? parseInt(target.style.borderWidth) : target.style.borderWidth
    getNode('bdw').onchange = (e) => {
        current.style.borderWidth = e.target.value + 'px'
        handleRecords()
    }
    getNode('bdc').value = target.style.borderColor ? rgbStringToHex(target.style.borderColor) : '#000000'
    getNode('bdc').onchange = (e) => {
        current.style.borderColor = e.target.value
        handleRecords()
    }
    getNode('bdr').value = target.style.borderRadius ? parseInt(target.style.borderRadius) : target.style.borderRadius
    getNode('bdr').onchange = (e) => {
        current.style.borderRadius = e.target.value + 'px'
        handleRecords()
    }
    getNode('olw').value = target.style.outlineWidth ? parseInt(target.style.outlineWidth) : target.style.outlineWidth
    getNode('olw').onchange = (e) => {
        current.style.outlineWidth = e.target.value + 'px'
        handleRecords()
    }
    getNode('olc').value = target.style.outlineColor ? rgbStringToHex(target.style.outlineColor) : '#000000'
    getNode('olc').onchange = (e) => {
        current.style.outlineColor = e.target.value
        handleRecords()
    }
    getNode('hs').value = target.style.justifyContent
    getNode('hs').onchange = (e) => {
        current.style.display = 'flex'; 
        current.style.justifyContent = e.target.value
        handleRecords()
    }
    getNode('vs').value = target.style.alignItems
    getNode('vs').onchange = (e) => {
        current.style.display = 'flex'; 
        current.style.alignItems = e.target.value
        handleRecords()
    }
    getNode('arrange').value = target.style.flexDirection
    getNode('arrange').onchange = (e) => {
        current.style.display = 'flex'; 
        current.style.flexDirection = e.target.value
        handleRecords()
    }
}

function dragWin(flag_1, flag_2) { // 组件、配置窗口拖拽
    let xOffset = 0;
    let yOffset = 0;
    let currentX = 0;
    let currentY = 0;
    let initialX = 0;
    let initialY = 0;
    let config = getNode(flag_1)
    if (flag_1 == 'config') {
        config.style.left = window.innerWidth - 250 + 'px'
    }
    getNode(flag_2).onmousedown = function (e) {
        e.preventDefault()
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        document.onmousemove = function (event) {
            currentX = event.clientX - initialX;
            currentY = event.clientY - initialY;
            xOffset = currentX;
            yOffset = currentY;
            config.style.transform = "translate3d(" + currentX + "px, " + currentY + "px, 0)"
        }
        document.onmouseup = function () {
            initialX = currentX;
            initialY = currentY;
            removeEvent()
        }
    }
}

function setMin(nodeName, value) { // 显示工具窗口
    getNode(nodeName).style.display = value
}

function createNode(node) { // 节点创建
    node.onmousedown = function (event) {
        event.preventDefault();
        let new_node = document.createElement(`${node.dataset.type}`);
        new_node.innerHTML = `${node.dataset.name}`;
        new_node.id = new_node.nodeName + '_' + generateRandomString(10)
        new_node.style.position = "absolute";
        new_node.style.zIndex = 1;
        new_node.style.userSelect = "none";
        new_node.style.left = event.clientX + "px";
        new_node.style.top = event.clientY + "px";
        new_node.dataset.type = node.dataset.type
        if (node.dataset.type == 'img') {
            new_node.style.width = '50px'
            new_node.style.height = '50px'
            new_node.src = 'https://img2.baidu.com/it/u=619489044,1557814231&fm=253'
        } else if (node.dataset.type == 'div') {
            new_node.style.width = '150px'
            new_node.style.height = '80px'
            new_node.style.borderColor = '#aaa'
            new_node.style.borderStyle = 'solid'
            new_node.style.borderWidth = '1px'
        } else if (node.dataset.type == 'button') {
            new_node.style.width = '45px'
            new_node.style.height = '23px'
        } else if (node.dataset.type == 'text') {
            new_node.style.width = '32px'
            new_node.style.height = '22px'
        } else if (node.dataset.type == 'input') {
            new_node.style.width = '80px'
            new_node.style.height = '15px'
        }
        getNode('workplace').appendChild(new_node);
        document.onmousemove = function (event_1) {
            new_node.style.left = event_1.clientX + "px";
            new_node.style.top = event_1.clientY + "px";
        }
        document.onmouseup = function (ev) {
            handleNode(new_node, 'create')
            const elements = document.elementsFromPoint(ev.clientX, ev.clientY)
            if(elements[2].nodeName == 'HTML') return
            if (elements[1].nodeName == 'DIV' && elements[1].id != 'workplace' && elements[1].id != 'component' && !elements.map(item => item.id).includes('config') && !new_node.contains(elements[1])) {
                getNode('workplace').removeChild(new_node)
                new_node.style.position = ''
                new_node.style.top = 0
                new_node.style.left = 0
                elements[1].appendChild(new_node)
            }
            handleRecords()
            removeEvent()
        }
    }
}

function handleCopy() { // 节点复制
    if (!current.nodeName) return
    let cloneNode = current.cloneNode(true)
    current.classList.remove('active')
    cloneNode.id = cloneNode.nodeName + '_' + generateRandomString(10)
    handleNode(cloneNode, 'copy')
    handleTreeNodeId(cloneNode)
    if (cloneNode.nodeName != 'DIV') { // 非块级需绝对布局
        cloneNode.style.position = 'absolute'
        if(cloneNode.style.top=='0px') {
            cloneNode.style.top = '50px'
            cloneNode.style.left = '100px'
        }
    }
    if (cloneNode.nodeName == 'DIV' && cloneNode.children.length>0) { // 块级且有子节点需绝对布局
        cloneNode.style.position = 'absolute'
        cloneNode.style.top = '50px'
        cloneNode.style.left = '100px'
    }
    getNode('workplace').appendChild(cloneNode)
    current = {}
    handleRecords()
}

function handleNode(node, nodeFlag) { // 节点处理
    let xOffset = 0;
    let yOffset = 0;
    let currentX = 0;
    let currentY = 0;
    let initialX = 0;
    let initialY = 0;
    let flag = ''
    node.onmousedown = function (e) {
        e.preventDefault();
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        flag = 'down'
        document.onmousemove = function (event) {
            currentX = event.clientX - initialX;
            currentY = event.clientY - initialY;
            xOffset = currentX;
            yOffset = currentY;
            node.style.transform = "translate3d(" + currentX + "px, " + currentY + "px, 0)"
            if (flag == 'down') {
                node.style.top = Math.abs((currentY - parseInt(node.style.top))) + 'px'
                node.style.left = Math.abs((currentX - parseInt(node.style.left))) + 'px'
                flag = 'move'
            }
        }
        document.onmouseup = function (evx) {
            const elements = document.elementsFromPoint(evx.clientX, evx.clientY)
            if(elements[2].nodeName == 'HTML') return
            if (elements[1].nodeName == 'DIV' && elements[1].id != 'workplace' && elements[1].id != 'component' && !elements.map(item => item.id).includes('config') && !node.contains(elements[1])) {
                getNode('workplace').removeChild(node)
                node.style.position = ''
                node.style.top = 0
                node.style.left = 0
                elements[1].appendChild(node)
            }
            if (flag == 'move') {
                initialX = currentX;
                initialY = currentY;
                node.style.transform = ""
                node.style.top = (parseInt(node.style.top) + currentY) + 'px'
                node.style.left = (parseInt(node.style.left) + currentX) + 'px'
            }
            handleRecords()
            removeEvent()
        }
    }
    node.onclick = function (event) {
        getval(event.target)
    }
}

function getAllStylesAndIds(node) {
    let result = [];
    function traverse(node) {
        if (!node && node.id == 'workplace') return;
        node.style.top = (parseInt(node.style.top) - 24) + 'px'
        result.push(`#${node.id}{${node.style.cssText}}`);
        for (let child of node.children) {
            traverse(child);
        }
    }
    traverse(node);
    return result;
}
function removeAllStyles(node) {
    function traverse(node) {
        if (!node && node.id == 'workplace') return;
        node.removeAttribute('style')
        for (let child of node.children) {
            traverse(child);
        }
    }
    traverse(node);
}

function handleExport(type) {
    let temp = ""
    if (type == 'html') {
        let node = document.getElementById('workplace').cloneNode(true)
        let styleStr = getAllStylesAndIds(node).join('\n')
        removeAllStyles(node)
        temp = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>${styleStr}</style>
                <title>组件</title>
            </head>
            <body>
                ${node.outerHTML}
            </body>
            </html>
        `
    } else if (type == 'com') {
        let node = current.cloneNode(true)
        let styleStr = getAllStylesAndIds(node).join('\n')
        removeAllStyles(node)
        temp = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>${styleStr}</style>
                <title>组件</title>
            </head>
            <body>
                ${node.outerHTML}
            </body>
            </html>
        `
        if (!current.outerHTML) return
    } else if (type == 'vue') {
        let node = document.getElementById('workplace').cloneNode(true)
        let styleStr = getAllStylesAndIds(node).join('\n')
        removeAllStyles(node)
        temp = `
            <template>
            <div>${node.outerHTML}</div>
            </template>
            <script>export default {}</script>
            <style scoped>${styleStr}</style>
        `
    } else if (type == 'temp') {
        let node = document.getElementById('workplace').cloneNode(true)
        temp = `${node.outerHTML}`
    }
    const blob = new Blob([temp], { type: 'text/html;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    if (type == 'vue') {
        link.download = 'index.vue';
    } else {
        link.download = 'index.html';
    }
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(link.href);
}

function handleClear() {
    let node = document.getElementById('workplace')
    node.innerHTML = ''
    handleRecords()
}

function handleRemove() {
    if (!current.nodeName) return
    current.remove()
    current = {}
    handleRecords()
}

function importFile() { // 导入文件
    let import_file = getNode('import_file')
    import_file.onchange = (event) => {
        const file = event.target.files[0];
        if (!file || !file.name.includes('html')) {
            console.error('请选择html导入')
            return;
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            const content = e.target.result;
            if(content.includes('html')) {
                const node = document.createElement('div')
                node.innerHTML = content
                node.querySelectorAll('meta').forEach(item => {
                    node.removeChild(item)
                })
                node.querySelectorAll('title').forEach(item => {
                    node.removeChild(item)
                })
                getNode('workplace').innerHTML = node.innerHTML
                handleTreeNodeId(getNode('workplace'))
                for(let index in node.children) {
                    handleNode(getNode('workplace').children[index], 'import')
                }
                handleRecords()
            }else {
                getNode('workplace').outerHTML = content
                handleTreeNodeId(getNode('workplace'))
                for(let index in node.children) {
                    handleNode(getNode('workplace').children[index], 'import')
                }
                handleRecords()
            }
            closeDialog()
        };
        reader.onerror = function (e) {
            console.error('文件读取错误', e);
        };
        reader.readAsText(file)
    }
    import_file.click()
}

function handleTreeNodeId(node) { // 更新子节点id
    for(let index in node.children) {
        if(node.children[index].children > 0) {
            node.children[index].id = node.children[index].nodeName + '_' + generateRandomString(10)
            handleTreeNodeId(node.children[index])
        }else {
            node.children[index].id = node.children[index].nodeName + '_' + generateRandomString(10)
        }
    }
}

function closeDialog() {
    getNode('dialog').style.display = 'none'
}

function choseTemplate() {
    console.log(data)
    let str = ''
    data.forEach((item, index) => {
        str += `<div class="item">
                    <img style="width:auto;height:150px;" src="${item.img}">
                    <div class="title" onclick="handleTemp(${index})">${item.name}</div>
                </div>`
    })
    getNode('temp_list').innerHTML = `<div class="list">${str}</div>`
    getNode('dialog').style.display = 'unset'
}

function handleTemp(index) {
    getNode('workplace').outerHTML = data[index].val
    for(let index in getNode('workplace').children) {
        handleNode(getNode('workplace').children[index], 'import')
    }
    closeDialog()
    handleRecords()
}

function init() {
    getNode('w_height').value = window.innerHeight - 50
    getNode('w_height').onchange = (e) => {
        getNode('workplace').style.height = e.target.value + 'px'
        handleRecords()
    }
    getNode('w_width').value = window.innerWidth
    getNode('w_width').onchange = (e) => {
        getNode('workplace').style.width = e.target.value + 'px'
        handleRecords()
    }
    getNode('workplace').style.height = window.innerHeight - 50 + 'px'
    getNode('workplace').style.width = window.innerWidth + 'px'
    createNode(getNode('c_btn'))
    createNode(getNode('c_text'))
    createNode(getNode('c_input'))
    createNode(getNode('c_img'))
    createNode(getNode('c_div'))
    dragWin('config', 'config_win')
    dragWin('component', 'component_title')
    records[curIndex] = getNode('workplace').outerHTML
}

function handleRecords() {
    curIndex += 1
    records[curIndex] = getNode('workplace').outerHTML
}

function handleCancel() {
    if(curIndex == 0) {
        console.log('暂无记录')
        return
    }
    curIndex -= 1
    getNode('workplace').outerHTML = records[curIndex]
    for(let index in getNode('workplace').children) {
        handleNode(getNode('workplace').children[index])
    }
}

function handleRedo() {
    if(!records[curIndex+1] || curIndex >= records.length-1) {
        console.log('暂无记录')
        return
    }
    curIndex += 1
    getNode('workplace').outerHTML = records[curIndex]
    for(let index in getNode('workplace').children) {
        handleNode(getNode('workplace').children[index])
    }
}

init()
var current = {}

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
    current = target
    switch (target.dataset.type) { // 控制是否显示配置项
        case 'button':
        case 'text':
            init_config.com.forEach(item => {
                if (['value_content','hs_content','inputtype_content','hint_content','vs_content','path_content','arrange_content'].includes(item.id)) {
                    item.display = 'none'
                } else {
                    item.display = 'flex'
                }
            })
            break
        case 'input':
            init_config.com.forEach(item => {
                if (['title_content','path_content','ftcm_content','hs_content','vs_content','arrange_content'].includes(item.id)) {
                    item.display = 'none'
                } else {
                    item.display = 'flex'
                }
            })
            getNode('hint').value = target.placeholder
            break
        case 'img':
            init_config.com.forEach(item => {
                if (['title_content','color_content','hs_content','ftcm_content','value_content','fsize_content','fts_content',
                    'hint_content','vs_content','arrange_content','inputtype_content'].includes(item.id)) {
                    item.display = 'none'
                } else {
                    item.display = 'flex'
                }
            })
            getNode('path').value = target.src
            break
        case 'div':
            init_config.com.forEach(item => {
                if (['title_content','color_content','value_content','fts_content','fsize_content','hint_content','inputtype_content','path_content'].includes(item.id)) {
                    item.display = 'none'
                } else {
                    item.display = 'flex'
                }
            })
            getNode('path').value = target.src
            break
    }

    init_config.com.forEach(item => {
        getNode(item.id).style.display = item.display
    })

    // 配置项值写入
    getNode('title').value = target.innerHTML
    getNode('value').value = target.value
    getNode('bds').value = target.style.borderStyle
    getNode('ols').value = target.style.outlineStyle
    getNode('fts').value = target.style.fontWeight
    getNode('ftcm').value = target.style.textAlign
    getNode('zindex').value = target.style.zIndex
    getNode('height').value = target.style.height ? parseInt(target.style.height) : target.style.height
    getNode('width').value = target.style.width ? parseInt(target.style.width) : target.style.width
    getNode('padding').value = target.style.padding ? parseInt(target.style.padding) : target.style.padding
    getNode('margin').value = target.style.margin ? parseInt(target.style.margin) : target.style.margin
    getNode('x').value = target.style.left ? parseInt(target.style.left) : target.style.left
    getNode('y').value = target.style.top ? parseInt(target.style.top) : target.style.top
    getNode('fsize').value = target.style.fontSize ? parseInt(target.style.fontSize) : target.style.fontSize
    getNode('color').value = target.style.color ? rgbStringToHex(target.style.color) : '#000000'
    getNode('bg').value = target.style.background ? rgbStringToHex(target.style.background) : '#000000'
    getNode('bdw').value = target.style.borderWidth ? parseInt(target.style.borderWidth) : target.style.borderWidth
    getNode('bdc').value = target.style.borderColor ? rgbStringToHex(target.style.borderColor) : '#000000'
    getNode('bdr').value = target.style.borderRadius ? parseInt(target.style.borderRadius) : target.style.borderRadius
    getNode('olw').value = target.style.outlineWidth ? parseInt(target.style.outlineWidth) : target.style.outlineWidth
    getNode('olc').value = target.style.outlineColor ? rgbStringToHex(target.style.outlineColor) : '#000000'
    getNode('hs').value = target.style.justifyContent
    getNode('vs').value = target.style.alignItems
    getNode('arrange').value = target.style.flexDirection
}

function setVal(id) { // 更新组件配置信息
    var config_data = {
        title: () => { current.innerHTML = getNode('title').value },
        value: () => { current.value = getNode('value').value },
        height: () => { current.style.height = getNode('height').value + 'px' },
        width: () => { current.style.width = getNode('width').value + 'px' },
        x: () => { current.style.left = getNode('x').value + 'px' },
        y: () => { current.style.top = getNode('y').value + 'px' },
        fsize: () => { current.style.fontSize = getNode('fsize').value + 'px' },
        color: () => { current.style.color = getNode('color').value },
        bg: () => { current.style.background = getNode('bg').value },
        bds: () => { current.style.borderStyle = getNode('bds').value },
        bdw: () => { current.style.borderWidth = getNode('bdw').value + 'px' },
        bdc: () => { current.style.borderColor = getNode('bdc').value },
        bdr: () => { current.style.borderRadius = getNode('bdr').value + 'px' },
        ols: () => { current.style.outlineStyle = getNode('ols').value },
        olw: () => { current.style.outlineWidth = getNode('olw').value + 'px' },
        olc: () => { current.style.outlineColor = getNode('olc').value },
        fts: () => { current.style.fontWeight = getNode('fts').value },
        hint: () => { current.placeholder = getNode('hint').value },
        inputtype: () => { current.type = getNode('inputtype').value },
        path: () => { current.src = getNode('path').value },
        padding: () => { current.style.padding = getNode('padding').value + 'px' },
        margin: () => { current.style.margin = getNode('margin').value + 'px' },
        zindex: () => {
            if (getNode('zindex').value > 1000) {
                current.style.zIndex = 1000
                getNode('zindex').value = 1000
            } else {
                current.style.zIndex = getNode('zindex').value
            }
        },
        ftcm: () => { current.style.textAlign = getNode('ftcm').value },
        hs: () => { current.style.display = 'flex'; current.style.justifyContent = getNode('hs').value },
        vs: () => { current.style.display = 'flex'; current.style.alignItems = getNode('vs').value },
        arrange: () => { current.style.display = 'flex'; current.style.flexDirection = getNode('arrange').value }
    }
    config_data[id]()
}

function dragWin(flag_1, flag_2) { // 组件、配置窗口拖拽
    let xOffset = 0;
    let yOffset = 0;
    let currentX = 0;
    let currentY = 0;
    let initialX = 0;
    let initialY = 0;
    let config = getNode(flag_1)
    if(flag_1 == 'config') {
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
        new_node.id = new_node.nodeName + '_' + new Date().getTime()
        new_node.style.position = "absolute";
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
        document.onmousemove = function (event) {
            new_node.style.left = event.clientX + "px";
            new_node.style.top = event.clientY + "px";
        }
        document.onmouseup = function (ev) {
            handleNode(new_node, 'create')
            const elements = document.elementsFromPoint(ev.clientX, ev.clientY)
            if (elements[1].nodeName == 'DIV' && elements[1].id != 'workplace' && elements[1].id != 'component' && !elements.map(item => item.id).includes('config') && !new_node.contains(elements[1])) {
                getNode('workplace').removeChild(new_node)
                new_node.style.position = ''
                new_node.style.top = 0
                new_node.style.left = 0
                elements[1].appendChild(new_node)
            }
            removeEvent()
        }
    }
}

function handleCopy() { // 节点复制
    if (current == {}) return
    let cloneNode = current.cloneNode(true)
    cloneNode.id = cloneNode.nodeName + '_' + new Date().getTime()
    for(let index in cloneNode.children) { // 更新子节点id
        if(cloneNode.children[index].id) {
            setTimeout(() => {
                cloneNode.children[index].id = cloneNode.children[index].nodeName + '_' + new Date().getTime()
            },10)
        }
    }
    if(cloneNode.nodeName != 'DIV') { // 非块需绝对布局
        cloneNode.style.position = 'absolute'
        cloneNode.style.top = '24px'
    }
    getNode('workplace').appendChild(cloneNode)
    handleNode(cloneNode, 'copy')
    current == {}
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
            if(flag == 'down') {
                node.style.top = Math.abs((currentY - parseInt(node.style.top))) + 'px'
                node.style.left = Math.abs((currentX - parseInt(node.style.left))) + 'px'
                flag = 'move'
            }
        }
        document.onmouseup = function (evx) {
            if(nodeFlag == 'create') {
                const elements = document.elementsFromPoint(evx.clientX, evx.clientY)
                if (elements[1].nodeName == 'DIV' && elements[1].id != 'workplace' && elements[1].id != 'component' && !elements.map(item => item.id).includes('config') && !node.contains(elements[1])) {
                    getNode('workplace').removeChild(node)
                    node.style.position = ''
                    node.style.top = 0
                    node.style.left = 0
                    elements[1].appendChild(node)
                }
            }
            if(flag == 'move') {
                initialX = currentX;
                initialY = currentY;
                node.style.transform = ""
                node.style.top = (parseInt(node.style.top) + currentY) + 'px'
                node.style.left = (parseInt(node.style.left) + currentX) + 'px'
            }
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
    }
    const blob = new Blob([temp], { type: 'text/html;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    if(type == 'vue') {
        link.download = 'index.vue'; 
    }else {
        link.download = 'index.html';
    }
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(link.href);
}

function handleClear() {
    let node = document.getElementById('workplace')
    node.innerHTML = ''
}

function handleRemove() {
    if (current == {}) return
    current.remove()
    current == {}
}

function init() {
    getNode('workplace').style.height = window.innerHeight - 25 + 'px'
    createNode(getNode('c_btn'))
    createNode(getNode('c_text'))
    createNode(getNode('c_input'))
    createNode(getNode('c_img'))
    createNode(getNode('c_div'))
    dragWin('config', 'config_win')
    dragWin('component', 'component_title')
}

init()
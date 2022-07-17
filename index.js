
let gameStart = function() {
    // 拿到雷数的dom
    let bombNumDom = document.querySelector('.bombNum')
    bombNumDom.innerHTML = 100

    let startTime = new Date().getTime()

    let timer = setInterval(()=>{
        document.querySelector('.gameTime').innerHTML = parseInt((new Date().getTime() - startTime)/1000)
    },1000)
   
    // 已经点过的格子
    let  clickIds = []

    // 创建雷数组
    let bomb = []

    // 插旗的格子
    let flagArr = []

    // 创建格子
    for (let num = 0; num < 25; num++) {
        let line = document.createElement('div')
        line.className = 'line'
        for (let index = 0; index < 25; index++) {
            let cell = document.createElement('div')
            cell.className = 'cell'
            cell.id = num*25 + index
            cell.num = 0
            line.appendChild(cell) 
        }
        document.querySelector('.main').appendChild(line)
    }

    // 设置雷的位置
    for (let num = 0; num < 100; num++) {
        bombNum()
    }

    function bombNum() {
        let bombId = Math.floor(Math.random()*625)
        if(bomb.includes(bombId)) {
            bombNum()
        } else {
            bomb.push(bombId)
        }
    }

    // 监听格子的点击事件
    document.querySelectorAll('.cell').forEach(item => {
        item.addEventListener('click',()=>{
            let id = Number(item.id)
            item.style.backgroundColor = '#eee'
            item.style.cursor = 'default'
            if(bomb.includes(Number(item.id))) {
                document.querySelector('.alert').style.display = 'flex'
                clearInterval(timer)
                bomb.forEach((item) => {
                    let img = `<img src='./img/bomb.png' width='70%'></img>`
                    document.getElementById(item).style.backgroundColor = '#eee'
                    document.getElementById(item).innerHTML = img
                })
            } else {
                let num = showNum(item,id)
                item.innerHTML = num == 0 ? '' : num
            }
            
        })
        item.oncontextmenu=()=>{
            let img
            if(item.childNodes.length === 0 || !item.childNodes[0].src) {
                img = `<img src='./img/flag.png' width='70%'></img>`
                item.style.backgroundColor = '#eee'
                bombNumDom.innerHTML = bombNumDom.innerHTML - 1
                flagArr.push(parseInt(item.id))
            } else if(item.childNodes[0].src === 'file:///C:/Users/86186/Desktop/%E6%89%AB%E9%9B%B7/img/flag.png') {
                img = `<img src='./img/mark.png' width='70%'></img>`
                item.style.backgroundColor = '#eee'
                bombNumDom.innerHTML = parseInt(bombNumDom.innerHTML) + 1
                let index = flagArr.indexOf(parseInt(item.id))
                flagArr.splice(index,1)
            } else {
                img = ''
                item.style.backgroundColor = 'rgb(212, 255, 103)'
            }
            item.innerHTML = img

            // 最后一个雷找到
            if(flagArr.length === bomb.length) {
                let isWin = true
                flagArr.forEach(item => {
                    console.log(bomb.includes(item));
                    if(!bomb.includes(item)){
                        isWin = false
                    }
                })
                if(isWin) {
                    alert('胜利了')
                }
            }
            return false
        }
    })

    // 每一个显示的雷数
    function showNum(item,id) {
        item.style.pointerEvents = 'none'
        clickIds.push(id)
        let num = 0
        if(bomb.includes(id- 25) ) {
            num++
        } 
        if(bomb.includes(id + 25)) {
            num ++
        } 
        if(bomb.includes(id - 26)) {
            num ++
        } 
        if(bomb.includes(id + 26)) {
            num ++
        } 
        if(bomb.includes(id - 24)) {
            num ++
        } 
        if(bomb.includes(id + 24)) {
            num ++
        } 
        if(bomb.includes(id - 1)) {
            num ++
        } 
        if(bomb.includes(id + 1)) {
            num ++
        }
        if(num === 0) {
            relationCell(id - 25)
            relationCell(id + 25)
            relationCell(id - 26)
            relationCell(id + 26)
            relationCell(id - 24)
            relationCell(id + 24)
            relationCell(id - 1)
            relationCell(id + 1)
        }
        return num
    }

    // 相关联的格子
    function relationCell(id){
        console.log(id);
        // if(num === 0){
            if(!clickIds.includes(id) && id >= 0) {
                let el = document.getElementById(id)
                if(el) {
                    el.style.backgroundColor = '#eee'
                    el.style.cursor = 'default'
                    let num = showNum(el,id)
                    el.innerHTML = num == 0 ? '' : num
                }
            }
    }
}

gameStart()

// 重新开始
function restart() {
    gameStart=null
}

document.querySelector('.restart').addEventListener('click',()=>{
    location.reload();
})
document.querySelector('.btn2').addEventListener('click',()=>{
    location.reload();
})
document.querySelector('.return').addEventListener('click',()=>{
    document.querySelector('.alert').style.display = 'none'
    document.querySelectorAll('.cell').forEach(item => {
        item.style.cursor = 'default'
        item.style.pointerEvents = 'none'
    })
})
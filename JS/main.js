let diff = 0;
function mainLoop() {
    diff = (Date.now()-data.time)*data.devSpeed/1000
    data.time = Date.now()
    updateResearch()
    updateEggValueBonus()
    updateIntHatch()
    updateLayRate()
    updatePrestige()
    currentEggValue = eggValue[data.currentEgg].times(eggValueBonus)
    data.chickens = data.chickens.plus(chickenGain.times(diff/60))
    data.money = data.money.add(((currentEggValue.times(soulEggBoost)).mul(diff)).times(data.chickens.times(layRate)))
    updateHTML()
}

function changeTab(i) {
    const tabIDs = ['egg','research','contracts','settings','prestige']
    data.currentTab = i
    for(let i = 0; i < tabIDs.length; i++) {
        DOMCacheGetOrSet(`${tabIDs[i]}Tab`).style.display = i === data.currentTab ? 'flex' : 'none'
    }
}

function toggle(i) {data.settingsToggles[i] = !data.settingsToggles[i]}
function toggleBA(i) {
    const numString = ['1','5','10','20']
    data.buyAmounts[i] = data.buyAmounts[i] + 1 === 4 ? 0 : data.buyAmounts[i] + 1
    DOMCacheGetOrSet(`ba${i}`).innerHTML = `Buy Amount: ${numString[data.buyAmounts[i]]}`
}

 function createAlert(a,b,c) {
    DOMCacheGetOrSet('alertContainer').style.border = `4px solid #${c}`
    DOMCacheGetOrSet('alertTitle').innerHTML = a
    DOMCacheGetOrSet('alertContent').innerHTML = b
    DOMCacheGetOrSet('alert').style.display = 'block'
    DOMCacheGetOrSet('alertContainer').style.display = 'block'
}

function createPrompt(a,b) {
    let old_element = document.getElementById("promptButton");
    let new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    DOMCacheGetOrSet('promptInput').value = ''
    DOMCacheGetOrSet('promptContainer').style.border = `4px solid whitesmoke`
    DOMCacheGetOrSet('promptTitle').innerHTML = a
    DOMCacheGetOrSet('prompt').style.display = 'block'
    DOMCacheGetOrSet('promptContainer').style.display = 'block'
    switch(b) {
        case 0:
            document.getElementById('promptButton').addEventListener('click', () => { importSave() })
            break
    }
}
function createConfirmation(a) {
    let old_element = document.getElementById("yesConfirm");
    let new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    old_element = document.getElementById("noConfirm");
    new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    switch(a) {
        case 'prestige':
            if(data.currentEgg < 3) return
            document.getElementById('confirmContainer').style.border = `4px solid #8e3dcf`
            document.getElementById('confirmTitle').innerHTML = 'Are you sure you want to prestige?'
            document.getElementById('confirmContent').innerHTML = 'This will reset all progress for Soul Eggs'
            document.getElementById('confirm').style.display = 'block'
            document.getElementById('confirmContainer').style.display = 'block'
            document.getElementById('noConfirm').addEventListener('click', () => {closeModal(2)})
            document.getElementById('yesConfirm').addEventListener('click', () => {prestige();closeModal(2)})
            break
    }
}
function closeModal(i) {
    switch(i) {
        case 0:
            document.getElementById('alertContainer').style.display = 'none'
            document.getElementById('alert').style.display = 'none'
            break
        case 1:
            document.getElementById('promptContainer').style.display = 'none'
            document.getElementById('prompt').style.display = 'none'
            break
        case 2:
            document.getElementById('confirm').style.display = 'none'
            document.getElementById('confirmContainer').style.display = 'none'
            break
    }
    
}

window.setInterval(function() {
    mainLoop()
},50)
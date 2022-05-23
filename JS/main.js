let diff = 0;
function mainLoop() {
    diff = (Date.now()-data.time)*data.devSpeed/1000
    data.time = Date.now()
    updateResearch()
    updateEggValueBonus()
    updateIntHatch()
    updateLayRate()
    currentEggValue = eggValue[data.currentEgg].times(eggValueBonus)
    data.chickens = data.chickens.plus(chickenGain.times(diff/60))
    data.money = data.money.add((currentEggValue.mul(diff)).times(data.chickens.times(layRate)))
    updateHTML()
}

function changeTab(i) {
    const tabIDs = ['egg','research','contracts','settings']
    data.currentTab = i
    for(let i = 0; i < tabIDs.length; i++) {
        DOMCacheGetOrSet(`${tabIDs[i]}Tab`).style.display = i === data.currentTab ? 'flex' : 'none'
    }
}

function toggle(i) {data.settingsToggles[i] = !data.settingsToggles[i]}



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
    }
    
}

window.setInterval(function() {
    mainLoop()
},50)
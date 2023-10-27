function runAuto(a) {
    switch(a) {
        case 0:
            for(let i = 0; i < 10; i++)
                purchaseResearch(i)
            break
        case 1: 
            for(let i = 10; i < 20; i++)
                purchaseResearch(i)
            break
        case 2:
            if(data.money.gte(eggData[data.currentEgg].unlockReq) && data.onPlanet === false && ((data.currentEgg < 17 && !data.settingsToggles[3]) || (data.currentEgg < 18 && data.settingsToggles[3])))
                promoteEgg()
            break
        case 3:
            for(let i = 20; i < 28; i++)
                purchaseResearch(i)
            break
    }
}
const autoNames = ['Tier I-V Auto','Tier VI-X Auto','Promotion Auto','Tier XI-XIV Auto']
function updateAutomation() {
    for(let i = 0; i < data.autoActive.length; i++) {
        if(data.autoActive[i]) runAuto(i)
    }
    if(data.currentTab === 1) {
        for(let i = 0; i < 2; i++) {
            DOMCacheGetOrSet(`auto${i}`).style.display = data.epicResearch[6+i].gte(epicResearches[6+i].maxLevel) ? 'inline-block' : 'none'
            DOMCacheGetOrSet(`auto${i}`).classList = data.autoActive[i] ? 'greenButton' : 'redButton'
            DOMCacheGetOrSet(`auto${i}`).innerText = data.autoActive[i] ? `${autoNames[i]}: On` : `${autoNames[i]}: Off`
        }
        DOMCacheGetOrSet(`auto3`).style.display = data.epicResearch[10].gte(epicResearches[10].maxLevel) ? 'inline-block' : 'none'
        DOMCacheGetOrSet(`auto3`).classList = data.autoActive[3] ? 'greenButton' : 'redButton'
         DOMCacheGetOrSet(`auto3`).innerText = data.autoActive[3] ? `${autoNames[3]}: On` : `${autoNames[3]}: Off`
    }
    else if(data.currentTab === 4)
        DOMCacheGetOrSet('auto2').style.display = data.epicResearch[9].gte(epicResearches[9].maxLevel) ? 'inline-block' : 'none'
        DOMCacheGetOrSet(`auto2`).classList = data.autoActive[2] ? 'greenButton' : 'redButton'
        DOMCacheGetOrSet(`auto2`).innerText = data.autoActive[2] ? `${autoNames[2]}: On` : `${autoNames[2]}: Off`
}


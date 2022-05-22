function updateHTML() {
    //Globals
    DOMCacheGetOrSet('moneyText').textContent = `$${format(data.money)}`
    DOMCacheGetOrSet('chickensText').textContent = `Chickens: ${format(data.chickens)}`
    if(DOMCacheGetOrSet('currentEggImgHeader').getAttribute('src') !== `Imgs/${eggImgIDs[data.currentEgg]}.png`) 
        DOMCacheGetOrSet('currentEggImgHeader').setAttribute('src', `Imgs/${eggImgIDs[data.currentEgg]}.png`)
    if(data.currentTab === 0) {
        if(DOMCacheGetOrSet('currentEggImg').getAttribute('src') !== `Imgs/${eggImgIDs[data.currentEgg]}.png`) 
            DOMCacheGetOrSet('currentEggImg').setAttribute('src', `Imgs/${eggImgIDs[data.currentEgg]}.png`)
        if(DOMCacheGetOrSet('nextEggImg').getAttribute('src') !== `Imgs/${eggImgIDs[data.currentEgg+1]}.png` && (data.unlockedEgg[data.currentEgg] || data.money.gte(eggUnlockReq[data.currentEgg])) || (DOMCacheGetOrSet('nextEggImg').getAttribute('src') !== `Imgs/question.png` && !data.unlockedEgg[data.currentEgg])) 
            DOMCacheGetOrSet('nextEggImg').setAttribute('src', data.unlockedEgg[data.currentEgg] ? `Imgs/${eggImgIDs[data.currentEgg+1]}.png` : `Imgs/question.png`)
        DOMCacheGetOrSet('currentEggText').innerHTML = `Current Egg: ${eggNames[data.currentEgg]}<br>Value: $${format(eggValue[data.currentEgg])}`
        DOMCacheGetOrSet('nextEggText').innerHTML = data.unlockedEgg[data.currentEgg] || data.money.gte(eggUnlockReq[data.currentEgg]) ? `Next Egg: ${eggNames[data.currentEgg+1]}<br>Unlocked At: $${format(eggUnlockReq[data.currentEgg])}` : `Next Egg: Not Discovered<br>Discovered At: $${format(eggDiscoverReq[data.currentEgg])}`
    }
    else if(data.currentTab === 1) {

    }
    else if(data.currentTab === 2) {

    }
    else if(data.currentTab === 3) {
        DOMCacheGetOrSet(`setTog0`).innerHTML = data.settingsToggles[0] ? `Notation: Mixed Sci` : `Notation: Sci`
    }
}
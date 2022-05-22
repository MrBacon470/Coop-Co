function updateHTML() {
    //Globals
    DOMCacheGetOrSet('moneyText').textContent = `$${format(data.money)}`
    DOMCacheGetOrSet('chickensText').textContent = `Chickens: ${format(data.chickens)}`
    if(DOMCacheGetOrSet('currentEggImgHeader').getAttribute('src') !== `Imgs/${eggImgIDs[data.currentEgg]}.png`) 
        DOMCacheGetOrSet('currentEggImgHeader').setAttribute('src', `Imgs/${eggImgIDs[data.currentEgg]}.png`)
    if(data.currentTab === 0) {
        if(DOMCacheGetOrSet('currentEggImg').getAttribute('src') !== `Imgs/${eggImgIDs[data.currentEgg]}.png`) 
            DOMCacheGetOrSet('currentEggImg').setAttribute('src', `Imgs/${eggImgIDs[data.currentEgg]}.png`)
        DOMCacheGetOrSet('currentEggText').innerHTML = `Current Egg: ${eggNames[data.currentEgg]}<br>Value: $${format(eggValue[data.currentEgg])}`
        if((DOMCacheGetOrSet('nextEggImg').getAttribute('src') !== `Imgs/${eggImgIDs[data.currentEgg+1]}.png` && (data.unlockedEgg[data.currentEgg] === true || data.money.gte(eggDiscoverReq[data.currentEgg]))) 
        || (DOMCacheGetOrSet('nextEggImg').getAttribute('src') !== `Imgs/question.png` && (data.unlockedEgg[data.currentEgg] === false && data.money.lt(eggDiscoverReq[data.currentEgg]))))
            DOMCacheGetOrSet('nextEggImg').src = data.unlockedEgg[data.currentEgg] === true || data.money.gte(eggDiscoverReq[data.currentEgg]) ? `Imgs/${eggImgIDs[data.currentEgg+1]}.png` : `Imgs/question.png`
        DOMCacheGetOrSet('nextEggText').innerHTML = data.unlockedEgg[data.currentEgg] === true || data.money.gte(eggDiscoverReq[data.currentEgg]) ?
        `Next Egg: ${eggNames[data.currentEgg+1]}<br>Unlock At: $${format(eggUnlockReq[data.currentEgg])}<br>Value: $${format(eggValue[data.currentEgg+1])}` : `Next Egg: Not Discovered<br>Discover at $${format(eggDiscoverReq[data.currentEgg])}`
    }
    else if(data.currentTab === 1) {

    }
    else if(data.currentTab === 2) {

    }
    else if(data.currentTab === 3) {
        DOMCacheGetOrSet(`setTog0`).innerHTML = data.settingsToggles[0] ? `Notation: Mixed Sci` : `Notation: Sci`
    }
}
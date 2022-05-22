function updateHTML() {
    //Globals
    DOMCacheGetOrSet('moneyText').textContent = `$${format(data.money)}`
    DOMCacheGetOrSet('chickensText').textContent = `Chickens: ${format(data.chickens)}`
    if(DOMCacheGetOrSet('currentEggImgHeader').getAttribute('src') !== `Imgs/${eggImgIDs[data.currentEgg]}.png`) 
        DOMCacheGetOrSet('currentEggImgHeader').setAttribute('src', `Imgs/${eggImgIDs[data.currentEgg]}.png`)
    if(data.currentTab === 0) {
        updateEggPage()
    }
    else if(data.currentTab === 1) {

    }
    else if(data.currentTab === 2) {

    }
    else if(data.currentTab === 3) {
        DOMCacheGetOrSet(`setTog0`).innerHTML = data.settingsToggles[0] ? `Notation: Mixed Sci` : `Notation: Sci`
    }
}
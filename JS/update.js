function updateHTML() {
    //Globals
    DOMCacheGetOrSet('moneyText').textContent = `$${format(data.money)}`
    DOMCacheGetOrSet('chickensText').textContent = `Chickens: ${format(data.chickens)}`
    if(DOMCacheGetOrSet('currentEggImgHeader').getAttribute('src') !== `Imgs/${eggImgIDs[data.currentEgg]}.png`) 
        DOMCacheGetOrSet('currentEggImgHeader').setAttribute('src', `Imgs/${eggImgIDs[data.currentEgg]}.png`)
    DOMCacheGetOrSet('eggPromoteButton').classList = data.money.gte(eggUnlockReq[data.currentEgg]) ? 'unlocked' : 'locked'
    DOMCacheGetOrSet('prestigeTabButton').style.display = data.hasPrestiged === true ? 'block' : 'none'
    DOMCacheGetOrSet('prestigeButton').classList = data.currentEgg < 3 ? 'locked' : 'prestige'
    DOMCacheGetOrSet('prestigeButton').innerHTML = data.currentEgg < 3 ? 'Reach Rocket Fuel Eggs' : `Prestige: +${format(soulEggGain)} Soul Eggs`
    if(data.currentTab === 0) {
        updateEggPage()
    }
    else if(data.currentTab === 1) {
        for(let i = 0; i < commonResearchCost.length; i++)
            if(data.research[i].lt(commonResearchMaxLevel[i]))
                DOMCacheGetOrSet(`r${i}`).classList = data.money.gte(commonResearchCost[i]) ? 'unlockedResearch' : 'lockedResearch'
            else
                DOMCacheGetOrSet(`r${i}`).classList = 'maxedResearch'
        for(let i = 0; i < commonResearchNames.length; i++) {
            DOMCacheGetOrSet(`r${i}`).innerHTML = data.research[i].lt(commonResearchMaxLevel[i]) ? `${commonResearchNames[i]}<br>${commonResearchDescs[i]}<br>Level: ${format(data.research[i],0)}/${format(commonResearchMaxLevel[i],0)}<br>
            Cost: $${format(commonResearchCost[i])}` : `${commonResearchNames[i]}<br>${commonResearchDescs[i]}<br>Level: ${format(data.research[i],0)}/${format(commonResearchMaxLevel[i],0)}<br>
            Cost: [MAXED]`
        }
    }
    else if(data.currentTab === 2) {

    }
    else if(data.currentTab === 3) {
        DOMCacheGetOrSet(`setTog0`).innerHTML = data.settingsToggles[0] ? `Notation: Mixed Sci` : `Notation: Sci`
    }
    else if(data.currentTab === 4) {
        DOMCacheGetOrSet('soulEggText').innerHTML = `Soul Eggs: ${format(data.soulEggs)}<br>Best Soul Eggs: ${format(data.bestSoulEggs)}<br>Earnings Boost: x${format(soulEggBoost)}`
        for(let i = 0; i < epicResearchCost.length; i++)
            if(data.epicResearch[i].lt(epicResearchMaxLevel[i]))
                DOMCacheGetOrSet(`er${i}`).classList = data.soulEggs.gte(epicResearchCost[i]) ? 'prestige' : 'lockedResearch'
            else
                DOMCacheGetOrSet(`er${i}`).classList = 'maxedResearch'
        for(let i = 0; i < epicResearchNames.length; i++) {
            DOMCacheGetOrSet(`er${i}`).innerHTML = data.epicResearch[i].lt(epicResearchMaxLevel[i]) ? `${epicResearchNames[i]}<br>${epicResearchDescs[i]}<br>Level: ${format(data.epicResearch[i],0)}/${format(epicResearchMaxLevel[i],0)}<br>
            Cost: ${format(epicResearchCost[i])} Soul Eggs` : `${epicResearchNames[i]}<br>${epicResearchDescs[i]}<br>Level: ${format(data.research[i],0)}/${format(epicResearchMaxLevel[i],0)}<br>
            Cost: [MAXED]`
        }
    }
}
function updateHTML() {
    //Globals
    DOMCacheGetOrSet('moneyText').textContent = `$${format(data.money)}`
    DOMCacheGetOrSet('chickensText').textContent = `Chickens: ${format(data.chickens)}`
    if(!data.onPlanet) {
        if(DOMCacheGetOrSet('currentEggImgHeader').getAttribute('src') !== `${eggImgPath}${eggData[data.currentEgg].id}.png`) 
        DOMCacheGetOrSet('currentEggImgHeader').setAttribute('src', `${eggImgPath}${eggData[data.currentEgg].id}.png`)
    }   
    else {
        if(DOMCacheGetOrSet('currentEggImgHeader').getAttribute('src') !== `${eggImgPath}${planetEggImgIDs[data.currentPlanetIndex]}.png`) 
        DOMCacheGetOrSet('currentEggImgHeader').setAttribute('src', `${eggImgPath}${planetEggImgIDs[data.currentPlanetIndex]}.png`)
    }
    DOMCacheGetOrSet('eggPromoteButton').style.display = data.currentEgg >= eggData.length-1 || contractActive() || data.inPath === true || data.onPlanet === true ? 'none' : 'inline-block'
    if(data.currentEgg < eggData.length-1 && data.onPlanet === true) {
        const currentEggDiscoverReq = eggData[data.currentEgg+1].discoverReq.max(1.01)
        const currentEggUnlockReq = eggData[data.currentEgg+1].unlockReq.max(1.02)
        const nextEggDiscoverProgress = data.money.max(1).log10().div(currentEggDiscoverReq.log10())
        const nextEggUnlockProgress = data.money.div(currentEggDiscoverReq).max(1).log10().div(currentEggUnlockReq.div(currentEggDiscoverReq).log10())
        DOMCacheGetOrSet('eggPromoteButton').style.setProperty("--y", nextEggDiscoverProgress.mul(100).max(0).min(100).toString() + '%')
        DOMCacheGetOrSet('eggPromoteButton').style.setProperty("--x", nextEggUnlockProgress.mul(100).max(0).min(100).toString() + '%')
        DOMCacheGetOrSet('eggPromoteButton').classList = data.money.gte(eggData[data.currentEgg+1].unlockReq) ? 'greenButtonPromote' : 'redButtonPromote'
    }
    DOMCacheGetOrSet('tabButton4').style.display = data.hasPrestiged === true ? 'block' : 'none'
    DOMCacheGetOrSet('prestigeButton').classList = data.currentEgg < 3 ? 'redButtonHeader' : 'purpleButtonHeader'
    DOMCacheGetOrSet('prestigeButton').style.display = contractActive() || data.inPath === true || data.onPlanet === true ? 'none' : 'block'
    DOMCacheGetOrSet('prestigeButton').textContent = data.currentEgg < 3 ? 'Reach Rocket Fuel Eggs' : `Prestige: +${format(soulEggGain)} Soul Eggs`
    DOMCacheGetOrSet('newsHolder').style.display = data.settingsToggles[1] ? 'block' : 'none'
    DOMCacheGetOrSet('tabButton2').style.display = !data.onPlanet && data.unlockedContracts ? 'block' : 'none'
    //hm
    DOMCacheGetOrSet('tabButton5').style.display = data.unlockedEgg[3] === true ? 'block' : 'none'
    if(data.currentTab === 0) {
        updateEggPage()
    }
    else if(data.currentTab === 1) {
        for(let i = 0; i < commonResearchCost.length; i++)
            if(data.research[i].lt(commonResearchMaxLevel[i]))
                DOMCacheGetOrSet(`r${i}`).classList = data.money.gte(commonResearchCost[i]) ? 'greenButton' : 'redButton'
            else
                DOMCacheGetOrSet(`r${i}`).classList = 'blueButton'
        for(let i = 0; i < commonResearchNames.length; i++) {
            DOMCacheGetOrSet(`r${i}`).innerText = data.research[i].lt(commonResearchMaxLevel[i]) ? `${commonResearchNames[i]}\n${commonResearchDescs[i]}\nLevel: ${toPlaces(data.research[i],0,commonResearchMaxLevel[i].plus(1))}/${toPlaces(commonResearchMaxLevel[i],0,commonResearchMaxLevel[i].plus(1))}\nCost: $${format(commonResearchCost[i])}` : `${commonResearchNames[i]}\n${commonResearchDescs[i]}\nLevel: ${toPlaces(data.research[i],0,commonResearchMaxLevel[i].plus(1))}/${toPlaces(commonResearchMaxLevel[i],0,commonResearchMaxLevel[i].plus(1))}\nCost: [MAXED]`
        }
    }
    else if(data.currentTab === 2) {
        updateContractsHTML()
    }
    else if(data.currentTab === 3) {
        if(data.currentSubTab[0] === 0) {
            DOMCacheGetOrSet(`setTog0`).innerText = data.settingsToggles[0] ? `Notation: Mixed Sci` : `Notation: Sci`
            DOMCacheGetOrSet(`setTog1`).innerText = data.settingsToggles[1] ? `Newsticker: On` : `Newsticker: Off`
            DOMCacheGetOrSet(`setTog2`).innerText = data.settingsToggles[2] ? `Contract Notifications: On` : `Contract Notifications: Off`
            DOMCacheGetOrSet(`setTog3`).innerText = data.settingsToggles[3] ? `Auto Promote Stops at: Enlightenment` : `Auto Promote Stops at: Universe`
        }
        else if(data.currentSubTab[0] === 1) {
            updateStats()
        }
        else if(data.currentSubTab[0] === 3) {
            DOMCacheGetOrSet('help0').style.display = data.hasPrestiged ? 'block' : 'none'
            DOMCacheGetOrSet('help1').style.display = data.hasPrestiged ? 'block' : 'none'
            DOMCacheGetOrSet('help2').style.display = data.unlockedEgg[3] ? 'block' : 'none'
            DOMCacheGetOrSet('help3').style.display = data.unlockedContracts ? 'block' : 'none'
            DOMCacheGetOrSet('help4').style.display = data.hasAscended ? 'block' : 'none'
            DOMCacheGetOrSet('help5').style.display = data.hasAscended ? 'block' : 'none'
            DOMCacheGetOrSet('help6').style.display = data.hasAscended ? 'block' : 'none'
        }
    }
    else if(data.currentTab === 4) {
        DOMCacheGetOrSet('soulEggText').innerText = `Soul Eggs: ${format(data.soulEggs)}\nBest Soul Eggs: ${format(data.bestSoulEggs)}\nEarnings Boost: x${format(soulEggBoost)}`
        DOMCacheGetOrSet('prophecyEggText').innerText = `Prophecy Eggs: ${format(data.prophecyEggs)}\nSoul Boost: x${format(prophecyEggBoost)}\nContract Reward Boost: x${format(contractRewardBoost)}`
        for(let i = 0; i < epicResearchCost.length; i++)
            if(data.epicResearch[i].lt(epicResearchMaxLevel[i]))
                DOMCacheGetOrSet(`er${i}`).classList = data.soulEggs.gte(epicResearchCost[i]) ? 'purpleButton' : 'redButton'
            else
                DOMCacheGetOrSet(`er${i}`).classList = 'blueButton'
        for(let i = 0; i < epicResearchNames.length; i++) {
            DOMCacheGetOrSet(`er${i}`).innerText = data.epicResearch[i].lt(epicResearchMaxLevel[i]) ? `${epicResearchNames[i]}\n${epicResearchDescs[i]}\nLevel: ${toPlaces(data.epicResearch[i],0,epicResearchMaxLevel[i].plus(1))}/${toPlaces(epicResearchMaxLevel[i],0,epicResearchMaxLevel[i].plus(1))}\nCost: ${format(epicResearchCost[i])} Soul Eggs` : 
            `${epicResearchNames[i]}\n${epicResearchDescs[i]}\nLevel: ${toPlaces(data.epicResearch[i],0,epicResearchMaxLevel[i].plus(1))}/${toPlaces(epicResearchMaxLevel[i],0,epicResearchMaxLevel[i].plus(1))}\nCost: [MAXED]`
        }
        DOMCacheGetOrSet('prophecyEggSoftCapText').innerText = prophecyEggBoost.gte(1e6) ? `Prophecy Egg Boost is being divided by: ${format(softCapAmts[1])}` : `Prophecy Egg Boost Softcap takes effect at ${format(D(1e6))}`
    }
    else if(data.currentTab === 5) {
        updateEggspeditionsUI()
    }
    else if(data.currentTab === 7) {
       
    }
}

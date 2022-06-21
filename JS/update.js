function updateHTML() {
    //Globals
    DOMCacheGetOrSet('moneyText').textContent = `$${format(data.money)}`
    DOMCacheGetOrSet('chickensText').textContent = `Chickens: ${format(data.chickens)}`
    if(data.onPlanet === false) {
        if(DOMCacheGetOrSet('currentEggImgHeader').getAttribute('src') !== `Imgs/${eggData[data.currentEgg].id}.png`) 
        DOMCacheGetOrSet('currentEggImgHeader').setAttribute('src', `Imgs/${eggData[data.currentEgg].id}.png`)
    }   
    else {
        if(DOMCacheGetOrSet('currentEggImgHeader').getAttribute('src') !== `Imgs/${planetEggImgIDs[data.currentPlanetIndex]}.png`) 
        DOMCacheGetOrSet('currentEggImgHeader').setAttribute('src', `Imgs/${planetEggImgIDs[data.currentPlanetIndex]}.png`)
    }
    DOMCacheGetOrSet('eggPromoteButton').style.display = data.currentEgg >= eggData.length-1 || contractActive() || data.inPath === true || data.onPlanet === true ? 'none' : 'inline-block'
    if(data.currentEgg < eggData.length-1 && data.onPlanet === false) {
        const previousEggUnlockReq = data.currentEgg !== 0 ? eggData[data.currentEgg].unlockReq.max(1.01) : D(1.01)
        const currentEggUnlockReq = eggData[data.currentEgg+1].unlockReq.max(1.02)
        const nextEggDiscoverProgress = data.money.max(1).log10().div(previousEggUnlockReq.log10())
        const nextEggUnlockProgress = data.money.div(previousEggUnlockReq).max(1).log10().div(currentEggUnlockReq.div(previousEggUnlockReq).log10())
        DOMCacheGetOrSet('eggPromoteButton').style.setProperty("--y", nextEggDiscoverProgress.mul(100).max(0).min(100).toString() + '%')
        DOMCacheGetOrSet('eggPromoteButton').style.setProperty("--x", nextEggUnlockProgress.mul(100).max(0).min(100).toString() + '%')
        DOMCacheGetOrSet('eggPromoteButton').classList = data.money.gte(eggData[data.currentEgg+1].unlockReq) ? 'unlockedPromote' : 'lockedPromote'
    }
    DOMCacheGetOrSet('prestigeTabButton').style.display = data.hasPrestiged === true ? 'block' : 'none'
    DOMCacheGetOrSet('prestigeButton').classList = data.currentEgg < 3 ? 'locked' : 'prestigeHeader'
    DOMCacheGetOrSet('prestigeButton').style.display = contractActive() || data.inPath === true || data.onPlanet === true ? 'none' : 'block'
    DOMCacheGetOrSet('prestigeButton').textContent = data.currentEgg < 3 ? 'Reach Rocket Fuel Eggs' : `Prestige: +${format(soulEggGain)} Soul Eggs`
    DOMCacheGetOrSet('newsHolder').style.display = data.settingsToggles[1] ? 'block' : 'none'
    DOMCacheGetOrSet('contractButton').style.display = data.inPath === false ? 'block' : 'none'
    DOMCacheGetOrSet('enlightenmentTabButton').style.display = data.unlockedEgg[17] === true ? 'block' : 'none'
    DOMCacheGetOrSet('contractButton').style.display = data.onPlanet === false ? 'block' : 'none'
    DOMCacheGetOrSet('eggpeditionTabButton').style.display = data.unlockedContracts === true ? 'block' : 'none'
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
            DOMCacheGetOrSet(`r${i}`).innerHTML = data.research[i].lt(commonResearchMaxLevel[i]) ? `${commonResearchNames[i]}<br>${commonResearchDescs[i]}<br>Level: ${toPlaces(data.research[i],0,commonResearchMaxLevel[i].plus(1))}/${toPlaces(commonResearchMaxLevel[i],0,commonResearchMaxLevel[i].plus(1))}<br>
            Cost: $${format(commonResearchCost[i])}` : `${commonResearchNames[i]}<br>${commonResearchDescs[i]}<br>Level: ${toPlaces(data.research[i],0,commonResearchMaxLevel[i].plus(1))}/${toPlaces(commonResearchMaxLevel[i],0,commonResearchMaxLevel[i].plus(1))}<br>
            Cost: [MAXED]`
        }
    }
    else if(data.currentTab === 2) {
        if(data.unlockedContracts === false && data.currentEgg >= 5)
            data.unlockedContracts = true
            if(data.generatedContracts === false && data.unlockedContracts === true){
                for(let i = 0; i < 3; i++) {
                    generateContract(i)
                }
                data.generatedContracts = true
            }
        DOMCacheGetOrSet('contractHiddenText').style.display = data.unlockedContracts === false ? 'block' : 'none'
        DOMCacheGetOrSet('contractHolder').style.display = data.unlockedContracts === true ? 'block' : 'none'
        if(data.unlockedContracts === true) {
            for(let i = 0; i < data.contracts.length; i++) {
                DOMCacheGetOrSet(`contract${i}Img`).setAttribute('src', data.contracts[i].image)
                DOMCacheGetOrSet(`contract${i}Header`).textContent = data.contractActive[i] ? `Contract-0${i+1} | ${data.contracts[i].title} - [ACTIVE]` : `Contract-0${i+1} | ${data.contracts[i].title}`
                DOMCacheGetOrSet(`contract${i}Description`).textContent = data.contracts[i].description
                DOMCacheGetOrSet(`contract${i}Reward`).textContent = `Reward: ${format(data.contracts[i].reward)} ${data.contracts[i].rewardType}`
                DOMCacheGetOrSet(`contract${i}Goal`).textContent = `Goal: $${format(data.contracts[i].goal)}`
                DOMCacheGetOrSet(`contract${i}Button`).textContent = data.contractActive[i] ? `Leave Contract` : `Start Contract`
            }
        }
    }
    else if(data.currentTab === 3) {
        if(data.currentSubTab[0] === 0) {
            DOMCacheGetOrSet(`setTog0`).innerHTML = data.settingsToggles[0] ? `Notation: Mixed Sci` : `Notation: Sci`
            DOMCacheGetOrSet(`setTog1`).innerHTML = data.settingsToggles[1] ? `Newsticker: On` : `Newsticker: Off`
            DOMCacheGetOrSet(`setTog2`).innerHTML = data.settingsToggles[2] ? `Contract Notifications: On` : `Contract Notifications: Off`
        }
        else if(data.currentSubTab[0] === 1) {
            updateStats()
        }
    }
    else if(data.currentTab === 4) {
        DOMCacheGetOrSet('soulEggText').innerHTML = `Soul Eggs: ${format(data.soulEggs)}<br>Best Soul Eggs: ${format(data.bestSoulEggs)}<br>Earnings Boost: x${format(soulEggBoost)}`
        DOMCacheGetOrSet('prophecyEggText').innerHTML = `Prophecy Eggs: ${format(data.prophecyEggs)}<br>Soul Boost: x${format(prophecyEggBoost)}<br>Contract Reward Boost: x${format(contractRewardBoost)}`
        for(let i = 0; i < epicResearchCost.length; i++)
            if(data.epicResearch[i].lt(epicResearchMaxLevel[i]))
                DOMCacheGetOrSet(`er${i}`).classList = data.soulEggs.gte(epicResearchCost[i]) ? 'prestige' : 'lockedResearch'
            else
                DOMCacheGetOrSet(`er${i}`).classList = 'maxedResearch'
        for(let i = 0; i < epicResearchNames.length; i++) {
            DOMCacheGetOrSet(`er${i}`).innerHTML = data.epicResearch[i].lt(epicResearchMaxLevel[i]) ? `${epicResearchNames[i]}<br>${epicResearchDescs[i]}<br>Level: ${toPlaces(data.epicResearch[i],0,epicResearchMaxLevel[i].plus(1))}/${toPlaces(epicResearchMaxLevel[i],0,epicResearchMaxLevel[i].plus(1))}<br>
            Cost: ${format(epicResearchCost[i])} Soul Eggs` : `${epicResearchNames[i]}<br>${epicResearchDescs[i]}<br>Level: ${toPlaces(data.epicResearch[i],0,epicResearchMaxLevel[i].plus(1))}/${toPlaces(epicResearchMaxLevel[i],0,epicResearchMaxLevel[i].plus(1))}<br>
            Cost: [MAXED]`
        }
    }
    else if(data.currentTab === 5) {
        updateEggspeditionsUI()
    }
    else if(data.currentTab === 6) {
        for(let i = 0; i < 5; i++) {
            DOMCacheGetOrSet('enlight'+i).innerText = `Enlightenment ${enlightenmentNumerals[i]}\n${enlightenmentNames[i]}\n\n${enlightenmentDescs[i]}\nCost: ${format(enlightenmentCosts[i])} Knowledge\nLevel: ${format(data.enlightenments[i])}`
        }
        DOMCacheGetOrSet('knowledgeText').innerText = data.inPath === true ? `Knowledge: ${format(data.knowledge)}\n+${format(knowledgeGain)}/s` : `Knowledge: ${format(data.knowledge)}`
        if(data.onPlanet === false)
            DOMCacheGetOrSet('enlightenmentButton').innerText = data.inPath === true ? `Leave The Path` : `Enter The Path`
        else
            DOMCacheGetOrSet('enlightenmentButton').innerText = 'Can\'t Enter Path While On Eggspedition'
    }
    else if(data.currentTab === 7) {
        
    }
}

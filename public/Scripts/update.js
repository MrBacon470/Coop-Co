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
    DOMCacheGetOrSet('eggPromoteButton').style.display = data.currentEgg >= eggData.length-1 || contractActive() || data.onPlanet === true ? 'none' : 'inline-block'
    if(data.currentEgg < eggData.length-1 && !data.onPlanet) {
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
    DOMCacheGetOrSet('prestigeButton').style.display = contractActive() || data.onPlanet === true ? 'none' : 'block'
    DOMCacheGetOrSet('prestigeButton').textContent = data.currentEgg < 3 ? 'Reach Rocket Fuel Eggs' : `Prestige: +${format(soulEggGain)} Soul Eggs`
    DOMCacheGetOrSet('newsHolder').style.display = data.settingsToggles[1] ? 'block' : 'none'
    DOMCacheGetOrSet('tabButton2').style.display = !data.onPlanet && data.unlockedContracts ? 'block' : 'none'
    DOMCacheGetOrSet('ascensionButton').style.display = data.currentEgg >= 18 ? 'block' : 'none'
    DOMCacheGetOrSet('ascensionButton').classList = data.currentEgg >= 18 && data.money.gte(1e45) ? 'orangeButtonHeader' : 'redButtonHeader'
    DOMCacheGetOrSet('ascensionButton').innerText = data.currentEgg >= 18 && data.money.gte(1e45) ? `Ascend: +${format(knowleggGain)} Knowleggs` : `Ascend: ($${format(data.money)}/${format(1e45)})`
    //hm
    DOMCacheGetOrSet('tabButton5').style.display = data.unlockedEgg[3] === true ? 'block' : 'none'
    if(data.currentTab === 0) {
        updateEggPage()
    }
    else if(data.currentTab === 1) {
        for(let i = 0; i < commonResearchCost.length; i++)
            if(data.research[i].lt(commonResearches[i].maxLevel)) {
                if(data.buyAmounts[0] === 0)
                    DOMCacheGetOrSet(`r${i}`).classList = data.money.gte(commonResearchCostDisplay[i]) ? 'greenButton' : 'redButton'
                else if(data.buyAmounts[0] !== 0 && data.money.gte(commonResearchCost[i]))
                    DOMCacheGetOrSet(`r${i}`).classList = data.money.gte(commonResearchCostDisplay[i]) ? 'greenButton' : 'yellowButton'
                else
                    DOMCacheGetOrSet(`r${i}`).classList = 'redButton'
            }
            else
                DOMCacheGetOrSet(`r${i}`).classList = 'blueButton'
        for(let i = 0; i < commonResearches.length; i++) {
            //const buyAmountNums = [1,5,10,20]
            //const researchMaxCost = data.research[i].gte(commonResearches[i].maxLevel) ? D(0) : calculateResearchMaxCost(commonResearches[i].baseCost,data.research[i],commonResearches[i].maxLevel,D(buyAmountNums[data.buyAmounts[0]]),data.money)
            DOMCacheGetOrSet(`r${i}`).innerText = data.research[i].lt(commonResearches[i].maxLevel) ? `${commonResearches[i].name}\n${commonResearches[i].desc}\nLevel: ${toPlaces(data.research[i],0,commonResearches[i].maxLevel.plus(1))}/${toPlaces(commonResearches[i].maxLevel,0,commonResearches[i].maxLevel.plus(1))}\nCost: $${format(commonResearchCostDisplay[i])}` : `${commonResearches[i].name}\n${commonResearches[i].desc}\nLevel: ${toPlaces(data.research[i],0,commonResearches[i].maxLevel.plus(1))}/${toPlaces(commonResearches[i].maxLevel,0,commonResearches[i].maxLevel.plus(1))}\nCost: [MAXED]`
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
            // DOMCacheGetOrSet('help4').style.display = data.hasAscended ? 'block' : 'none'
            // DOMCacheGetOrSet('help5').style.display = data.hasAscended ? 'block' : 'none'
            // DOMCacheGetOrSet('help6').style.display = data.hasAscended ? 'block' : 'none'
        }
    }
    else if(data.currentTab === 4) {
        DOMCacheGetOrSet('soulEggText').innerText = `Soul Eggs: ${format(data.soulEggs)}\nBest Soul Eggs: ${format(data.bestSoulEggs)}\nEarnings Boost: x${format(soulEggBoost)}`
        DOMCacheGetOrSet('prophecyEggText').innerText = `Prophecy Eggs: ${format(data.prophecyEggs)}\nSoul Boost: x${format(prophecyEggBoost)}\nContract Reward Boost: x${format(contractRewardBoost)}`
        for(let i = 0; i < epicResearchCost.length; i++)
            if(data.epicResearch[i].lt(epicResearches[i].maxLevel)) {
                if(data.buyAmounts[1] === 0)
                    DOMCacheGetOrSet(`er${i}`).classList = data.soulEggs.gte(epicResearchCostDisplay[i]) ? 'purpleButton' : 'redButton'
                else if(data.buyAmounts[1] !== 0 && data.soulEggs.gte(epicResearchCost[i]))
                    DOMCacheGetOrSet(`er${i}`).classList = data.soulEggs.gte(epicResearchCostDisplay[i]) ? 'purpleButton' : 'yellowButton'
                else
                    DOMCacheGetOrSet(`er${i}`).classList = 'redButton'
            }
            else
                DOMCacheGetOrSet(`er${i}`).classList = 'blueButton'
        for(let i = 0; i < epicResearches.length; i++) {
            DOMCacheGetOrSet(`er${i}`).innerText = data.epicResearch[i].lt(epicResearches[i].maxLevel) ? `${epicResearches[i].name}\n${epicResearches[i].desc}\nLevel: ${toPlaces(data.epicResearch[i],0,epicResearches[i].maxLevel.plus(1))}/${toPlaces(epicResearches[i].maxLevel,0,epicResearches[i].maxLevel.plus(1))}\nCost: ${format(epicResearchCostDisplay[i])} Soul Eggs` : 
            `${epicResearches[i].name}\n${epicResearches[i].desc}\nLevel: ${toPlaces(data.epicResearch[i],0,epicResearches[i].maxLevel.plus(1))}/${toPlaces(epicResearches[i].maxLevel,0,epicResearches[i].maxLevel.plus(1))}\nCost: [MAXED]`
        }
        DOMCacheGetOrSet('prophecyEggSoftCapText').innerText = prophecyEggBoost.gte(1e6) ? `Prophecy Egg Boost is being divided by: ${format(softCapAmts[1])}` : `Prophecy Egg Boost Softcap takes effect at ${format(D(1e6))}`
    }
    else if(data.currentTab === 5) {
        updateEggspeditionsUI()
    }
    else if(data.currentTab === 7) {
       updateAscensionHTML()
    }
}

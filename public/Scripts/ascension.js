let artifactSelector = {status: false, id: -1}
let gemSelector = {status: false, id: -1}
let artifactHoverIndex = {id: -1, type: null}
let harvesterHoverIndex = -1
let harvesterMaxLevel = 5

const harvesterUpgradeCost = [D(1e3),D(2.5e3),D(5e3),D(7.5e3),D(1e4),D(2.5e4),D(5e4),D(7.5e4),D(1e5),D(2.5e5),D(5e5),D(7.5e5),D(1e6),D(2.5e6),D(5e6),D(7.5e6),D(1e7),D(2.5e7),D(5e7)]
const itemYields = []

const harvesterItems = [
    {
        artifactID: 0,
        gemID: 0,
    },
    {
        artifactID: 4,
        gemID: 3,
    },
    {
        artifactID: 8,
        gemID: 6,
    },
    {
        artifactID: 12,
        gemID: 9,
    },
    {
        artifactID: 16,
        gemID: 12,
    },
    {
        artifactID: 20,
        gemID: 15,
    },
]
// Crafting Item Object {id,type,count}
const artifacts = [
    {
        name: 'Eggcell \'85',
        img: '/Images/Artifacts/Eggcell-85.png',
        crafting: [],
        effect: D(0.1)
    },
    {
        name: 'Quickeggn',
        img: '/Images/Artifacts/Quickeggn.png',
        crafting: [
            {id:0,type:'artifact',count:D(10)},
        ],
        effect: D(0.35)
    },
    {
        name: 'Egg Books',
        img: '/Images/Artifacts/Egg-Books.png',
        crafting: [
            {id:0,type:'artifact',count:D(14)},
        ],
        effect: D(0.75)
    },
    {
        name: 'Turbo Hatch',
        img: '/Images/Artifacts/Turbo-Hatch.png',
        crafting: [
            {id:0,type:'artifact',count:D(18)},
        ],
        effect: D(2.0)
    },
    {
        name: 'Tattered Scroll',
        img: '/Images/Artifacts/Tattered-Scroll.png',
        crafting: [],
        effect: D(.5)
    },
    {
        name: 'Prophetic Scroll',
        img: '/Images/Artifacts/Prophetic-Scroll.png',
        crafting: [
            {id:4,type:'artifact',count:D(10)},
        ],
        effect: D(1.2)
    },
    {
        name: 'Gilded Scroll',
        img: '/Images/Artifacts/Gilded-Scroll.png',
        crafting: [
            {id:5,type:'artifact',count:D(14)},
        ],
        effect: D(14)
    },
    {
        name: 'Enlightened Scroll',
        img: '/Images/Artifacts/Enlightened-Scroll.png',
        crafting: [
            {id:6,type:'artifact',count:D(18)},
        ],
        effect: D(250)
    },
    {
        name: 'Prophetic Book',
        img: '/Images/Artifacts/Prophetic-Book.png',
        crafting: [],
        effect: D(0.0025)
    },
    {
        name: 'Gilded Book',
        img: '/Images/Artifacts/Gilded-Book.png',
        crafting: [
            {id:8,type:'artifact',count:D(10)},
        ],
        effect: D(0.005)
    },
    {
        name: 'Ascended Book',
        img: '/Images/Artifacts/Ascended-Book.png',
        crafting: [
            {id:9,type:'artifact',count:D(14)},
        ],
        effect: D(0.008)
    },
    {
        name: 'Knowlegg Book',
        img: '/Images/Artifacts/Knowlegg-Book.png',
        crafting: [
            {id:10,type:'artifact',count:D(18)},
        ],
        effect: D(0.012)
    },
    {
        name: 'Torn Lantern',
        img: '/Images/Artifacts/Torn-Lantern.png',
        crafting: [],
        effect: D(0.25)
    },
    {
        name: 'Soul Lantern',
        img: '/Images/Artifacts/Soul-Lantern.png',
        crafting: [
            {id:12,type:'artifact',count:D(10)},
        ],
        effect: D(1)
    },
    {
        name: 'Gilded Lantern',
        img: '/Images/Artifacts/Gilded-Lantern.png',
        crafting: [
            {id:13,type:'artifact',count:D(14)},
        ],
        effect: D(5)
    },
    {
        name: 'Prestige Lantern',
        img: '/Images/Artifacts/Prestige-Lantern.png',
        crafting: [
            {id:14,type:'artifact',count:D(18)},
        ],
        effect: D(14)
    },
    {
        name: 'Hammer',
        img: '/Images/Artifacts/Hammer.png',
        crafting: [],
        effect: D(0.05)
    },
    {
        name: 'Hammer & Pick',
        img: '/Images/Artifacts/Hammer-Pick.png',
        crafting: [
            {id:16,type:'artifact',count:D(10)},
        ],
        effect: D(0.14)
    },
    {
        name: 'Hammer & Wrench',
        img: '/Images/Artifacts/Hammer-Wrench.png',
        crafting: [
            {id:17,type:'artifact',count:D(14)},
        ],
        effect: D(0.25)
    },
    {
        name: 'Crane',
        img: '/Images/Artifacts/Crane.png',
        crafting: [
            {id:18,type:'artifact',count:D(18)},
        ],
        effect: D(0.4)
    },
    {
        name: 'Ancient Analysis',
        img: '/Images/Artifacts/Alembic.png',
        crafting: [],
        effect: D(0.05)
    },
    {
        name: 'Basic Analysis',
        img: '/Images/Artifacts/Chemical-Tube.png',
        crafting: [
            {id:20,type:'artifact',count:D(10)},
        ],
        effect: D(0.15)
    },
    {
        name: 'Advanced Analysis',
        img: '/Images/Artifacts/Production-Tube.png',
        crafting: [
            {id:21,type:'artifact',count:D(14)},
        ],
        effect: D(0.22)
    },
    {
        name: 'Superior Analysis',
        img: '/Images/Artifacts/Microscope.png',
        crafting: [
            {id:2,type:'artifact',count:D(18)},
        ],
        effect: D(0.60)
    }
]

const gems = [
    {
        name: 'Knowledge Fragment',
        img: '/Images/Gems/Knowledge-Fragment.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Knowledge Shard',
        img: '/Images/Gems/Knowledge-Shard.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Knowledge Gem',
        img: '/Images/Gems/Knowledge-Gem.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Tachyon Fragment',
        img: '/Images/Gems/Tachyon-Fragment.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Tachyon Shard',
        img: '/Images/Gems/Tachyon-Shard.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Tachyon Gem',
        img: '/Images/Gems/Tachyon-Gem.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Antimatter Fragment',
        img: '/Images/Gems/Antimatter-Fragment.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Antimatter Shard',
        img: '/Images/Gems/Antimatter-Shard.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Antimatter Gem',
        img: '/Images/Gems/Antimatter-Gem.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Quantum Fragment',
        img: '/Images/Gems/Quantum-Fragment.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Quantum Shard',
        img: '/Images/Gems/Quantum-Shard.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Quantum Gem',
        img: '/Images/Gems/Quantum-Gem.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Soul Fragment',
        img: '/Images/Gems/Soul-Fragment.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Soul Shard',
        img: '/Images/Gems/Soul-Shard.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Soul Gem',
        img: '/Images/Gems/Soul-Gem.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Ascension Fragment',
        img: '/Images/Gems/Ascension-Fragment.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Ascension Shard',
        img: '/Images/Gems/Ascension-Shard.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Ascension Gem',
        img: '/Images/Gems/Ascension-Gem.png',
        crafting: [],
        effect: D(0)
    },
]

const ingredients = []

let knowleggGain = D(1)
let legendaryResearchCosts = new Array(legendaryResearches.length).fill(D(0))

function updateAscensionHTML() {
    if(data.currentSubTab[1] === 0) {
        DOMCacheGetOrSet(`knowleggText`).innerText = `${format(data.knowlegg)} Knowleggs`
        for(let i = 0; i < legendaryResearches.length; i++) {
            DOMCacheGetOrSet(`lr${i}`).innerText = `${legendaryResearches[i].name}\n${legendaryResearches[i].description}\nLevel: ${toPlaces(data.legendaryResearch[i],0,data.legendaryResearch[i].plus(1))}/${toPlaces(legendaryResearches[i].max,0,legendaryResearches[i].max.plus(1))}\nCost: ${data.legendaryResearch[i].gte(legendaryResearches[i].max) ? '[MAXED]' : `${format(legendaryResearchCostDisplay[i])} Knowleggs`}`
            if(data.legendaryResearch[i].lt(legendaryResearches[i].max))
                DOMCacheGetOrSet(`lr${i}`).classList = data.knowlegg.gte(legendaryResearchCostDisplay[i]) ? 'orangeButton' : 'redButton'
            else
                DOMCacheGetOrSet(`lr${i}`).classList = 'blueButton'
        }
    }
    else if(data.currentSubTab[1] === 1) {
        for(let i = 0; i < 6; i++) {
            DOMCacheGetOrSet(`harvesterText${i}`).innerText = data.harvesters[i].level === 0 ? `Construct Harvester to Use` : `${planetNames[i]} Harvester - Level ${data.harvesters.level}`
            DOMCacheGetOrSet('harvesterUpgradeButton').style.display = harvesterHoverIndex !== -1 ? 'block' : 'none'
            if(harvesterHoverIndex !== -1) {
                if(data.harvesters[harvesterHoverIndex].level < 20 || data.harvesters[harvesterHoverIndex].level < harvesterMaxLevel) {
                    DOMCacheGetOrSet('harvesterUpgradeButton').innerText = data.harvesters[harvesterHoverIndex].level === 0 ? `Construct Harvester` : `Upgrade Harvester`
                    DOMCacheGetOrSet('harvesterUpgradeButton').classList = data.planetData[harvesterHoverIndex].chickens.gte(harvesterUpgradeCost[data.harvesters[harvesterHoverIndex].level]) ? 'greenButton' : 'redButton'
                }
                else {
                    DOMCacheGetOrSet('harvesterUpgradeButton').innerText = '[MAX LEVEL]'
                    DOMCacheGetOrSet('harvesterUpgradeButton').classList = 'blueButton'
                }
                
            }
        }
    }
    else if(data.currentSubTab[1] === 2) {
        for(let i = 0; i < data.unlockedArtifact.length; i++) {
            if(data.unlockedArtifact[i] && DOMCacheGetOrSet(`artifactSlot${i}`).getAttribute('src') !== artifacts[i].img)
                DOMCacheGetOrSet(`artifactSlot${i}`).src = artifacts[i].img
            else if(!data.unlockedArtifact[i] && DOMCacheGetOrSet(`artifactSlot${i}`).getAttribute('src') !== '/Images/QuestionMark.png')
                DOMCacheGetOrSet(`artifactSlot${i}`).src = '/Images/QuestionMark.png'
        }

        for(let i = 0; i < data.unlockedGem.length; i++) {
            if(data.unlockedGem[i] && DOMCacheGetOrSet(`gemSlot${i}`).getAttribute('src') !== gems[i].img)
                DOMCacheGetOrSet(`gemSlot${i}`).src = artifacts[i].img
            else if(!data.unlockedGem[i] && DOMCacheGetOrSet(`gemSlot${i}`).getAttribute('src') !== '/Images/QuestionMark.png')
                DOMCacheGetOrSet(`gemSlot${i}`).src = '/Images/QuestionMark.png'
        }
        if(artifactHoverIndex.id !== -1) {
            DOMCacheGetOrSet(`artifactCraftingInfo`).innerText = generateArtifactCraftingInfo(artifactHoverIndex.id,artifactHoverIndex.type)
            DOMCacheGetOrSet(`artifactCraftingButton`).classList = canCraftArtifact(artifactHoverIndex.id,artifactHoverIndex.type) ? 'greenButton' : 'redButton'
            DOMCacheGetOrSet(`artifactCraftingButton`).innerText = canCraftArtifact(artifactHoverIndex.id,artifactHoverIndex.type) ? 'Craft!' : 'Can\'t Craft'
        }
        DOMCacheGetOrSet(`artifactCraftingButton`).style.display = artifactHoverIndex.id !== -1 ? 'block' : 'none'
    }
    else if(data.currentSubTab[1] === 3) {

    }
}

function updateAscension() {
    knowleggGain = data.money.gte(1e45) && data.currentEgg === 18 ? (data.bestRunMoney.div(1e45).log(20)).times(data.legendaryResearch[0].gt(0) ? D(5).times(data.legendaryResearch[i]) : D(1)) : D(1)
    knowleggGain.times(planetBoosts[2])
}

function ascend() {
    if(data.money.lt(1e45) || data.currentEgg !== 18) return
    data.hasAscended = true
    data.stats.ascensions[2] = data.stats.ascensions[1]
    data.stats.ascensions[1] = data.stats.ascensions[0]
    data.stats.ascensions[0] = knowleggGain
    data.stats.timeInAscension = data.stats.timeInPrestige = D(0)

    data.knowlegg = data.knowlegg.plus(knowleggGain)
    if(data.knowlegg.gt(data.bestKnowlegg)) data.bestKnowlegg = data.stats.bestKnowleggs = data.knowlegg
    data.soulEggs = D(0)
    data.bestSoulEggs = D(0)
    data.prophecyEggs = D(0)
    for(let i = 0; i < 6; i++) {
        if(i !== 2)
        data.planetData[i] = {money: D(0), chickens: D(0), research: new Array(28).fill(D(0))}
    }
    data.research = new Array(28).fill(D(0))
    for(let i = 0; i < 6; i++)
        data.epicResearch[i] = D(0)
    for(let i; i < 3; i++)
        generateContract(i)
    eggValueBonus = D(1)
    chickenGain = D(0)
    layRate = D(1)
    data.chickens = D(0)
    data.money = D(0)
    data.bestRunMoney = D(0)
    data.currentEgg = 0
}

function updateAscensionHoverText(id,type) {
    artifactHoverIndex.id = id
    artifactHoverIndex.type = type
    const selectedEls = document.getElementsByClassName('artifactSlot-selected')

    for(let i = 0; i < selectedEls.length; i++)
        selectedEls[i].classList = 'artifactSlot'
    
    

    switch(type) {
        case 'artifact':
            DOMCacheGetOrSet(`artifactSlot${id}`).classList = 'artifactSlot-selected'
            if(id < 4)
                DOMCacheGetOrSet('artifactHoverText').innerText = !data.unlockedArtifact[id] ? 'Not Discovered Yet' : `${artifacts[id].name} | +${toPlaces(artifacts[i].effect.times(100),2,(artifacts[i].effect.times(100)).plus(1))}% Egg Value\n You have: ${format(data.artifacts[id])}`
            else if(id >= 4 && id < 8)
                DOMCacheGetOrSet('artifactHoverText').innerText = !data.unlockedArtifact[id] ? 'Not Discovered Yet' : `${artifacts[id].name} | +${toPlaces(artifacts[i].effect.times(100),2,(artifacts[i].effect.times(100)).plus(1))}% Enlightenment Egg Value\n You have: ${format(data.artifacts[id])}`
            else if(id >= 8 && id < 12)
                DOMCacheGetOrSet('artifactHoverText').innerText = !data.unlockedArtifact[id] ? 'Not Discovered Yet' : `${artifacts[id].name} | +${toPlaces(artifacts[i].effect.times(100),2,(artifacts[i].effect.times(100)).plus(1))}% Prophecy Egg Bonus\n You have: ${format(data.artifacts[id])}`
            else if(id >= 12 && id < 16)
                DOMCacheGetOrSet('artifactHoverText').innerText = !data.unlockedArtifact[id] ? 'Not Discovered Yet' : `${artifacts[id].name} | +${toPlaces(artifacts[i].effect.times(100),2,(artifacts[i].effect.times(100)).plus(1))}% Soul Egg Bonus\n You have: ${format(data.artifacts[id])}`
            else if(id >= 16 && id < 20)
                DOMCacheGetOrSet('artifactHoverText').innerText = !data.unlockedArtifact[id] ? 'Not Discovered Yet' : `${artifacts[id].name} | +${toPlaces(artifacts[i].effect.times(100),2,(artifacts[i].effect.times(100)).plus(1))}% Internal Hatchery\n You have: ${format(data.artifacts[id])}`
            else if(id >= 20 && id < 24)
                DOMCacheGetOrSet('artifactHoverText').innerText = !data.unlockedArtifact[id] ? 'Not Discovered Yet' : `${artifacts[id].name} | -${toPlaces(artifacts[i].effect.times(100),2,(artifacts[i].effect.times(100)).plus(1))}% Research Cost\n You have: ${format(data.artifacts[id])}`
            break
        case 'gem':
            DOMCacheGetOrSet(`gemSlot${id}`).classList = 'artifactSlot-selected'
            if(id < 3)
                DOMCacheGetOrSet('artifactHoverText').innerText = !data.unlockedGem[id] ? 'Not Discovered Yet' : `${gems[id].name} | +${toPlaces(gems[i].effect.times(100),2,(gems[i].effect.times(100)).plus(1))}% of Host Effect\n You have: ${format(data.gems[id])}`
            else if(id >= 3 && id < 6)
                DOMCacheGetOrSet('artifactHoverText').innerText = !data.unlockedGem[id] ? 'Not Discovered Yet' : `${gems[id].name} | +${toPlaces(gems[i].effect.times(100),2,(gems[i].effect.times(100)).plus(1))}% Hatchery Rate\n You have: ${format(data.gems[id])}`
            else if(id >= 6 && id < 9)
                DOMCacheGetOrSet('artifactHoverText').innerText = !data.unlockedGem[id] ? 'Not Discovered Yet' : `${gems[id].name} | +${toPlaces(gems[i].effect.times(100),2,(gems[i].effect.times(100)).plus(1))}% Egg Value\n You have: ${format(data.gems[id])}` 
            else if(id >= 9 && id < 12)
                DOMCacheGetOrSet('artifactHoverText').innerText = !data.unlockedGem[id] ? 'Not Discovered Yet' : `${gems[id].name} | +${toPlaces(gems[i].effect.times(100),2,(gems[i].effect.times(100)).plus(1))}% Egg Laying Rate\n You have: ${format(data.gems[id])}`
            else if(id >= 12 && id < 15)
                DOMCacheGetOrSet('artifactHoverText').innerText = !data.unlockedGem[id] ? 'Not Discovered Yet' : `${gems[id].name} | +${toPlaces(gems[i].effect.times(100),2,(gems[i].effect.times(100)).plus(1))}% Soul Egg Bonus\n You have: ${format(data.gems[id])}`
            else if(id >= 15 && id < 18)
                DOMCacheGetOrSet('artifactHoverText').innerText = !data.unlockedGem[id] ? 'Not Discovered Yet' : `${gems[id].name} | +${toPlaces(gems[i].effect.times(100),2,(gems[i].effect.times(100)).plus(1))}% Prophecy Egg Bonus\n You have: ${format(data.gems[id])}`

            break
        default:
            console.warn('Invalid Type Used')
            break
    }
}

function updateHarvesterHoverText(id) {
    harvesterHoverIndex = id

    const selectedEls = document.getElementsByClassName('harvesterImg-selected')

    for(let i = 0; i < selectedEls.length; i++)
        selectedEls[i].classList = 'harvesterImg-inactive'

    DOMCacheGetOrSet(`harvesterImg${id}`).classList = 'harvesterImg-selected'

   
    if(harvesterHoverIndex === -1)     
        DOMCacheGetOrSet('harvesterHoverText').innerText = 'Hover over Harvester to see info'
    else
        DOMCacheGetOrSet('harvesterHoverText').innerText = data.harvesters[id].level === 0 ? `Harvester Construction Cost: ${format(harvesterUpgradeCost[data.harvesters[id].level])} ${planetEggNames[id]} Chickens` :
        `${planetNames[id]} Harvester | Level: ${data.harvesters[id].level}/${harvesterMaxLevel}\n${getHarvesterYieldString(id)}\n${data.harvesters[i].level < 20 || data.harvesters[i].level >= harvesterMaxLevel ? `Upgrade to Level ${data.harvesters[id].level+1}: ${format(harvesterUpgradeCost[data.harvesters[id].level])} ${planetEggNames[id]} Chickens` : '[MAX LEVEL]'}`
    //`${planetNames[harvesterHoverIndex]} Harvester | Level ${data.harvesters[harvesterHoverIndex].level}\n` + `Harvestable Artifact: ${artifactName} | Yield: 0-0\n` 
   // + (data.harvesters[harvesterHoverIndex].level < 5 ? '' : `Harvestable Gem: ${gemName} | Yield: 0-0\n`) +  ``
}

function activateArtifactSelect(slotID) {

}

function activateGemSelect(slotID) {

}

function selectArtifact(slotID,artifactID) {
    if(artifactAlreadyActive(artifactID)) {
        generateNotification('Artifact is already active','error')
        return
    }
}

function selectGem(slotID,gemID) {

}

function artifactAlreadyActive(artifactID) {
    for(let i = 0; i < data.activeArtifacts.length; i++) {
        if(data.activeArtifacts[i] === artifactID) return true;
    }
    return false;
}

function generateArtifactCraftingInfo(artifactID,type) {
    let str
    if((type === 'artifact' && data.unlockedArtifact[artifactID]) || (type === 'gem' && data.unlockedGem[artifactID]))
        str = `${type === 'artifact' ? artifacts[artifactID].name : gems[artifactID].name}\n`
    else {
        return `${type === 'artifact' ? 'Artifact' : 'Gem'} not unlocked :(`
    }
    
    if(artifacts[artifactID].crafting.length === 0 && type === 'artifact') return str + 'Item Not Craftable'
    if(gems[artifactID].crafting.length === 0 && type === 'gem') return str + 'Item Not Craftable'

    switch(type) {
        case 'artifact':
                const artifactCraftArr = artifacts[artifactID].crafting
                for(let i = 0; i < artifactCraftArr.length; i++) {
                    if(craftingArr[i].type === 'artifact') {
                        str += `${artifacts[artifactCraftArr[i].id].name}: x${toPlaces(artifactCraftArr[i].count,0,artifactCraftArr[i].count.plus(1))} (${toPlaces(data.artifacts[artifactCraftArr[i].id].count,0,data.artifacts[artifactCraftArr[i].id].count.plus(1))})\n`
                    }
                    else {
                        str += `${gems[artifactCraftArr[i].id].name}: x${toPlaces(artifactCraftArr[i].count,0,artifactCraftArr[i].count.plus(1))} (${toPlaces(data.gems[artifactCraftArr[i].id].count,0,data.gems[artifactCraftArr[i].id].count.plus(1))})\n`
                    }
                }
            break
        case 'gem':
            const gemCraftArr = gems[artifactID].crafting
            for(let i = 0; i < gemCraftArr.length; i++) {
                    str += `${gems[gemCraftArr[i].id].name}: x${toPlaces(gemCraftArr[i].count,0,gemCraftArr[i].count.plus(1))} (${toPlaces(data.gems[gemCraftArr[i].id].count,0,data.gems[gemCraftArr[i].id].count.plus(1))})\n`
            }
            break
        default:
            console.error('Invalid Input in generateArtifactCraftingInfo()')
            return null
    }
    return str
}

function canCraftArtifact(artifactID,type) {
    if(type !== 'artifact' && type !== 'gem') {console.error('Invalid Type in canCraftArtifact()'); return false}
    if((type === 'artifact' && !data.unlockedArtifact[artifactID]) || (type === 'gem' && !data.unlockedGem[artifactID])) return false

    let craftingArr = type === 'artifact' ? artifacts[artifactID].crafting : gems[artifactID].crafting
    if(craftingArr.length === 0) return false

    for(let i = 0; i < craftingArr.length; i++) {
        if(craftingArr[i].type === 'artifact') {
            if(data.artifacts[craftingArr[i].id].lt(craftingArr[i].count)) return false
        }
        else {
            if(data.gems[craftingArr[i].id].lt(craftingArr[i].count)) return false
        }
    }

    return true
}

function upgradeHarvester() {
    if(harvesterHoverIndex === -1) return
    else if(data.harvesters[harvesterHoverIndex].level === 20 || data.harvesters[harvesterHoverIndex].level === harvesterMaxLevel) return
    else if(data.planetData[harvesterHoverIndex].chickens.lt(harvesterUpgradeCost[data.harvesters[harvesterHoverIndex].level])) return
    data.harvesters[harvesterHoverIndex].level++
    data.planetData[harvesterHoverIndex].chickens = data.planetData[harvesterHoverIndex].chickens.sub(harvesterUpgradeCost[data.harvesters[harvesterHoverIndex].level])
    updateHarvesterHoverText(harvesterHoverIndex);
}

function getHarvesterYieldString(id) {
    
}
let artifactSelector = {status: false, id: -1}
let gemSelector = {status: false, id: -1}
let artifactHoverIndex = -1
let harvesterHoverIndex = -1

const harvesterUpgradeCost = []
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
        crafting: [],
        effect: D(0.35)
    },
    {
        name: 'Egg Books',
        img: '/Images/Artifacts/Egg-Books.png',
        crafting: [],
        effect: D(0.75)
    },
    {
        name: 'Turbo Hatch',
        img: '/Images/Artifacts/Turbo-Hatch.png',
        crafting: [],
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
        crafting: [],
        effect: D(1.2)
    },
    {
        name: 'Gilded Scroll',
        img: '/Images/Artifacts/Gilded-Scroll.png',
        crafting: [],
        effect: D(14)
    },
    {
        name: 'Enlightened Scroll',
        img: '/Images/Artifacts/Enlightened-Scroll.png',
        crafting: [],
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
        crafting: [],
        effect: D(0.005)
    },
    {
        name: 'Ascended Book',
        img: '/Images/Artifacts/Ascended-Book.png',
        crafting: [],
        effect: D(0.008)
    },
    {
        name: 'Knowlegg Book',
        img: '/Images/Artifacts/Knowlegg-Book.png',
        crafting: [],
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
        crafting: [],
        effect: D(1)
    },
    {
        name: 'Gilded Lantern',
        img: '/Images/Artifacts/Gilded-Lantern.png',
        crafting: [],
        effect: D(5)
    },
    {
        name: 'Prestige Lantern',
        img: '/Images/Artifacts/Prestige-Lantern.png',
        crafting: [],
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
        crafting: [],
        effect: D(0.14)
    },
    {
        name: 'Hammer & Wrench',
        img: '/Images/Artifacts/Hammer-Wrench.png',
        crafting: [],
        effect: D(0.25)
    },
    {
        name: 'Crane',
        img: '/Images/Artifacts/Crane.png',
        crafting: [],
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
        crafting: [],
        effect: D(0.15)
    },
    {
        name: 'Advanced Analysis',
        img: '/Images/Artifacts/Production-Tube.png',
        crafting: [],
        effect: D(0.22)
    },
    {
        name: 'Superior Analysis',
        img: '/Images/Artifacts/Microscope.png',
        crafting: [],
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
        for(let i = 0; i < legendaryResearches.length; i++) {
            DOMCacheGetOrSet(`lr${i}`).innerText = `${legendaryResearches[i].name}\n${legendaryResearches[i].description}\nLevel: ${toPlaces(data.legendaryResearch[i],0,data.legendaryResearch[i].plus(1))}/${toPlaces(legendaryResearches[i].max,0,legendaryResearches[i].max.plus(1))}\nCost: ${data.legendaryResearch[i].gte(legendaryResearches[i].max) ? '[MAXED]' : `${format(legendaryResearchCosts[i])} Knowleggs`}`
            if(data.legendaryResearch[i].lt(legendaryResearches[i].max))
                DOMCacheGetOrSet(`lr${i}`).classList = data.knowlegg.gte(legendaryResearchCosts[i]) ? 'orangeButton' : 'redButton'
            else
                DOMCacheGetOrSet(`lr${i}`).classList = 'blueButton'
        }
    }
    else if(data.currentSubTab[1] === 1) {
        
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
    }
    else if(data.currentSubTab[1] === 3) {

    }
}

function updateAscension() {
    for(let i = 0; i < legendaryResearches.length; i++) {
        legendaryResearchCosts[i] = legendaryResearches[i].base.times(Decimal.pow(1.15, data.legendaryResearch[i]))
    }
    knowleggGain = data.money.gte(1e45) && data.currentEgg >= 18 ? (data.money.div(1e45).log(20)).times(data.legendaryResearch[0].gt(0) ? D(5).times(data.legendaryResearch[i]) : D(1)) : D(1)
}

function ascend() {

}

function updateAscensionHoverText(id,type) {
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

    const artifactName = harvesterHoverIndex === -1 ? '' : `${artifacts[(harvesterItems[harvesterHoverIndex].artifactID) + Math.floor(data.harvesters[harvesterHoverIndex].level/ 5)].name}`
    let gemName = ''
    if(harvesterHoverIndex !== -1)
        gemName = data.harvesters[harvesterHoverIndex].level < 5 ? '' : `${gems[(harvesterItems[harvesterHoverIndex].gemID) + (Math.floor(data.harvesters[harvesterHoverIndex].level - 5/ 5))].name}`
    DOMCacheGetOrSet('harvesterHoverText').innerText = harvesterHoverIndex === -1 ? 'Hover over Harvester to see info' : 
    `${planetNames[harvesterHoverIndex]} Harvester | Level ${data.harvesters[harvesterHoverIndex].level}\n` + `Harvestable Artifact: ${artifactName} | Yield: 0-0\n` 
    + (data.harvesters[harvesterHoverIndex].level < 5 ? '' : `Harvestable Gem: ${gemName} | Yield: 0-0\n`) +  ``
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
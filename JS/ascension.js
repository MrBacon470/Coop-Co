const gemObjs = [
    {
        name: 'Normal Gem',
        src: 'Imgs/Gems/gem.png',
    },
    {
        name: 'Prestige Gem',
        src: 'Imgs/Gems/prestigeGem.png',
    },
    {
        name: 'Ascension Gem',
        src: 'Imgs/Gems/ascensionGem.png',
    },
    {
        name: 'Tachyon Gem',
        src: 'Imgs/Gems/tachyonGem.png',
    },
    {
        name: 'Dark Matter Gem',
        src: 'Imgs/Gems/darkmatterGem.png',
    },
    {
        name: 'Antimatter Gem',
        src: 'Imgs/Gems/antimatterGem.png',
    },
    {
        name: 'Nebula Gem',
        src: 'Imgs/Gems/nebulaGem.png',
    },
    {
        name: 'Soul Gem',
        src: 'Imgs/Gems/soulGem.png',
    },
    {
        name: 'Void Gem',
        src: 'Imgs/Gems/voidGem.png',
    },
    {
        name: 'Quantum Gem',
        src: 'Imgs/Gems/quantumGem.png',
    },
    {
        name: 'Universe Gem',
        src: 'Imgs/Gems/universeGem.png',
    },
    {
        name: 'Knowledge Gem',
        src: 'Imgs/Gems/knowledgeGem.png',
    },
    {
        name: 'Χ Gem',
        src: 'Imgs/Gems/chiGem.png',
    },
    {
        name: 'Ψ Gem',
        src: 'Imgs/Gems/psiGem.png',
    },
    {
        name: 'Ω Gem',
        src: 'Imgs/Gems/omegaGem.png',
    },
    {
        name: 'Singularity Gem',
        src: 'Imgs/Gems/singularityGem.png',
    }
]

const legendaryResearchObjs = [
    {
        name: 'Enlightened Thinkers',
        description: '5x more knowlegg gain',
        max: D(20),
        base: D(5)
    },
    {
        name: 'Ascended Contracting',
        description: 'Unlock Ascension Contracts',
        max: D(1),
        base: D(100)
    },
]

let knowleggGain = D(1)
let legendaryResearchCosts = new Array(legendaryResearchObjs.length).fill(D(0))

function updateAscensionHTML() {
    if(data.currentSubTab[2] === 0) {
        for(let i = 0; i < legendaryResearchObjs.length; i++) {
            DOMCacheGetOrSet(`lr${i}`).innerText = `${legendaryResearchObjs[i].name}\n${legendaryResearchObjs[i].description}\nLevel: ${toPlaces(data.legendaryResearch[i],0,data.legendaryResearch[i].plus(1))}/${toPlaces(legendaryResearchObjs[i].max,0,legendaryResearchObjs[i].max.plus(1))}\nCost: ${data.legendaryResearch[i].gte(legendaryResearchObjs[i].max) ? '[MAXED]' : `${format(legendaryResearchCosts[i])} Knowleggs`}`
            if(data.legendaryResearch[i].lt(legendaryResearchObjs[i].max))
                DOMCacheGetOrSet(`lr${i}`).classList = data.knowlegg.gte(legendaryResearchCosts[i]) ? 'orangeButton' : 'redButton'
            else
                DOMCacheGetOrSet(`lr${i}`).classList = 'blueButton'
        }
    }
    else if(data.currentSubTab[2] === 1) {

    }
}

function updateAscension() {
    for(let i = 0; i < legendaryResearchObjs.length; i++) {
        legendaryResearchCosts[i] = legendaryResearchObjs[i].base.times(Decimal.pow(1.15, data.legendaryResearch[i]))
    }
    knowleggGain = data.money.gte(1e45) && data.currentEgg >= 18 ? (data.money.div(1e45).log(20)).times(data.legendaryResearch[0].gt(0) ? D(5).times(data.legendaryResearch[i]) : D(1)) : D(1)
}

function ascend() {

}
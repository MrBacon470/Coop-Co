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

const artifacts = [

]

const gems = [

]

const ingredients = [
    
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
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
    {
        name: 'Eggcell \'85',
        img: '/Images/Artifacts/Eggcell-85.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Quickeggn',
        img: '/Images/Artifacts/Quickeggn.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Egg Books',
        img: '/Images/Artifacts/Egg-Books.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Turbo Hatch',
        img: '/Images/Artifacts/Turbo-Hatch.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Tattered Scroll',
        img: '/Images/Artifacts/Tattered-Scroll.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Prophetic Scroll',
        img: '/Images/Artifacts/Prophetic-Scroll.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Gilded Scroll',
        img: '/Images/Artifacts/Gilded-Scroll.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Enlightened Scroll',
        img: '/Images/Artifacts/Enlightened-Scroll.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Prophetic Book',
        img: '/Images/Artifacts/Prophetic-Book.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Gilded Book',
        img: '/Images/Artifacts/Gilded-Book.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Ascended Book',
        img: '/Images/Artifacts/Ascended-Book.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Knowlegg Book',
        img: '/Images/Artifacts/Knowlegg-Book.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Torn Lantern',
        img: '/Images/Artifacts/Torn-Lantern.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Soul Lantern',
        img: '/Images/Artifacts/Soul-Lantern.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Gilded Lantern',
        img: '/Images/Artifacts/Gilded-Lantern.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Prestige Lantern',
        img: '/Images/Artifacts/Prestige-Lantern.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Hammer',
        img: '/Images/Artifacts/Hammer.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Hammer & Pick',
        img: '/Images/Artifacts/Hammer-Pick.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Hammer & Wrench',
        img: '/Images/Artifacts/Hammer-Wrench.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Crane',
        img: '/Images/Artifacts/Crane.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Ancient Analysis',
        img: '/Images/Artifacts/Alembic.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Basic Analysis',
        img: '/Images/Artifacts/Chemical-Tube.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Advanced Analysis',
        img: '/Images/Artifacts/Production-Tube.png',
        crafting: [],
        effect: D(0)
    },
    {
        name: 'Superior Analysis',
        img: '/Images/Artifacts/Microscope.png',
        crafting: [],
        effect: D(0)
    }
]

const gems = [
    {
        name: '',
        img: '',
        crafting: [],
        effect: D(0)
    }
]

const ingredients = [
    {
        name: '',
        img: '',
        crafting: []
    }
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
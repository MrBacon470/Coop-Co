//Common Section
const commonResearches = [
    {
      name: 'Comfortable Nests',
      desc: 'Egg Laying Rate +10%',
      maxLevel: D(50),
      baseCost: D(0.5)
    },
    {
      name: 'Nutritional Supplements',
      desc: 'Egg Value +25%',
      maxLevel: D(40),
      baseCost: D(1.16)
    },
    {
      name: 'Internal Hatcheries',
      desc: '+8 Chickens/min',
      maxLevel: D(10),
      baseCost: D(1836)
    },
    {
      name: 'Padded Packaging',
      desc: 'Earnings Per Egg +25%',
      maxLevel: D(30),
      baseCost: D(454986)
    },
    {
      name: 'Bigger Eggs',
      desc: 'Doubles Egg Value',
      maxLevel: D(1),
      baseCost: D(1351894)
    },
    {
      name: 'Internal Hatchery Upgrades',
      desc: '+20 Chickens/min',
      maxLevel: D(10),
      baseCost: D(16029660)
    },
    {
      name: 'USDE Prime Certification',
      desc: 'Triples Egg Value',
      maxLevel: D(1),
      baseCost: D(32.318e12)
    },
    {
      name: 'Hen House A/C',
      desc: 'Egg Laying Rate +5%',
      maxLevel: D(50),
      baseCost: D(2986194)
    },
    {
      name: 'Super-Feed™ Diet',
      desc: 'Egg Value +25%',
      maxLevel: D(35),
      baseCost: D(530.5e6)
    },
    {
      name: 'Internal Hatchery Expansion',
      desc: '+40 Chickens/min',
      maxLevel: D(15),
      baseCost: D(2.886e12)
    },
    {
      name: 'Improved Genetics',
      desc: 'Egg Laying Rate & Egg Value + 15%',
      maxLevel: D(30),
      baseCost: D(7.488e12)
    },
    {
      name: 'Shell Fortification',
      desc: 'Egg Value +15%',
      maxLevel: D(60),
      baseCost: D(14.738e15)
    },
    {
      name: 'Even Bigger Eggs',
      desc: 'Doubles Egg Value',
      maxLevel: D(5),
      baseCost: D(28.608e18)
    },
    {
      name: 'Internal Hatchery Expansion',
      desc: '+100 Chickens/min',
      maxLevel: D(30),
      baseCost: D(3.30094e17)
    },
    {
      name: 'Genetic Purification',
      desc: 'Egg Value +10%',
      maxLevel: D(100),
      baseCost: D(1.12026e20)
    },
    {
      name: 'Machine Learning Incubators',
      desc: '+20 Chickens/min',
      maxLevel: D(250),
      baseCost: D(1.4517e20)
    },
    {
      name: 'Time Compression',
      desc: 'Egg Laying Rate +10%',
      maxLevel: D(20),
      baseCost: D(3.4476e25)
    },
    {
      name: 'Graviton Coating',
      desc: 'Double Egg Density (Value)',
      maxLevel: D(7),
      baseCost: D(7.8316e24)
    },
    {
      name: 'Crystalline Shelling',
      desc: 'Egg Value +25%',
      maxLevel: D(100),
      baseCost: D(2.4606e30)
    },
    {
      name: 'Neural Linking',
      desc: '+200 Chickens/min',
      maxLevel: D(30),
      baseCost: D(7.02028e29)
    },
    {
      name: 'Telepathic Will',
      desc: 'Egg Quality (Value) +25%',
      maxLevel: D(50),
      baseCost: D(7.02028e29)
    },
    {
      name: 'Atomic Purification',
      desc: 'Egg Value +10%',
      maxLevel: D(3),
      baseCost: D(4.43336e36)
    },
    {
      name: 'Multiversal Layering',
      desc: '10x Egg Value',
      maxLevel: D(50),
      baseCost: D(2.2392e42)
    },
    {
      name: 'Timeline Diversion',
      desc: 'Egg Laying Rate +2%',
      maxLevel: D(25),
      baseCost: D(2.3596e47)
    },
    {
      name: 'Eggsistor Miniaturization',
      desc: 'Egg Value +5%',
      maxLevel: D(100),
      baseCost: D(1.7914e47)
    },
    {
      name: 'Matter Reconfiguration',
      desc: 'Increases Egg Value +1%',
      maxLevel: D(15),
      baseCost: D(1.5902e51)
    },
    {
      name: 'Timeline Splicing',
      desc: '10x Egg Value',
      maxLevel: D(16),
      baseCost: D(1.6564e66)
    },
    {
      name: 'Relativity Optimization',
      desc: 'Egg Laying Rate +10%',
      maxLevel: D(14),
      baseCost: D(1.4474e54)
    }
];
const epicResearches = [
    {
      name: 'Epic Internal Hatcheries',
      desc: 'Increase Chicken Gain by 5%',
      maxLevel: D(20),
      baseCost: D(100)
    },
    {
      name: 'Lab Upgrade',
      desc: 'Reduce Research Costs by 5%',
      maxLevel: D(10),
      baseCost: D(1e5)
    },
    {
      name: 'Soul Food',
      desc: 'Increase Soul Egg Bonus by 1%',
      maxLevel: D(140),
      baseCost: D(1e6)
    },
    {
      name: 'Prestige Bonus',
      desc: '+10% More Soul Eggs per Prestige',
      maxLevel: D(20),
      baseCost: D(5e6)
    },
    {
      name: 'Epic Comfy Nests',
      desc: 'Egg Laying Rate +5%',
      maxLevel: D(20),
      baseCost: D(1e3)
    },
    {
      name: 'Accounting Tricks',
      desc: 'Increase Egg Value by 5%',
      maxLevel: D(20),
      baseCost: D(1e3)
    },
    {
      name: 'Tier I-V Automator',
      desc: 'Automate Tier I-V Research',
      maxLevel: D(1),
      baseCost: D(1e4)
    },
    {
      name: 'Tier VI-X Automator',
      desc: 'Automate Tier VI-X Research',
      maxLevel: D(1),
      baseCost: D(1e7)
    },
    {
      name: 'Start with 1 Chicken',
      desc: 'Start with 1 Chicken on any Reset',
      maxLevel: D(1),
      baseCost: D(1e6)
    },
    {
      name: 'Promotion Automator',
      desc: 'Automatic Promotions',
      maxLevel: D(1),
      baseCost: D(1e9)
    },
    {
      name: 'Tier XI-XIV Automator',
      desc: 'Automated Tier XI-XIV Research',
      maxLevel: D(1),
      baseCost: D(1e9)
    }
];
let commonResearchCost = []
let epicResearchCost = []

for(let i = 0; i < commonResearches.length; i++) {
    if(data.onPlanet === false)
        commonResearchCost[i] = (commonResearches[i].baseCost.sub(commonResearches[i].baseCost.times(D(0.05).times(data.epicResearch[1])))).times(Decimal.pow(1.15, data.research[i]))
    else if(data.onPlanet === true && data.currentPlanetIndex === 0)
        commonResearchCost[i] = ((commonResearches[i].baseCost).sub(commonResearches[i].baseCost.times(D(0.05).times(data.epicResearch[1])))).times(Decimal.pow(1.35, data.research[i]))
    DOMCacheGetOrSet(`r${i}`).innerText = `${commonResearches[i].name}\n${commonResearches[i].desc}\nLevel: ${format(data.research[i],0)}/${format(commonResearches[i].maxLevel,0)}\n
    Cost: $${format(commonResearchCost[i])}`

}

function purchaseResearch(i) {
    const buyAmountNums = [1,5,10,20]
    updateResearch();
    let buyAmount = data.research[i].plus(buyAmountNums[data.buyAmounts[0]]).lte(commonResearches[i].maxLevel) ? buyAmountNums[data.buyAmounts[0]] : commonResearches[i].maxLevel.minus(data.research[i]);
    // prevent going over max level
    let costMult = Decimal.pow(1.15, buyAmount).minus(1).div(0.15);
    //calculate cost of buying buyAmount researches
    if(data.money.lt(commonResearchCost[i].times(costMult))) {
        buyAmount = Math.floor(data.money.div(commonResearchCost[i]).times(0.15).plus(1).log(1.15).toNumber());
        //reverse function to get maximum buyAmount
        costMult = Decimal.pow(1.15, buyAmount).minus(1).div(0.15);
    }
    data.money = data.money.sub(commonResearchCost[i].times(costMult));
    data.research[i] = data.research[i].add(buyAmount);
    updateHTML();
}
function updateResearch() {
    for(let i = 0; i < commonResearches.length; i++) {
        if(data.onPlanet === false)
            commonResearchCost[i] = (commonResearches[i].baseCost.sub(commonResearches[i].baseCost.times(D(0.05).times(data.epicResearch[1])))).times(Decimal.pow(1.15, data.research[i]))
        else if(data.onPlanet === true && data.currentPlanetIndex === 0)
            commonResearchCost[i] = ((commonResearches[i].baseCost).sub(commonResearches[i].baseCost.times(D(0.05).times(data.epicResearch[1])))).times(Decimal.pow(1.35, data.research[i]))
    }
        
    for(let i = 0; i < epicResearches.length; i++)
        epicResearchCost[i] = epicResearches[i].baseCost.times(Decimal.pow(1.25, data.epicResearch[i]))
}
//Epic Section

for(let i = 0; i < epicResearches.length; i++) {
    epicResearchCost[i] = epicResearches[i].baseCost.times(Decimal.pow(1.25, data.epicResearch[i]))
    DOMCacheGetOrSet(`er${i}`).innerText = `${epicResearches[i].name}\n${epicResearches[i].desc}\nLevel: ${format(data.epicResearch[i],0)}/${format(epicResearches[i].maxLevel,0)}\n
    Cost: ${format(epicResearchCost[i])} Soul Eggs`
}
function purchaseEpicResearch(i) {
    const buyAmountNums = [1,5,10,20]
    for(let j = 0; j < buyAmountNums[data.buyAmounts[1]]; j++) {
        updateResearch()
        if(data.soulEggs.gte(epicResearchCost[i]) && data.epicResearch[i].lt(epicResearchMaxLevel[i])) {
            data.soulEggs = data.soulEggs.sub(epicResearchCost[i])
            data.epicResearch[i] = data.epicResearch[i].add(1)
            updateHTML()
        }
        else
            break
    }
}

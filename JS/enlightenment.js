const enlightenmentNames = ['Light','Stable','Moment','Wealth','Dark']
const enlightenmentDescs = ['Increase Knowledge Gain by 5%','Increase Prophecy Egg Effects by 10%','Soul Egg Gain +15%','Increase Egg Value by 10%','Increase Knowledge Gain by 25%']
const enlightenmentNumerals = ['I', 'II', 'III', 'IV', 'V']
const enlightenmentBaseCosts = [D(10),D(50),D(100),D(500),D(1e3)]
let enlightenmentCosts = [D(0),D(0),D(0),D(0),D(0)]
let knowledgeGain = D(1)

function updateEnlightenment() {
    for(let i = 0; i < data.enlightenments.length; i++) {
        enlightenmentCosts[i] = enlightenmentBaseCosts[i].times(Decimal.pow(1.05,data.enlightenments[i]))
    }
    knowledgeGain = Decimal.sqrt(data.money.times(100))
    knowledgeGain = knowledgeGain.times(D(1).plus(data.enlightenments[0].times(0.05)))
    knowledgeGain = knowledgeGain.times(D(1).plus(data.enlightenments[4].times(0.25)))
    knowledgeGain = knowledgeGain.times(planetBoosts[2])
    if(data.inPath === true) {
        data.currentEgg = 18
        data.knowledge = data.knowledge.plus(knowledgeGain.times(diff))
    }
}

function enterPath() {
    if(data.onPlanet === true || contractActive()) return
    if(data.inPath === true) {
        data.inPath = false
        data.stats.prestiges[2] = data.stats.prestiges[1]
        data.stats.prestiges[1] = data.stats.prestiges[0]
        data.stats.prestiges[0] = soulEggGain
        data.stats.timeInPrestige = D(0)
        data.soulEggs = data.soulEggs.plus(soulEggGain)
        data.hasPrestiged = true
        data.research = new Array(28).fill(D(0))
        eggValueBonus = D(1)
        chickenGain = D(0)
        layRate = D(1)
        data.chickens = D(0)
        data.money = D(0)
        data.bestRunMoney = D(0)
        data.currentEgg = 0
    }
    else {
        data.stats.prestiges[2] = data.stats.prestiges[1]
        data.stats.prestiges[1] = data.stats.prestiges[0]
        data.stats.prestiges[0] = soulEggGain
        data.stats.timeInPrestige = D(0)
        data.soulEggs = data.soulEggs.plus(soulEggGain)
        data.hasPrestiged = true
        data.research = new Array(28).fill(D(0))
        eggValueBonus = D(1)
        chickenGain = D(0)
        layRate = D(1)
        data.chickens = D(0)
        data.money = D(0)
        data.bestRunMoney = D(0)
        data.inPath = true
        data.currentEgg = 18
        eggValueBonus = D(1)
        chickenGain = D(0)
        layRate = D(1)
        data.chickens = D(0)
        data.money = D(0)
    }
}

function purchaseEnlightenment(i) {
    const buyAmountNums = [1,5,10,20]
    for(let j = 0; j < buyAmountNums[data.buyAmounts[2]]; j++) {
        if(data.knowledge.lt(enlightenmentCosts[i])) return
        data.knowledge = data.knowledge.minus(enlightenmentCosts[i])
        data.enlightenments[i] = data.enlightenments[i].plus(1)
        updateEnlightenment()
    }
}

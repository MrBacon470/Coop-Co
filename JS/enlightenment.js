const enlightenmentNames = ['Light','Stable','Moment','Wealth','Dark']
const enlightenmentDescs = ['Increase Knowledge Gain by 5%','Increase Prophecy Egg Effects by 10%','Soul Egg Gain +15%','Increase Egg Value by 10%','Increase Knowledge Gain by 25%']
const enlightenmentNumerals = ['I', 'II', 'III', 'IV', 'V']
const enlightenmentBaseCosts = [D(10),D(500),D(1e3),D(1e6),D(1e8)]
let enlightenmentCosts = [D(0),D(0),D(0),D(0),D(0)]
let knowledgeGain = D(1)

function updateEnlightenment() {
    for(let i = 0; i < data.enlightenments.length; i++) {
        enlightenmentCosts[i] = enlightenmentBaseCosts[i].times(Decimal.pow(1.15,data.enlightenments[i]))
    }
    knowledgeGain = D(1)
    knowledgeGain = knowledgeGain.times(D(1).plus(data.enlightenments[0].times(0.05)))
    knowledgeGain = knowledgeGain.times(D(1).plus(data.enlightenments[4].times(0.25)))
    if(data.inPath === true) {
        data.currentEgg = 18
        data.knowledge = data.knowledge.plus(knowledgeGain.times(diff))
    }
}

function enterPath() {
    if(data.onPlanet === true) return
    if(data.inPath === true) {
        prestige()
        data.inPath = false
        data.currentEgg = 0
    }
    else {
        prestige()
        data.inPath = true
        data.currentEgg = 18
    }
}

function purchaseEnlightenment(i) {
    if(data.knowledge.lt(enlightenmentCosts[i])) return
    data.knowledge = data.knowledge.minus(enlightenmentCosts[i])
    data.enlightenments[i] = data.enlightenments[i].plus(1)
}

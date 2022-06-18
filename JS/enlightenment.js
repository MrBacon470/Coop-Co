const enlightenmentNames = ['Light','Stable','Moment','Wealth','Dark']
const enlightenmentDescs = ['Increase Knowledge Gain by 1%','Increase Prophecy Egg Effects by 5%','','Increase Egg Value by 10%','']
const enlightenmentNumerals = ['I', 'II', 'III', 'IV', 'V']
const enlightenmentBaseCosts = [D(10),D(500),D(1e3),D(1e6),D(1e8)]
const enlightenmentCosts = [D(0),D(0),D(0),D(0),D(0)]
let knowledgeGain = D(0.01)

function updateEnlightenment() {
    for(let i = 0; i < data.enlightenments.length; i++) {
        enlightenmentCosts[i] = enlightenmentBaseCosts[i].times(Decimal.pow(1.15,data.enlightenments[i]))
    }
    knowledgeGain = knowledgeGain.times(D(1).plus(data.enlightenments.times(0.01)))
    if(data.inPath === true) {
        data.currentEgg = 18
        data.knowledge = data.knowledge.plus(knowledgeGain.times(diff))
    }
}

function enterPath() {
    if(data.inPath === true) {
        data.inPath === false
        data.currentEgg = 0
    }
    else {
        data.inPath === true
        data.currentEgg = 18
    }
}

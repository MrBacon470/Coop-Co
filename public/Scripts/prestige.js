let soulEggGain = D(0)
let soulEggBoost = D(0)
let prophecyEggBoost = D(0)
let contractRewardBoost = D(1)
let contractGoalBoost = D(1)
let softCapAmts = [D(0),D(0)]
function updatePrestige() {
    if(data.bestSoulEggs.lt(data.soulEggs)) data.bestSoulEggs = data.soulEggs
    const soulAvg = (data.soulEggs.plus(data.bestSoulEggs)).div(2)
    soulEggGain = data.currentEgg >= 3 ? Decimal.floor(Decimal.sqrt(Decimal.sqrt(data.bestRunMoney)).times((D(0.1).times(data.epicResearch[3])).plus(1))) : D(0)
    soulEggGain = soulEggGain.times(planetBoosts[3])
    prophecyEggBoost = Decimal.pow(1.015, data.prophecyEggs)
    //console.log(formatSci(prophecyEggBoost))
    softCapAmts[1] = prophecyEggBoost
    if(prophecyEggBoost.gte(1e6)) prophecyEggBoost = prophecyEggBoost.div(1e6).log10().add(1).mul(1e6)
    softCapAmts[1] = softCapAmts[1].div(prophecyEggBoost)
    prophecyEggBoost = prophecyEggBoost.times(getActiveArtifactBoost(2))
    prophecyEggBoost = prophecyEggBoost.times(getActiveGemBoost(5))
    //console.log(formatSci(prophecyEggBoost))
    
    soulEggBoost = D(1).plus(soulAvg.times(D(0.01).plus(D(0.01).times(data.epicResearch[2]))).times(prophecyEggBoost))
    soulEggBoost = soulEggBoost.times(getActiveArtifactBoost(3))
    soulEggBoost = soulEggBoost.times(getActiveGemBoost(4))
    contractRewardBoost = D(1).plus(Decimal.sqrt(data.prophecyEggs.times(D(0.45))))
    contractGoalBoost = D(1).plus(Decimal.sqrt(data.prophecyEggs.times(D(0.5))))
    if(data.inPath === true || (data.onPlanet === true && data.currentPlanetIndex === 3)) {
        soulEggBoost = D(1)
        prophecyEggBoost = D(1)
        contractRewardBoost = D(1)
    }
}

function prestige() {
    if(data.currentEgg < 3 || contractActive()) return
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
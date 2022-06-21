const achievementNames = [
//Egg Discovery Section
'Eggcellent','Superegg','Meggdical','Rockegg Fuel','Uber Material','Fused','Quantum Flux','Fountain of Youth','Time and Space',
'Gravity Well','Diliuted','Prodigy Child','Terraforming Mars','Anti Anti Matter','Moar Matter','AEgg','Nebulous','Universal Problem','Egglightenment',
//Contracts Section
'Contracted','Contractual','Contractful','Contractor',
//Soul and Prophecy Section
'Soulful I','Soulful II','Soulful III','Soulful IV','Prophet I','Prophet II','Prophet III','Prophet IV',
//Planets and Knowledge
'Planetary I','Planetary II','Planetary III','Planetary IV','Planetary V','Planetary VI',
'Intelligent','Genius','Einstein','True Egglightenment'
]

const achievementDescriptions = [
//Egg Discovery Section
'Start Playing!','Unlock the 2nd Egg','Unlock the 3rd Egg','Unlock the 4th Egg','Unlock the 5th Egg','Unlock the 6th Egg','Unlock the 7th Egg',
'Unlock the 8th Egg','Unlock the 9th Egg','Unlock the 10th Egg','Unlock the 11th Egg','Unlock the 12th Egg','Unlock the 13th Egg','Unlock the 14th Egg','Unlock the 15th Egg',
'Unlock the 16th Egg','Unlock the 17th Egg','Unlock the 18th Egg','Unlock the 19th Egg',
//Contracts Section
'Completed a Contract','Complete 10 Contracts','Complete 100 Contracts','Complete a Thousand Contracts',
//Soul and Prophecy Section
'Get 1 Thousand Soul Eggs','Get 1 Million Soul Eggs','Get 1 Billion Soul Eggs','Get 1 Trillion Soul Eggs',
'Get 10 Prophecy Eggs','Get 1 Thousand Prophecy Eggs','Get 1 Million Prophecy Eggs','Get 10 Million Prophecy Eggs',
//Planets and Knowledge
'Unlock the 1st Planet','Unlock the 2nd Planet','Unlock the 3rd Planet','Unlock the 4th Planet','Unlock the 5th Planet','Unlock the 6th Planet',
'Acquire 100 Knowledge','Acquire 1 Thousand Knowledge','Acquire 10 Thousand Knowledge','Acquire 100 Thousand Knowledge'
]

function updateAchText(i) {
    DOMCacheGetOrSet('achHoverText').innerHTML = `[${i+1}] - ${achievementNames[i]}<br>${achievementDescriptions[i]}`
}

for(let i = 0; i < achievementNames.length; i++) 
    DOMCacheGetOrSet('ach' + i).addEventListener('mouseover', () => updateAchText(i))

function getAchievement(i) {
    if(data.achievements[i] === true) return
    data.achievements[i] = true
    $.notify(`${achievementNames[i]} Unlocked!`,'success')
    updateAchClass()
}

function checkAchievements() {
    //Eggs
    if(data.achievements[0] === false) getAchievement(0)
    for(let i = 1; i < 19; i++) {
        if(data.unlockedEgg[i-1] === true && data.achievements[i] === false) getAchievement(i)
    }
    //Soul and Prophecy
    const contractCompleteReq = [D(1),D(10),D(100),D(1e3)]
    for(let i = 19; i < 23; i++) {
        if(data.stats.contractsComplete.gte(contractCompleteReq[i-19]) && data.achievements[i] === false) getAchievement(i)
    }
    const soulAchReq = [D(1e3),D(1e6),D(1e9),D(1e12)]
    for(let i = 23; i < 27; i++)
        if(data.soulEggs.gte(soulAchReq[i-23]) && data.achievements[i] === false) getAchievement(i)
    const prophecyAchReq = [D(10),D(1e3),D(1e6),D(1e7)]
    for(let i = 27; i < 31; i++)
        if(data.prophecyEggs.gte(prophecyAchReq[i-27]) && data.achievements[i] === false) getAchievement(i)
    //Planets and Knowledge
    for(let i = 31; i < 37; i++)
        if(data.planetsDiscovered[i-31] === true && data.achievements[i] === false) getAchievement(i)
    const knowledgeAchReq = [D(100),D(1e3),D(1e4),D(1e5)]
    for(let i = 37; i < 41; i++)
        if(data.knowledge.gte(knowledgeAchReq[i-37]) && data.achievements[i] === false) getAchievement(i)
}

function updateAchClass() {
    for(let i = 0; i < achievementNames.length; i++) {
            DOMCacheGetOrSet('ach'+i).classList = data.achievements[i] ? 'achUnlock' : 'achLock'
    }

}
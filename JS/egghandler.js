const eggDiscoverReq = [D(1e7),D(8.4e8),D(3.8e10),D(2.7e13),D(8e15),
    D(3.6e18),D(1.5e22),D(2.7e25),D(1.5e29),D(7.6e32),D(2.5e36),D(3.2e39),
    D(2e43),D(1.9e47),D(5.1e51),D(3.2e55),D(6.4e59),D(5.7e64)]
const eggUnlockReq = [D(6.8e7),D(5.3e9),D(2.4e11),D(1.7e14),D(5e16),
    D(2.3e19),D(9.4e22),D(1.7e26),D(9.8e29),D(4.8e33),D(1.6e37),D(2e40),
    D(1.3e44),D(1.2e48),D(3.2e52),D(2e56),D(4e60),D(3.6e65)]
const eggValue = [D(0.25),D(1.25),D(6.25),D(30),D(150),
    D(700),D(3e3),D(1.25e4),D(5e4),D(1.75e5),D(5.25e5),
    D(1.5e6),D(1e7),D(1e9),D(1e11),D(1e12),D(1.5e13),D(1e14),D(0.0000001)]
let currentEggValue = D(0)
let eggValueBonus = D(1)
let chickenGain = D(0)
let layRate = D(1)
const eggImgIDs = ['egg','superfood','medical','rocketfuel','supermaterial','fusion','quantum',
    'immortality','tachyon','graviton','dilithium','prodigy','terraform','antimatter',
    'darkmatter','ai','nebula','universe','enlightenment']
const eggNames = ['Regular','Superfood','Medical','Rocket Fuel','Super Material','Fusion',
    'Quantum','Immortality','Tachyon','Graviton','Dilithium','Prodigy','Terraform',
    'Antimatter','Dark Matter','AI','Nebula','Universe','Enlightenment']

function updateEggPage() {
    if(data.currentEgg < eggDiscoverReq.length) {
    if(DOMCacheGetOrSet('currentEggImg').getAttribute('src') !== `Imgs/${eggImgIDs[data.currentEgg]}.png`) 
            DOMCacheGetOrSet('currentEggImg').setAttribute('src', `Imgs/${eggImgIDs[data.currentEgg]}.png`)
        DOMCacheGetOrSet('currentEggText').innerHTML = `Current Egg: ${eggNames[data.currentEgg]}<br>Value: $${format(eggValue[data.currentEgg])} (x${format(eggValueBonus)})<br>$${format(((currentEggValue.times(soulEggBoost))).times(data.chickens.times(layRate)))}/s<br>Egg Laying Rate: x${format((layRate))}<br>Chicken Gain: ${format(chickenGain)} Chickens/min`
        if((DOMCacheGetOrSet('nextEggImg').getAttribute('src') !== `Imgs/${eggImgIDs[data.currentEgg+1]}.png` && (data.unlockedEgg[data.currentEgg] === true || data.money.gte(eggDiscoverReq[data.currentEgg]))) 
        || (DOMCacheGetOrSet('nextEggImg').getAttribute('src') !== `Imgs/question.png` && (data.unlockedEgg[data.currentEgg] === false && data.money.lt(eggDiscoverReq[data.currentEgg]))))
            DOMCacheGetOrSet('nextEggImg').src = data.unlockedEgg[data.currentEgg] === true || data.money.gte(eggDiscoverReq[data.currentEgg]) ? `Imgs/${eggImgIDs[data.currentEgg+1]}.png` : `Imgs/question.png`
        DOMCacheGetOrSet('nextEggText').innerHTML = data.unlockedEgg[data.currentEgg] === true || data.money.gte(eggDiscoverReq[data.currentEgg]) ?
        `Next Egg: ${eggNames[data.currentEgg+1]}<br>Unlock At: $${format(eggUnlockReq[data.currentEgg])}<br>Value: $${format(eggValue[data.currentEgg+1])}` : `Next Egg: Not Discovered<br>Discover at $${format(eggDiscoverReq[data.currentEgg])}`
    }
    else {
        if(DOMCacheGetOrSet('currentEggImg').getAttribute('src') !== `Imgs/enlightenment.png`) 
            DOMCacheGetOrSet('currentEggImg').setAttribute('src', `Imgs/enlightenment.png`)
        DOMCacheGetOrSet('currentEggText').innerHTML = `Current Egg: ${eggNames[data.currentEgg]}<br>Value: $${format(eggValue[data.currentEgg])} (x${format(eggValueBonus)})<br>Egg Laying Rate: +${format(layRate)}%<br>Chicken Gain: ${format(chickenGain)} Chickens/min`
        if(DOMCacheGetOrSet('nextEggImg').getAttribute('src') !== `Imgs/enlightenment.png`) 
            DOMCacheGetOrSet('nextEggImg').setAttribute('src', `Imgs/enlightenment.png`)
        DOMCacheGetOrSet('nextEggText').innerHTML = `The Final Egg`
    }
    for(let i = 0; i < data.unlockedEgg.length; i++)
        DOMCacheGetOrSet(`eggHold${i}`).style.display = data.unlockedEgg[i] === true ? 'flex' : 'none'
}

function updateEggValueBonus() {
    eggValueBonus = D(1)
    eggValueBonus = data.research[1].gt(0) ? eggValueBonus.times((D(0.25).times(data.research[1])).plus(1)) : eggValueBonus.times(D(1))
    eggValueBonus = data.research[3].gt(0) ? eggValueBonus.times((D(0.25).times(data.research[3])).plus(1)) : eggValueBonus.times(D(1))
    eggValueBonus = data.research[4].gt(0) ? eggValueBonus.times((D(2).times(data.research[4]))) : eggValueBonus.times(D(1))
    eggValueBonus = data.research[6].gt(0) ? eggValueBonus.times((D(3).times(data.research[6]))) : eggValueBonus.times(D(1))
    eggValueBonus = data.research[8].gt(0) ? eggValueBonus.times((D(0.25).times(data.research[8])).plus(1)) : eggValueBonus.times(D(1))
    eggValueBonus = data.research[10].gt(0) ? eggValueBonus.times((D(0.15).times(data.research[10])).plus(1)) : eggValueBonus.times(D(1))
    eggValueBonus = data.research[11].gt(0) ? eggValueBonus.times((D(0.15).times(data.research[11])).plus(1)) : eggValueBonus.times(D(1))
    eggValueBonus = data.research[12].gt(0) ? eggValueBonus.times((D(2).times(data.research[12]))) : eggValueBonus.times(D(1))
    eggValueBonus = data.research[14].gt(0) ? eggValueBonus.times((D(0.1).times(data.research[14])).plus(1)) : eggValueBonus.times(D(1))
    eggValueBonus = data.research[17].gt(0) ? eggValueBonus.times((D(2).times(data.research[17]))) : eggValueBonus.times(D(1))
    eggValueBonus = data.research[18].gt(0) ? eggValueBonus.times((D(0.25).times(data.research[18])).plus(1)) : eggValueBonus.times(D(1))
    eggValueBonus = data.research[20].gt(0) ? eggValueBonus.times((D(0.25).times(data.research[20])).plus(1)) : eggValueBonus.times(D(1))
    eggValueBonus = data.research[21].gt(0) ? eggValueBonus.times((D(0.1).times(data.research[21])).plus(1)) : eggValueBonus.times(D(1))
    eggValueBonus = data.research[22].gt(0) ? eggValueBonus.times((D(10).times(data.research[22]))) : eggValueBonus.times(D(1))
    eggValueBonus = data.research[23].gt(0) ? eggValueBonus.times((D(0.05).times(data.research[23])).plus(1)) : eggValueBonus.times(D(1))
    eggValueBonus = data.research[24].gt(0) ? eggValueBonus.times((D(0.01).times(data.research[24])).plus(1)) : eggValueBonus.times(D(1))
    eggValueBonus = data.research[25].gt(0) ? eggValueBonus.times((D(.01).times(data.research[25])).plus(1)) : eggValueBonus.times(D(1))
    eggValueBonus = data.research[26].gt(0) ? eggValueBonus.times((D(10).times(data.research[26]))) : eggValueBonus.times(D(1))
    eggValueBonus = data.epicResearch[5].gt(0) ? eggValueBonus.times((D(0.05).times(data.epicResearch[5])).plus(1)) : eggValueBonus.times(D(1))
}

function updateIntHatch() {
    chickenGain = D(0)
    chickenGain = chickenGain.plus(D(2).times(data.research[2]))
    chickenGain = chickenGain.plus(D(5).times(data.research[5]))
    chickenGain = chickenGain.plus(D(10).times(data.research[9]))
    chickenGain = chickenGain.plus(D(25).times(data.research[13]))
    chickenGain = chickenGain.plus(D(5).times(data.research[15]))
    chickenGain = chickenGain.plus(D(50).times(data.research[19]))
    chickenGain = chickenGain.times(4)
    chickenGain = chickenGain.times((D(0.05).times(data.epicResearch[0])).plus(1))
}

function updateLayRate() {
    layRate = D(1)
    layRate = data.research[0].gt(0) ? layRate.times((D(0.1).times(data.research[0])).plus(1)) : layRate.times(D(1))
    layRate = data.research[7].gt(0) ? layRate.times((D(0.05).times(data.research[7])).plus(1)) : layRate.times(D(1))
    layRate = data.research[10].gt(0) ? layRate.times((D(0.15).times(data.research[10])).plus(1)) : layRate.times(D(1))
    layRate = data.research[16].gt(0) ? layRate.times((D(0.1).times(data.research[16])).plus(1)) : layRate.times(D(1))
    layRate = data.research[27].gt(0) ? layRate.times((D(0.1).times(data.research[27])).plus(1)) : layRate.times(D(1))
    layRate = data.epicResearch[4].gt(0) ? layRate.times((D(0.5).times(data.epicResearch[4])).plus(1)) : layRate.times(D(1))
}

function promoteEgg() {
    if(data.currentEgg === eggDiscoverReq.length) return
    if(data.money.lt(eggUnlockReq[data.currentEgg])) return
    for(let i = 0; i < data.contractActive.length; i++) {
        if(data.contractActive[i] === true) return
    }
    data.unlockedEgg[data.currentEgg] = true
    data.currentEgg++
    for(let i = 0; i < data.research.length; i++)
        data.research[i] = D(0)
    eggValueBonus = D(1)
    chickenGain = D(0)
    layRate = D(1)
    data.chickens = D(0)
    data.money = D(0)
}
let currentEggValue = D(0)
let eggValueBonus = D(1)
let chickenGain = D(0)
let layRate = D(1)     
const eggData = [
  {
    id:"egg",
    name:"Regular",
    discoverReq:D(0),
    unlockReq:D(0),
    value:D(0.25)
  },
  {
    id:"superfood",
    name:"Superfood",
    discoverReq:D(1e7),
    unlockReq:D(6.8e7),
    value:D(1.25)
  },
  {
    id:"medical",
    name:"Medical",
    discoverReq:D(8.4e8),
    unlockReq:D(5.3e9),
    value:D(6.25)
  },
  {
    id:"rocketfuel",
    name:"Rocket Fuel",
    discoverReq:D(3.8e10),
    unlockReq:D(2.4e11),
    value:D(30)
  },
  {
    id:"supermaterial",
    name:"Super Material",
    discoverReq:D(2.7e13),
    unlockReq:D(1.7e14),
    value:D(150)
  },
  {
    id:"fusion",
    name:"Fusion",
    discoverReq:D(8e15),
    unlockReq:D(5e16),
    value:D(700)
  },
  {
    id:"quantum",
    name:"Quantum",
    discoverReq:D(3.6e18),
    unlockReq:D(2.3e19),
    value:D(3e3)
  },
  {
    id:"immortality",
    name:"Immortality",
    discoverReq:D(1.5e22),
    unlockReq:D(9.4e22),
    value:D(1.25e4)
  },
  {
    id:"tachyon",
    name:"Tachyon",
    discoverReq:D(2.7e25),
    unlockReq:D(1.7e26),
    value:D(5e4)
  },
  {
    id:"graviton",
    name:"Graviton",
    discoverReq:D(1.5e29),
    unlockReq:D(9.8e29),
    value:D(1.75e5)
  },
  {
    id:"dilithium",
    name:"Dilithium",
    discoverReq:D(7.6e32),
    unlockReq:D(4.8e33),
    value:D(5.25e5)
  },
  {
    id:"prodigy",
    name:"Prodigy",
    discoverReq:D(2.5e36),
    unlockReq:D(1.6e37),
    value:D(1.5e6)
  },
  {
    id:"terraform",
    name:"Terraform",
    discoverReq:D(3.2e39),
    unlockReq:D(2e40),
    value:D(1e7)
  },
  {
    id:"antimatter",
    name:"Antimatter",
    discoverReq:D(2e43),
    unlockReq:D(1.3e44),
    value:D(1e9)
  },
  {
    id:"darkmatter",
    name:"Dark Matter",
    discoverReq:D(1.9e47),
    unlockReq:D(1.2e48),
    value:D(1e11)
  },
  {
    id:"ai",
    name:"AI",
    discoverReq:D(5.1e51),
    unlockReq:D(3.2e52),
    value:D(1e12)
  },
  {
    id:"nebula",
    name:"Nebula",
    discoverReq:D(3.2e55),
    unlockReq:D(2e56),
    value:D(1.5e13)
  },
  {
    id:"universe",
    name:"Universe",
    discoverReq:D(6.4e59),
    unlockReq:D(4e60),
    value:D(1e14)
  },
  {
    id:"enlightenment",
    name:"Enlightenment",
    discoverReq:D(5.7e64),
    unlockReq:D(3.6e65),
    value:D(0.0000001)
  }
]

function updateEggPage() {
  if(data.onPlanet === false) {
    if(data.currentEgg < eggData.length-1) {
      if(DOMCacheGetOrSet('currentEggImg').getAttribute('src') !== `Imgs/${eggData[data.currentEgg].id}.png`) 
        DOMCacheGetOrSet('currentEggImg').setAttribute('src', `Imgs/${eggData[data.currentEgg].id}.png`)
      DOMCacheGetOrSet('currentEggText').innerHTML = `Current Egg: ${eggData[data.currentEgg].name}<br>Value: $${format(eggData[data.currentEgg].value)} (x${format(eggValueBonus)})<br>$${format(((currentEggValue.times(soulEggBoost))).times(data.chickens.times(layRate)))}/s<br>Egg Laying Rate: x${format((layRate))}<br>Chicken Gain: ${format(chickenGain)} Chickens/min`
      if((DOMCacheGetOrSet('nextEggImg').getAttribute('src') !== `Imgs/${eggData[data.currentEgg+1].id}.png` && (data.unlockedEgg[data.currentEgg] === true || data.money.gte(eggData[data.currentEgg].discoverReq))) 
      || (DOMCacheGetOrSet('nextEggImg').getAttribute('src') !== `Imgs/question.png` && (data.unlockedEgg[data.currentEgg] === false && data.money.lt(eggData[data.currentEgg].discoverReq))))
        DOMCacheGetOrSet('nextEggImg').src = data.unlockedEgg[data.currentEgg] === true || data.money.gte(eggData[data.currentEgg].discoverReq) ? `Imgs/${eggData[data.currentEgg+1].id}.png` : `Imgs/question.png`
      DOMCacheGetOrSet('nextEggText').innerHTML = data.unlockedEgg[data.currentEgg] === true || data.money.gte(eggData[data.currentEgg].discoverReq) ?
      `Next Egg: ${eggData[data.currentEgg+1].name}<br>Unlock At: $${format(eggData[data.currentEgg+1].unlockReq)}<br>Value: $${format(eggData[data.currentEgg+1].value)}` : `Next Egg: Not Discovered<br>Discover at $${format(eggData[data.currentEgg+1].discoverReq)}`  
    }
    else {
      if(DOMCacheGetOrSet('currentEggImg').getAttribute('src') !== `Imgs/enlightenment.png`) 
        DOMCacheGetOrSet('currentEggImg').setAttribute('src', `Imgs/enlightenment.png`)
      DOMCacheGetOrSet('currentEggText').innerHTML = `Current Egg: ${eggData[data.currentEgg].name}<br>Value: $${format(eggData[data.currentEgg].value)} (x${format(eggValueBonus)})<br>$${format(((currentEggValue.times(soulEggBoost))).times(data.chickens.times(layRate)))}/s<br>Egg Laying Rate: x${format((layRate))}<br>Chicken Gain: ${format(chickenGain)} Chickens/min`
      if(DOMCacheGetOrSet('nextEggImg').getAttribute('src') !== `Imgs/enlightenment.png`) 
        DOMCacheGetOrSet('nextEggImg').setAttribute('src', `Imgs/enlightenment.png`)
      DOMCacheGetOrSet('nextEggText').innerHTML = `The Final Egg`
    } 
  }
  else {
      if(DOMCacheGetOrSet('currentEggImg').getAttribute('src') !== `Imgs/${planetEggImgIDs[data.currentPlanetIndex]}.png`) 
        DOMCacheGetOrSet('currentEggImg').setAttribute('src', `Imgs/${planetEggImgIDs[data.currentPlanetIndex]}.png`)
      DOMCacheGetOrSet('currentEggText').innerHTML = `Current Egg: ${planetEggNames[data.currentPlanetIndex]}<br>Value: $${format(planetEggValue[data.currentPlanetIndex])} (x${format(eggValueBonus)})<br>$${format(((currentEggValue.times(soulEggBoost))).times(data.chickens.times(layRate)))}/s<br>Egg Laying Rate: x${format((layRate))}<br>Chicken Gain: ${format(chickenGain)} Chickens/min`
      if(DOMCacheGetOrSet('nextEggImg').getAttribute('src') !== `Imgs/${planetEggImgIDs[data.currentPlanetIndex]}.png`) 
        DOMCacheGetOrSet('nextEggImg').setAttribute('src', `Imgs/${planetEggImgIDs[data.currentPlanetIndex]}.png`)
      DOMCacheGetOrSet('nextEggText').innerHTML = `${planetEggNames[data.currentPlanetIndex]}`
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
    eggValueBonus = data.enlightenments[3].gt(0) ? eggValueBonus.times((D(0.10).times(data.enlightenments[3])).plus(1)) : eggValueBonus.times(D(1))
    eggValueBonus = eggValueBonus.times(planetBoosts[5])
    if(data.onPlanet === true)
      eggValueBonus = eggValueBonus.times(planetBoosts[0])
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
    chickenGain = chickenGain.times(planetBoosts[4])
}

function updateLayRate() {
    layRate = D(1)
    layRate = data.research[0].gt(0) ? layRate.times((D(0.1).times(data.research[0])).plus(1)) : layRate.times(D(1))
    layRate = data.research[7].gt(0) ? layRate.times((D(0.05).times(data.research[7])).plus(1)) : layRate.times(D(1))
    layRate = data.research[10].gt(0) ? layRate.times((D(0.15).times(data.research[10])).plus(1)) : layRate.times(D(1))
    layRate = data.research[16].gt(0) ? layRate.times((D(0.1).times(data.research[16])).plus(1)) : layRate.times(D(1))
    layRate = data.research[27].gt(0) ? layRate.times((D(0.1).times(data.research[27])).plus(1)) : layRate.times(D(1))
    layRate = data.epicResearch[4].gt(0) ? layRate.times((D(0.5).times(data.epicResearch[4])).plus(1)) : layRate.times(D(1))
    layRate = layRate.times(planetBoosts[1])
    if(data.onPlanet && data.currentPlanetIndex === 4)
      layRate = layRate.times(D(0.5))
}

function promoteEgg() {
    if(data.currentEgg === eggData.length-1) return
    if(data.money.lt(eggData[data.currentEgg+1].unlockReq)) return
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
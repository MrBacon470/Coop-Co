const prestigeContracts = [
    {
      name: 'Energy Crisis',
      desc: 'A Californian Energy Shortage means more demand for Fusion Eggs.',
      eggIndex: 5,
      baseGoal: D(1e17),
      baseReward: D(2),
    },
    {
      name: 'GPT-10.0',
      desc: 'To make the ultimate version of ChatGPT, AI Eggs are needed',
      eggIndex: 15,
      baseGoal: D(1e27),
      baseReward: D(1),
    },
    {
      name: 'Pandemic',
      desc: 'A Pandemic is covering the world, Medical Eggs are needed to save lives.',
      eggIndex: 2,
      baseGoal: D(1e12),
      baseReward: D(5),
    },
    {
      name: 'Supreme Diets',
      desc: 'Dieting is back in fashion people need more Superfood Eggs.',
      eggIndex: 1,
      baseGoal: D(1e11),
      baseReward: D(6),
    },
    {
      name: 'Fountain of Youth',
      desc: 'People are wanting to stay youthful, Immortality Eggs are needed to keep them that way.',
      eggIndex: 7,
      baseGoal: D(1e19),
      baseReward: D(4),
    },
    {
      name: 'Supply Chain Crisis',
      desc: 'Supply Chain Issues have caused resource shortages, Supermaterial Eggs are needed to offset the shortage.',
      eggIndex: 4,
      baseGoal: D(1e14),
      baseReward: D(5),
    },
    {
      name: 'Temporal Tear',
      desc: 'A Temporal Tear has caused a rift in the space-time continuum, Tachyon Eggs are needed to fix it.',
      eggIndex: 8,
      baseGoal: D(1e20),
      baseReward: D(3),
    }
]

function updateContractsHTML() {
  if(data.currentSubTab[1] === 0) {
    for(let i = 0; i < 3; i++) {
      if(data.contracts[i].id === -1) {
        DOMCacheGetOrSet(`infContractTitle${i}`).innerText = 'No Contract'
        DOMCacheGetOrSet(`infContractDesc${i}`).innerText = 'No Contract'
        DOMCacheGetOrSet(`infContractGoal${i}`).innerText = 'No Contract'
        DOMCacheGetOrSet(`infContractReward${i}`).innerText = 'No Contract'
        DOMCacheGetOrSet(`infContractButton${i}`).innerText = 'No Contract'
      } else {
        DOMCacheGetOrSet(`infContractTitle${i}`).innerText = prestigeContracts[data.contracts[i].id].name
        DOMCacheGetOrSet(`infContractDesc${i}`).innerText = prestigeContracts[data.contracts[i].id].desc
        DOMCacheGetOrSet(`infContractGoal${i}`).innerText = `Goal: $${format(data.contracts[i].goal)}`
        DOMCacheGetOrSet(`infContractReward${i}`).innerText = `Reward: ${format(data.contracts[i].reward)} Prophecy Eggs`
      }
      if(contractActive() || data.inPath || data.onPlanet || data.contracts[i].id === -1) {
        DOMCacheGetOrSet(`infContractButton${i}`).innerText = !data.contractActive[i] ? 'Can\'t Start' : 'Exit Contract'
        DOMCacheGetOrSet(`infContractButton${i}`).classList = !data.contractActive[i] ? 'redButton' : 'greenButton'
      }
      else {
        DOMCacheGetOrSet(`infContractButton${i}`).innerText = 'Start Contract'
        DOMCacheGetOrSet(`infContractButton${i}`).classList = 'greenButton'
      }
    }
  }
  else if(data.currentSubTab[1] === 1) {
    //Implement Ascension Contracts
  }
}

function contractActive(){
  for(let x=0;x<data.contractActive.length;x++){
    if(data.contractActive[x])return true
  }
  return false
}

function generateContract(i) {
    let id = getRandom(0, prestigeContracts.length)
    while(!data.unlockedEgg[prestigeContracts[id].eggIndex]) {
      id = getRandom(0, prestigeContracts.length)
    }
    if(id > prestigeContracts.length - 1) index = prestigeContracts.length - 1
    let goal = prestigeContracts[id].baseGoal.times(eggData[prestigeContracts[id].eggIndex].value.times(0.25).times(contractGoalBoost.times(soulEggBoost.times(0.75))))
    let reward = prestigeContracts[id].baseReward.times(contractRewardBoost)
    data.contracts[i].id = id
    data.contracts[i].goal = goal
    data.contracts[i].reward = reward
}

function startContract(i) {
    if(data.inPath || data.onPlanet || data.contracts[i].id === -1 || (contractActive() && !data.contractActive[i])) return
    if(!data.contractActive[i]) {
      prestige()
      data.currentEgg = prestigeContracts[data.contracts[i].id].eggIndex
      data.contractActive[i] = true
      //if(data.settingsToggles[2] === true) 
        
    }
    else {
      data.contractActive[i] = false
      for(let i = 0; i < data.research.length; i++)
        data.research[i] = D(0)
      eggValueBonus = D(1)
      chickenGain = D(0)
      layRate = D(1)
      data.chickens = D(0)
      data.money = D(0)
      data.currentEgg = 0
      //if(data.settingsToggles[2] === true) 
        
    }
}

function runContract(i) {
    if(data.money.gte(data.contracts[i].goal)) {
      data.contractActive[i] = false
      data.prophecyEggs = data.prophecyEggs.plus(data.contracts[i].reward)
      if(data.settingsToggles[2] === true) 
        
      for(let i = 0; i < 3; i++)
        generateContract(i)
      for(let i = 0; i < data.research.length; i++)
        data.research[i] = D(0)
      eggValueBonus = D(1)
      chickenGain = D(0)
      layRate = D(1)
      data.chickens = D(0)
      data.money = D(0)
      data.currentEgg = 0
      data.stats.contractsComplete = data.stats.contractsComplete.plus(1)
    }
}

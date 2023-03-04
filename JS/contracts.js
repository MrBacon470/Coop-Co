const prestigeContracts = [
    {
      name: 'Energy Crisis',
      desc: 'A Californian Energy Shortage means more demand for Fusion Eggs.',
      eggIndex: 5,
      baseGoal: D(1e15),
      baseReward: D(2),
    },
    {
      name: 'AI Boom',
      desc: 'The AI Industry requires more AI Eggs for their projects.',
      eggIndex: 15,
      baseGoal: D(1e25),
      baseReward: D(1),
    },
    {
      name: 'Pandemic',
      desc: 'A Pandemic is covering the world, Medical Eggs are needed to save lives.',
      eggIndex: 2,
      baseGoal: D(1e10),
      baseReward: D(5),
    },
    {
      name: 'Supreme Diets',
      desc: 'Dieting is back in fashion people need more Superfood Eggs.',
      eggIndex: 1,
      baseGoal: D(1e9),
      baseReward: D(6),
    },
    {
      name: 'Fountain of Youth',
      desc: 'People are wanting to stay youthful, Immortality Eggs are needed to keep them that way.',
      eggIndex: 7,
      baseGoal: D(1e17),
      baseReward: D(4),
    },
    {
      name: 'Supply Chain Crisis',
      desc: 'Supply Chain Issues have caused resources Supermaterial Eggs are needed to offset the shortage.',
      eggIndex: 4,
      baseGoal: D(1e12),
      baseReward: D(5),
    }
]

function updateContractsHTML() {
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
  }
}

function contractActive(){
  for(let x=0;x<data.contractActive.length;x++){
    if(data.contractActive[x])return true
  }
  return false
}

function generateContract() {
    
}

function startContract(i) {
    
}

function runContract(i) {
    
}

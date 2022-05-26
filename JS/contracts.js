const contractEggImgs = ['fusion','ai','medical','superfood','immortality']
const contractEggIndex = [5,15,2,1,7]
const contractTitles = ['Energy Crisis','AI Boom','Pandemic','Supreme Diets','Fountain of Youth']
const contractDescs = ['A Californian Energy Shortage means more demand for Fusion Eggs.','The AI Industry requires more AI Eggs for their projects.',
'A Pandemic is covering the world, Medical Eggs are needed to save lives.','Dieting is back in fashion people need more Superfood Eggs.',
'People are wanting to stay youthful, Immortality Eggs are needed to keep them that way.']

const defaultContract = {
    title: '',
    description: '',
    image: '',
    eggIndex: 0,
    reward: D(0),
    rewardType: '',
    goal: D(0)
}

function contractActive(){
  for(let x=0;x<data.contractActive.length;x++){
    if(data.contractActive[x])return true
  }
  return false
}

function generateContract(i) {
    let contract = Object.assign({}, defaultContract)
    let index = getRandom(0, contractEggImgs.length)
    if(index > contractEggImgs.length - 1) index = contractEggImgs.length - 1
    contract.title = contractTitles[index]
    contract.description = contractDescs[index]
    contract.image = `Imgs/${contractEggImgs[index]}.png`
    contract.eggIndex = contractEggIndex[index]
    contract.rewardType = 'Prophecy Eggs'
    contract.reward = D(getRandomDecimal(D(1),D(5)))
    contract.goal = getRandomDecimal(D(1e6),D(1e24))
    contract.goal = contract.goal.times(eggData[contract.eggIndex].value)
    data.contracts[i] = contract
}

function startContract(i) {
    for(let j = 0; j < data.contractActive.length; j++) {
        if(i === j && data.contractActive[j] === true) {
            data.contractActive[j] = false
            for(let i = 0; i < data.research.length; i++)
                data.research[i] = D(0)
            eggValueBonus = D(1)
            chickenGain = D(0)
            layRate = D(1)
            data.chickens = D(0)
            data.money = D(0)
            data.currentEgg = 0
            return
        }
        if(data.contractActive[j] === true) return 
    }
        
    data.contractActive[i] = true
    data.soulEggs = data.soulEggs.plus(soulEggGain)
    for(let i = 0; i < data.research.length; i++)
        data.research[i] = D(0)
    eggValueBonus = D(1)
    chickenGain = D(0)
    layRate = D(1)
    data.chickens = D(0)
    data.money = D(0)
    data.currentEgg = data.contracts[i].eggIndex
}
for(let i = 0; i < data.contracts.length; i++)
    DOMCacheGetOrSet(`contract${i}Button`).addEventListener('click', () => { startContract(i) })

function runContract(i) {
    if(data.money.gte(data.contracts[i].goal)) {
        switch(data.contracts[i].rewardType) {
            case 'Soul Eggs':
                data.soulEggs = data.soulEggs.plus(data.contracts[i].reward)
                break
            case 'Prophecy Eggs':
                data.prophecyEggs = data.prophecyEggs.plus(data.contracts[i].reward)
                break
        }
        data.contractActive[i] = false
        generateContract(i)
            for(let i = 0; i < data.research.length; i++)
                data.research[i] = D(0)
            eggValueBonus = D(1)
            chickenGain = D(0)
            layRate = D(1)
            data.chickens = D(0)
            data.money = D(0)
            data.currentEgg = 0
    }
}
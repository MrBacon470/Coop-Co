const contractEggImgs = ['fusion','ai','medical','superfood','immortality','supermaterial']
const contractEggIndex = [5,15,2,1,7,4]
const contractTitles = ['Energy Crisis','AI Boom','Pandemic','Supreme Diets','Fountain of Youth','Supply Chain Crisis']
const contractDescs = ['A Californian Energy Shortage means more demand for Fusion Eggs.','The AI Industry requires more AI Eggs for their projects.',
'A Pandemic is covering the world, Medical Eggs are needed to save lives.','Dieting is back in fashion people need more Superfood Eggs.',
'People are wanting to stay youthful, Immortality Eggs are needed to keep them that way.','Supply Chain Issues have caused resources Supermaterial Eggs are needed to offset the shortage.']

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
    contract.reward = Decimal.round(getRandomDecimal(D(1),D(5)).times(contractRewardBoost))
    contract.goal = getRandomDecimal(D(1e6),D(1e24))
    contract.goal = contract.goal.times(eggData[contract.eggIndex].value.times(0.15))
    contract.goal = contract.goal.times(soulEggBoost.times(0.15))
    data.contracts[i] = contract
}

function startContract(i) {
    for(let j = 0; j < data.contractActive.length; j++) {
        if(i === j && data.contractActive[j] === true) {
            if(data.settingsToggles[2] === true) 
                $.notify(`Contract ${data.contracts[i].title} Left!`, 'warn')
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
    data.stats.prestiges[2] = data.stats.prestiges[1]
    data.stats.prestiges[1] = data.stats.prestiges[0]
    data.stats.prestiges[0] = soulEggGain
    data.stats.timeInPrestige = D(0)
    data.soulEggs = data.soulEggs.plus(soulEggGain)
    for(let i = 0; i < data.research.length; i++)
        data.research[i] = D(0)
    eggValueBonus = D(1)
    chickenGain = D(0)
    layRate = D(1)
    data.chickens = D(0)
    data.money = D(0)
    data.currentEgg = data.contracts[i].eggIndex
    if(data.settingsToggles[2] === true)
        $.notify(`Contract ${data.contracts[i].title} Started!`, 'warn')
}
for(let i = 0; i < data.contracts.length; i++)
    DOMCacheGetOrSet(`contract${i}Button`).addEventListener('click', () => { startContract(i) })

function runContract(i) {
    if(data.money.gte(data.contracts[i].goal)) {
        if(data.settingsToggles[2] === true) 
            $.notify(`Contract ${data.contracts[i].title} Completed!\n+${format(data.contracts[i].reward)} ${data.contracts[i].rewardType}`, 'success')
        data.stats.contractsComplete = data.stats.contractsComplete.plus(1)
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
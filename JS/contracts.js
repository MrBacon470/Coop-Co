const contractEggImgs = ['fusion','ai','medical','superfood','immortality']
const contractEggIndex = [5,14,2,1,6]
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
    goal: D(0),
    rewardIndex: 0
}

function generateContract(i) {
    let contract = Object.assign({}, defaultContract)
    let index = getRandom(0, contractEggImgs.length-1)
    contract.title = contractTitles[index]
    contract.description = contractDescs[index]
    contract.image = `Imgs/${contractEggImgs[index]}.png`
    contract.eggIndex = contractEggIndex[index]
    index = getRandom(0,4)
    if(index <= 1) {
        contract.rewardType = 'Soul Eggs'
        contract.rewardIndex = index
        contract.reward = D(getRandomDecimal(Decimal.round(data.soulEggs),Decimal.round(data.bestSoulEggs)))
    }
    else {
        contract.rewardType = 'Prophecy Eggs'
        contract.rewardIndex = index
        contract.reward = D(getRandomDecimal(D(1),D(5)))
    }
    data.contracts[i] = contract
}
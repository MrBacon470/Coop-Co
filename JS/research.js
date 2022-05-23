//Common Section
const commonResearchNames = ['Comfortable Nests','Nutritional Supplements','Internal Hatcheries','Padded Packaging',
    'Bigger Eggs','Internal Hatchery Upgrades','USDE Prime Certification','Hen House A/C','Super-Feed™ Diet',
    'Internal Hatchery Expansion','Improved Genetics','Shell Fortification','Even Bigger Eggs','Internal Hatchery Expansion',
    'Genetic Purification','Machine Learning Incubators','Time Compression','Graviton Coating','Crystalline Shelling',
    'Neural Linking','Telepathic Will','Atomic Purification','Multiversal Layering','Timeline Diversion','Eggsistor Miniturization',
    'Matter Reconfiguration','Timeline Splicing','Relativity Optimization']
const commonResearchDescs = ['Egg Laying Rate +10%','Egg Value +25%','+2 Chickens/min','Earnings Per Egg +25%',
    'Doubles Egg Value','+5 Chickens/min','Triples Egg Value','Egg Laying Rate +5%','Egg Value +25%','+10 Chickens/min',
    'Egg Laying Rate & Egg Value + 15%','Egg Value +15%','Doubles Egg Value','+25 Chickens/min','Egg Value +10%',
    '+5 Chickens/min','Egg Laying Rate +10%','Double Egg Density (Value)','Egg Value +25%','+50 Chickens/min','Egg Quality (Value) +25%',
    'Egg Value +10%','10x Egg Value','Egg Laying Rate +2%','Egg Value +5%','Increases Egg Value +1%','10x Egg Value','Egg Laying Rate +10%']
const commonResearchMaxLevel = [D(50),D(40),D(10),D(30),D(1),D(10),D(1),D(50),D(35),D(15),D(30),D(60),D(5),D(30),D(100),D(250),D(20),
    D(7),D(100),D(30),D(50),D(3),D(50),D(25),D(100),D(500),D(1),D(10)]
const commonResearchBaseCost = [D(0.5),D(1.16),D(1836),D(454986),D(1351894),D(16029660),D(32.318e12),D(2986194),D(530.5e6),D(2.886e12),
    D(7.488e12),D(14.738e15),D(28.608e18),D(330.094e15),D(112.026e18),D(145.17e21),D(34.476e21),D(78.316e27),D(246.06e27),D(702.028e24),
    D(4.222e36),D(433.836e42),D(223.92e48),D(23.596e42),D(17.914e48),D(15.902e51),D(16.564e66),D(14.474e54)]
let commonResearchCost = []
for(let i = 0; i < commonResearchNames.length; i++) {
    commonResearchCost[i] = commonResearchBaseCost[i].times(Decimal.pow(1.15, data.research[i]))
    DOMCacheGetOrSet(`r${i}`).innerHTML = `${commonResearchNames[i]}<br>${commonResearchDescs[i]}<br>Level: ${format(data.research[i],0)}/${format(commonResearchMaxLevel[i],0)}<br>
    Cost: $${format(commonResearchCost[i])}`
    DOMCacheGetOrSet(`r${i}`).classList = 'lockedResearch'
    DOMCacheGetOrSet(`r${i}`).onclick = () => purchaseResearch(i)
}
function purchaseResearch(i) {
    const buyAmountNums = [1,5,10,20]
    for(let j = 0; j < buyAmountNums[data.buyAmounts[0]]; j++) {
        if(data.money.gte(commonResearchCost[i]) && data.research[i].lt(commonResearchMaxLevel[i])) {
            data.money = data.money.sub(commonResearchCost[i])
            data.research[i] = data.research[i].add(1)
            updateHTML()
        }
    }
}
function updateResearch() {
    for(let i = 0; i < commonResearchNames.length; i++)
        commonResearchCost[i] = commonResearchBaseCost[i].times(Decimal.pow(1.15, data.research[i]))
}
//Epic Section
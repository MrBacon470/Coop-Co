//Common Section
const commonResearchNames = ['Comfortable Nests','Nutritional Supplements','Internal Hatcheries','Padded Packaging',
    'Bigger Eggs','Internal Hatchery Upgrades','USDE Prime Certification','Hen House A/C','Super-Feed™ Diet',
    'Internal Hatchery Expansion','Improved Genetics','Shell Fortification','Even Bigger Eggs','Internal Hatchery Expansion',
    'Genetic Purification','Machine Learning Incubators','Time Compression','Graviton Coating','Crystalline Shelling',
    'Neural Linking','Telepathic Will','Atomic Purification','Multiversal Layering','Timeline Diversion','Eggsistor Miniturization',
    'Matter Reconfiguration','Timeline Splicing','Relativity Optimization']
const commonResearchDescs = ['Egg Laying Rate +10%','Egg Value +25%','+2 Chickens/s','Earnings Per Egg +25%',
    'Doubles Egg Value','+5 Chickens/s','Triples Egg Value','Egg Laying Rate +5%','Egg Value +25%','+10 Chickens/s',
    'Egg Laying Rate & Egg Value + 15%','Egg Value +15%','Doubles Egg Value','+25 Chickens/s','Egg Value +10%',
    '+5 Chickens/s','Egg Laying Rate +10%','Double Egg Density (Value)','Egg Value +25%','+50 Chickens/s','Egg Quality (Value) +25%',
    'Egg Value +10%','10x Egg Value','Egg Laying Rate +2%','Egg Value +5%','Increases Egg Value +1%','10x Egg Value','Egg Laying Rate +10%']
const commonResearchMaxLevel = [D(50),D(40),D(10),D(30),D(1),D(10),D(1),D(50),D(35),D(15),D(30),D(60),D(5),D(30),D(100),D(250),D(20),
    D(7),D(100),D(30),D(50),D(3),D(50),D(25),D(100),D(500),D(1),D(10)]
for(let i = 0; i < commonResearchNames.length; i++) {
    DOMCacheGetOrSet(`r${i}`).innerHTML = `${commonResearchNames[i]}<br>${commonResearchDescs[i]}<br>Level: ${format(data.research[i])}/${format(commonResearchMaxLevel[i])}`
    DOMCacheGetOrSet(`r${i}`).classList = 'lockedResearch'
}
    

//Epic Section
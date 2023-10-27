const planetNames = ['Arcturus','Ravnar','Xylok','Triton','Hereth','Malak']
const planetDescs = ['Dark Energy Abounds (Higher Research Scaling)','Tick Tock (Time Speed 1/4th)','Peace and Tranquility (No Soul Egg Boosts Work Here)','The Abyss Watches (No Soul or Prophecy Egg Boost)','A World of Lava (Slower Chicken Gain)','Light in the Dark (Low Egg Value)']
const planetEggImgIDs = ['darkenergy','time','peace','abyss','lava','light']
const planetEggNames = ['Dark Energy','Time','Peace','Abyss','Lava','Light']
const planetBoostNames = ['Planet Egg Value','Lay Rate','Knowlegg Gain','Soul Egg Gain','Chicken Gain','Egg Value']
const planetEggValue = [D(1e3),D(100),D(10),D(1),D(0.5),D(0.25)]
const discoveryEggIndexes = [3,5,6,10,13,14]
const discoveryReqs = [D(2.5e4),D(1e5),D(1e6),D(5e6),D(7.5e6),D(1e7)]
let planetHoverIndex = -1
let planetBoosts = new Array(6).fill(D(0))
function updateEggspeditionsUI() {

    DOMCacheGetOrSet('planet2').style.display = data.hasAscended ? 'inline' : 'none'

    for(let i = 0; i < data.planetsDiscovered.length; i++) {
        if(data.planetsDiscovered[i] === false && planetHoverIndex === i && DOMCacheGetOrSet('planet'+i).getAttribute('src') !== '/Images/planetactive.png')
            DOMCacheGetOrSet('planet'+i).src = `/Images/planetactive.png`
        else if((DOMCacheGetOrSet('planet'+i).getAttribute('src') !== `/Images/planet${i+1}.png` && data.planetsDiscovered[i] === true) || (DOMCacheGetOrSet('planet'+i).getAttribute('src') !== `/Images/questionplanet.png` && data.planetsDiscovered[i] === false && planetHoverIndex !== i))
            DOMCacheGetOrSet('planet'+i).src = data.planetsDiscovered[i] === true ? `/Images/planet${i+1}.png` : `/Images/questionplanet.png`
    }
    DOMCacheGetOrSet('discoveryButton').classList = data.currentEgg === discoveryEggIndexes[data.discoveries] && data.chickens.gte(discoveryReqs[data.discoveries]) && data.planetsDiscovered[planetHoverIndex] === false ? 'greenButton' : 'redButton'
    DOMCacheGetOrSet('discoveryButton').innerText = data.planetsDiscovered[planetHoverIndex] === true ? 'Already Discovered' : `Discover Planet`
    DOMCacheGetOrSet('discoveryText').innerText = data.discoveries < discoveryEggIndexes.length ? `Discovery Cost: ${format(discoveryReqs[data.discoveries])} ${eggData[discoveryEggIndexes[data.discoveries]].name} Chickens` : `All Planets Discovered`
    
    if(data.onPlanet === false) {
        if(planetHoverIndex !== -1) {
            DOMCacheGetOrSet('eggspeditionButton').innerText = data.planetsDiscovered[planetHoverIndex] === true ? `Journey to ${planetNames[planetHoverIndex]}` : `Planet Not Discovered`
            DOMCacheGetOrSet('eggspeditionButton').classList = data.planetsDiscovered[planetHoverIndex] === true ? 'greenButton' : 'redButton'
        }
        else {
            DOMCacheGetOrSet('eggspeditionButton').innerText = `No Planet Selected`
            DOMCacheGetOrSet('eggspeditionButton').classList = 'redButton'
        }
    }
    else {
        DOMCacheGetOrSet('eggspeditionButton').innerText = `Return Home`
        DOMCacheGetOrSet('eggspeditionButton').classList = 'greenButton'
    }
    if(data.inPath === true) {
        DOMCacheGetOrSet('eggspeditionButton').innerText = `Leave the Path to Travel`
        DOMCacheGetOrSet('eggspeditionButton').classList = 'redButton'
    } 
    if(planetHoverIndex !== -1)
        DOMCacheGetOrSet('planetHoverText').innerText = data.planetsDiscovered[planetHoverIndex] === true ? `Planet ${planetNames[planetHoverIndex]}\n${planetDescs[planetHoverIndex]}\n\n$${format(data.planetData[planetHoverIndex].money)} | ${format(data.planetData[planetHoverIndex].chickens)} Chickens\nx${format(planetBoosts[planetHoverIndex])} ${planetBoostNames[planetHoverIndex]} Boost` : `Planet ???\n${planetDescs[planetHoverIndex]}\n\n??? | ??? Chickens\n${planetBoostNames[planetHoverIndex]}`
}

function updatePlanetHoverText(i) {
    planetHoverIndex = i
}

function discoverPlanet() {
    if(data.currentEgg === discoveryEggIndexes[data.discoveries] && data.chickens.gte(discoveryReqs[data.discoveries]) && data.planetsDiscovered[planetHoverIndex] === false) {
        data.chickens = data.chickens.sub(discoveryReqs[data.discoveries])
        data.planetsDiscovered[planetHoverIndex] = true
        data.discoveries += 1
    }   
}

function journeyToPlanet() {
    if(data.inPath === true || contractActive()) return
    if(data.onPlanet === false && data.planetsDiscovered[planetHoverIndex] === true) {
        data.currentPlanetIndex = planetHoverIndex
        data.research = data.planetData[data.currentPlanetIndex].research
        data.chickens = data.planetData[data.currentPlanetIndex].chickens
        data.money = data.planetData[data.currentPlanetIndex].money
        data.onPlanet = true
        eggValueBonus = D(1)
        chickenGain = D(0)
        layRate = D(1)
        data.currentEgg = 0
    }
    else if(data.onPlanet === true) {
        data.onPlanet = false
        data.planetData[data.currentPlanetIndex].research = data.research
        data.planetData[data.currentPlanetIndex].chickens = data.chickens
        data.planetData[data.currentPlanetIndex].money = data.money
        data.money = D(0)
        data.chickens = D(0)
        data.research = new Array(28).fill(D(0))
        data.currentEgg = 0
        eggValueBonus = D(1)
        chickenGain = D(0)
        data.currentPlanetIndex = -1
    }
}
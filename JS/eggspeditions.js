const planetNames = ['Arcturus','Ravnar','Xylok','Triton','Hereth','Malak']
const planetDescs = ['','','','','','']
const discoveryEggNames = ['Rocket Fuel','Fusion','Quantum','Dilithium','Antimatter','Dark Matter']
const discoveryEggIndexes = [3,5,6,10,13,14]
let planetHoverIndex = -1
function updateEggspeditionsUI() {
    for(let i = 0; i < data.planetsDiscovered.length; i++) {
        if((DOMCacheGetOrSet('planet'+i).getAttribute('src') !== `Imgs/planet${i+1}.png` && data.planetsDiscovered[i] === true) || (DOMCacheGetOrSet('planet'+i).getAttribute('src') !== `Imgs/questionplanet.png` && data.planetsDiscovered[i] === false))
            DOMCacheGetOrSet('planet'+i).src = data.planetsDiscovered[i] === true ? `Imgs/planet${i+1}.png` : `Imgs/questionplanet.png`
    }
    DOMCacheGetOrSet('discoveryButton').classList = data.currentEgg === discoveryEggIndexes[data.discoveries] ? 'unlockedResearch' : 'lockedResearch'
}

function updatePlanetHoverText(i) {
    DOMCacheGetOrSet('planetHoverText').innerText = data.planetsDiscovered[i] === true ? `Planet ${planetNames[i]}\n${planetDescs[i]}` : `This Planet Has Not Been Discovered Yet`
    planetHoverIndex = i
}

for(let i = 0; i < planetNames.length; i++) {
    DOMCacheGetOrSet('planet'+i).addEventListener('mouseover', () => updatePlanetHoverText(i))
}
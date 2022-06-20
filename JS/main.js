let diff = 0;
function mainLoop() {
    diff = (Date.now()-data.time)*data.devSpeed/1000
    data.time = Date.now()
    updateResearch()
    updateEggValueBonus()
    updateIntHatch()
    updateLayRate()
    updatePrestige()
    updateEnlightenment()
    updateAutomation()
    if(data.chickens.lt(1) && data.epicResearch[8].gte(epicResearchMaxLevel[8]))
        data.chickens = D(1)
    for(let i = 0; i < data.contractActive.length; i++) {
        if(data.contractActive[i])
            runContract(i)
    }
    for(let i = 0; i < 6; i++) {
        planetBoosts[i] = data.planetData[i].chickens.gt(0) ? D(1).plus(Decimal.sqrt(Decimal.log(data.planetData[i].chickens,10))) : D(1)
    }
    currentEggValue = data.onPlanet === false ? eggData[data.currentEgg].value.times(eggValueBonus) : planetEggValue[data.currentPlanetIndex].times(eggValueBonus)
    data.chickens = data.onPlanet === true && data.currentPlanetIndex === 1 ? data.chickens.plus(chickenGain.times(diff/60)) : data.chickens.plus(chickenGain.times(diff/15))
    data.money = data.onPlanet === true && data.currentPlanetIndex === 1 ? data.money.add(((currentEggValue.times(soulEggBoost)).mul(diff/4)).times(data.chickens.times(layRate))) : data.money.add(((currentEggValue.times(soulEggBoost)).mul(diff)).times(data.chickens.times(layRate)))
    //Stats Updates
    for(let i = data.unlockedEgg.length - 1; i > -1; i--) {
        if(data.unlockedEgg[i] === true) {
            data.stats.bestEgg = eggData[i+1].name
            break
        }
        if(i === 0 && data.unlockedEgg[i] === false) {
            data.stats.bestEgg = 'Regular'
        }
    }
    if(data.stats.bestMoney.lt(data.money)) data.stats.bestMoney = data.money
    if(data.stats.bestChickens.lt(data.chickens)) data.stats.bestChickens = data.chickens
    if(data.stats.bestSoulEggs.lt(data.bestSoulEggs)) data.stats.bestSoulEggs = data.bestSoulEggs
    if(data.stats.bestProphecyEggs.lt(data.prophecyEggs)) data.stats.bestProphecyEggs = data.prophecyEggs
    data.stats.timePlayed = data.stats.timePlayed.plus(diff)
    data.stats.timeInPrestige = data.stats.timeInPrestige.plus(diff)
    checkAchievements()
    updateHTML()
    if(DOMCacheGetOrSet('faviconLink').getAttribute('href') !== `Imgs/${eggData[data.currentEgg].id}.png`)
        DOMCacheGetOrSet('faviconLink').href = `Imgs/${eggData[data.currentEgg].id}.png`
}

function changeTab(i) {
    const tabIDs = ['egg','research','contracts','settings','prestige','eggpedition','enlightenment','achievement']
    data.currentTab = i
    for(let i = 0; i < tabIDs.length; i++) {
        DOMCacheGetOrSet(`${tabIDs[i]}Tab`).style.display = i === data.currentTab ? 'flex' : 'none'
    }
}

function changeSubTab(a,b) {
    const subAmts = [2]
    const subIDs = ['set']
    data.currentSubTab[a] = b
    for(let i = 0; i <= subAmts[a]; i++) {
        DOMCacheGetOrSet(`${subIDs[a]}Sub${i}`).style.display = i === data.currentSubTab[a] ? 'flex' : 'none'
    }
}

function toggle(i) {data.settingsToggles[i] = !data.settingsToggles[i]}
function toggleBA(i) {
    const numString = ['1','5','10','20']
    data.buyAmounts[i] = data.buyAmounts[i] + 1 === 4 ? 0 : data.buyAmounts[i] + 1
    DOMCacheGetOrSet(`ba${i}`).innerHTML = `Buy Amount: ${numString[data.buyAmounts[i]]}`
}

function updateStats() {
    DOMCacheGetOrSet('stat0').textContent = `Best Money: $${format(data.stats.bestMoney)}`
    DOMCacheGetOrSet('stat1').textContent = `Best Egg: ${data.stats.bestEgg}`
    DOMCacheGetOrSet('stat2').textContent = `Best Chickens: ${format(data.stats.bestChickens)}`
    DOMCacheGetOrSet('stat3').textContent = `Contracts Completed: ${format(data.stats.contractsComplete)}`
    DOMCacheGetOrSet('stat4').textContent = `Time Played: ${formatTime(data.stats.timePlayed)}`
    DOMCacheGetOrSet('stat5').textContent = `Prestige 1: ${format(data.stats.prestiges[0])} Soul Eggs`
    DOMCacheGetOrSet('stat6').textContent = `Prestige 2: ${format(data.stats.prestiges[1])} Soul Eggs`
    DOMCacheGetOrSet('stat7').textContent = `Prestige 3: ${format(data.stats.prestiges[2])} Soul Eggs`
    DOMCacheGetOrSet('stat8').textContent = `Time In Current Run: ${formatTime(data.stats.timeInPrestige)}`
    DOMCacheGetOrSet('stat9').textContent = `Best Soul Eggs: ${format(data.stats.bestSoulEggs)}`
    DOMCacheGetOrSet('stat10').textContent = `Best Prophecy Eggs: ${format(data.stats.bestProphecyEggs)}`
}

 function createAlert(a,b,c) {
    DOMCacheGetOrSet('alertContainer').style.border = `4px solid #${c}`
    DOMCacheGetOrSet('alertTitle').innerHTML = a
    DOMCacheGetOrSet('alertContent').innerHTML = b
    DOMCacheGetOrSet('alert').style.display = 'block'
    DOMCacheGetOrSet('alertContainer').style.display = 'block'
}

function createPrompt(a,b) {
    let old_element = document.getElementById("promptButton");
    let new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    DOMCacheGetOrSet('promptInput').value = ''
    DOMCacheGetOrSet('promptContainer').style.border = "4px solid whitesmoke"
    DOMCacheGetOrSet('promptTitle').innerHTML = a
    DOMCacheGetOrSet('prompt').style.display = 'block'
    DOMCacheGetOrSet('promptContainer').style.display = 'block'
    switch(b) {
        case 0:
            document.getElementById('promptButton').addEventListener('click', () => { importSave() })
            break
    }
}
function createConfirmation(a) {
    let old_element = document.getElementById("yesConfirm");
    let new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    old_element = document.getElementById("noConfirm");
    new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    switch(a) {
        case 'prestige':
            if(data.currentEgg < 3) return
            document.getElementById('confirmContainer').style.border = `4px solid #8e3dcf`
            document.getElementById('confirmTitle').innerHTML = 'Are you sure you want to prestige?'
            document.getElementById('confirmContent').innerHTML = 'This will reset all progress for Soul Eggs'
            document.getElementById('confirm').style.display = 'block'
            document.getElementById('confirmContainer').style.display = 'block'
            document.getElementById('noConfirm').addEventListener('click', () => {closeModal(2)})
            document.getElementById('yesConfirm').addEventListener('click', () => {prestige();closeModal(2)})
            break
        case 'reset':
            document.getElementById('confirmContainer').style.border = `4px solid #812626`
            document.getElementById('confirmTitle').innerHTML = 'Are you sure you want to reset your game?'
            document.getElementById('confirmContent').innerHTML = 'This will export your savefile to the clipboard but delete your save game in local storage.'
            document.getElementById('confirm').style.display = 'block'
            document.getElementById('confirmContainer').style.display = 'block'
            document.getElementById('noConfirm').addEventListener('click', () => {closeModal(2)})
            document.getElementById('yesConfirm').addEventListener('click', () => {fullReset();closeModal(2)})
    }
}
function closeModal(i) {
    switch(i) {
        case 0:
            document.getElementById('alertContainer').style.display = 'none'
            document.getElementById('alert').style.display = 'none'
            break
        case 1:
            document.getElementById('promptContainer').style.display = 'none'
            document.getElementById('prompt').style.display = 'none'
            break
        case 2:
            document.getElementById('confirm').style.display = 'none'
            document.getElementById('confirmContainer').style.display = 'none'
            break
    }
    
}

window.setInterval(function() {
    mainLoop()
},50)
let diff = 0;
const eggImgPath = 'Imgs/Eggs/'

function generateHTMLAndHandlers() {
    for(let i = 0; i < tabIDs.length; i++) {
        DOMCacheGetOrSet(`tabButton${i}`).addEventListener('click', () => {changeTab(i)})
    }
    //Egg Tab
    DOMCacheGetOrSet('mainButton').addEventListener('click', () => {data.chickens = data.chickens.plus(1)})
    //Research Tab
    for(let i = 0; i < commonResearchNames.length; i++) {
        DOMCacheGetOrSet(`r${i}`).classList = 'redButton'
        DOMCacheGetOrSet(`r${i}`).onclick = () => purchaseResearch(i)
    }
    //Contracts Tab
    for(let i = 0; i < 3; i++) {
        DOMCacheGetOrSet(`infContractButton${i}`).addEventListener('click', () => {startContract(i)})
    }
    //Eggspeditions Tab
    DOMCacheGetOrSet('discoveryButton').addEventListener('click', () => {discoverPlanet()})
    DOMCacheGetOrSet('eggspeditionButton').addEventListener('click', () => {journeyToPlanet()})
    for(let i = 0; i < planetNames.length; i++) {
        DOMCacheGetOrSet('planet'+i).addEventListener('click', () => updatePlanetHoverText(i))
    }
    //Prestige Tab
    for(let i = 0; i < epicResearchNames.length; i++) {
        DOMCacheGetOrSet(`er${i}`).classList = 'redButton'
        DOMCacheGetOrSet(`er${i}`).onclick = () => purchaseEpicResearch(i)
    }
    //Ascension Tab
    for(let i = 0; i < gemObjs.length; i++) {
        DOMCacheGetOrSet(`gem${i}Img`).src = gemObjs[i].src
        DOMCacheGetOrSet(`gem${i}Text`).innerText = gemObjs[i].name
    }
    //Achievements Tab
    for(let i = 0; i < achievementObjs.length; i++) 
        DOMCacheGetOrSet('ach' + i).addEventListener('mouseover', () => updateAchText(i))
    //Automators
    for(let i = 0; i < data.autoActive.length; i++) {
        DOMCacheGetOrSet(`auto${i}`).addEventListener('click', () => { data.autoActive[i] = !data.autoActive[i] })
    }

    for(let i = 1; i < data.settingsToggles.length; i++) {
        if(i === 3)
            DOMCacheGetOrSet(`setTog${i}`).classList = data.settingsToggles[i] ? 'yellowButton' : 'blueButton'
        else if(i !== 0 || i !== 3)
            DOMCacheGetOrSet(`setTog${i}`).classList = data.settingsToggles[i] ? 'greenButton' : 'redButton'
    }

    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
        this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
    });
    } 
}

function mainLoop() {
    diff = (Date.now()-data.time)*data.devSpeed/1000
    updateResearch()
    updateEggValueBonus()
    updateIntHatch()
    updateLayRate()
    updatePrestige()
    updateAscension()
    updateAutomation()
    if(data.chickens.lt(1) && data.epicResearch[8].gte(epicResearchMaxLevel[8]))
        data.chickens = D(1)
    for(let i = 0; i < data.contractActive.length; i++) {
        if(data.contractActive[i])
            runContract(i)
    }
    for(let i = 0; i < 6; i++) {
        planetBoosts[i] = data.planetData[i].money.gt(0) ? D(1).plus(Decimal.sqrt(Decimal.log(data.planetData[i].money,5))) : D(1)
    }
    currentEggValue = data.onPlanet === false ? eggData[data.currentEgg].value.times(eggValueBonus) : planetEggValue[data.currentPlanetIndex].times(eggValueBonus)
    data.chickens = data.onPlanet === true && data.currentPlanetIndex === 1 ? data.chickens.plus(chickenGain.times(diff/60)) : data.chickens.plus(chickenGain.times(diff/15))
    data.money = data.onPlanet === true && data.currentPlanetIndex === 1 ? data.money.add(((currentEggValue.times(soulEggBoost)).mul(diff/4)).times(data.chickens.times(layRate))) : data.money.add(((currentEggValue.times(soulEggBoost)).mul(diff)).times(data.chickens.times(layRate)))
    if(data.bestRunMoney.lt(data.money)) data.bestRunMoney = data.money
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
    if(!data.unlockedContracts && data.unlockedEgg[5]) data.unlockedContracts = true;
    if(!data.generatedContracts && data.unlockedContracts) {
        for(let i = 0; i < 3; i++)
            generateContract(i)
        data.generatedContracts = true
    }

    checkAchievements()
    updateHTML()
    if(DOMCacheGetOrSet('faviconLink').getAttribute('href') !== `${eggImgPath}${eggData[data.currentEgg].id}.png`)
        DOMCacheGetOrSet('faviconLink').href = `${eggImgPath}${eggData[data.currentEgg].id}.png`
    data.time = Date.now()
}
const tabIDs = ['egg','research','contracts','settings','prestige','eggpedition','achievement','ascension']
function changeTab(i) {
    data.currentTab = i
    for(let i = 0; i < tabIDs.length; i++) {
        DOMCacheGetOrSet(`${tabIDs[i]}Tab`).style.display = i === data.currentTab ? 'flex' : 'none'
        
    }
}

function changeSubTab(a,b) {
    const subAmts = [4,2,2]
    const subIDs = ['set','con','asc']
    data.currentSubTab[a] = b
    for(let i = 0; i < subAmts[a]; i++) {
        DOMCacheGetOrSet(`${subIDs[a]}Sub${i}`).style.display = i === data.currentSubTab[a] ? 'flex' : 'none'
    }
}

function toggle(i) {
    data.settingsToggles[i] = !data.settingsToggles[i]
    if(i === 3)
         DOMCacheGetOrSet(`setTog${i}`).classList = data.settingsToggles[i] ? 'yellowButton' : 'blueButton'
    else if(i !== 0)
        DOMCacheGetOrSet(`setTog${i}`).classList = data.settingsToggles[i] ? 'greenButton' : 'redButton'
}
function toggleBA(i) {
    const numString = ['1','5','10','20']
    data.buyAmounts[i] = data.buyAmounts[i] + 1 === 4 ? 0 : data.buyAmounts[i] + 1
    DOMCacheGetOrSet(`ba${i}`).innerText = `Buy Amount: ${numString[data.buyAmounts[i]]}`
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
    DOMCacheGetOrSet('alertContainer').style.border = `2px solid ${c}`
    DOMCacheGetOrSet('alertTitle').innerText = a
    DOMCacheGetOrSet('alertContent').innerText = b
    DOMCacheGetOrSet('alert').style.display = 'block'
    DOMCacheGetOrSet('alertContainer').style.display = 'block'
}

function createPrompt(a,b) {
    let old_element = document.getElementById("promptButton");
    let new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    DOMCacheGetOrSet('promptInput').value = ''
    DOMCacheGetOrSet('promptContainer').style.border = "4px solid whitesmoke"
    DOMCacheGetOrSet('promptTitle').innerText = a
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
            document.getElementById('confirmTitle').innerText = 'Are you sure you want to prestige?'
            document.getElementById('confirmContent').innerText = 'This will reset all progress for Soul Eggs'
            document.getElementById('confirm').style.display = 'block'
            document.getElementById('confirmContainer').style.display = 'block'
            document.getElementById('noConfirm').addEventListener('click', () => {closeModal(2)})
            document.getElementById('yesConfirm').addEventListener('click', () => {prestige();closeModal(2)})
            break
        case 'reset':
            document.getElementById('confirmContainer').style.border = `4px solid #812626`
            document.getElementById('confirmTitle').innerText = 'Are you sure you want to reset your game?'
            document.getElementById('confirmContent').innerText = 'This will export your savefile to the clipboard but delete your save game in local storage.'
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

function setTheme() {
    const themeNames = ['Original','StarStream','White']
    document.querySelectorAll("link").forEach( function(e) {
        if (e.href.includes("Theme")) e.remove();
    });

    var head = document.head;
    var link = document.createElement('link');

    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = "CSS/Theme-" + themeNames[data.themeIndex] + ".css";

    head.appendChild(link);
}

function changeTheme() {
    const themeDisplayNames = ['Original','Void Stream','Flashbang']
    data.themeIndex++
    if(data.themeIndex >= themeDisplayNames.length) data.themeIndex = 0
    DOMCacheGetOrSet('setTog4').innerText = `Theme: ${themeDisplayNames[data.themeIndex]}`
    setTheme()
}

window.setInterval(function() {
    mainLoop()
},50)

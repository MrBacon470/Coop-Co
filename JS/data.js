function D(x){return new Decimal(x)}
//create all the variables in a data object for saving
function getDefaultObject() {
    return {
        money: D(0),
        chickens: D(0),
        soulEggs: D(0),
        prophecyEggs: D(0),
        bestSoulEggs: D(0),
        hasPrestiged: false,
        unlockedContracts: false,
        generatedContracts: false,
        contracts: [{
            title: '',
            description: '',
            image: '',
            eggIndex: 0,
            reward: D(0),
            rewardType: '',
            goal: D(0)
        },{
            title: '',
            description: '',
            image: '',
            eggIndex: 0,
            reward: D(0),
            rewardType: '',
            goal: D(0)
        },{
            title: '',
            description: '',
            image: '',
            eggIndex: 0,
            reward: D(0),
            rewardType: '',
            goal: D(0)
        }],
        contractActive: [false,false,false],
        currentEgg: 0,
        unlockedEgg: new Array(18).fill(false),
        research: new Array(28).fill(D(0)),
        epicResearch: new Array(11).fill(D(0)),
        autoActive: [false,false,false,false],
        enlightenments: new Array(5).fill(D(0)),
        inPath: false,
        knowledge: D(0),
        planetsDiscovered: new Array(6).fill(false),
        discoveries: 0,
        currentPlanetIndex: 0,
        onPlanet: false,
        planetData: [{money: D(0), chickens: D(0), research: new Array(28).fill(D(0))},{money: D(0), chickens: D(0), research: new Array(28).fill(D(0))},{money: D(0), chickens: D(0), research: new Array(28).fill(D(0))},{money: D(0), chickens: D(0), research: new Array(28).fill(D(0))},{money: D(0), chickens: D(0), research: new Array(28).fill(D(0))},{money: D(0), chickens: D(0), research: new Array(28).fill(D(0))}],
        achievements: new Array(41).fill(false),
        stats: {
            bestMoney: D(0),
            bestEgg: '',
            bestChickens: D(0),
            contractsComplete: D(0),
            timePlayed: D(0),
            prestiges: [D(0),D(0),D(0)],
            timeInPrestige: D(0),
            bestSoulEggs: D(0),
            bestProphecyEggs: D(0),
        },
        buyAmounts: [0,0],
        time: Date.now(),
        currentTab: 0,
        currentSubTab: [0],
        settingsToggles: [true,true,true],
        currentUpdate: 'v1.1.1',
        devSpeed: 1,
    }
}
let data = getDefaultObject()
//saving and loading
const saveName = 'coopCo'
function save(){
    window.localStorage.setItem(saveName, JSON.stringify(data))
    $.notify('Game Saved','info')
}
function load() {
    let savedata = JSON.parse(window.localStorage.getItem(saveName))
    if(savedata === null || savedata === undefined) savedata = getDefaultObject()
    else if (savedata !== undefined) fixSave(data, savedata)
    //Old Resets
    if(data.currentUpdate === 'v0.0.0' || data.currentUpdate === 'v0.0.1' || data.currentUpdate === 'v0.0.2' || data.currentUpdate === 'v0.0.3') {
        createAlert('Update!','Your save is from a Beta Testing release of Coop Co<br>It has been deleted since many balancing things have changed','#ff0000')      
        deleteSave()
    }
    //Update 1.0.0 Saves to Current Version
    else if(data.currentUpdate !== getDefaultObject().currentUpdate){
        createAlert("Welcome Back!",`The current version is ${getDefaultObject().currentUpdate}, View the Changelog (in settings) for details`,"812626")
        
        data.currentUpdate = getDefaultObject().currentUpdate
    }
    for(let i = 0; i < data.buyAmounts.length; i++) {
        const numString = ['1','5','10','20']
        DOMCacheGetOrSet(`ba${i}`).innerHTML = `Buy Amount: ${numString[data.buyAmounts[i]]}`
        DOMCacheGetOrSet(`ba${i}`).onclick = () => {toggleBA(i)}
    }
}
//fix saves
function fixSave(main=getDefaultObject(), data) {
    if (typeof data === "object") {
        Object.keys(data).forEach(i => {
            if (main[i] instanceof Decimal) {
                main[i] = D(data[i]!==null?data[i]:main[i])
            } else if (typeof main[i]  == "object") {
                fixSave(main[i], data[i])
            } else {
                main[i] = data[i]
            }
        })
        return main
    }
    else return getDefaultObject()
}
function exportSave(){
    save()
    let exportedData = btoa(JSON.stringify(data));
    const exportedDataText = document.createElement("textarea");
    exportedDataText.value = exportedData;
    document.body.appendChild(exportedDataText);
    exportedDataText.select();
    exportedDataText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(exportedDataText);
    $.notify('Save File Exported to Clip Board','success')
}
function importSave(){
    let importedData = DOMCacheGetOrSet('promptInput').value
    if(importedData.length <= 0 || importedData === undefined) {
        $.notify('No Data Imported','error')
        DOMCacheGetOrSet('promptContainer').style.display = 'none'
        return
    }
    else if(importedData.toLowerCase() === '69' || importedData.toLowerCase() === '420'){
        $.notify('Nice','success')
        DOMCacheGetOrSet('promptContainer').style.display = 'none'
        return
    }
    data = Object.assign(getDefaultObject(), JSON.parse(atob(importedData)))
    save()
    location.reload()
}
window.setInterval(function(){
    save()
}, 30000);
window.onload = function (){
    load()
    diff = diff = (Date.now()-data.time)*data.devSpeed/1000
    $.notify('Welcome Back!\nYou were gone for ' + formatTime(diff), 'info')
    changeTab(data.currentTab)
    for(let i = 0; i < data.currentSubTab.length; i++) {
        changeSubTab(i,data.currentSubTab[i])
    }
    scrollNextMessage()
    $.notify('Game Loaded','info')
    updateAchClass()
}
//full reset
function fullReset(){
    exportSave()
    window.localStorage.removeItem(saveName)
    location.reload()
}
function deleteSave(){
        window.localStorage.removeItem(saveName)
        location.reload()
}

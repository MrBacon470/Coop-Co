const D = x => new Decimal(x)
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
        currentEgg: 0,
        unlockedEgg: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
        research: [D(0),D(0),D(0),D(0),D(0),D(0),D(0),D(0),D(0),D(0),D(0),D(0),D(0),D(0),D(0),D(0),D(0),D(0),D(0),D(0),D(0),D(0),D(0),D(0),D(0),D(0),D(0),D(0)],
        epicResearch: [D(0),D(0),D(0),D(0),D(0),D(0)],
        buyAmounts: [0,0],
        time: Date.now(),
        currentTab: 0,
        settingsToggles: [true],
        currentUpdate: 'v0.0.2',
        devSpeed: 1,
    }
}
let data = getDefaultObject()
//saving and loading
const saveName = 'coopCo'
function save(){
    window.localStorage.setItem(saveName, JSON.stringify(data))
}
function load() {
    let savedata = JSON.parse(window.localStorage.getItem(saveName))
    if(savedata === null || savedata === undefined) savedata = getDefaultObject()
    else if (savedata !== undefined) fixSave(data, savedata)
    if(data.currentUpdate !== getDefaultObject().currentUpdate){
        createAlert("Welcome Back!",`The current version is ${getDefaultObject().currentUpdate}, View the Changelog for details`,"812626")
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
}
function importSave(){
    let importedData = DOMCacheGetOrSet('promptInput').value
    if(importedData.length <= 0 || importedData === undefined) {
        createAlert('Error!','No data was entered!','#ff0000')
        return
    }
    data = Object.assign(getDefaultObject(), JSON.parse(atob(importedData)))
    save()
    location.reload()
}
window.setInterval(function(){
    save()
}, 10000);
window.onload = function (){
    load()
    changeTab(data.currentTab)
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

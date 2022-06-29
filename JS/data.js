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
        currentUpdate: 'v1.1.3',
        devSpeed: 1,
    }
}
//eyJtb25leSI6IjEuNDcwODE0MzcxNDc3ODYyOGUzOSIsImNoaWNrZW5zIjoiMTAyMDgxLjk2Nzk5OTk5OTQ3Iiwic291bEVnZ3MiOiIxLjkwMjgwNDA5MDAwNjg1M2UxNyIsInByb3BoZWN5RWdncyI6IjM2NyIsImJlc3RTb3VsRWdncyI6IjEuOTAyODA0MDkwMDA2ODUzZTE3IiwiaGFzUHJlc3RpZ2VkIjp0cnVlLCJ1bmxvY2tlZENvbnRyYWN0cyI6dHJ1ZSwiZ2VuZXJhdGVkQ29udHJhY3RzIjp0cnVlLCJjb250cmFjdHMiOlt7InRpdGxlIjoiUGFuZGVtaWMiLCJkZXNjcmlwdGlvbiI6IkEgUGFuZGVtaWMgaXMgY292ZXJpbmcgdGhlIHdvcmxkLCBNZWRpY2FsIEVnZ3MgYXJlIG5lZWRlZCB0byBzYXZlIGxpdmVzLiIsImltYWdlIjoiSW1ncy9tZWRpY2FsLnBuZyIsImVnZ0luZGV4IjoyLCJyZXdhcmQiOiI4IiwicmV3YXJkVHlwZSI6IlByb3BoZWN5IEVnZ3MiLCJnb2FsIjoiMS43NTY5NjA4NzczOTg3MzNlNDEifSx7InRpdGxlIjoiU3VwcmVtZSBEaWV0cyIsImRlc2NyaXB0aW9uIjoiRGlldGluZyBpcyBiYWNrIGluIGZhc2hpb24gcGVvcGxlIG5lZWQgbW9yZSBTdXBlcmZvb2QgRWdncy4iLCJpbWFnZSI6IkltZ3Mvc3VwZXJmb29kLnBuZyIsImVnZ0luZGV4IjoxLCJyZXdhcmQiOiI5IiwicmV3YXJkVHlwZSI6IlByb3BoZWN5IEVnZ3MiLCJnb2FsIjoiNS4wODgwMzQ1NjA5NjY3MzVlNDUifSx7InRpdGxlIjoiRW5lcmd5IENyaXNpcyIsImRlc2NyaXB0aW9uIjoiQSBDYWxpZm9ybmlhbiBFbmVyZ3kgU2hvcnRhZ2UgbWVhbnMgbW9yZSBkZW1hbmQgZm9yIEZ1c2lvbiBFZ2dzLiIsImltYWdlIjoiSW1ncy9mdXNpb24ucG5nIiwiZWdnSW5kZXgiOjUsInJld2FyZCI6IjEwIiwicmV3YXJkVHlwZSI6IlByb3BoZWN5IEVnZ3MiLCJnb2FsIjoiNS4xNTg2MzQ0Mzg0MTg2Nzc1ZTQ4In1dLCJjb250cmFjdEFjdGl2ZSI6W2ZhbHNlLGZhbHNlLGZhbHNlXSwiY3VycmVudEVnZyI6MTgsInVubG9ja2VkRWdnIjpbdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWVdLCJyZXNlYXJjaCI6WyI1MCIsIjQwIiwiMTAiLCIzMCIsIjEiLCIxMCIsIjEiLCI1MCIsIjM1IiwiMTUiLCIzMCIsIjYwIiwiNSIsIjMwIiwiMTAwIiwiMjUwIiwiMjAiLCI3IiwiMTAwIiwiMzAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCJdLCJlcGljUmVzZWFyY2giOlsiMjAiLCIxMCIsIjkwIiwiMjAiLCIyMCIsIjIwIiwiMSIsIjEiLCIxIiwiMSIsIjEiXSwiYXV0b0FjdGl2ZSI6W3RydWUsdHJ1ZSx0cnVlLGZhbHNlXSwiZW5saWdodGVubWVudHMiOlsiMjEiLCIxIiwiMSIsIjAiLCIwIl0sImluUGF0aCI6ZmFsc2UsImtub3dsZWRnZSI6IjIzOC44NDYzNDY1MjU3MDI5OCIsInBsYW5ldHNEaXNjb3ZlcmVkIjpbZmFsc2UsdHJ1ZSxmYWxzZSx0cnVlLGZhbHNlLGZhbHNlXSwiZGlzY292ZXJpZXMiOjIsImN1cnJlbnRQbGFuZXRJbmRleCI6LTEsIm9uUGxhbmV0IjpmYWxzZSwicGxhbmV0RGF0YSI6W3sibW9uZXkiOiIwIiwiY2hpY2tlbnMiOiIwIiwicmVzZWFyY2giOlsiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCJdfSx7Im1vbmV5IjoiMS40OTg0NDMzNzk2ODk3MjY3ZTMzIiwiY2hpY2tlbnMiOiIxMDMzOS4wNjQ2NjY2NjY2NzMiLCJyZXNlYXJjaCI6WyI1MCIsIjQwIiwiMTAiLCIzMCIsIjEiLCIxMCIsIjEiLCI1MCIsIjM1IiwiMTUiLCIzMCIsIjYwIiwiNSIsIjMwIiwiMTAwIiwiMCIsIjIwIiwiNyIsIjAiLCIzMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIl19LHsibW9uZXkiOiIwIiwiY2hpY2tlbnMiOiIwIiwicmVzZWFyY2giOlsiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCJdfSx7Im1vbmV5IjoiMTMzODc3NTQuNzcyNTQyMDQ2IiwiY2hpY2tlbnMiOiI1MjUuODEyNzk5OTk5OTk5NCIsInJlc2VhcmNoIjpbIjUwIiwiNDAiLCIxMCIsIjIiLCIxIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiXX0seyJtb25leSI6IjAiLCJjaGlja2VucyI6IjAiLCJyZXNlYXJjaCI6WyIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIl19LHsibW9uZXkiOiIwIiwiY2hpY2tlbnMiOiIwIiwicmVzZWFyY2giOlsiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCJdfV0sImFjaGlldmVtZW50cyI6W3RydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLGZhbHNlLGZhbHNlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSx0cnVlLGZhbHNlLHRydWUsZmFsc2UsZmFsc2UsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZV0sInN0YXRzIjp7ImJlc3RNb25leSI6IjMuNjA3NDI5MjU5NTM4MTM3ZTY1IiwiYmVzdEVnZyI6IkVubGlnaHRlbm1lbnQiLCJiZXN0Q2hpY2tlbnMiOiIxMzM3NzUyODkuMDM3MzMzMzQiLCJjb250cmFjdHNDb21wbGV0ZSI6IjQ4IiwidGltZVBsYXllZCI6IjQ0MjgyOS4zODEwMDAwNDUzNCIsInByZXN0aWdlcyI6WyIxMDU5MjgxODYzMC42MTQ1NzYiLCIxLjUyMzgzMjM1MjgzOTc5ODFlMTciLCI4ODA1Njg1MTgwOTQzNjc2Il0sInRpbWVJblByZXN0aWdlIjoiOTcwMjguMTEwMDAwMDAwNDUiLCJiZXN0U291bEVnZ3MiOiIxLjkwMjgwNDA5MDAwNjg1M2UxNyIsImJlc3RQcm9waGVjeUVnZ3MiOiIzNjcifSwiYnV5QW1vdW50cyI6WzMsM10sInRpbWUiOjE2NTY0NDMyNTAxNzEsImN1cnJlbnRUYWIiOjMsImN1cnJlbnRTdWJUYWIiOlswXSwic2V0dGluZ3NUb2dnbGVzIjpbdHJ1ZSx0cnVlLGZhbHNlXSwiY3VycmVudFVwZGF0ZSI6InYxLjEuMyIsImRldlNwZWVkIjoxLCJjdXJyZW50bHlEaXNjb3ZlcmluZyI6ZmFsc2V9
//End Game enlightenment save
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
    }//g
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
    diff = (Date.now()-data.time)*data.devSpeed/1000
    
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

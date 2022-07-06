function D(x){return new Decimal(x)}
//create all the variables in a data object for saving
function getDefaultObject() {
    return {
        money: D(0),
        bestRunMoney: D(0),
        chickens: D(0),
        soulEggs: D(0),
        prophecyEggs: D(0),
        bestSoulEggs: D(0),
        hasPrestiged: false,
        unlockedContracts: false,
        generatedContracts: false,
        regeneratedContracts: false,
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
        themeIndex: 0,
        buyAmounts: [0,0,0],
        time: Date.now(),
        currentTab: 0,
        currentSubTab: [0],
        settingsToggles: [true,true,true,true],
        currentUpdate: 'v1.1.5',
        devSpeed: 1,
    }
}
const endGameSave = Object.assign(JSON.parse(atob("eyJtb25leSI6IjEuMzQ1NjM1NjkwNDA0MjgxN2U2NyIsImNoaWNrZW5zIjoiNTkyMTIuMDY4OTMwOTkwNCIsInNvdWxFZ2dzIjoiOC4wNjQ2NTAzNjA1MzA5ZTIwIiwicHJvcGhlY3lFZ2dzIjoiMTQ1NjIzMTAiLCJiZXN0U291bEVnZ3MiOiI4LjA2NDY1MDM2MDUzMDllMjAiLCJoYXNQcmVzdGlnZWQiOnRydWUsInVubG9ja2VkQ29udHJhY3RzIjp0cnVlLCJnZW5lcmF0ZWRDb250cmFjdHMiOnRydWUsImNvbnRyYWN0cyI6W3sidGl0bGUiOiJQYW5kZW1pYyIsImRlc2NyaXB0aW9uIjoiQSBQYW5kZW1pYyBpcyBjb3ZlcmluZyB0aGUgd29ybGQsIE1lZGljYWwgRWdncyBhcmUgbmVlZGVkIHRvIHNhdmUgbGl2ZXMuIiwiaW1hZ2UiOiJJbWdzL21lZGljYWwucG5nIiwiZWdnSW5kZXgiOjIsInJld2FyZCI6IjgiLCJyZXdhcmRUeXBlIjoiUHJvcGhlY3kgRWdncyIsImdvYWwiOiI0LjkxMTQ5NjU4NTEyNzAxOWU0MiJ9LHsidGl0bGUiOiJTdXByZW1lIERpZXRzIiwiZGVzY3JpcHRpb24iOiJEaWV0aW5nIGlzIGJhY2sgaW4gZmFzaGlvbiBwZW9wbGUgbmVlZCBtb3JlIFN1cGVyZm9vZCBFZ2dzLiIsImltYWdlIjoiSW1ncy9zdXBlcmZvb2QucG5nIiwiZWdnSW5kZXgiOjEsInJld2FyZCI6IjgiLCJyZXdhcmRUeXBlIjoiUHJvcGhlY3kgRWdncyIsImdvYWwiOiIxLjM5NDQ0NTA2NTc5Mjg3MWU0MiJ9LHsidGl0bGUiOiJBSSBCb29tIiwiZGVzY3JpcHRpb24iOiJUaGUgQUkgSW5kdXN0cnkgcmVxdWlyZXMgbW9yZSBBSSBFZ2dzIGZvciB0aGVpciBwcm9qZWN0cy4iLCJpbWFnZSI6IkltZ3MvYWkucG5nIiwiZWdnSW5kZXgiOjE1LCJyZXdhcmQiOiI4IiwicmV3YXJkVHlwZSI6IlByb3BoZWN5IEVnZ3MiLCJnb2FsIjoiMy44NTg5NjU0OTk4NzU2NDk3ZTU1In1dLCJjb250cmFjdEFjdGl2ZSI6W2ZhbHNlLGZhbHNlLGZhbHNlXSwiY3VycmVudEVnZyI6MTcsInVubG9ja2VkRWdnIjpbdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWVdLCJyZXNlYXJjaCI6WyI1MCIsIjQwIiwiMTAiLCIzMCIsIjEiLCIxMCIsIjEiLCI1MCIsIjM1IiwiMTUiLCIzMCIsIjYwIiwiNSIsIjMwIiwiMTAwIiwiMjUwIiwiMjAiLCI3IiwiMTAwIiwiMzAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCJdLCJlcGljUmVzZWFyY2giOlsiMjAiLCIxMCIsIjE0MCIsIjIwIiwiMjAiLCIyMCIsIjEiLCIxIiwiMSIsIjEiLCIxIl0sImF1dG9BY3RpdmUiOlt0cnVlLHRydWUsZmFsc2UsZmFsc2VdLCJlbmxpZ2h0ZW5tZW50cyI6WyI3NiIsIjI0IiwiMTQiLCI3IiwiMiJdLCJpblBhdGgiOmZhbHNlLCJrbm93bGVkZ2UiOiI5NDA4LjIwOTU0MTcwMjczOCIsInBsYW5ldHNEaXNjb3ZlcmVkIjpbdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWVdLCJkaXNjb3ZlcmllcyI6NiwiY3VycmVudFBsYW5ldEluZGV4IjotMSwib25QbGFuZXQiOmZhbHNlLCJwbGFuZXREYXRhIjpbeyJtb25leSI6IjEuOTYzOTQ3NzgyMjg0MjA5M2U0NSIsImNoaWNrZW5zIjoiNDc1My41NTk5OTk5OTk5OTkiLCJyZXNlYXJjaCI6WyI1MCIsIjQwIiwiMTAiLCIzMCIsIjEiLCIxMCIsIjEiLCI1MCIsIjM1IiwiMTUiLCIzMCIsIjYwIiwiNSIsIjMwIiwiMTAwIiwiMTc1IiwiMjAiLCI3IiwiMTAwIiwiMzAiLCI1MCIsIjMiLCIwIiwiMjAiLCIwIiwiMCIsIjAiLCIwIl19LHsibW9uZXkiOiIxLjIwNzczMjc3NzEyNjM3MjZlNDYiLCJjaGlja2VucyI6IjEwODc1LjUzNDAwMDAwMDAwNSIsInJlc2VhcmNoIjpbIjUwIiwiNDAiLCIxMCIsIjMwIiwiMSIsIjEwIiwiMSIsIjUwIiwiMzUiLCIxNSIsIjMwIiwiNjAiLCI1IiwiMzAiLCIxMDAiLCIyNTAiLCIyMCIsIjciLCIxMDAiLCIzMCIsIjUwIiwiMyIsIjAiLCIyNSIsIjAiLCIwIiwiMCIsIjAiXX0seyJtb25leSI6IjIuNzE1MDgyMDAyMzM4NjQzZTQ3IiwiY2hpY2tlbnMiOiI0MTI4Ny4zMzQ2MzkxNzA5MDYiLCJyZXNlYXJjaCI6WyI1MCIsIjQwIiwiMTAiLCIzMCIsIjEiLCIxMCIsIjEiLCI1MCIsIjM1IiwiMTUiLCIzMCIsIjYwIiwiNSIsIjMwIiwiMTAwIiwiMjUwIiwiMjAiLCI3IiwiMTAwIiwiMzAiLCI1MCIsIjMiLCIwIiwiMjUiLCIwIiwiMCIsIjAiLCIwIl19LHsibW9uZXkiOiIyODc3MDEwMTA4Ljc2OTUyNjUiLCJjaGlja2VucyI6IjExNDUuMDcxMjI4MzEyMDk0NyIsInJlc2VhcmNoIjpbIjUwIiwiNDAiLCIxMCIsIjMwIiwiMSIsIjEwIiwiMCIsIjIzIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiXX0seyJtb25leSI6IjUuMDMzNjQ4OTExMTI1OTVlNDUiLCJjaGlja2VucyI6IjM5OTIwLjY4MjY2NjY2NjYiLCJyZXNlYXJjaCI6WyI1MCIsIjQwIiwiMTAiLCIzMCIsIjEiLCIxMCIsIjEiLCI1MCIsIjM1IiwiMTUiLCIzMCIsIjYwIiwiNSIsIjMwIiwiMTAwIiwiMjUwIiwiMjAiLCI3IiwiMTAwIiwiMzAiLCI1MCIsIjMiLCIwIiwiMjUiLCIwIiwiMCIsIjAiLCIwIl19LHsibW9uZXkiOiI4LjcyODIwODY2NTIzNDgxOWU0MyIsImNoaWNrZW5zIjoiODQwMjEuNzMwNTk3MDUwNzYiLCJyZXNlYXJjaCI6WyI1MCIsIjQwIiwiMTAiLCIzMCIsIjEiLCIxMCIsIjEiLCI1MCIsIjM1IiwiMTUiLCIzMCIsIjYwIiwiNSIsIjMwIiwiMTAwIiwiMjUwIiwiMjAiLCI3IiwiMTAwIiwiMzAiLCI1MCIsIjAiLCIwIiwiMjQiLCIwIiwiMCIsIjAiLCIwIl19XSwiYWNoaWV2ZW1lbnRzIjpbdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWUsZmFsc2UsZmFsc2VdLCJzdGF0cyI6eyJiZXN0TW9uZXkiOiIyLjkxNDc2MTUyNDY3MDAyZTc3IiwiYmVzdEVnZyI6IkVubGlnaHRlbm1lbnQiLCJiZXN0Q2hpY2tlbnMiOiIxMzM3NzUyODkuMDM3MzMzMzQiLCJjb250cmFjdHNDb21wbGV0ZSI6IjEyMzIiLCJ0aW1lUGxheWVkIjoiNTI2MzU0LjAxNjAwMDEyNTYiLCJwcmVzdGlnZXMiOlsiMTQuNTAzOTA3NjQ4MzM2Mjk3IiwiMi4wMDkxMzY5OTE4OTE5MTdlMTkiLCIzLjc1MDMzMjM3NDc3MTkwNjZlMjAiXSwidGltZUluUHJlc3RpZ2UiOiI5LjUyOTAwMDAwMDAwMDAwNyIsImJlc3RTb3VsRWdncyI6IjguMDY0NjUwMzYwNTMwOWUyMCIsImJlc3RQcm9waGVjeUVnZ3MiOiIxNDU2MjMxMCJ9LCJidXlBbW91bnRzIjpbMywzLDNdLCJ0aW1lIjoxNjU2NTI2Nzc1MDU5LCJjdXJyZW50VGFiIjozLCJjdXJyZW50U3ViVGFiIjpbMF0sInNldHRpbmdzVG9nZ2xlcyI6W3RydWUsdHJ1ZSxmYWxzZV0sImN1cnJlbnRVcGRhdGUiOiJ2MS4xLjMiLCJkZXZTcGVlZCI6MSwiY3VycmVudGx5RGlzY292ZXJpbmciOmZhbHNlfQ==")))
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
    //Update 1.0.0 Saves to Current Version
    if(data.currentUpdate !== getDefaultObject().currentUpdate){
        createAlert("Welcome Back!",`The current version is ${getDefaultObject().currentUpdate}, View the Changelog (in settings) for details`,"812626")
        data.currentUpdate = getDefaultObject().currentUpdate  
    }
    for(let i = 0; i < data.buyAmounts.length; i++) {
        const numString = ['1','5','10','20']
        DOMCacheGetOrSet(`ba${i}`).innerText = `Buy Amount: ${numString[data.buyAmounts[i]]}`
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
    $.notify('Welcome Back!\nYou were gone for ' + formatTime(diff), 'info')
    
    changeTab(data.currentTab)
    for(let i = 0; i < data.currentSubTab.length; i++) {
        changeSubTab(i,data.currentSubTab[i])
    }
    scrollNextMessage()
    $.notify('Game Loaded','info')
    updateAchClass()
    if(data.generatedContracts === true && data.regeneratedContracts === false) {
        for(let i = 0; i < 3; i++)
            generateContract(i)
        data.regeneratedContracts = true
    }
    const themeDisplayNames = ['Original','Void Stream','Flashbang']
    DOMCacheGetOrSet('setTog4').innerText = `Theme: ${themeDisplayNames[data.themeIndex]}`
    setTheme()
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

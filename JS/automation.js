function runAuto(a) {
    switch(a) {
        case 0:
            for(let i = 0; i < 10; i++)
                purchaseResearch(i)
            break
        case 1: 
            for(let i = 10; i < 20; i++)
                purchaseResearch(i)
            break
    }
}
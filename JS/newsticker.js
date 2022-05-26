let newsArray;

function updateNewsArray() {
newsArray = [//always true
    ['Cluck Cluck',"true"],['Egg is the next mechanic',"true"],['Well obviously the chicken came first. There\'s the button right there.',"true"],['where do we store all these chickens',"true"],
    ['I don\'t think this will meet FDA standards.',"true"],['literally no one ever: we control timelines for more eggs',"true"],['Logically, none of these upgrades should work.','true'],
    ['you know this kinda reminds me of antimatter dimensions. i mean, think about it, there are big numbers early on, there\'s a prestige function, i mean, c\'mon this is such a copy! shame on you.','true'],
    

];}

let s = DOMCacheGetOrSet('news');
document.addEventListener("visibilitychange", function() {if (!document.hidden) {scrollNextMessage();}}, false);
let scrollTimeouts = [];
let nextMsgIndex;
function scrollNextMessage() {
  //don't run if hidden to save performance
  if(DOMCacheGetOrSet('newsHolder').style.display === 'none') return
  updateNewsArray();
  //select a message at random

  try {
    do {nextMsgIndex = Math.floor(Math.random() * newsArray.length)} while (!eval(newsArray[nextMsgIndex][1]))
  } catch(e) {
      console.log("Newsarray doesn't work at idx " + nextMsgIndex)
  }

  scrollTimeouts.forEach(function(v) {clearTimeout(v);});
  scrollTimeouts = [];

  //set the text
  s.textContent = newsArray[nextMsgIndex][0];

  //get the parent width so we can start the message beyond it
  let parentWidth = s.parentElement.clientWidth;

  //set the transition to blank so the move happens immediately
  s.style.transition = '';
  //move div_text to the right, beyond the edge of the div_container
  s.style.transform = 'translateX('+parentWidth+'px)';

  //we need to use a setTimeout here to allow the browser time to move the div_text before we start the scrolling
  scrollTimeouts.push(setTimeout( function() {
    //distance to travel is s.parentElement.clientWidth + s.clientWidth + parent padding
    //we want to travel at rate pixels per second so we need to travel for (distance / rate) seconds
    let dist = s.parentElement.clientWidth + s.clientWidth + 20; //20 is div_container padding
    let rate = 100; //change this value to change the scroll speed
    let transformDuration = dist / rate;
    /*
    if (!player.options.newsHidden && !player.newsArray.includes(newsArray[nextMsgIndex][2])) {
        player.newsArray.push(newsArray[nextMsgIndex][2]);
        if (player.newsArray.length>=50) giveAchievement("Fake News")
    }
    */

    //set the transition duration
    s.style.transition = 'transform '+transformDuration+'s linear';
    let textWidth = s.clientWidth;
    //we need to move it to -(width+parent padding) before it won't be visible
    s.style.transform = 'translateX(-'+(textWidth+5)+'px)';
    //automatically start the next message scrolling after this one finishes
    //you could add more time to this timeout if you wanted to have some time between messages
    scrollTimeouts.push(setTimeout(scrollNextMessage, Math.ceil(transformDuration * 1000)));
  }, 100));
}
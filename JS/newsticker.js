let newsArray;

function updateNewsArray() {
newsArray = [//always true
    ['Cluck Cluck',"true"],['Egg is the next mechanic',"true"],['Well obviously the chicken came first. There\'s the button right there.',"true"],['where do we store all these chickens',"true"],
    ['I don\'t think this will meet FDA standards.',"true"],['literally no one ever: we control timelines for more eggs',"true"],['Logically, none of these upgrades should work.','true'],
    ['you know this kinda reminds me of antimatter dimensions. i mean, think about it, there are big numbers early on, there\'s a prestige function, i mean, c\'mon this is such a copy! shame on you.','true'],
    ['You would think that immortality would be cooler than an AI, but you would be wrong.','true'],['There are so many types of eggs, so why are soul eggs any different?','true'],['prophecy eggs are not giving prophecies 0/10','true'],
    ['I don\'t remember THIS in the game, is this a copy?!','true'],['What do you mean Idle Games have time walls?!?','true'],['use alt+f4 to instantly promote to the next egg','true'],['Is there an echo in here?','true'],
    ['Can\'t time skip your way out of this one.','true'],['Story not included.','true'],['This is the game, egg inc. is the copy.','true'],['the egg is very egg','true'],['We here at News Inc. don\'t actually like eggs.','true'],
    ['<a href="https://youtu.be/dQw4w9WgXcQ" target="_blank"]>Click here for free prophecy egg</a>','true'],['eggs! get your eggs here!','true'],['You mean you don\'t have 1e308 Soul Eggs? What, did you just start or something?','true'],
    ['1 star game sux!','true'],['Egg prices have dropped due to this one guy having one million chickens WTF!','true'],['Chicken nugget farmers have stolen some of your chickens!','true'],['What happened to all the chickens from the last farm?','true'],
    ['Game is no longer being worked on','true'],['Game is still being worked on','true'],['One of your chickens crossed the road, you now have one less chicken.','true'],[`If I had a nickel for every chicken you had right now, I\'d have ${format(data.chickens)} nickles.`,'true'],
    ['EGGS!!!','true'],['If you ever feel worthless, just remember that you\'re worth 2,200,000 regular eggs.','true'],

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
  s.innerHTML = newsArray[nextMsgIndex][0];

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
function format(a) {
    if(data.settingsToggles[1]) {
        const standardPrefix = ['K','M','B','T','Qa','Qi','Sx','Sp','Oc','No','Dc']
        const standardReq = [D(1e3),D(1e6),D(1e9),D(1e12),D(1e15),D(1e18),D(1e21),D(1e24),D(1e27),D(1e30),D(1e33)]
        for(let i = standardReq.length-1; i > -1; i--) {
            if(i === standardReq.length-1 && (a.div(standardReq[i]).gte(1e3)))
                return formatSci(a)
            if(a.gte(standardReq[i]))
                return `${formatSci(a.divide(standardReq[i]))} ${standardPrefix[i]}`
            if(a.lt(standardReq[0]))
                return formatSci(a)
        }
    }
    else {
        return formatSci(a)
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min
}

function getRandomDecimal(min,max) {
    return Decimal.floor(D(Math.random()).times(max.sub(min))).plus(min)
}

function decimalRemainder(num1, num2) {
    if(num1.eq(0)){
           return D(0);
           }
    if(num2.eq(0)){
           return NaN;
    }


      var newNum1 = Decimal.abs(num1);
      var newNum2 = Decimal.abs(num2);

      var quot = newNum1.sub(Decimal.floor( newNum1.div(newNum2) ).times(newNum2));

      if(num1.lt(0)){
            return quot.times(-1);
      }
      else{
            return quot;
      }
}

function formatDate(a) {
    let d = new Date(a)
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function minimum(value, min){
    if (value.lt(min)) value = D(min)
    return value
}
function maximum(value, max){
    if (value.gt(max)) value = D(max)
    return value
}
function formatPrefix(a,b) {
    const prefixes = ['Kilo','Mega','Giga','Tera','Peta','Exa','Zetta','Yotta']
    let amts = [D(1e3),D(1e6),D(1e9),D(1e12),D(1e15),D(1e18),D(1e21),D(1e24)]
    let index = -1;
    for(let i = prefixes.length - 1; i > -1; i--) {
        if(a.divide(amts[i]).gte(D(1))) {
            index = i;
            break;
        }
    }
    if(index === -1) {
        return `${format(a)} ${b}`
    }
    else {
        return `${format(a.divide(amts[index]))} ${prefixes[index]}${b.toLowerCase()}`
    }
}

//https://blog.stevenlevithan.com/archives/javascript-roman-numeral-converter
function romanize (num) {
    if (!+num) return false;
    var digits = String(+num).split('');
    var key = ['','C','CC','CCC','CD','D','DC','DCC','DCCC','CM',
               '','X','XX','XXX','XL','L','LX','LXX','LXXX','XC',
               '','I','II','III','IV','V','VI','VII','VIII','IX'];
    var roman = '', i = 3;
    while (i--) roman = (key[+digits.pop() + (i * 10)] || '') + roman;
    return Array(+digits.join('') + 1).join('M') + roman;
  }
  
  function deromanize (str) {
    var str = str.toUpperCase();
    var validator = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/;
    var token = /[MDLV]|C[MD]?|X[CL]?|I[XV]?/g;
    var key = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
    var num = 0, m;
    if (!(str && validator.test(str))) return false;
    while (m = token.exec(str)) num += key[m[0]];
    return num;
  }
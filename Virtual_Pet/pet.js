/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Cmd-R),
 * 2. Inspect to bring up an Object Inspector on the result (Cmd-I), or,
 * 3. Display to insert the result in a comment after the selection. (Cmd-L)
 */



var pet = {
    hungry: true,
    unhealthy: false,
    name: 'Your Pet'
};
pet.feed = function () { 
    this.hungry = false;
    return this.name + ' is full.';
};
pet.newDay = function () {
    for (var prop in this) {
        if (typeof this[prop] == 'boolean')
            this[prop] = true;
    }
    return 'Good morning!';
};
pet.check = function () {
    var result = '';
    for (var prop in this) {
        if (this[prop] ==  true)
           result = result + this.name + " is " + prop + ". ";
    }
    if (result.length == 0) 
        result = this.name + " is fine.";
    
    return result;
};
var fish = Object.create(pet);
fish.cleanTank = function () {
    this.unhealthy = false;
    return this.name + ' likes the clean tank.';
};

var dog = Object.create(pet);
var currentPet = '';

dog.lonely = false;

dog.walk = function () {
    this.unhealthy = false;
    return this.name + ' enjoyed the walk!';
};
dog.play = function () {
    this.lonely = false;
    return this.name + ' loves you.';
};

var myDog = Object.create(dog);
var myFish = Object.create(fish);
var pets = [myDog, myFish];
var currentPet;
var currentHour = 0;
var currentColor = -1;
var colors = ['#94E5FF', '#86E1FF', '#79DEFF', '#6DC8E6', '#61B2CC', '#559BB2', '#498599', '#3C6F80', '#305966', '#24434C'];


var feed = document.createElement("INPUT");
feed.setAttribute("type", "button");
feed.setAttribute("value", "FEED");
feed.setAttribute("id", "feed");

var walk = document.createElement("INPUT");
walk.setAttribute("type", "button");
walk.setAttribute("value", "WALK");
walk.setAttribute("id", "walk");

var play = document.createElement("INPUT");
play.setAttribute("type", "button");
play.setAttribute("value", "PLAY");
play.setAttribute("id", "play");

var cleanTank = document.createElement("INPUT");
cleanTank.setAttribute("type", "button");
cleanTank.setAttribute("value", "CLEAN TANK");
cleanTank.setAttribute("id", "cleanTank");


document.getElementById('dog').addEventListener('click',chooseDog,false);
document.getElementById('fish').addEventListener('click',chooseFish,false);

function chooseDog() {
    
    currentPet = 0;
    adoptPet();
	
}

function chooseFish() {
    currentPet = 1;
	adoptPet();
}

function adoptPet() {

    document.getElementsByTagName('body')[0].removeChild(document.getElementsByTagName('h2')[0]);
	//document.getElementsByTagName('h1')[0] = Take 
	
    document.getElementsByTagName('p')[1].appendChild(feed);
    document.getElementById('feed').addEventListener('click',function() {pets[currentPet].feed();
                                                                            animate(pets[currentPet].check());},false);
    if (currentPet === 0) {
		document.getElementsByTagName('p')[1].appendChild(play);
    	document.getElementById('play').addEventListener('click',function() {myDog.play();
                                                                            animate(myDog.check());},false);
    	document.getElementsByTagName('p')[1].appendChild(walk);
    	document.getElementById('walk').addEventListener('click',function() {myDog.walk();
                                                                            animate(myDog.check());},false);
		document.getElementsByTagName('p')[0].removeChild(document.getElementById('fish'));
	}
	
	else {
		document.getElementsByTagName('p')[0].removeChild(document.getElementById('dog'));
		document.getElementsByTagName('p')[1].appendChild(cleanTank);
	    document.getElementById('cleanTank').addEventListener('click',function() {myFish.cleanTank();
	                                                                            animate(myFish.check());},false);
		
	}
    setInterval(switchColor, 3000);
	pets[currentPet].newDay();
    animate(pets[currentPet].check());
}

function animate(result) {
    if (result.endsWith('is fine.')) {
        document.getElementsByTagName('p')[0].firstChild.className= '';
    }
    else {
        document.getElementsByTagName('p')[0].firstChild.className= 'agitated';
    }
}

function switchColor() {
    currentHour ++;
    if (currentHour > 19) {
		pets[currentPet].newDay();
		animate(pets[currentPet].check());
        currentHour = 1;
    }
    if (currentHour < 10) {
        currentColor++;
        document.getElementsByTagName('body')[0].style.background= colors[currentColor]; 
    }
    else if (currentHour === 10) {
        
    }
    else if (currentHour > 10) {
        currentColor--;
        document.getElementsByTagName('body')[0].style.background= colors[currentColor]; 
        
    }
    

    //document.getElementsByTagName('body')[0].style.background= colors[9]; 
}

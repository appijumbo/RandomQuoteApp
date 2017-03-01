


var quoteArray = [];

var quoteNumber = null;   /* the element position in the array that is the quote being displayed */

/* speech buble outputs */
var bubbleText = document.getElementById("quoteText");
var bubbleName = document.getElementById("authorName");
var bubbleInfo = document.getElementById("authorInfo");


/*form inputs content*/
var textVal, nameVal, infoVal;


/* form button*/
var submittQuoteButton = document.getElementById("submittQuoteButton");
var closeButton = document.getElementById("closeButton");


/* main page buttons */
var menuBut = document.getElementById("menuButton");
var rndQuote = document.getElementById("rndQuote");
var tweetThisQuote = document.getElementById("tweetThisQuote");
var addAnotherQuote = document.getElementById("addAnotherQuote");
var deleteThisquote = document.getElementById("deleteThisQuote");



/***************     TWEETING A QUOTE      ****************/

var tweetQuoteFunc = function(){
    
    var tweetLink = document.getElementById("tweetThisQuote");

    var stuff =  "\"" + quoteArray[quoteNumber][0] + "\"" + " by " + quoteArray[quoteNumber][1] + " " + quoteArray[quoteNumber][2];
    
    tweetLink.setAttribute('href', "https://twitter.com/intent/tweet?text="+ stuff);
    
    return false;
};



/*************      A RANDOM QUOTE IS REQUESTED     *************/
function getRandQuote(){
    
    var r;
    
    if(quoteArray.length>1){   /* check at least two quotes exist  */
        
            do{
                r = Math.floor(Math.random() * (quoteArray.length));

            } while(r === quoteNumber);  /* make sure previous quote isn't used */
    
            quoteNumber = r;
        }
    
    else {  /* if only one quote then by default start at quotenumber 0 */
        quoteNumber = 0;
    }
    
}



function writeNewQuote(){      
    /* add a three element array 0 text, 1 name, 2 author, for each  quotenumber*/
        
    bubbleText.innerHTML = quoteArray[quoteNumber][0];

    bubbleName.innerHTML = quoteArray[quoteNumber][1];

    bubbleInfo.innerHTML = quoteArray[quoteNumber][2];
    
}



var rndQuoteFunc = function(){
    
    getRandQuote();
    writeNewQuote();
};


/*************      ADDING A QUOTE       **************/

var addQuoteInputFunc = function(){
    
    $("#newQuote").removeClass("off");
    $("#newQuote").addClass("is-open");   /*  change state to new quote inputed */
    $("main").addClass("off");

    submittQuoteButton.addEventListener("click", newQuoteGiven, false);
    
    closeButton.addEventListener("click", closeQuote, false);
    
    document.getElementById("quoteTextInput").focus();
    
};


var closeQuote = function() {
    
        /* ensure that content is cleard */
        document.getElementById("quoteTextInput").value = "";
        document.getElementById("authorNameInput").value = "";
        document.getElementById("authorInfoInput").value = "";
        
        $("#newQuote").addClass("off"); 
        $("#newQuote").removeClass("is-open");
        $("main").removeClass("off");
    
        submittQuoteButton.removeEventListener("click", newQuoteGiven, false);
        closeButton.removeEventListener("click", closeQuote, false);
};


function sortLocalStorageOut(){
    
    console.log("\n - - - sortLocalStorageOut() \n");
    
    localStorage.removeItem("quoteStore");  // easier just to clear localStore and then re-fresh with completley new array

        var jsonQuoteData = JSON.stringify(quoteArray);
        
        localStorage.setItem("quoteStore", jsonQuoteData);
    
        console.log("-> adding quoteArray to localStore");
        console.log("\n--******    localStorage.getItem(\"quoteStore\", jsonQuoteData)" + localStorage.getItem("quoteStore", jsonQuoteData));
}


var newQuoteGiven = function() {  
    
        /*form inputs content*/
        textVal = document.getElementById("quoteTextInput").value;
        nameVal = document.getElementById("authorNameInput").value;
        infoVal = document.getElementById("authorInfoInput").value;
        /* add form input char length checks laters */
    
        var quoteElement = [textVal, nameVal, infoVal];
        
        quoteArray.push(quoteElement); 
    
        sortLocalStorageOut();

        closeQuote();
    
        quoteNumber = quoteArray.length-1; 

        writeNewQuote();
        
        return ;
};



/*************      DELETING A QUOTE       **************/


var deleteThisquoteFunc = function(){
    
    if(quoteArray.length>1){
        
        var quoteToRemoveIs = quoteArray[quoteNumber][0];
        console.log("******  quoteToRemoveIs = " + quoteArray[quoteNumber][0]); 
        
        localStorage.removeItem(quoteToRemoveIs);
        
        quoteArray.splice(quoteNumber, 1);
        
        sortLocalStorageOut();
        
        rndQuoteFunc();
    }
    
    return;
};  


    /***   
    
    include :
    
    1) min / max word length
    
    2) regEx to check if it looks like real words etc  
    
    ***/


var menuButClickedFunc = function(){
    
    $("#buttonstoggle").toggleClass("off");
};



function menuScan(){

/**************    SCAN MENU IN MAIN PAGE STATE   ************/
menuBut.addEventListener("click", menuButClickedFunc, false);
}



function setUpScan(){

/**************    SCAN BUTTONS IN MAIN PAGE STATE   ************/
    
rndQuote.addEventListener("click", rndQuoteFunc, false);

tweetThisQuote.addEventListener("click", tweetQuoteFunc, false);

addAnotherQuote.addEventListener("click", addQuoteInputFunc, false);
    
deleteThisquote.addEventListener("click", deleteThisquoteFunc, false);

}



/******    PUT INITIAL QUOTES INTO QUOTEARRAY ONLOAD    *******/


window.onload = function(){
    
/*****    INITAL SETUP **********/

    console.log("******    INITAL SETUP ");
    
    //localStorage.clear();  // remove when finished
    
    
    if(localStorage.getItem("quoteStore") === null){ // no quotes in local storage
        
        console.log("\n  *****   nothing in local    *****   \n");
        
        quoteNumber = 0;
        
        quoteArray[quoteNumber] = ["it's better to make a few people really happy than to make a lot of people semi-happy", "Paul Buchheit", "creator of Gmail"];
    
        var jsonQuoteData = JSON.stringify(quoteArray);
        
        localStorage.setItem("quoteStore", jsonQuoteData);
    
        console.log("--******    localStorage.getItem(\"quoteStore\", jsonQuoteData)" + localStorage.getItem("quoteStore", jsonQuoteData));
            
    }
    
    /* *********** FIX THIS **********  */
    
    else{
        console.log("\n  *****   quoteStore exists in local    *****   \n");
        
        var quoteA = JSON.parse(localStorage.getItem("quoteStore"));
        console.log("   quoteStore = " + quoteA);
        
        quoteArray = quoteA;
        console.log("*** quoteArray = " + quoteArray);
        
        quoteNumber = 0;
    }
    
    writeNewQuote();

    menuScan();
    $("#buttonstoggle").addClass("off");
    
    setUpScan();   
    
};



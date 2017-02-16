/**
 * Created by Denis on 31.01.2017.
 */
document.addEventListener("DOMContentLoaded", function(event) {
   var priceField = document.getElementsByName('pdb_price');
   var priceSubmit = document.querySelector('.pdb-submit');
   
   if (priceField) {
     priceSubmit.addEventListener("click", function() {
       setPriceInHiddenPriceField();
     });     
   }
}); 
 
function yellPrice(){
    window.alert(getPrice() + "€");
}

function setPriceInHiddenPriceField(){
    document.getElementsByName('pdb_price')[0].value = getPrice();
}


function getPrice() {
    var priceModifier = getPriceModifier();
    var price = this.getPriceByCurrentDate();
    price = price * priceModifier;
    price = price + getSilverAndGoldAdditionalPrice();

    return price;
}

// will return the price according to http://www.egc2017.eu/registration/ , considering the age and the registration date

function getPriceByCurrentDate() {
    var currentDate = +new Date();

    var earlyBirdDate = 1487113200000; //15.02.17
    var standardDate = 1492207200000; // 15.04.17

    var currentPrices;

    if (currentDate < earlyBirdDate) {
        currentPrices = {
            prices: [130, 80, 30, 0],
            reducedPrices: [85, 50, 20, 0]
        };
    }

    else if (currentDate < standardDate) {
        currentPrices = {
            prices: [160, 100, 40, 0],
            reducedPrices: [105, 65, 25, 0]
        };
    } else {
        currentPrices = {
            prices: [190, 120, 50, 0],
            reducedPrices: [125, 80, 30, 0]
        };
    }

    var pricesConsideringAge;

    if (isYouth()) {
        pricesConsideringAge = currentPrices.reducedPrices;
    } else {
        pricesConsideringAge = currentPrices.prices;
    }

    return pricesConsideringAge[getBookingOption()];

}

// will return 0 in case of kids, and 0.5 in case of people coming from russia or turkey
function getPriceModifier() {
    if (isKid()) {
        return 0;
    }

    if (isReducedCountry()) {
        return 0.5;
    }

    return 1;
}

function isKid() {
    var ageGroupElement =   document.getElementById("pdb-age_group");
    var ageGroup = ageGroupElement[ageGroupElement.selectedIndex].value

    if (ageGroup == "Children (under 12)") {
        return true;
    }

    return false;
}

function isYouth() {
    var ageGroupElement =   document.getElementById("pdb-age_group");
    var ageGroup = ageGroupElement[ageGroupElement.selectedIndex].value

    if (ageGroup == "Youth (12-17)") {
        return true;
    }

    return false;
}


function isReducedCountry() {
    var countryElement =   document.getElementById("pdb-country");
    var countryCode = countryElement[countryElement.selectedIndex].value

    if (countryCode == "RU" || countryCode == "TR") {
        return true;
    }

    return false;
}

function getSilverAndGoldAdditionalPrice() {
    var sponsorship = 0;

    var isSilverFriend = document.getElementById("pdb-friendship-i-want-to-be-a-silver-egc-friend").checked;
    var isGoldFriend = document.getElementById("pdb-friendship-i-want-to-be-a-gold-egc-friend").checked;

    if(isSilverFriend){
        sponsorship += 100;
    }

    if(isGoldFriend){
        sponsorship +=250;
    }

    return sponsorship;

}
//will return 0 for 2 weeks, 1 for 1 week, 2 for weekend bookings, 3 for no participation
function getBookingOption() {

    var firstWeekBooked = document.getElementById("pdb-participation-first-week").checked;
    var weekEndBooked = document.getElementById("pdb-participation-weekend-tournament").checked;
    var secondWeekBooked = document.getElementById("pdb-participation-second-week").checked;

    if(firstWeekBooked && secondWeekBooked){
        return 0;
    }

    if(firstWeekBooked || secondWeekBooked){
        return 1
    }

    if(weekEndBooked){
        return 2;
    }

    return 3;
}



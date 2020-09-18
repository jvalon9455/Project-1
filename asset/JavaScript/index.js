$(document).ready(function () {
  // Dom Variables
  // var CORS = "https://cors-anywhere.herokuapp.com/";
  var submitBtn = $("#input-btn");
  var firstContainer = $("#first-container");
  var secondContainer = $("#second-container");
  // JS variables
  // Functions
  // function to generate map
  function mapGeneration(userInput) {
    function callLocation(userInput) {
      console.log(userInput);
      L.mapquest.key = "J4OCq4RHL0SJ5Gk2Nl3gAInDB8piwquG";
      var positionQueryURL = `https://www.mapquestapi.com/geocoding/v1/address?key=J4OCq4RHL0SJ5Gk2Nl3gAInDB8piwquG&inFormat=kvp&outFormat=json&location=${userInput}&thumbMaps=false`
      $.ajax({
        url: positionQueryURL,
        method: "GET",
      }).then(function (success) {
        console.log(success)
        var geoLatitude = success.results[0].locations[0].latLng.lat
        var geoLongitude = success.results[0].locations[0].latLng.lng
        console.log(geoLatitude, geoLongitude)
        L.mapquest.key = "J4OCq4RHL0SJ5Gk2Nl3gAInDB8piwquG";
        callLocation();
        L.mapquest.map("map", {
          center: [geoLatitude, geoLongitude],
          layers: L.mapquest.tileLayer("map"),
          zoom: 12,
        });
      });
    }
    callLocation(userInput);
  }
  // Function Calls
  // Event Listeners
  submitBtn.on("click", function (event) {
    event.preventDefault();
    firstContainer.addClass("hide");
    secondContainer.removeClass("hide");
    var userInput = $("#areaCode").val();
    console.log(userInput);
    $.ajax({
      url: "https://api.forismatic.com/api/1.0/",
      jsonp: "jsonp",
      dataType: "jsonp",
      data: {
        method: "getQuote",
        lang: "en",
        format: "jsonp",
      },
    }).then(function (response) {
      var quote = response.quoteText;
      var author = response.quoteAuthor;
      var quoteDiv = $("<div>").text(quote);
      var authorDiv = $("<div>").text(author);
      $("#random-generator").append(quoteDiv);
      $("#random-generator").append(authorDiv);
      mapGeneration(userInput);
    });
  });
});
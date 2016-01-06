//


(function () {
    'use strict';
    
    function getAjaxData(event) {
        var request = new XMLHttpRequest();
        var filename = "Continents_Info/" + event.target.id + '.json';
        request.open('GET', filename);
        request.send();
        
        request.onreadystatechange = function() {
            if (request.readyState === 4 && request.status === 200) {
                displayInfo(request.responseText);
            }
        };
    };
    
    function displayInfo(jsonString) {
        var jsonObj = JSON.parse(jsonString);
        var info = '';
        for (var prop in jsonObj) {
            info += '<p>' + prop + ": " + jsonObj[prop] + "<p>";
        }
        document.getElementById('description').innerHTML = info;
    };
    
    document.getElementById('continents').addEventListener("mouseover", getAjaxData, false);

}());
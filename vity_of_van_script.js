function handleRequest() {
    // console.log("I am running");

    var response = $.get("https://opendata.vancouver.ca/api/datasets/1.0/search/?rows=200");
    // console.log(response);

    var graffiti = $.get("https://opendata.vancouver.ca/api/v2/catalog/datasets/graffiti?pretty=false&timezone=UTC&include_app_metas=false");
    // console.log(graffiti);

    var graffitiRecords = $.get("https://opendata.vancouver.ca/api/v2/catalog/datasets/graffiti/records?rows=10&pretty=false&timezone=UTC");
    // console.log(graffitiRecords);
    var url = "https://opendata.vancouver.ca/api/v2/catalog/datasets/graffiti/records?rows=10&pretty=false&timezone=UTC";

    get(url).then(function(response) {
        // console.log("Success!", JSON.parse(response));
        response = JSON.parse(response);
        console.log(response);
        var records = response.records;

        records.forEach(function(rec){
            var coords = rec.record.fields.geom.geometry.coordinates;
            // console.log(rec.record.fields.geom.geometry.coordinates);
            var marker = L.marker([coords[0], coords[1]]).addTo(mymap);
        });
        console.log(records);
      }, function(error) {
        console.error("Failed!", error);
      });

    function get(url) {
        // Return a new promise.
        return new Promise(function(resolve, reject) {
          // Do the usual XHR stuff
          var req = new XMLHttpRequest();
          req.open("GET", url);
    //   console.log("I am running");
      
          req.onload = function() {
            // This is called even on 404 etc
            // so check the status
            if (req.status == 200) {
              // Resolve the promise with the response text
              resolve(req.response);
            }
            else {
              // Otherwise reject with the status text
              // which will hopefully be a meaningful error
              reject(Error(req.statusText));
            }
          };
      
          // Handle network errors
          req.onerror = function() {
            reject(Error("Network Error"));
          };
      
          // Make the request
          req.send();
        });
      }
}
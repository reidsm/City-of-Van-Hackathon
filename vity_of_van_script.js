function handleRequest() {
    console.log("I am running");

    var response = $.get("https://opendata.vancouver.ca/api/datasets/1.0/search/?rows=200");
    console.log(response);

    var graffiti = $.get("https://opendata.vancouver.ca/api/v2/catalog/datasets/graffiti?pretty=false&timezone=UTC&include_app_metas=false");
    console.log(graffiti);

    var graffitiRecords = $.get("https://opendata.vancouver.ca/api/v2/catalog/datasets/graffiti/records?rows=10&pretty=false&timezone=UTC");
    console.log(graffitiRecords);
}
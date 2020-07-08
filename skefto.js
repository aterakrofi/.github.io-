(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "name",
            alias: "name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "firstName",
            alias: "firstName",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "lastName",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "skefto",
            alias: "Skefto",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

  //download data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("http://159.65.9.196/api/plans", function(resp) {
            var feat = resp.features,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "id": feat[i].id,
                    "createdAt": feat[i].properties.createdAt,
                    "status": feat[i].properties.status,
                    "name	": feat[i].name
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Skefto API Source"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();

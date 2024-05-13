async function GetWSPRData() {
    "use strict";

    // Get a reference to the form - Use the ID of the form
    var form = $("#myform");
    
      // If all of the form elements are valid, the get the form values
    if (form.valid()) {
        
        var Reporter = document.getElementById("Reporter").value;
        var FromDate = document.getElementById("FromDate").value;
        var ToDate = document.getElementById("ToDate").value;

        /* URL for AJAX Call */
        var myURL1 = "https://db1.wspr.live/?query=SELECT * FROM wspr.rx where tx_sign = '" + Reporter + "' and time >= '" + FromDate + "' and time <= '" + ToDate + "' FORMAT JSON"
        /* Make the AJAX call */
        var msg1Object = await fetch(myURL1);
        /* Check the status */
        if (msg1Object.status == 200) {            
            var msg1JSONText = await msg1Object.text();
            // Parse the JSON string into an object
            var msg1 = JSON.parse(msg1JSONText);
            /* Your code to process the result goes here  */
            /* Pull the data from the message object and place it in local variables */

            var time = [];
            var band = [];
            var rx_sign = [];
            var rx_lat = [];
            var rx_lon = [];
            var rx_loc = [];
            var tx_sign = [];
            var tx_lat = [];
            var tx_lon = [];
            var tx_loc = [];
            var distance = [];
            var tx_azimuth = [];
            var rx_azimuth = [];
            var frequency = [];
            var power = [];
            var snr = [];
            var drift = [];
            var version = [];
            var code = [];
            var data_count;
            
            data_count = msg1.data.length;
                
            for (var i = 0; i < data_count; i++) {
                time[i] = msg1.data[i].time;
                band[i] = msg1.data[i].band;
                rx_sign[i] = msg1.data[i].rx_sign;
                rx_lat[i] = msg1.data[i].rx_lat;
                rx_lon[i] = msg1.data[i].rx_lon;
                rx_loc[i] = msg1.data[i].rx_loc;
                tx_sign[i] = msg1.data[i].tx_sign;
                tx_lat[i] = msg1.data[i].tx_lat;
                tx_lon[i] = msg1.data[i].tx_lon;
                tx_loc[i] = msg1.data[i].tx_loc;
                distance[i] = msg1.data[i].distance;
                tx_azimuth[i] = msg1.data[i].azimuth;
                rx_azimuth[i] = msg1.data[i].rx_azimuth;
                frequency[i] = msg1.data[i].frequency;
                power[i] = msg1.data[i].power;
                snr[i] = msg1.data[i].snr;
                drift[i] = msg1.data[i].drift;
                version[i] = msg1.data[i].version;
                code[i] = msg1.data[i].code;
            }
            
            /* Display the table header */
            
            var table = "<table>";
            table = table + "<tr>"
            table = table + "<th>Date/Time</th>";
            table = table + "<th>Band</th>";
            table = table + "<th>RX Sign</th>";
            table = table + "<th>RX Lat</th>";
            table = table + "<th>RX Long</th>";
            table = table + "<th>RX Loc</th>";
            table = table + "<th>TX Sign</th>";
            table = table + "<th>TX Lat</th>";
            table = table + "<th>TX Long</th>";
            table = table + "<th>TX Loc</th>";
            table = table + "<th>Dist</th>";
            table = table + "<th>TX Azm</th>";
            table = table + "<th>RX Azm</th>";
            table = table + "<th>Freq</th>";
            table = table + "<th>Pwr</th>";
            table = table + "<th>SNR</th>";
            table = table + "<th>Drift</th>";
            table = table + "<th>Version</th>";
            table = table + "<th>Code</th>";
            table = table + "</tr>";
            
            /* Display the table data */
            
            for (var i = 0; i < data_count; i++) {
                table = table + "<tr>";
                table = table + "<td>" + time[i] + "</td>";
                table = table + "<td>" + band[i] + "</td>";
                table = table + "<td>" + rx_sign[i] + "</td>";
                table = table + "<td>" + rx_lat[i] + "</td>";
                table = table + "<td>" + rx_lon[i] + "</td>";
                table = table + "<td>" + rx_loc[i] + "</td>";
                table = table + "<td>" + tx_sign[i] + "</td>";
                table = table + "<td>" + tx_lat[i] + "</td>";
                table = table + "<td>" + tx_lon[i] + "</td>";
                table = table + "<td>" + tx_loc[i] + "</td>";
                table = table + "<td>" + distance[i] + "</td>";
                table = table + "<td>" + tx_azimuth[i] + "</td>";
                table = table + "<td>" + rx_azimuth[i] + "</td>";
                table = table + "<td>" + frequency[i] + "</td>";
                table = table + "<td>" + power[i] + "</td>";
                table = table + "<td>" + snr[i] + "</td>";
                table = table + "<td>" + drift[i] + "</td>";
                table = table + "<td>" + version[i] + "</td>";
                table = table + "<td>" + code[i] + "</td>";
                table = table + "</tr>";
            }
            table = table + "</table>";
            
            /* Display Table Data */
            document.getElementById("tabledata").innerHTML = table;
                
        }
        else {
            /* AJAX complete with error */
            alert("Error Detected - Status: " + msg1Object.status)
            return;
        }        
    }
}

function ClearForm() {
    document.getElementById("ReporterError").innerHTML = "";
    document.getElementById("FromDateError").innerHTML = "";
    document.getElementById("ToDateError").innerHTML = "";
    document.getElementById("tabledata").innerHTML = "";    
}
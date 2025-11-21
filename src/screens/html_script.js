const html_script = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="initial-scale=1.0">
  <title>Leaflet Dark Mode</title>

  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

  <style>
    html, body { margin:0; padding:0; background:#000; }
    #mapid { width:100%; height:100vh; }

    /* ⭐ Make ArcGIS dark tiles even darker */
    .leaflet-tile {
      filter: brightness(0.65) contrast(1.2);
    }
  </style>
</head>

<body>
  <div id="mapid"></div>

  <script>
    // Initial map location (Karachi)
    var mymap = L.map('mapid', {
        zoomControl: false
    }).setView([24.934963139905765, 67.15685431719373], 23);

    // Dark Gray Basemap (free, works in WebView)
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 16,
        attribution: "© Esri, HERE, Garmin, FAO, NOAA, USGS"
      }
    ).addTo(mymap);

    // Click popup
    var popup = L.popup();
    mymap.on("click", function(e) {
      popup
        .setLatLng(e.latlng)
        .setContent("Location: " + e.latlng.toString())
        .openOn(mymap);
    });
  </script>
</body>
</html>
`;

export default html_script;

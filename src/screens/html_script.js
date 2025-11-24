const html_script = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
  <title>Leaflet Map</title>

  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

  <style>
    html, body { margin:0; padding:0; height:100%; background:#fff; }
    #map { width:100%; height:100vh; }
    .leaflet-tile { filter: brightness(1.05) contrast(1.05) saturate(0.9); }
  </style>
</head>

<body>
  <div id="map"></div>

  <script>
    var map = L.map('map', {
      zoomControl: false,
      attributionControl: false
    }).setView([24.934963, 67.156854], 15);

    L.tileLayer("https://tile.openstreetmap.de/{z}/{x}/{y}.png", {
      maxZoom: 20
    }).addTo(map);

    var routeLine = null;
    var startMarker = null;
    var endMarker = null;

    var fullGeometry = [];
    var animationTimer = null;

    var pickupIcon = L.divIcon({
      html: '<div style="width:14px;height:14px;background:#000;border-radius:50%;border:3px solid #fff;box-shadow:0 0 4px rgba(0,0,0,0.4);"></div>',
      iconSize: [14,14],
      iconAnchor: [7,7]
    });

    var dropIcon = L.divIcon({
      html: '<div style="width:14px;height:14px;background:#fff;border-radius:50%;border:3px solid #000;box-shadow:0 0 4px rgba(0,0,0,0.4);"></div>',
      iconSize: [14,14],
      iconAnchor: [7,7]
    });

    function clearAll() {
      if (routeLine) { map.removeLayer(routeLine); routeLine = null; }
      if (startMarker) { map.removeLayer(startMarker); startMarker = null; }
      if (endMarker) { map.removeLayer(endMarker); endMarker = null; }
    }

    function stopAnimation() {
      if (animationTimer) {
        clearInterval(animationTimer);
        animationTimer = null;
      }
    }

    function drawReducedRoute(geom) {
      if (routeLine) map.removeLayer(routeLine);

      var latLngs = geom.map(p => [p.lat, p.lng]);

      routeLine = L.polyline(latLngs, {
        color: "#007bff",
        weight: 5,
        opacity: 0.92
      }).addTo(map);

      if (latLngs.length > 1) {
        map.fitBounds(routeLine.getBounds(), { padding: [40, 40] });
      }
    }

    function animateRoute() {
      stopAnimation();

      animationTimer = setInterval(() => {
        if (fullGeometry.length <= 2) {
          stopAnimation();

          // NOTIFY REACT NATIVE THAT RIDE ENDED
          sendMessage({ type: "rideFinished" });

          return;
        }

        var next = fullGeometry[0];
        if (startMarker) {
          startMarker.setLatLng([next.lat, next.lng]);
        }

        fullGeometry.shift();
        drawReducedRoute(fullGeometry);

      }, 100);
    }

    function renderRoute(start, end, geometry) {
      clearAll();
      stopAnimation();

      fullGeometry = geometry.slice();

      startMarker = L.marker([start.lat, start.lng], { icon: pickupIcon }).addTo(map);
      endMarker = L.marker([end.lat, end.lng], { icon: dropIcon }).addTo(map);

      drawReducedRoute(fullGeometry);
    }

    function sendMessage(msg) {
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify(msg));
      }
    }

    map.on("click", function(e) {
      sendMessage({ type:"press", lat:e.latlng.lat, lng:e.latlng.lng });
    });

    function handleMessage(event) {
      try {
        var msg = JSON.parse(event.data);

        if (msg.type === "setInitialView" && msg.center) {
          map.setView([msg.center.lat, msg.center.lng], msg.zoom || 15);
        }

        if (msg.type === "setOnlyPickup" && msg.start) {
          clearAll();
          stopAnimation();
          startMarker = L.marker([msg.start.lat, msg.start.lng], { icon: pickupIcon }).addTo(map);
          map.setView([msg.start.lat, msg.start.lng], 15);
        }

        if (msg.type === "setRoute") {
          renderRoute(msg.start, msg.end, msg.geometry);
        }

        if (msg.type === "animateRoute") {
          animateRoute();
        }

        if (msg.type === "clearRoute") {
          stopAnimation();
          clearAll();
        }

      } catch(err) {
        console.log("Parse error:", err);
      }
    }

    document.addEventListener("message", handleMessage);
    window.addEventListener("message", handleMessage);
  </script>
</body>
</html>
`;

export default html_script;

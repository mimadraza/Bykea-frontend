// Component/LeafletMap.tsx
import React, {
  forwardRef,
  useImperativeHandle,
  useRef
} from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import html_script from "../screens/html_script";

export interface LatLng {
  lat: number;
  lng: number;
}

export interface LeafletMapHandle {
  setRoute: (data: { start: LatLng; end: LatLng; geometry: LatLng[] }) => void;
  clearRoute: () => void;
  setInitialView: (center: LatLng, zoom?: number) => void;
  setOnlyPickup: (start: LatLng) => void;
}

interface Props {
  style?: any;
  onMapPress?: (lat: number, lng: number) => void;
  onLoadEnd?: () => void; // <-- NEW
}

const LeafletMap = forwardRef<LeafletMapHandle, Props>(
  ({ style, onMapPress, onLoadEnd }, ref) => {
    const webViewRef = useRef<WebView>(null);

    // ------------------------------------------------------
    // EXPOSE METHODS TO PARENT COMPONENT
    // ------------------------------------------------------
    useImperativeHandle(ref, () => ({
      setRoute: (data) => {
        webViewRef.current?.postMessage(
          JSON.stringify({
            type: "setRoute",
            start: data.start,
            end: data.end,
            geometry: data.geometry
          })
        );
      },

      clearRoute: () => {
        webViewRef.current?.postMessage(
          JSON.stringify({ type: "clearRoute" })
        );
      },

      setInitialView: (center, zoom = 15) => {
        webViewRef.current?.postMessage(
          JSON.stringify({
            type: "setInitialView",
            center,
            zoom
          })
        );
      },

      setOnlyPickup: (start) => {
        webViewRef.current?.postMessage(
          JSON.stringify({
            type: "setOnlyPickup",
            start
          })
        );
      }
    }));

    // ------------------------------------------------------
    // RENDER
    // ------------------------------------------------------
    return (
      <View style={[styles.container, style]}>
        <WebView
          ref={webViewRef}
          source={{ html: html_script }}
          javaScriptEnabled
          domStorageEnabled
          mixedContentMode="always"
          originWhitelist={["*"]}
          style={{ flex: 1 }}
          onLoadEnd={onLoadEnd} // <-- CRITICAL FIX
          onMessage={(event) => {
            try {
              const msg = JSON.parse(event.nativeEvent.data);
              if (msg.type === "press" && onMapPress) {
                onMapPress(msg.lat, msg.lng);
              }
            } catch {}
          }}
        />
      </View>
    );
  }
);

export default LeafletMap;

const styles = StyleSheet.create({
  container: { flex: 1 }
});
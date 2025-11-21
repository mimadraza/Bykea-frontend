import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import AccessibleText from "../Component/AccessibleText";
import AccessibleTextInput from "../Component/AccessibleTextInput";
const rideHistoryData = [
  {
    id: "1",
    from: "IBA",
    to: "BoatBasin",
    date: "Oct 25, 2023, 4:05 PM",
    driver: "Asif Gul",
  },
  {
    id: "2",
    from: "IBA",
    to: "Clifton",
    date: "Oct 22, 2023, 5:19 PM",
    driver: "Asif Gul",
  },
  {
    id: "3",
    from: "IBA",
    to: "NazPlaza",
    date: "Oct 18, 2023, 3:14 PM",
    driver: "Asif Gul",
  },
  {
    id: "4",
    from: "St. patrick's high school",
    to: "clifton",
    date: "Oct 10, 2023, 6:10 PM",
    driver: "Asif Gul",
  },
];

const RideHistoryScreen: React.FC = () => {
  const [search, setSearch] = useState("");

  const filtered = rideHistoryData.filter((item) =>
    `${item.from} to ${item.to}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <AccessibleText style={styles.title}>Ride History</AccessibleText>

        {/* Search bar */}
        <View style={styles.searchRow}>
          <AccessibleText style={styles.searchIcon}>🔍</AccessibleText>
          <AccessibleTextInput
            placeholder="Search for booking"
            placeholderTextColor="#aaa"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Ride list */}
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 15 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.historyRow}>
              <Image
                source={require("../assets/map-mini.png")}
                style={styles.mapThumb}
              />

              <View style={{ flex: 1 }}>
                <AccessibleText style={styles.routeText}>
                  {item.from} to {item.to}
                </AccessibleText>
                <AccessibleText style={styles.dateText}>{item.date}</AccessibleText>
              </View>

              <View style={styles.driverRight}>
                <Image
                  source={require("../assets/user.png")}
                  style={styles.driverImg}
                />
                <AccessibleText style={styles.driverName}>{item.driver}</AccessibleText>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default RideHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "88%",
    height: "88%",
    backgroundColor: "#2C333D",
    borderRadius: 40,
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#3dff73",
    textAlign: "center",
    marginBottom: 18,
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1F2124",
    borderRadius: 14,
    paddingHorizontal: 10,
  },

  searchIcon: {
    fontSize: 18,
    color: "#aaa",
    marginRight: 6,
  },

  searchInput: {
    flex: 1,
    color: "white",
    fontSize: 15,
    paddingVertical: 8,
  },

  historyRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1F2124",
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,
  },

  mapThumb: {
    width: 50,
    height: 50,
    marginRight: 12,
    borderRadius: 8,
  },

  routeText: {
    fontSize: 15,
    color: "white",
    fontWeight: "600",
  },

  dateText: {
    fontSize: 12,
    color: "#ccc",
  },

  driverRight: {
    alignItems: "center",
  },

  driverImg: {
    width: 35,
    height: 35,
    borderRadius: 18,
    marginBottom: 4,
  },

  driverName: {
    fontSize: 11,
    color: "#ccc",
  },
});

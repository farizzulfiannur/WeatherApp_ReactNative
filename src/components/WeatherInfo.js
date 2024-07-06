import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const WeatherInfo = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  const { name, main, weather, visibility, wind } = weatherData;
  const weatherDescription = weather[0];

  return (
    <View style={styles.display}>
      <Text style={styles.text}>Weather in {name} City</Text>
      <Text style={[styles.temperature, styles.marginTop20]}>{main.temp}C</Text>
      <View style={[styles.rowContainer, styles.marginTop20]}>
        <Image
          source={{
            uri: `https://openweathermap.org/img/w/${weatherDescription.icon}.png`,
          }}
          style={styles.weatherIcon}
        />
        <Text style={[styles.text, styles.bold]}>
          {weatherDescription.main}
        </Text>
      </View>
      <Text style={styles.text}>{weatherDescription.description}</Text>
      <View style={[styles.rowContainer, styles.marginTop20]}>
        <Text style={[styles.text, styles.bold]}>Visibility: </Text>
        <Text style={[styles.text, styles.marginLeft15]}>{visibility}km</Text>
      </View>
      <View style={[styles.rowContainer, styles.marginTop20]}>
        <Text style={[styles.text, styles.bold]}>Wind Speed: </Text>
        <Text style={[styles.text, styles.marginLeft15]}>{wind.speed}m/s</Text>
      </View>
    </View>
  );
};

export default WeatherInfo;

const styles = StyleSheet.create({
  display: {
    marginTop: 20,
    backgroundColor: "#ded4cc",
    padding: 20,
    borderRadius: 20,
  },
  marginTop20: {
    marginTop: 20
  },
  marginLeft15: {
    marginLeft: 15,
  },
  text: {
    textAlign: "center",
    fontSize: 18,
  },
  bold: {
    fontWeight: "700",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  temperature: {
    fontWeight: "700",
    fontSize: 80,
    textAlign: "center",
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
});

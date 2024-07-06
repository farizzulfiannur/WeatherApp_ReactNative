import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { BASE_URL, API_KEY } from "./src/components/constant";
import WeatherSearch from "./src/components/WeatherSearch";
import WeatherInfo from "./src/components/WeatherInfo";

const App = () => {
  const [weatherData, setWeatherData] = useState();
  const [status, setStatus] = useState("");
  const renderComponent = () => {
    switch (status) {
      case "loading":
        return <ActivityIndicator size="large" />;
      case "success":
        return <WeatherInfo weatherData={weatherData} />;
      case "error":
        return (
          <Text>
            Something went wrong. Please try again with a correct city name.
          </Text>
        );
      default:
        return;
    }
  };
  const searchWeather = (location) => {
    setStatus("loading");
    axios
      .get(`${BASE_URL}?q=${location}&appid=${API_KEY}`)
      .then((response) => {
        const data = response.data;
        data.visibility /= 1000;
        data.visibility = data.visibility.toFixed(2);
        data.main.temp -= 273.15; // Konversi Kelvin ke Celcius
        data.main.temp = data.main.temp.toFixed(2);
        setWeatherData(data);
        setStatus("success");
      })
      .catch((error) => {
        console.error("API Error:", error.message);
        setStatus("error");
      });
  };
  return (
    <View style={styles.container}>
      <WeatherSearch searchWeather={searchWeather} />
      <View style={styles.margintTop20}>{renderComponent()}</View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  margintTop20: {
    marginTop: 20,
  },
});

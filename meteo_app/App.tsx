import { useFonts } from "expo-font";
import { Alert, ImageBackground, Text, View } from "react-native";
import { s } from "./App.styles";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Home from "./Components/Home";
import { useEffect, useState } from "react";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
} from "expo-location";
import { Coordinates, MeteoAPI } from "./api/meteo";
import { DefaultTheme, NavigationContainer, Theme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Forecast from "./Components/Forecast";

const Stack = createNativeStackNavigator();
const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

export default function App() {
  const [location, setLocation] = useState<Coordinates>();
  const [weather, setWeather] = useState();
  const [city, setCity] = useState();

  const [isFontLoaded] = useFonts({
    "Alata-Regular": require("./assets/fonts/Alata-Regular.ttf"),
  });

  console.log(isFontLoaded);

  //ASK FOR GEOLOCATION PERMISSION
  useEffect(() => {
    getUserCoordinates();
  }, []); //empty array -> will run at first render only

  useEffect(() => {
    if (location) {
      fetchWeather(location);
      fetchCity(location);
    }
  }, [location]);

  async function fetchWeather(loc: Coordinates) {
    const weatherResp = await MeteoAPI.fetchWeatherByCoord(loc);
    setWeather(weatherResp);
  }

  async function fetchCity(loc: Coordinates) {
    const cityResp = await MeteoAPI.fetchCityByCoord(loc);
    setCity(cityResp);
  }

  async function getUserCoordinates() {
    const { status } = await requestForegroundPermissionsAsync();
    if (status == "granted") {
      const location = await getCurrentPositionAsync();
      setLocation({
        lat: location.coords.latitude,
        long: location.coords.longitude,
      });
    } else {
      setLocation({ lat: 48.85, long: 2.35 }); //Paris
    }
  }

  async function fetchCoordsByCity(city: string) {
    try {
      const newCoords = await MeteoAPI.fetchCoordsByCity(city);
      setLocation(newCoords);
    } catch (error: any) {
      Alert.alert("Oops: ", error);
    }
  }

  console.log(location);

  return (
    <NavigationContainer theme={theme}>
      <ImageBackground
        source={require("./assets/background.png")}
        style={s.back} //style refers to the View component behind ImageBackground
        imageStyle={s.img_back} //imageStyle refers to image itself
      >
        <SafeAreaProvider>
          <SafeAreaView style={s.container}>
            {isFontLoaded && weather && (
              <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{ headerShown: false, animation: "fade" }}
              >
                <Stack.Screen name="Home">
                  {() => <Home city={city} weather={weather} onSubmitSearch={fetchCoordsByCity} />}
                </Stack.Screen>
                <Stack.Screen name="Forecast" component={Forecast} />
              </Stack.Navigator>
            )}
          </SafeAreaView>
        </SafeAreaProvider>
      </ImageBackground>
    </NavigationContainer>
  );
}

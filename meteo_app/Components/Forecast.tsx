import { StyleSheet, Text, View, Image, TextStyle } from "react-native";
import Txt from "./Txt";
import { RouteProp, useRoute } from "@react-navigation/native";
import Header from "./Header";
import ForecastListItem from "./ForecastListItem";
import { DAYS, getInterpretation } from "../utils/meteo_utils";

type ParamList = {
  Forecast: {
    city: string;
    weather: {
      sunrise: any[];
      sunset: any[];
      temperature_2m_max: number[];
      time: any[];
      weathercode: number[];
      windspeed_10m_max: number[];
    };
  };
};

export default function Forecast(props: any) {
  const { params } = useRoute<RouteProp<ParamList, "Forecast">>();
  console.log(params);

  const weather = params.weather;

  const forecastList = (
    <View style={{ marginTop: 15 }}>
      {weather.time.map((time, index) => {
        const interpretation = getInterpretation(weather.weathercode[index]);
        const date = new Date(weather.time[index]);
        return (
          <ForecastListItem
            key={time}
            image={interpretation?.image}
            day={DAYS[date.getDay()]}
            date={date.toLocaleDateString("default", { day: "numeric", month: "numeric" })}
            temperature={weather.temperature_2m_max[index].toFixed(1)}
          />
        );
      })}
    </View>
  );

  return (
    <>
      <Header city={params.city} weather={weather} />

      {forecastList}

      {/* <ForecastListItem
        image={require("../assets/interpret_icons/clouds.png")}
        day={"MON"}
        date={"03/11"}
        temperature={2}
      />
      <ForecastListItem
        image={require("../assets/interpret_icons/clouds.png")}
        day={"MON"}
        date={"03/11"}
        temperature={24}
      /> */}
    </>
  );
}

const s = StyleSheet.create({});

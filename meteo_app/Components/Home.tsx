import { StyleSheet, View } from "react-native";
import Txt from "./Txt";
import MeteoBasic from "./MeteoBasic";
import { getInterpretation } from "../utils/meteo_utils";
import MeteoAdvanced from "./MeteoAdvanced";
import SearchBar from "./SearchBar";

export default function Home(props: any) {
  const cur_weather = props.weather.current_weather;
  const cur_weather_interpret = getInterpretation(cur_weather.weathercode);
  return (
    <>
      <View style={s.basic}>
        <MeteoBasic
          dailtyWeather={props.weather.daily}
          city={props.city}
          temperature={Math.round(cur_weather.temperature)}
          interpret={cur_weather_interpret}
        />
      </View>

      <View style={s.search}>
        <SearchBar onSubmit={props.onSubmitSearch} />
      </View>

      <View style={s.footer}>
        <MeteoAdvanced
          sunrise={props.weather.daily.sunrise[0].split("T")[1]}
          sunset={props.weather.daily.sunset[0].split("T")[1]}
          windspeed={cur_weather.windspeed}
        ></MeteoAdvanced>
      </View>
    </>
  );
}

const s = StyleSheet.create({
  basic: {
    flex: 2,
  },
  search: {
    flex: 2,
  },
  footer: {
    flex: 1,
  },
});

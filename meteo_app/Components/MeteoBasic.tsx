import { StyleSheet, Text, View, Image, TextStyle, TouchableOpacity } from "react-native";
import Txt from "./Txt";
import { useNavigation } from "@react-navigation/native";
import Clock from "./Clock";

export default function MeteoBasic(props: {
  temperature: number;
  interpret: any;
  city: string;
  dailtyWeather: any;
}) {
  const nav = useNavigation<any>();
  return (
    <>
      <View style={s.clock}>
        <Clock />
      </View>
      <View style={s.city}>
        <Txt>{props.city}</Txt>
      </View>
      <View style={s.interpret}>
        <Txt style={s.interpret_text}>{props.interpret.label}</Txt>
      </View>
      <View style={s.temperat_box}>
        <TouchableOpacity
          onPress={() =>
            nav.navigate("Forecast", { city: props.city, weather: { ...props.dailtyWeather } })
          }
        >
          <Txt style={s.temperat_text}>{props.temperature}°</Txt>
        </TouchableOpacity>
        <Image source={props.interpret.image} style={s.img} />
      </View>
    </>
  );
}

const s = StyleSheet.create({
  clock: {
    alignItems: "flex-end",
  },
  city: {},

  interpret: {
    alignSelf: "flex-end",
    transform: [{ rotate: "-90deg" }],
  },

  interpret_text: {
    fontSize: 20,
  },

  temperat_box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  temperat_text: {
    fontSize: 150,
  },
  img: {
    height: 80,
    width: 80,
  },
});

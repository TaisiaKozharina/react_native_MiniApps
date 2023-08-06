import { StyleSheet, Text, View, Image, TextStyle } from "react-native";
import Txt from "./Txt";

export default function ForecastListItem(props: {
  image: any;
  day: any;
  date: any;
  temperature: string | number;
}) {
  return (
    <View style={s.container}>
      <Image style={s.img} source={props.image} />
      <Txt style={s.text}>{props.day}</Txt>
      <Txt style={s.text}>{props.date}</Txt>
      <Txt style={s.temp}>{props.temperature}°</Txt>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  img: {
    width: 50,
    height: 50,
  },
  text: {
    fontSize: 20,
  },
  temp: {
    minWidth: 50,
    textAlign: "right",
  },
});

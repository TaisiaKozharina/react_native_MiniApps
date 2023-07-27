import { StyleSheet, Text } from "react-native";

export default function DisplayTemp(props: any) {
  return (
    <Text style={s.temp}>
      {props.temp} {props.unit}
    </Text>
  );
}

const s = StyleSheet.create({
  temp: {
    fontSize: 40,
    color: "white",
  },
});

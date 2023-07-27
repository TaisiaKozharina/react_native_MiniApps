import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function ButtonConvert(props: any) {
  return (
    <TouchableOpacity style={s.btn} onPress={props.onPress}>
      <Text style={s.btnText}>Switch unit to {props.unit}</Text>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  btn: {
    backgroundColor: "black",
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 40,
  },

  btnText: {
    color: "white",
    fontWeight: "bold",
  },
});

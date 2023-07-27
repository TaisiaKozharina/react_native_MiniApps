import { StyleSheet, Text, TextInput, View } from "react-native";

export default function Input(props: any) {
  return (
    <View style={s.container}>
      <TextInput
        style={s.inp}
        placeholder="Huehuehuehue"
        maxLength={4}
        defaultValue={props.defVal}
        onChangeText={(text) => {
          props.onChange(text);
        }}
      ></TextInput>
      <Text style={s.unit}> {props.unit}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    alignSelf: "stretch",
  },

  inp: {
    backgroundColor: "white",
    height: 50,
    borderRadius: 40,
    paddingLeft: 20,
  },

  unit: {
    position: "absolute",
    alignSelf: "flex-end",
    paddingRight: 25,
    fontSize: 30,
  },
});

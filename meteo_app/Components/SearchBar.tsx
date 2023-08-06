import { StyleSheet, TextInput } from "react-native";

export default function SearchBar(props: any) {
  return (
    <TextInput
      style={s.input}
      onSubmitEditing={(e) => props.onSubmit(e.nativeEvent.text)}
      placeholder="Search city ..."
    ></TextInput>
  );
}

const s = StyleSheet.create({
  input: {
    backgroundColor: "white",
    height: 40,
    paddingLeft: 20,
    borderRadius: 20,
    fontFamily: "Alata-Regular",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

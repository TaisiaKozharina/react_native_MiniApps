import { StyleSheet, TouchableOpacity, View } from "react-native";
import Txt from "./Txt";
import { useNavigation } from "@react-navigation/native";

export default function Header(props: { city: string; weather: any }) {
  const nav = useNavigation();
  return (
    <View style={s.container}>
      <TouchableOpacity style={s.back_btn} onPress={nav.goBack}>
        {/*onPress receives a link to function, and when troggered - it will execute*/}
        <Txt>{"<"}</Txt>
      </TouchableOpacity>

      <View style={s.header_txt}>
        <Txt>{props.city.toUpperCase()}</Txt>
        <Txt style={s.subtitle}>7 day forecast</Txt>
      </View>
    </View>
  );
}

const back_btn_width = 30;
const s = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  subtitle: {
    fontSize: 20,
  },
  header_txt: {
    flex: 1,
    alignItems: "center",
    marginRight: back_btn_width,
  },
  back_btn: {
    width: back_btn_width,
  },
});

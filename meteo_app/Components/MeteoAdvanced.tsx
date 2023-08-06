import { StyleSheet, Text, View, Image, TextStyle } from "react-native";
import Txt from "./Txt";

function StyledContainer(props: any) {
  return <View style={{ alignItems: "center" }}>{props.children}</View>;
}

function StyledLabel(props: any) {
  return <Txt style={{ fontSize: 15 }}>{props.children}</Txt>;
}

function StyledValue(props: any) {
  return <Txt style={{ fontSize: 25 }}>{props.children}</Txt>;
}

export default function MeteoAdvanced(props: {
  sunrise: string;
  sunset: string;
  windspeed: number;
}) {
  return (
    <View style={s.container}>
      <StyledContainer>
        <StyledValue>{props.sunrise}</StyledValue>
        <StyledLabel>Sunrise</StyledLabel>
      </StyledContainer>
      <StyledContainer>
        <StyledValue>{props.sunset}</StyledValue>
        <StyledLabel>Sunset</StyledLabel>
      </StyledContainer>
      <StyledContainer>
        <StyledValue>{props.windspeed} km/h</StyledValue>
        <StyledLabel>Windspeed</StyledLabel>
      </StyledContainer>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#0000005c",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "white",
  },
});

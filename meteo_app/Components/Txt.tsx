import {
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  useWindowDimensions,
} from "react-native";

const RESPONSIVE_HEIGHT_RATIO = 0.00118483;

export default function Txt({ style, children, ...otherProps }: TextProps) {
  const size = (style as TextStyle)?.fontSize || s.text.fontSize;
  const { height } = useWindowDimensions();
  return (
    <Text
      style={[
        s.text,
        style,
        { fontSize: Math.round(size * RESPONSIVE_HEIGHT_RATIO * height) },
      ]}
      {...otherProps}
    >
      {children}
    </Text>
  );
}

const s = StyleSheet.create({
  text: {
    color: "#fff",
    fontFamily: "Alata-Regular",
    fontSize: 30,
  },
});

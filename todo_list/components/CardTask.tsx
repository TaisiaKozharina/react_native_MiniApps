import React from "react";
import { Image, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";

export function CardTask(props: any) {
  return (
    <TouchableOpacity
      style={s.card}
      onPress={() => props.onPress(props.todo)}
      onLongPress={() => props.onLongPress(props.todo)}
    >
      <Text
        style={[
          { fontSize: 25 },
          props.todo.isCompleted && { textDecorationLine: "line-through" },
        ]}
      >
        {props.todo.title}
      </Text>
      {props.todo.isCompleted && (
        <Image
          source={require("../assets/check.png")}
          style={{
            height: 25,
            width: 25,
          }}
          resizeMode="contain"
        />
      )}
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  card: {
    shadowColor: "#000",
    paddingHorizontal: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "white",
    height: 115,
    borderRadius: 13,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

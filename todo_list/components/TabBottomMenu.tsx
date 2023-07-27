import { Image, StyleSheet, Text, TextStyle, View } from "react-native";

import { TouchableOpacity } from "react-native";
import { Todo } from "../App";
import React from "react";

export enum TODO_STATUS {
  ALL = "all",
  IN_PROGRESS = "in_progress",
  DONE = "done",
}

export function TabBottomMenu(props: any) {
  function getTextStyle(tab: TODO_STATUS) {
    return {
      fontWeight: "bold",
      color: tab === props.selectedTab ? "#2F76E5" : "black",
    } as TextStyle;
  }

  const onPressTab = (selectedTab: TODO_STATUS) => () => {
    props.onPress(selectedTab);
  };
  return (
    <View style={s.menu}>
      <TouchableOpacity onPress={onPressTab(TODO_STATUS.ALL)}>
        <Text style={getTextStyle(TODO_STATUS.ALL)}>
          All ({props.todoList.length})
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressTab(TODO_STATUS.IN_PROGRESS)}>
        <Text style={getTextStyle(TODO_STATUS.IN_PROGRESS)}>
          In Progress (
          {props.todoList.filter((todo: Todo) => !todo.isCompleted).length})
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressTab(TODO_STATUS.DONE)}>
        <Text style={getTextStyle(TODO_STATUS.DONE)}>
          Done ({props.todoList.filter((todo: Todo) => todo.isCompleted).length}
          )
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  menu: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
});

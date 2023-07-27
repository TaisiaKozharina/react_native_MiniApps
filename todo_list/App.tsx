import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { CardTask } from "./components/CardTask";
import Dialog from "react-native-dialog";
import { Header } from "./components/Header";
import { TODO_STATUS, TabBottomMenu } from "./components/TabBottomMenu";
import { s } from "./App.style";
import { useEffect, useRef, useState } from "react";
import uuid from "react-native-uuid";
import React from "react";
import { NewTodoBtn } from "./components/NewTodoBtn";

export interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
}

let isFirstRender = true;
let isLoadUpdate = false;

export default function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [selectedTab, setSelectedTab] = useState(TODO_STATUS.ALL);
  const [showDialog, setShowDialog] = useState(false);
  const [todoText, setTodoText] = useState("");
  const scrollViewRef = useRef();

  useEffect(() => {
    loadTodoList();
  }, []);

  useEffect(() => {
    if (!isLoadUpdate) {
      if (!isFirstRender) {
        saveTodoList();
      } else {
        isFirstRender = false;
      }
    } else {
      isLoadUpdate = false;
    }
  }, [todoList]);

  async function loadTodoList() {
    console.log("LOAD");
    try {
      const todoListString = await AsyncStorage.getItem("@todoList");
      if (todoListString) {
        const parsedTodoList = JSON.parse(todoListString!) as Todo[];
        isLoadUpdate = true;
        setTodoList(parsedTodoList);
      }
    } catch (err) {
      alert(err);
    }
  }

  async function saveTodoList() {
    console.log("SAVE");
    try {
      await AsyncStorage.setItem("@todoList", JSON.stringify(todoList));
    } catch (err) {
      alert(err);
    }
  }

  function getFilteredList() {
    switch (selectedTab) {
      case TODO_STATUS.ALL:
        return todoList;
      case TODO_STATUS.IN_PROGRESS:
        return todoList.filter((todo) => !todo.isCompleted);
      case TODO_STATUS.DONE:
        return todoList.filter((todo) => todo.isCompleted);
    }
  }

  function deleteTodo(todoToDelete: Todo) {
    Alert.alert("Delete todo", "Are you sure you want to delete this todo ?", [
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setTodoList(todoList.filter((t) => t.id !== todoToDelete.id));
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  }

  function renderTodoList() {
    return getFilteredList().map((todo) => (
      <View key={todo.id} style={s.cardItem}>
        <CardTask onLongPress={deleteTodo} onPress={updateTodo} todo={todo} />
      </View>
    ));
  }

  function updateTodo(todo: Todo) {
    const updatedTodo = {
      ...todo,
      isCompleted: !todo.isCompleted,
    };
    const updatedTodoList = [...todoList];
    const indexToUpdate = updatedTodoList.findIndex(
      (t) => t.id === updatedTodo.id
    );
    updatedTodoList[indexToUpdate] = updatedTodo;
    setTodoList(updatedTodoList);
  }

  function addTodo() {
    const newTodo: Todo = {
      id: String(uuid.v4()),
      title: todoText,
      isCompleted: false,
    };
    setTodoList([...todoList, newTodo]);
    setShowDialog(false);
    setTodoText("");
    setTimeout(() => {
      scrollViewRef.current.scrollToEnd();
    }, 300);
  }

  function renderAddDialog() {
    return (
      <Dialog.Container
        visible={showDialog}
        onBackdropPress={() => setShowDialog(false)}
      >
        <Dialog.Title>Add todo</Dialog.Title>
        <Dialog.Description>Choose a name for your todo</Dialog.Description>
        <Dialog.Input
          onChangeText={setTodoText}
          placeholder="Ex : Go to the dentis"
        />
        <Dialog.Button
          label="Cancel"
          color="grey"
          onPress={() => setShowDialog(false)}
        />
        <Dialog.Button
          disabled={todoText.length === 0}
          label="Save"
          onPress={addTodo}
        />
      </Dialog.Container>
    );
  }

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Header />
          </View>
          <View style={s.body}>
            <ScrollView ref={scrollViewRef}>{renderTodoList()}</ScrollView>
          </View>
          <NewTodoBtn onPress={() => setShowDialog(true)} />
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <TabBottomMenu
          todoList={todoList}
          onPress={setSelectedTab}
          selectedTabName={selectedTab}
        />
      </View>
      {renderAddDialog()}
    </>
  );
}

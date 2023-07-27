import { useEffect, useRef } from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
export default function App() {
  //updating ref does not trigger re-render
  //ref is syncrhonous
  const secretRef = useRef();
  const expirationRef = useRef();

  function onCardNumberChange(text) {
    if (text.length > 16) {
      secretRef.current.focus();
    }
  }

  function onSecretChange(text) {
    if (text.length > 3) {
      expirationRef.current.focus();
    }
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={s.main}>
        <TextInput
          placeholder="Card number"
          onChangeText={(text) => onCardNumberChange(text)}
        />
        <TextInput
          ref={secretRef}
          placeholder="Secret code"
          onChangeText={(text) => onSecretChange(text)}
        />
        <TextInput ref={expirationRef} placeholder="Expiration date" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const s = StyleSheet.create({
  main: { flex: 1, justifyContent: "center", alignItems: "center" },
});

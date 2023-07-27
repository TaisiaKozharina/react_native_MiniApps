import { View, ImageBackground } from "react-native";
import { s } from "./App.styles";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Input from "./components/Input";
import { useEffect, useState } from "react";
import DisplayTemp from "./components/DisplayTemp";
import {
  UNITS,
  convert,
  getOppositeUnit,
  isSuperCold,
} from "./utils/temperature";
import ButtonConvert from "./components/Button";
const hotBack = require("./assets/hot.png"); //yeah thanks for suggesting converting
const coldBack = require("./assets/cold.png");

export default function App() {
  const [inpTemp, setInpTemp] = useState<number | string>("0");
  const [unit, setUnit] = useState(UNITS.celcius);
  const [currentBack, setCurrentBack] = useState(hotBack);
  const oppositeUnit = getOppositeUnit(unit);

  useEffect(() => {
    const isCold = isSuperCold({ temp: inpTemp, unit: unit });
    setCurrentBack(isCold ? coldBack : hotBack);
  }, [inpTemp, unit]);

  function getConverted() {
    if (typeof inpTemp == "string") {
      console.log("AYAYAY");
    }
    convert({ temp: inpTemp, unitTo: oppositeUnit }).toFixed(1);
  }

  return (
    <ImageBackground style={s.backImg} source={currentBack}>
      <SafeAreaProvider>
        <SafeAreaView style={s.root}>
          <View style={s.workspace}>
            <DisplayTemp
              temp={convert({ temp: inpTemp, unitTo: oppositeUnit }).toFixed(1)}
              unit={oppositeUnit}
            />
            <Input defVal={"0"} onChange={setInpTemp} unit={unit} />
            <ButtonConvert
              onPress={() => {
                setUnit(oppositeUnit);
              }}
              unit={oppositeUnit}
            />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );
}

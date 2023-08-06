import { StyleSheet, View } from "react-native";
import Txt from "./Txt";
import { getTime } from "../utils/time";
import { useEffect, useState } from "react";

export default function Clock(props: any) {
  const [time, setTime] = useState(getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTime());
    }, 1000);

    //setInterval is global => will rn forever as long as app runs

    //Cleanup function
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <Txt style={s.time}>{time}</Txt>;
}

const s = StyleSheet.create({
  time: {
    fontSize: 16,
  },
});

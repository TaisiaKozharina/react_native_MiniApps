enum UNITS {
  celcius = "°C",
  fahrenheit = "°F",
}

function convert(props: any) {
  if (props.unitTo == UNITS.celcius) {
    return (props.temp - 32) / 1.8;
  } else if (props.unitTo == UNITS.fahrenheit) {
    return props.temp * 1.8 + 32;
  } else {
    throw new Error("Invalid unit!");
  }
}

function getOppositeUnit(unit: UNITS) {
  return unit == UNITS.celcius ? UNITS.fahrenheit : UNITS.celcius;
}

function isSuperCold(props: any) {
  if (props.unit == UNITS.celcius) {
    return Number(props.temp) <= 0;
  } else if (props.unit == UNITS.fahrenheit) {
    return Number(props.temp) <= 32;
  } else {
    throw new Error("Invalid unit!");
  }
}
export { UNITS, convert, getOppositeUnit, isSuperCold };

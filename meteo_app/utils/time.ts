export function getTime() {
  //Format: HH:MM
  const date = new Date();

  return `${date.getHours()} : ${date.getMinutes().toString().padStart(2, "0")}`;
}

export default function changeSecToMinute(sec) {
  const secTemp = parseInt(sec);
  const minute = parseInt(secTemp / 60);
  const setFinal = secTemp % 60;
  if (setFinal < 10) {
    return `0${minute} : 0${setFinal}`;
  }
  return `0${minute} : ${setFinal}`;
}

import gravitationalBeep from "../assets/audios/gravitational_beep.mp3";

export function LoadBeep() {
  const audio = new Audio(gravitationalBeep);
  audio.load();

  return () => {
    audio.currentTime = 0;
    audio.play().catch((erro) => console.log("erro ao tocar o audio", erro));
  };
}

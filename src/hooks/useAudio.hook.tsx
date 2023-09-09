import { useEffect, useRef } from "react"
import { useAppSelector } from "../store/store";
import { getIsAudioTurnOn } from "../store/selectors/game-settings.selectors";

export const useAudio = (source: string, { volume = 1 }: { volume?: number }): HTMLAudioElement => {
  const audio = useRef(new Audio(source));
  const isAudioTurnOn = useAppSelector(getIsAudioTurnOn);

  useEffect(() => {
    audio.current.volume = isAudioTurnOn ? volume : 0;  
  }, [volume, isAudioTurnOn])

  return audio.current
}

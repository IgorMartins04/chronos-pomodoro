import { useEffect, useReducer, useRef } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./taskContext";
import { taskReducer } from "./taskReducer";
import { TimerWorkerMenager } from "../../workers/TimerWorkerMenager";
import { TaskActionTypes } from "./taskActions";
import { LoadBeep } from "../../utils/loadBeep";
import { showMessage } from "../../adapters/showMessage";
import type { TaskStateModel } from "../../models/TaskStateModel";

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
    const storageState = localStorage.getItem("state");

    if (storageState === null) return initialTaskState;

    const parsedStorageState = JSON.parse(storageState) as TaskStateModel;

    return {
      ...parsedStorageState,
      activeTask: null,
      secondsRemaining: 0,
      formattedSecondsRemaining: "00:00",
    };
  });
  const worker = TimerWorkerMenager.getInstance();
  const playBeepRef = useRef<ReturnType<typeof LoadBeep> | null>(null);

  worker.onmessage((e) => {
    const countDownSeconds = e.data;
    console.log(countDownSeconds);

    if (countDownSeconds <= 0) {
      if (playBeepRef.current) {
        playBeepRef.current();
        showMessage.success("Tarefa concluida com sucesso");
        playBeepRef.current = null;
      }
      dispatch({
        type: TaskActionTypes.COMPLETE_TASK,
      });
      worker.terminate();
    } else {
      dispatch({
        type: TaskActionTypes.COUNT_DOWN,
        payload: { secondsRemaining: countDownSeconds },
      });
    }
  });

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));

    if (!state.activeTask) {
      worker.terminate();
    }

    document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;

    worker.postMessage(state);
  }, [worker, state]);

  useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = LoadBeep();
    } else {
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

import { PlayCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInpunt } from "../DefaultInput";

export function MainForm() {
  return (
    <form action="" className="form">
      <div className="formRow">
        <DefaultInpunt
          labelText="task"
          id="meuInput"
          type="text"
          placeholder="Digite algo"
        />
      </div>

      <div className="formRow">
        <p>O proximo intervalo é de 25min</p>
      </div>

      <div className="formRow">
        <Cycles></Cycles>
      </div>

      <div className="formRow">
        <DefaultButton icon={<PlayCircleIcon />} />
      </div>
    </form>
  );
}

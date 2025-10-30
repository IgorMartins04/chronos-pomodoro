import "./styles/theme.css";
import "./styles/global.css";
import "./components/Heading";
import { Heading } from "./components/Heading";

export function App() {
  console.log("oi");

  return (
    <div>
      <Heading>Testando 1</Heading>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex sint
        deserunt fugit minus provident repellat at error deleniti accusantium
        culpa non quasi, eligendi minima expedita fugiat modi ullam velit
        corrupti?
      </p>
    </div>
  );
}

import { useEffect, useState } from "react";
import LightComp from "./components/LightComp";

function App() {

  const studentNames = [
    "Leo Kuyper",
  ];

const [components, setComponents] = useState();

useEffect(()=>{
    const render = studentNames.map((item) => <LightComp key={item} name={item} />);
    setComponents(render);
},[]);

  return (
    <div className="App">
      {components}

    </div>
  );
}

export default App;

import React, { Component, useState } from "react";
import XXH from "xxhashjs";

function Demo() {
  const [time, setTime] = useState(0);
  const numberOfIterations = 100000;

  const javascriptHash = () => {
    const before = performance.now();
    for (let i = 0; i < numberOfIterations; i++) {
      XXH.h64("hashMe", 0);
    }
    const after = performance.now();
    setTime(after - before);
  };

  const webAssemblyHash = () => {
    /* do the magic*/
    const rust = import("../../pkg/index").catch(console.error);
    rust.then(module => {
      const before = performance.now();
      for (let i = 0; i < numberOfIterations; i++) {
        module.xxhash("hashMe");
      }
      const after = performance.now();
      setTime(after - before);
    });
  };

  return (
    <div>
      <button className="Button" onClick={() => javascriptHash()}>
        Javascript
      </button>
      <button className="Button" onClick={() => webAssemblyHash()}>
        Webassembly
      </button>
      {time > 0 ? <h1>Runtime: {time} ms</h1> : <h1>Runtime: </h1>}
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Demo tajm</h1>
        </header>
        <Demo></Demo>
      </div>
    );
  }
}

export default App;

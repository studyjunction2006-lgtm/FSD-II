import { useRef } from "react";

function RenderCounter() {

  const renders = useRef(0);

  renders.current++;

  return (

    <div className="renderCounter">

      <h2>
        ⚡ Performance Monitor
      </h2>

      <p>
        Component Render Count :
      </p>

      <h1>
        {renders.current}
      </h1>

      <small>
        Thanks to memoized selectors and React.memo,
        unnecessary renders are minimized.
      </small>

    </div>

  );
}

export default RenderCounter;
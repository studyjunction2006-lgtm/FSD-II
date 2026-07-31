import { useSelector } from "react-redux";

function ReduxStatePanel() {
  const state = useSelector((state) => state.posts);

  return (
    <div className="statePanel">

      <h2>🗂 Redux State (Live)</h2>

      <pre>
        {JSON.stringify(state, null, 2)}
      </pre>

    </div>
  );
}

export default ReduxStatePanel;
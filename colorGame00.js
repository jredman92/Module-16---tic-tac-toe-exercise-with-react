const Square = ({ id, newState }) => {
  const [color, setColor] = React.useState("green");
  const [status, setStatus] = React.useState(null);
  const XorO = ["O", "X"];

  return (
    <button
      onClick={(e) => {
        setColor(color);
        let nextPlayer = newState(id);
        setStatus(nextPlayer);
        e.target.style.background = color;
      }}
    >
      <h1>{XorO[status]}</h1>
    </button>
  );
};

const Board = () => {
  const [player, setPlayer] = React.useState(1);
  const [state, setState] = React.useState(Array(9).fill(null));
  // set state here
  let status = `Player ${player}`;
  let winner = checkWinner(state);
  if (winner != null) status = `Player ${winner} wins`;

  const checkWinner = (state) => {
    const win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < win.length; i++) {
      const [a, b, c] = win[i];
      if (state[a] == state[b] && state[a] == state[c] && state[a])
        return state[a];
    }
    return null;
  };

  // define newState function
  const newState = (idOfSquare) => {
    let thePlayer = player;
    state[idOfSquare] = player; // player is present player
    setState(state); // state is arrow of 0 or 1 or null
    let nextplayer = (player + 1) % 2;
    setPlayer(nextplayer);
    return thePlayer; // we need to return the present player
  };

  const toggle = () => setMounted(!mounted);
  const reRender = () => setRandom(Math.random());

  function renderSquare(i) {
    return <Square id={i} player={player} newState={newState}></Square>;
  }
  return (
    <div className="game-board">
      <div className="grid-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="grid-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="grid-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div id="info">
        <button onClick={toggle}>Show/Hide Row</button>
        <button onClick={reRender}>Re-render</button>
        <h1>{status}</h1>
      </div>
    </div>
  );
};

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Board />
  </React.StrictMode>
);

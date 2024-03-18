export const initialState = {
  playerName: '',
  player: null,
  gameStarted: false, // Show/hide game menu
  gameOver: false, // Show/hide game over menu
  score: 0,
  level: 0,
  lines: 0,
  gameCount: 0,
};

export function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_PLAYER_NAME':
      return { ...state, playerName: action.payload };
    case 'START_GAME':
      return { ...state, player: action.payload, gameStarted: true };
    case 'END_GAME':
      return { ...state, gameOver: true, gameCount: state.gameCount + 1 };
    case 'RESTART_GAME':
      return { ...initialState, playerName: state.playerName, player: state.player, gameStarted: true, gameCount: state.gameCount };
    case 'UPDATE_SCORE':
      return { ...state, score: action.payload.score, level: action.payload.level, lines: action.payload.lines };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

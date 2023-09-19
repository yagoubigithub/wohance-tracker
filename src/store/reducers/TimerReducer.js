const initState = {
  error: null,
  times: [],
  timers: [],
  activeWins: [],
  active: false,
};

const timerReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_TIME":
      return { ...state, activeWins: [], times: [...action.payload] };
    case "ADD_TIMEER":
      return { ...state, timers: [...action.payload] };

    case "RECORD_ACTIVE_WIN":
      return { ...state, activeWins: action.payload };

    case "SET_ACTIVE_TIMER":
      return {
        ...state,
        active: action.payload,
      };

      case "GET_TIMEERS" : 
      return { ...state, timers: [...action.payload] };

    case "GET_TIMES":
      return {
        ...state,
        activeWins: [],
        times: [...action.payload],
      };
    default:
      return state;
  }
};

export default timerReducer;

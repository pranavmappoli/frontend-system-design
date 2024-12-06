const initialState = {
  toasts: [],
};

const reducerFunction = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return { ...state, toasts: [action.payload, ...state.toasts] };
    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export { reducerFunction, initialState };

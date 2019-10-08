import createStore from "react-waterfall";

const store = {
    initialState: {
        timeEntries: []
    },
    actionsCreators: {
        addState: (prevState, actions, newState) => {
            return {
                ...prevState,
                timeEntries: newState
            }
        }
    }
};

const {
    Provider,
    Consumer,
    actions,
    getState,
    connect,
    subscribe
} = createStore(store);

export { Provider, Consumer, actions, getState, connect, subscribe };
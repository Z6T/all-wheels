const createStore = reducer => {
  let curState = {},
    curReducer = reducer;
  let listeners = []; // 保存订阅回调

  const getState = () => {
    return curState;
  };

  /**
   * 发布
   * @param action
   */
  const dispatch = action => {
    if (typeof action.type === "undefined") throw new Error("action不合法");
    try {
      curState = curReducer(curState, action); // 新的state覆盖旧的
      listeners.forEach(l => l(curState));
    } catch (e) {
      console.log(e);
    }
  };
  dispatch({ type: "@@redux/INIT" });
  console.log("curState :", curState);

  /**
   * 执行监听函数,返回一个退订函数
   * @param listener
   * @returns {Function}
   */
  const subscribe = listener => {
    listeners.push(listener);
    console.log("listeners :", listeners);
    // 返回的是一个取消订阅的方法
    return function() {
      listeners = listeners.filter(fn => fn !== listener);
    };
  };

  return {
    getState,
    dispatch,
    subscribe
  };
};

/**
 * combineReducers将reducer合并为一个函数
 * @param reducers:Object
 */

const combineReducers = reducers => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      console.log("key :", key);
      nextState[key] = reducers[key](state[key], action);
      console.log("nextState :", nextState);
      return nextState;
    }, {});
  };
};

/**测试单个reducer */
// const reducer = (state = 999, action) => {
//   switch (action.type) {
//     case "INCREMENT":
//       return state + 1;
//     case "DECREMENT":
//       return state - 1;
//     default:
//       return state;
//   }
// };
// const store = createStore(reducer);
// store.subscribe(function(state) {
//   console.log(`subscribe`, state);
// });
// store.dispatch({
//   type: "INCREMENT"
// });
// store.dispatch({
//   type: "DECREMENT"
// });
//
// console.log(store.getState());

// 测试combineReducer
const reducers = {
  reducer1(state = [], action = {}) {
    switch (action.type) {
      case "ADD_TODO":
        return state.concat([action.text]);
      default:
        return state;
    }
  },
  reducer2(state = 0, action = {}) {
    switch (action.type) {
      case "INCREMENT":
        return state + 1;
      case "DECREMENT":
        return state - 1;
      default:
        return state;
    }
  }
};
const mergedReducers = combineReducers(reducers);
const store = createStore(mergedReducers);

const bindActionCreators = (actions, dispatch) => {
  const newActions = {};
  for (const actionKey in actions) {
    if (actions.hasOwnProperty(actionKey)) {
      const actionVal = actions[actionKey];
      newActions[actionKey] = function() {
        dispatch(actionVal.apply(null, arguments));
      };
    }
  }
  return newActions;
};

// 原来这样写
const mapDispatchToProps = dispatch => {
  return {
    addTodo: text => {
      dispatch(TodoActionCreators.addTodo(text));
    },
    removeTodo: id => {
      dispatch(TodoActionCreators.removeTodo(id));
    }
  };
};

// 使用bindActionCreators
const actions = {
  addTodo(text) {
    return {
      type: "ADD_TODO",
      text
    };
  },
  removeTodo(id) {
    return {
      type: "REMOVE_TODO",
      id
    };
  }
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

// console.log(store.getState());

// export {
//     createStore
// }

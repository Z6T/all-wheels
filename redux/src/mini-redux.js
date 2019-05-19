const createStore = (reducer) => {
    let curState, curReducer = reducer, isDispatching = false; // 设置初始状态和初始reducer
    let listeners = []; // 保存订阅回调

    const getState = () => {
        return curState

    }
    // 发布
    const dispatch = (action) => {

        if (typeof action.type === 'undefined') throw new Error('action不合法')
        else if (isDispatching) {
            throw new Error('正在派发')
        }
        try {
            isDispatching = true;
            curState = curReducer(curState, curReducer) // 新的state覆盖旧的}
        } finally {
            isDispatch = false;
        }
    }

    /**
     * 执行监听函数,返回一个退订函数
     * @param listener
     * @returns {Function}
     */
    const subscribe = (listener)=>{
        listeners.push(fn);
        return function () {
            listeners = listeners.filter(fn => fn !== listener)
        }
    }
    return {
        getState
    }
}

export {
    createStore
}
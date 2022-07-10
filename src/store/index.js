import { createHashHistory } from 'history'
import { configureStore } from '@reduxjs/toolkit'
import { saga, createRootReducer, hooks } from '../reducers'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga';
import exportOnWindow from '../tools/exportOnWindow';


const history = createHashHistory();
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: createRootReducer(history),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware(history)).concat(sagaMiddleware),
})

const lastValues = {}

const onStateHook = () => {
    const state = store.getState()
    window.state = state
    hooks.forEach(async (hook, index) => {
        const { name, moduleName, tester, action, onFail } = hook
        const state = window.state[moduleName]
        const lastValue = lastValues[index]

        let shouldRun = true
        if (tester) {
            const value = tester(state)
            if (value === lastValue) {
                shouldRun = false
            } else {
                lastValues[index] = value
            }
        }
        if (shouldRun) {
            if (name) {
                console.log(`hook: [${name}][${moduleName}]`)
            }

            try {
                const dispatch = (action) => store.dispatch(action)
                await action(state, dispatch)
            } catch (e) {
                if (onFail) {
                    await onFail(e)
                }
            }
        }
    })
}

store.subscribe(onStateHook)
onStateHook()

exportOnWindow({ store, lastValues })

sagaMiddleware.run(saga)

export default store;
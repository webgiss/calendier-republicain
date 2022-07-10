import calendar from './calendar'
import { connectRouter } from 'connected-react-router'
import { rootSaga, rootReducer } from 'saga-slice'
import exportOnWindow from '../tools/exportOnWindow'

const modules = [
    calendar,
]

export const createRootReducer = (history) => rootReducer(modules, {
    debug: (state, action) => {
        const {type} = action
        console.log('action', type, action)
        return "debug"
    },
    router: connectRouter(history)
})

export const hooks = modules
    .filter((module) => module.hooks !== undefined)
    .map((module) => [...module.hooks].map((hookItem)=>({...hookItem, moduleName: module.name})))
    .flat()

export const saga = rootSaga(modules)

exportOnWindow({hooks, saga, createRootReducer})

import initView from './view'
import reportWebVitals from './reportWebVitals';
import store from './store'

initView();
store.dispatch({ type: 'calendar/addConverter' })
store.dispatch({ type: 'calendar/setGregorian', payload: { idConv: 0, day: 9, month: 6, year: 2022 } })
store.dispatch({ type: 'calendar/setFrenchRepublican', payload: { idConv: 0, day: 2, month: 11, year: 4 } })


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

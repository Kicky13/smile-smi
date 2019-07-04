import {combineReducers} from 'redux'
import Auth from './Auth'
import persistStore from './persistStore'
import { DataTableReducer } from 'react-redux-datatable'

const RootReducer = combineReducers({Auth,persistStore,DataTableReducer});

export default RootReducer;
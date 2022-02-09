// Imports: Dependencies
import { delay, takeEvery, takeLatest, put ,call} from 'redux-saga/effects';
import {types} from '../action/actionType'
import { apiCall } from '../utils/Utility';
import { serviceUrl } from '../utils/serviceUrl';
// Worker: Increase Counter Async (Delayed By 4 Seconds)
// console.log("value is there ")

console.log("api saga is there ")
function* getapicall() {

    // const { payload} = obj;
    try {
       
        //https://raw.githubusercontent.com/adhithiravi/React-Hooks-Examples/master/testAPI.json
        let response = yield call(apiCall, `${serviceUrl.baseUrl}`, null, "GET")
        yield put({
            type: types.API_LIST_SUCCESS,
            payload: response.result
        })
        console.log("api data response ---->", response);
       
    }
    catch(error){
        console.log("this is error")
    }

}
export function* watchApiData(){
    yield takeLatest(types.GET_API, getapicall);
} 

import { types } from '../action/ActionType'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { serviceUrl } from '../constant/serviceUrl';



exports.apiCall = async function (url, body, method) {
    console.log("url, body, method", url, body, method);
    // const language = await AsyncStorage.getItem('language')
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    // const token = await AsyncStorage.getItem('Token');
    // console.log("token =", token)
    // if (token) {
    //     headers['Authorization'] = token;
    // }

    // let refreshToken = await AsyncStorage.getItem('refreshToken')
    // console.log("refreshTokenrefreshTokenrefreshToken",refreshToken)
    // const netState = await  NetInfo.fetch()
    // if(netState.isConnected){

    return fetch(url, {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : null,
    })
        .then((response) => {
            console.log('response util 1: ', response);
            return new Promise(function (resolve, reject) {
                response.json().then(responseParsed => {
                    console.log('response util : ', responseParsed);
                    if (response.status == 200 || response) {
                        resolve({ status: response.status, result: responseParsed })
                    } else if (response.status == 401 || response.status == 400 || response.status == 409) {             // access token unauthorised
                        resolve({ status: response.status, result: responseParsed })
                    } else {
                        resolve({ status: 400, result: responseParsed })                                         // failed
                        // resolve(response.json())
                    }
                })

            })
        })
        .catch((err) => {
            // navigation.navigate('OtpVerification', { code: "1234", mobile: body.mobile_no })
            console.log("errerr===>", err);
            alert(err.message)

            return false;
            //         return new Promise(function (resolve, reject) {
            //             setTimeout(() => reject({ status: 400, result: false }), 1000);
            //              //resolve({ status: 400, result: false })                                         // failed
            // })


        }
        )
}





// multipart api call
// exports.apiCallMultipart = async function (url, body, method) {

//     const headers = {
//         'Accept': 'application/json',
//        'Content-Type': 'application/json',
//      };
//      const token = await AsyncStorage.getItem('Token');

//      if (token) {
//        headers['authorization'] = 'Bearer' + ' ' + token;
//      }
//     return fetch(url, {
//         method: method,
//         headers:headers,
//         body: body,
//     })
//         .then((response) => {
//             console.log('response multipart then : ', response);
//             return new Promise(function (resolve, reject) {
//                 response.json().then(responseParsed => {
//                     console.log('response util : ', responseParsed);
//                     if (response.status == 200 || response.status == 201 || response.status == 204) {               // success
//                         resolve({ status: true, result: responseParsed })

//                     } else if (response.status == 401 || response.status == 409) {             // access token unauthorised

//                         resolve({ status: false, result: responseParsed })
//                     } else {
//                         resolve({ status: false, result: responseParsed })                                         // failed
//                         // resolve(response.json())
//                     }
//                 })

//             })
//         })
//         .catch((err) => {
//             console.log('multipart catch : ', err);
//         })
// }
import 'react-native-gesture-handler';
import * as React from 'react';
import AppNavigation from './src/route/AppNavigation';
import {Provider} from 'react-redux'
import  {store}  from "./src/reducers/store";

const App = () => {
    return (
        <Provider store={store} >
        <AppNavigation/>
         </Provider>
    );
}

export default App;
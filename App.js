import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import { createStackNavigator } from '@react-navigation/stack';

import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import useCachedResources from './hooks/useCachedResources';

import ReduxThunk from "redux-thunk";
import {createStore, combineReducers, applyMiddleware } from 'redux'
import noteReducer from "./store/reducers/notes";
import {Provider} from 'react-redux'



export default function App(props) {
  const rootReducer = combineReducers({
    notes: noteReducer
  });
  
  const store = createStore(
    rootReducer, applyMiddleware(ReduxThunk)
  );

  const isLoadingComplete = useCachedResources();
  const Stack = createStackNavigator();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
          <NavigationContainer linking={LinkingConfiguration}>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={BottomTabNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
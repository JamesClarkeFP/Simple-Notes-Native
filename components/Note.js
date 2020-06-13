import { useRef } from "react";
import * as React from 'react';
import { useDispatch } from "react-redux";
import { Platform, StyleSheet, Text, View,Button, PanResponder, Animated } from 'react-native';

import { deleteNote, updateNote } from '../store/actions/notes';



export default function Note(props){
    const dispatch = useDispatch();

    const pan = useRef(new Animated.ValueXY({x: props.note.x, y: props.note.y})).current;
    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          pan.setOffset({
            x: pan.x._value,
            y: pan.y._value
          });
        },
        onPanResponderMove: Animated.event(
          [
            null,
            { dx: pan.x, dy: pan.y }
          ]
        ),
        onPanResponderRelease: (evt, gestureState) => {
          pan.flattenOffset()
          dispatch(updateNote(
            props.note.id,
            pan.x._value,
            pan.y._value
          ))
          pan.flattenOffset()
        }
      })
    ).current;
  
    return(
      <Animated.View style={{position:'absolute', left: pan.x, top: pan.y}}>
        <View style={styles.box} {...panResponder.panHandlers}>
          <Button title='delete me' onPress={() => dispatch(deleteNote(props.note.id))}></Button>
          <Text>{props.note.id}</Text>
          <Text>{props.note.text}</Text>
          <Text>{props.note.x}</Text>
          <Text>{props.note.y}</Text>
        </View>
      </Animated.View>
    )
  }



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    flex: 0,
    height: 150,
    width: 150,
    backgroundColor: "white",
    borderRadius: 5
  }
});
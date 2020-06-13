import { useEffect } from "react";
import * as React from 'react';
import { StyleSheet } from 'react-native';

import { useSelector, useDispatch } from "react-redux";
import { fetchNotes } from "../store/actions/notes";

import Note from '../components/Note'



export default function Board(props){
  const dispatch = useDispatch();
  const notes = useSelector(state => state.notes.notes)
  
  //Component did mount hook
  useEffect(() => {
    dispatch(fetchNotes())
  }, [])

  return(
    <>
      {
        notes.map((note) => {
          return <Note key={note.id} text={note.text} note={note}/>
        })
      }
    </>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
import {
    GET_NOTES,
    ADD_NOTE,
    UPDATE_NOTE,
    DELETE_NOTE,
  } from "../actions/notes";
  
  let NOTES = []
  
  const initialState = {
    notes: NOTES
  };
  
const state = (state = initialState, action) => {
  let tempList = []
  switch (action.type) {
    case GET_NOTES:
      return { ...state, notes: action.notes };

    case ADD_NOTE:
      tempList = []
      state.notes.forEach((note) => {
        tempList.push(note)
      })
      tempList.push(action.note)
      return { ...state, notes: tempList };

    case UPDATE_NOTE:
      tempList = []
      state.notes.forEach((note) => {
        if (note.id == action.note.id) {
          tempList.push(action.note)
        } else {
          tempList.push(note)
        }
      })
      return { ...state, notes: tempList};

    case DELETE_NOTE:
      tempList = []
      state.notes.forEach((note) => {
      if (note.id == action.id) {
        //we do nothing lebowski
      } else {
        tempList.push(note)
      }
    })
      return { ...state, notes: tempList };

    default:
      return state;
  }
};
  
  export default state;
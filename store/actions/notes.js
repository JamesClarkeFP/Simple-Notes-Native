export const GET_NOTES = "GET_NOTES"
export const ADD_NOTE = "ADD_NOTE";
export const UPDATE_NOTE = "UPDATE_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";

const proxy = 'https://cors-anywhere.herokuapp.com/'
const endpoint = 'http://acc63af2b6cf9487c8717f9aecb72806-264078671.eu-west-2.elb.amazonaws.com:8000/api/'

export const fetchNotes = () => {
  return async dispatch => {
    const response = await fetch(proxy+endpoint);
    const resData = await response.json();

    dispatch({ type: GET_NOTES, notes: resData });
  };
};

export const addNote = (text,x,y) => {
    const data = {
        text: text,
        x: x,
        y: y
    }
  return async dispatch => {
    const response = await fetch(proxy+endpoint, 
    {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    const resData = await response.json();

    dispatch({ type: ADD_NOTE, note: resData });
  };
};

export const updateNote = (id,x,y) => {
  const data = {
    x: x,
    y: y
  }
  return async dispatch => {
    const response = await fetch(proxy+endpoint+id, 
    {
        method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
      const resData = await response.json();
  
      dispatch({ type: UPDATE_NOTE, note:resData });
    };
  };

export const deleteNote = (id) => {
  return async dispatch => {
    const response = await fetch(proxy+endpoint+id, 
    {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });

      dispatch({ type: DELETE_NOTE, id: id });
  };
};
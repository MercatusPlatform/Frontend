export const DELETE_API_KEY = 'DELETE_API_KEY';
export const ADD_API_KEY = 'ADD_API_KEY';
export const UPDATE_API_KEY = 'UPDATE_API_KEY';

export function deleteApiKey(key) {
  return dispatch => {
    window.fetch('/api/key/' + key.keyId, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      method: 'delete'})
      .then(res => res.json())
      .then(json =>  {
        if(json.result) {
          dispatch({
            type: DELETE_API_KEY,
            apiKey: key
          });
        } else {
          alert('failed to delete api key');
        }
      });
  };
}


export function addApiKey(key) {
  return dispatch => {
    window.fetch('/api/key', {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      method: 'post',
      body: JSON.stringify(key)
    }).then(res => res.json())
      .then(json => {
        if(json.portfolioId) {
          key.keyId = json.portfolioId;
          delete key.value;
          dispatch({
            type: ADD_API_KEY,
            apiKey: key
          });
        }
      });
  };
}

export function updateApiKey(key) {
  return dispatch => {
    window.fetch('/api/keys/' + key.keyId, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      method: 'put',
      body: JSON.stringify(key)
    }).then(res => res.json())
      .then(json => {
        dispatch({
          type: UPDATE_API_KEY,
          apiKey: key
        });
      });
  };
}
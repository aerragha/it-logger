import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LOG,
  SEARCH_LOGS,
} from "./Types";

// Get logs from server
export const getLogs = () => async (dispatch) => {
  try {
    setLoading(true);
    const res = await fetch("/logs");
    const data = await res.json();

    dispatch({
      type: GET_LOGS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.reponse.statusText,
    });
  }
};

// Add new log
export const addLogs = (log) => async (dispatch) => {
  try {
    setLoading(true);

    const res = await fetch("/logs", {
      method: "POST",
      body: JSON.stringify(log),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    dispatch({
      type: ADD_LOG,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.reponse.statusText,
    });
  }
};

// Delete log from server
export const deleteLog = (id) => async (dispatch) => {
  try {
    setLoading(true);
    await fetch(`/logs/${id}`, {
      method: "DELETE",
    });

    dispatch({
      type: DELETE_LOG,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.reponse.statusText,
    });
  }
};

// Update log from server
export const updateLog = (log) => async (dispatch) => {
  try {
    setLoading(true);
    await fetch(`/logs/${log.id}`, {
      method: "PUT",
      body: JSON.stringify(log),
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: UPDATE_LOG,
      payload: log,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.reponse.statusText,
    });
  }
};

// Search Logs
export const searchLogs = (text) => async (dispatch) => {
  try {
    setLoading(true);
    const res = await fetch(`/logs?q=${text}`);
    const data = await res.json();

    dispatch({
      type: SEARCH_LOGS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.reponse.statusText,
    });
  }
};

// Set Current
export const setCurrent = (log) => {
  return {
    type: SET_CURRENT,
    payload: log,
  };
};

// Clear Current
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT,
  };
};

// Set loading
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

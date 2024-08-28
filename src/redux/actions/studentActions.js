import api from '../../utils/api';

export const GET_STUDENTS = 'GET_STUDENTS';
export const GET_STUDENT = 'GET_STUDENT';
export const ADD_STUDENT = 'ADD_STUDENT';
export const UPDATE_STUDENT = 'UPDATE_STUDENT';
export const DELETE_STUDENT = 'DELETE_STUDENT';

export const getStudents = () => async (dispatch) => {
    try {
        const res = await api.get('/students');
        dispatch({ type: GET_STUDENTS, payload: res.data });
    } catch (err) {
        console.error(err);
    }
};

export const getStudent = (id) => async (dispatch) => {
    try {
        const res = await api.get(`/students/studentId/${id}`);
        dispatch({ type: GET_STUDENT, payload: res.data });
    } catch (err) {
        console.error(err);
    }
};

export const addStudent = (student) => async (dispatch) => {
    try {
        const res = await api.post('/students', student);
        dispatch({ type: ADD_STUDENT, payload: res.data.student});
    } catch (err) {
        console.error(err);
    }
};

export const updateStudent = (id, student) => async (dispatch) => {
    try {
        const res = await api.put(`/students/${id}`, student);
        dispatch({ type: UPDATE_STUDENT, payload: res.data.student });
    } catch (err) {
        console.error(err);
    }
};

export const deleteStudent = (id) => async (dispatch) => {
    try {
        const res = await api.delete(`/students/${id}`);
        dispatch({ type: DELETE_STUDENT, payload: id });
    } catch (err) {
        console.error(err);
    }
};

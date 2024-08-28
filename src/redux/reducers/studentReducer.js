import { GET_STUDENTS, GET_STUDENT, ADD_STUDENT, UPDATE_STUDENT, DELETE_STUDENT } from '../actions/studentActions';

const initialState = {
    students: [],
    student: null,
};

const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_STUDENTS:
            return {
                ...state,
                students: action.payload.students,
            };
        case GET_STUDENT:
            return {
                ...state,
                student: action.payload.students,
            };
        case ADD_STUDENT:
            return {
                ...state,
                students: [...state.students, action.payload],
            };
        case UPDATE_STUDENT:
            return {
                ...state,
                students: state.students.map(student => student.studentId === action.payload.studentId ? action.payload : student),
            };
        case DELETE_STUDENT:
            return {
                ...state,
                students: state.students.filter(student => student.studentId !== action.payload),
            };
        default:
            return state;
    }
};

export default studentReducer;

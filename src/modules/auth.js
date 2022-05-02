import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// 액션 타입 정의
// 액션 타입은 주로 대문자로 작성합니다.
const CHANGE_FIELD = 'auth/CHANGE_FIELD';

const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

// 액션 생성함수 정의
// 액션 생성함수는 주로 camelCase로 작성합니다.
export const changeField = createAction(
    CHANGE_FIELD,
    ({ form, key, value }) => ({
        form, // register, login
        key, // username, password, passwordConfirm,
        value, // 실제 바꾸려는 값
    }),
);
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form); //register / login

// 리덕스에서 관리 할 상태 정의
const initialState = {
    register: {
        username: '',
        password: '',
        passwordConfirm: '',
    },
    login: {
        username: '',
        password: '',
    },
};

/* 리듀서 만들기 */
// 위 액션 생성함수들을 통해 만들어진 객체들을 참조하여
// 새로운 상태를 만드는 함수를 만들어봅시다.
// 주의: 리듀서에서는 불변성을 꼭 지켜줘야 합니다!
const auth = handleActions(
    {
        [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
            produce(state, (draft) => {
                //immer 를 이용해 불변성 유지
                draft[form][key] = value; // 예: state.register.username을 바꾼다
            }),
        [INITIALIZE_FORM]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form],
        }),
    },
    initialState,
);

export default auth;

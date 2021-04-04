export default {
    namespace: 'app',
    state: {
        token:'token',
        userid:'userid',
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload }
        },
    },
    effects: {
    },
    subscriptions: {
        setup({ dispatch }) {

        },
    },
}

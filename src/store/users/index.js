import http from '../../libs/axios'




export default {

    namespaced: true,
    state: {
        role: [],
        users: {

        }

    },
    getters: {
        GET_ROLE: state => state.role,
        GET_USERS: state => state.users

    },
    actions: {
      async CREATE_USER(_, data) {
           return http.post('api/register',data)
        },
        async FETCH_ROLE(context,) {
            return http.get('api/role').then(res => {
                context.state.role = res.data
            })
        },
        async FETCH_USERS(context) {
            return http.get('api/users').then(res => {
                context.state.users = res.data
            })
        },
        async USER_DELATE(_, id) {
            return http.delete(`api/user/delete/${id}`)
        }

    }
}
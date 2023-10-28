import {getTable} from '@/api/table'
export default {
    FETCH_TABLE(context, data) {
        return getTable(data).then(res => {
            context.state.tableList = res.data
        })
        

    }
}

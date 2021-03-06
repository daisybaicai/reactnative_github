import Types from "../../action/types";


const defaultState = {

}

export default (state = defaultState, action) => {
    switch (action.type) {

        case Types.POPULAR_REFRESH_SUCCESS://下拉刷新成功
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    items: action.items, //原始数据
                    projectModes: action.projectModes, //此次展示数据
                    isLoading: false,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex
                }
            };

        case Types.POPULAR_REFRESH://下拉刷新
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: true,
                    hideLoadingMore: true
                }
            };

        case Types.POPULAR_REFRESH_FAIL://下拉刷新失败
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false,
                }
            };
        
        case Types.POPULAR_LOAD_MORE_SUCCESS: //下拉更多刷新成功
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModes: action.projectModes, //原始数据
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex
                }
            };

            case Types.POPULAR_LOAD_MORE_FAIL: //下拉更多刷新失败
                return {
                    ...state,
                    [action.storeName]: {
                        ...state[action.storeName],
                        hideLoadingMore: true,
                        pageIndex: action.pageIndex
                    }
                };
        default: return state
    }
}
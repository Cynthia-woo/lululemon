const expandItem = index => {
    // console.log('[action_expandIndex]',index)
    return{
        type: 'expand_item',
        payload: index
    }
}

const defaultExpanding = index => {
    // console.log('[action_defaultIndex]',index)
    return{
        type: 'default_expanding_list',
        payload: new Array(index).fill(false)
    }
}

export default {
    expandItem,
    defaultExpanding
}
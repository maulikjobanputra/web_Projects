export const increment = (num) => {

    return {
        type : 'increment',
        payload : num
    }
}
export const decrement = () => {

    return {
        type : 'decrement'
    }
}

import jwtItem from '../entities/auth/token'
const _key = "WFEngine_JWT_Key"


export const getToken = () => {
    return Object.assign(new jwtItem(), JSON.parse(window.localStorage.getItem(_key)))
}

export const saveToken = token => {
    window.localStorage.setItem(_key, JSON.stringify(token))
}

export const destroyToken = () => {
    window.localStorage.removeItem(_key);
}

export default {
    getToken,
    saveToken,
    destroyToken
}
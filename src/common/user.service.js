import userItem from '../entities/auth/user'
const _key = "WFEngine_User_Key"

export const getUser = () => {
    return Object.assign(new userItem(), JSON.parse(window.localStorage.getItem(_key)))
}

export const saveUser = user => {
    window.localStorage.setItem(_key, JSON.stringify(user))
}

export const destroyUser =  () => {
    window.localStorage.removeItem(_key);
}

export default{
    getUser,
    saveUser,
    destroyUser
}


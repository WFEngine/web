import organizationItem from '../entities/auth/organization'
const _key = "WFEngine_Organization_Key"

export const getOrganization = () => {
    return Object.assign(new organizationItem(), JSON.parse(window.localStorage.getItem(_key)))
}

export const saveOrganization = (organization) => {
    window.localStorage.setItem(_key, JSON.stringify(organization))
}

export const destroyOrganization = () => {
    window.localStorage.removeItem(_key);
}

export default {
    getOrganization,
    saveOrganization,
    destroyOrganization
}
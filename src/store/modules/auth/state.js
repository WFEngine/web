import tokenService from '../../../common/jwt.service'
import userService from '../../../common/user.service'
import organizationService from '../../../common/organization.service'
const state = {
    isAuthenticated : tokenService.getToken().token !== undefined,
    token : tokenService.getToken(),
    user : userService.getUser(),
    organization : organizationService.getOrganization()
}

export default state;
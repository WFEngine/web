import {
    SET_USER,
    DESTROY_SESSION
} from './mutations.type'

import userObject from '../../../entities/auth/user'
import organizationObject from '../../../entities/auth/organization'
import tokenObject from '../../../entities/auth/token'
import jwtService from '../../../common/jwt.service'
import userService from '../../../common/user.service'
import organizationService from '../../../common/organization.service'

const mutations = {
    [SET_USER](state, payload) {
        console.log(payload)
        var user = new userObject();
        user.Id = payload.userId;
        user.Name = payload.name;
        user.Email = payload.email;
        user.PhoneNumber = payload.phoneNumber;
        user.Avatar = payload.avatar;
        user.TwoFactorEnabled = payload.twoFactorEnabled;
        user.EmailVerificated = payload.emailVerificated;
        user.LanguageId = payload.languageId;
        state.user = user;
        var organization = new organizationObject();
        organization.Id = payload.organizationId;
        organization.Name = payload.organizationName
        state.organization = organization;
        var token = new tokenObject();
        if (payload.token !== undefined) {
            token.token = payload.token;
            token.expiryDate = new Date(payload.expireDate)
            jwtService.saveToken(token)
        } else {
            token = jwtService.getToken();
        }
        state.token = token;
        userService.saveUser(user);
        organizationService.saveOrganization(organization);
    },
    [DESTROY_SESSION](state) {
        state.isAuthenticated = false;
        jwtService.destroyToken();
        userService.destroyUser();
        organizationService.destroyOrganization();
    }
}

export default mutations
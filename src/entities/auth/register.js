import enumLoginType from '../../enums/enumLoginType'
class Register {
    organizationName = "";
    loginTypeId = enumLoginType.DEFAULT;
    name = "";
    email = "";
    password = "";
    avatar = "";
    phoneNumber = "";
    twoFactorEnabled = 0;
    emailVerificated = 0;
}

export default Register;
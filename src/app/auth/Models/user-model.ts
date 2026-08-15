export class UserModel {
    userName: string = "";
    recordId: string = ""
    roleName: string = "";
    firstName: string = "";
    lastName: string = "";
    password: string = "";
    passwordHash: string = "";
    passwordSalt: string = "";
    phone: string = "";
    email: string = "";
    roleId: number = 0;
    token: string = "";
    profileImageUrl: string = "";
    isEmailVerified: boolean = false;
    createdBy: string = "";
}

export class UserConfiguration {
    isFormVisible: boolean = true;
    formHeader: string = "Create User";
    isFormHeaderShow: boolean = true;
}
export class UserModel {
    firstName: string = "";
    lastName: string = "";
    password: string = "";
    passwordHash: string = "";
    passwordSalt: string = "";
    phone: string = "";
    email: string = "";
    roleId: number = 0;
    profileImageUrl: string = "";
    isEmailVerified: boolean = false;
    createdBy: string = "";
}

export class UserConfiguration {
    isFormVisible: boolean = true;
    formHeader: string = "Add User";
    isFormHeaderShow: boolean = true;
}
export class ClientsModel {
    id: number = 0;
    recordId: string = "";
    clientCode: string = '';
    firstname: string = '';
    lastname: string = '';
    clientType: string = '';
    email: string = '';
    contactPerson: string = '';
    mobile: string = '';
    alternateMobile: string = '';
    address: string = '';
    category: string = '';
    taxId: string = '';
    isActive: boolean = true;
    isDeleted: boolean = false;
    createdDate: Date = new Date();
    createdBy: string = '';
}
export class ClientsModel {
    recordId: number = 0;
    clientCode: string = '';
    name: string = '';
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
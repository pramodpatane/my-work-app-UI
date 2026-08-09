export class FilterData {
    pageNumber: number = 1;
    fromDate: Date | undefined;
    toDate: Date | undefined;
    pagesize: number = 10;
    skip: number = 0;
    filterString: string = "";
    sortString: string = "";
}
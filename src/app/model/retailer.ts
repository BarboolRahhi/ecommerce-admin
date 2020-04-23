export class Retailer {
  retailerId: number;
  retailerName: string;
  retailerDate: string;

  constructor(retailerId: number, retailerName: string, retailerDate: string) {
    this.retailerId = retailerId;
    this.retailerName = retailerName;
    this.retailerDate = retailerDate;
  }
}

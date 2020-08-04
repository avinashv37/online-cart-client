import { Address } from './address.model';
import { Order } from './order.model';

export class User {

    private order:Order;
    private name:string;
    private emailId:string;
    private phoneNumber:number;
    private billingAddress:Address;
    private shippingAddress:Address;

    public getOrder(): Order {
        return this.order;
    }

    public setOrder(order: Order): void {
        this.order = order;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getEmailId(): string {
        return this.emailId;
    }

    public setEmailId(emailId: string): void {
        this.emailId = emailId;
    }

    public getPhoneNumber(): number {
        return this.phoneNumber;
    }

    public setPhoneNumber(phoneNumber: number): void {
        this.phoneNumber = phoneNumber;
    }

    public getBillingAddress(): Address {
        return this.billingAddress;
    }

    public setBillingAddress(billingAddress: Address): void {
        this.billingAddress = billingAddress;
    }

    public getShippingAddress(): Address {
        return this.shippingAddress;
    }

    public setShippingAddress(shippingAddress: Address): void {
        this.shippingAddress = shippingAddress;
    }

}

import { Product } from './product.model';
import { User } from './user.model';
import { OrderStatus } from './order-status.model';
import { Address } from './address.model';

export class Order {

    private cart:Product[];
    private total:number;
    private orderStatus:OrderStatus;
    private user:User;

    public getCart(): Product[] {
        return this.cart;
    }

    public setCart(cart: Product[]): void {
        this.cart = cart;
    }

    public getTotal(): number {
        return this.total;
    }

    public setTotal(total: number): void {
        this.total = total;
    }

    public getOrderStatus(): OrderStatus {
        return this.orderStatus;
    }

    public setOrderStatus(orderStatus: OrderStatus): void {
        this.orderStatus = orderStatus;
    }

    public getUser(): User {
        return this.user;
    }

    public setUser(user: User): void {
        this.user = user;
    }

}

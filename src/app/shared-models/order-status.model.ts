export class OrderStatus {

    private placed:string;
    private pending:string;
    private processing:string;
    private shipped:string;
    private delivered:string;

    public getPlaced(): string {
        return this.placed;
    }

    public setPlaced(placed: string): void {
        this.placed = placed;
    }

    public getPending(): string {
        return this.pending;
    }

    public setPending(pending: string): void {
        this.pending = pending;
    }

    public getProcessing(): string {
        return this.processing;
    }

    public setProcessing(processing: string): void {
        this.processing = processing;
    }

    public getShipped(): string {
        return this.shipped;
    }

    public setShipped(shipped: string): void {
        this.shipped = shipped;
    }

    public getDelivered(): string {
        return this.delivered;
    }

    public setDelivered(delivered: string): void {
        this.delivered = delivered;
    }

    
}

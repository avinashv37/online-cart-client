export class Address {

    private name:string;
    private flatNumber:string;
    private buildingNumber:string;
    private streetName:string;
    private city:string;
    private state:string;
    private pincode:number;

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getFlatNumber(): string {
        return this.flatNumber;
    }

    public setFlatNumber(flatNumber: string): void {
        this.flatNumber = flatNumber;
    }

    public getBuildingNumber(): string {
        return this.buildingNumber;
    }

    public setBuildingNumber(buildingNumber: string): void {
        this.buildingNumber = buildingNumber;
    }

    public getStreetName(): string {
        return this.streetName;
    }

    public setStreetName(streetName: string): void {
        this.streetName = streetName;
    }

    public getCity(): string {
        return this.city;
    }

    public setCity(city: string): void {
        this.city = city;
    }

    public getState(): string {
        return this.state;
    }

    public setState(state: string): void {
        this.state = state;
    }

    public getPincode(): number {
        return this.pincode;
    }

    public setPincode(pincode: number): void {
        this.pincode = pincode;
    }
    
}

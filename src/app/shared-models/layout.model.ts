export class Layout {
    
    private Handset:string;
    private Small:string;
    private XSmall:string;
    private Medium:string;
    private Large:string;
    private XLarge:string;
    private Default:string;


    public getHandset(): string {
        return this.Handset;
    }

    public setHandset(Handset: string): void {
        this.Handset = Handset;
    }

    public getSmall(): string {
        return this.Small;
    }

    public setSmall(Small: string): void {
        this.Small = Small;
    }

    public getXSmall(): string {
        return this.XSmall;
    }

    public setXSmall(XSmall: string): void {
        this.XSmall = XSmall;
    }

    public getMedium(): string {
        return this.Medium;
    }

    public setMedium(Medium: string): void {
        this.Medium = Medium;
    }

    public getLarge(): string {
        return this.Large;
    }

    public setLarge(Large: string): void {
        this.Large = Large;
    }

    public getXLarge(): string {
        return this.XLarge;
    }

    public setXLarge(XLarge: string): void {
        this.XLarge = XLarge;
    }

    public getDefault(): string {
        return this.Default;
    }

    public setDefault(Default: string): void {
        this.Default = Default;
    }

}

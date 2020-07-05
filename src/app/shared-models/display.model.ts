import { Layout } from './layout.model';

export class Display {

    private layout:Layout;

    public getLayout(): Layout {
        return this.layout;
    }

    public setLayout(layout: Layout): void {
        this.layout = layout;
    }

}

import { Component } from '@angular/core';
import { Waiter } from '../../types/waiter.types';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-tip',
    standalone: true,
    imports: [HeaderComponent, FooterComponent, RouterLink],
    templateUrl: './tip.component.html',
})
export class TipComponent {
    waiter: Waiter;

    constructor() {
        this.waiter = JSON.parse(localStorage.getItem('waiter') as string);
    }
}

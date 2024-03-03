import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-success',
    standalone: true,
    imports: [HeaderComponent, FooterComponent, RouterLink],
    templateUrl: './success.component.html',
})
export class SuccessComponent {
    title: string = 'Plata a fost efectuată cu succes!';
    message: string = 'Vă mulțumim pentru atenție!';
    constructor(private readonly router: Router) {
        this.title = JSON.parse(localStorage.getItem('success') as string)?.title || this.title;
        this.message = JSON.parse(localStorage.getItem('success') as string)?.message || this.message;
        if (localStorage.getItem('success') !== null) {
            localStorage.removeItem('success');
        } else {
            this.router.navigate(['/']);
        }
    }
}

import { Component } from '@angular/core';
import { NgOtpInputModule } from 'ng-otp-input';
import { FindWaiterComponent } from '../../components/forms/find-waiter/find-waiter.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [NgOtpInputModule, FindWaiterComponent, HeaderComponent, FooterComponent],
    templateUrl: './home.component.html',
})
export class HomeComponent {}

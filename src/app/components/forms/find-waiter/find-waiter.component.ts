import { WaiterService } from './../../../services/waiter.service';
import { Component, ViewChild } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { NgOtpInputModule } from 'ng-otp-input';

@Component({
    selector: 'waiter-otp',
    standalone: true,
    imports: [NgOtpInputModule, LucideAngularModule],
    templateUrl: './find-waiter.component.html',
})
export class FindWaiterComponent {
    @ViewChild('otpInput') codeInput: any;
    waiterCode: string;

    constructor(protected waiterService: WaiterService) {
        this.waiterCode = '';
    }

    handleWaiterCode(code: string) {
        this.waiterCode = code;
    }

    findWaiter(code: string) {
        this.codeInput.otpForm.disable();
        this.waiterService.findWaiter(code);
    }

    resetWaiterCode() {
        this.codeInput.setValue('');
    }
}

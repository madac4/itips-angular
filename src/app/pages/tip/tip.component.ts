import { Component, signal } from '@angular/core';
import { Waiter } from '../../types/waiter.types';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { AvatarComponent } from '../../components/avatar/avatar.component';
import { NumberPipe } from '../../pipes/number.pipe';
import { NgStyle } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { StatusService } from '../../services/status.service';
import { WaiterComponent } from '../../components/waiter/waiter.component';
import { WaiterService } from '../../services/waiter.service';

interface ITipsVariants {
    label: string;
    amount: number;
}

interface IRateVariants {
    icon: string;
    label: string;
    value: string;
}

@Component({
    selector: 'app-tip',
    standalone: true,
    imports: [
        HeaderComponent,
        FooterComponent,
        RouterLink,
        AvatarComponent,
        NumberPipe,
        NgStyle,
        LucideAngularModule,
        WaiterComponent,
    ],
    templateUrl: './tip.component.html',
})
export class TipComponent {
    openCustomTip = signal<boolean>(false);
    selectedTipAmount = signal<number>(0);
    selectedRate = signal<string>('');
    review = signal<string>('');
    tipsVariants: ITipsVariants[];
    amountPercentage: number;
    rates: IRateVariants[];
    waiterCode: string;
    waiter: Waiter;
    isLoading: boolean = true;
    constructor(
        protected waiterService: WaiterService,
        private readonly status: StatusService,
        private readonly router: Router
    ) {
        this.waiterCode = window.location.pathname.split('/').pop() as string;
        this.waiter =
            JSON.parse(localStorage.getItem('waiter') as string) || this.waiterService.findWaiter(this.waiterCode);
        this.rates = [
            { icon: 'assets/images/bad.png', label: 'Rău', value: 'low' },
            { icon: 'assets/images/medium.png', label: 'Mediu', value: 'medium' },
            { icon: 'assets/images/good.png', label: 'Bine', value: 'high' },
        ];
        this.tipsVariants = [
            { label: '20 MDL', amount: 20 },
            { label: '50 MDL', amount: 50 },
            { label: '100 MDL', amount: 100 },
            { label: '200 MDL', amount: 200 },
        ];
        if (this.waiter.userCode !== Number(this.waiterCode)) {
            this.router.navigate(['/']);
        }
        this.amountPercentage = (this.waiter.target.currentAmount / this.waiter.target.targetAmount) * 100;
    }

    setTipValue(value: number | string) {
        const customTip = Number(value);

        if (customTip >= 10) {
            this.selectedTipAmount.set(customTip);
            this.openCustomTip.set(false);
        } else {
            this.status.warning('Bacșișul minim este de 10 MDL');
        }
    }

    handleReviewChange(event: any) {
        this.review.set(event.target.value);
    }

    formatInput = (event: any) => {
        const reg = /^[0-9\b]+$/;
        if (event.target.value === '' || reg.test(event.target.value)) {
            event.target.value = event.target.value;
        } else {
            event.target.value = [...event.target.value].slice(0, -1).join('');
        }
    };

    sendTip() {
        if (this.selectedTipAmount() >= 10) {
            const data = {
                amount: this.selectedTipAmount(),
                rate: this.selectedRate(),
                review: this.review(),
                payTax: true,
            };

            this.waiterService.createTransaction(this.waiterCode, data);
        } else {
            this.status.info('Bacșișul minim este de 10 MDL.');
        }
    }
}

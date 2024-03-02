import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { API_URL } from '../constants/app.config';
import { HotToastService } from '@ngxpert/hot-toast';
import { IWaiterResponse } from '../types/waiter.types';

@Injectable({
    providedIn: 'root',
})
export class WaiterService {
    isLoading = signal<boolean>(false);

    constructor(
        private readonly http: HttpClient,
        private readonly router: Router,
        private readonly toast: HotToastService
    ) {}

    findWaiter(userCode: string) {
        this.isLoading.set(true);
        return this.http
            .post<IWaiterResponse>(`${API_URL}/get-waiter`, { userCode })
            .pipe(
                tap((response: IWaiterResponse) => {
                    if (response.success) {
                        this.isLoading.set(false);
                        localStorage.setItem('waiter', JSON.stringify(response.user));
                        this.router.navigate([response.redirectTo]);
                    } else {
                        this.showToast('Codul introdus nu este valid.');
                    }
                }),

                catchError((error) => {
                    const message = error.error.message || 'A apărut o eroare. Vă rugăm să încercați din nou.';
                    this.showToast(message);
                    this.isLoading.set(false);
                    return error;
                })
            )
            .subscribe();
    }

    showToast(message: string) {
        this.toast.error(message);
    }
}

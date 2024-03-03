import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { API_URL } from '../constants/app.config';
import { ITipRequest, ITipResponse, IWaiterResponse } from '../types/waiter.types';
import { StatusService } from './status.service';

@Injectable({
    providedIn: 'root',
})
export class WaiterService {
    isLoading = signal<boolean>(false);

    constructor(
        private readonly http: HttpClient,
        private readonly router: Router,
        private readonly status: StatusService
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
                        this.status.error('Codul introdus nu este valid.');
                    }
                }),

                catchError((error) => {
                    const message = error.error.message || 'A apărut o eroare. Vă rugăm să încercați din nou.';
                    this.status.warning(message);
                    this.isLoading.set(false);
                    return error;
                })
            )
            .subscribe();
    }

    createTransaction(waiterCode: string, data: ITipRequest) {
        this.isLoading.set(true);
        return this.http
            .post<ITipResponse>(`${API_URL}/pay/${waiterCode}`, data)
            .pipe(
                tap((response: ITipResponse) => {
                    if (response.success) {
                        this.isLoading.set(false);
                        localStorage.setItem(
                            'success',
                            JSON.stringify({ title: response.title, message: response.message })
                        );
                        this.router.navigate([response.redirectTo]);
                    } else {
                        this.isLoading.set(false);
                        this.status.error('A apărut o eroare. Vă rugăm să încercați din nou.');
                    }
                }),
                catchError((error) => {
                    const message = error.error.message || 'A apărut o eroare. Vă rugăm să încercați din nou.';
                    this.status.warning(message);
                    this.isLoading.set(false);
                    return error;
                })
            )
            .subscribe();
    }
}

import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-success',
    standalone: true,
    imports: [],
    templateUrl: './success.component.html',
})
export class SuccessComponent {
    constructor(private readonly location: Location) {}

    goBack() {
        this.location.back();
    }
}

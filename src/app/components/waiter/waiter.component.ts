import { Component } from '@angular/core';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
    selector: 'app-waiter',
    standalone: true,
    imports: [AvatarComponent],
    templateUrl: './waiter.component.html',
})
export class WaiterComponent {}

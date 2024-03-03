import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-avatar',
    standalone: true,
    imports: [],
    templateUrl: './avatar.component.html',
})
export class AvatarComponent {
    @Input() avatar: string | undefined;
    @Input() fallback: string;
    @Input() waiterName: string;

    constructor() {
        this.fallback = 'https://www.gravatar.com/avatar/';
        this.waiterName = '';
    }
}

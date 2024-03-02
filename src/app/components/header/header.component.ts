import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [],
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    @Input() title: string | undefined;
}

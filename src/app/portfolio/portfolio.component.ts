import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import HeaderComponent from "../shared/header/header.component";

@Component({
    selector: 'app-portfolio',
    imports: [
        CommonModule,
        RouterOutlet,
        HeaderComponent
    ],
    templateUrl: './portfolio.component.html',
    styleUrl: './portfolio.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PortfolioComponent {}

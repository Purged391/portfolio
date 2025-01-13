import { Component } from '@angular/core';
import TranslatePipe from "../../pipes/translate.pipe";
@Component({
    selector: 'app-loading',
    imports: [
    TranslatePipe
],
    templateUrl: './loading.component.html',
    styleUrl: './loading.component.scss',
})
export default class LoadingComponent {


}

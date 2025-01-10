import { Component } from '@angular/core';
import ContactComponent from "../../components/contact/contact.component";

@Component({
    selector: 'page-contact',
    imports: [ContactComponent],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss'
})
export default class ContactPageComponent {

}

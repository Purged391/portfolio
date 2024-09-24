import { Component } from '@angular/core';
import HomeComponent from "../../components/home/home.component";
import AboutComponent from "../../components/about/about.component";
import ContactComponent from "../../components/contact/contact.component";
import ResumeComponent from "../../components/resume/resume.component";

@Component({
  selector: 'page-home',
  standalone: true,
  imports: [HomeComponent, AboutComponent, ContactComponent, ResumeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomePageComponent {

}

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TranslatePipe from '../../../pipes/translate.pipe';


@Component({
  selector: 'portfolio-about',
  standalone: true,
  imports: [
    CardModule,
    CommonModule,
    TranslatePipe
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export default class AboutComponent implements AfterViewInit {

  public age = signal(this.calculateAge(new Date('2000-03-13'), new Date()));
  public workExperience = signal(this.calculateAge(new Date('2021-12-20'), new Date()));

  private platformId = inject(PLATFORM_ID);

  constructor() {
    gsap.registerPlugin(ScrollTrigger);
  }

  public calculateAge(startDate: Date, endDate: Date): number {
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const startDay = startDate.getDate();

    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();
    const endDay = endDate.getDate();

    let age = endYear - startYear;

    if (endMonth < startMonth || (endMonth === startMonth && endDay < startDay)) {
      age--;
    }
    return age;
  }


  public ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollAnimation();
    }
  }

  public initScrollAnimation(): void{
    const svgText = document.getElementById('svgText');
    gsap.to(svgText, {
      scrollTrigger: {
        trigger: '.about-component',
        start: () => {
        const viewportHeight = window.innerHeight;
        return `${viewportHeight * 0.36}px ${viewportHeight * 0.36}px`;
      },
      end: () => {
        const viewportHeight = window.innerHeight;
        return `${viewportHeight * 0.80}px ${viewportHeight * 0.10}px`;
      },
        scrub: true,
        pin: true,
      },
      keyframes: [
        { opacity: 1, duration: 10 },
        { opacity: 0, duration: 10 }
      ],
    });
  }




}

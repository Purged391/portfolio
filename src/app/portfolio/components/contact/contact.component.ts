import { Component, ElementRef, ViewChild, inject, PLATFORM_ID, AfterViewInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'portfolio-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export default class ContactComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef;
  private platformId = inject(PLATFORM_ID);
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private animationId!: number;

  public ngAfterViewInit() {
    if (this.platformId === 'browser') {
      this.createScene();
      window.addEventListener('resize', this.onWindowResize.bind(this), false);
    }
  }

  public ngOnDestroy() {
    if (this.platformId === 'browser') {
      window.removeEventListener('resize', this.onWindowResize.bind(this), false);
      cancelAnimationFrame(this.animationId);
    }
  }

  private createScene() {
    const canvas = this.canvasRef.nativeElement;
    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    const circleGeometry = new THREE.CircleGeometry(0.5, 64);
    const material = new THREE.MeshBasicMaterial({ color: 0x888888 });

    for (let i = 0; i < 10000; i++) {
      const circle = new THREE.Mesh(circleGeometry, material);
      circle.position.set(
        THREE.MathUtils.randFloatSpread(2000), // x
        THREE.MathUtils.randFloatSpread(2000), // y
        THREE.MathUtils.randFloatSpread(2000)  // z
      );
      this.scene.add(circle);
    }

    const animate = () => {
      this.animationId = requestAnimationFrame(animate);
      this.renderer.render(this.scene, this.camera);
    };

    animate();
  }

  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

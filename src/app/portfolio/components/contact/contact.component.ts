import { Component, ElementRef, ViewChild, inject, PLATFORM_ID, AfterViewInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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
  private controls!: OrbitControls;
  private animationId!: number;

  public ngAfterViewInit() {
    if (this.platformId === 'browser') {
      this.createScene();
      window.addEventListener('resize', this.onWindowResize.bind(this), false);
    }
  }

  public ngOnDestroy() {
    if (this.platformId === 'browser') {
      cancelAnimationFrame(this.animationId);
      window.removeEventListener('resize', this.onWindowResize.bind(this), false);
    }
  }

  private createScene() {
    const canvas = this.canvasRef.nativeElement;
    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 500;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
    this.controls.enableZoom = false;

    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32); // Cambia a geometría de esfera
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (let i = 0; i < 10000; i++) {
      const sphere = new THREE.Mesh(sphereGeometry, material);
      sphere.position.set(
        THREE.MathUtils.randFloatSpread(2000), // x
        THREE.MathUtils.randFloatSpread(2000), // y
        THREE.MathUtils.randFloatSpread(2000)  // z
      );
      this.scene.add(sphere);
    }

    const animate = () => {
      this.animationId = requestAnimationFrame(animate);
      this.controls.update();
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

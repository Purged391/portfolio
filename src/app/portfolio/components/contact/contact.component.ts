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
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 4;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
    this.controls.enableZoom = false;

    const sunLight = new THREE.DirectionalLight(0xffffff);
    sunLight.position.set(-2, 0.5, 1);
    this.scene.add(sunLight);

    const loader = new THREE.TextureLoader();

    const earthGroup = new THREE.Group();

    const geometry = new THREE.IcosahedronGeometry(1, 12);
    const material = new THREE.MeshStandardMaterial({
      map: loader.load('assets/images/earth/earth_color_10K.png'),
    });
    const earthMesh = new THREE.Mesh(geometry, material);
    earthGroup.add(earthMesh);
    earthGroup.rotation.z = -23.4 * Math.PI / 180;

    const lightsMat = new THREE.MeshBasicMaterial({
      map: loader.load('assets/images/earth/earthlights1k.jpg'),
      blending: THREE.AdditiveBlending,
     });
    const lightsMesh = new THREE.Mesh(geometry, lightsMat);
    earthGroup.add(lightsMesh);

    const cloudsMat = new THREE.MeshStandardMaterial({
      map: loader.load('assets/images/earth/earth_clouds_8K.png'),
      blending: THREE.AdditiveBlending,
    });
    const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
    cloudsMesh.scale.setScalar(1.02);
    earthGroup.add(cloudsMesh);

    this.scene.add(earthGroup);


    const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
    sunMesh.position.set(-100, 30, 50);
    this.scene.add(sunMesh);


    const animate = () => {
      this.animationId = requestAnimationFrame(animate);
      earthMesh.rotation.y += 0.0008;
      lightsMesh.rotation.y += 0.0008;
      cloudsMesh.rotation.y += 0.00099;
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

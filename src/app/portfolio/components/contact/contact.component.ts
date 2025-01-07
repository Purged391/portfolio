import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, inject, PLATFORM_ID, AfterViewInit, OnDestroy, signal, AfterViewChecked } from '@angular/core';
import TranslatePipe from 'src/app/pipes/translate.pipe';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as TWEEN from '@tweenjs/tween.js';

interface EarthObjectGroup {
  earthGroup: THREE.Group,
  earthMesh: THREE.Mesh,
  lightsMesh: THREE.Mesh,
  cloudsMesh: THREE.Mesh
}

@Component({
  selector: 'portfolio-contact',
  templateUrl: './contact.component.html',
  imports: [
    CommonModule,
    TranslatePipe
  ],
  styleUrls: ['./contact.component.scss']
})

export default class ContactComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private platformId = inject(PLATFORM_ID);
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;
  private animationId!: number;
  private tweenGroup = new TWEEN.Group();
  public isModelLoaded = signal<boolean>(false);


  public async ngAfterViewInit() {
    if (this.platformId === 'browser') {
      await this.createScene();
      window.addEventListener('resize', this.onWindowResize.bind(this), false);
    }
  }

  public ngOnDestroy() {
    if (this.platformId === 'browser') {
      cancelAnimationFrame(this.animationId);
      window.removeEventListener('resize', this.onWindowResize.bind(this), false);
    }
  }

  private async createScene() {
    const canvas = this.canvasRef.nativeElement;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.scene = new THREE.Scene();

    this.camera = this.createCamera();

    this.controls = this.createOrbitControls();

    const loader = new THREE.TextureLoader();
    const earthGroupObject: EarthObjectGroup = this.createEarth(loader);
    this.scene.add(earthGroupObject.earthGroup);
    this.scene.add(this.createSunLight());
    this.scene.add(this.createSunMesh());
    this.scene.add(this.createMoon(loader, earthGroupObject));

    const animate = ((time: number | undefined) => {
      this.animationId = requestAnimationFrame(animate);
      earthGroupObject.earthGroup.getObjectById(earthGroupObject.earthMesh.id)!.rotation.y += 0.0008;
      earthGroupObject.earthGroup.getObjectById(earthGroupObject.lightsMesh.id)!.rotation.y += 0.0008;
      earthGroupObject.earthGroup.getObjectById(earthGroupObject.cloudsMesh.id)!.rotation.y += 0.00099;
      this.controls.update();
      this.tweenGroup.update(time);
      this.renderer.render(this.scene, this.camera);
    });
    animate(0);
  }

  private createCamera(): THREE.PerspectiveCamera {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;
    return camera;
  }

  private createOrbitControls(): OrbitControls {
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;
    return controls;
  }

  private createSunLight(): THREE.DirectionalLight {
    const sunLight = new THREE.DirectionalLight(0xffffff);
    sunLight.position.set(-2, 0.5, 1);
    return sunLight;
  }

  private createSunMesh(): THREE.Mesh {
    const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
    sunMesh.position.set(-100, 30, 50);
    return sunMesh;
  }

  private createEarth(loader: THREE.TextureLoader): EarthObjectGroup {
    const earthGroup = new THREE.Group();
    const geometry = new THREE.IcosahedronGeometry(2, 12);
    const material = new THREE.MeshStandardMaterial({
      map: loader.load('assets/images/earth/earth_color_10K.png'),
    });
    const earthMesh = new THREE.Mesh(geometry, material);
    earthGroup.add(earthMesh);
    earthGroup.rotation.z = -23.4 * Math.PI / 180;

    const lightsMat = new THREE.MeshBasicMaterial({
      map: loader.load('assets/images/earth/earth_nightlights_10K.png'),
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
    return {earthGroup, earthMesh, lightsMesh, cloudsMesh};
  }

  private createMoon(loader: THREE.TextureLoader, earthGroupObject: EarthObjectGroup): THREE.Group {
    const moonMat = new THREE.MeshStandardMaterial({
      map: loader.load('assets/images/moon/moonmap4k.jpg'),
      displacementMap: loader.load('assets/images/moon/moonbump4k.jpg'),
      displacementScale: 0.005,
      bumpMap: loader.load('assets/images/moon/moonbump4k.jpg'),
      bumpScale: 0.04,
    });
    const moon = new THREE.SphereGeometry(1, 64, 64);
    const moonMesh = new THREE.Mesh(moon, moonMat);
    moonMesh.position.set(-4, 2, -5);
    const moonOrbitGroup = new THREE.Group();

    moonOrbitGroup.add(moonMesh);
    moonOrbitGroup.position.copy(earthGroupObject.earthGroup.position);
    return moonOrbitGroup;
  }

  private transitionCamera(targetPosition: { x: number, y: number, z: number }) {
    const currentCameraPosition = {
      x: this.camera.position.x,
      y: this.camera.position.y,
      z: this.camera.position.z
    };

    new TWEEN.Tween(currentCameraPosition, this.tweenGroup)
      .to(targetPosition, 2000) // 2000ms for the transition
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(() => {
        this.camera.position.set(currentCameraPosition.x, currentCameraPosition.y, currentCameraPosition.z);
      })
      .start();
  }

  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  public display = signal<string>('earth');

  public goToMoon(){
    this.controls.target.set(0, 0, 0);
    this.transitionCamera({ x: -7, y: 2.5, z: -7 });
    this.display.set('moon');
  }

  public goToEarth(){
    this.controls.target.set(0, 0, 0);
    this.transitionCamera({ x: 0, y: 0, z: 5 });
    this.display.set('earth');
  }
}

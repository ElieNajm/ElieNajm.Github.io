
class UIManager {
  constructor() {
    this.initScrollToTop();
  }

  // Example shared feature: scroll to top button
  initScrollToTop() {
    const btn = document.createElement('button');
    btn.innerText = '↑ Top';
    btn.id = 'scrollToTopBtn';
    btn.style.position = 'fixed';
    btn.style.bottom = '30px';
    btn.style.right = '20px';
    btn.style.display = 'none';
    btn.classList.add('btn', 'btn-secondary');

    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
      btn.style.display = window.scrollY > 200 ? 'block' : 'none';
    });

    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
}

document.addEventListener('DOMContentLoaded', () => new UIManager());

window.addEventListener('DOMContentLoaded', () => {
  const globeContainer = document.getElementById('globe-container');
  if (!globeContainer) {
    console.error('globe-container not found');
    return;
  }

  const myGlobe = Globe()
  (document.getElementById('globe-container'))
  .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
  .backgroundColor('rgb(2, 2, 68)')
  .atmosphereColor('skyblue')
  .atmosphereAltitude(0.25);

myGlobe.controls().autoRotate = true;
myGlobe.controls().autoRotateSpeed = 0.5;
globe.object3D.scale.set(2, 2, 2);
});
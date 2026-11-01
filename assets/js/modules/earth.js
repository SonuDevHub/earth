/**
 * EARTHDAY.ORG Interactive 3D Earth Globe
 * Powered by Three.js with NASA Blue Marble textures
 *
 * CRITICAL PERFORMANCE & SCROLL RULES:
 * - touch-action: pan-y (never block vertical mobile swipe)
 * - Zero wheel-event hijacking (wheel passes through naturally to native page scroll)
 * - IntersectionObserver pauses render loop when off-screen
 * - Smooth inertia drag & click-to-focus on global markers
 */

export class EarthGlobe {
  constructor(options = {}) {
    this.containerId = options.containerId || 'earth-canvas-container';
    this.container = document.getElementById(this.containerId);
    if (!this.container) return;

    this.isMini = options.isMini || false;
    this.markersUrl = options.markersUrl || 'assets/earth/markers.json';
    this.textureUrl = options.textureUrl || 'assets/earth/earth-day.jpg';
    this.cloudsUrl = options.cloudsUrl || 'assets/earth/earth-clouds.png';

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.globeGroup = null;
    this.earthMesh = null;
    this.cloudsMesh = null;
    this.atmosphereMesh = null;
    this.markersGroup = null;
    this.raycaster = null;
    this.mouse = null;
    this.markersData = [];
    this.markerObjects = [];

    // Interaction state
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.rotationVelocity = { x: 0, y: 0.0015 };
    this.targetRotation = { x: 0.2, y: 0 };
    this.currentRotation = { x: 0.2, y: 0 };
    this.autoRotateSpeed = 0.0012;
    this.damping = 0.95;
    this.hoveredMarker = null;
    this.activeMarker = null;
    this.isVisible = false;
    this.animId = null;

    this.init();
  }

  async init() {
    // Check WebGL support
    if (!this.hasWebGL()) {
      this.showFallback();
      return;
    }

    // Ensure THREE is loaded
    if (typeof THREE === 'undefined') {
      try {
        await this.loadThreeScript();
      } catch (err) {
        console.warn('Three.js failed to load, falling back to static visual.', err);
        this.showFallback();
        return;
      }
    }

    this.setupScene();
    this.setupLights();
    this.setupEarth();
    this.setupAtmosphere();
    if (!this.isMini) {
      await this.loadMarkers();
      this.setupRaycaster();
      this.setupControls();
    }
    this.setupVisibilityObserver();
    this.setupResize();
    this.startLoop();
  }

  hasWebGL() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  loadThreeScript() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'assets/js/three.min.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load three.min.js'));
      document.head.appendChild(script);
    });
  }

  setupScene() {
    const width = this.container.clientWidth || 600;
    const height = this.container.clientHeight || 500;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.z = this.isMini ? 2.8 : 3.2;

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const canvas = this.renderer.domElement;
    canvas.className = 'earth-canvas';
    // CRITICAL: Ensure touch scrolling is never trapped!
    canvas.style.touchAction = 'pan-y';
    canvas.style.pointerEvents = this.isMini ? 'none' : 'auto';
    canvas.style.cursor = 'grab';

    this.container.innerHTML = '';
    this.container.appendChild(canvas);

    this.globeGroup = new THREE.Group();
    this.scene.add(this.globeGroup);
  }

  setupLights() {
    const ambientLight = new THREE.AmbientLight(0xdde8f5, 0.7);
    this.scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(5, 3, 5);
    this.scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x2f83a6, 0.5);
    dirLight2.position.set(-5, -2, -3);
    this.scene.add(dirLight2);
  }

  setupEarth() {
    const radius = 1.0;
    const segments = 64;

    // Earth Sphere Geometry
    const earthGeo = new THREE.SphereGeometry(radius, segments, segments);

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();

    // Day texture
    const earthTexture = textureLoader.load(this.textureUrl);
    earthTexture.anisotropy = 4;

    const earthMat = new THREE.MeshPhongMaterial({
      map: earthTexture,
      shininess: 12,
      specular: new THREE.Color(0x223344)
    });

    this.earthMesh = new THREE.Mesh(earthGeo, earthMat);
    this.globeGroup.add(this.earthMesh);

    // Cloud Layer
    const cloudsGeo = new THREE.SphereGeometry(radius * 1.012, segments, segments);
    const cloudsTexture = textureLoader.load(this.cloudsUrl);
    const cloudsMat = new THREE.MeshLambertMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending
    });

    this.cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
    this.globeGroup.add(this.cloudsMesh);
  }

  setupAtmosphere() {
    // Atmosphere glow outer rim
    const radius = 1.0;
    const atmosGeo = new THREE.SphereGeometry(radius * 1.12, 48, 48);

    // Custom atmospheric shader
    const vertexShader = `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
        gl_FragColor = vec4(0.447, 0.71, 0.725, 1.0) * intensity * 0.75;
      }
    `;

    const atmosMat = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    });

    this.atmosphereMesh = new THREE.Mesh(atmosGeo, atmosMat);
    this.scene.add(this.atmosphereMesh);
  }

  async loadMarkers() {
    try {
      const res = await fetch(this.markersUrl);
      if (!res.ok) throw new Error('Markers response not ok');
      this.markersData = await res.json();
    } catch (e) {
      console.warn('Could not fetch markers.json, using default markers.', e);
      this.markersData = [
        { id: 'hq', name: 'Washington, D.C. Headquarters', lat: 38.9072, lng: -77.0369, type: 'Headquarters', description: 'Global headquarters of EARTHDAY.ORG.', stats: 'Founded April 22, 1970' },
        { id: 'india', name: 'EARTHDAY.ORG India', lat: 22.5726, lng: 88.3639, type: 'Regional Hub', description: 'Climate education in thousands of schools.', stats: '100M+ citizens reached' },
        { id: 'africa', name: 'EARTHDAY.ORG Africa', lat: -1.2921, lng: 36.8219, type: 'Regional Hub', description: 'Sub-Saharan agroforestry and plastic bans.', stats: 'Active across 28 nations' },
        { id: 'canopy-madagascar', name: 'Madagascar Canopy Tree Corridor', lat: -18.7669, lng: 46.8691, type: 'Canopy Tree Project', description: 'Reforesting bio-corridors to protect endangered lemurs.', stats: '12M native trees' },
        { id: 'cleanup-indonesia', name: 'Bali Coastal Cleanup', lat: -8.4095, lng: 115.1889, type: 'Great Global Cleanup', description: 'Mobilizing community cleanup volunteers.', stats: '850K lbs intercepted' }
      ];
    }

    this.markersGroup = new THREE.Group();
    const radius = 1.0;

    this.markersData.forEach((item, idx) => {
      // Calculate 3D sphere coordinate
      const phi = (90 - item.lat) * (Math.PI / 180);
      const theta = (item.lng + 180) * (Math.PI / 180);

      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = (radius * Math.sin(phi) * Math.sin(theta));
      const y = (radius * Math.cos(phi));

      // Color coding by type
      let markerColor = 0xF37321; // Brand Safety Orange
      if (item.type.includes('Canopy')) markerColor = 0x72B5B9; // Sea Green
      else if (item.type.includes('Cleanup')) markerColor = 0x2F83A6; // Steel Blue
      else if (item.type.includes('Education')) markerColor = 0xFDB714; // Chrome Yellow

      // Outer halo ring
      const ringGeo = new THREE.RingGeometry(0.022, 0.038, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: markerColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.set(x * 1.008, y * 1.008, z * 1.008);
      ringMesh.lookAt(x * 2, y * 2, z * 2);

      // Inner pin core
      const coreGeo = new THREE.SphereGeometry(0.016, 16, 16);
      const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      coreMesh.position.set(x * 1.012, y * 1.012, z * 1.012);

      // Group together
      const pin = new THREE.Group();
      pin.add(ringMesh);
      pin.add(coreMesh);
      pin.userData = { markerData: item, index: idx, baseScale: 1.0 };

      this.markersGroup.add(pin);
      this.markerObjects.push(pin);
    });

    this.globeGroup.add(this.markersGroup);
    this.createUIElements();
  }

  createUIElements() {
    // Tooltip
    let tooltip = document.getElementById('earth-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.id = 'earth-tooltip';
      tooltip.className = 'earth-tooltip';
      tooltip.innerHTML = `
        <div class="tooltip-type"></div>
        <div class="tooltip-name"></div>
      `;
      this.container.appendChild(tooltip);
    }
    this.tooltip = tooltip;

    // Info card modal/drawer
    let infoCard = document.getElementById('earth-info-card');
    if (!infoCard) {
      infoCard = document.createElement('div');
      infoCard.id = 'earth-info-card';
      infoCard.className = 'earth-info-card';
      infoCard.innerHTML = `
        <button class="info-card-close" aria-label="Close">&times;</button>
        <span class="info-card-badge"></span>
        <h4 class="info-card-title"></h4>
        <p class="info-card-desc"></p>
        <div class="info-card-stat">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 2L12.5 7.5L18.5 8.25L14 12.5L15.2 18.5L10 15.5L4.8 18.5L6 12.5L1.5 8.25L7.5 7.5L10 2Z" fill="#FDB714"/></svg>
          <span class="info-card-stat-text"></span>
        </div>
        <div class="info-card-actions">
          <a href="campaign-canopy-tree-project.html" class="green-button info-card-cta-btn">
            <span class="text"><span class="p1-left semibold-white info-card-cta-text">VIEW CAMPAIGN</span></span>
            <span class="button-arrow white">
              <svg viewBox="0 0 20 20" fill="none" width="16" height="16"><path d="M5 15L15 5M6.875 5H15V13.125" stroke="#F37321" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
          </a>
        </div>
      `;
      this.container.appendChild(infoCard);

      const closeBtn = infoCard.querySelector('.info-card-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          this.activeMarker = null;
          infoCard.classList.remove('active');
        });
      }
    }
    this.infoCard = infoCard;

    // Setup filter button triggers
    document.querySelectorAll('.globe-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.globe-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter') || 'all';
        this.filterMarkers(filter);
      });
    });
  }

  filterMarkers(category) {
    this.activeCategory = category;
    this.markerObjects.forEach(pin => {
      const data = pin.userData.markerData;
      if (!data) return;
      let visible = true;
      if (category && category !== 'all') {
        const cat = category.toLowerCase();
        const type = (data.type || '').toLowerCase();
        const name = (data.name || '').toLowerCase();
        if (cat === 'forests') {
          visible = type.includes('canopy') || name.includes('canopy') || name.includes('forest') || name.includes('rainforest');
        } else if (cat === 'cleanups') {
          visible = type.includes('cleanup') || name.includes('cleanup');
        } else if (cat === 'education') {
          visible = type.includes('education') || name.includes('education') || name.includes('literacy') || name.includes('schools');
        } else if (cat === 'plastics') {
          visible = type.includes('plastic') || name.includes('plastic');
        } else if (cat === 'food') {
          visible = type.includes('food') || name.includes('food') || name.includes('agriculture') || name.includes('soil');
        }
      }
      pin.visible = visible;
    });
  }

  setupRaycaster() {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    const canvas = this.renderer.domElement;

    // Hover detection
    canvas.addEventListener('pointermove', (e) => {
      if (this.isDragging) return;

      const rect = canvas.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.checkIntersection(e.clientX - rect.left, e.clientY - rect.top);
    });

    // Click on marker with drag threshold check
    canvas.addEventListener('click', (e) => {
      if (this.dragDistance && this.dragDistance > 6) return;
      if (this.hoveredMarker) {
        this.selectMarker(this.hoveredMarker);
      }
    });
  }

  checkIntersection(screenX, screenY) {
    if (!this.markersGroup || !this.raycaster) return;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.markersGroup.children, true);

    if (intersects.length > 0) {
      // Find parent pin group
      let obj = intersects[0].object;
      while (obj && !obj.userData.markerData && obj.parent) {
        obj = obj.parent;
      }

      if (obj && obj.userData.markerData) {
        this.hoveredMarker = obj.userData.markerData;
        this.renderer.domElement.style.cursor = 'pointer';

        if (this.tooltip) {
          this.tooltip.querySelector('.tooltip-type').textContent = this.hoveredMarker.type.toUpperCase();
          this.tooltip.querySelector('.tooltip-name').textContent = this.hoveredMarker.name;
          this.tooltip.style.left = `${screenX + 16}px`;
          this.tooltip.style.top = `${screenY - 32}px`;
          this.tooltip.classList.add('visible');
        }
        return;
      }
    }

    this.hoveredMarker = null;
    this.renderer.domElement.style.cursor = this.isDragging ? 'grabbing' : 'grab';
    if (this.tooltip) this.tooltip.classList.remove('visible');
  }

  selectMarker(markerData) {
    this.activeMarker = markerData;

    // Rotate globe to face this marker
    const phi = (90 - markerData.lat) * (Math.PI / 180);
    const theta = (markerData.lng + 180) * (Math.PI / 180);

    this.targetRotation.x = (phi - Math.PI / 2);
    this.targetRotation.y = -(theta - Math.PI / 2);

    // Show info card with relevant campaign link
    if (this.infoCard) {
      this.infoCard.querySelector('.info-card-badge').textContent = markerData.type;
      this.infoCard.querySelector('.info-card-title').textContent = markerData.name;
      this.infoCard.querySelector('.info-card-desc').textContent = markerData.description;
      this.infoCard.querySelector('.info-card-stat-text').innerHTML = markerData.stats;

      const ctaBtn = this.infoCard.querySelector('.info-card-cta-btn');
      const ctaText = this.infoCard.querySelector('.info-card-cta-text');
      if (ctaBtn && ctaText) {
        let targetHref = 'international-network.html';
        let label = 'EXPLORE NETWORK';
        const type = (markerData.type || '').toLowerCase();
        const id = (markerData.id || '').toLowerCase();

        if (type.includes('canopy') || id.includes('canopy')) {
          targetHref = 'campaign-canopy-tree-project.html';
          label = 'CANOPY PROJECT';
        } else if (type.includes('cleanup') || id.includes('cleanup')) {
          targetHref = 'campaign-great-global-cleanup.html';
          label = 'GLOBAL CLEANUP';
        } else if (type.includes('education') || id.includes('climate-ed')) {
          targetHref = 'campaign-climate-education.html';
          label = 'CLIMATE EDUCATION';
        } else if (type.includes('food') || id.includes('food')) {
          targetHref = 'campaign-food-for-our-planet.html';
          label = 'FOOD FOR OUR PLANET';
        } else if (type.includes('plastic') || id.includes('plastic')) {
          targetHref = 'campaign-end-plastics.html';
          label = 'END PLASTICS';
        } else if (id === 'india') {
          targetHref = 'region-india.html';
          label = 'INDIA INITIATIVES';
        } else if (id === 'africa') {
          targetHref = 'region-africa.html';
          label = 'AFRICA INITIATIVES';
        } else if (id === 'south-america') {
          targetHref = 'region-south-america.html';
          label = 'SOUTH AMERICA';
        } else if (id === 'mexico') {
          targetHref = 'region-mexico.html';
          label = 'MEXICO REGION';
        }

        ctaBtn.setAttribute('href', targetHref);
        ctaText.textContent = label;
      }

      this.infoCard.classList.add('active');
    }
  }

  setupControls() {
    const canvas = this.renderer.domElement;
    this.dragDistance = 0;

    const onPointerDown = (e) => {
      this.isDragging = true;
      this.dragDistance = 0;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
      canvas.style.cursor = 'grabbing';
      if (this.tooltip) this.tooltip.classList.remove('visible');
    };

    const onPointerMove = (e) => {
      if (!this.isDragging) return;

      const deltaX = e.clientX - this.previousMousePosition.x;
      const deltaY = e.clientY - this.previousMousePosition.y;
      this.dragDistance += Math.abs(deltaX) + Math.abs(deltaY);

      this.rotationVelocity.y = deltaX * 0.005;
      this.rotationVelocity.x = deltaY * 0.005;

      this.targetRotation.y += this.rotationVelocity.y;
      this.targetRotation.x += this.rotationVelocity.x;

      // Clamp X rotation so it doesn't flip upside down
      this.targetRotation.x = Math.max(-Math.PI / 2.3, Math.min(Math.PI / 2.3, this.targetRotation.x));

      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      this.isDragging = false;
      canvas.style.cursor = 'grab';
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Note: NEVER add wheel event listener with preventDefault! Native scroll is 100% preserved.
  }

  setupVisibilityObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.isVisible = entry.isIntersecting;
        if (this.isVisible && !this.animId) {
          this.startLoop();
        }
      });
    }, { threshold: 0.05 });

    observer.observe(this.container);
  }

  setupResize() {
    window.addEventListener('resize', () => {
      if (!this.container || !this.renderer || !this.camera) return;
      const width = this.container.clientWidth;
      const height = this.container.clientHeight;
      if (width === 0 || height === 0) return;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    });
  }

  startLoop() {
    const animate = () => {
      if (!this.isVisible) {
        this.animId = null;
        return;
      }

      this.animId = requestAnimationFrame(animate);

      // Auto rotation when idle
      if (!this.isDragging && !this.activeMarker) {
        this.targetRotation.y += this.autoRotateSpeed;
      }

      // Smooth damping interpolation
      this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.08;
      this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.08;

      if (this.globeGroup) {
        this.globeGroup.rotation.x = this.currentRotation.x;
        this.globeGroup.rotation.y = this.currentRotation.y;
      }

      // Rotate clouds slightly faster
      if (this.cloudsMesh) {
        this.cloudsMesh.rotation.y += 0.0003;
      }

      // Pulse marker rings
      if (this.markerObjects && this.markerObjects.length > 0) {
        const time = Date.now() * 0.003;
        const scale = 1.0 + Math.sin(time) * 0.18;
        this.markerObjects.forEach(pin => {
          const ring = pin.children[0];
          if (ring) ring.scale.set(scale, scale, 1);
        });
      }

      this.renderer.render(this.scene, this.camera);
    };

    if (!this.animId) {
      this.animId = requestAnimationFrame(animate);
    }
  }

  showFallback() {
    this.container.innerHTML = `
      <div class="earth-fallback">
        <img src="assets/img/earth-from-space.jpg" alt="Planet Earth from Space" class="earth-fallback-img" />
        <div class="earth-fallback-overlay">
          <h4>EARTHDAY.ORG Global Initiatives</h4>
          <p>Explore 15+ frontline conservation sites, canopy tree projects, and climate policy centers worldwide.</p>
          <a href="campaigns.html" class="green-button">
            <span class="text"><span class="p1-left semibold-white">EXPLORE INITIATIVES</span></span>
            <span class="button-arrow white">
              <svg viewBox="0 0 20 20" fill="none" width="16" height="16"><path d="M5 15L15 5M6.875 5H15V13.125" stroke="#F37321" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
          </a>
        </div>
      </div>
    `;
  }
}


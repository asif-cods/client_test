// three-scene.js

// -----------------------------------------------------------------------------
// Scene 1: Hero Network Diagram (Neural Map)
// -----------------------------------------------------------------------------
function initHeroScene() {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 30;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Particles (Nodes)
    const geometry = new THREE.BufferGeometry();
    const count = 150;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 60; // Spread
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        color: 0x00f3ff,
        size: 0.4,
        transparent: true,
        opacity: 0.8
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Lines connecting nearby nodes
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x00f3ff,
        transparent: true,
        opacity: 0.15
    });

    // We will update lines in animation loop
    const linesGeometry = new THREE.BufferGeometry();
    const lines = new THREE.LineSegments(linesGeometry, lineMaterial);
    scene.add(lines);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    // Animation Loop
    const animate = () => {
        requestAnimationFrame(animate);

        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;

        particles.rotation.y += 0.002;
        particles.rotation.x += 0.001;

        lines.rotation.y += 0.002;
        lines.rotation.x += 0.001;

        // Dynamic Lines
        // This is computationally expensive, so we keep particle count low (150)
        let linePositions = [];
        const particlePositions = particles.geometry.attributes.position.array;

        // Simple distance check
        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const x1 = particlePositions[i * 3];
                const y1 = particlePositions[i * 3 + 1];
                const z1 = particlePositions[i * 3 + 2];

                const x2 = particlePositions[j * 3];
                const y2 = particlePositions[j * 3 + 1];
                const z2 = particlePositions[j * 3 + 2];

                const dist = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2);

                if (dist < 12) {
                    linePositions.push(x1, y1, z1);
                    linePositions.push(x2, y2, z2);
                }
            }
        }

        lines.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

        renderer.render(scene, camera);
    };

    animate();

    // Resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}


// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initHeroScene();
    initExpertsScene();
});


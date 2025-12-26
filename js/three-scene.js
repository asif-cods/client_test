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

// -----------------------------------------------------------------------------
// Scene 2: Live Threat Map
// -----------------------------------------------------------------------------
function initThreatMap() {
    const container = document.getElementById('map-container');
    if (!container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.03);

    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 1, 1000);
    camera.position.set(0, 15, 50); // Lower camera for horizon view
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Grid (World Plane)
    const gridHelper = new THREE.GridHelper(200, 50, 0x333333, 0x111111);
    scene.add(gridHelper);

    // Attacks (Arcs)
    // We visually simulate standard attack arcs
    const group = new THREE.Group();
    scene.add(group);

    function createAttack() {
        // Random start and end points on the grid
        const startX = (Math.random() - 0.5) * 80;
        const startZ = (Math.random() - 0.5) * 80;
        const endX = (Math.random() - 0.5) * 80;
        const endZ = (Math.random() - 0.5) * 80;

        const height = Math.random() * 15 + 5;

        // Quadratic Bezier Curve
        const curve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(startX, 0, startZ),
            new THREE.Vector3((startX + endX) / 2, height, (startZ + endZ) / 2),
            new THREE.Vector3(endX, 0, endZ)
        );

        const points = curve.getPoints(20);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        // Mostly red attacks to match reference image
        const material = new THREE.LineBasicMaterial({
            color: Math.random() > 0.3 ? 0xff003c : 0x00ff41,
            transparent: true,
            opacity: 0.8
        });

        const curveObject = new THREE.Line(geometry, material);
        group.add(curveObject);

        // Remove after animation
        setTimeout(() => {
            group.remove(curveObject);
            geometry.dispose();
            material.dispose();
        }, 1000 + Math.random() * 1000);
    }

    // Add attacks periodically
    setInterval(createAttack, 200);

    // Animation Loop
    const animate = () => {
        requestAnimationFrame(animate);

        // Slowly rotate camera or group
        group.rotation.y += 0.002;

        renderer.render(scene, camera);
    };

    animate();

    // Resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // Update Stats
    const statsDiv = document.getElementById('threat-stats');
    if (statsDiv) {
        setInterval(() => {
            const types = ['DDOS', 'SQL Injection', 'Malware', 'Phishing', 'Brute Force'];
            const type = types[Math.floor(Math.random() * types.length)];
            const ips = Math.floor(Math.random() * 255) + '.' + Math.floor(Math.random() * 255);
            statsDiv.innerHTML = `
                <div class="small text-danger">> ALERT: ${type} DETECTED</div>
                <div class="small text-success">> SRC: 192.168.${ips}</div>
                <div class="small text-info">> TARGET: REGION-${Math.floor(Math.random() * 10)}</div>
            `;
        }, 800);
    }
}

// -----------------------------------------------------------------------------
// Scene 3: Elite Security Experts (Neural Network)
// -----------------------------------------------------------------------------
function initExpertsScene() {
    const container = document.getElementById('expert-canvas-container');
    const canvas = document.getElementById('expert-canvas');
    const overlayContainer = document.getElementById('expert-overlays');

    if (!container || !canvas || !overlayContainer) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.04);

    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Optimization

    // 2. Data Group
    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    // Add Earth/Globe Wireframe Core
    const earthGeo = new THREE.SphereGeometry(7.8, 32, 32);
    const earthMat = new THREE.MeshBasicMaterial({
        color: 0x00f3ff,
        wireframe: true,
        transparent: true,
        opacity: 0.1
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    networkGroup.add(earthMesh);

    // Speakers Data
    const speakers = [
        { name: "Dr. Rakshit Tandon", role: "Cyber Security Evangelist", img: "assets/images/founder.png" },
        { name: "Sarah Net", role: "Chief Technology Officer", img: "assets/images/cofounder.png" },
        { name: "Alex Cyber", role: "Red Team Lead", img: "https://images.unsplash.com/photo-1480429370139-e0132c086e2a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFufGVufDB8fDB8fHww" },
        { name: "Priya Singh", role: "Cloud Security Architect", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHdvbWFufGVufDB8fDB8fHww" },
        { name: "David Chen", role: "Malware Analyst", img: "https://images.unsplash.com/photo-1615109398623-88346a601842?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww" },
        { name: "Emily White", role: "SOC Manager", img: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d29tYW58ZW58MHx8MHx8fDA%3D" },
        { name: "Michael Ro", role: "Ethical Hacker", img: "https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { name: "Lisa Wong", role: "Forensics Expert", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdvbWFufGVufDB8fDB8fHww" }
    ];

    const nodes = [];

    // Helper: Create HTML Overlay
    function createSpeakerOverlay(speaker, id) {
        const div = document.createElement('div');
        div.className = 'speaker-node';
        div.id = `node-${id}`;
        div.innerHTML = `
            <img src="${speaker.img}" alt="${speaker.name}">
            <div class="speaker-tooltip">
                <h5>${speaker.name}</h5>
                <p>${speaker.role}</p>
            </div>
        `;

        // Click Interaction
        div.addEventListener('click', () => {
            console.log("Speaker Clicked:", speaker);
        });

        overlayContainer.appendChild(div);
        return div;
    }

    // 3. Create Nodes (Spherical Distribution)
    const sphereRadius = 8;

    speakers.forEach((speaker, i) => {
        // Fibonacci Sphere Algorithm for even distribution
        const phi = Math.acos(-1 + (2 * i) / speakers.length);
        const theta = Math.sqrt(speakers.length * Math.PI) * phi;

        const x = sphereRadius * Math.cos(theta) * Math.sin(phi);
        const y = sphereRadius * Math.sin(theta) * Math.sin(phi);
        const z = sphereRadius * Math.cos(phi);

        // 3D Anchor (Invisible or Glow)
        const geometry = new THREE.SphereGeometry(0.1, 8, 8);
        const material = new THREE.MeshBasicMaterial({ color: 0x00f3ff });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        networkGroup.add(mesh); // Add to rotating group

        // HTML Element
        const element = createSpeakerOverlay(speaker, i);

        // Hover Flags
        const nodeObj = {
            mesh: mesh,
            element: element,
            position: new THREE.Vector3(x, y, z), // Local pos
            isHovered: false
        };

        element.addEventListener('mouseenter', () => { nodeObj.isHovered = true; });
        element.addEventListener('mouseleave', () => { nodeObj.isHovered = false; });

        nodes.push(nodeObj);
    });

    // 4. Create Connections (Neural Lines)
    // 4. Create Connections (Neural Lines)
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x00f3ff,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
    });

    const linePositions = [];
    nodes.forEach((node1, i) => {
        nodes.forEach((node2, j) => {
            if (i >= j) return;
            const dist = node1.position.distanceTo(node2.position);
            if (dist < 15) { // Increased from 9 to 15 to ensure connections
                linePositions.push(node1.position.x, node1.position.y, node1.position.z);
                linePositions.push(node2.position.x, node2.position.y, node2.position.z);
            }
        });
    });

    const lineGeometry = new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    networkGroup.add(lines);

    // 5. Quantum Data Streams (Particles)
    // 5. Quantum Data Streams (Particles)
    // Purple "Shield" Stars
    const streamGeo = new THREE.BufferGeometry();
    const streamCount = 400;
    const streamPos = new Float32Array(streamCount * 3);
    for (let i = 0; i < streamCount * 3; i++) {
        streamPos[i] = (Math.random() - 0.5) * 20;
    }
    streamGeo.setAttribute('position', new THREE.BufferAttribute(streamPos, 3));
    const streamMat = new THREE.PointsMaterial({
        size: 0.2, // Slightly larger
        color: 0xbc13fe, // Purple
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    const streams = new THREE.Points(streamGeo, streamMat);
    networkGroup.add(streams);

    // White "Star" Particles (Secondary)
    const whiteGeo = new THREE.BufferGeometry();
    const whiteCount = 200;
    const whitePos = new Float32Array(whiteCount * 3);
    for (let i = 0; i < whiteCount * 3; i++) whitePos[i] = (Math.random() - 0.5) * 25;
    whiteGeo.setAttribute('position', new THREE.BufferAttribute(whitePos, 3));
    const whiteMat = new THREE.PointsMaterial({
        size: 0.1,
        color: 0xffffff,
        transparent: true,
        opacity: 0.5
    });
    const whiteStars = new THREE.Points(whiteGeo, whiteMat);
    networkGroup.add(whiteStars);

    // 5. Animation Loop
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    const vector = new THREE.Vector3();
    const animate = () => {
        requestAnimationFrame(animate);

        // Auto-rotate if not dragging
        if (!isDragging) {
            networkGroup.rotation.y += 0.001;
        }

        // Visualize Data Streams (Pulse)
        const time = Date.now() * 0.001;
        streamMat.size = 0.15 + Math.sin(time * 2) * 0.05;

        // Position HTML Elements
        nodes.forEach(node => {
            // Get World Position (Relative to Camera)
            node.mesh.updateWorldMatrix(true, false);
            node.mesh.getWorldPosition(vector);

            // Calc Distance for Opacity/Scale BEFORE projection
            // Camera is at z=18. Center is at 0,0,0.
            // Nodes closer to 18 are front, nodes further (e.g. -z) are back.
            // But 'vector' is in World Space. Vector.z will vary as it rotates.
            // If vector.z > 0 it is closer to camera (front hemisphere roughly).

            const distZ = vector.z;
            const isFront = distZ > -2; // Slightly more than 0 to allow edge nodes

            // Standard projection to NDC
            vector.project(camera);

            const x = (vector.x * 0.5 + 0.5) * container.clientWidth;
            const y = (-(vector.y * 0.5) + 0.5) * container.clientHeight;

            // Depth visual cues
            // Map z range [-8, 8] roughly to scale/opacity
            const scale = Math.max(0.5, (distZ + 8) / 16); // 0.5 to 1.5 roughly
            const opacity = Math.max(0.2, Math.min(1, (distZ + 5) / 10));

            if (!isFront) {
                node.element.style.opacity = 0;
                node.element.style.pointerEvents = 'none';
            } else {
                node.element.style.opacity = opacity;
                node.element.style.pointerEvents = 'auto';

                // Override scale if hovered
                const finalScale = node.isHovered ? 2.0 : scale;
                const zIndex = node.isHovered ? 100 : 10;

                node.element.style.zIndex = zIndex;
                node.element.style.transform = `translate(-50%, -50%) scale(${finalScale})`;
                node.element.style.left = `${x}px`;
                node.element.style.top = `${y}px`;
            }
        });

        renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);
    // Initial call
    setTimeout(handleResize, 100);

    // 6. Interactive Navigation (Drag & Zoom)
    // Mouse Down
    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
        container.style.cursor = 'grabbing';
    });

    // Mouse Up
    document.addEventListener('mouseup', () => {
        isDragging = false;
        if (container) container.style.cursor = 'grab';
    });

    // Mouse Move (Rotate)
    container.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaMove = {
                x: e.clientX - previousMousePosition.x,
                y: e.clientY - previousMousePosition.y
            };

            networkGroup.rotation.y += deltaMove.x * 0.005;
            networkGroup.rotation.x += deltaMove.y * 0.005;

            previousMousePosition = { x: e.clientX, y: e.clientY };
        }
    });

    // Zoom (Wheel)
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        const zoomSpeed = 0.05;
        // Clamp Zoom
        const newZ = camera.position.z + e.deltaY * zoomSpeed * 0.1;
        if (newZ > 10 && newZ < 40) {
            camera.position.z = newZ;
        }
    }, { passive: false });

}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initHeroScene();
    initThreatMap();
    initExpertsScene();
});


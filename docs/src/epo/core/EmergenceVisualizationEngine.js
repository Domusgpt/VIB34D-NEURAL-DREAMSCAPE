/**
 * @file EmergenceVisualizationEngine.js
 * @description Handles the 15-level emergence hierarchy visualization
 * From quantum particles → universal consciousness
 */

export class EmergenceVisualizationEngine {
    constructor(canvas, systemController) {
        this.canvas = canvas;
        this.gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        // Create separate canvas for 2D overlay
        this.overlayCanvas = document.createElement('canvas');
        this.overlayCanvas.width = canvas.width;
        this.overlayCanvas.height = canvas.height;
        this.overlayCanvas.style.cssText = canvas.style.cssText;
        this.overlayCanvas.style.pointerEvents = 'none';
        this.overlayCanvas.style.zIndex = parseInt(canvas.style.zIndex || '1') + 1;
        
        this.ctx = this.overlayCanvas.getContext('2d');
        
        // Insert overlay after main canvas
        if (canvas.parentElement) {
            canvas.parentElement.insertBefore(this.overlayCanvas, canvas.nextSibling);
        }
        
        this.systemController = systemController;
        
        // WebGL program for advanced effects
        this.program = null;
        this.hypercubeProgram = null;
        
        // 16-Level Emergence hierarchy with visual codex integration
        this.emergenceLevels = [
            { id: 0, name: 'Quantum Fields', scale: 1e-18, color: [1.0, 1.0, 1.0], geometry: 'quantum-foam', shader: 'quantum' },
            { id: 1, name: 'Subatomic Particles', scale: 1e-15, color: [0.9, 0.9, 1.0], geometry: 'point-particles', shader: 'particle' },
            { id: 2, name: 'Atoms', scale: 1e-10, color: [0.8, 1.0, 0.8], geometry: 'electron-shells', shader: 'atomic' },
            { id: 3, name: 'Molecules', scale: 1e-9, color: [0.7, 0.9, 1.0], geometry: 'molecular-bonds', shader: 'molecular' },
            { id: 4, name: 'Macromolecules', scale: 1e-8, color: [1.0, 0.8, 0.9], geometry: 'protein-folds', shader: 'macromolecular' },
            { id: 5, name: 'Cells', scale: 1e-6, color: [0.9, 1.0, 0.7], geometry: 'cellular-membrane', shader: 'cellular' },
            { id: 6, name: 'Tissues', scale: 1e-4, color: [1.0, 0.9, 0.8], geometry: 'tissue-network', shader: 'tissue' },
            { id: 7, name: 'Organs', scale: 1e-2, color: [0.8, 0.8, 1.0], geometry: 'organ-structure', shader: 'organ' },
            { id: 8, name: 'Organisms', scale: 1, color: [1.0, 0.8, 0.8], geometry: 'body-system', shader: 'organism' },
            { id: 9, name: 'Communities', scale: 1e3, color: [0.9, 0.9, 0.9], geometry: 'social-network', shader: 'social' },
            { id: 10, name: 'Ecosystems', scale: 1e6, color: [0.7, 1.0, 0.7], geometry: 'ecosystem-web', shader: 'ecosystem' },
            { id: 11, name: 'Planets', scale: 1e7, color: [0.6, 0.8, 1.0], geometry: 'planetary-sphere', shader: 'planetary' },
            { id: 12, name: 'Solar Systems', scale: 1e13, color: [1.0, 1.0, 0.6], geometry: 'orbital-system', shader: 'solar' },
            { id: 13, name: 'Galaxies', scale: 1e21, color: [0.8, 0.6, 1.0], geometry: 'spiral-galaxy', shader: 'galactic' },
            { id: 14, name: 'Galaxy Clusters', scale: 1e24, color: [1.0, 0.7, 0.9], geometry: 'cluster-web', shader: 'cluster' },
            { id: 15, name: 'Universal Consciousness', scale: 1e26, color: [1.0, 1.0, 1.0], geometry: 'cosmic-neural-web', shader: 'consciousness' }
        ];
        
        // Visual Codex Integration Parameters
        this.hypercubeParams = {
            morphFactor: 0.5,
            dimension: 4.0,
            glitchIntensity: 0.0,
            rotationSpeed: 1.0,
            gridDensity: 8.0
        };
        
        // EPO force parameters
        this.epoForces = {
            integration: 0.5,
            dispersion: 0.5,
            information: 0.3,
            consciousness: 0.0
        };
        
        // Animation and interaction state
        this.time = 0;
        this.mousePosition = { x: 0.5, y: 0.5 };
        this.zoomFactor = 1.0;
        
        this.currentLevel = 0;
        this.targetLevel = 0;
        this.transitionProgress = 0;
        this.isTransitioning = false;
        
        // Particle systems for each level
        this.particleSystems = new Map();
        
        // Animation state
        this.animationId = null;
        this.lastTime = 0;
        
        console.log('🌌 Emergence Visualization Engine initialized');
    }
    
    /**
     * Initialize emergence visualization system
     */
    async initialize() {
        console.log('🚀 Initializing Emergence Visualization...');
        
        try {
            // Initialize WebGL
            this.initWebGL();
            
            // Initialize shaders from visual codex
            this.initShaders();
            
            // Initialize buffers
            this.initBuffers();
            
            // Setup interaction
            this.setupInteraction();
            
            // Initialize particle systems for each level
            this.initializeParticleSystems();
            
            // Setup canvas and context
            this.setupCanvas();
            
            // Start animation loop
            this.startAnimation();
            
            console.log('✅ Emergence Visualization ready with WebGL acceleration');
            
        } catch (error) {
            console.error('❌ Emergence Visualization initialization failed:', error);
            // Fallback to 2D canvas if WebGL fails
            console.log('⚠️ Falling back to 2D Canvas rendering');
            this.gl = null;
            throw error;
        }
    }
    
    initWebGL() {
        if (!this.gl) {
            console.warn('WebGL not supported, using 2D fallback');
            return;
        }
        
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
        
        console.log('🎮 WebGL context initialized');
    }
    
    initShaders() {
        if (!this.gl) return;
        
        // Hypercube lattice shader from visual codex
        const hypercubeVertexShader = `
            attribute vec2 a_position;
            void main() {
                gl_Position = vec4(a_position, 0.0, 1.0);
            }
        `;
        
        const hypercubeFragmentShader = `
            precision highp float;
            
            uniform vec2 u_resolution;
            uniform float u_time;
            uniform vec2 u_mouse;
            uniform float u_morphFactor;
            uniform float u_dimension;
            uniform float u_glitchIntensity;
            uniform float u_rotationSpeed;
            uniform float u_gridDensity;
            uniform float u_emergenceLevel;
            uniform float u_zoomFactor;
            uniform vec3 u_levelColor;
            
            // EPO parameters
            uniform float u_epoIntegration;
            uniform float u_epoDispersion;
            uniform float u_informationDensity;
            uniform float u_consciousness;
            
            ${this.getHypercubeShaderFunctions()}
            ${this.getEmergenceShaderFunctions()}
            
            void main() {
                vec2 uv = gl_FragCoord.xy / u_resolution.xy;
                vec3 color = vec3(0.0);
                
                // Apply emergence-specific visualization
                color = generateEmergenceVisualization(uv);
                
                // Add hypercube lattice overlay
                float lattice = hypercubeLattice(uv);
                color += lattice * u_levelColor * 0.3;
                
                // Add consciousness field
                if (u_consciousness > 0.1) {
                    float consciousness = consciousnessField(uv);
                    color += consciousness * vec3(1.0, 0.9, 1.0) * u_consciousness;
                }
                
                gl_FragColor = vec4(color, 0.95);
            }
        `;
        
        this.hypercubeProgram = this.createShaderProgram(hypercubeVertexShader, hypercubeFragmentShader);
        this.program = this.hypercubeProgram; // Use hypercube as main program
        
        console.log('🎨 Advanced emergence shaders initialized');
    }
    
    createShaderProgram(vertexSource, fragmentSource) {
        const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexSource);
        const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentSource);
        
        const program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);
        
        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            console.error('Shader program linking failed:', this.gl.getProgramInfoLog(program));
            this.gl.deleteProgram(program);
            return null;
        }
        
        return program;
    }
    
    createShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error('Shader compilation failed:', this.gl.getShaderInfoLog(shader));
            this.gl.deleteShader(shader);
            return null;
        }
        
        return shader;
    }
    
    initBuffers() {
        if (!this.gl) return;
        
        // Create fullscreen quad
        const positions = new Float32Array([
            -1, -1,
             1, -1,
            -1,  1,
             1,  1
        ]);
        
        this.positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);
        
        if (this.program) {
            this.positionLocation = this.gl.getAttribLocation(this.program, 'a_position');
            this.gl.enableVertexAttribArray(this.positionLocation);
            this.gl.vertexAttribPointer(this.positionLocation, 2, this.gl.FLOAT, false, 0, 0);
        }
    }
    
    setupInteraction() {
        // Mouse interaction for visual codex effects
        this.canvas.addEventListener('mousemove', (event) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mousePosition.x = (event.clientX - rect.left) / rect.width;
            this.mousePosition.y = 1.0 - (event.clientY - rect.top) / rect.height;
        });
        
        // Touch support
        this.canvas.addEventListener('touchmove', (event) => {
            event.preventDefault();
            const touch = event.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            this.mousePosition.x = (touch.clientX - rect.left) / rect.width;
            this.mousePosition.y = 1.0 - (touch.clientY - rect.top) / rect.height;
        });
        
        // Zoom interaction for emergence levels
        this.canvas.addEventListener('wheel', (event) => {
            event.preventDefault();
            const zoomDirection = event.deltaY > 0 ? 1.1 : 0.9;
            this.zoomFactor = Math.max(0.1, Math.min(10.0, this.zoomFactor * zoomDirection));
            
            // Update hypercube parameters based on zoom
            this.hypercubeParams.gridDensity = 8.0 + (this.zoomFactor - 1.0) * 5.0;
        });
        
        // Keyboard shortcuts for emergence control
        window.addEventListener('keydown', (event) => {
            switch(event.key) {
                case 'ArrowUp':
                    this.transitionToLevel(Math.min(15, this.currentLevel + 1), 'smooth');
                    break;
                case 'ArrowDown':
                    this.transitionToLevel(Math.max(0, this.currentLevel - 1), 'smooth');
                    break;
                case ' ':
                    event.preventDefault();
                    this.toggleConsciousnessExpansion();
                    break;
                case 'r':
                    this.resetToQuantumLevel();
                    break;
                case 'c':
                    this.transitionToLevel(15, 'consciousness_expansion');
                    break;
            }
        });
        
        // Resize handling
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }
    
    toggleConsciousnessExpansion() {
        this.epoForces.consciousness = this.epoForces.consciousness > 0.5 ? 0.0 : 1.0;
        console.log(`🧠 Consciousness field: ${this.epoForces.consciousness > 0.5 ? 'EXPANDED' : 'COLLAPSED'}`);
    }
    
    resetToQuantumLevel() {
        console.log('🔄 Resetting to quantum level');
        this.transitionToLevel(0, 'explosive');
        this.epoForces.consciousness = 0.0;
        this.zoomFactor = 1.0;
    }
    
    handleResize() {
        if (!this.canvas) return;
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.width = window.innerWidth + 'px';
        this.canvas.style.height = window.innerHeight + 'px';
        
        if (this.gl) {
            this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        }
    }
    
    getHypercubeShaderFunctions() {
        return `
            // 4D rotation matrices from visual codex
            mat4 rotateXY(float angle) {
                float c = cos(angle);
                float s = sin(angle);
                return mat4(
                    c, -s, 0, 0,
                    s,  c, 0, 0,
                    0,  0, 1, 0,
                    0,  0, 0, 1
                );
            }
            
            mat4 rotateXZ(float angle) {
                float c = cos(angle);
                float s = sin(angle);
                return mat4(
                    c, 0, -s, 0,
                    0, 1,  0, 0,
                    s, 0,  c, 0,
                    0, 0,  0, 1
                );
            }
            
            mat4 rotateXW(float angle) {
                float c = cos(angle);
                float s = sin(angle);
                return mat4(
                    c, 0, 0, -s,
                    0, 1, 0,  0,
                    0, 0, 1,  0,
                    s, 0, 0,  c
                );
            }
            
            // 4D to 3D projection
            vec3 project4Dto3D(vec4 p4) {
                float w = 3.0 + p4.w;
                return p4.xyz / w;
            }
            
            // 3D to 2D projection
            vec2 project3Dto2D(vec3 p3) {
                float z = 2.0 + p3.z;
                return p3.xy / z;
            }
            
            // Hypercube lattice generation
            float hypercubeLattice(vec2 uv) {
                vec2 center = uv - 0.5;
                center *= u_zoomFactor;
                center += 0.5;
                
                float lattice = 0.0;
                float time = u_time * u_rotationSpeed;
                
                // Generate hypercube vertices
                for(int i = 0; i < 16; i++) {
                    float fi = float(i);
                    
                    // 4D hypercube vertex
                    vec4 vertex = vec4(
                        mod(fi, 2.0) * 2.0 - 1.0,
                        mod(floor(fi / 2.0), 2.0) * 2.0 - 1.0,
                        mod(floor(fi / 4.0), 2.0) * 2.0 - 1.0,
                        mod(floor(fi / 8.0), 2.0) * 2.0 - 1.0
                    );
                    
                    // Apply 4D rotations
                    vertex = rotateXY(time * 0.5) * vertex;
                    vertex = rotateXZ(time * 0.3) * vertex;
                    vertex = rotateXW(time * 0.7) * vertex;
                    
                    // Project to 2D
                    vec3 p3 = project4Dto3D(vertex);
                    vec2 p2 = project3Dto2D(p3);
                    
                    // Scale and center
                    p2 = p2 * 0.2 + 0.5;
                    
                    // Add vertex glow
                    float dist = distance(center, p2);
                    lattice += exp(-dist * u_gridDensity) * 0.1;
                }
                
                // Add edge connections
                float edges = 0.0;
                for(int i = 0; i < 32; i++) {
                    // Generate hypercube edges (simplified)
                    float t = float(i) / 32.0;
                    vec2 edgePoint = vec2(
                        sin(t * 3.14159 * 2.0 + time),
                        cos(t * 3.14159 * 2.0 + time * 1.3)
                    ) * 0.3 + 0.5;
                    
                    float edgeDist = distance(center, edgePoint);
                    edges += exp(-edgeDist * u_gridDensity * 2.0) * 0.05;
                }
                
                return lattice + edges;
            }
            
            // Consciousness field from visual codex
            float consciousnessField(vec2 uv) {
                float field = 0.0;
                vec2 center = vec2(0.5);
                
                // Neural network pattern
                for(int i = 0; i < 8; i++) {
                    float angle = float(i) * 0.785398; // π/4
                    vec2 nodePos = center + vec2(cos(angle), sin(angle)) * 0.3;
                    
                    float dist = distance(uv, nodePos);
                    field += exp(-dist * 15.0) * sin(u_time * 2.0 + float(i)) * 0.5 + 0.5;
                }
                
                // Central consciousness hub
                float hubDist = distance(uv, center);
                field += exp(-hubDist * 10.0) * 2.0;
                
                return field * 0.2;
            }
        `;
    }
    
    getEmergenceShaderFunctions() {
        return `
            vec3 generateEmergenceVisualization(vec2 uv) {
                vec3 color = vec3(0.0);
                float level = u_emergenceLevel;
                
                if (level < 1.0) {
                    // Quantum foam
                    float foam = 0.0;
                    for(int i = 0; i < 8; i++) {
                        float fi = float(i);
                        vec2 p = uv * pow(2.0, fi) * 10.0;
                        foam += sin(p.x + u_time * (1.0 + fi * 0.2)) * sin(p.y + u_time * (1.5 + fi * 0.1)) / pow(2.0, fi);
                    }
                    color = abs(foam) * u_levelColor;
                    
                } else if (level < 3.0) {
                    // Atomic structures
                    vec2 center = vec2(0.5);
                    float shells = 0.0;
                    for(int i = 1; i <= 4; i++) {
                        float radius = float(i) * 0.08;
                        float shellDist = abs(distance(uv, center) - radius);
                        shells += exp(-shellDist * 50.0);
                    }
                    color = shells * u_levelColor * (2.0 - level);
                    
                } else if (level < 6.0) {
                    // Molecular and cellular
                    float networks = 0.0;
                    for(int i = 0; i < 6; i++) {
                        float angle = float(i) * 1.047; // 60 degrees
                        vec2 bondPos = vec2(0.5) + vec2(cos(angle), sin(angle)) * 0.2;
                        float dist = distance(uv, bondPos);
                        networks += exp(-dist * 30.0);
                    }
                    color = networks * u_levelColor;
                    
                } else if (level < 10.0) {
                    // Biological systems
                    float bio = consciousnessField(uv) * 0.8;
                    color = bio * u_levelColor;
                    
                } else if (level < 13.0) {
                    // Cosmic structures
                    vec2 center = vec2(0.5);
                    vec2 pos = uv - center;
                    float radius = length(pos);
                    float angle = atan(pos.y, pos.x);
                    
                    // Spiral galaxy pattern
                    float spiral = 0.0;
                    for(int i = 0; i < 3; i++) {
                        float armAngle = angle + float(i) * 2.094; // 120 degrees
                        float spiralAngle = armAngle - radius * 8.0;
                        spiral += exp(-abs(sin(spiralAngle)) * 5.0) * exp(-radius * 2.0);
                    }
                    color = spiral * u_levelColor;
                    
                } else {
                    // Universal consciousness
                    float consciousness = consciousnessField(uv);
                    float cosmic = hypercubeLattice(uv) * 0.5;
                    color = (consciousness + cosmic) * u_levelColor;
                }
                
                // Add EPO force visualization
                vec2 forceCenter = vec2(0.5);
                float dist = distance(uv, forceCenter);
                
                // Integration force (attractive)
                float integration = u_epoIntegration / (1.0 + dist * 3.0);
                color += vec3(0.0, 0.7, 1.0) * integration * 0.2;
                
                // Dispersion force (repulsive)
                float dispersion = u_epoDispersion * dist;
                color += vec3(1.0, 0.3, 0.1) * dispersion * 0.1;
                
                // Information density
                float info = u_informationDensity * exp(-dist * 2.0);
                color += vec3(0.8, 1.0, 0.8) * info * 0.15;
                
                return color;
            }
        `;
    }
    
    /**
     * Initialize particle systems for each emergence level
     */
    initializeParticleSystems() {
        this.emergenceLevels.forEach((level, index) => {
            const particleSystem = this.createParticleSystemForLevel(level, index);
            this.particleSystems.set(level.id, particleSystem);
        });
        
        console.log(`🎲 Initialized ${this.particleSystems.size} particle systems`);
    }
    
    /**
     * Create particle system for specific emergence level
     */
    createParticleSystemForLevel(level, levelIndex) {
        const baseCount = 50;
        const complexity = Math.pow(1.5, levelIndex); // Increasing complexity
        const particleCount = Math.min(baseCount * complexity, 2000); // Cap at 2000 particles
        
        const system = {
            particles: [],
            structures: [],
            emergencePatterns: this.getEmergencePatternsForLevel(level.id),
            integrationForce: 0.1 + (levelIndex * 0.05),
            dispersionForce: 0.05 + (levelIndex * 0.02),
            coherenceLevel: levelIndex / this.emergenceLevels.length,
            color: level.color,
            name: level.name
        };
        
        // Initialize particles for this level
        for (let i = 0; i < particleCount; i++) {
            system.particles.push(this.createParticleForLevel(level.id, levelIndex));
        }
        
        return system;
    }
    
    /**
     * Create individual particle for emergence level
     */
    createParticleForLevel(levelId, levelIndex) {
        const particle = {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: 1 + (levelIndex * 0.5),
            mass: 1 + (levelIndex * 0.1),
            energy: Math.random() * 100,
            information: Math.random() * levelIndex,
            bonds: [],
            emergenceState: 'free', // free, bonding, integrated
            lifespan: 1000 + Math.random() * 2000,
            age: 0,
            complexity: levelIndex,
            resonance: Math.random() * Math.PI * 2
        };
        
        // Level-specific properties
        switch (levelId) {
            case 'quantum':
                particle.wavefunction = { amplitude: Math.random(), phase: Math.random() * Math.PI * 2 };
                particle.spin = Math.random() > 0.5 ? 0.5 : -0.5;
                break;
            case 'subatomic':
                particle.charge = Math.random() > 0.5 ? 1 : -1;
                particle.type = Math.random() > 0.5 ? 'proton' : 'electron';
                break;
            case 'atomic':
                particle.atomicNumber = Math.floor(Math.random() * 20) + 1;
                particle.orbitals = [];
                break;
            case 'molecular':
                particle.molecularWeight = 10 + Math.random() * 100;
                particle.bondingCapacity = Math.floor(Math.random() * 4) + 1;
                break;
            case 'cellular':
                particle.cellType = ['neuron', 'muscle', 'epithelial', 'connective'][Math.floor(Math.random() * 4)];
                particle.membrane = true;
                break;
            // Add more level-specific properties...
        }
        
        return particle;
    }
    
    /**
     * Get emergence patterns for specific level
     */
    getEmergencePatternsForLevel(levelId) {
        const patterns = {
            quantum: ['wave_interference', 'superposition', 'entanglement'],
            subatomic: ['strong_force', 'weak_force', 'electromagnetic'],
            atomic: ['electron_shells', 'nuclear_binding', 'ionic_bonds'],
            molecular: ['covalent_bonds', 'hydrogen_bonds', 'van_der_waals'],
            cellular: ['membrane_formation', 'organelle_assembly', 'protein_folding'],
            tissue: ['cell_differentiation', 'extracellular_matrix', 'tissue_architecture'],
            organ: ['functional_units', 'vascular_networks', 'neural_pathways'],
            organism: ['organ_systems', 'homeostasis', 'behavioral_patterns'],
            community: ['social_structures', 'communication_networks', 'cooperation'],
            ecosystem: ['food_webs', 'nutrient_cycles', 'population_dynamics'],
            world: ['atmospheric_systems', 'geological_processes', 'biosphere_integration'],
            solar: ['gravitational_systems', 'orbital_mechanics', 'energy_distribution'],
            galaxy: ['stellar_formation', 'galactic_rotation', 'dark_matter_halos'],
            supercluster: ['large_scale_structure', 'cosmic_web', 'dark_energy_expansion'],
            universal: ['cosmic_consciousness', 'information_integration', 'self_observation']
        };
        
        return patterns[levelId] || ['basic_interaction'];
    }
    
    /**
     * Transition to new emergence level
     */
    transitionToLevel(targetLevel, transitionType = 'smooth') {
        if (targetLevel < 0 || targetLevel >= this.emergenceLevels.length) {
            console.warn(`Invalid emergence level: ${targetLevel}`);
            return;
        }
        
        this.targetLevel = targetLevel;
        this.isTransitioning = true;
        this.transitionProgress = 0;
        
        const levelName = this.emergenceLevels[targetLevel].name;
        console.log(`🔄 Transitioning to emergence level: ${levelName} (${targetLevel})`);
        
        // Trigger transition effects based on type
        switch (transitionType) {
            case 'smooth':
                this.startSmoothTransition();
                break;
            case 'explosive':
                this.startExplosiveTransition();
                break;
            case 'collapse':
                this.startCollapseTransition();
                break;
            case 'phase_shift':
                this.startPhaseShiftTransition();
                break;
        }
        
        // Notify system controller
        if (this.systemController) {
            this.systemController.updateParameter('emergence-level', targetLevel);
            this.systemController.updateParameter('emergence-name', levelName);
        }
    }
    
    /**
     * Start smooth transition between levels
     */
    startSmoothTransition() {
        const currentSystem = this.particleSystems.get(this.emergenceLevels[this.currentLevel].id);
        const targetSystem = this.particleSystems.get(this.emergenceLevels[this.targetLevel].id);
        
        // Gradually transform particles from current to target level
        currentSystem.particles.forEach((particle, index) => {
            if (index < targetSystem.particles.length) {
                const targetParticle = targetSystem.particles[index];
                
                // Animate transformation
                particle.targetX = targetParticle.x;
                particle.targetY = targetParticle.y;
                particle.targetSize = targetParticle.size;
                particle.targetComplexity = targetParticle.complexity;
            }
        });
    }
    
    /**
     * Start explosive transition (for paradigm breaks)
     */
    startExplosiveTransition() {
        const currentSystem = this.particleSystems.get(this.emergenceLevels[this.currentLevel].id);
        
        // Add explosive force to all particles
        currentSystem.particles.forEach(particle => {
            const explosionForce = 20;
            const angle = Math.random() * Math.PI * 2;
            particle.vx += Math.cos(angle) * explosionForce;
            particle.vy += Math.sin(angle) * explosionForce;
            particle.explosionTime = 60; // frames
        });
        
        // After explosion, reorganize into new pattern
        setTimeout(() => {
            this.reorganizeParticlesForLevel(this.targetLevel);
        }, 1000);
    }
    
    /**
     * Start collapse transition (for integration events)
     */
    startCollapseTransition() {
        const currentSystem = this.particleSystems.get(this.emergenceLevels[this.currentLevel].id);
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // Pull all particles toward center
        currentSystem.particles.forEach(particle => {
            const dx = centerX - particle.x;
            const dy = centerY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 0) {
                const force = 5;
                particle.vx += (dx / distance) * force;
                particle.vy += (dy / distance) * force;
            }
        });
    }
    
    /**
     * Start phase shift transition (for quantum effects)
     */
    startPhaseShiftTransition() {
        const currentSystem = this.particleSystems.get(this.emergenceLevels[this.currentLevel].id);
        
        // Apply quantum phase shift effects
        currentSystem.particles.forEach(particle => {
            particle.phaseShift = true;
            particle.originalAlpha = particle.alpha || 1;
            particle.phaseSpeed = 0.1 + Math.random() * 0.1;
            particle.phaseOffset = Math.random() * Math.PI * 2;
        });
    }
    
    /**
     * Reorganize particles for new emergence level
     */
    reorganizeParticlesForLevel(levelIndex) {
        const targetSystem = this.particleSystems.get(this.emergenceLevels[levelIndex].id);
        const patterns = targetSystem.emergencePatterns;
        
        // Apply emergence patterns to organize particles
        patterns.forEach(pattern => {
            this.applyEmergencePattern(targetSystem, pattern);
        });
    }
    
    /**
     * Apply specific emergence pattern to particle system
     */
    applyEmergencePattern(system, pattern) {
        switch (pattern) {
            case 'wave_interference':
                this.createWaveInterferencePattern(system);
                break;
            case 'electron_shells':
                this.createAtomicShellPattern(system);
                break;
            case 'covalent_bonds':
                this.createMolecularBondPattern(system);
                break;
            case 'membrane_formation':
                this.createCellularMembranePattern(system);
                break;
            case 'gravitational_systems':
                this.createGravitationalSystemPattern(system);
                break;
            case 'cosmic_consciousness':
                this.createCosmicConsciousnessPattern(system);
                break;
            // Add more patterns...
        }
    }
    
    /**
     * Create wave interference pattern for quantum level
     */
    createWaveInterferencePattern(system) {
        system.particles.forEach((particle, index) => {
            if (particle.wavefunction) {
                // Create constructive and destructive interference
                const waveLength = 50;
                const frequency = 0.1;
                
                particle.interferenceX = Math.sin(particle.x / waveLength + particle.resonance) * 10;
                particle.interferenceY = Math.cos(particle.y / waveLength + particle.resonance) * 10;
                
                // Update wave function
                particle.wavefunction.phase += frequency;
            }
        });
    }
    
    /**
     * Create atomic shell pattern
     */
    createAtomicShellPattern(system) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const shells = [30, 60, 90, 120]; // Electron shell radii
        
        system.particles.forEach((particle, index) => {
            const shellIndex = index % shells.length;
            const radius = shells[shellIndex];
            const angle = (index / system.particles.length) * Math.PI * 2;
            
            particle.orbitalX = centerX + Math.cos(angle) * radius;
            particle.orbitalY = centerY + Math.sin(angle) * radius;
            particle.orbitalSpeed = 0.02 / (shellIndex + 1);
        });
    }
    
    /**
     * Create molecular bond pattern
     */
    createMolecularBondPattern(system) {
        // Group particles into molecules
        const moleculeSize = 4;
        for (let i = 0; i < system.particles.length; i += moleculeSize) {
            const molecule = system.particles.slice(i, i + moleculeSize);
            
            // Create bonds between particles in molecule
            molecule.forEach((particle, j) => {
                molecule.forEach((otherParticle, k) => {
                    if (j !== k) {
                        const bond = {
                            target: otherParticle,
                            strength: 0.5,
                            idealDistance: 20 + Math.random() * 10
                        };
                        particle.bonds.push(bond);
                    }
                });
            });
        }
    }
    
    /**
     * Create cellular membrane pattern
     */
    createCellularMembranePattern(system) {
        const cellCount = Math.floor(system.particles.length / 20);
        
        for (let c = 0; c < cellCount; c++) {
            const cellParticles = system.particles.slice(c * 20, (c + 1) * 20);
            const cellCenterX = Math.random() * this.canvas.width;
            const cellCenterY = Math.random() * this.canvas.height;
            const cellRadius = 30 + Math.random() * 20;
            
            cellParticles.forEach((particle, index) => {
                if (index < 15) {
                    // Membrane particles - arrange in circle
                    const angle = (index / 15) * Math.PI * 2;
                    particle.membraneX = cellCenterX + Math.cos(angle) * cellRadius;
                    particle.membraneY = cellCenterY + Math.sin(angle) * cellRadius;
                    particle.isMembraneParticle = true;
                } else {
                    // Organelle particles - arrange inside
                    particle.organelleX = cellCenterX + (Math.random() - 0.5) * cellRadius;
                    particle.organelleY = cellCenterY + (Math.random() - 0.5) * cellRadius;
                    particle.isOrganelleParticle = true;
                }
            });
        }
    }
    
    /**
     * Create gravitational system pattern
     */
    createGravitationalSystemPattern(system) {
        // Create central star with orbiting planets
        const starParticle = system.particles[0];
        starParticle.isStar = true;
        starParticle.x = this.canvas.width / 2;
        starParticle.y = this.canvas.height / 2;
        starParticle.size = 8;
        starParticle.mass = 100;
        
        // Set up planetary orbits
        const planetCount = Math.min(8, system.particles.length - 1);
        for (let i = 1; i <= planetCount; i++) {
            const planet = system.particles[i];
            planet.isPlanet = true;
            planet.orbitalRadius = 50 + (i * 30);
            planet.orbitalAngle = (i / planetCount) * Math.PI * 2;
            planet.orbitalSpeed = 0.02 / Math.sqrt(planet.orbitalRadius);
            planet.size = 2 + Math.random() * 3;
        }
    }
    
    /**
     * Create cosmic consciousness pattern
     */
    createCosmicConsciousnessPattern(system) {
        // All particles become part of universal neural network
        system.particles.forEach((particle, index) => {
            particle.isNeuralNode = true;
            particle.connections = [];
            
            // Connect to nearby particles
            system.particles.forEach((otherParticle, otherIndex) => {
                if (index !== otherIndex) {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        particle.connections.push({
                            target: otherParticle,
                            strength: 1 / distance,
                            activity: Math.random()
                        });
                    }
                }
            });
            
            // Neural activity
            particle.neuralActivity = 0;
            particle.neuralPhase = Math.random() * Math.PI * 2;
        });
    }
    
    /**
     * Setup canvas properties
     */
    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Handle canvas resize
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
    }
    
    /**
     * Start animation loop
     */
    startAnimation() {
        this.animate = (currentTime) => {
            const deltaTime = currentTime - this.lastTime;
            this.lastTime = currentTime;
            
            this.update(deltaTime);
            this.render();
            
            this.animationId = requestAnimationFrame(this.animate);
        };
        
        this.animationId = requestAnimationFrame(this.animate);
    }
    
    /**
     * Update emergence visualization
     */
    update(deltaTime) {
        // Handle transition progress
        if (this.isTransitioning) {
            this.transitionProgress += deltaTime * 0.001; // 1 second transition
            
            if (this.transitionProgress >= 1) {
                this.transitionProgress = 1;
                this.isTransitioning = false;
                this.currentLevel = this.targetLevel;
            }
        }
        
        // Update current particle system
        const currentSystem = this.particleSystems.get(this.emergenceLevels[this.currentLevel].id);
        if (currentSystem) {
            this.updateParticleSystem(currentSystem, deltaTime);
        }
        
        // Update transition if active
        if (this.isTransitioning) {
            this.updateTransition(deltaTime);
        }
    }
    
    /**
     * Update particle system physics
     */
    updateParticleSystem(system, deltaTime) {
        const dt = deltaTime * 0.016; // Normalize to 60fps
        
        system.particles.forEach(particle => {
            // Age particles
            particle.age += dt;
            
            // Apply emergence-specific updates
            this.updateParticleForLevel(particle, system, dt);
            
            // Apply forces
            this.applyEPOForces(particle, system, dt);
            
            // Update position
            particle.x += particle.vx * dt;
            particle.y += particle.vy * dt;
            
            // Boundary conditions
            this.applyBoundaryConditions(particle);
            
            // Update bonds
            this.updateParticleBonds(particle, dt);
        });
        
        // Update system-level properties
        this.updateSystemCoherence(system, dt);
    }
    
    /**
     * Update particle based on emergence level
     */
    updateParticleForLevel(particle, system, dt) {
        switch (system.name) {
            case 'Quantum Fields':
                this.updateQuantumParticle(particle, dt);
                break;
            case 'Atoms':
                this.updateAtomicParticle(particle, dt);
                break;
            case 'Biological Cells':
                this.updateCellularParticle(particle, dt);
                break;
            case 'Solar Systems':
                this.updateGravitationalParticle(particle, dt);
                break;
            case 'Universal Consciousness':
                this.updateConsciousnessParticle(particle, dt);
                break;
            // Add more level-specific updates...
        }
    }
    
    /**
     * Update quantum particle behavior
     */
    updateQuantumParticle(particle, dt) {
        if (particle.wavefunction) {
            // Wave function evolution
            particle.wavefunction.phase += particle.wavefunction.amplitude * dt * 0.1;
            
            // Quantum uncertainty
            particle.x += (Math.random() - 0.5) * particle.wavefunction.amplitude * 0.1;
            particle.y += (Math.random() - 0.5) * particle.wavefunction.amplitude * 0.1;
            
            // Wave interference effects
            if (particle.interferenceX !== undefined) {
                particle.x += particle.interferenceX * dt * 0.01;
                particle.y += particle.interferenceY * dt * 0.01;
            }
        }
    }
    
    /**
     * Update atomic particle behavior
     */
    updateAtomicParticle(particle, dt) {
        if (particle.orbitalX !== undefined) {
            // Orbital motion
            const dx = particle.orbitalX - particle.x;
            const dy = particle.orbitalY - particle.y;
            
            particle.vx += dx * 0.1 * dt;
            particle.vy += dy * 0.1 * dt;
            
            // Update orbital position
            if (particle.orbitalSpeed) {
                particle.orbitalAngle = (particle.orbitalAngle || 0) + particle.orbitalSpeed * dt;
                const centerX = this.canvas.width / 2;
                const centerY = this.canvas.height / 2;
                const radius = Math.sqrt(particle.orbitalX * particle.orbitalX + particle.orbitalY * particle.orbitalY);
                
                particle.orbitalX = centerX + Math.cos(particle.orbitalAngle) * radius;
                particle.orbitalY = centerY + Math.sin(particle.orbitalAngle) * radius;
            }
        }
    }
    
    /**
     * Update cellular particle behavior
     */
    updateCellularParticle(particle, dt) {
        if (particle.isMembraneParticle && particle.membraneX !== undefined) {
            // Maintain membrane structure
            const dx = particle.membraneX - particle.x;
            const dy = particle.membraneY - particle.y;
            
            particle.vx += dx * 0.15 * dt;
            particle.vy += dy * 0.15 * dt;
            
        } else if (particle.isOrganelleParticle && particle.organelleX !== undefined) {
            // Organelle dynamics
            const dx = particle.organelleX - particle.x;
            const dy = particle.organelleY - particle.y;
            
            particle.vx += dx * 0.05 * dt;
            particle.vy += dy * 0.05 * dt;
            
            // Random organelle movement
            particle.organelleX += (Math.random() - 0.5) * 0.5 * dt;
            particle.organelleY += (Math.random() - 0.5) * 0.5 * dt;
        }
    }
    
    /**
     * Update gravitational particle behavior
     */
    updateGravitationalParticle(particle, dt) {
        if (particle.isPlanet && particle.orbitalRadius) {
            // Planetary orbital motion
            particle.orbitalAngle += particle.orbitalSpeed * dt;
            
            const starX = this.canvas.width / 2;
            const starY = this.canvas.height / 2;
            
            particle.x = starX + Math.cos(particle.orbitalAngle) * particle.orbitalRadius;
            particle.y = starY + Math.sin(particle.orbitalAngle) * particle.orbitalRadius;
        }
    }
    
    /**
     * Update consciousness particle behavior
     */
    updateConsciousnessParticle(particle, dt) {
        if (particle.isNeuralNode) {
            // Neural activity updates
            particle.neuralPhase += dt * 0.01;
            particle.neuralActivity = Math.sin(particle.neuralPhase) * 0.5 + 0.5;
            
            // Process connections
            particle.connections.forEach(connection => {
                connection.activity *= 0.99; // Decay
                
                // Propagate activity
                if (particle.neuralActivity > 0.8 && Math.random() < 0.1) {
                    connection.activity = Math.min(1, connection.activity + 0.3);
                }
            });
        }
    }
    
    /**
     * Apply EPO forces to particle
     */
    applyEPOForces(particle, system, dt) {
        // EPO-I (Integration force)
        const integrationForce = system.integrationForce * particle.information;
        const dispersionForce = system.dispersionForce * particle.energy;
        
        // Apply integration - attract to nearby particles
        system.particles.forEach(otherParticle => {
            if (particle !== otherParticle) {
                const dx = otherParticle.x - particle.x;
                const dy = otherParticle.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance > 0 && distance < 50) {
                    // Integration force (attractive)
                    const force = integrationForce / (distance * distance);
                    particle.vx += (dx / distance) * force * dt;
                    particle.vy += (dy / distance) * force * dt;
                    
                    // Dispersion force (repulsive at close range)
                    if (distance < 10) {
                        const repulsionForce = dispersionForce / distance;
                        particle.vx -= (dx / distance) * repulsionForce * dt;
                        particle.vy -= (dy / distance) * repulsionForce * dt;
                    }
                }
            }
        });
        
        // Apply damping
        particle.vx *= 0.95;
        particle.vy *= 0.95;
    }
    
    /**
     * Apply boundary conditions to particle
     */
    applyBoundaryConditions(particle) {
        const margin = 20;
        
        if (particle.x < margin) {
            particle.x = margin;
            particle.vx = Math.abs(particle.vx);
        } else if (particle.x > this.canvas.width - margin) {
            particle.x = this.canvas.width - margin;
            particle.vx = -Math.abs(particle.vx);
        }
        
        if (particle.y < margin) {
            particle.y = margin;
            particle.vy = Math.abs(particle.vy);
        } else if (particle.y > this.canvas.height - margin) {
            particle.y = this.canvas.height - margin;
            particle.vy = -Math.abs(particle.vy);
        }
    }
    
    /**
     * Update particle bonds
     */
    updateParticleBonds(particle, dt) {
        particle.bonds.forEach(bond => {
            const dx = bond.target.x - particle.x;
            const dy = bond.target.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 0) {
                const displacement = distance - bond.idealDistance;
                const force = bond.strength * displacement;
                
                particle.vx += (dx / distance) * force * dt * 0.1;
                particle.vy += (dy / distance) * force * dt * 0.1;
            }
        });
    }
    
    /**
     * Update system-level coherence
     */
    updateSystemCoherence(system, dt) {
        // Calculate average particle properties
        let totalEnergy = 0;
        let totalInformation = 0;
        let avgX = 0;
        let avgY = 0;
        
        system.particles.forEach(particle => {
            totalEnergy += particle.energy;
            totalInformation += particle.information;
            avgX += particle.x;
            avgY += particle.y;
        });
        
        const particleCount = system.particles.length;
        system.averageEnergy = totalEnergy / particleCount;
        system.averageInformation = totalInformation / particleCount;
        system.centerX = avgX / particleCount;
        system.centerY = avgY / particleCount;
        
        // Update coherence level
        system.coherenceLevel = Math.min(1, system.averageInformation / 10);
    }
    
    /**
     * Update transition effects
     */
    updateTransition(deltaTime) {
        const progress = this.transitionProgress;
        const easeProgress = this.easeInOutCubic(progress);
        
        // Interpolate between current and target levels
        const currentSystem = this.particleSystems.get(this.emergenceLevels[this.currentLevel].id);
        const targetSystem = this.particleSystems.get(this.emergenceLevels[this.targetLevel].id);
        
        if (currentSystem && targetSystem) {
            // Blend particle properties
            currentSystem.particles.forEach((particle, index) => {
                if (particle.targetX !== undefined) {
                    particle.x = this.lerp(particle.x, particle.targetX, easeProgress * 0.1);
                    particle.y = this.lerp(particle.y, particle.targetY, easeProgress * 0.1);
                    particle.size = this.lerp(particle.size, particle.targetSize, easeProgress * 0.05);
                }
                
                // Handle phase shift effects
                if (particle.phaseShift) {
                    particle.alpha = particle.originalAlpha * (0.5 + 0.5 * Math.sin(particle.phaseOffset + progress * Math.PI * 4));
                }
                
                // Handle explosion effects
                if (particle.explosionTime > 0) {
                    particle.explosionTime--;
                    particle.vx *= 0.95;
                    particle.vy *= 0.95;
                }
            });
        }
    }
    
    /**
     * Render emergence visualization
     */
    render() {
        if (this.gl && this.program) {
            this.renderWebGL();
        } else {
            this.render2D();
        }
    }
    
    renderWebGL() {
        this.time += 0.016;
        
        // Clear WebGL canvas
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        
        // Use the hypercube shader program
        this.gl.useProgram(this.program);
        
        // Update uniforms
        this.setUniform('u_resolution', [this.canvas.width, this.canvas.height]);
        this.setUniform('u_time', this.time);
        this.setUniform('u_mouse', [this.mousePosition.x, this.mousePosition.y]);
        this.setUniform('u_morphFactor', this.hypercubeParams.morphFactor);
        this.setUniform('u_dimension', this.hypercubeParams.dimension);
        this.setUniform('u_glitchIntensity', this.hypercubeParams.glitchIntensity);
        this.setUniform('u_rotationSpeed', this.hypercubeParams.rotationSpeed);
        this.setUniform('u_gridDensity', this.hypercubeParams.gridDensity);
        this.setUniform('u_emergenceLevel', this.currentLevel + this.transitionProgress);
        
        // Current level color
        const levelData = this.emergenceLevels[this.currentLevel];
        this.setUniform('u_levelColor', levelData.color);
        
        // EPO force parameters
        this.setUniform('u_epoIntegration', this.epoForces.integration);
        this.setUniform('u_epoDispersion', this.epoForces.dispersion);
        this.setUniform('u_informationDensity', this.epoForces.information);
        this.setUniform('u_consciousness', this.epoForces.consciousness);
        
        // Missing zoom factor uniform
        this.setUniform('u_zoomFactor', this.zoomFactor);
        
        // Bind buffers and draw
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.vertexAttribPointer(this.positionLocation, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
        
        // Render UI overlay with 2D context
        this.renderUIOverlay();
    }
    
    render2D() {
        // Fallback 2D rendering (original implementation)
        // Clear canvas
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Render current particle system
        const currentLevel = Math.floor(this.currentLevel);
        const currentSystem = this.particleSystems.get(this.emergenceLevels[currentLevel].id || `level-${currentLevel}`);
        if (currentSystem) {
            this.renderParticleSystem(currentSystem);
        }
        
        // Render emergence level info
        this.renderEmergenceLevelInfo();
        
        // Render transition effects
        if (this.isTransitioning) {
            this.renderTransitionEffects();
        }
    }
    
    setUniform(name, value) {
        if (!this.gl || !this.program) return;
        
        const location = this.gl.getUniformLocation(this.program, name);
        if (!location) return;
        
        if (Array.isArray(value)) {
            if (value.length === 2) {
                this.gl.uniform2fv(location, value);
            } else if (value.length === 3) {
                this.gl.uniform3fv(location, value);
            }
        } else {
            this.gl.uniform1f(location, value);
        }
    }
    
    renderUIOverlay() {
        // Switch to 2D context for UI elements
        const ctx = this.ctx;
        
        // Check if 2D context is available
        if (!ctx) {
            console.warn('2D context not available for UI overlay');
            return;
        }
        
        // Save current state
        ctx.save();
        
        // Clear any blending artifacts
        ctx.globalCompositeOperation = 'source-over';
        
        // Render emergence level info
        this.renderEmergenceLevelInfo();
        
        // Render keyboard shortcuts
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '14px "Orbitron", monospace';
        ctx.textAlign = 'right';
        
        const shortcuts = [
            '↑/↓ - Change emergence level',
            'Space - Toggle consciousness',
            'C - Jump to universal consciousness',
            'R - Reset to quantum level',
            'Mouse wheel - Zoom'
        ];
        
        shortcuts.forEach((shortcut, index) => {
            ctx.fillText(shortcut, this.canvas.width - 20, this.canvas.height - 20 - (shortcuts.length - index - 1) * 20);
        });
        
        // Render EPO force indicators
        this.renderEPOForceIndicators();
        
        ctx.restore();
    }
    
    renderEPOForceIndicators() {
        const ctx = this.ctx;
        const x = 30;
        const y = this.canvas.height - 150;
        
        ctx.save();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '16px "Orbitron", monospace';
        ctx.textAlign = 'left';
        
        ctx.fillText('EPO Forces:', x, y);
        
        // Integration force
        ctx.fillStyle = 'rgba(0, 179, 255, 0.8)';
        ctx.fillText(`Integration: ${(this.epoForces.integration * 100).toFixed(0)}%`, x, y + 25);
        ctx.fillRect(x + 120, y + 10, this.epoForces.integration * 100, 10);
        
        // Dispersion force
        ctx.fillStyle = 'rgba(255, 77, 26, 0.8)';
        ctx.fillText(`Dispersion: ${(this.epoForces.dispersion * 100).toFixed(0)}%`, x, y + 50);
        ctx.fillRect(x + 120, y + 35, this.epoForces.dispersion * 100, 10);
        
        // Information density
        ctx.fillStyle = 'rgba(204, 255, 204, 0.8)';
        ctx.fillText(`Information: ${(this.epoForces.information * 100).toFixed(0)}%`, x, y + 75);
        ctx.fillRect(x + 120, y + 60, this.epoForces.information * 100, 10);
        
        // Consciousness level
        ctx.fillStyle = 'rgba(255, 229, 255, 0.8)';
        ctx.fillText(`Consciousness: ${(this.epoForces.consciousness * 100).toFixed(0)}%`, x, y + 100);
        ctx.fillRect(x + 120, y + 85, this.epoForces.consciousness * 100, 10);
        
        ctx.restore();
    }
    
    /**
     * Render particle system
     */
    renderParticleSystem(system) {
        const ctx = this.ctx;
        
        // Render connections first
        this.renderConnections(system);
        
        // Render particles
        system.particles.forEach(particle => {
            this.renderParticle(particle, system);
        });
        
        // Render structures
        this.renderStructures(system);
    }
    
    /**
     * Render particle connections
     */
    renderConnections(system) {
        const ctx = this.ctx;
        
        system.particles.forEach(particle => {
            if (particle.bonds && particle.bonds.length > 0) {
                particle.bonds.forEach(bond => {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(bond.target.x, bond.target.y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${bond.strength * 0.3})`;
                    ctx.lineWidth = bond.strength * 2;
                    ctx.stroke();
                });
            }
            
            if (particle.connections && particle.connections.length > 0) {
                particle.connections.forEach(connection => {
                    if (connection.activity > 0.1) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(connection.target.x, connection.target.y);
                        ctx.strokeStyle = `rgba(255, 200, 100, ${connection.activity * 0.5})`;
                        ctx.lineWidth = connection.activity * 3;
                        ctx.stroke();
                    }
                });
            }
        });
    }
    
    /**
     * Render individual particle
     */
    renderParticle(particle, system) {
        const ctx = this.ctx;
        const alpha = particle.alpha || 1;
        
        ctx.save();
        ctx.globalAlpha = alpha;
        
        // Particle glow effect
        if (particle.energy > 50) {
            const glowSize = particle.size * 3;
            const gradient = ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, glowSize
            );
            gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.8})`);
            gradient.addColorStop(1, 'transparent');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Main particle
        ctx.fillStyle = system.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Special effects based on particle type
        if (particle.isNeuralNode && particle.neuralActivity > 0.5) {
            ctx.strokeStyle = `rgba(255, 255, 0, ${particle.neuralActivity})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size + 5, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        if (particle.isStar) {
            // Star corona effect
            const spikes = 8;
            const outerRadius = particle.size * 2;
            const innerRadius = particle.size;
            
            ctx.fillStyle = '#ffff00';
            ctx.beginPath();
            for (let i = 0; i < spikes * 2; i++) {
                const radius = i % 2 === 0 ? outerRadius : innerRadius;
                const angle = (i * Math.PI) / spikes;
                const x = particle.x + Math.cos(angle) * radius;
                const y = particle.y + Math.sin(angle) * radius;
                
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
        }
        
        ctx.restore();
    }
    
    /**
     * Render emergence structures
     */
    renderStructures(system) {
        // Render level-specific structures
        // (Implementation depends on the specific emergence level)
    }
    
    /**
     * Render emergence level information
     */
    renderEmergenceLevelInfo() {
        const ctx = this.ctx;
        const level = this.emergenceLevels[this.currentLevel];
        
        ctx.save();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = '24px "Orbitron", monospace';
        ctx.textAlign = 'left';
        
        const text = `Level ${this.currentLevel + 1}: ${level.name}`;
        ctx.fillText(text, 30, 50);
        
        // Progress indicator
        const progressWidth = 300;
        const progressHeight = 10;
        const progressX = 30;
        const progressY = 70;
        
        // Background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(progressX, progressY, progressWidth, progressHeight);
        
        // Progress fill
        const progress = (this.currentLevel + 1) / this.emergenceLevels.length;
        ctx.fillStyle = level.color;
        ctx.fillRect(progressX, progressY, progressWidth * progress, progressHeight);
        
        ctx.restore();
    }
    
    /**
     * Render transition effects
     */
    renderTransitionEffects() {
        const ctx = this.ctx;
        const progress = this.transitionProgress;
        
        // Transition overlay
        ctx.save();
        ctx.globalAlpha = Math.sin(progress * Math.PI) * 0.3;
        ctx.fillStyle = this.emergenceLevels[this.targetLevel].color;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.restore();
    }
    
    /**
     * Utility functions
     */
    lerp(a, b, t) {
        return a + (b - a) * t;
    }
    
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    /**
     * Get current emergence level
     */
    getCurrentLevel() {
        return this.currentLevel;
    }
    
    /**
     * Get current emergence level name
     */
    getCurrentLevelName() {
        return this.emergenceLevels[this.currentLevel].name;
    }
    
    /**
     * Set EPO force parameters
     */
    setEPOParameters(integration, dispersion, information = 0.5, consciousness = 0.3) {
        this.epoForces.integration = Math.max(0, Math.min(1, integration));
        this.epoForces.dispersion = Math.max(0, Math.min(1, dispersion));
        this.epoForces.information = Math.max(0, Math.min(1, information));
        this.epoForces.consciousness = Math.max(0, Math.min(1, consciousness));
        
        console.log(`🔧 EPO parameters updated: I=${integration.toFixed(2)}, D=${dispersion.toFixed(2)}, Info=${information.toFixed(2)}, Consciousness=${consciousness.toFixed(2)}`);
    }
    
    /**
     * Consciousness expansion effect
     */
    async consciousnessExpansion(level, duration = 3000) {
        console.log(`🧠 Consciousness expansion to level ${level} over ${duration}ms`);
        
        const startTime = Date.now();
        return new Promise(resolve => {
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Update consciousness level with easing
                const easedProgress = this.easeInOutCubic(progress);
                this.epoForces.consciousness = easedProgress * level;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            };
            animate();
        });
    }
    
    /**
     * Zoom into level with factor
     */
    async zoomIntoLevel(level, factor) {
        console.log(`🔍 Zooming into level ${level} with factor ${factor}`);
        this.zoomFactor = factor;
        return Promise.resolve();
    }
    
    /**
     * Cleanup resources
     */
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        this.particleSystems.clear();
        console.log('🧹 Emergence Visualization Engine destroyed');
    }
}
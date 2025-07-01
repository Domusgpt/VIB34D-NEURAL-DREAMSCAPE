/**
 * @file AdaptiveMorphingCards.js
 * @description Advanced card system that morphs, splits, merges, and transforms
 * Based on visual_codex systems but evolved for EPO presentation
 */

import { EPOContentManager } from './EPOContentManager.js';

export class AdaptiveMorphingCards {
    constructor(container, contentManager) {
        this.container = container;
        this.contentManager = contentManager;
        this.cards = new Map();
        this.activeTransitions = new Set();
        this.globalChaos = 0.0;
        this.mousePosition = { x: 0.5, y: 0.5 };
        
        // EPO-specific parameters
        this.epoForces = {
            integration: 0.5,
            dispersion: 0.5,
            information: 0.3,
            consciousness: 0.1
        };
        
        // Visual states mapped to EPO sections
        this.sectionVisualStates = {
            'cover': { geometry: 'cosmic-genesis', density: 8.0, speed: 0.8, color: [1.0, 1.0, 1.0] },
            '1.1': { geometry: 'fracturing-cube', density: 6.0, speed: 0.4, color: [1.0, 0.5, 0.1] },
            '1.2': { geometry: 'void-sphere', density: 2.0, speed: 0.2, color: [0.1, 0.1, 0.8] },
            '1.3': { geometry: 'interference-pattern', density: 5.0, speed: 0.6, color: [1.0, 0.0, 1.0] },
            '2.1': { geometry: 'information-tree', density: 7.0, speed: 0.5, color: [0.0, 1.0, 1.0] },
            '2.2': { geometry: 'dual-hypercube', density: 6.0, speed: 0.7, color: [0.5, 0.0, 1.0] },
            '2.3': { geometry: 'mobius-topology', density: 5.0, speed: 0.3, color: [1.0, 1.0, 0.0] },
            '6.1': { geometry: 'spacetime-manifold', density: 9.0, speed: 0.9, color: [0.8, 0.8, 1.0] },
            '11.2': { geometry: 'consciousness-web', density: 10.0, speed: 1.0, color: [1.0, 0.8, 1.0] }
        };
        
        console.log('🃏 Adaptive Morphing Cards initialized');
        this.initialize();
    }
    
    async initialize() {
        this.setupEventListeners();
        await this.createInitialCard();
        this.startAnimationLoop();
        console.log('✅ Card system ready for EPO presentation');
    }
    
    setupEventListeners() {
        // Mouse tracking for global interaction
        this.container.addEventListener('mousemove', (event) => {
            const rect = this.container.getBoundingClientRect();
            this.mousePosition.x = (event.clientX - rect.left) / rect.width;
            this.mousePosition.y = (event.clientY - rect.top) / rect.height;
            
            this.updateGlobalInteraction();
        });
        
        // Touch support
        this.container.addEventListener('touchmove', (event) => {
            event.preventDefault();
            const touch = event.touches[0];
            const rect = this.container.getBoundingClientRect();
            this.mousePosition.x = (touch.clientX - rect.left) / rect.width;
            this.mousePosition.y = (touch.clientY - rect.top) / rect.height;
            
            this.updateGlobalInteraction();
        });
        
        // Resize handling
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }
    
    async createInitialCard() {
        const coverCard = await this.createCard('cover', {
            position: { x: 0.5, y: 0.5 },
            size: { width: 0.8, height: 0.6 },
            zIndex: 10
        });
        
        // Start with cosmic genesis effect
        coverCard.setContent(this.contentManager.getSectionContent('cover'));
        return coverCard;
    }
    
    async createCard(sectionId, options = {}) {
        const cardId = `card-${sectionId}-${Date.now()}`;
        const cardElement = document.createElement('div');
        cardElement.id = cardId;
        cardElement.className = 'epo-morphing-card';
        
        // Apply EPO glassmorphic styling
        this.applyCardStyling(cardElement, sectionId);
        
        // Position card
        this.positionCard(cardElement, options.position, options.size);
        
        // Create WebGL visualizer canvas
        const canvas = document.createElement('canvas');
        canvas.className = 'card-visualizer';
        canvas.id = `${cardId}-visualizer`;
        cardElement.appendChild(canvas);
        
        // Create content overlay
        const contentDiv = document.createElement('div');
        contentDiv.className = 'card-content';
        cardElement.appendChild(contentDiv);
        
        // Add to container
        this.container.appendChild(cardElement);
        
        // Initialize card object
        const card = new EPOMorphingCard(cardId, sectionId, canvas, contentDiv, this);
        await card.initialize();
        
        this.cards.set(cardId, card);
        console.log(`🎴 Created card for section: ${sectionId}`);
        
        return card;
    }
    
    applyCardStyling(element, sectionId) {
        const visualState = this.sectionVisualStates[sectionId];
        const [r, g, b] = visualState.color;
        
        // Enhanced glassmorphic styling based on visual codex
        element.style.cssText = `
            position: absolute;
            backdrop-filter: blur(15px);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            overflow: hidden;
            z-index: 5;
            transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            
            /* Advanced glassmorphic shadows from visual codex */
            box-shadow:
                0 10px 30px rgba(0, 0, 0, 0.3),
                inset 0 1px 1px rgba(255, 255, 255, 0.1),
                0 0 20px rgba(${r * 255}, ${g * 255}, ${b * 255}, 0.3);
            
            /* Professional neoskeuomorphic depth */
            box-shadow:
                5px 5px 10px rgba(10, 10, 28, 0.8),
                -5px -5px 10px rgba(58, 58, 94, 0.3),
                inset 2px 2px 5px rgba(58, 58, 94, 0.2),
                inset -2px -2px 5px rgba(10, 10, 28, 0.8),
                0 0 25px rgba(${r * 255}, ${g * 255}, ${b * 255}, 0.4);
                
            /* EPO-specific gradient overlay */
            background: linear-gradient(135deg,
                rgba(${r * 255}, ${g * 255}, ${b * 255}, 0.1) 0%,
                rgba(255, 255, 255, 0.03) 50%,
                rgba(${r * 255}, ${g * 255}, ${b * 255}, 0.05) 100%
            );
        `;
        
        // Add section-specific class for specialized styling
        element.classList.add(`epo-${sectionId.replace('.', '-')}-card`);
        
        // Dynamic hover effects
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'translateY(-3px) scale(1.02)';
            element.style.boxShadow = `
                7px 7px 14px rgba(10, 10, 28, 0.9),
                -7px -7px 14px rgba(58, 58, 94, 0.4),
                inset 3px 3px 7px rgba(58, 58, 94, 0.3),
                inset -3px -3px 7px rgba(10, 10, 28, 0.9),
                0 0 35px rgba(${r * 255}, ${g * 255}, ${b * 255}, 0.6)
            `;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translateY(0) scale(1)';
            element.style.boxShadow = `
                5px 5px 10px rgba(10, 10, 28, 0.8),
                -5px -5px 10px rgba(58, 58, 94, 0.3),
                inset 2px 2px 5px rgba(58, 58, 94, 0.2),
                inset -2px -2px 5px rgba(10, 10, 28, 0.8),
                0 0 25px rgba(${r * 255}, ${g * 255}, ${b * 255}, 0.4)
            `;
        });
    }
    
    positionCard(element, position = { x: 0.5, y: 0.5 }, size = { width: 0.4, height: 0.3 }) {
        const containerRect = this.container.getBoundingClientRect();
        
        element.style.left = `${(position.x - size.width/2) * 100}%`;
        element.style.top = `${(position.y - size.height/2) * 100}%`;
        element.style.width = `${size.width * 100}%`;
        element.style.height = `${size.height * 100}%`;
    }
    
    // TRANSITION EFFECTS
    
    async bigBangExplosion(sourceCard = null) {
        console.log('💥 Executing Big Bang explosion transition');
        
        this.globalChaos = 1.0;
        
        // Create explosion particles
        const particles = await this.createExplosionParticles(sourceCard);
        
        // Animate explosion
        if (sourceCard) {
            sourceCard.setParameter('explosion_time', 0);
            sourceCard.setParameter('particle_count', 10000);
            await this.animateParameter(sourceCard, 'explosion_time', 0, 1, 3000);
        } else {
            // Create explosion effect without source card
            await this.createGlobalExplosionEffect();
        }
        
        // After explosion, create new cards from particles
        setTimeout(async () => {
            await this.createCardsFromParticles(particles);
            this.globalChaos = 0.5;
        }, 3000);
        
        return particles;
    }

    async createExplosionParticles(sourceCard) {
        console.log('✨ Creating explosion particles');
        const particles = [];
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = {
                x: 0.5 + (Math.random() - 0.5) * 0.1,
                y: 0.5 + (Math.random() - 0.5) * 0.1,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                life: 1.0,
                size: Math.random() * 0.02 + 0.01
            };
            particles.push(particle);
        }
        
        return particles;
    }

    async createGlobalExplosionEffect() {
        console.log('🌌 Creating global explosion effect');
        // Create visual explosion without a source card
        const explosion = document.createElement('div');
        explosion.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(255,255,255,1) 0%, transparent 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 1000;
            animation: bigBangExplosion 3s ease-out forwards;
        `;
        
        document.body.appendChild(explosion);
        
        // Add CSS animation if not exists
        if (!document.querySelector('#bigBangAnimation')) {
            const style = document.createElement('style');
            style.id = 'bigBangAnimation';
            style.textContent = `
                @keyframes bigBangExplosion {
                    0% { width: 20px; height: 20px; opacity: 1; }
                    50% { width: 2000px; height: 2000px; opacity: 0.8; }
                    100% { width: 5000px; height: 5000px; opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => explosion.remove(), 3000);
    }

    async createCardsFromParticles(particles) {
        console.log('🃏 Creating cards from explosion particles');
        // Create title card from settled particles
        const titleCard = await this.createCard('cover', {
            position: { x: 0.5, y: 0.5 },
            size: { width: 0.8, height: 0.6 }
        });
        return [titleCard];
    }
    
    async paradigmFracture(sourceCard, stressPoints = []) {
        console.log('🔧 Executing paradigm fracture transition');
        
        if (sourceCard) {
            sourceCard.setParameter('fracture_progress', 0);
            sourceCard.setParameter('stress_points', stressPoints);
            
            // Create crack patterns
            await this.animateParameter(sourceCard, 'fracture_progress', 0, 1, 2500);
            
            // Card shatters and fragments reorganize
            setTimeout(async () => {
                const fragments = await this.shatterCard(sourceCard);
                await this.reorganizeFragments(fragments);
            }, 2500);
        } else {
            // Create paradigm fracture effect without source card
            await this.createFractureEffect(stressPoints);
        }
    }

    async createFractureEffect(stressPoints) {
        console.log('💥 Creating fracture effect');
        // Create visual fracture effect
        stressPoints.forEach((point, index) => {
            setTimeout(() => {
                const crack = document.createElement('div');
                crack.style.cssText = `
                    position: fixed;
                    left: ${point.x * window.innerWidth}px;
                    top: ${point.y * window.innerHeight}px;
                    width: 2px;
                    height: 100px;
                    background: linear-gradient(45deg, rgba(255,100,100,0.8), transparent);
                    transform: translate(-50%, -50%) rotate(${Math.random() * 360}deg);
                    pointer-events: none;
                    z-index: 800;
                    animation: crackExpansion 2s ease-out forwards;
                `;
                
                document.body.appendChild(crack);
                setTimeout(() => crack.remove(), 2000);
            }, index * 200);
        });

        // Add CSS animation if not exists
        if (!document.querySelector('#crackAnimation')) {
            const style = document.createElement('style');
            style.id = 'crackAnimation';
            style.textContent = `
                @keyframes crackExpansion {
                    0% { height: 0; opacity: 1; }
                    100% { height: 200px; opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    async shatterCard(card) {
        console.log('💥 Shattering card into fragments');
        return [card]; // Return fragments - simplified for now
    }

    async reorganizeFragments(fragments) {
        console.log('🔄 Reorganizing fragments');
        // Animation for fragment reorganization
    }
    
    async createUFOCards(count = 5) {
        console.log('🛸 Creating UFO cards for dark matter visualization');
        
        const ufoCards = [];
        
        for (let i = 0; i < count; i++) {
            const card = await this.createCard('1.2', {
                position: { 
                    x: -0.2 + Math.random() * 0.4, 
                    y: -0.2 + Math.random() * 0.4 
                },
                size: { width: 0.2, height: 0.2 }
            });
            
            // UFO flight path
            const flightPath = this.generateUFOFlightPath();
            card.setParameter('flight_path', flightPath);
            card.setParameter('gravitational_lensing', true);
            card.addClass('ufo-card');
            
            // Animate UFO entrance
            this.animateUFOEntrance(card, i * 200);
            
            ufoCards.push(card);
        }
        
        return ufoCards;
    }
    
    async dialecticalDance(epoICard, epoDCard) {
        console.log('🌀 Executing dialectical dance of EPO forces');
        
        const centerX = 0.5;
        const centerY = 0.5;
        const radius = 0.2;
        
        let angle = 0;
        const danceAnimation = () => {
            angle += 0.02;
            
            // EPO-I (Integration) - clockwise
            const iX = centerX + Math.cos(angle) * radius;
            const iY = centerY + Math.sin(angle) * radius;
            this.positionCard(epoICard.element, { x: iX, y: iY }, { width: 0.15, height: 0.15 });
            
            // EPO-D (Dispersion) - counter-clockwise  
            const dX = centerX + Math.cos(-angle) * radius;
            const dY = centerY + Math.sin(-angle) * radius;
            this.positionCard(epoDCard.element, { x: dX, y: dY }, { width: 0.15, height: 0.15 });
            
            // Energy exchange visualization
            const distance = Math.sqrt((iX - dX) ** 2 + (iY - dY) ** 2);
            const energy = 1.0 / (1.0 + distance * 5.0);
            
            epoICard.setParameter('energy_exchange', energy);
            epoDCard.setParameter('energy_exchange', energy);
            
            if (angle < Math.PI * 6) { // 3 full rotations
                requestAnimationFrame(danceAnimation);
            }
        };
        
        danceAnimation();
    }
    
    async portalTransition(sourceCard, destinationSection) {
        console.log(`🌀 Portal transition to ${destinationSection}`);
        
        // Create portal effect
        sourceCard.setParameter('portal_opening', 0);
        await this.animateParameter(sourceCard, 'portal_opening', 0, 1, 1500);
        
        // User gets "sucked in"
        sourceCard.setParameter('depth_pull', 0);
        await this.animateParameter(sourceCard, 'depth_pull', 0, 1, 1000);
        
        // Emerge in new section
        const newCard = await this.createCard(destinationSection, {
            position: { x: 0.5, y: 0.5 },
            size: { width: 0.01, height: 0.01 } // Start tiny
        });
        
        // Expand from portal
        await this.animateCardSize(newCard, { width: 0.01, height: 0.01 }, { width: 0.8, height: 0.6 }, 1200);
        
        // Remove source card
        this.removeCard(sourceCard.id);
        
        return newCard;
    }
    
    async universalConsciousnessIntegration(cards) {
        console.log('🧠 Universal consciousness integration');
        
        // All cards become nodes in cosmic neural network
        const centerCard = cards[0];
        const nodeCards = cards.slice(1);
        
        // Position cards as neural network
        nodeCards.forEach((card, index) => {
            const angle = (index / nodeCards.length) * Math.PI * 2;
            const radius = 0.3;
            const x = 0.5 + Math.cos(angle) * radius;
            const y = 0.5 + Math.sin(angle) * radius;
            
            this.positionCard(card.element, { x, y }, { width: 0.1, height: 0.1 });
            card.setParameter('neural_activity', 0);
            card.setParameter('connection_strength', 0);
        });
        
        // Animate neural firing patterns
        this.animateNeuralNetwork(centerCard, nodeCards);
    }
    
    // UTILITY METHODS
    
    async animateParameter(card, parameter, from, to, duration) {
        return new Promise(resolve => {
            const startTime = Date.now();
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = this.easeInOutCubic(progress);
                const value = from + (to - from) * eased;
                
                card.setParameter(parameter, value);
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            };
            animate();
        });
    }
    
    async animateCardSize(card, fromSize, toSize, duration) {
        return new Promise(resolve => {
            const startTime = Date.now();
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = this.easeInOutCubic(progress);
                
                const width = fromSize.width + (toSize.width - fromSize.width) * eased;
                const height = fromSize.height + (toSize.height - fromSize.height) * eased;
                
                this.positionCard(card.element, card.position, { width, height });
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            };
            animate();
        });
    }
    
    generateUFOFlightPath() {
        const points = [];
        const numPoints = 20;
        
        for (let i = 0; i < numPoints; i++) {
            const t = i / (numPoints - 1);
            const x = -0.3 + t * 1.6 + Math.sin(t * Math.PI * 3) * 0.2;
            const y = 0.2 + Math.sin(t * Math.PI) * 0.6;
            points.push({ x, y, t });
        }
        
        return points;
    }
    
    async animateUFOEntrance(card, delay = 0) {
        setTimeout(() => {
            card.setParameter('ufo_entrance', 0);
            this.animateParameter(card, 'ufo_entrance', 0, 1, 2000);
        }, delay);
    }
    
    updateGlobalInteraction() {
        // Update all cards with global mouse position
        this.cards.forEach(card => {
            card.setParameter('global_mouse_x', this.mousePosition.x);
            card.setParameter('global_mouse_y', this.mousePosition.y);
        });
    }
    
    setEPOForces(integration, dispersion, information, consciousness) {
        this.epoForces = { integration, dispersion, information, consciousness };
        
        // Update all cards with new EPO parameters
        this.cards.forEach(card => {
            card.setParameter('epo_integration', integration);
            card.setParameter('epo_dispersion', dispersion);
            card.setParameter('information_density', information);
            card.setParameter('consciousness_level', consciousness);
        });
    }
    
    removeCard(cardId) {
        const card = this.cards.get(cardId);
        if (card) {
            card.destroy();
            this.cards.delete(cardId);
            console.log(`🗑️ Removed card: ${cardId}`);
        }
    }
    
    handleResize() {
        this.cards.forEach(card => {
            card.handleResize();
        });
    }
    
    startAnimationLoop() {
        const animate = () => {
            this.cards.forEach(card => {
                card.render();
            });
            requestAnimationFrame(animate);
        };
        animate();
    }
    
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    // Navigation methods
    async navigateToSection(sectionId) {
        const currentCard = Array.from(this.cards.values())[0];
        const transitionType = this.getTransitionType(currentCard?.sectionId, sectionId);
        
        switch(transitionType) {
            case 'big-bang':
                return this.bigBangExplosion(currentCard);
            case 'fracture':
                return this.paradigmFracture(currentCard);
            case 'ufo':
                return this.createUFOCards();
            case 'portal':
                return this.portalTransition(currentCard, sectionId);
            case 'dance':
                const epoICard = await this.createCard('2.2-i');
                const epoDCard = await this.createCard('2.2-d');
                return this.dialecticalDance(epoICard, epoDCard);
            default:
                return this.portalTransition(currentCard, sectionId);
        }
    }
    
    getTransitionType(fromSection, toSection) {
        const transitionMap = {
            'cover→1.1': 'big-bang',
            '1.1→1.2': 'fracture',
            '1.2→1.3': 'ufo',
            '2.1→2.2': 'dance',
            '6.1→6.2': 'portal'
        };
        
        return transitionMap[`${fromSection}→${toSection}`] || 'portal';
    }
}

/**
 * Individual EPO Morphing Card Class
 */
class EPOMorphingCard {
    constructor(id, sectionId, canvas, contentElement, parent) {
        this.id = id;
        this.sectionId = sectionId;
        this.canvas = canvas;
        this.contentElement = contentElement;
        this.parent = parent;
        this.element = canvas.parentElement;
        
        this.gl = null;
        this.program = null;
        this.parameters = new Map();
        this.position = { x: 0.5, y: 0.5 };
        
        // Animation state
        this.time = 0;
        this.isAnimating = false;
    }
    
    async initialize() {
        this.initWebGL();
        this.initShaders();
        this.initBuffers();
        this.setupParameters();
        
        console.log(`🎴 Card ${this.id} initialized for section ${this.sectionId}`);
    }
    
    initWebGL() {
        this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
        if (!this.gl) {
            console.error('WebGL not supported');
            return;
        }
        
        this.handleResize();
    }
    
    initShaders() {
        const vertexShaderSource = `
            attribute vec2 a_position;
            void main() {
                gl_Position = vec4(a_position, 0.0, 1.0);
            }
        `;
        
        const fragmentShaderSource = this.getFragmentShader();
        
        const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource);
        
        this.program = this.createProgram(vertexShader, fragmentShader);
        this.gl.useProgram(this.program);
    }
    
    getFragmentShader() {
        const visualState = this.parent.sectionVisualStates[this.sectionId];
        
        return `
            precision highp float;
            
            uniform vec2 u_resolution;
            uniform float u_time;
            uniform vec2 u_mouse;
            
            // EPO Parameters
            uniform float u_epo_integration;
            uniform float u_epo_dispersion;
            uniform float u_information_density;
            uniform float u_consciousness_level;
            
            // Section-specific parameters
            uniform float u_fracture_progress;
            uniform float u_explosion_time;
            uniform float u_portal_opening;
            uniform float u_neural_activity;
            uniform float u_ufo_entrance;
            
            // Color and visual state
            uniform vec3 u_section_color;
            uniform float u_chaos_intensity;
            
            ${this.getGeometryFunctions()}
            
            ${this.getEffectFunctions()}
            
            void main() {
                vec2 uv = gl_FragCoord.xy / u_resolution.xy;
                vec3 color = vec3(0.0);
                
                ${this.getSectionSpecificLogic()}
                
                gl_FragColor = vec4(color, 0.95);
            }
        `;
    }
    
    getGeometryFunctions() {
        return `
            // 4D Hypercube projection
            vec3 project4Dto3D(vec4 p4) {
                float w = 3.0 + p4.w;
                return p4.xyz / w;
            }
            
            // Hypercube lattice
            float hypercubeLattice(vec3 p, float density) {
                vec3 grid = fract(p * density) - 0.5;
                float d = length(max(abs(grid) - 0.3, 0.0));
                return smoothstep(0.1, 0.0, d);
            }
            
            // Fractal tree for information visualization
            float informationTree(vec2 uv, float branch_factor) {
                float d = 1.0;
                vec2 p = uv;
                
                for(int i = 0; i < 5; i++) {
                    p = abs(p) - 0.3;
                    p = p.x < p.y ? p.yx : p.xy;
                    d = min(d, length(p) - 0.1 * branch_factor);
                }
                
                return smoothstep(0.02, 0.0, d);
            }
            
            // Consciousness web pattern
            float consciousnessWeb(vec2 uv, float activity) {
                float pattern = 0.0;
                vec2 center = vec2(0.5);
                
                for(int i = 0; i < 8; i++) {
                    float angle = float(i) * 0.785398; // π/4
                    vec2 dir = vec2(cos(angle), sin(angle));
                    vec2 line = center + dir * 0.3;
                    
                    float dist = distance(uv, line);
                    pattern += exp(-dist * 10.0) * activity;
                }
                
                return pattern;
            }
        `;
    }
    
    getEffectFunctions() {
        return `
            // Fracture effect with Voronoi patterns
            float fracturePattern(vec2 uv, float progress) {
                vec2 cell = floor(uv * 8.0);
                vec2 f = fract(uv * 8.0);
                
                float minDist = 1.0;
                for(int i = -1; i <= 1; i++) {
                    for(int j = -1; j <= 1; j++) {
                        vec2 neighbor = vec2(float(i), float(j));
                        vec2 point = neighbor + sin(cell + neighbor + u_time) * 0.5 + 0.5;
                        float dist = length(point - f);
                        minDist = min(minDist, dist);
                    }
                }
                
                return step(progress * 0.3, minDist);
            }
            
            // Portal/wormhole effect
            vec3 portalEffect(vec2 uv, float opening) {
                vec2 center = vec2(0.5);
                float dist = distance(uv, center);
                float angle = atan(uv.y - center.y, uv.x - center.x);
                
                float spiral = sin(angle * 8.0 + dist * 20.0 - u_time * 5.0) * 0.5 + 0.5;
                float tunnel = smoothstep(opening, opening + 0.1, dist);
                
                return vec3(spiral * (1.0 - tunnel));
            }
            
            // UFO gravitational lensing
            vec3 gravitationalLensing(vec2 uv, vec2 ufo_pos) {
                float dist = distance(uv, ufo_pos);
                float lensing = 1.0 / (1.0 + dist * 5.0);
                
                vec2 lensed_uv = uv + (ufo_pos - uv) * lensing * 0.1;
                return vec3(lensed_uv, lensing);
            }
            
            // Explosion particles
            vec3 explosionParticles(vec2 uv, float time) {
                vec3 color = vec3(0.0);
                
                for(int i = 0; i < 20; i++) {
                    float fi = float(i);
                    vec2 seed = vec2(fi * 0.1, fi * 0.2);
                    vec2 particlePos = vec2(0.5) + (sin(seed + time) * 0.5) * time;
                    
                    float dist = distance(uv, particlePos);
                    float particle = exp(-dist * 20.0);
                    
                    color += particle * vec3(1.0, 0.8, 0.6);
                }
                
                return color;
            }
        `;
    }
    
    getSectionSpecificLogic() {
        switch(this.sectionId) {
            case 'cover':
                return `
                    // Big Bang cosmic genesis
                    if(u_explosion_time > 0.0) {
                        color = explosionParticles(uv, u_explosion_time);
                    } else {
                        color = vec3(hypercubeLattice(vec3(uv * 5.0, u_time * 0.1), u_information_density * 10.0));
                        color *= u_section_color;
                    }
                `;
                
            case '1.1':
                return `
                    // Paradigm fracture
                    float fracture = fracturePattern(uv, u_fracture_progress);
                    color = mix(u_section_color, vec3(0.0), 1.0 - fracture);
                    
                    // Add stress visualization
                    float stress = hypercubeLattice(vec3(uv * 3.0, u_time * 0.05), 5.0);
                    color += stress * vec3(1.0, 0.2, 0.1) * u_fracture_progress;
                `;
                
            case '1.2':
                return `
                    // Dark matter void with UFO cards
                    if(u_ufo_entrance > 0.0) {
                        vec3 lensing = gravitationalLensing(uv, u_mouse);
                        color = vec3(0.1, 0.1, 0.8) * lensing.z;
                    } else {
                        // 95% empty space
                        color = vec3(0.05) * u_section_color;
                    }
                `;
                
            case '2.1':
                return `
                    // Information primacy - fractal tree
                    float tree = informationTree(uv, u_information_density);
                    color = tree * u_section_color;
                    
                    // Information flow particles
                    float flow = sin(uv.x * 10.0 + u_time) * sin(uv.y * 8.0 + u_time * 1.5);
                    color += flow * 0.1 * vec3(0.0, 1.0, 1.0);
                `;
                
            case '2.2':
                return `
                    // Entropic duality - dual forces
                    vec2 center = vec2(0.5);
                    float integration = 1.0 / (1.0 + distance(uv, center) * 3.0);
                    float dispersion = distance(uv, center);
                    
                    vec3 epo_i_color = vec3(0.0, 0.7, 1.0) * integration * u_epo_integration;
                    vec3 epo_d_color = vec3(1.0, 0.3, 0.1) * dispersion * u_epo_dispersion;
                    
                    color = epo_i_color + epo_d_color;
                `;
                
            case '6.1':
                return `
                    // Spacetime emergence
                    if(u_portal_opening > 0.0) {
                        color = portalEffect(uv, u_portal_opening);
                    } else {
                        // 4D hypercube manifold
                        vec4 p4 = vec4(uv * 2.0 - 1.0, sin(u_time), cos(u_time));
                        vec3 p3 = project4Dto3D(p4);
                        float manifold = hypercubeLattice(p3, 8.0);
                        color = manifold * u_section_color;
                    }
                `;
                
            case '11.2':
                return `
                    // Universal consciousness
                    float web = consciousnessWeb(uv, u_neural_activity);
                    color = web * u_section_color;
                    
                    // Pulsing awareness
                    float pulse = sin(u_time * 2.0) * 0.5 + 0.5;
                    color *= (0.7 + 0.3 * pulse) * u_consciousness_level;
                `;
                
            default:
                return `
                    color = u_section_color * 0.5;
                `;
        }
    }
    
    createShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error('Shader compilation error:', this.gl.getShaderInfoLog(shader));
            this.gl.deleteShader(shader);
            return null;
        }
        
        return shader;
    }
    
    createProgram(vertexShader, fragmentShader) {
        const program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);
        
        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            console.error('Program linking error:', this.gl.getProgramInfoLog(program));
            this.gl.deleteProgram(program);
            return null;
        }
        
        return program;
    }
    
    initBuffers() {
        const positions = new Float32Array([
            -1, -1,
             1, -1,
            -1,  1,
             1,  1
        ]);
        
        const buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);
        
        const positionLocation = this.gl.getAttribLocation(this.program, 'a_position');
        this.gl.enableVertexAttribArray(positionLocation);
        this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);
    }
    
    setupParameters() {
        const visualState = this.parent.sectionVisualStates[this.sectionId];
        
        // Set default parameters
        this.setParameter('section_color', visualState.color);
        this.setParameter('chaos_intensity', 0);
        this.setParameter('time', 0);
        this.setParameter('mouse', [0.5, 0.5]);
        
        // EPO force parameters
        this.setParameter('epo_integration', this.parent.epoForces.integration);
        this.setParameter('epo_dispersion', this.parent.epoForces.dispersion);
        this.setParameter('information_density', this.parent.epoForces.information);
        this.setParameter('consciousness_level', this.parent.epoForces.consciousness);
    }
    
    setParameter(name, value) {
        this.parameters.set(name, value);
        
        // Update uniform if WebGL is ready
        if (this.gl && this.program) {
            const location = this.gl.getUniformLocation(this.program, `u_${name}`);
            if (location) {
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
        }
    }
    
    setContent(content) {
        this.contentElement.innerHTML = content || `
            <div class="card-title">${this.sectionId.toUpperCase()}</div>
            <div class="card-description">EPO Section Content</div>
        `;
    }
    
    addClass(className) {
        this.element.classList.add(className);
    }
    
    render() {
        if (!this.gl || !this.program) return;
        
        this.time += 0.016; // ~60fps
        this.setParameter('time', this.time);
        
        // Update resolution
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;
        this.setParameter('resolution', [width, height]);
        
        // Clear and draw
        this.gl.viewport(0, 0, width, height);
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }
    
    handleResize() {
        if (!this.canvas) return;
        
        const rect = this.element.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
    }
    
    destroy() {
        if (this.gl) {
            this.gl.deleteProgram(this.program);
        }
        if (this.element && this.element.parentElement) {
            this.element.parentElement.removeChild(this.element);
        }
    }
}
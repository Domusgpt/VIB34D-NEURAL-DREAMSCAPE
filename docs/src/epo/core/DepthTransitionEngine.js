/**
 * @file DepthTransitionEngine.js
 * @description Creates immersive depth transitions where user gets pulled into background
 * User transitions from surface narrative into deep mathematical/conceptual space
 */

export class DepthTransitionEngine {
    constructor(canvas, emergenceEngine, presentationSystem) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.emergenceEngine = emergenceEngine;
        this.presentationSystem = presentationSystem;
        
        // Depth state
        this.currentDepth = 0;     // 0 = surface, 1 = deep
        this.targetDepth = 0;
        this.transitionProgress = 0;
        this.isTransitioning = false;
        
        // Visual layers for depth
        this.surfaceLayer = null;
        this.depthLayer = null;
        this.particleField = [];
        
        // Camera system for depth illusion
        this.camera = {
            position: { x: 0, y: 0, z: 0 },
            target: { x: 0, y: 0, z: 0 },
            fov: 75,
            near: 0.1,
            far: 1000
        };
        
        // Depth content mapping
        this.depthContent = {
            'cover': {
                surface: 'The Entropic Principle of Organization',
                depth: {
                    mathematical: 'F_EPO = -ζ_i∇U_i + ζ_d∇U_d',
                    conceptual: 'Information → Structure → Consciousness',
                    philosophical: 'Reality = Self-Observing Information System'
                }
            },
            '1.1': {
                surface: 'Materialist-Mechanistic Crisis',
                depth: {
                    mathematical: '∇²φ = 4πGρ_missing',
                    conceptual: '95% Unknown → Information Substrate',
                    philosophical: 'Things → Processes'
                }
            },
            '2.1': {
                surface: 'Information Primacy',
                depth: {
                    mathematical: 'I = -Σp_i log(p_i)',
                    conceptual: 'Bit → It → Conscious Observer',
                    philosophical: 'Wheeler\'s "It from Bit" Realized'
                }
            },
            '2.2': {
                surface: 'Entropic Duality',
                depth: {
                    mathematical: 'ΔS_universe = ΔS_integration + ΔS_dispersion = 0',
                    conceptual: 'Order ⇌ Chaos → Dynamic Balance',
                    philosophical: 'Cosmic Dialectic Engine'
                }
            }
        };
        
        console.log('🔍 Depth Transition Engine initialized');
    }
    
    async enterDepth(sectionId, triggerPoint = { x: 0.5, y: 0.5 }) {
        if (this.isTransitioning) return;
        
        console.log(`🌊 Entering depth for section: ${sectionId}`);
        this.isTransitioning = true;
        this.targetDepth = 1;
        
        // Get depth content for this section
        const content = this.depthContent[sectionId] || this.depthContent['cover'];
        
        // Create particle tunnel effect
        await this.createParticleTunnel(triggerPoint);
        
        // Transition camera into depth
        await this.animateCameraIntoDepth();
        
        // Reveal deep content layers
        await this.revealDepthContent(content);
        
        // Update presentation state
        this.currentDepth = 1;
        this.isTransitioning = false;
        
        // Enable depth navigation
        this.enableDepthNavigation();
    }
    
    async exitDepth() {
        if (this.isTransitioning) return;
        
        console.log('🔍 Exiting depth mode');
        this.isTransitioning = true;
        this.targetDepth = 0;
        
        // Fade out depth content
        await this.fadeDepthContent();
        
        // Animate camera back to surface
        await this.animateCameraToSurface();
        
        // Dissolve particle tunnel
        await this.dissolveParticleTunnel();
        
        // Update presentation state
        this.currentDepth = 0;
        this.isTransitioning = false;
        
        // Disable depth navigation
        this.disableDepthNavigation();
    }
    
    async createParticleTunnel(triggerPoint) {
        console.log('🌪️ Creating particle tunnel...');
        
        // Clear existing particles
        this.particleField = [];
        
        // Create tunnel of particles leading into depth
        const particleCount = 200;
        const tunnelLength = 500;
        
        for (let i = 0; i < particleCount; i++) {
            const progress = i / particleCount;
            const angle = progress * Math.PI * 8; // Spiral effect
            const radius = 50 + progress * 100;   // Expanding tunnel
            const z = progress * tunnelLength;    // Depth progression
            
            const particle = {
                id: `tunnel_${i}`,
                position: {
                    x: triggerPoint.x * this.canvas.width + Math.cos(angle) * radius,
                    y: triggerPoint.y * this.canvas.height + Math.sin(angle) * radius,
                    z: z
                },
                velocity: { x: 0, y: 0, z: 5 },
                size: 2 + progress * 3,
                opacity: 1 - progress * 0.5,
                color: this.getDepthParticleColor(progress),
                type: 'tunnel'
            };
            
            this.particleField.push(particle);
        }
        
        // Animate tunnel formation
        return new Promise(resolve => {
            let formationProgress = 0;
            const formationSpeed = 0.02;
            
            const animate = () => {
                formationProgress += formationSpeed;
                
                // Update tunnel particles
                this.updateTunnelParticles(formationProgress);
                this.renderTunnelParticles();
                
                if (formationProgress >= 1.0) {
                    resolve();
                } else {
                    requestAnimationFrame(animate);
                }
            };
            
            animate();
        });
    }
    
    getDepthParticleColor(progress) {
        // Color transition from surface (blue) to depth (golden)
        const r = Math.floor(100 + progress * 155); // 100 → 255
        const g = Math.floor(200 + progress * 55);  // 200 → 255
        const b = Math.floor(255 - progress * 200); // 255 → 55
        
        return `rgb(${r}, ${g}, ${b})`;
    }
    
    updateTunnelParticles(formationProgress) {
        this.particleField.forEach((particle, index) => {
            if (particle.type === 'tunnel') {
                // Move particles deeper
                particle.position.z += particle.velocity.z;
                
                // Add spiral motion
                const spiralSpeed = 0.05;
                const centerX = this.canvas.width * 0.5;
                const centerY = this.canvas.height * 0.5;
                
                const currentRadius = Math.sqrt(
                    Math.pow(particle.position.x - centerX, 2) + 
                    Math.pow(particle.position.y - centerY, 2)
                );
                
                const currentAngle = Math.atan2(
                    particle.position.y - centerY,
                    particle.position.x - centerX
                ) + spiralSpeed;
                
                particle.position.x = centerX + Math.cos(currentAngle) * currentRadius;
                particle.position.y = centerY + Math.sin(currentAngle) * currentRadius;
                
                // Fade based on formation progress
                particle.opacity = (1 - index / this.particleField.length) * formationProgress;
            }
        });
    }
    
    renderTunnelParticles() {
        this.ctx.save();
        
        // Sort particles by z-depth for proper rendering
        const sortedParticles = [...this.particleField].sort((a, b) => b.position.z - a.position.z);
        
        sortedParticles.forEach(particle => {
            if (particle.type === 'tunnel') {
                // Project 3D position to 2D screen
                const scale = this.camera.near / (this.camera.near + particle.position.z);
                const screenX = particle.position.x;
                const screenY = particle.position.y;
                const screenSize = particle.size * scale;
                
                // Render particle with depth effects
                this.ctx.globalAlpha = particle.opacity;
                this.ctx.fillStyle = particle.color;
                this.ctx.shadowBlur = 10 * scale;
                this.ctx.shadowColor = particle.color;
                
                this.ctx.beginPath();
                this.ctx.arc(screenX, screenY, screenSize, 0, Math.PI * 2);
                this.ctx.fill();
            }
        });
        
        this.ctx.restore();
    }
    
    async animateCameraIntoDepth() {
        console.log('📹 Animating camera into depth...');
        
        return new Promise(resolve => {
            const startPos = { ...this.camera.position };
            const targetPos = { x: 0, y: 0, z: 300 };
            const duration = 2000; // 2 seconds
            const startTime = Date.now();
            
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Smooth easing
                const eased = 1 - Math.pow(1 - progress, 3);
                
                // Interpolate camera position
                this.camera.position.x = startPos.x + (targetPos.x - startPos.x) * eased;
                this.camera.position.y = startPos.y + (targetPos.y - startPos.y) * eased;
                this.camera.position.z = startPos.z + (targetPos.z - startPos.z) * eased;
                
                // Update field of view for depth effect
                this.camera.fov = 75 + progress * 25; // 75° → 100°
                
                if (progress >= 1.0) {
                    resolve();
                } else {
                    requestAnimationFrame(animate);
                }
            };
            
            animate();
        });
    }
    
    async revealDepthContent(content) {
        console.log('📜 Revealing depth content...');
        
        // Create depth content layers
        const depthContainer = document.createElement('div');
        depthContainer.className = 'depth-content-container';
        depthContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 50;
            pointer-events: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 60px;
        `;
        
        // Mathematical layer
        const mathLayer = this.createDepthLayer(
            'mathematical',
            content.depth.mathematical,
            'mathematical-depth'
        );
        
        // Conceptual layer
        const conceptLayer = this.createDepthLayer(
            'conceptual',
            content.depth.conceptual,
            'conceptual-depth'
        );
        
        // Philosophical layer
        const philosophicalLayer = this.createDepthLayer(
            'philosophical',
            content.depth.philosophical,
            'philosophical-depth'
        );
        
        depthContainer.appendChild(mathLayer);
        depthContainer.appendChild(conceptLayer);
        depthContainer.appendChild(philosophicalLayer);
        
        document.body.appendChild(depthContainer);
        this.depthLayer = depthContainer;
        
        // Animate layers appearing
        await this.animateDepthLayersIn([mathLayer, conceptLayer, philosophicalLayer]);
    }
    
    createDepthLayer(type, content, className) {
        const layer = document.createElement('div');
        layer.className = `depth-layer ${className}`;
        layer.style.cssText = `
            opacity: 0;
            transform: translateZ(-200px) rotateX(45deg);
            transition: all 1s ease-out;
            text-align: center;
            padding: 30px;
            background: rgba(0, 0, 0, 0.8);
            border-radius: 15px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(20px);
            max-width: 80vw;
        `;
        
        const typeLabel = document.createElement('div');
        typeLabel.textContent = type.toUpperCase();
        typeLabel.style.cssText = `
            font-family: 'Orbitron', monospace;
            font-size: 16px;
            color: #64c8ff;
            margin-bottom: 15px;
            letter-spacing: 3px;
        `;
        
        const contentDiv = document.createElement('div');
        contentDiv.textContent = content;
        contentDiv.style.cssText = `
            font-family: ${type === 'mathematical' ? "'Source Code Pro', monospace" : "'Crimson Text', serif"};
            font-size: ${type === 'mathematical' ? '24px' : '20px'};
            color: white;
            line-height: 1.6;
        `;
        
        layer.appendChild(typeLabel);
        layer.appendChild(contentDiv);
        
        return layer;
    }
    
    async animateDepthLayersIn(layers) {
        return new Promise(resolve => {
            layers.forEach((layer, index) => {
                setTimeout(() => {
                    layer.style.opacity = '1';
                    layer.style.transform = 'translateZ(0px) rotateX(0deg)';
                    
                    if (index === layers.length - 1) {
                        setTimeout(resolve, 1000);
                    }
                }, index * 500);
            });
        });
    }
    
    async fadeDepthContent() {
        if (!this.depthLayer) return;
        
        return new Promise(resolve => {
            this.depthLayer.style.transition = 'all 1s ease-out';
            this.depthLayer.style.opacity = '0';
            this.depthLayer.style.transform = 'translateZ(-300px) rotateX(-45deg)';
            
            setTimeout(() => {
                if (this.depthLayer && this.depthLayer.parentElement) {
                    this.depthLayer.parentElement.removeChild(this.depthLayer);
                    this.depthLayer = null;
                }
                resolve();
            }, 1000);
        });
    }
    
    async animateCameraToSurface() {
        console.log('📹 Animating camera back to surface...');
        
        return new Promise(resolve => {
            const startPos = { ...this.camera.position };
            const targetPos = { x: 0, y: 0, z: 0 };
            const duration = 1500;
            const startTime = Date.now();
            
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Smooth easing
                const eased = 1 - Math.pow(1 - progress, 2);
                
                // Interpolate camera position
                this.camera.position.x = startPos.x + (targetPos.x - startPos.x) * eased;
                this.camera.position.y = startPos.y + (targetPos.y - startPos.y) * eased;
                this.camera.position.z = startPos.z + (targetPos.z - startPos.z) * eased;
                
                // Reset field of view
                this.camera.fov = 100 - progress * 25; // 100° → 75°
                
                if (progress >= 1.0) {
                    resolve();
                } else {
                    requestAnimationFrame(animate);
                }
            };
            
            animate();
        });
    }
    
    async dissolveParticleTunnel() {
        console.log('🌪️ Dissolving particle tunnel...');
        
        return new Promise(resolve => {
            let dissolveProgress = 0;
            const dissolveSpeed = 0.03;
            
            const animate = () => {
                dissolveProgress += dissolveSpeed;
                
                // Fade out tunnel particles
                this.particleField.forEach(particle => {
                    if (particle.type === 'tunnel') {
                        particle.opacity *= (1 - dissolveSpeed);
                        particle.velocity.z *= 1.1; // Accelerate away
                    }
                });
                
                this.renderTunnelParticles();
                
                if (dissolveProgress >= 1.0) {
                    this.particleField = [];
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    resolve();
                } else {
                    requestAnimationFrame(animate);
                }
            };
            
            animate();
        });
    }
    
    enableDepthNavigation() {
        // Add depth-specific keyboard controls
        this.depthKeyHandler = (event) => {
            switch(event.key) {
                case 'Escape':
                    this.exitDepth();
                    break;
                case '1':
                    this.focusOnLayer('mathematical');
                    break;
                case '2':
                    this.focusOnLayer('conceptual');
                    break;
                case '3':
                    this.focusOnLayer('philosophical');
                    break;
            }
        };
        
        document.addEventListener('keydown', this.depthKeyHandler);
    }
    
    disableDepthNavigation() {
        if (this.depthKeyHandler) {
            document.removeEventListener('keydown', this.depthKeyHandler);
            this.depthKeyHandler = null;
        }
    }
    
    focusOnLayer(layerType) {
        const targetLayer = document.querySelector(`.${layerType}-depth`);
        if (targetLayer) {
            // Highlight focused layer
            document.querySelectorAll('.depth-layer').forEach(layer => {
                layer.style.transform = 'scale(0.8) translateZ(-100px)';
                layer.style.opacity = '0.5';
            });
            
            targetLayer.style.transform = 'scale(1.2) translateZ(50px)';
            targetLayer.style.opacity = '1';
            targetLayer.style.border = '3px solid #64c8ff';
            targetLayer.style.boxShadow = '0 0 30px rgba(100, 200, 255, 0.8)';
        }
    }
    
    // PUBLIC API
    
    async triggerDepthTransition(sectionId, triggerPoint) {
        if (this.currentDepth === 0) {
            await this.enterDepth(sectionId, triggerPoint);
        } else {
            await this.exitDepth();
        }
    }
    
    getCurrentDepth() {
        return this.currentDepth;
    }
    
    isInDepthMode() {
        return this.currentDepth > 0;
    }
    
    destroy() {
        this.disableDepthNavigation();
        
        if (this.depthLayer && this.depthLayer.parentElement) {
            this.depthLayer.parentElement.removeChild(this.depthLayer);
        }
        
        this.particleField = [];
        
        console.log('🧹 Depth Transition Engine destroyed');
    }
}
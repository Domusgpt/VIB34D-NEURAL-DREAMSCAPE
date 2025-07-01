/**
 * @file EPOPresentationSystem.js
 * @description Complete EPO Presentation System
 * Orchestrates cards, emergence visualization, and depth transitions
 * Based on visual codex systems and EPO presentation plan
 */

import { AdaptiveMorphingCards } from './core/AdaptiveMorphingCards.js';
import { EmergenceVisualizationEngine } from './core/EmergenceVisualizationEngine.js';
import { EPOContentManager } from './core/EPOContentManager.js';

export class EPOPresentationSystem {
    constructor(container) {
        this.container = container;
        this.contentManager = null;
        this.morphingCards = null;
        this.emergenceEngine = null;
        
        // Presentation state
        this.currentSection = 'cover';
        this.presentationMode = 'cards'; // 'cards', 'emergence', 'hybrid', 'depth'
        this.isNavigating = false;
        this.depthLevel = 0;
        
        // Visual layers
        this.backgroundCanvas = null;
        this.cardCanvas = null;
        this.overlayCanvas = null;
        
        // EPO narrative sections mapping
        this.narrativeSections = {
            'cover': {
                title: 'The Entropic Principle of Organization',
                subtitle: 'A Framework for Informational Physics and Emergent Reality',
                emergence: 0, // Quantum level
                transition: 'big-bang-explosion',
                depth: 'cosmic-genesis',
                visualStyle: 'cosmic-overview'
            },
            '1.1': {
                title: 'The Limits of the Materialist-Mechanistic Paradigm',
                emergence: 2, // Atomic level - things falling apart
                transition: 'paradigm-fracture',
                depth: 'paradigm-breaking',
                visualStyle: 'fracturing-reality'
            },
            '1.2': {
                title: 'The ΛCDM Crisis: Symptoms of a Deeper Failure',
                emergence: 13, // Galaxy clusters - 95% missing matter
                transition: 'dark-matter-visualization',
                depth: 'cosmic-void',
                visualStyle: 'invisible-halos'
            },
            '1.3': {
                title: 'The Unification Impasse',
                emergence: 1, // Particle level - incompatible theories
                transition: 'interference-pattern',
                depth: 'quantum-classical-divide',
                visualStyle: 'wave-particle-conflict'
            },
            '2.1': {
                title: 'Axiom I: The Primacy of Information',
                emergence: 4, // Macromolecular - complex information
                transition: 'information-crystallization',
                depth: 'information-substrate',
                visualStyle: 'data-streams'
            },
            '2.2': {
                title: 'Axiom II: The Principle of Entropic Duality',
                emergence: 8, // Organism level - dual forces
                transition: 'dialectical-dance',
                depth: 'force-visualization',
                visualStyle: 'dual-spiral'
            },
            '2.3': {
                title: 'Axiom III: The Universe as a Closed System',
                emergence: 15, // Universal consciousness
                transition: 'consciousness-expansion',
                depth: 'self-reference',
                visualStyle: 'ouroboros-loop'
            },
            '6.1': {
                title: 'The Emergence of Spacetime and Gravity',
                emergence: 11, // Planetary - spacetime curvature
                transition: 'spacetime-crystallization',
                depth: 'geometric-emergence',
                visualStyle: 'manifold-formation'
            },
            '7.2': {
                title: 'Quantum Mechanics: Cascading Phase Shifts',
                emergence: 1, // Quantum level
                transition: 'wave-collapse',
                depth: 'measurement-cascade',
                visualStyle: 'probability-collapse'
            },
            '9': {
                title: 'The Decisive Test: The Bullet Cluster',
                emergence: 14, // Galaxy cluster collision
                transition: 'cosmic-collision',
                depth: 'observational-evidence',
                visualStyle: 'bullet-cluster-viz'
            },
            '11.2': {
                title: 'Consciousness as a Physical Hierarchy',
                emergence: 15, // Universal consciousness
                transition: 'consciousness-integration',
                depth: 'awareness-expansion',
                visualStyle: 'neural-cosmos'
            }
        };
        
        console.log('🎭 EPO Presentation System initialized');
        this.initialize();
    }
    
    async initialize() {
        console.log('🚀 Initializing EPO Presentation System...');
        
        try {
            // Create visual layers
            this.createLayers();
            
            // Initialize content manager
            this.contentManager = new EPOContentManager();
            // Content manager initializes itself in constructor
            
            // Initialize emergence visualization engine
            this.emergenceEngine = new EmergenceVisualizationEngine(this.backgroundCanvas);
            await this.emergenceEngine.initialize();
            
            // Initialize adaptive morphing cards
            this.morphingCards = new AdaptiveMorphingCards(this.cardCanvas, this.contentManager);
            await this.morphingCards.initialize();
            
            // Setup interaction and navigation
            this.setupNavigation();
            this.setupInteraction();
            
            // Start with cover section
            await this.navigateToSection('cover');
            
            console.log('✅ EPO Presentation System ready');
            
        } catch (error) {
            console.error('❌ EPO Presentation System initialization failed:', error);
            throw error;
        }
    }
    
    createLayers() {
        // Background layer - emergence visualization
        this.backgroundCanvas = document.createElement('canvas');
        this.backgroundCanvas.className = 'epo-background-layer';
        this.backgroundCanvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
        `;
        
        // Card layer - morphing cards
        this.cardCanvas = document.createElement('div');
        this.cardCanvas.className = 'epo-card-layer';
        this.cardCanvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10;
            pointer-events: auto;
        `;
        
        // Overlay layer - UI and effects
        this.overlayCanvas = document.createElement('canvas');
        this.overlayCanvas.className = 'epo-overlay-layer';
        this.overlayCanvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 20;
            pointer-events: none;
        `;
        
        // Add layers to container
        this.container.appendChild(this.backgroundCanvas);
        this.container.appendChild(this.cardCanvas);
        this.container.appendChild(this.overlayCanvas);
        
        // Handle resize
        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());
        
        console.log('🎨 Visual layers created');
    }
    
    setupNavigation() {
        // Create navigation controls
        const navContainer = document.createElement('div');
        navContainer.className = 'epo-navigation';
        navContainer.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 100;
            display: flex;
            gap: 15px;
            padding: 15px 25px;
            background: rgba(0, 0, 0, 0.8);
            border-radius: 50px;
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        `;
        
        // Section navigation buttons
        const sections = ['cover', '1.1', '1.2', '1.3', '2.1', '2.2', '2.3', '6.1', '7.2', '9', '11.2'];
        
        sections.forEach(sectionId => {
            const button = document.createElement('button');
            button.textContent = sectionId === 'cover' ? '🌌' : sectionId;
            button.className = 'nav-button';
            button.style.cssText = `
                padding: 8px 12px;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 20px;
                color: white;
                font-family: 'Orbitron', monospace;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.3s ease;
            `;
            
            button.addEventListener('mouseenter', () => {
                button.style.background = 'rgba(255, 255, 255, 0.2)';
                button.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.background = 'rgba(255, 255, 255, 0.1)';
                button.style.transform = 'translateY(0)';
            });
            
            button.addEventListener('click', () => {
                this.navigateToSection(sectionId);
            });
            
            navContainer.appendChild(button);
        });
        
        this.container.appendChild(navContainer);
        this.navContainer = navContainer;
    }
    
    setupInteraction() {
        // Keyboard navigation
        window.addEventListener('keydown', (event) => {
            if (this.isNavigating) return;
            
            switch(event.key) {
                case 'ArrowRight':
                case ' ':
                    event.preventDefault();
                    this.navigateNext();
                    break;
                case 'ArrowLeft':
                    event.preventDefault();
                    this.navigatePrevious();
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    this.enterDepthMode();
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    this.exitDepthMode();
                    break;
                case 'h':
                    this.toggleHybridMode();
                    break;
                case 'e':
                    this.toggleEmergenceMode();
                    break;
                case 'c':
                    this.toggleCardMode();
                    break;
                case 'f':
                    this.toggleFullscreen();
                    break;
            }
        });
        
        // Mouse interaction for depth transitions
        this.cardCanvas.addEventListener('click', (event) => {
            const rect = this.cardCanvas.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;
            
            // Check if clicking on a card for depth transition
            this.handleCardClick(x, y);
        });
        
        // Touch support
        let touchStartY = 0;
        this.container.addEventListener('touchstart', (event) => {
            touchStartY = event.touches[0].clientY;
        });
        
        this.container.addEventListener('touchend', (event) => {
            const touchEndY = event.changedTouches[0].clientY;
            const deltaY = touchStartY - touchEndY;
            
            if (Math.abs(deltaY) > 50) {
                if (deltaY > 0) {
                    this.navigateNext();
                } else {
                    this.navigatePrevious();
                }
            }
        });
    }
    
    async navigateToSection(sectionId) {
        if (this.isNavigating) return;
        
        console.log(`🧭 Navigating to section: ${sectionId}`);
        this.isNavigating = true;
        
        try {
            const section = this.narrativeSections[sectionId];
            if (!section) {
                console.warn(`Section ${sectionId} not found`);
                return;
            }
            
            // Update current section
            const previousSection = this.currentSection;
            this.currentSection = sectionId;
            
            // Synchronize emergence level
            await this.emergenceEngine.transitionToLevel(section.emergence, section.transition);
            
            // Execute appropriate transition
            await this.executeTransition(previousSection, sectionId, section);
            
            // Update EPO forces based on section
            this.updateEPOForces(section);
            
            // Update navigation UI
            this.updateNavigationUI();
            
        } catch (error) {
            console.error(`Navigation to ${sectionId} failed:`, error);
        } finally {
            this.isNavigating = false;
        }
    }
    
    async executeTransition(fromSection, toSection, sectionData) {
        const transitionType = sectionData.transition;
        
        console.log(`🎬 Executing transition: ${transitionType}`);
        
        switch(transitionType) {
            case 'big-bang-explosion':
                await this.bigBangTransition(sectionData);
                break;
                
            case 'paradigm-fracture':
                await this.paradigmFractureTransition(sectionData);
                break;
                
            case 'dark-matter-visualization':
                await this.darkMatterTransition(sectionData);
                break;
                
            case 'dialectical-dance':
                await this.dialecticalDanceTransition(sectionData);
                break;
                
            case 'consciousness-expansion':
                await this.consciousnessExpansionTransition(sectionData);
                break;
                
            case 'spacetime-crystallization':
                await this.spacetimeCrystallizationTransition(sectionData);
                break;
                
            case 'wave-collapse':
                await this.waveCollapseTransition(sectionData);
                break;
                
            case 'cosmic-collision':
                await this.cosmicCollisionTransition(sectionData);
                break;
                
            default:
                await this.defaultTransition(sectionData);
        }
    }
    
    async bigBangTransition(section) {
        // Massive explosion from single point
        await this.morphingCards.bigBangExplosion();
        
        // Emergence visualization shows cosmic genesis
        this.emergenceEngine.setEPOParameters(0.8, 0.2, 1.0);
        
        // Cards reform showing EPO title
        setTimeout(async () => {
            const titleCard = await this.morphingCards.createCard('cover', {
                position: { x: 0.5, y: 0.5 },
                size: { width: 0.9, height: 0.7 }
            });
            titleCard.setContent(this.contentManager.getSectionContent('cover'));
        }, 3000);
    }
    
    async paradigmFractureTransition(section) {
        // Current reality cracks and fractures
        const stressPoints = [
            { x: 0.3, y: 0.4 },
            { x: 0.7, y: 0.6 },
            { x: 0.5, y: 0.2 }
        ];
        
        await this.morphingCards.paradigmFracture(null, stressPoints);
        
        // Emergence shows atomic breakdown
        this.emergenceEngine.setEPOParameters(0.3, 0.7, 0.5);
        
        // New paradigm emerges from fragments
        setTimeout(async () => {
            const newCard = await this.morphingCards.createCard('1.1', {
                position: { x: 0.5, y: 0.5 },
                size: { width: 0.8, height: 0.6 }
            });
            newCard.setContent(this.contentManager.getSectionContent('1.1'));
        }, 2500);
    }
    
    async darkMatterTransition(section) {
        // UFO cards appear showing invisible matter
        const ufoCards = await this.morphingCards.createUFOCards(8);
        
        // Show galaxy cluster with missing matter
        this.emergenceEngine.setEPOParameters(0.4, 0.6, 0.95);
        await this.emergenceEngine.transitionToLevel(14); // Galaxy clusters
        
        // Gravitational lensing effects
        ufoCards.forEach((card, index) => {
            setTimeout(() => {
                card.setParameter('gravitational_lensing', true);
                card.setParameter('dark_matter_halo', 0.95);
            }, index * 200);
        });
    }
    
    async dialecticalDanceTransition(section) {
        // Create EPO-I and EPO-D force cards
        const epoICard = await this.morphingCards.createCard('2.2-i', {
            position: { x: 0.3, y: 0.5 },
            size: { width: 0.3, height: 0.4 }
        });
        
        const epoDCard = await this.morphingCards.createCard('2.2-d', {
            position: { x: 0.7, y: 0.5 },
            size: { width: 0.3, height: 0.4 }
        });
        
        // Execute dialectical dance
        await this.morphingCards.dialecticalDance(epoICard, epoDCard);
        
        // Show organism-level emergence
        this.emergenceEngine.setEPOParameters(0.6, 0.4, 0.8);
        await this.emergenceEngine.transitionToLevel(8);
    }
    
    async consciousnessExpansionTransition(section) {
        // All existing cards become neural nodes
        const existingCards = Array.from(this.morphingCards.cards.values());
        
        // Universal consciousness integration
        await this.morphingCards.universalConsciousnessIntegration(existingCards);
        
        // Maximum consciousness level
        this.emergenceEngine.setEPOParameters(1.0, 0.2, 1.0);
        await this.emergenceEngine.consciousnessExpansion(1.0, 5000);
        await this.emergenceEngine.transitionToLevel(15);
    }
    
    async spacetimeCrystallizationTransition(section) {
        // Show spacetime manifold formation
        await this.emergenceEngine.transitionToLevel(11); // Planetary level
        this.emergenceEngine.setEPOParameters(0.7, 0.3, 0.6);
        
        // Cards show geometric emergence
        const manifoldCard = await this.morphingCards.createCard('6.1', {
            position: { x: 0.5, y: 0.5 },
            size: { width: 0.8, height: 0.6 }
        });
        
        manifoldCard.setParameter('spacetime_curvature', true);
        manifoldCard.setContent(this.contentManager.getSectionContent('6.1'));
    }
    
    async waveCollapseTransition(section) {
        // Quantum wave function collapse visualization
        await this.emergenceEngine.transitionToLevel(1); // Quantum level
        this.emergenceEngine.setEPOParameters(0.2, 0.8, 0.4);
        
        // Wave collapse effect
        const waveCard = await this.morphingCards.createCard('7.2', {
            position: { x: 0.5, y: 0.5 },
            size: { width: 0.7, height: 0.5 }
        });
        
        waveCard.setParameter('wave_collapse', true);
        waveCard.setParameter('measurement_cascade', true);
        waveCard.setContent(this.contentManager.getSectionContent('7.2'));
    }
    
    async cosmicCollisionTransition(section) {
        // Show bullet cluster collision
        await this.emergenceEngine.transitionToLevel(14); // Galaxy clusters
        
        // Create colliding cluster cards
        const cluster1 = await this.morphingCards.createCard('bullet-1', {
            position: { x: 0.2, y: 0.5 },
            size: { width: 0.3, height: 0.4 }
        });
        
        const cluster2 = await this.morphingCards.createCard('bullet-2', {
            position: { x: 0.8, y: 0.5 },
            size: { width: 0.3, height: 0.4 }
        });
        
        // Animate collision
        await this.animateCollision(cluster1, cluster2);
        
        // Show evidence card
        setTimeout(async () => {
            const evidenceCard = await this.morphingCards.createCard('9', {
                position: { x: 0.5, y: 0.5 },
                size: { width: 0.8, height: 0.6 }
            });
            evidenceCard.setContent(this.contentManager.getSectionContent('9'));
        }, 3000);
    }
    
    async defaultTransition(section) {
        // Standard portal transition
        const currentCard = Array.from(this.morphingCards.cards.values())[0];
        if (currentCard) {
            await this.morphingCards.portalTransition(currentCard, this.currentSection);
        }
    }
    
    updateEPOForces(section) {
        // Update EPO forces based on section content
        switch(section.title) {
            case 'Axiom I: The Primacy of Information':
                this.emergenceEngine.setEPOParameters(0.5, 0.5, 1.0, 0.3);
                break;
            case 'Axiom II: The Principle of Entropic Duality':
                this.emergenceEngine.setEPOParameters(0.8, 0.8, 0.7, 0.4);
                break;
            case 'Consciousness as a Physical Hierarchy':
                this.emergenceEngine.setEPOParameters(0.9, 0.1, 0.9, 1.0);
                break;
            default:
                this.emergenceEngine.setEPOParameters(0.5, 0.5, 0.5, 0.2);
        }
    }
    
    // INTERACTION METHODS
    
    async enterDepthMode() {
        console.log('🔍 Entering depth mode');
        this.presentationMode = 'depth';
        this.depthLevel++;
        
        // Zoom into background emergence
        await this.emergenceEngine.zoomIntoLevel(this.emergenceEngine.currentLevel, 5);
        
        // Fade cards
        this.cardCanvas.style.opacity = '0.3';
    }
    
    async exitDepthMode() {
        console.log('🔍 Exiting depth mode');
        this.presentationMode = 'hybrid';
        this.depthLevel = Math.max(0, this.depthLevel - 1);
        
        // Zoom out
        await this.emergenceEngine.zoomIntoLevel(this.emergenceEngine.currentLevel, 0.2);
        
        // Restore cards
        this.cardCanvas.style.opacity = '1.0';
    }
    
    toggleHybridMode() {
        this.presentationMode = 'hybrid';
        this.cardCanvas.style.opacity = '0.8';
        this.backgroundCanvas.style.opacity = '0.8';
        console.log('🎭 Hybrid mode activated');
    }
    
    toggleEmergenceMode() {
        this.presentationMode = 'emergence';
        this.cardCanvas.style.opacity = '0.2';
        this.backgroundCanvas.style.opacity = '1.0';
        console.log('🌱 Emergence mode activated');
    }
    
    toggleCardMode() {
        this.presentationMode = 'cards';
        this.cardCanvas.style.opacity = '1.0';
        this.backgroundCanvas.style.opacity = '0.3';
        console.log('🃏 Card mode activated');
    }
    
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            this.container.requestFullscreen?.();
            console.log('🖼️ Entering fullscreen');
        } else {
            document.exitFullscreen?.();
            console.log('🖼️ Exiting fullscreen');
        }
    }
    
    async navigateNext() {
        const sections = Object.keys(this.narrativeSections);
        const currentIndex = sections.indexOf(this.currentSection);
        const nextIndex = (currentIndex + 1) % sections.length;
        await this.navigateToSection(sections[nextIndex]);
    }
    
    async navigatePrevious() {
        const sections = Object.keys(this.narrativeSections);
        const currentIndex = sections.indexOf(this.currentSection);
        const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
        await this.navigateToSection(sections[prevIndex]);
    }
    
    handleCardClick(x, y) {
        // Check if click is on a card for depth transition
        // This could trigger detailed explanations or mathematical deep dives
        console.log(`🎯 Card click at (${x.toFixed(2)}, ${y.toFixed(2)})`);
        
        if (this.presentationMode !== 'depth') {
            this.enterDepthMode();
        }
    }
    
    updateNavigationUI() {
        // Update navigation button states
        const buttons = this.navContainer.querySelectorAll('.nav-button');
        buttons.forEach((button, index) => {
            const sections = Object.keys(this.narrativeSections);
            if (sections[index] === this.currentSection) {
                button.style.background = 'rgba(255, 255, 255, 0.4)';
                button.style.borderColor = 'rgba(255, 255, 255, 0.8)';
            } else {
                button.style.background = 'rgba(255, 255, 255, 0.1)';
                button.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }
        });
    }
    
    handleResize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        
        // Resize all canvases
        [this.backgroundCanvas, this.overlayCanvas].forEach(canvas => {
            if (canvas) {
                canvas.width = width;
                canvas.height = height;
                canvas.style.width = width + 'px';
                canvas.style.height = height + 'px';
            }
        });
        
        // Resize card container
        if (this.cardCanvas) {
            this.cardCanvas.style.width = width + 'px';
            this.cardCanvas.style.height = height + 'px';
        }
    }
    
    // UTILITY METHODS
    
    async animateCollision(card1, card2) {
        return new Promise(resolve => {
            const duration = 2000;
            const startTime = Date.now();
            
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Move cards toward each other
                const pos1 = { x: 0.2 + progress * 0.15, y: 0.5 };
                const pos2 = { x: 0.8 - progress * 0.15, y: 0.5 };
                
                this.morphingCards.positionCard(card1.element, pos1, { width: 0.3, height: 0.4 });
                this.morphingCards.positionCard(card2.element, pos2, { width: 0.3, height: 0.4 });
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    // Collision effect
                    card1.setParameter('collision_impact', 1.0);
                    card2.setParameter('collision_impact', 1.0);
                    resolve();
                }
            };
            
            animate();
        });
    }
    
    getCurrentSection() {
        return {
            id: this.currentSection,
            data: this.narrativeSections[this.currentSection],
            mode: this.presentationMode,
            depth: this.depthLevel
        };
    }
    
    destroy() {
        // Cleanup all components
        if (this.emergenceEngine) {
            this.emergenceEngine.destroy();
        }
        
        if (this.morphingCards) {
            this.morphingCards.destroy();
        }
        
        if (this.contentManager) {
            this.contentManager.destroy();
        }
        
        console.log('🧹 EPO Presentation System destroyed');
    }
}
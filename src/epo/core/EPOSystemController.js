/**
 * @file EPOSystemController.js
 * @description Main orchestrator for the EPO Interactive Academic Experience
 * 
 * Extends the VIB34D SystemController to handle academic paper visualization
 * with section-specific effects, mathematical demonstrations, and concept highlighting
 */

import { SystemController } from '../../core/SystemController.js';
import { EPOVisualizationEngine } from './EPOVisualizationEngine.js';
import { EPOInteractionCore } from './EPOInteractionCore.js';
import { EPOMathRenderer } from './EPOMathRenderer.js';
import { EPOConfigSystem } from './EPOConfigSystem.js';

export class EPOSystemController extends SystemController {
    constructor() {
        super();
        
        // EPO-specific state management
        this.currentSection = 'introduction';
        this.currentPart = 1;
        this.readingProgress = 0;
        this.epoForces = {
            integrationStrength: 0.5,    // EPO-I force level
            dispersionStrength: 0.5,     // EPO-D force level
            informationDensity: 0.5,     // Information content
            consciousnessLevel: 0.3,     // Consciousness emergence
            spacetimeCurvature: 0.0,     // Gravitational effects
            quantumCoherence: 0.4        // Quantum state coherence
        };
        
        // EPO paper structure
        this.paperStructure = {
            totalSections: 15,
            totalConcepts: 25,
            totalEquations: 8,
            totalWords: 8500,
            estimatedReadingTime: 45 // minutes
        };
        
        // Section-specific configurations
        this.sectionConfigs = new Map();
        this.conceptVisualizers = new Map();
        this.activeTransitions = new Set();
        
        console.log('📖 EPO System Controller initialized');
    }
    
    /**
     * Initialize the EPO academic experience system
     */
    async initialize() {
        console.log('🚀 Initializing EPO Interactive Academic Experience...');
        
        try {
            // Initialize base VIB34D system
            await super.initialize();
            
            // Initialize EPO-specific components
            this.configSystem = new EPOConfigSystem();
            await this.configSystem.initialize();
            
            this.visualizationEngine = new EPOVisualizationEngine(this.visualizers);
            await this.visualizationEngine.initialize();
            
            this.interactionCore = new EPOInteractionCore(this);
            await this.interactionCore.initialize();
            
            this.mathRenderer = new EPOMathRenderer();
            await this.mathRenderer.initialize();
            
            // Load EPO paper configuration
            await this.loadEPOConfiguration();
            
            // Setup section-specific visualizers
            this.initializeSectionVisualizers();
            
            // Setup concept highlighting system
            this.initializeConceptHighlighting();
            
            // Setup reading progress tracking
            this.initializeProgressTracking();
            
            // Start EPO force evolution loop
            this.startEPOEvolution();
            
            console.log('✅ EPO System fully initialized');
            
        } catch (error) {
            console.error('❌ EPO System initialization failed:', error);
            throw error;
        }
    }
    
    /**
     * Load EPO-specific configuration and paper structure
     */
    async loadEPOConfiguration() {
        const config = await this.configSystem.loadConfiguration();
        
        // Paper section configurations
        this.sectionConfigs.set('introduction', {
            title: 'The Entropic Principle of Organization',
            subtitle: 'A Framework for Informational Physics and Emergent Reality',
            epoI: 0.5, epoD: 0.5, information: 0.6, consciousness: 0.3,
            primaryColor: [0.4, 0.8, 1.0], // Cyan
            theme: 'balanced-introduction'
        });
        
        this.sectionConfigs.set('crisis', {
            title: 'Part I: The Crisis in Modern Physics',
            subtitle: 'The Ontological Crisis and ΛCDM Failures',
            epoI: 0.2, epoD: 0.8, information: 0.3, consciousness: 0.1,
            primaryColor: [1.0, 0.3, 0.3], // Red - chaos
            theme: 'crisis-chaos'
        });
        
        this.sectionConfigs.set('axioms', {
            title: 'Part II: The Axiomatic Foundations',
            subtitle: 'Information Primacy and Entropic Duality',
            epoI: 0.5, epoD: 0.5, information: 0.7, consciousness: 0.3,
            primaryColor: [0.6, 0.4, 1.0], // Purple - foundational
            theme: 'axiom-foundation'
        });
        
        this.sectionConfigs.set('mechanics', {
            title: 'Part III: The Mechanics of Entropic Interaction',
            subtitle: 'EPO Force Law and Potential Fields',
            epoI: 0.7, epoD: 0.6, information: 0.8, consciousness: 0.4,
            primaryColor: [0.3, 1.0, 0.6], // Green - force dynamics
            theme: 'force-mechanics'
        });
        
        this.sectionConfigs.set('explanatory', {
            title: 'Part IV: The Explanatory Power',
            subtitle: 'Spacetime, Gravity, and Quantum Reality',
            epoI: 0.8, epoD: 0.4, information: 0.9, consciousness: 0.6,
            primaryColor: [1.0, 0.8, 0.2], // Gold - emergence
            theme: 'explanatory-power'
        });
        
        this.sectionConfigs.set('consciousness', {
            title: 'Part V: Consciousness and Cosmic Awareness',
            subtitle: 'Informational Panpsychism and Universal Mind',
            epoI: 1.0, epoD: 0.2, information: 1.0, consciousness: 1.0,
            primaryColor: [1.0, 1.0, 0.4], // Bright gold - consciousness
            theme: 'cosmic-consciousness'
        });
        
        this.sectionConfigs.set('mathematics', {
            title: 'Mathematical Appendix',
            subtitle: 'Formal EPO Framework and Derivations',
            epoI: 0.6, epoD: 0.3, information: 1.0, consciousness: 0.5,
            primaryColor: [0.8, 0.8, 1.0], // Light blue - mathematical
            theme: 'mathematical-precision'
        });
    }
    
    /**
     * Initialize section-specific visualizers
     */
    initializeSectionVisualizers() {
        // Create specialized visualizers for each major section
        this.conceptVisualizers.set('epo-forces', {
            type: 'force-field',
            parameters: ['epoI', 'epoD', 'forceBalance'],
            shader: 'epo-forces-fragment'
        });
        
        this.conceptVisualizers.set('information-density', {
            type: 'complexity-field',
            parameters: ['informationDensity', 'structuralOrder'],
            shader: 'information-complexity-fragment'
        });
        
        this.conceptVisualizers.set('consciousness-emergence', {
            type: 'consciousness-field',
            parameters: ['consciousnessLevel', 'integration', 'awareness'],
            shader: 'consciousness-emergence-fragment'
        });
        
        this.conceptVisualizers.set('spacetime-curvature', {
            type: 'geometric-distortion',
            parameters: ['curvature', 'gravitationalField'],
            shader: 'spacetime-curvature-fragment'
        });
        
        this.conceptVisualizers.set('quantum-coherence', {
            type: 'wave-interference',
            parameters: ['coherence', 'measurement', 'collapse'],
            shader: 'quantum-coherence-fragment'
        });
    }
    
    /**
     * Initialize concept highlighting system
     */
    initializeConceptHighlighting() {
        // Define visual effects for key EPO concepts
        const conceptEffects = {
            'EPO-I': { color: [0.2, 1.0, 0.4], effect: 'integration-pull' },
            'EPO-D': { color: [1.0, 0.4, 0.2], effect: 'dispersion-push' },
            'integration': { color: [0.4, 1.0, 0.8], effect: 'complexity-build' },
            'dispersion': { color: [1.0, 0.6, 0.4], effect: 'chaos-spread' },
            'information': { color: [0.8, 0.4, 1.0], effect: 'data-flow' },
            'consciousness': { color: [1.0, 1.0, 0.6], effect: 'awareness-glow' },
            'spacetime': { color: [0.6, 0.8, 1.0], effect: 'geometric-warp' },
            'quantum': { color: [0.8, 1.0, 0.8], effect: 'wave-coherence' },
            'dark matter': { color: [0.4, 0.4, 0.8], effect: 'invisible-mass' },
            'dark energy': { color: [0.8, 0.2, 0.6], effect: 'cosmic-expansion' }
        };
        
        // Apply effects to concept highlighting
        Object.keys(conceptEffects).forEach(concept => {
            this.registerConceptEffect(concept, conceptEffects[concept]);
        });
    }
    
    /**
     * Initialize reading progress tracking
     */
    initializeProgressTracking() {
        this.readingMetrics = {
            sectionsCompleted: 0,
            conceptsExplored: 0,
            equationsInteracted: 0,
            timeSpent: 0,
            startTime: Date.now()
        };
        
        // Setup progress indicators
        this.updateProgressIndicators();
    }
    
    /**
     * Start EPO force evolution loop
     */
    startEPOEvolution() {
        setInterval(() => {
            this.evolveEPOForces();
            this.updateVisualizationParameters();
            this.processConceptInteractions();
            this.updateReadingProgress();
        }, 50); // 20fps evolution
    }
    
    /**
     * Evolve EPO forces based on reading context
     */
    evolveEPOForces() {
        const currentConfig = this.sectionConfigs.get(this.currentSection);
        if (!currentConfig) return;
        
        // Smooth transition to target values
        const transitionSpeed = 0.02;
        
        this.epoForces.integrationStrength = this.lerp(
            this.epoForces.integrationStrength,
            currentConfig.epoI,
            transitionSpeed
        );
        
        this.epoForces.dispersionStrength = this.lerp(
            this.epoForces.dispersionStrength,
            currentConfig.epoD,
            transitionSpeed
        );
        
        this.epoForces.informationDensity = this.lerp(
            this.epoForces.informationDensity,
            currentConfig.information,
            transitionSpeed
        );
        
        this.epoForces.consciousnessLevel = this.lerp(
            this.epoForces.consciousnessLevel,
            currentConfig.consciousness,
            transitionSpeed
        );
        
        // Add dynamic fluctuations for visual interest
        const time = Date.now() * 0.001;
        this.epoForces.integrationStrength += Math.sin(time * 0.3) * 0.05;
        this.epoForces.dispersionStrength += Math.sin(time * 0.5) * 0.05;
        this.epoForces.informationDensity += Math.sin(time * 0.7) * 0.03;
    }
    
    /**
     * Update visualization parameters based on current EPO state
     */
    updateVisualizationParameters() {
        // Update all active visualizers with current EPO forces
        this.visualizers.forEach((visualizer, id) => {
            if (visualizer.setParameter) {
                visualizer.setParameter('u_epoIntegration', this.epoForces.integrationStrength);
                visualizer.setParameter('u_epoDispersion', this.epoForces.dispersionStrength);
                visualizer.setParameter('u_informationDensity', this.epoForces.informationDensity);
                visualizer.setParameter('u_consciousnessLevel', this.epoForces.consciousnessLevel);
                visualizer.setParameter('u_spacetimeCurvature', this.epoForces.spacetimeCurvature);
                visualizer.setParameter('u_quantumCoherence', this.epoForces.quantumCoherence);
                
                // Update time for animations
                visualizer.setParameter('u_time', Date.now() * 0.001);
            }
        });
        
        // Update CSS variables for UI effects
        document.documentElement.style.setProperty('--epo-i-strength', this.epoForces.integrationStrength);
        document.documentElement.style.setProperty('--epo-d-strength', this.epoForces.dispersionStrength);
        document.documentElement.style.setProperty('--information-density', this.epoForces.informationDensity);
        document.documentElement.style.setProperty('--consciousness-level', this.epoForces.consciousnessLevel);
    }
    
    /**
     * Handle section transitions with dramatic visual effects
     */
    async transitionToSection(sectionId) {
        if (this.currentSection === sectionId) return;
        
        console.log(`📖 Transitioning to section: ${sectionId}`);
        
        // Start transition effect
        this.activeTransitions.add(sectionId);
        
        try {
            // Apply transition-specific visual effects
            await this.visualizationEngine.startSectionTransition(this.currentSection, sectionId);
            
            // Update current section
            this.currentSection = sectionId;
            
            // Apply new section configuration
            const config = this.sectionConfigs.get(sectionId);
            if (config) {
                await this.applySectionConfiguration(config);
            }
            
            // Update navigation state
            this.updateNavigationState(sectionId);
            
            // Complete transition
            await this.visualizationEngine.completeSectionTransition(sectionId);
            
        } finally {
            this.activeTransitions.delete(sectionId);
        }
    }
    
    /**
     * Apply section-specific configuration
     */
    async applySectionConfiguration(config) {
        // Update theme-specific visualizer settings
        this.visualizers.forEach((visualizer, id) => {
            if (visualizer.setParameter) {
                visualizer.setParameter('u_primaryColor', config.primaryColor);
                visualizer.setParameter('u_sectionTheme', config.theme);
            }
        });
        
        // Trigger section-specific effects
        await this.visualizationEngine.applySectionEffects(config);
    }
    
    /**
     * Handle concept highlighting interactions
     */
    triggerConceptHighlight(conceptName, intensity = 1.0) {
        console.log(`💡 Highlighting concept: ${conceptName}`);
        
        // Apply concept-specific visual effects
        this.visualizationEngine.highlightConcept(conceptName, intensity);
        
        // Update concept interaction metrics
        this.readingMetrics.conceptsExplored++;
        
        // Trigger educational explanations if needed
        this.interactionCore.explainConcept(conceptName);
    }
    
    /**
     * Handle mathematical equation interactions
     */
    triggerEquationInteraction(equationId, parameters = {}) {
        console.log(`🧮 Interacting with equation: ${equationId}`);
        
        // Apply live mathematical visualization
        this.mathRenderer.renderEquation(equationId, parameters);
        
        // Update equation interaction metrics
        this.readingMetrics.equationsInteracted++;
        
        // Apply equation-specific visual effects
        this.visualizationEngine.demonstrateEquation(equationId, parameters);
    }
    
    /**
     * Update reading progress and metrics
     */
    updateReadingProgress() {
        this.readingMetrics.timeSpent = Date.now() - this.readingMetrics.startTime;
        
        // Calculate reading progress based on section completion
        this.readingProgress = this.readingMetrics.sectionsCompleted / this.paperStructure.totalSections;
        
        // Update progress indicators
        this.updateProgressIndicators();
    }
    
    /**
     * Update UI progress indicators
     */
    updateProgressIndicators() {
        // Update reading progress bar
        const progressBar = document.getElementById('reading-progress');
        if (progressBar) {
            progressBar.style.width = (this.readingProgress * 100) + '%';
        }
        
        // Update section completion indicators
        const sectionIndicators = document.querySelectorAll('.section-indicator');
        sectionIndicators.forEach((indicator, index) => {
            const isCompleted = index < this.readingMetrics.sectionsCompleted;
            indicator.classList.toggle('completed', isCompleted);
        });
        
        // Update concept exploration metrics
        const conceptCount = document.getElementById('concepts-explored');
        if (conceptCount) {
            conceptCount.textContent = this.readingMetrics.conceptsExplored;
        }
    }
    
    /**
     * Get current EPO state for external access
     */
    getEPOState() {
        return {
            forces: { ...this.epoForces },
            section: this.currentSection,
            progress: this.readingProgress,
            metrics: { ...this.readingMetrics }
        };
    }
    
    /**
     * Manually set EPO force values (for controls)
     */
    setEPOForce(forceName, value) {
        if (this.epoForces.hasOwnProperty(forceName)) {
            this.epoForces[forceName] = Math.max(0, Math.min(1, value));
            console.log(`⚡ ${forceName} set to ${value.toFixed(2)}`);
        }
    }
    
    /**
     * Linear interpolation helper
     */
    lerp(start, end, factor) {
        return start + (end - start) * factor;
    }
    
    /**
     * Register concept effect for highlighting system
     */
    registerConceptEffect(conceptName, effect) {
        this.conceptVisualizers.set(conceptName, effect);
    }
    
    /**
     * Process active concept interactions
     */
    processConceptInteractions() {
        // Handle any ongoing concept highlighting effects
        this.conceptVisualizers.forEach((effect, conceptName) => {
            if (effect.active) {
                this.visualizationEngine.updateConceptEffect(conceptName, effect);
            }
        });
    }
    
    /**
     * Update navigation state
     */
    updateNavigationState(sectionId) {
        // Update active navigation indicators
        document.querySelectorAll('.nav-section').forEach(nav => {
            nav.classList.remove('active');
        });
        
        const activeNav = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeNav) {
            activeNav.classList.add('active');
        }
        
        // Update breadcrumb navigation
        this.updateBreadcrumbs(sectionId);
    }
    
    /**
     * Update breadcrumb navigation
     */
    updateBreadcrumbs(sectionId) {
        const config = this.sectionConfigs.get(sectionId);
        if (!config) return;
        
        const breadcrumb = document.getElementById('section-breadcrumb');
        if (breadcrumb) {
            breadcrumb.textContent = config.title;
        }
        
        const subtitle = document.getElementById('section-subtitle');
        if (subtitle) {
            subtitle.textContent = config.subtitle;
        }
    }
}
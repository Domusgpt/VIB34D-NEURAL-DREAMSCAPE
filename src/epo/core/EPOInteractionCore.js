/**
 * @file EPOInteractionCore.js
 * @description Manages user interactions with EPO paper content
 * 
 * Handles concept explanations, interactive navigation, educational features,
 * and user engagement tracking for the EPO Interactive Academic Experience
 */

export class EPOInteractionCore {
    constructor(systemController) {
        this.systemController = systemController;
        this.conceptDatabase = new Map();
        this.interactionHistory = [];
        this.educationalOverlays = new Map();
        this.userEngagement = {
            conceptsExplored: 0,
            equationsInteracted: 0,
            sectionsCompleted: 0,
            timeSpent: 0,
            startTime: Date.now()
        };
        
        // Interactive element selectors
        this.interactiveElements = {
            concepts: '.concept-highlight',
            equations: '.equation-interactive',
            sections: '.paper-section',
            navigation: '.section-nav',
            controls: '.epo-control'
        };
        
        console.log('🎯 EPO Interaction Core initialized');
    }
    
    /**
     * Initialize interaction system and event handlers
     */
    async initialize() {
        console.log('🚀 Initializing EPO Interaction Core...');
        
        try {
            // Load concept database
            await this.loadConceptDatabase();
            
            // Setup event handlers
            this.setupInteractionHandlers();
            
            // Initialize educational overlays
            this.initializeEducationalOverlays();
            
            // Setup scroll-based interactions
            this.setupScrollInteractions();
            
            // Initialize progress tracking
            this.initializeProgressTracking();
            
            // Setup keyboard shortcuts
            this.setupKeyboardShortcuts();
            
            console.log('✅ EPO Interaction Core ready');
            
        } catch (error) {
            console.error('❌ EPO Interaction Core initialization failed:', error);
            throw error;
        }
    }
    
    /**
     * Load comprehensive concept database for explanations
     */
    async loadConceptDatabase() {
        // EPO-I (Integrative Drive) Concept
        this.conceptDatabase.set('EPO-I', {
            name: 'EPO-I (Integrative Drive)',
            shortDescription: 'The fundamental force that pulls systems toward complexity and organization',
            fullDescription: 'The Integrative Drive (EPO-I) represents one half of the Entropic Principle of Organization. It is the tendency of information to aggregate, organize, and form increasingly complex structures. EPO-I manifests as gravitational attraction, chemical bonding, biological development, and consciousness emergence.',
            mathematicalForm: 'F_I = -ζi∇Ui',
            visualEffect: 'integration-pull',
            relatedConcepts: ['complexity', 'organization', 'gravity', 'consciousness'],
            examples: [
                'Gravitational collapse forming stars and galaxies',
                'Chemical bonds creating molecular structures',
                'Biological evolution toward complexity',
                'Neural networks forming consciousness'
            ],
            difficulty: 'intermediate'
        });
        
        // EPO-D (Dispersive Drive) Concept
        this.conceptDatabase.set('EPO-D', {
            name: 'EPO-D (Dispersive Drive)',
            shortDescription: 'The fundamental force that pushes systems toward dispersion and chaos',
            fullDescription: 'The Dispersive Drive (EPO-D) represents the opposing force to EPO-I. It is the tendency of systems to spread out, fragment, and resist organization. EPO-D manifests as thermal motion, radiation pressure, quantum uncertainty, and entropy increase.',
            mathematicalForm: 'F_D = +ζd∇Ud',
            visualEffect: 'dispersion-push',
            relatedConcepts: ['entropy', 'chaos', 'thermal motion', 'quantum uncertainty'],
            examples: [
                'Thermal expansion and gas diffusion',
                'Radioactive decay and particle emission',
                'Quantum decoherence and measurement',
                'Cosmic expansion and heat death'
            ],
            difficulty: 'intermediate'
        });
        
        // Information Concept
        this.conceptDatabase.set('information', {
            name: 'Information as Fundamental Substrate',
            shortDescription: 'Information as the basic building block of reality',
            fullDescription: 'In EPO theory, information is not merely a description of physical states, but the fundamental substrate from which all physical phenomena emerge. Information has mass-energy equivalence and can exert gravitational effects.',
            mathematicalForm: 'E = mc² = I·c² (Information-Energy Equivalence)',
            visualEffect: 'information-flow',
            relatedConcepts: ['mass-energy', 'substrate', 'computation', 'measurement'],
            examples: [
                'Black hole information paradox',
                'Quantum measurement and information processing',
                'DNA as biological information storage',
                'Computational processes in neural systems'
            ],
            difficulty: 'advanced'
        });
        
        // Consciousness Concept
        this.conceptDatabase.set('consciousness', {
            name: 'Consciousness as Information Integration',
            shortDescription: 'Consciousness emerges from integrated information processing',
            fullDescription: 'Consciousness arises when EPO-I achieves sufficient integration of information flows. The theory proposes a three-tier hierarchy: Proto-consciousness (quantum), Structural consciousness (systemic), and Cognitive consciousness (biological).',
            mathematicalForm: 'Φ = ∫(Information Integration) over system',
            visualEffect: 'consciousness-emergence',
            relatedConcepts: ['integration', 'panpsychism', 'emergence', 'self-reference'],
            examples: [
                'Human cognitive awareness',
                'Animal behavioral consciousness',
                'Potential machine consciousness',
                'Cosmic-scale self-organization'
            ],
            difficulty: 'advanced'
        });
        
        // Spacetime Concept
        this.conceptDatabase.set('spacetime', {
            name: 'Spacetime as EPO-I Phase Transition',
            shortDescription: 'Spacetime emerges from information integration reaching critical threshold',
            fullDescription: 'Rather than being fundamental, spacetime is an emergent property of information organization. When EPO-I forces achieve sufficient integration density, they undergo a phase transition that manifests as curved spacetime.',
            mathematicalForm: 'Gμν = 8πG/c⁴ · Tμν (Einstein Field Equations as Information Geometry)',
            visualEffect: 'spacetime-emergence',
            relatedConcepts: ['emergence', 'phase transition', 'gravity', 'geometry'],
            examples: [
                'Black hole event horizons',
                'Gravitational wave propagation',
                'Cosmological inflation',
                'Quantum spacetime foam'
            ],
            difficulty: 'expert'
        });
        
        // Quantum Mechanics Concept
        this.conceptDatabase.set('quantum', {
            name: 'Quantum Reality as Information Processing',
            shortDescription: 'Quantum phenomena emerge from fundamental information dynamics',
            fullDescription: 'Quantum mechanics is reinterpreted as cascading information phase shifts. Wave functions represent information potential states, and measurement represents EPO-I integration events that collapse possibilities into actuality.',
            mathematicalForm: 'ψ → Information Potential Field',
            visualEffect: 'quantum-phase-shift',
            relatedConcepts: ['measurement', 'superposition', 'entanglement', 'decoherence'],
            examples: [
                'Wave-particle duality',
                'Quantum entanglement',
                'Measurement problem',
                'Quantum computing processes'
            ],
            difficulty: 'expert'
        });
        
        // Dark Matter Concept
        this.conceptDatabase.set('dark matter', {
            name: 'Dark Matter as Information Gravity',
            shortDescription: 'Dark matter represents gravitational effects of pure information',
            fullDescription: 'Dark matter is not exotic particles, but the gravitational manifestation of information density that has not yet undergone EPO-I phase transition to form ordinary matter. It provides the informational scaffolding for cosmic structure.',
            mathematicalForm: 'M_dark = ρ_info · V (Information Density × Volume)',
            visualEffect: 'invisible-gravity',
            relatedConcepts: ['gravity', 'structure formation', 'information density', 'cosmic web'],
            examples: [
                'Galaxy rotation curves',
                'Cosmic structure formation',
                'Gravitational lensing',
                'Cosmic microwave background patterns'
            ],
            difficulty: 'expert'
        });
        
        console.log(`📚 Loaded ${this.conceptDatabase.size} concept definitions`);
    }
    
    /**
     * Setup interaction event handlers
     */
    setupInteractionHandlers() {
        // Concept highlighting on hover/click
        document.addEventListener('mouseover', (event) => {
            if (event.target.matches(this.interactiveElements.concepts)) {
                this.handleConceptHover(event);
            }
        });
        
        document.addEventListener('click', (event) => {
            if (event.target.matches(this.interactiveElements.concepts)) {
                this.handleConceptClick(event);
            } else if (event.target.matches(this.interactiveElements.equations)) {
                this.handleEquationClick(event);
            } else if (event.target.matches(this.interactiveElements.sections)) {
                this.handleSectionClick(event);
            }
        });
        
        // Touch support for mobile
        document.addEventListener('touchstart', (event) => {
            if (event.target.matches(this.interactiveElements.concepts)) {
                this.handleConceptTouch(event);
            }
        });
        
        // Parameter control interactions
        document.addEventListener('input', (event) => {
            if (event.target.matches(this.interactiveElements.controls)) {
                this.handleParameterChange(event);
            }
        });
        
        console.log('🎮 Interaction handlers setup complete');
    }
    
    /**
     * Initialize educational overlay system
     */
    initializeEducationalOverlays() {
        // Create overlay container
        const overlayContainer = document.createElement('div');
        overlayContainer.id = 'epo-educational-overlay';
        overlayContainer.className = 'educational-overlay hidden';
        document.body.appendChild(overlayContainer);
        
        // Create concept explanation template
        const conceptTemplate = `
            <div class="concept-overlay">
                <div class="concept-header">
                    <h3 class="concept-title"></h3>
                    <button class="close-overlay">×</button>
                </div>
                <div class="concept-content">
                    <p class="concept-description"></p>
                    <div class="concept-math"></div>
                    <div class="concept-examples"></div>
                    <div class="concept-related"></div>
                </div>
                <div class="concept-actions">
                    <button class="visualize-concept">🎨 Visualize</button>
                    <button class="explore-related">🔗 Related Concepts</button>
                </div>
            </div>
        `;
        
        overlayContainer.innerHTML = conceptTemplate;
        
        // Setup overlay event handlers
        this.setupOverlayHandlers();
        
        console.log('📖 Educational overlays initialized');
    }
    
    /**
     * Setup scroll-based interactions
     */
    setupScrollInteractions() {
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.handleScrollInteraction();
            }, 100); // Debounce scroll events
        });
        
        // Intersection Observer for section visibility
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.handleSectionVisible(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        // Observe all paper sections
        document.querySelectorAll('.paper-section').forEach(section => {
            sectionObserver.observe(section);
        });
        
        console.log('📜 Scroll interactions setup');
    }
    
    /**
     * Initialize progress tracking system
     */
    initializeProgressTracking() {
        // Create progress display elements
        this.createProgressIndicators();
        
        // Start tracking user engagement
        this.startEngagementTracking();
        
        console.log('📊 Progress tracking initialized');
    }
    
    /**
     * Setup keyboard shortcuts for navigation
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (event) => {
            // Prevent shortcuts when typing in input fields
            if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
                return;
            }
            
            switch (event.key) {
                case 'ArrowLeft':
                    this.navigatePrevious();
                    break;
                case 'ArrowRight':
                    this.navigateNext();
                    break;
                case 'h':
                    this.toggleHelpOverlay();
                    break;
                case 'v':
                    this.toggleVisualizationControls();
                    break;
                case 'Escape':
                    this.closeAllOverlays();
                    break;
            }
        });
        
        console.log('⌨️ Keyboard shortcuts setup');
    }
    
    /**
     * Handle concept hover events
     */
    handleConceptHover(event) {
        const conceptName = event.target.dataset.concept;
        if (!conceptName) return;
        
        // Trigger subtle visual highlight
        this.systemController.triggerConceptHighlight(conceptName, 0.3);
        
        // Show concept preview tooltip
        this.showConceptPreview(event.target, conceptName);
    }
    
    /**
     * Handle concept click events
     */
    handleConceptClick(event) {
        event.preventDefault();
        const conceptName = event.target.dataset.concept;
        if (!conceptName) return;
        
        console.log(`🔍 Concept clicked: ${conceptName}`);
        
        // Trigger strong visual highlight
        this.systemController.triggerConceptHighlight(conceptName, 1.0);
        
        // Show detailed concept explanation
        this.explainConcept(conceptName);
        
        // Update engagement metrics
        this.userEngagement.conceptsExplored++;
        this.recordInteraction('concept-click', { concept: conceptName });
    }
    
    /**
     * Handle equation click events
     */
    handleEquationClick(event) {
        const equationId = event.target.dataset.equation;
        if (!equationId) return;
        
        console.log(`🧮 Equation clicked: ${equationId}`);
        
        // Extract parameters from data attributes
        const parameters = this.extractEquationParameters(event.target);
        
        // Trigger equation demonstration
        this.systemController.triggerEquationInteraction(equationId, parameters);
        
        // Show equation explanation
        this.explainEquation(equationId, parameters);
        
        // Update engagement metrics
        this.userEngagement.equationsInteracted++;
        this.recordInteraction('equation-click', { equation: equationId, parameters });
    }
    
    /**
     * Explain EPO concept with full educational overlay
     */
    explainConcept(conceptName) {
        const concept = this.conceptDatabase.get(conceptName);
        if (!concept) {
            console.warn(`No concept definition found for: ${conceptName}`);
            return;
        }
        
        console.log(`📚 Explaining concept: ${conceptName}`);
        
        // Populate overlay with concept information
        const overlay = document.getElementById('epo-educational-overlay');
        const title = overlay.querySelector('.concept-title');
        const description = overlay.querySelector('.concept-description');
        const math = overlay.querySelector('.concept-math');
        const examples = overlay.querySelector('.concept-examples');
        const related = overlay.querySelector('.concept-related');
        
        title.textContent = concept.name;
        description.textContent = concept.fullDescription;
        
        // Add mathematical formulation
        if (concept.mathematicalForm) {
            math.innerHTML = `<strong>Mathematical Form:</strong><br><code>${concept.mathematicalForm}</code>`;
        } else {
            math.innerHTML = '';
        }
        
        // Add examples
        if (concept.examples && concept.examples.length > 0) {
            examples.innerHTML = `
                <strong>Examples:</strong>
                <ul>
                    ${concept.examples.map(example => `<li>${example}</li>`).join('')}
                </ul>
            `;
        } else {
            examples.innerHTML = '';
        }
        
        // Add related concepts
        if (concept.relatedConcepts && concept.relatedConcepts.length > 0) {
            related.innerHTML = `
                <strong>Related Concepts:</strong>
                <div class="related-concepts">
                    ${concept.relatedConcepts.map(related => 
                        `<span class="related-concept" data-concept="${related}">${related}</span>`
                    ).join('')}
                </div>
            `;
        } else {
            related.innerHTML = '';
        }
        
        // Show overlay
        overlay.classList.remove('hidden');
        
        // Record educational interaction
        this.recordInteraction('concept-explained', { concept: conceptName });
    }
    
    /**
     * Handle section visibility changes
     */
    handleSectionVisible(sectionElement) {
        const sectionId = sectionElement.dataset.section;
        if (!sectionId) return;
        
        console.log(`👁️ Section visible: ${sectionId}`);
        
        // Trigger section transition if needed
        if (this.systemController.currentSection !== sectionId) {
            this.systemController.transitionToSection(sectionId);
        }
        
        // Update progress indicators
        this.updateSectionProgress(sectionId);
        
        // Record section visit
        this.recordInteraction('section-visit', { section: sectionId });
    }
    
    /**
     * Handle parameter control changes
     */
    handleParameterChange(event) {
        const parameterName = event.target.dataset.parameter;
        const value = parseFloat(event.target.value);
        
        if (!parameterName || isNaN(value)) return;
        
        console.log(`🎛️ Parameter changed: ${parameterName} = ${value}`);
        
        // Update system controller with new parameter value
        this.systemController.setEPOForce(parameterName, value);
        
        // Update UI display
        this.updateParameterDisplay(parameterName, value);
        
        // Record parameter interaction
        this.recordInteraction('parameter-change', { parameter: parameterName, value });
    }
    
    /**
     * Create progress indicators UI
     */
    createProgressIndicators() {
        const progressContainer = document.createElement('div');
        progressContainer.id = 'epo-progress-indicators';
        progressContainer.className = 'progress-indicators';
        
        progressContainer.innerHTML = `
            <div class="reading-progress">
                <div class="progress-label">Reading Progress</div>
                <div class="progress-bar">
                    <div class="progress-fill" id="reading-progress-fill"></div>
                </div>
                <div class="progress-text" id="reading-progress-text">0%</div>
            </div>
            <div class="engagement-metrics">
                <div class="metric">
                    <span class="metric-label">Concepts Explored</span>
                    <span class="metric-value" id="concepts-count">0</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Equations Interacted</span>
                    <span class="metric-value" id="equations-count">0</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Time Spent</span>
                    <span class="metric-value" id="time-spent">0m</span>
                </div>
            </div>
        `;
        
        document.body.appendChild(progressContainer);
    }
    
    /**
     * Start engagement tracking timer
     */
    startEngagementTracking() {
        setInterval(() => {
            this.updateEngagementMetrics();
        }, 30000); // Update every 30 seconds
    }
    
    /**
     * Update engagement metrics display
     */
    updateEngagementMetrics() {
        this.userEngagement.timeSpent = Date.now() - this.userEngagement.startTime;
        
        // Update UI elements
        const conceptsCount = document.getElementById('concepts-count');
        const equationsCount = document.getElementById('equations-count');
        const timeSpent = document.getElementById('time-spent');
        
        if (conceptsCount) conceptsCount.textContent = this.userEngagement.conceptsExplored;
        if (equationsCount) equationsCount.textContent = this.userEngagement.equationsInteracted;
        if (timeSpent) {
            const minutes = Math.floor(this.userEngagement.timeSpent / 60000);
            timeSpent.textContent = `${minutes}m`;
        }
    }
    
    /**
     * Record user interaction for analytics
     */
    recordInteraction(type, data = {}) {
        const interaction = {
            type,
            data,
            timestamp: Date.now(),
            section: this.systemController.currentSection
        };
        
        this.interactionHistory.push(interaction);
        
        // Keep only last 1000 interactions to prevent memory issues
        if (this.interactionHistory.length > 1000) {
            this.interactionHistory.shift();
        }
        
        console.log(`📝 Recorded interaction: ${type}`, data);
    }
    
    /**
     * Setup overlay event handlers
     */
    setupOverlayHandlers() {
        const overlay = document.getElementById('epo-educational-overlay');
        
        // Close overlay button
        overlay.addEventListener('click', (event) => {
            if (event.target.classList.contains('close-overlay')) {
                overlay.classList.add('hidden');
            }
        });
        
        // Visualize concept button
        overlay.addEventListener('click', (event) => {
            if (event.target.classList.contains('visualize-concept')) {
                const conceptName = overlay.querySelector('.concept-title').textContent;
                this.systemController.triggerConceptHighlight(conceptName, 1.0);
            }
        });
        
        // Related concept clicks
        overlay.addEventListener('click', (event) => {
            if (event.target.classList.contains('related-concept')) {
                const relatedConcept = event.target.dataset.concept;
                this.explainConcept(relatedConcept);
            }
        });
    }
    
    /**
     * Navigate to previous section
     */
    navigatePrevious() {
        // Implementation for navigation logic
        console.log('⬅️ Navigate previous');
    }
    
    /**
     * Navigate to next section
     */
    navigateNext() {
        // Implementation for navigation logic
        console.log('➡️ Navigate next');
    }
    
    /**
     * Toggle help overlay
     */
    toggleHelpOverlay() {
        console.log('❓ Toggle help overlay');
        // Implementation for help system
    }
    
    /**
     * Toggle visualization controls
     */
    toggleVisualizationControls() {
        console.log('🎛️ Toggle visualization controls');
        // Implementation for control panel
    }
    
    /**
     * Close all open overlays
     */
    closeAllOverlays() {
        document.querySelectorAll('.educational-overlay').forEach(overlay => {
            overlay.classList.add('hidden');
        });
    }
    
    /**
     * Get user engagement statistics
     */
    getEngagementStatistics() {
        return {
            ...this.userEngagement,
            interactionCount: this.interactionHistory.length,
            averageTimePerConcept: this.userEngagement.conceptsExplored > 0 
                ? this.userEngagement.timeSpent / this.userEngagement.conceptsExplored 
                : 0
        };
    }
}
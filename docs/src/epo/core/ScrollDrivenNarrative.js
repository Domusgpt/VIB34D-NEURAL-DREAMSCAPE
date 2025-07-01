/**
 * @file ScrollDrivenNarrative.js
 * @description Scroll-driven narrative system where cards become a language of information
 * Cards split, merge, morph, and dance to convey meaning through their behavior
 * The presentation itself demonstrates EPO principles of information integration
 */

export class ScrollDrivenNarrative {
    constructor(morphingCards, contentManager, emergenceEngine) {
        this.morphingCards = morphingCards;
        this.contentManager = contentManager;
        this.emergenceEngine = emergenceEngine;
        
        // Scroll state
        this.scrollPosition = 0;
        this.maxScroll = 0;
        this.scrollVelocity = 0;
        this.lastScrollTime = 0;
        this.isScrolling = false;
        
        // Narrative state
        this.currentNarrativePoint = 0;
        this.activeCards = new Map();
        this.transitionQueue = [];
        
        // Visual language parameters
        this.informationDensity = 0.3;
        this.consciousnessLevel = 0.1;
        this.narrativeTension = 0.0;
        this.revelationMagnitude = 0.0;
        
        // EPO Narrative Structure - scroll-driven story beats
        this.narrativeBeats = [
            // COSMIC GENESIS - Single unified card
            {
                id: 'genesis',
                scrollRange: [0, 0.05],
                cardBehavior: 'unified-origin',
                content: {
                    primary: 'The Entropic Principle of Organization',
                    subtitle: 'A Framework for Informational Physics and Emergent Reality',
                    visual: 'cosmic-genesis'
                },
                intention: 'Unity before the split - all information in one place',
                emotion: 'wonder-anticipation'
            },
            
            // PARADIGM CRISIS - Card begins to crack and stress
            {
                id: 'crisis-building',
                scrollRange: [0.05, 0.12],
                cardBehavior: 'stress-accumulation',
                content: {
                    primary: 'Science advances through paradigm revolution...',
                    secondary: 'But we now stand at a precipice where anomalies have migrated to the core',
                    visual: 'paradigm-stress'
                },
                intention: 'Building tension - the old paradigm cannot hold',
                emotion: 'growing-unease'
            },
            
            // THE GREAT FRACTURE - Card violently splits into 3 pieces
            {
                id: 'paradigm-fracture',
                scrollRange: [0.12, 0.18],
                cardBehavior: 'catastrophic-split',
                content: {
                    left: 'General Relativity\n(Smooth, Deterministic)',
                    center: 'THE INCOMPATIBLE DIVIDE',
                    right: 'Quantum Mechanics\n(Discrete, Probabilistic)',
                    visual: 'theoretical-schism'
                },
                intention: 'The fundamental split in physics - irreconcilable worldviews',
                emotion: 'intellectual-crisis'
            },
            
            // DARK MATTER REVELATION - Cards float apart showing emptiness
            {
                id: 'dark-matter-void',
                scrollRange: [0.18, 0.25],
                cardBehavior: 'void-demonstration',
                content: {
                    scattered: [
                        '5% - Observable Matter',
                        '95% - ???',
                        'Dark Matter: 27%',
                        'Dark Energy: 68%',
                        'ΛCDM Crisis'
                    ],
                    visual: 'cosmic-emptiness'
                },
                intention: 'Show the vastness of our ignorance - 95% unknown',
                emotion: 'humbling-realization'
            },
            
            // INFORMATION PRIMACY - Cards begin flowing like data streams
            {
                id: 'information-axiom',
                scrollRange: [0.25, 0.35],
                cardBehavior: 'data-stream-formation',
                content: {
                    flowing: [
                        'AXIOM I: The Primacy of Information',
                        'Information is the fundamental substrate',
                        'Matter, energy, space, time are emergent',
                        'Every particle projects informational signals',
                        'The universe is ceaseless informational flux'
                    ],
                    visual: 'information-rivers'
                },
                intention: 'Information as the true foundation - flowing, dynamic',
                emotion: 'revelatory-clarity'
            },
            
            // ENTROPIC DUALITY - Cards dance in opposition, then harmony
            {
                id: 'entropic-duality',
                scrollRange: [0.35, 0.45],
                cardBehavior: 'dialectical-dance',
                content: {
                    epo_i: {
                        title: 'EPO-I: Integration Drive',
                        points: [
                            'Compression of complexity',
                            'Formation of stable structures',
                            'Information integration',
                            'Local order creation'
                        ]
                    },
                    epo_d: {
                        title: 'EPO-D: Dispersion Drive',
                        points: [
                            'Energy dispersal',
                            'Entropy increase',
                            'Thermal equilibrium',
                            'Cosmic expansion'
                        ]
                    },
                    visual: 'dual-spiral-dance'
                },
                intention: 'The fundamental duality - opposing forces creating all dynamics',
                emotion: 'dynamic-tension-resolution'
            },
            
            // CONSCIOUSNESS EMERGENCE - Cards form neural network
            {
                id: 'consciousness-hierarchy',
                scrollRange: [0.45, 0.55],
                cardBehavior: 'neural-network-formation',
                content: {
                    network: [
                        'Tier 1: Proto-Consciousness (Quantum reflexes)',
                        'Tier 2: Structural Consciousness (Crystals, stars)',
                        'Tier 3: Biological Consciousness (Animals, humans)',
                        'Universal Consciousness: The cosmos thinking itself'
                    ],
                    visual: 'consciousness-lattice'
                },
                intention: 'Consciousness as a physical hierarchy - not mysterious',
                emotion: 'expanding-awareness'
            },
            
            // BULLET CLUSTER EVIDENCE - Cards collide and separate
            {
                id: 'bullet-cluster-evidence',
                scrollRange: [0.55, 0.65],
                cardBehavior: 'cosmic-collision',
                content: {
                    collision: {
                        cluster1: 'Hot X-ray Gas\n(Baryonic Matter)',
                        cluster2: 'Galaxy Distribution\n(Gravitational Lensing)',
                        separation: 'CLEAR OFFSET',
                        interpretation: 'Information density ≠ Matter density'
                    },
                    visual: 'bullet-cluster-visualization'
                },
                intention: 'Concrete evidence - the theory makes testable predictions',
                emotion: 'scientific-vindication'
            },
            
            // UNIVERSAL INTEGRATION - All cards merge into cosmic consciousness
            {
                id: 'universal-integration',
                scrollRange: [0.65, 0.75],
                cardBehavior: 'universal-synthesis',
                content: {
                    synthesis: [
                        'The universe as self-observing system',
                        'Information integrating with itself',
                        'Consciousness as fundamental property',
                        'EPO as the engine of cosmic evolution',
                        'Mind and matter unified'
                    ],
                    visual: 'cosmic-consciousness'
                },
                intention: 'The grand synthesis - everything connected',
                emotion: 'transcendent-unity'
            },
            
            // FUTURE IMPLICATIONS - Cards project forward
            {
                id: 'future-implications',
                scrollRange: [0.75, 0.85],
                cardBehavior: 'future-projection',
                content: {
                    implications: [
                        'Unification of physics and consciousness',
                        'New technologies based on information physics',
                        'Understanding of cosmic purpose',
                        'Humanity\'s role in universal consciousness',
                        'The next phase of evolution'
                    ],
                    visual: 'future-horizons'
                },
                intention: 'Where this leads - practical and profound implications',
                emotion: 'hope-determination'
            },
            
            // CALL TO ACTION - Cards invite participation
            {
                id: 'call-to-action',
                scrollRange: [0.85, 1.0],
                cardBehavior: 'invitation-to-participate',
                content: {
                    call: 'The Information Age has reached fundamental physics',
                    action: 'Join the great work of building a new science',
                    future: 'For a universe inseparable from consciousness',
                    visual: 'collaborative-future'
                },
                intention: 'Not just theory - a movement to join',
                emotion: 'inspiring-call'
            }
        ];
        
        // Card behavior definitions
        this.cardBehaviors = new Map();
        this.initializeCardBehaviors();
        
        console.log('📜 Scroll-Driven Narrative System initialized');
    }
    
    initializeCardBehaviors() {
        // UNIFIED ORIGIN - Single large card with cosmic background
        this.cardBehaviors.set('unified-origin', {
            cards: 1,
            layout: [{ position: { x: 0.5, y: 0.5 }, size: { width: 0.9, height: 0.7 } }],
            animation: 'cosmic-pulse',
            transition: 'none',
            intentionality: 'Show unity before division - all knowledge in one place'
        });
        
        // STRESS ACCUMULATION - Card begins to show cracks and instability
        this.cardBehaviors.set('stress-accumulation', {
            cards: 1,
            layout: [{ position: { x: 0.5, y: 0.5 }, size: { width: 0.85, height: 0.65 } }],
            animation: 'stress-visualization',
            effects: ['subtle-cracks', 'tension-lines', 'instability-shimmer'],
            intentionality: 'Build tension - the paradigm is failing'
        });
        
        // CATASTROPHIC SPLIT - Violent fracture into incompatible pieces
        this.cardBehaviors.set('catastrophic-split', {
            cards: 3,
            layout: [
                { position: { x: 0.25, y: 0.5 }, size: { width: 0.35, height: 0.5 } },
                { position: { x: 0.5, y: 0.3 }, size: { width: 0.4, height: 0.2 } },
                { position: { x: 0.75, y: 0.5 }, size: { width: 0.35, height: 0.5 } }
            ],
            animation: 'violent-fracture',
            effects: ['fracture-lines', 'debris-particles', 'energy-discharge'],
            intentionality: 'Show irreconcilable differences - physics is broken'
        });
        
        // VOID DEMONSTRATION - Cards float apart showing emptiness
        this.cardBehaviors.set('void-demonstration', {
            cards: 5,
            layout: 'scattered-void',
            animation: 'floating-in-emptiness',
            effects: ['vast-emptiness', 'lonely-isolation', 'dark-matter-halos'],
            intentionality: 'Demonstrate the scale of our ignorance - 95% unknown'
        });
        
        // DATA STREAM FORMATION - Cards flow like information rivers
        this.cardBehaviors.set('data-stream-formation', {
            cards: 5,
            layout: 'flowing-streams',
            animation: 'information-flow',
            effects: ['data-particles', 'stream-connections', 'flow-turbulence'],
            intentionality: 'Information as primary - everything else emergent'
        });
        
        // DIALECTICAL DANCE - Two forces in eternal interplay
        this.cardBehaviors.set('dialectical-dance', {
            cards: 2,
            layout: 'orbital-dance',
            animation: 'eternal-dialectic',
            effects: ['force-field-lines', 'energy-exchange', 'harmonic-resonance'],
            intentionality: 'Show the fundamental duality driving all existence'
        });
        
        // NEURAL NETWORK FORMATION - Cards become consciousness nodes
        this.cardBehaviors.set('neural-network-formation', {
            cards: 8,
            layout: 'consciousness-lattice',
            animation: 'neural-activation',
            effects: ['synaptic-connections', 'thought-propagation', 'awareness-expansion'],
            intentionality: 'Consciousness as physical network - not mystical'
        });
        
        // COSMIC COLLISION - Demonstrate the Bullet Cluster evidence
        this.cardBehaviors.set('cosmic-collision', {
            cards: 3,
            layout: 'collision-sequence',
            animation: 'cluster-collision',
            effects: ['gravitational-lensing', 'matter-separation', 'evidence-highlight'],
            intentionality: 'Show concrete evidence - theory makes predictions'
        });
        
        // UNIVERSAL SYNTHESIS - All knowledge integrates
        this.cardBehaviors.set('universal-synthesis', {
            cards: 'all-previous',
            layout: 'convergent-integration',
            animation: 'universal-unification',
            effects: ['synthesis-glow', 'knowledge-integration', 'transcendent-unity'],
            intentionality: 'Everything connects - the grand unified understanding'
        });
        
        // FUTURE PROJECTION - Cards project possibilities forward
        this.cardBehaviors.set('future-projection', {
            cards: 6,
            layout: 'forward-projection',
            animation: 'possibility-expansion',
            effects: ['future-light', 'potential-branches', 'hope-resonance'],
            intentionality: 'Show where this leads - practical implications'
        });
        
        // INVITATION TO PARTICIPATE - Cards invite viewer engagement
        this.cardBehaviors.set('invitation-to-participate', {
            cards: 4,
            layout: 'welcoming-circle',
            animation: 'invitation-gesture',
            effects: ['welcoming-glow', 'participation-portals', 'collaborative-energy'],
            intentionality: 'Not just theory - join the movement'
        });
    }
    
    initialize() {
        this.setupScrollContainer();
        this.setupScrollListeners();
        this.initializeFirstBeat();
        console.log('📜 Scroll narrative ready - cards are now a language of information');
    }
    
    setupScrollContainer() {
        // Create invisible scroll container with substantial height
        const scrollContainer = document.createElement('div');
        scrollContainer.id = 'narrative-scroll-container';
        scrollContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2000vh; /* 20x viewport height for detailed scroll control */
            pointer-events: none;
            z-index: 1000;
        `;
        
        document.body.appendChild(scrollContainer);
        this.maxScroll = scrollContainer.scrollHeight - window.innerHeight;
        
        // Add scroll position indicator
        this.createScrollIndicator();
    }
    
    createScrollIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'scroll-progress-indicator';
        indicator.style.cssText = `
            position: fixed;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            width: 4px;
            height: 200px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 2px;
            z-index: 2000;
        `;
        
        const progress = document.createElement('div');
        progress.id = 'scroll-progress-fill';
        progress.style.cssText = `
            width: 100%;
            height: 0%;
            background: linear-gradient(
                to bottom,
                var(--consciousness-color),
                var(--information-color),
                var(--integration-color)
            );
            border-radius: 2px;
            transition: height 0.3s ease;
        `;
        
        indicator.appendChild(progress);
        document.body.appendChild(indicator);
        
        this.scrollIndicator = progress;
    }
    
    setupScrollListeners() {
        let ticking = false;
        
        const updateScroll = () => {
            this.updateScrollPosition();
            ticking = false;
        };
        
        // Smooth scroll handling
        window.addEventListener('scroll', () => {
            this.scrollVelocity = (window.scrollY - this.scrollPosition) / (Date.now() - this.lastScrollTime);
            this.scrollPosition = window.scrollY;
            this.lastScrollTime = Date.now();
            
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        });
        
        // Touch and wheel support
        window.addEventListener('wheel', (event) => {
            event.preventDefault();
            const scrollDelta = event.deltaY * 0.5; // Slower, more controlled scrolling
            window.scrollBy(0, scrollDelta);
        }, { passive: false });
        
        // Keyboard navigation
        window.addEventListener('keydown', (event) => {
            switch(event.key) {
                case 'ArrowDown':
                case ' ':
                    event.preventDefault();
                    this.scrollToNextBeat();
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    this.scrollToPreviousBeat();
                    break;
                case 'Home':
                    event.preventDefault();
                    this.scrollToBeat(0);
                    break;
                case 'End':
                    event.preventDefault();
                    this.scrollToBeat(this.narrativeBeats.length - 1);
                    break;
            }
        });
    }
    
    updateScrollPosition() {
        const scrollProgress = Math.max(0, Math.min(1, window.scrollY / this.maxScroll));
        
        // Update scroll indicator
        this.scrollIndicator.style.height = (scrollProgress * 100) + '%';
        
        // Find current narrative beat
        const currentBeat = this.findCurrentBeat(scrollProgress);
        
        if (currentBeat && currentBeat.id !== this.currentNarrativePoint) {
            this.transitionToBeat(currentBeat, scrollProgress);
        } else if (currentBeat) {
            this.updateBeatProgress(currentBeat, scrollProgress);
        }
        
        // Update global EPO parameters based on narrative position
        this.updateGlobalParameters(scrollProgress);
    }
    
    findCurrentBeat(scrollProgress) {
        for (const beat of this.narrativeBeats) {
            if (scrollProgress >= beat.scrollRange[0] && scrollProgress <= beat.scrollRange[1]) {
                return beat;
            }
        }
        return null;
    }
    
    async transitionToBeat(beat, scrollProgress) {
        console.log(`📖 Transitioning to narrative beat: ${beat.id}`);
        console.log(`💭 Intention: ${beat.intention}`);
        console.log(`😊 Emotion: ${beat.emotion}`);
        
        this.currentNarrativePoint = beat.id;
        
        // Clear existing cards with appropriate exit animation
        await this.clearCardsWithIntention(beat);
        
        // Execute the card behavior for this beat
        await this.executeCardBehavior(beat, scrollProgress);
        
        // Update emergence visualization to match narrative
        this.synchronizeEmergenceVisualization(beat);
        
        // Update global emotional and intentional state
        this.updateNarrativeEmotion(beat);
    }
    
    async clearCardsWithIntention(beat) {
        const exitStyle = this.determineExitStyle(beat);
        
        for (const [cardId, card] of this.morphingCards.cards) {
            switch(exitStyle) {
                case 'gentle-fade':
                    await this.gentleFadeOut(card);
                    break;
                case 'explosive-destruction':
                    await this.explosiveDestruction(card);
                    break;
                case 'transformation-morph':
                    await this.transformationMorph(card);
                    break;
                case 'information-dissolve':
                    await this.informationDissolve(card);
                    break;
                case 'consciousness-absorption':
                    await this.consciousnessAbsorption(card);
                    break;
            }
            
            this.morphingCards.removeCard(cardId);
        }
    }
    
    determineExitStyle(beat) {
        const intentionMap = {
            'crisis-building': 'gentle-fade',
            'paradigm-fracture': 'explosive-destruction',
            'dark-matter-void': 'information-dissolve',
            'information-axiom': 'transformation-morph',
            'entropic-duality': 'transformation-morph',
            'consciousness-hierarchy': 'consciousness-absorption',
            'bullet-cluster-evidence': 'explosive-destruction',
            'universal-integration': 'consciousness-absorption',
            'future-implications': 'transformation-morph',
            'call-to-action': 'gentle-fade'
        };
        
        return intentionMap[beat.id] || 'gentle-fade';
    }
    
    async executeCardBehavior(beat, scrollProgress) {
        const behavior = this.cardBehaviors.get(beat.cardBehavior);
        if (!behavior) {
            console.warn(`Card behavior ${beat.cardBehavior} not found`);
            return;
        }
        
        console.log(`🎭 Executing card behavior: ${beat.cardBehavior}`);
        console.log(`🎯 Intentionality: ${behavior.intentionality}`);
        
        switch(beat.cardBehavior) {
            case 'unified-origin':
                await this.createUnifiedOriginCard(beat);
                break;
            case 'stress-accumulation':
                await this.createStressVisualization(beat);
                break;
            case 'catastrophic-split':
                await this.createCatastrophicSplit(beat);
                break;
            case 'void-demonstration':
                await this.createVoidDemonstration(beat);
                break;
            case 'data-stream-formation':
                await this.createDataStreams(beat);
                break;
            case 'dialectical-dance':
                await this.createDialecticalDance(beat);
                break;
            case 'neural-network-formation':
                await this.createNeuralNetwork(beat);
                break;
            case 'cosmic-collision':
                await this.createCosmicCollision(beat);
                break;
            case 'universal-synthesis':
                await this.createUniversalSynthesis(beat);
                break;
            case 'future-projection':
                await this.createFutureProjection(beat);
                break;
            case 'invitation-to-participate':
                await this.createInvitationToParticipate(beat);
                break;
        }
    }
    
    // CARD BEHAVIOR IMPLEMENTATIONS
    
    async createUnifiedOriginCard(beat) {
        const card = await this.morphingCards.createCard('genesis', {
            position: { x: 0.5, y: 0.5 },
            size: { width: 0.9, height: 0.7 }
        });
        
        card.setContent(`
            <div class="cosmic-title">
                <h1>${beat.content.primary}</h1>
                <h2>${beat.content.subtitle}</h2>
                <div class="cosmic-subtitle">by Paul Phillips</div>
            </div>
        `);
        
        // Cosmic pulse animation
        card.setParameter('cosmic_pulse', true);
        card.setParameter('information_density', 1.0);
        
        this.activeCards.set('genesis', card);
    }
    
    async createStressVisualization(beat) {
        const card = await this.morphingCards.createCard('crisis', {
            position: { x: 0.5, y: 0.5 },
            size: { width: 0.85, height: 0.65 }
        });
        
        card.setContent(`
            <div class="crisis-content">
                <h2>${beat.content.primary}</h2>
                <p class="crisis-warning">${beat.content.secondary}</p>
            </div>
        `);
        
        // Stress visualization effects
        card.setParameter('stress_level', 0.7);
        card.setParameter('paradigm_instability', 0.8);
        card.setParameter('crack_formation', 0.3);
        
        this.activeCards.set('crisis', card);
    }
    
    async createCatastrophicSplit(beat) {
        // Create the central conflict card
        const conflictCard = await this.morphingCards.createCard('conflict', {
            position: { x: 0.5, y: 0.3 },
            size: { width: 0.4, height: 0.2 }
        });
        
        conflictCard.setContent(`
            <div class="conflict-header">
                <h3>${beat.content.center}</h3>
            </div>
        `);
        
        // Create General Relativity card
        const grCard = await this.morphingCards.createCard('general-relativity', {
            position: { x: 0.25, y: 0.5 },
            size: { width: 0.35, height: 0.5 }
        });
        
        grCard.setContent(`
            <div class="theory-card gr-card">
                <h3>General Relativity</h3>
                <ul>
                    <li>Smooth spacetime</li>
                    <li>Deterministic</li>
                    <li>Geometric gravity</li>
                    <li>Large scale</li>
                </ul>
            </div>
        `);
        
        // Create Quantum Mechanics card
        const qmCard = await this.morphingCards.createCard('quantum-mechanics', {
            position: { x: 0.75, y: 0.5 },
            size: { width: 0.35, height: 0.5 }
        });
        
        qmCard.setContent(`
            <div class="theory-card qm-card">
                <h3>Quantum Mechanics</h3>
                <ul>
                    <li>Discrete quanta</li>
                    <li>Probabilistic</li>
                    <li>Observer effects</li>
                    <li>Microscopic scale</li>
                </ul>
            </div>
        `);
        
        // Animate the split with violent fracture effect
        await this.morphingCards.paradigmFracture(conflictCard, [
            { x: 0.3, y: 0.4 },
            { x: 0.7, y: 0.6 }
        ]);
        
        // Add incompatibility visualization
        grCard.setParameter('incompatibility_field', 0.9);
        qmCard.setParameter('incompatibility_field', 0.9);
        conflictCard.setParameter('theoretical_tension', 1.0);
        
        this.activeCards.set('conflict', conflictCard);
        this.activeCards.set('gr', grCard);
        this.activeCards.set('qm', qmCard);
    }
    
    async createVoidDemonstration(beat) {
        // Create scattered cards showing the components of the universe
        const components = [
            { name: 'Observable Matter', percentage: '5%', position: { x: 0.2, y: 0.3 } },
            { name: 'Dark Matter', percentage: '27%', position: { x: 0.7, y: 0.4 } },
            { name: 'Dark Energy', percentage: '68%', position: { x: 0.4, y: 0.7 } },
            { name: 'Unknown Physics', percentage: '???', position: { x: 0.6, y: 0.2 } },
            { name: 'ΛCDM Crisis', percentage: '95%', position: { x: 0.5, y: 0.5 } }
        ];
        
        for (const [index, component] of components.entries()) {
            const card = await this.morphingCards.createCard(`component-${index}`, {
                position: component.position,
                size: { width: 0.2, height: 0.15 }
            });
            
            card.setContent(`
                <div class="void-component">
                    <h4>${component.name}</h4>
                    <div class="percentage">${component.percentage}</div>
                </div>
            `);
            
            // Floating in vast emptiness
            card.setParameter('void_float', true);
            card.setParameter('cosmic_loneliness', 0.8);
            card.setParameter('dark_matter_halo', component.name.includes('Dark') ? 0.9 : 0.1);
            
            this.activeCards.set(`component-${index}`, card);
        }
    }
    
    async createDataStreams(beat) {
        // Create flowing information streams
        const streamCount = 5;
        
        for (let i = 0; i < streamCount; i++) {
            const card = await this.morphingCards.createCard(`stream-${i}`, {
                position: { x: 0.1 + (i * 0.2), y: 0.3 + Math.sin(i) * 0.2 },
                size: { width: 0.15, height: 0.4 }
            });
            
            card.setContent(`
                <div class="information-stream">
                    <div class="stream-content">${beat.content.flowing[i]}</div>
                </div>
            `);
            
            // Information flow effects
            card.setParameter('information_flow', true);
            card.setParameter('data_velocity', 0.3 + i * 0.1);
            card.setParameter('stream_turbulence', 0.2);
            
            this.activeCards.set(`stream-${i}`, card);
        }
    }
    
    async createDialecticalDance(beat) {
        // Create EPO-I (Integration) card
        const epoICard = await this.morphingCards.createCard('epo-integration', {
            position: { x: 0.3, y: 0.5 },
            size: { width: 0.3, height: 0.4 }
        });
        
        epoICard.setContent(`
            <div class="epo-force-card integration">
                <h3>${beat.content.epo_i.title}</h3>
                <ul>
                    ${beat.content.epo_i.points.map(point => `<li>${point}</li>`).join('')}
                </ul>
            </div>
        `);
        
        // Create EPO-D (Dispersion) card
        const epoDCard = await this.morphingCards.createCard('epo-dispersion', {
            position: { x: 0.7, y: 0.5 },
            size: { width: 0.3, height: 0.4 }
        });
        
        epoDCard.setContent(`
            <div class="epo-force-card dispersion">
                <h3>${beat.content.epo_d.title}</h3>
                <ul>
                    ${beat.content.epo_d.points.map(point => `<li>${point}</li>`).join('')}
                </ul>
            </div>
        `);
        
        // Execute dialectical dance
        await this.morphingCards.dialecticalDance(epoICard, epoDCard);
        
        this.activeCards.set('epo-i', epoICard);
        this.activeCards.set('epo-d', epoDCard);
    }
    
    async createNeuralNetwork(beat) {
        // Create consciousness hierarchy nodes
        const nodePositions = [
            { x: 0.5, y: 0.2 }, // Central hub
            { x: 0.3, y: 0.4 }, { x: 0.7, y: 0.4 }, // Secondary nodes
            { x: 0.2, y: 0.6 }, { x: 0.5, y: 0.6 }, { x: 0.8, y: 0.6 }, // Tertiary nodes
            { x: 0.1, y: 0.8 }, { x: 0.9, y: 0.8 } // Peripheral nodes
        ];
        
        for (const [index, position] of nodePositions.entries()) {
            const card = await this.morphingCards.createCard(`consciousness-node-${index}`, {
                position,
                size: { width: 0.12, height: 0.1 }
            });
            
            const tierContent = beat.content.network[Math.min(index, beat.content.network.length - 1)];
            card.setContent(`
                <div class="consciousness-node">
                    <div class="node-content">${tierContent}</div>
                </div>
            `);
            
            // Neural network effects
            card.setParameter('neural_activity', Math.random());
            card.setParameter('consciousness_tier', index);
            card.setParameter('synaptic_strength', 0.7);
            
            this.activeCards.set(`node-${index}`, card);
        }
        
        // Execute neural network formation
        await this.morphingCards.universalConsciousnessIntegration(Array.from(this.activeCards.values()));
    }
    
    async createCosmicCollision(beat) {
        // Create bullet cluster collision cards
        const cluster1 = await this.morphingCards.createCard('bullet-cluster-1', {
            position: { x: 0.2, y: 0.5 },
            size: { width: 0.25, height: 0.3 }
        });
        
        cluster1.setContent(`
            <div class="cluster-card">
                <h3>${beat.content.collision.cluster1}</h3>
                <div class="cluster-type">Visible Matter</div>
            </div>
        `);
        
        const cluster2 = await this.morphingCards.createCard('bullet-cluster-2', {
            position: { x: 0.8, y: 0.5 },
            size: { width: 0.25, height: 0.3 }
        });
        
        cluster2.setContent(`
            <div class="cluster-card">
                <h3>${beat.content.collision.cluster2}</h3>
                <div class="cluster-type">Gravitational Effects</div>
            </div>
        `);
        
        // Evidence card
        const evidenceCard = await this.morphingCards.createCard('bullet-evidence', {
            position: { x: 0.5, y: 0.7 },
            size: { width: 0.4, height: 0.2 }
        });
        
        evidenceCard.setContent(`
            <div class="evidence-card">
                <h3>${beat.content.collision.separation}</h3>
                <p>${beat.content.collision.interpretation}</p>
            </div>
        `);
        
        // Animate cosmic collision
        await this.animateClusterCollision(cluster1, cluster2);
        
        this.activeCards.set('cluster1', cluster1);
        this.activeCards.set('cluster2', cluster2);
        this.activeCards.set('evidence', evidenceCard);
    }
    
    async createUniversalSynthesis(beat) {
        // Bring all previous knowledge together
        const synthesisCard = await this.morphingCards.createCard('universal-synthesis', {
            position: { x: 0.5, y: 0.5 },
            size: { width: 0.8, height: 0.6 }
        });
        
        synthesisCard.setContent(`
            <div class="synthesis-content">
                <h2>Universal Integration</h2>
                <div class="synthesis-points">
                    ${beat.content.synthesis.map(point => `<div class="synthesis-point">${point}</div>`).join('')}
                </div>
            </div>
        `);
        
        // Universal consciousness effects
        synthesisCard.setParameter('universal_consciousness', 1.0);
        synthesisCard.setParameter('synthesis_glow', 1.0);
        synthesisCard.setParameter('transcendent_unity', 1.0);
        
        this.activeCards.set('synthesis', synthesisCard);
    }
    
    async createFutureProjection(beat) {
        // Create forward-looking implication cards
        const implications = beat.content.implications;
        
        for (const [index, implication] of implications.entries()) {
            const card = await this.morphingCards.createCard(`future-${index}`, {
                position: { 
                    x: 0.1 + (index % 3) * 0.3, 
                    y: 0.3 + Math.floor(index / 3) * 0.4 
                },
                size: { width: 0.25, height: 0.25 }
            });
            
            card.setContent(`
                <div class="future-implication">
                    <div class="implication-text">${implication}</div>
                </div>
            `);
            
            // Future projection effects
            card.setParameter('future_light', true);
            card.setParameter('possibility_branch', index);
            card.setParameter('hope_resonance', 0.8);
            
            this.activeCards.set(`future-${index}`, card);
        }
    }
    
    async createInvitationToParticipate(beat) {
        // Create welcoming call-to-action
        const callCard = await this.morphingCards.createCard('call-to-action', {
            position: { x: 0.5, y: 0.4 },
            size: { width: 0.7, height: 0.5 }
        });
        
        callCard.setContent(`
            <div class="call-to-action">
                <h2>${beat.content.call}</h2>
                <p class="action-text">${beat.content.action}</p>
                <p class="future-text">${beat.content.future}</p>
                <div class="participate-button">Join the Movement</div>
            </div>
        `);
        
        // Invitation effects
        callCard.setParameter('welcoming_glow', true);
        callCard.setParameter('participation_portal', true);
        callCard.setParameter('collaborative_energy', 1.0);
        
        this.activeCards.set('call', callCard);
    }
    
    // UTILITY METHODS
    
    updateBeatProgress(beat, scrollProgress) {
        // Calculate progress within this beat
        const beatStart = beat.scrollRange[0];
        const beatEnd = beat.scrollRange[1];
        const beatProgress = (scrollProgress - beatStart) / (beatEnd - beatStart);
        
        // Update active cards based on beat progress
        for (const [cardId, card] of this.activeCards) {
            this.updateCardForBeatProgress(card, beatProgress, beat);
        }
    }
    
    updateCardForBeatProgress(card, progress, beat) {
        // Update card parameters based on progress through the beat
        switch(beat.cardBehavior) {
            case 'stress-accumulation':
                card.setParameter('stress_level', 0.3 + progress * 0.6);
                card.setParameter('crack_formation', progress * 0.8);
                break;
            case 'dialectical-dance':
                card.setParameter('dance_intensity', progress);
                card.setParameter('energy_exchange', Math.sin(progress * Math.PI * 4) * 0.5 + 0.5);
                break;
            case 'neural-network-formation':
                card.setParameter('neural_activity', progress);
                card.setParameter('connection_strength', progress * 0.9);
                break;
        }
    }
    
    synchronizeEmergenceVisualization(beat) {
        // Update emergence engine to match narrative beat
        const emergenceLevels = {
            'genesis': 0,
            'crisis-building': 2,
            'paradigm-fracture': 1,
            'dark-matter-void': 13,
            'information-axiom': 4,
            'entropic-duality': 8,
            'consciousness-hierarchy': 15,
            'bullet-cluster-evidence': 14,
            'universal-integration': 15,
            'future-implications': 15,
            'call-to-action': 15
        };
        
        const targetLevel = emergenceLevels[beat.id] || 5;
        this.emergenceEngine.transitionToLevel(targetLevel);
        
        // Set EPO parameters based on beat emotion
        const epoSettings = this.getEPOSettingsForEmotion(beat.emotion);
        this.emergenceEngine.setEPOParameters(
            epoSettings.integration,
            epoSettings.dispersion,
            epoSettings.information,
            epoSettings.consciousness
        );
    }
    
    getEPOSettingsForEmotion(emotion) {
        const emotionSettings = {
            'wonder-anticipation': { integration: 0.7, dispersion: 0.3, information: 0.8, consciousness: 0.4 },
            'growing-unease': { integration: 0.4, dispersion: 0.6, information: 0.5, consciousness: 0.3 },
            'intellectual-crisis': { integration: 0.2, dispersion: 0.8, information: 0.3, consciousness: 0.2 },
            'humbling-realization': { integration: 0.1, dispersion: 0.9, information: 0.2, consciousness: 0.1 },
            'revelatory-clarity': { integration: 0.8, dispersion: 0.2, information: 0.9, consciousness: 0.6 },
            'dynamic-tension-resolution': { integration: 0.6, dispersion: 0.6, information: 0.7, consciousness: 0.5 },
            'expanding-awareness': { integration: 0.9, dispersion: 0.3, information: 0.9, consciousness: 0.8 },
            'scientific-vindication': { integration: 0.7, dispersion: 0.4, information: 0.8, consciousness: 0.6 },
            'transcendent-unity': { integration: 1.0, dispersion: 0.2, information: 1.0, consciousness: 1.0 },
            'hope-determination': { integration: 0.8, dispersion: 0.4, information: 0.8, consciousness: 0.7 },
            'inspiring-call': { integration: 0.9, dispersion: 0.5, information: 0.9, consciousness: 0.8 }
        };
        
        return emotionSettings[emotion] || { integration: 0.5, dispersion: 0.5, information: 0.5, consciousness: 0.5 };
    }
    
    updateNarrativeEmotion(beat) {
        // Update global emotional state
        this.narrativeTension = this.calculateTension(beat.emotion);
        this.revelationMagnitude = this.calculateRevelation(beat.emotion);
        
        // Update UI to reflect emotional state
        document.documentElement.style.setProperty('--narrative-tension', this.narrativeTension);
        document.documentElement.style.setProperty('--revelation-magnitude', this.revelationMagnitude);
    }
    
    calculateTension(emotion) {
        const tensionMap = {
            'wonder-anticipation': 0.3,
            'growing-unease': 0.6,
            'intellectual-crisis': 0.9,
            'humbling-realization': 0.7,
            'revelatory-clarity': 0.2,
            'dynamic-tension-resolution': 0.4,
            'expanding-awareness': 0.1,
            'scientific-vindication': 0.2,
            'transcendent-unity': 0.0,
            'hope-determination': 0.3,
            'inspiring-call': 0.4
        };
        
        return tensionMap[emotion] || 0.5;
    }
    
    calculateRevelation(emotion) {
        const revelationMap = {
            'wonder-anticipation': 0.2,
            'growing-unease': 0.1,
            'intellectual-crisis': 0.0,
            'humbling-realization': 0.6,
            'revelatory-clarity': 0.9,
            'dynamic-tension-resolution': 0.7,
            'expanding-awareness': 0.8,
            'scientific-vindication': 0.9,
            'transcendent-unity': 1.0,
            'hope-determination': 0.8,
            'inspiring-call': 0.7
        };
        
        return revelationMap[emotion] || 0.5;
    }
    
    updateGlobalParameters(scrollProgress) {
        // Update CSS variables for global EPO state
        this.informationDensity = Math.min(1.0, scrollProgress * 2);
        this.consciousnessLevel = Math.max(0, Math.min(1.0, (scrollProgress - 0.4) * 2));
        
        document.documentElement.style.setProperty('--information-density', this.informationDensity);
        document.documentElement.style.setProperty('--consciousness-level', this.consciousnessLevel);
        document.documentElement.style.setProperty('--cosmic-time', scrollProgress);
    }
    
    // NAVIGATION METHODS
    
    scrollToNextBeat() {
        const currentIndex = this.narrativeBeats.findIndex(beat => beat.id === this.currentNarrativePoint);
        const nextIndex = Math.min(currentIndex + 1, this.narrativeBeats.length - 1);
        this.scrollToBeat(nextIndex);
    }
    
    scrollToPreviousBeat() {
        const currentIndex = this.narrativeBeats.findIndex(beat => beat.id === this.currentNarrativePoint);
        const prevIndex = Math.max(currentIndex - 1, 0);
        this.scrollToBeat(prevIndex);
    }
    
    scrollToBeat(beatIndex) {
        const beat = this.narrativeBeats[beatIndex];
        if (!beat) return;
        
        const targetScroll = beat.scrollRange[0] * this.maxScroll;
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
    
    initializeFirstBeat() {
        // Start with the genesis beat
        const firstBeat = this.narrativeBeats[0];
        this.transitionToBeat(firstBeat, 0);
    }
    
    // ANIMATION UTILITIES
    
    async animateClusterCollision(cluster1, cluster2) {
        return new Promise(resolve => {
            const duration = 3000;
            const startTime = Date.now();
            
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Move clusters toward each other
                const pos1 = { x: 0.2 + progress * 0.15, y: 0.5 };
                const pos2 = { x: 0.8 - progress * 0.15, y: 0.5 };
                
                this.morphingCards.positionCard(cluster1.element, pos1, { width: 0.25, height: 0.3 });
                this.morphingCards.positionCard(cluster2.element, pos2, { width: 0.25, height: 0.3 });
                
                // Add collision effects at impact
                if (progress > 0.7) {
                    cluster1.setParameter('collision_shockwave', (progress - 0.7) * 3.33);
                    cluster2.setParameter('collision_shockwave', (progress - 0.7) * 3.33);
                }
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            };
            
            animate();
        });
    }
    
    // CARD EXIT ANIMATIONS
    
    async gentleFadeOut(card) {
        return new Promise(resolve => {
            card.element.style.transition = 'opacity 1s ease-out';
            card.element.style.opacity = '0';
            setTimeout(resolve, 1000);
        });
    }
    
    async explosiveDestruction(card) {
        card.setParameter('explosion_force', 1.0);
        card.setParameter('destruction_chaos', 1.0);
        return new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    async transformationMorph(card) {
        card.setParameter('morphing_state', 1.0);
        card.setParameter('information_flux', 1.0);
        return new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    async informationDissolve(card) {
        card.setParameter('information_dissolution', 1.0);
        card.setParameter('data_scatter', 1.0);
        return new Promise(resolve => setTimeout(resolve, 1200));
    }
    
    async consciousnessAbsorption(card) {
        card.setParameter('consciousness_absorption', 1.0);
        card.setParameter('awareness_integration', 1.0);
        return new Promise(resolve => setTimeout(resolve, 1800));
    }
}
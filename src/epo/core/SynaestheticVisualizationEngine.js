/**
 * @file SynaestheticVisualizationEngine.js
 * @description Multi-sensory EPO visualization where information density, consciousness, 
 * and EPO forces create synchronized visual + auditory + haptic experiences
 * Cards emerge with EPO-I fractals/symmetry and decay with EPO-D entropy
 */

export class SynaestheticVisualizationEngine {
    constructor(container) {
        this.container = container;
        
        // Audio context for procedural soundscapes
        this.audioContext = null;
        this.oscillators = new Map();
        this.gainNodes = new Map();
        this.analyserNode = null;
        this.frequencyData = null;
        
        // Haptic feedback (if available)
        this.hapticDevices = [];
        this.vibrationPatterns = new Map();
        
        // Synaesthetic mapping parameters
        this.sensoryMappings = {
            information: {
                visual: { hue: 280, saturation: 85, lightness: 70 }, // Purple-magenta
                audio: { baseFreq: 440, harmonics: 5, timbre: 'sine' },
                haptic: { intensity: 0.3, pattern: 'pulse', frequency: 8 }
            },
            consciousness: {
                visual: { hue: 45, saturation: 100, lightness: 70 }, // Golden yellow
                audio: { baseFreq: 528, harmonics: 8, timbre: 'triangle' }, // "Love frequency"
                haptic: { intensity: 0.5, pattern: 'wave', frequency: 4 }
            },
            epo_integration: {
                visual: { hue: 180, saturation: 80, lightness: 60 }, // Cyan-blue
                audio: { baseFreq: 396, harmonics: 3, timbre: 'sine' }, // "Liberation frequency"
                haptic: { intensity: 0.6, pattern: 'convergent', frequency: 6 }
            },
            epo_dispersion: {
                visual: { hue: 15, saturation: 90, lightness: 65 }, // Orange-red
                audio: { baseFreq: 741, harmonics: 2, timbre: 'sawtooth' }, // "Expression frequency"
                haptic: { intensity: 0.4, pattern: 'divergent', frequency: 12 }
            }
        };
        
        // Current sensory state
        this.currentState = {
            informationDensity: 0.3,
            consciousnessLevel: 0.1,
            epoIntegration: 0.5,
            epoDispersion: 0.5,
            emergenceLevel: 0,
            narrativeTension: 0.0
        };
        
        // Card emergence/decay tracking
        this.cardLifecycles = new Map();
        this.emergentStructures = [];
        this.decayingStructures = [];
        
        console.log('🎨 Synaesthetic Visualization Engine initialized');
        this.initialize();
    }
    
    async initialize() {
        try {
            await this.initializeAudioContext();
            this.initializeHaptics();
            this.createSensoryMappingInterface();
            this.startSensoryLoop();
            
            console.log('✅ Multi-sensory EPO experience ready');
        } catch (error) {
            console.error('⚠️ Synaesthetic engine initialization failed:', error);
            // Graceful degradation - visual only
        }
    }
    
    async initializeAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create analyser for real-time frequency analysis
            this.analyserNode = this.audioContext.createAnalyser();
            this.analyserNode.fftSize = 256;
            this.analyserNode.connect(this.audioContext.destination);
            
            this.frequencyData = new Uint8Array(this.analyserNode.frequencyBinCount);
            
            // Create EPO force oscillators
            this.createEPOForceOscillators();
            
            console.log('🎵 Audio context initialized');
        } catch (error) {
            console.warn('Audio not available:', error);
        }
    }
    
    createEPOForceOscillators() {
        if (!this.audioContext) return;
        
        // EPO-I Integration oscillator - harmonic, convergent
        const epoIGain = this.audioContext.createGain();
        epoIGain.gain.value = 0;
        epoIGain.connect(this.analyserNode);
        
        const epoIOsc = this.audioContext.createOscillator();
        epoIOsc.type = 'sine';
        epoIOsc.frequency.value = this.sensoryMappings.epo_integration.audio.baseFreq;
        epoIOsc.connect(epoIGain);
        epoIOsc.start();
        
        this.oscillators.set('epo-i', epoIOsc);
        this.gainNodes.set('epo-i', epoIGain);
        
        // EPO-D Dispersion oscillator - chaotic, divergent
        const epoDGain = this.audioContext.createGain();
        epoDGain.gain.value = 0;
        epoDGain.connect(this.analyserNode);
        
        const epoDOsc = this.audioContext.createOscillator();
        epoDOsc.type = 'sawtooth';
        epoDOsc.frequency.value = this.sensoryMappings.epo_dispersion.audio.baseFreq;
        epoDOsc.connect(epoDGain);
        epoDOsc.start();
        
        this.oscillators.set('epo-d', epoDOsc);
        this.gainNodes.set('epo-d', epoDGain);
        
        // Information density - complex harmonics
        const infoGain = this.audioContext.createGain();
        infoGain.gain.value = 0;
        infoGain.connect(this.analyserNode);
        
        const infoOsc = this.audioContext.createOscillator();
        infoOsc.type = 'triangle';
        infoOsc.frequency.value = this.sensoryMappings.information.audio.baseFreq;
        infoOsc.connect(infoGain);
        infoOsc.start();
        
        this.oscillators.set('information', infoOsc);
        this.gainNodes.set('information', infoGain);
        
        // Consciousness - transcendent frequencies
        const consciousnessGain = this.audioContext.createGain();
        consciousnessGain.gain.value = 0;
        consciousnessGain.connect(this.analyserNode);
        
        const consciousnessOsc = this.audioContext.createOscillator();
        consciousnessOsc.type = 'sine';
        consciousnessOsc.frequency.value = this.sensoryMappings.consciousness.audio.baseFreq;
        consciousnessOsc.connect(consciousnessGain);
        consciousnessOsc.start();
        
        this.oscillators.set('consciousness', consciousnessOsc);
        this.gainNodes.set('consciousness', consciousnessGain);
    }
    
    initializeHaptics() {
        // Check for haptic support
        if ('vibrate' in navigator) {
            this.hapticDevices.push('basic-vibration');
        }
        
        // Check for GamePad API haptics
        if ('getGamepads' in navigator) {
            const gamepads = navigator.getGamepads();
            for (const gamepad of gamepads) {
                if (gamepad && gamepad.vibrationActuator) {
                    this.hapticDevices.push(gamepad);
                }
            }
        }
        
        console.log(`🎮 Haptic devices found: ${this.hapticDevices.length}`);
    }
    
    // CARD LIFECYCLE MANAGEMENT WITH EPO FORCES
    
    trackCardEmergence(cardId, emergenceType, informationContent) {
        console.log(`🌱 Card emerging: ${cardId} (${emergenceType})`);
        
        const lifecycle = {
            id: cardId,
            phase: 'emerging',
            emergenceType: emergenceType,
            informationDensity: this.calculateInformationDensity(informationContent),
            epoI_influence: 0.8, // High integration during emergence
            epoD_influence: 0.2, // Low dispersion during formation
            fractalComplexity: this.calculateFractalComplexity(emergenceType),
            symmetryLevel: this.calculateSymmetryLevel(emergenceType),
            coherenceState: 'crystallizing',
            startTime: Date.now()
        };
        
        this.cardLifecycles.set(cardId, lifecycle);
        this.emergentStructures.push(lifecycle);
        
        // Trigger synaesthetic emergence experience
        this.triggerEmergenceExperience(lifecycle);
    }
    
    trackCardDecay(cardId, decayType) {
        console.log(`🍂 Card decaying: ${cardId} (${decayType})`);
        
        const lifecycle = this.cardLifecycles.get(cardId);
        if (lifecycle) {
            lifecycle.phase = 'decaying';
            lifecycle.decayType = decayType;
            lifecycle.epoI_influence = 0.2; // Low integration during decay
            lifecycle.epoD_influence = 0.8; // High dispersion during dissolution
            lifecycle.coherenceState = 'dissipating';
            lifecycle.decayStartTime = Date.now();
            
            this.decayingStructures.push(lifecycle);
            this.emergentStructures = this.emergentStructures.filter(s => s.id !== cardId);
            
            // Trigger synaesthetic decay experience
            this.triggerDecayExperience(lifecycle);
        }
    }
    
    calculateInformationDensity(content) {
        // Calculate information density based on content complexity
        const wordCount = content.split(' ').length;
        const uniqueWords = new Set(content.toLowerCase().split(' ')).size;
        const conceptDensity = uniqueWords / wordCount;
        const entropyMeasure = this.calculateShannonEntropy(content);
        
        return Math.min(1.0, (conceptDensity + entropyMeasure) / 2);
    }
    
    calculateShannonEntropy(text) {
        const charFreq = {};
        for (const char of text) {
            charFreq[char] = (charFreq[char] || 0) + 1;
        }
        
        const length = text.length;
        let entropy = 0;
        
        for (const freq of Object.values(charFreq)) {
            const p = freq / length;
            entropy -= p * Math.log2(p);
        }
        
        return entropy / 10; // Normalize
    }
    
    calculateFractalComplexity(emergenceType) {
        const complexityMap = {
            'unified-origin': 0.9, // High initial complexity
            'paradigm-fracture': 0.3, // Broken, simplified
            'information-stream': 0.7, // Flowing complexity
            'consciousness-node': 0.95, // Maximum fractal depth
            'evidence-synthesis': 0.8, // High but organized
            'future-projection': 0.6 // Moderate complexity
        };
        
        return complexityMap[emergenceType] || 0.5;
    }
    
    calculateSymmetryLevel(emergenceType) {
        const symmetryMap = {
            'unified-origin': 1.0, // Perfect symmetry
            'paradigm-fracture': 0.1, // Broken symmetry
            'dialectical-dance': 0.9, // High symmetry in opposition
            'consciousness-node': 0.8, // Neural symmetry
            'cosmic-collision': 0.4, // Disturbed symmetry
            'universal-synthesis': 0.95 // Near-perfect integration
        };
        
        return symmetryMap[emergenceType] || 0.5;
    }
    
    // SYNAESTHETIC EXPERIENCE TRIGGERS
    
    triggerEmergenceExperience(lifecycle) {
        // Visual: Fractal crystallization patterns
        this.visualizeEmergence(lifecycle);
        
        // Audio: Harmonic convergence
        this.auralizeEmergence(lifecycle);
        
        // Haptic: Crystallization vibrations
        this.haptifyEmergence(lifecycle);
    }
    
    triggerDecayExperience(lifecycle) {
        // Visual: Entropy and dissolution
        this.visualizeDecay(lifecycle);
        
        // Audio: Harmonic decay and noise
        this.auralizeDecay(lifecycle);
        
        // Haptic: Dissolution vibrations
        this.haptifyDecay(lifecycle);
    }
    
    visualizeEmergence(lifecycle) {
        const container = document.createElement('div');
        container.className = 'emergence-visualization';
        container.style.cssText = `
            position: absolute;
            pointer-events: none;
            z-index: 5;
            animation: fractalEmergence 3s ease-out forwards;
        `;
        
        // Create fractal emergence pattern
        const fractalCanvas = document.createElement('canvas');
        fractalCanvas.width = 200;
        fractalCanvas.height = 200;
        const ctx = fractalCanvas.getContext('2d');
        
        this.drawFractalEmergence(ctx, lifecycle);
        container.appendChild(fractalCanvas);
        
        this.container.appendChild(container);
        
        // Clean up after animation
        setTimeout(() => {
            if (container.parentElement) {
                container.parentElement.removeChild(container);
            }
        }, 3000);
    }
    
    drawFractalEmergence(ctx, lifecycle) {
        const centerX = 100;
        const centerY = 100;
        const maxIterations = 50;
        const complexity = lifecycle.fractalComplexity;
        const symmetry = lifecycle.symmetryLevel;
        
        // Draw Julia set variant based on EPO-I influence
        for (let x = 0; x < 200; x++) {
            for (let y = 0; y < 200; y++) {
                const zx = (x - centerX) / 50 * complexity;
                const zy = (y - centerY) / 50 * complexity;
                
                let iterations = 0;
                let currentX = zx;
                let currentY = zy;
                
                while (iterations < maxIterations && (currentX * currentX + currentY * currentY) < 4) {
                    const tempX = currentX * currentX - currentY * currentY + lifecycle.epoI_influence;
                    currentY = 2 * currentX * currentY + symmetry;
                    currentX = tempX;
                    iterations++;
                }
                
                // Color based on EPO forces
                const colorIntensity = iterations / maxIterations;
                const r = Math.floor(colorIntensity * lifecycle.epoI_influence * 255);
                const g = Math.floor(colorIntensity * lifecycle.informationDensity * 255);
                const b = Math.floor(colorIntensity * symmetry * 255);
                
                ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
                ctx.fillRect(x, y, 1, 1);
            }
        }
    }
    
    visualizeDecay(lifecycle) {
        const container = document.createElement('div');
        container.className = 'decay-visualization';
        container.style.cssText = `
            position: absolute;
            pointer-events: none;
            z-index: 5;
            animation: entropicDecay 2s ease-in forwards;
        `;
        
        // Create entropy dissolution pattern
        const decayCanvas = document.createElement('canvas');
        decayCanvas.width = 200;
        decayCanvas.height = 200;
        const ctx = decayCanvas.getContext('2d');
        
        this.drawEntropicDecay(ctx, lifecycle);
        container.appendChild(decayCanvas);
        
        this.container.appendChild(container);
        
        setTimeout(() => {
            if (container.parentElement) {
                container.parentElement.removeChild(container);
            }
        }, 2000);
    }
    
    drawEntropicDecay(ctx, lifecycle) {
        const particleCount = 100;
        const dispersionForce = lifecycle.epoD_influence;
        
        // Draw dispersing particles
        for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2;
            const distance = Math.random() * 100 * dispersionForce;
            const x = 100 + Math.cos(angle) * distance;
            const y = 100 + Math.sin(angle) * distance;
            
            const size = Math.random() * 3 + 1;
            const alpha = 1 - (distance / 100);
            
            ctx.fillStyle = `rgba(255, ${100 - distance}, 0, ${alpha})`;
            ctx.fillRect(x, y, size, size);
        }
        
        // Add noise for entropy
        const imageData = ctx.getImageData(0, 0, 200, 200);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            if (Math.random() < lifecycle.epoD_influence * 0.3) {
                data[i] = Math.random() * 255;     // Red
                data[i + 1] = Math.random() * 255; // Green
                data[i + 2] = Math.random() * 255; // Blue
            }
        }
        
        ctx.putImageData(imageData, 0, 0);
    }
    
    auralizeEmergence(lifecycle) {
        if (!this.audioContext) return;
        
        const duration = 3.0;
        const now = this.audioContext.currentTime;
        
        // Create harmonic emergence sound
        const gain = this.audioContext.createGain();
        gain.connect(this.analyserNode);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(lifecycle.fractalComplexity * 0.3, now + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.01, now + duration);
        
        const osc = this.audioContext.createOscillator();
        osc.type = 'sine';
        
        // Frequency based on information density and symmetry
        const baseFreq = 220 * (1 + lifecycle.informationDensity);
        osc.frequency.setValueAtTime(baseFreq * 0.5, now);
        osc.frequency.exponentialRampToValueAtTime(baseFreq, now + duration * 0.7);
        
        osc.connect(gain);
        osc.start(now);
        osc.stop(now + duration);
        
        // Add harmonics for complexity
        for (let i = 2; i <= Math.floor(lifecycle.fractalComplexity * 5) + 2; i++) {
            const harmonicGain = this.audioContext.createGain();
            harmonicGain.connect(this.analyserNode);
            harmonicGain.gain.setValueAtTime(0, now);
            harmonicGain.gain.linearRampToValueAtTime(lifecycle.symmetryLevel * 0.1 / i, now + 0.3);
            harmonicGain.gain.exponentialRampToValueAtTime(0.01, now + duration);
            
            const harmonicOsc = this.audioContext.createOscillator();
            harmonicOsc.type = 'sine';
            harmonicOsc.frequency.value = baseFreq * i;
            harmonicOsc.connect(harmonicGain);
            harmonicOsc.start(now);
            harmonicOsc.stop(now + duration);
        }
    }
    
    auralizeDecay(lifecycle) {
        if (!this.audioContext) return;
        
        const duration = 2.0;
        const now = this.audioContext.currentTime;
        
        // Create noise-based decay sound
        const bufferSize = this.audioContext.sampleRate * duration;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        
        // Generate pink noise for entropy
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
            b6 = white * 0.115926;
            
            // Amplitude decay over time
            const decayFactor = 1 - (i / bufferSize);
            data[i] = pink * lifecycle.epoD_influence * decayFactor;
        }
        
        const source = this.audioContext.createBufferSource();
        source.buffer = buffer;
        
        const gain = this.audioContext.createGain();
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + duration);
        
        source.connect(gain);
        gain.connect(this.analyserNode);
        source.start(now);
    }
    
    haptifyEmergence(lifecycle) {
        if (this.hapticDevices.length === 0) return;
        
        // Crystallization vibration pattern
        const pattern = [];
        const steps = 10;
        
        for (let i = 0; i < steps; i++) {
            const intensity = Math.floor((i / steps) * lifecycle.fractalComplexity * 100);
            const duration = 100 + (lifecycle.symmetryLevel * 50);
            pattern.push(intensity, duration);
        }
        
        if ('vibrate' in navigator) {
            navigator.vibrate(pattern);
        }
    }
    
    haptifyDecay(lifecycle) {
        if (this.hapticDevices.length === 0) return;
        
        // Dissolution vibration pattern
        const pattern = [];
        const steps = 8;
        
        for (let i = 0; i < steps; i++) {
            const intensity = Math.floor(((steps - i) / steps) * lifecycle.epoD_influence * 80);
            const duration = 80 + Math.random() * 40; // Random for entropy
            pattern.push(intensity, duration);
        }
        
        if ('vibrate' in navigator) {
            navigator.vibrate(pattern);
        }
    }
    
    // REAL-TIME EPO STATE UPDATES
    
    updateEPOState(newState) {
        const oldState = { ...this.currentState };
        this.currentState = { ...this.currentState, ...newState };
        
        // Update audio oscillators
        this.updateAudioState();
        
        // Update visual mappings
        this.updateVisualMappings();
        
        // Check for phase transitions
        this.checkPhaseTransitions(oldState, this.currentState);
    }
    
    updateAudioState() {
        if (!this.audioContext) return;
        
        const now = this.audioContext.currentTime;
        
        // EPO-I Integration oscillator
        const epoIGain = this.gainNodes.get('epo-i');
        if (epoIGain) {
            epoIGain.gain.linearRampToValueAtTime(
                this.currentState.epoIntegration * 0.2, 
                now + 0.1
            );
        }
        
        // EPO-D Dispersion oscillator
        const epoDGain = this.gainNodes.get('epo-d');
        if (epoDGain) {
            epoDGain.gain.linearRampToValueAtTime(
                this.currentState.epoDispersion * 0.15, 
                now + 0.1
            );
        }
        
        // Information density
        const infoGain = this.gainNodes.get('information');
        if (infoGain) {
            infoGain.gain.linearRampToValueAtTime(
                this.currentState.informationDensity * 0.25, 
                now + 0.1
            );
        }
        
        // Consciousness level
        const consciousnessGain = this.gainNodes.get('consciousness');
        if (consciousnessGain) {
            consciousnessGain.gain.linearRampToValueAtTime(
                this.currentState.consciousnessLevel * 0.3, 
                now + 0.1
            );
        }
    }
    
    updateVisualMappings() {
        // Update CSS variables for real-time visual changes
        const infoColor = this.generateSynaestheticColor('information', this.currentState.informationDensity);
        const consciousnessColor = this.generateSynaestheticColor('consciousness', this.currentState.consciousnessLevel);
        const epoIColor = this.generateSynaestheticColor('epo_integration', this.currentState.epoIntegration);
        const epoDColor = this.generateSynaestheticColor('epo_dispersion', this.currentState.epoDispersion);
        
        document.documentElement.style.setProperty('--synaesthetic-info-color', infoColor);
        document.documentElement.style.setProperty('--synaesthetic-consciousness-color', consciousnessColor);
        document.documentElement.style.setProperty('--synaesthetic-epo-i-color', epoIColor);
        document.documentElement.style.setProperty('--synaesthetic-epo-d-color', epoDColor);
        
        // Update particle density for visual representation
        document.documentElement.style.setProperty('--particle-density', this.currentState.informationDensity);
        document.documentElement.style.setProperty('--emergence-level-opacity', this.currentState.emergenceLevel / 15);
    }
    
    generateSynaestheticColor(type, intensity) {
        const mapping = this.sensoryMappings[type];
        if (!mapping) return '#ffffff';
        
        const hue = mapping.visual.hue;
        const saturation = mapping.visual.saturation * intensity;
        const lightness = mapping.visual.lightness * (0.3 + intensity * 0.7);
        
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
    
    checkPhaseTransitions(oldState, newState) {
        // Detect significant state changes that warrant special synaesthetic events
        
        // Consciousness emergence threshold
        if (oldState.consciousnessLevel < 0.5 && newState.consciousnessLevel >= 0.5) {
            this.triggerConsciousnessEmergenceEvent();
        }
        
        // Information saturation point
        if (oldState.informationDensity < 0.8 && newState.informationDensity >= 0.8) {
            this.triggerInformationSaturationEvent();
        }
        
        // EPO force balance shift
        const oldBalance = Math.abs(oldState.epoIntegration - oldState.epoDispersion);
        const newBalance = Math.abs(newState.epoIntegration - newState.epoDispersion);
        if (oldBalance > 0.3 && newBalance < 0.1) {
            this.triggerEPOBalanceEvent();
        }
    }
    
    triggerConsciousnessEmergenceEvent() {
        console.log('🧠 Consciousness emergence detected - triggering synaesthetic cascade');
        
        // Visual: Golden light burst
        // Audio: Harmonic convergence
        // Haptic: Expanding wave pattern
        
        this.createSpecialEvent('consciousness-emergence', {
            visual: 'golden-light-burst',
            audio: 'harmonic-convergence',
            haptic: 'expanding-wave',
            duration: 5000
        });
    }
    
    triggerInformationSaturationEvent() {
        console.log('💎 Information saturation detected - triggering crystallization event');
        
        this.createSpecialEvent('information-crystallization', {
            visual: 'fractal-crystallization',
            audio: 'harmonic-resolution',
            haptic: 'crystalline-structure',
            duration: 3000
        });
    }
    
    triggerEPOBalanceEvent() {
        console.log('⚖️ EPO force balance achieved - triggering harmony event');
        
        this.createSpecialEvent('epo-harmony', {
            visual: 'dual-spiral-dance',
            audio: 'perfect-harmony',
            haptic: 'balanced-oscillation',
            duration: 4000
        });
    }
    
    createSpecialEvent(eventType, config) {
        // Create immersive synaesthetic event
        const eventContainer = document.createElement('div');
        eventContainer.className = `synaesthetic-event ${eventType}`;
        eventContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 1000;
            animation: ${config.visual} ${config.duration}ms ease-out forwards;
        `;
        
        document.body.appendChild(eventContainer);
        
        // Trigger haptic feedback
        if (config.haptic && 'vibrate' in navigator) {
            this.triggerSpecialHaptic(config.haptic, config.duration);
        }
        
        // Clean up
        setTimeout(() => {
            if (eventContainer.parentElement) {
                eventContainer.parentElement.removeChild(eventContainer);
            }
        }, config.duration);
    }
    
    triggerSpecialHaptic(pattern, duration) {
        const patterns = {
            'expanding-wave': [0, 100, 200, 200, 300, 300, 400, 400, 500, 500],
            'crystalline-structure': [100, 50, 100, 50, 100, 50, 200, 100, 200, 100],
            'balanced-oscillation': [150, 100, 150, 100, 150, 100, 150, 100]
        };
        
        if (patterns[pattern]) {
            navigator.vibrate(patterns[pattern]);
        }
    }
    
    createSensoryMappingInterface() {
        // Create debug interface for adjusting synaesthetic mappings
        const interface_ = document.createElement('div');
        interface_.id = 'synaesthetic-interface';
        interface_.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            padding: 15px;
            border-radius: 10px;
            color: white;
            font-family: monospace;
            font-size: 12px;
            z-index: 2000;
            max-width: 250px;
        `;
        
        interface_.innerHTML = `
            <h4>🎨 Synaesthetic State</h4>
            <div>Information: <span id="info-level">0%</span></div>
            <div>Consciousness: <span id="consciousness-level">0%</span></div>
            <div>EPO-I: <span id="epo-i-level">0%</span></div>
            <div>EPO-D: <span id="epo-d-level">0%</span></div>
            <div>Emergence: <span id="emergence-level">0</span></div>
            <div class="frequency-display">
                <canvas id="frequency-canvas" width="200" height="50"></canvas>
            </div>
        `;
        
        document.body.appendChild(interface_);
        this.interface = interface_;
    }
    
    startSensoryLoop() {
        const updateLoop = () => {
            this.updateFrequencyDisplay();
            this.updateInterfaceDisplay();
            requestAnimationFrame(updateLoop);
        };
        
        updateLoop();
    }
    
    updateFrequencyDisplay() {
        if (!this.analyserNode || !this.frequencyData) return;
        
        const canvas = document.getElementById('frequency-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        this.analyserNode.getByteFrequencyData(this.frequencyData);
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(0, 0, 200, 50);
        
        const barWidth = 200 / this.frequencyData.length;
        
        for (let i = 0; i < this.frequencyData.length; i++) {
            const barHeight = (this.frequencyData[i] / 255) * 50;
            
            const hue = (i / this.frequencyData.length) * 360;
            ctx.fillStyle = `hsl(${hue}, 80%, 60%)`;
            ctx.fillRect(i * barWidth, 50 - barHeight, barWidth, barHeight);
        }
    }
    
    updateInterfaceDisplay() {
        const infoEl = document.getElementById('info-level');
        const consciousnessEl = document.getElementById('consciousness-level');
        const epoIEl = document.getElementById('epo-i-level');
        const epoDEl = document.getElementById('epo-d-level');
        const emergenceEl = document.getElementById('emergence-level');
        
        if (infoEl) infoEl.textContent = Math.round(this.currentState.informationDensity * 100) + '%';
        if (consciousnessEl) consciousnessEl.textContent = Math.round(this.currentState.consciousnessLevel * 100) + '%';
        if (epoIEl) epoIEl.textContent = Math.round(this.currentState.epoIntegration * 100) + '%';
        if (epoDEl) epoDEl.textContent = Math.round(this.currentState.epoDispersion * 100) + '%';
        if (emergenceEl) emergenceEl.textContent = this.currentState.emergenceLevel;
    }
    
    // PUBLIC API
    
    onCardEmerging(cardId, type, content) {
        this.trackCardEmergence(cardId, type, content);
    }
    
    onCardDecaying(cardId, type) {
        this.trackCardDecay(cardId, type);
    }
    
    updateState(newState) {
        this.updateEPOState(newState);
    }
    
    destroy() {
        // Clean up audio context
        if (this.audioContext) {
            this.audioContext.close();
        }
        
        // Remove interface
        if (this.interface && this.interface.parentElement) {
            this.interface.parentElement.removeChild(this.interface);
        }
        
        console.log('🧹 Synaesthetic Visualization Engine destroyed');
    }
}
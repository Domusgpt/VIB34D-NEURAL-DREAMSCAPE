/**
 * @file KineticTypographyEngine.js
 * @description Creates living mathematical equations and concepts that build dynamically
 * Typography that demonstrates EPO principles through its own behavior
 */

export class KineticTypographyEngine {
    constructor(container) {
        this.container = container;
        this.activeAnimations = new Map();
        this.equationElements = new Map();
        this.conceptElements = new Map();
        
        // Typography animation parameters
        this.animationSpeed = 1.0;
        this.complexityLevel = 0.5;
        this.epoForces = { integration: 0.5, dispersion: 0.5 };
        
        // Pre-defined equation animations for EPO paper
        this.equationLibrary = {
            'epo-force-law': {
                latex: 'F_{EPO} = -\\zeta_i\\nabla U_i + \\zeta_d\\nabla U_d',
                buildSequence: [
                    { text: 'F', position: 'left', delay: 0, emphasis: 'force' },
                    { text: '_{EPO}', position: 'subscript', delay: 500, emphasis: 'identity' },
                    { text: ' = ', position: 'center', delay: 1000, emphasis: 'equals' },
                    { text: '-\\zeta_i', position: 'right-start', delay: 1500, emphasis: 'integration' },
                    { text: '\\nabla U_i', position: 'right-next', delay: 2000, emphasis: 'potential' },
                    { text: ' + ', position: 'operator', delay: 2500, emphasis: 'addition' },
                    { text: '\\zeta_d', position: 'right-continue', delay: 3000, emphasis: 'dispersion' },
                    { text: '\\nabla U_d', position: 'right-end', delay: 3500, emphasis: 'potential' }
                ],
                meaning: 'The fundamental force of cosmic evolution'
            },
            
            'information-entropy': {
                latex: 'H = -\\sum_{i} p_i \\log_2(p_i)',
                buildSequence: [
                    { text: 'H', position: 'left', delay: 0, emphasis: 'information' },
                    { text: ' = ', position: 'center', delay: 500, emphasis: 'equals' },
                    { text: '-\\sum_{i}', position: 'right-start', delay: 1000, emphasis: 'summation' },
                    { text: 'p_i', position: 'right-next', delay: 1500, emphasis: 'probability' },
                    { text: '\\log_2(p_i)', position: 'right-end', delay: 2000, emphasis: 'logarithm' }
                ],
                meaning: 'Information content of a system'
            },
            
            'consciousness-integration': {
                latex: '\\Phi = \\int_{system} \\frac{\\partial I}{\\partial t} dt',
                buildSequence: [
                    { text: '\\Phi', position: 'left', delay: 0, emphasis: 'consciousness' },
                    { text: ' = ', position: 'center', delay: 500, emphasis: 'equals' },
                    { text: '\\int_{system}', position: 'right-start', delay: 1000, emphasis: 'integration' },
                    { text: '\\frac{\\partial I}{\\partial t}', position: 'right-next', delay: 1500, emphasis: 'information-flow' },
                    { text: 'dt', position: 'right-end', delay: 2000, emphasis: 'time' }
                ],
                meaning: 'Consciousness as integrated information over time'
            },
            
            'dark-matter-complexity': {
                latex: 'M_{observed} + M_{dark} = f(\\Sigma_{info})',
                buildSequence: [
                    { text: 'M_{observed}', position: 'left', delay: 0, emphasis: 'known' },
                    { text: ' + ', position: 'operator', delay: 500, emphasis: 'addition' },
                    { text: 'M_{dark}', position: 'center', delay: 1000, emphasis: 'mystery' },
                    { text: ' = ', position: 'equals', delay: 1500, emphasis: 'equals' },
                    { text: 'f(', position: 'right-start', delay: 2000, emphasis: 'function' },
                    { text: '\\Sigma_{info}', position: 'right-next', delay: 2500, emphasis: 'information' },
                    { text: ')', position: 'right-end', delay: 3000, emphasis: 'function' }
                ],
                meaning: 'Dark matter as informational complexity'
            }
        };
        
        // Concept animation definitions
        this.conceptLibrary = {
            'paradigm-shift': {
                phases: [
                    { text: 'MATERIALIST', style: 'solid', transform: 'scale(1)', color: '#ff6464' },
                    { text: 'MECHANISM', style: 'cracking', transform: 'scale(1.1)', color: '#ff8888' },
                    { text: 'BREAKING', style: 'fragmenting', transform: 'scale(0.8)', color: '#ffaaaa' },
                    { text: 'INFORMATION', style: 'emerging', transform: 'scale(1.2)', color: '#64c8ff' },
                    { text: 'PRIMACY', style: 'crystallizing', transform: 'scale(1)', color: '#4aaeff' }
                ],
                duration: 5000,
                meaning: 'The conceptual revolution from matter to information'
            },
            
            'epo-duality': {
                phases: [
                    { text: 'INTEGRATION', style: 'attracting', transform: 'translateX(-100px)', color: '#64ff64' },
                    { text: '⇌', style: 'oscillating', transform: 'scale(1.5)', color: '#ffffff' },
                    { text: 'DISPERSION', style: 'repelling', transform: 'translateX(100px)', color: '#ff6464' },
                    { text: 'DIALECTIC', style: 'unifying', transform: 'scale(1)', color: '#c864ff' }
                ],
                duration: 4000,
                meaning: 'The eternal cosmic dance of opposing forces'
            },
            
            'consciousness-emergence': {
                phases: [
                    { text: 'information', style: 'scattered', transform: 'scale(0.5)', color: '#888888' },
                    { text: 'integration', style: 'gathering', transform: 'scale(0.8)', color: '#aaaaaa' },
                    { text: 'coherence', style: 'organizing', transform: 'scale(1)', color: '#cccccc' },
                    { text: 'awareness', style: 'awakening', transform: 'scale(1.2)', color: '#ffdd00' },
                    { text: 'CONSCIOUSNESS', style: 'transcendent', transform: 'scale(1.5)', color: '#ffd700' }
                ],
                duration: 6000,
                meaning: 'The emergence of cosmic self-awareness'
            }
        };
        
        console.log('✍️ Kinetic Typography Engine initialized');
    }
    
    async animateEquation(equationId, targetElement, options = {}) {
        console.log(`📐 Animating equation: ${equationId}`);
        
        const equation = this.equationLibrary[equationId];
        if (!equation) {
            console.warn(`Equation ${equationId} not found`);
            return;
        }
        
        // Create equation container
        const container = this.createEquationContainer(targetElement, options);
        
        // Store for later reference
        this.equationElements.set(equationId, container);
        
        // Animate equation building
        await this.buildEquationSequentially(equation, container, options);
        
        // Add interactive behaviors
        this.addEquationInteractivity(container, equation);
        
        return container;
    }
    
    createEquationContainer(targetElement, options) {
        const container = document.createElement('div');
        container.className = 'kinetic-equation-container';
        container.style.cssText = `
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            min-height: 80px;
            font-family: 'Source Code Pro', monospace;
            font-size: ${options.fontSize || '28px'};
            color: white;
            perspective: 1000px;
            transform-style: preserve-3d;
        `;
        
        if (targetElement) {
            targetElement.appendChild(container);
        } else {
            this.container.appendChild(container);
        }
        
        return container;
    }
    
    async buildEquationSequentially(equation, container, options) {
        const buildPromises = equation.buildSequence.map(async (step, index) => {
            await new Promise(resolve => setTimeout(resolve, step.delay));
            
            // Create term element
            const termElement = this.createEquationTerm(step, options);
            
            // Add EPO-influenced entrance animation
            this.animateTermEntrance(termElement, step, index);
            
            container.appendChild(termElement);
            
            // Trigger related visual effects
            this.triggerTermEffects(step, termElement);
        });
        
        await Promise.all(buildPromises);
        
        // Final equation assembly animation
        await this.animateEquationAssembly(container, equation);
    }
    
    createEquationTerm(step, options) {
        const term = document.createElement('span');
        term.className = `equation-term emphasis-${step.emphasis}`;
        term.textContent = step.text;
        
        // Base styling
        term.style.cssText = `
            display: inline-block;
            opacity: 0;
            transform: translateY(50px) rotateX(90deg);
            transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
            position: relative;
            margin: 0 4px;
        `;
        
        // Emphasis-specific styling
        this.applyTermStyling(term, step.emphasis);
        
        return term;
    }
    
    applyTermStyling(term, emphasis) {
        const styles = {
            'force': {
                color: '#ff6464',
                textShadow: '0 0 20px rgba(255, 100, 100, 0.8)',
                fontWeight: 'bold'
            },
            'integration': {
                color: '#64ff64',
                textShadow: '0 0 20px rgba(100, 255, 100, 0.8)',
                fontSize: '1.1em'
            },
            'dispersion': {
                color: '#ff8864',
                textShadow: '0 0 20px rgba(255, 136, 100, 0.8)',
                fontSize: '1.1em'
            },
            'information': {
                color: '#c864ff',
                textShadow: '0 0 20px rgba(200, 100, 255, 0.8)',
                fontWeight: 'bold'
            },
            'consciousness': {
                color: '#ffd700',
                textShadow: '0 0 30px rgba(255, 215, 0, 1)',
                fontSize: '1.3em',
                fontWeight: 'bold'
            },
            'potential': {
                color: '#64c8ff',
                textShadow: '0 0 15px rgba(100, 200, 255, 0.6)'
            },
            'equals': {
                color: '#ffffff',
                fontSize: '1.2em',
                fontWeight: 'bold'
            },
            'operator': {
                color: '#ffffff',
                fontSize: '1.1em'
            }
        };
        
        const style = styles[emphasis] || {};
        Object.assign(term.style, style);
    }
    
    animateTermEntrance(termElement, step, index) {
        // EPO-influenced entrance based on term type
        const entranceAnimations = {
            'integration': () => {
                // Terms attract from multiple directions (EPO-I behavior)
                termElement.style.transform = 'translateY(0) rotateX(0deg) scale(1)';
                termElement.style.opacity = '1';
                
                // Create gravitational pull effect
                this.createGravitationalEffect(termElement);
            },
            'dispersion': () => {
                // Terms explode outward then settle (EPO-D behavior)
                termElement.style.transform = 'translateY(-20px) rotateX(0deg) scale(1.2)';
                termElement.style.opacity = '1';
                
                setTimeout(() => {
                    termElement.style.transform = 'translateY(0) rotateX(0deg) scale(1)';
                }, 200);
                
                // Create dispersive ripple effect
                this.createDispersiveEffect(termElement);
            },
            'consciousness': () => {
                // Terms emerge from quantum foam (consciousness emergence)
                termElement.style.transform = 'translateY(0) rotateX(0deg) scale(1)';
                termElement.style.opacity = '1';
                termElement.style.filter = 'blur(0px)';
                
                // Create consciousness glow effect
                this.createConsciousnessEffect(termElement);
            },
            'default': () => {
                termElement.style.transform = 'translateY(0) rotateX(0deg) scale(1)';
                termElement.style.opacity = '1';
            }
        };
        
        const animation = entranceAnimations[step.emphasis] || entranceAnimations['default'];
        
        // Slight delay for natural flow
        setTimeout(animation, 100);
    }
    
    triggerTermEffects(step, termElement) {
        // Trigger additional visual effects based on term type
        const effects = {
            'force': () => {
                // Create force field ripple
                this.createForceFieldEffect(termElement);
            },
            'integration': () => {
                // Create gravitational pull effect
                this.createGravitationalEffect(termElement);
            },
            'dispersion': () => {
                // Create dispersive ripple
                this.createDispersiveEffect(termElement);
            },
            'consciousness': () => {
                // Create consciousness glow
                this.createConsciousnessEffect(termElement);
            },
            'information': () => {
                // Create information particles
                this.createInformationParticles(termElement);
            }
        };
        
        const effect = effects[step.emphasis];
        if (effect) {
            setTimeout(effect, 200);
        }
    }
    
    createForceFieldEffect(element) {
        // Create rippling force field effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border: 1px solid #ff6464;
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            transform: translate(-50%, -50%);
            animation: forceFieldRipple 1.5s ease-out forwards;
        `;
        
        element.appendChild(ripple);
        setTimeout(() => ripple.remove(), 1500);
    }
    
    createInformationParticles(element) {
        // Create floating information particles
        const particleCount = 8;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: #c864ff;
                border-radius: 50%;
                pointer-events: none;
                z-index: -1;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                animation: informationFloat ${1000 + Math.random() * 1000}ms ease-out forwards;
            `;
            
            element.appendChild(particle);
            setTimeout(() => particle.remove(), 2000);
        }
    }
    
    createGravitationalEffect(element) {
        // Create particles that are attracted to the term
        const particleCount = 12;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'gravitational-particle';
            particle.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: #64ff64;
                border-radius: 50%;
                pointer-events: none;
                z-index: -1;
            `;
            
            // Random starting position around the element
            const angle = (i / particleCount) * Math.PI * 2;
            const radius = 100;
            const startX = Math.cos(angle) * radius;
            const startY = Math.sin(angle) * radius;
            
            particle.style.left = `${startX}px`;
            particle.style.top = `${startY}px`;
            particle.style.transform = 'translate(-50%, -50%)';
            
            element.appendChild(particle);
            
            // Animate particle toward center
            setTimeout(() => {
                particle.style.transition = 'all 1s ease-out';
                particle.style.left = '50%';
                particle.style.top = '50%';
                particle.style.opacity = '0';
                
                setTimeout(() => {
                    if (particle.parentElement) {
                        particle.parentElement.removeChild(particle);
                    }
                }, 1000);
            }, i * 50);
        }
    }
    
    createDispersiveEffect(element) {
        // Create ripple effect that expands outward
        const ripple = document.createElement('div');
        ripple.className = 'dispersive-ripple';
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border: 2px solid #ff8864;
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            transform: translate(-50%, -50%);
            animation: dispersiveRipple 1s ease-out forwards;
        `;
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentElement) {
                ripple.parentElement.removeChild(ripple);
            }
        }, 1000);
    }
    
    createConsciousnessEffect(element) {
        // Create expanding golden glow
        const glow = document.createElement('div');
        glow.className = 'consciousness-glow';
        glow.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            transform: translate(-50%, -50%);
            animation: consciousnessGlow 2s ease-out forwards;
        `;
        
        element.appendChild(glow);
        
        setTimeout(() => {
            if (glow.parentElement) {
                glow.parentElement.removeChild(glow);
            }
        }, 2000);
    }
    
    async animateEquationAssembly(container, equation) {
        console.log('🔧 Assembling complete equation...');
        
        // Add equation meaning display
        const meaningElement = document.createElement('div');
        meaningElement.className = 'equation-meaning';
        meaningElement.textContent = equation.meaning;
        meaningElement.style.cssText = `
            position: absolute;
            bottom: -40px;
            left: 50%;
            transform: translateX(-50%);
            font-family: 'Crimson Text', serif;
            font-size: 16px;
            font-style: italic;
            color: rgba(255, 255, 255, 0.7);
            text-align: center;
            opacity: 0;
            transition: opacity 1s ease-in;
        `;
        
        container.appendChild(meaningElement);
        
        // Animate meaning appearance
        setTimeout(() => {
            meaningElement.style.opacity = '1';
        }, 500);
        
        // Add equation glow effect
        container.style.boxShadow = '0 0 30px rgba(100, 200, 255, 0.3)';
        container.style.borderRadius = '10px';
        container.style.padding = '20px';
        container.style.background = 'rgba(0, 0, 0, 0.2)';
        container.style.backdropFilter = 'blur(10px)';
    }
    
    addEquationInteractivity(container, equation) {
        // Hover effects
        container.addEventListener('mouseenter', () => {
            container.style.transform = 'scale(1.05)';
            container.style.boxShadow = '0 0 50px rgba(100, 200, 255, 0.6)';
            
            // Highlight terms based on mouse position
            this.highlightEquationTerms(container);
        });
        
        container.addEventListener('mouseleave', () => {
            container.style.transform = 'scale(1)';
            container.style.boxShadow = '0 0 30px rgba(100, 200, 255, 0.3)';
            
            // Reset term highlighting
            this.resetEquationTerms(container);
        });
        
        // Click to show detailed explanation
        container.addEventListener('click', () => {
            this.showEquationExplanation(equation);
        });
    }
    
    highlightEquationTerms(container) {
        const terms = container.querySelectorAll('.equation-term');
        terms.forEach((term, index) => {
            setTimeout(() => {
                term.style.transform = 'scale(1.1) translateY(-2px)';
                term.style.filter = 'brightness(1.3)';
            }, index * 100);
        });
    }
    
    resetEquationTerms(container) {
        const terms = container.querySelectorAll('.equation-term');
        terms.forEach(term => {
            term.style.transform = 'scale(1) translateY(0)';
            term.style.filter = 'brightness(1)';
        });
    }
    
    async animateConcept(conceptId, targetElement, options = {}) {
        console.log(`💭 Animating concept: ${conceptId}`);
        
        const concept = this.conceptLibrary[conceptId];
        if (!concept) {
            console.warn(`Concept ${conceptId} not found`);
            return;
        }
        
        // Create concept container
        const container = this.createConceptContainer(targetElement, options);
        
        // Store for later reference
        this.conceptElements.set(conceptId, container);
        
        // Animate concept evolution
        await this.evolveConceptThroughPhases(concept, container, options);
        
        return container;
    }
    
    createConceptContainer(targetElement, options) {
        const container = document.createElement('div');
        container.className = 'kinetic-concept-container';
        container.style.cssText = `
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100px;
            font-family: 'Orbitron', sans-serif;
            font-size: ${options.fontSize || '32px'};
            font-weight: bold;
            text-align: center;
            perspective: 1000px;
            transform-style: preserve-3d;
        `;
        
        if (targetElement) {
            targetElement.appendChild(container);
        } else {
            this.container.appendChild(container);
        }
        
        return container;
    }
    
    async evolveConceptThroughPhases(concept, container, options) {
        const phaseDuration = concept.duration / concept.phases.length;
        
        for (let i = 0; i < concept.phases.length; i++) {
            const phase = concept.phases[i];
            
            // Create phase element
            const phaseElement = this.createPhaseElement(phase, options);
            
            // Clear previous phase
            if (i > 0) {
                await this.transitionBetweenPhases(container, phaseElement);
            } else {
                container.appendChild(phaseElement);
                this.animatePhaseEntrance(phaseElement, phase);
            }
            
            // Hold phase for duration
            await new Promise(resolve => setTimeout(resolve, phaseDuration));
        }
        
        // Add concept meaning
        await this.addConceptMeaning(container, concept);
    }
    
    createPhaseElement(phase, options) {
        const element = document.createElement('div');
        element.className = `concept-phase phase-style-${phase.style}`;
        element.textContent = phase.text;
        
        element.style.cssText = `
            position: absolute;
            color: ${phase.color};
            transform: ${phase.transform};
            transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
            text-shadow: 0 0 20px ${phase.color}80;
            letter-spacing: 2px;
        `;
        
        // Apply style-specific effects
        this.applyPhaseStyle(element, phase.style);
        
        return element;
    }
    
    applyPhaseStyle(element, style) {
        const styleEffects = {
            'cracking': () => {
                element.style.filter = 'blur(1px)';
                element.style.textShadow += ', 2px 2px 0px rgba(255,255,255,0.3)';
            },
            'fragmenting': () => {
                element.style.filter = 'blur(2px)';
                element.style.opacity = '0.7';
                element.style.textShadow = 'none';
            },
            'emerging': () => {
                element.style.filter = 'blur(0px)';
                element.style.opacity = '1';
                element.style.animation = 'conceptEmergence 1s ease-out';
            },
            'crystallizing': () => {
                element.style.filter = 'brightness(1.3)';
                element.style.textShadow += ', 0 0 40px currentColor';
            },
            'attracting': () => {
                element.style.animation = 'attractiveForce 2s ease-in-out infinite';
            },
            'repelling': () => {
                element.style.animation = 'repulsiveForce 2s ease-in-out infinite';
            },
            'oscillating': () => {
                element.style.animation = 'dialecticalOscillation 1s ease-in-out infinite';
            },
            'transcendent': () => {
                element.style.filter = 'brightness(1.5) blur(0px)';
                element.style.textShadow = '0 0 50px currentColor, 0 0 100px currentColor';
                element.style.animation = 'transcendentGlow 3s ease-in-out infinite';
            }
        };
        
        const effect = styleEffects[style];
        if (effect) effect();
    }
    
    async transitionBetweenPhases(container, newPhaseElement) {
        // Fade out current phase
        const currentPhase = container.querySelector('.concept-phase');
        if (currentPhase) {
            currentPhase.style.opacity = '0';
            currentPhase.style.transform += ' scale(0.8)';
            
            setTimeout(() => {
                if (currentPhase.parentElement) {
                    currentPhase.parentElement.removeChild(currentPhase);
                }
            }, 400);
        }
        
        // Add new phase with entrance animation
        setTimeout(() => {
            container.appendChild(newPhaseElement);
            this.animatePhaseEntrance(newPhaseElement);
        }, 200);
        
        return new Promise(resolve => setTimeout(resolve, 600));
    }
    
    animatePhaseEntrance(element, phase) {
        element.style.opacity = '0';
        element.style.transform += ' scale(0.5)';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = element.style.transform.replace('scale(0.5)', 'scale(1)');
        }, 50);
    }
    
    async addConceptMeaning(container, concept) {
        const meaningElement = document.createElement('div');
        meaningElement.className = 'concept-meaning';
        meaningElement.textContent = concept.meaning;
        meaningElement.style.cssText = `
            position: absolute;
            bottom: -50px;
            left: 50%;
            transform: translateX(-50%);
            font-family: 'Crimson Text', serif;
            font-size: 18px;
            font-style: italic;
            color: rgba(255, 255, 255, 0.8);
            text-align: center;
            max-width: 400px;
            opacity: 0;
            transition: opacity 1s ease-in;
        `;
        
        container.appendChild(meaningElement);
        
        setTimeout(() => {
            meaningElement.style.opacity = '1';
        }, 500);
    }
    
    showEquationExplanation(equation) {
        // Create modal overlay for detailed explanation
        const modal = document.createElement('div');
        modal.className = 'equation-explanation-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const content = document.createElement('div');
        content.style.cssText = `
            background: rgba(10, 10, 30, 0.95);
            padding: 40px;
            border-radius: 20px;
            border: 2px solid rgba(100, 200, 255, 0.5);
            max-width: 80vw;
            max-height: 80vh;
            overflow-y: auto;
            backdrop-filter: blur(20px);
        `;
        
        content.innerHTML = `
            <h3 style="color: #64c8ff; margin-bottom: 20px; font-family: 'Orbitron', sans-serif;">
                Equation Explanation
            </h3>
            <div style="font-family: 'Source Code Pro', monospace; font-size: 24px; color: white; margin-bottom: 20px; text-align: center;">
                ${equation.latex}
            </div>
            <p style="color: rgba(255,255,255,0.9); line-height: 1.6; font-family: 'Crimson Text', serif; font-size: 18px;">
                ${equation.meaning}
            </p>
            <button onclick="this.closest('.equation-explanation-modal').remove()" style="
                margin-top: 20px;
                padding: 10px 20px;
                background: #64c8ff;
                color: black;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
            ">Close</button>
        `;
        
        modal.appendChild(content);
        document.body.appendChild(modal);
        
        setTimeout(() => modal.style.opacity = '1', 50);
    }
    
    // PUBLIC API
    
    updateEPOForces(forces) {
        this.epoForces = { ...forces };
        
        // Update active animations based on EPO forces
        this.updateActiveAnimations();
    }
    
    updateActiveAnimations() {
        // Adjust animation speeds based on EPO forces
        const integrationInfluence = this.epoForces.integration;
        const dispersionInfluence = this.epoForces.dispersion;
        
        // Integration force makes animations more coherent and slower
        // Dispersion force makes animations more chaotic and faster
        this.animationSpeed = 0.5 + dispersionInfluence * 1.5;
        
        // Update CSS animation speeds
        document.documentElement.style.setProperty('--kinetic-animation-speed', this.animationSpeed);
    }
    
    clearAllAnimations() {
        this.equationElements.forEach((element, id) => {
            if (element.parentElement) {
                element.parentElement.removeChild(element);
            }
        });
        
        this.conceptElements.forEach((element, id) => {
            if (element.parentElement) {
                element.parentElement.removeChild(element);
            }
        });
        
        this.equationElements.clear();
        this.conceptElements.clear();
    }
    
    destroy() {
        this.clearAllAnimations();
        
        // Clear active animation references
        this.activeAnimations.clear();
        
        console.log('🧹 Kinetic Typography Engine destroyed');
    }
}
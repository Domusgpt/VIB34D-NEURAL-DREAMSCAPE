/**
 * @file EPOMathRenderer.js
 * @description Live mathematical equation visualization and manipulation for EPO
 * 
 * Handles real-time rendering of mathematical equations, parameter manipulation,
 * visual demonstrations of mathematical relationships, and interactive formula exploration
 */

export class EPOMathRenderer {
    constructor() {
        this.equations = new Map();
        this.activeRenderers = new Map();
        this.parameterControls = new Map();
        this.visualDemonstrations = new Map();
        this.mathJaxLoaded = false;
        this.canvasContexts = new Map();
        
        // Mathematical constants for EPO equations
        this.constants = {
            G: 6.67430e-11,        // Gravitational constant
            c: 299792458,          // Speed of light
            h: 6.62607015e-34,     // Planck constant
            kB: 1.380649e-23,      // Boltzmann constant
            π: Math.PI,
            e: Math.E
        };
        
        console.log('🧮 EPO Math Renderer initialized');
    }
    
    /**
     * Initialize the math rendering system
     */
    async initialize() {
        console.log('🚀 Initializing EPO Math Renderer...');
        
        try {
            // Load MathJax for equation rendering
            await this.loadMathJax();
            
            // Initialize core EPO equations
            this.initializeEPOEquations();
            
            // Setup interactive equation containers
            this.setupEquationContainers();
            
            // Initialize parameter control systems
            this.initializeParameterControls();
            
            // Setup visual demonstration canvases
            this.setupVisualizationCanvases();
            
            console.log('✅ EPO Math Renderer ready');
            
        } catch (error) {
            console.error('❌ EPO Math Renderer initialization failed:', error);
            throw error;
        }
    }
    
    /**
     * Load MathJax for mathematical notation rendering
     */
    async loadMathJax() {
        if (this.mathJaxLoaded) return;
        
        return new Promise((resolve, reject) => {
            // Configure MathJax
            window.MathJax = {
                tex: {
                    inlineMath: [['$', '$'], ['\\(', '\\)']],
                    displayMath: [['$$', '$$'], ['\\[', '\\]']],
                    processEscapes: true,
                    processEnvironments: true
                },
                options: {
                    renderActions: {
                        addMenu: [0, '', '']
                    }
                },
                startup: {
                    ready: () => {
                        console.log('📐 MathJax loaded and configured');
                        this.mathJaxLoaded = true;
                        resolve();
                    }
                }
            };
            
            // Load MathJax script
            const script = document.createElement('script');
            script.src = 'https://polyfill.io/v3/polyfill.min.js?features=es6';
            script.onload = () => {
                const mathJaxScript = document.createElement('script');
                mathJaxScript.id = 'MathJax-script';
                mathJaxScript.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
                mathJaxScript.async = true;
                mathJaxScript.onerror = reject;
                document.head.appendChild(mathJaxScript);
            };
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    
    /**
     * Initialize core EPO equations with their mathematical forms
     */
    initializeEPOEquations() {
        // Main EPO Force Law
        this.equations.set('epo-force-law', {
            name: 'EPO Force Law',
            latex: '\\vec{F}_{EPO} = -\\zeta_i \\nabla U_i + \\zeta_d \\nabla U_d',
            description: 'The fundamental force law combining integrative and dispersive drives',
            parameters: {
                'ζi': { value: 0.5, min: 0, max: 1, step: 0.01, label: 'Integration Coupling (ζᵢ)' },
                'ζd': { value: 0.5, min: 0, max: 1, step: 0.01, label: 'Dispersion Coupling (ζᵈ)' }
            },
            visualization: 'force-field',
            complexity: 'intermediate'
        });
        
        // Integrative Potential
        this.equations.set('integrative-potential', {
            name: 'Integrative Potential (Uᵢ)',
            latex: 'U_i(r) = -\\frac{1}{r}\\left[G \\cdot M + G_\\Phi \\cdot \\Phi + G_K \\cdot (K_0 - K)\\right]',
            description: 'Potential field responsible for attraction and organization',
            parameters: {
                'M': { value: 1.0, min: 0.1, max: 10, step: 0.1, label: 'Mass (M)' },
                'Φ': { value: 1.0, min: 0.1, max: 5, step: 0.1, label: 'Information Field (Φ)' },
                'K': { value: 0.5, min: 0, max: 2, step: 0.01, label: 'Complexity Index (K)' },
                'K0': { value: 1.0, min: 0.5, max: 2, step: 0.01, label: 'Reference Complexity (K₀)' }
            },
            visualization: 'potential-well',
            complexity: 'advanced'
        });
        
        // Dispersive Potential
        this.equations.set('dispersive-potential', {
            name: 'Dispersive Potential (Uᵈ)',
            latex: 'U_d(r) = +\\frac{1}{r}\\left[C_T \\cdot (k_B T) + C_R \\cdot \\rho_R\\right] + U_{vac}',
            description: 'Potential field responsible for dispersion and chaos',
            parameters: {
                'T': { value: 300, min: 1, max: 1000, step: 1, label: 'Temperature (K)' },
                'ρR': { value: 1.0, min: 0.1, max: 10, step: 0.1, label: 'Radiation Density (ρᴿ)' },
                'Uvac': { value: 0.1, min: 0, max: 1, step: 0.01, label: 'Vacuum Energy (Uᵥₐc)' }
            },
            visualization: 'potential-hill',
            complexity: 'advanced'
        });
        
        // Information-Energy Conservation
        this.equations.set('information-energy-conservation', {
            name: 'Information-Energy Conservation',
            latex: 'E_{total} = E_i + E_d = \\int U_i \\, d\\tau + \\int U_d \\, d\\tau',
            description: 'Conservation law for information-energy in EPO systems',
            parameters: {
                'Ei': { value: 1.0, min: 0, max: 10, step: 0.1, label: 'Integrative Energy (Eᵢ)' },
                'Ed': { value: 1.0, min: 0, max: 10, step: 0.1, label: 'Dispersive Energy (Eᵈ)' }
            },
            visualization: 'energy-conservation',
            complexity: 'intermediate'
        });
        
        // Consciousness Integration Formula
        this.equations.set('consciousness-integration', {
            name: 'Consciousness Integration Measure',
            latex: '\\Phi = \\int_{\\text{system}} \\frac{\\partial I(t)}{\\partial t} \\cdot \\mathcal{C}(r) \\, dr',
            description: 'Quantitative measure of consciousness emergence from information integration',
            parameters: {
                'I': { value: 0.5, min: 0, max: 1, step: 0.01, label: 'Information Integration (I)' },
                'C': { value: 0.3, min: 0, max: 1, step: 0.01, label: 'Connectivity (𝒞)' }
            },
            visualization: 'consciousness-field',
            complexity: 'expert'
        });
        
        // Spacetime Emergence Equation
        this.equations.set('spacetime-emergence', {
            name: 'Spacetime Emergence Condition',
            latex: 'G_{\\mu\\nu} = \\frac{8\\pi G}{c^4} T_{\\mu\\nu}^{(info)}',
            description: 'Einstein field equations with informational stress-energy tensor',
            parameters: {
                'ρinfo': { value: 1.0, min: 0.1, max: 10, step: 0.1, label: 'Information Density (ρᵢₙfₒ)' },
                'curvature': { value: 0.5, min: 0, max: 2, step: 0.01, label: 'Spacetime Curvature' }
            },
            visualization: 'spacetime-curvature',
            complexity: 'expert'
        });
        
        // Quantum Information Equation
        this.equations.set('quantum-information', {
            name: 'Quantum Information Dynamics',
            latex: 'i\\hbar\\frac{\\partial}{\\partial t}|\\psi\\rangle = \\hat{H}_{EPO}|\\psi\\rangle',
            description: 'Schrödinger equation with EPO Hamiltonian for information dynamics',
            parameters: {
                'ψ': { value: 1.0, min: 0, max: 2, step: 0.01, label: 'Wave Function Amplitude (ψ)' },
                'phase': { value: 0, min: 0, max: 2*Math.PI, step: 0.01, label: 'Quantum Phase (φ)' }
            },
            visualization: 'quantum-wave',
            complexity: 'expert'
        });
        
        console.log(`📝 Initialized ${this.equations.size} EPO equations`);
    }
    
    /**
     * Setup interactive equation containers in the DOM
     */
    setupEquationContainers() {
        // Find all equation containers in the document
        const equationContainers = document.querySelectorAll('.equation-interactive');
        
        equationContainers.forEach(container => {
            const equationId = container.dataset.equation;
            if (!equationId || !this.equations.has(equationId)) return;
            
            const equation = this.equations.get(equationId);
            
            // Create equation display structure
            container.innerHTML = `
                <div class="equation-header">
                    <h4 class="equation-title">${equation.name}</h4>
                    <div class="equation-complexity">${equation.complexity}</div>
                </div>
                <div class="equation-math" id="math-${equationId}">
                    $$${equation.latex}$$
                </div>
                <div class="equation-description">
                    ${equation.description}
                </div>
                <div class="equation-controls" id="controls-${equationId}">
                    <!-- Parameter controls will be inserted here -->
                </div>
                <div class="equation-visualization">
                    <canvas id="viz-${equationId}" width="400" height="300"></canvas>
                </div>
                <div class="equation-actions">
                    <button class="demonstrate-btn" data-equation="${equationId}">🎨 Demonstrate</button>
                    <button class="analyze-btn" data-equation="${equationId}">🔍 Analyze</button>
                    <button class="reset-btn" data-equation="${equationId}">🔄 Reset</button>
                </div>
            `;
            
            // Setup parameter controls for this equation
            this.setupEquationControls(equationId, container);
            
            // Initialize visualization canvas
            this.initializeEquationCanvas(equationId);
        });
        
        // Re-render MathJax for new equations
        if (this.mathJaxLoaded && window.MathJax) {
            window.MathJax.typesetPromise();
        }
    }
    
    /**
     * Setup parameter controls for a specific equation
     */
    setupEquationControls(equationId, container) {
        const equation = this.equations.get(equationId);
        if (!equation) return;
        
        const controlsContainer = container.querySelector(`#controls-${equationId}`);
        if (!controlsContainer) return;
        
        // Create parameter sliders
        Object.entries(equation.parameters).forEach(([paramName, config]) => {
            const controlElement = document.createElement('div');
            controlElement.className = 'parameter-control';
            controlElement.innerHTML = `
                <label class="parameter-label">${config.label}</label>
                <div class="parameter-slider-container">
                    <input type="range" 
                           class="parameter-slider"
                           id="param-${equationId}-${paramName}"
                           min="${config.min}"
                           max="${config.max}"
                           step="${config.step}"
                           value="${config.value}"
                           data-equation="${equationId}"
                           data-parameter="${paramName}">
                    <span class="parameter-value" id="value-${equationId}-${paramName}">${config.value}</span>
                </div>
            `;
            
            controlsContainer.appendChild(controlElement);
            
            // Add event listener for parameter changes
            const slider = controlElement.querySelector('.parameter-slider');
            const valueDisplay = controlElement.querySelector('.parameter-value');
            
            slider.addEventListener('input', (event) => {
                const newValue = parseFloat(event.target.value);
                valueDisplay.textContent = newValue.toFixed(3);
                
                // Update equation parameter
                equation.parameters[paramName].value = newValue;
                
                // Trigger real-time visualization update
                this.updateEquationVisualization(equationId);
                
                // Update mathematical display if needed
                this.updateEquationDisplay(equationId);
            });
        });
        
        // Store controls reference
        this.parameterControls.set(equationId, controlsContainer);
    }
    
    /**
     * Initialize visualization canvas for equation
     */
    initializeEquationCanvas(equationId) {
        const canvas = document.getElementById(`viz-${equationId}`);
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        this.canvasContexts.set(equationId, ctx);
        
        // Set up canvas styling
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Initial visualization
        this.renderEquationVisualization(equationId);
    }
    
    /**
     * Render equation with current parameters and trigger visualization
     */
    renderEquation(equationId, parameters = {}) {
        console.log(`🧮 Rendering equation: ${equationId}`);
        
        const equation = this.equations.get(equationId);
        if (!equation) {
            console.warn(`Equation not found: ${equationId}`);
            return;
        }
        
        // Update equation parameters if provided
        Object.entries(parameters).forEach(([param, value]) => {
            if (equation.parameters[param]) {
                equation.parameters[param].value = value;
            }
        });
        
        // Update parameter controls UI
        this.updateParameterControls(equationId);
        
        // Update mathematical display
        this.updateEquationDisplay(equationId);
        
        // Update visualization
        this.updateEquationVisualization(equationId);
        
        // Record rendering event
        console.log(`✅ Equation rendered: ${equation.name}`);
    }
    
    /**
     * Update equation display with current parameter values
     */
    updateEquationDisplay(equationId) {
        const equation = this.equations.get(equationId);
        if (!equation) return;
        
        // For simple demonstrations, we'll update a parameter display
        // In a full implementation, this might substitute values into LaTeX
        const mathContainer = document.getElementById(`math-${equationId}`);
        if (!mathContainer) return;
        
        // Add parameter values display below the equation
        let parameterDisplay = mathContainer.querySelector('.parameter-values');
        if (!parameterDisplay) {
            parameterDisplay = document.createElement('div');
            parameterDisplay.className = 'parameter-values';
            mathContainer.appendChild(parameterDisplay);
        }
        
        const parameterText = Object.entries(equation.parameters)
            .map(([name, config]) => `${name} = ${config.value.toFixed(3)}`)
            .join(', ');
        
        parameterDisplay.innerHTML = `<small>Current values: ${parameterText}</small>`;
    }
    
    /**
     * Update parameter control UI elements
     */
    updateParameterControls(equationId) {
        const equation = this.equations.get(equationId);
        if (!equation) return;
        
        Object.entries(equation.parameters).forEach(([paramName, config]) => {
            const slider = document.getElementById(`param-${equationId}-${paramName}`);
            const valueDisplay = document.getElementById(`value-${equationId}-${paramName}`);
            
            if (slider) slider.value = config.value;
            if (valueDisplay) valueDisplay.textContent = config.value.toFixed(3);
        });
    }
    
    /**
     * Update equation visualization based on current parameters
     */
    updateEquationVisualization(equationId) {
        const equation = this.equations.get(equationId);
        if (!equation) return;
        
        // Render visualization based on equation type
        switch (equation.visualization) {
            case 'force-field':
                this.renderForceFieldVisualization(equationId);
                break;
            case 'potential-well':
                this.renderPotentialWellVisualization(equationId);
                break;
            case 'potential-hill':
                this.renderPotentialHillVisualization(equationId);
                break;
            case 'energy-conservation':
                this.renderEnergyConservationVisualization(equationId);
                break;
            case 'consciousness-field':
                this.renderConsciousnessFieldVisualization(equationId);
                break;
            case 'spacetime-curvature':
                this.renderSpacetimeCurvatureVisualization(equationId);
                break;
            case 'quantum-wave':
                this.renderQuantumWaveVisualization(equationId);
                break;
            default:
                this.renderGenericVisualization(equationId);
        }
    }
    
    /**
     * Render force field visualization for EPO Force Law
     */
    renderForceFieldVisualization(equationId) {
        const ctx = this.canvasContexts.get(equationId);
        const equation = this.equations.get(equationId);
        if (!ctx || !equation) return;
        
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        
        // Clear canvas
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, width, height);
        
        const zetaI = equation.parameters['ζi'].value;
        const zetaD = equation.parameters['ζd'].value;
        
        // Draw force field vectors
        const gridSize = 20;
        for (let x = gridSize; x < width; x += gridSize) {
            for (let y = gridSize; y < height; y += gridSize) {
                const centerX = width / 2;
                const centerY = height / 2;
                
                // Calculate distance from center
                const dx = x - centerX;
                const dy = y - centerY;
                const r = Math.sqrt(dx * dx + dy * dy);
                
                if (r < 10) continue; // Skip center point
                
                // Calculate EPO forces
                const forceI = zetaI / (r * r); // Attractive (toward center)
                const forceD = zetaD / (r * r); // Repulsive (away from center)
                const netForce = forceI - forceD;
                
                // Draw force vector
                const scale = 500;
                const vectorLength = Math.abs(netForce) * scale;
                const vectorX = netForce > 0 ? -dx / r * vectorLength : dx / r * vectorLength;
                const vectorY = netForce > 0 ? -dy / r * vectorLength : dy / r * vectorLength;
                
                // Color based on force type
                if (netForce > 0) {
                    ctx.strokeStyle = `rgba(100, 200, 255, ${Math.min(vectorLength / 20, 1)})`;
                } else {
                    ctx.strokeStyle = `rgba(255, 100, 100, ${Math.min(vectorLength / 20, 1)})`;
                }
                
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + vectorX, y + vectorY);
                ctx.stroke();
                
                // Draw arrowhead
                const angle = Math.atan2(vectorY, vectorX);
                const arrowLength = 3;
                ctx.beginPath();
                ctx.moveTo(x + vectorX, y + vectorY);
                ctx.lineTo(
                    x + vectorX - arrowLength * Math.cos(angle - Math.PI / 6),
                    y + vectorY - arrowLength * Math.sin(angle - Math.PI / 6)
                );
                ctx.moveTo(x + vectorX, y + vectorY);
                ctx.lineTo(
                    x + vectorX - arrowLength * Math.cos(angle + Math.PI / 6),
                    y + vectorY - arrowLength * Math.sin(angle + Math.PI / 6)
                );
                ctx.stroke();
            }
        }
        
        // Draw central mass
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, 5, 0, 2 * Math.PI);
        ctx.fill();
        
        // Add legend
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.fillText(`ζᵢ = ${zetaI.toFixed(2)} (Integration)`, 10, 20);
        ctx.fillText(`ζᵈ = ${zetaD.toFixed(2)} (Dispersion)`, 10, 35);
    }
    
    /**
     * Render potential well visualization
     */
    renderPotentialWellVisualization(equationId) {
        const ctx = this.canvasContexts.get(equationId);
        const equation = this.equations.get(equationId);
        if (!ctx || !equation) return;
        
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        
        // Clear canvas
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, width, height);
        
        // Get parameters
        const M = equation.parameters['M'].value;
        const phi = equation.parameters['Φ'].value;
        const K = equation.parameters['K'].value;
        const K0 = equation.parameters['K0'].value;
        
        // Draw potential curve
        ctx.strokeStyle = '#64c8ff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        for (let x = 1; x < width; x++) {
            const r = x / 50; // Scale for visualization
            const U = -(this.constants.G * M + phi + (K0 - K)) / r;
            const y = height / 2 - U * 50; // Scale and center
            
            if (x === 1) {
                ctx.moveTo(x, Math.max(0, Math.min(height, y)));
            } else {
                ctx.lineTo(x, Math.max(0, Math.min(height, y)));
            }
        }
        ctx.stroke();
        
        // Add labels
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.fillText('Integrative Potential Well', 10, 20);
        ctx.fillText(`M = ${M.toFixed(1)}, Φ = ${phi.toFixed(1)}`, 10, 35);
    }
    
    /**
     * Render generic visualization for unspecified equation types
     */
    renderGenericVisualization(equationId) {
        const ctx = this.canvasContexts.get(equationId);
        if (!ctx) return;
        
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        
        // Clear canvas
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, width, height);
        
        // Draw placeholder visualization
        ctx.strokeStyle = '#64c8ff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        for (let x = 0; x < width; x++) {
            const t = x / width * 4 * Math.PI;
            const y = height / 2 + Math.sin(t) * height / 4;
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
        
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.fillText('Mathematical Visualization', 10, 20);
    }
    
    /**
     * Render equation visualization
     */
    renderEquationVisualization(equationId) {
        this.updateEquationVisualization(equationId);
    }
    
    /**
     * Get equation by ID
     */
    getEquation(equationId) {
        return this.equations.get(equationId);
    }
    
    /**
     * Get all available equations
     */
    getAllEquations() {
        return Array.from(this.equations.entries()).map(([id, equation]) => ({
            id,
            name: equation.name,
            complexity: equation.complexity
        }));
    }
}
/**
 * @file EPOConfigSystem.js
 * @description Configuration management system for EPO Interactive Academic Experience
 * 
 * Handles section-specific parameters, user preferences, performance settings,
 * and system-wide configuration for the EPO visualization system
 */

export class EPOConfigSystem {
    constructor() {
        this.configurations = new Map();
        this.userPreferences = new Map();
        this.performanceSettings = new Map();
        this.defaultConfigurations = new Map();
        this.activeProfile = 'default';
        this.configVersion = '1.0.0';
        
        // Configuration storage keys
        this.storageKeys = {
            userPrefs: 'epo-user-preferences',
            performance: 'epo-performance-settings',
            activeProfile: 'epo-active-profile'
        };
        
        console.log('⚙️ EPO Config System initialized');
    }
    
    /**
     * Initialize configuration system and load settings
     */
    async initialize() {
        console.log('🚀 Initializing EPO Config System...');
        
        try {
            // Load default configurations
            this.loadDefaultConfigurations();
            
            // Load user preferences from storage
            await this.loadUserPreferences();
            
            // Load performance settings
            await this.loadPerformanceSettings();
            
            // Initialize section-specific configurations
            this.initializeSectionConfigurations();
            
            // Setup configuration validation
            this.setupConfigurationValidation();
            
            console.log('✅ EPO Config System ready');
            
        } catch (error) {
            console.error('❌ EPO Config System initialization failed:', error);
            throw error;
        }
    }
    
    /**
     * Load default system configurations
     */
    loadDefaultConfigurations() {
        // Performance presets
        this.defaultConfigurations.set('performance-high', {
            visualizationQuality: 'high',
            frameRate: 60,
            particleCount: 10000,
            shaderComplexity: 'maximum',
            antiAliasing: true,
            postProcessing: true,
            realTimeUpdates: true
        });
        
        this.defaultConfigurations.set('performance-medium', {
            visualizationQuality: 'medium',
            frameRate: 30,
            particleCount: 5000,
            shaderComplexity: 'moderate',
            antiAliasing: true,
            postProcessing: false,
            realTimeUpdates: true
        });
        
        this.defaultConfigurations.set('performance-low', {
            visualizationQuality: 'low',
            frameRate: 30,
            particleCount: 2000,
            shaderComplexity: 'basic',
            antiAliasing: false,
            postProcessing: false,
            realTimeUpdates: false
        });
        
        // Visual style presets
        this.defaultConfigurations.set('visual-academic', {
            colorScheme: 'academic',
            contrast: 'high',
            textSize: 'medium',
            animationSpeed: 'moderate',
            effectIntensity: 'subtle',
            backgroundOpacity: 0.6
        });
        
        this.defaultConfigurations.set('visual-vibrant', {
            colorScheme: 'vibrant',
            contrast: 'high',
            textSize: 'medium',
            animationSpeed: 'fast',
            effectIntensity: 'strong',
            backgroundOpacity: 0.4
        });
        
        this.defaultConfigurations.set('visual-minimal', {
            colorScheme: 'minimal',
            contrast: 'medium',
            textSize: 'large',
            animationSpeed: 'slow',
            effectIntensity: 'minimal',
            backgroundOpacity: 0.8
        });
        
        // Accessibility presets
        this.defaultConfigurations.set('accessibility-standard', {
            highContrast: false,
            reducedMotion: false,
            largeText: false,
            screenReaderOptimized: false,
            keyboardNavigationEnhanced: true,
            colorBlindFriendly: false
        });
        
        this.defaultConfigurations.set('accessibility-enhanced', {
            highContrast: true,
            reducedMotion: true,
            largeText: true,
            screenReaderOptimized: true,
            keyboardNavigationEnhanced: true,
            colorBlindFriendly: true
        });
        
        console.log(`📋 Loaded ${this.defaultConfigurations.size} default configurations`);
    }
    
    /**
     * Initialize section-specific configurations for each EPO part
     */
    initializeSectionConfigurations() {
        // Introduction Section
        this.configurations.set('introduction', {
            sectionId: 'introduction',
            title: 'The Entropic Principle of Organization',
            subtitle: 'A Framework for Informational Physics and Emergent Reality',
            visualParameters: {
                epoIntegration: 0.5,
                epoDispersion: 0.5,
                informationDensity: 0.6,
                consciousnessLevel: 0.3,
                spacetimeCurvature: 0.0,
                quantumCoherence: 0.4
            },
            colorScheme: {
                primary: [0.4, 0.8, 1.0],      // Cyan
                secondary: [0.6, 0.6, 1.0],    // Light blue
                accent: [1.0, 1.0, 0.8],       // Light yellow
                background: [0.0, 0.1, 0.2]    // Dark blue
            },
            transitionSettings: {
                duration: 2000,
                easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
                effectType: 'balanced-emergence'
            },
            conceptHighlights: ['EPO-I', 'EPO-D', 'information', 'duality'],
            readingLevel: 'introductory'
        });
        
        // Crisis Section (Part I)
        this.configurations.set('crisis', {
            sectionId: 'crisis',
            title: 'Part I: The Crisis in Modern Physics',
            subtitle: 'The Ontological Crisis and ΛCDM Failures',
            visualParameters: {
                epoIntegration: 0.2,
                epoDispersion: 0.8,
                informationDensity: 0.3,
                consciousnessLevel: 0.1,
                spacetimeCurvature: -0.3,
                quantumCoherence: 0.2
            },
            colorScheme: {
                primary: [1.0, 0.3, 0.3],      // Red chaos
                secondary: [1.0, 0.5, 0.2],    // Orange tension
                accent: [0.8, 0.8, 0.8],       // Gray uncertainty
                background: [0.2, 0.0, 0.0]    // Dark red
            },
            transitionSettings: {
                duration: 2500,
                easing: 'ease-out',
                effectType: 'chaos-emergence'
            },
            conceptHighlights: ['ΛCDM', 'dark matter', 'dark energy', 'crisis', 'failure'],
            readingLevel: 'intermediate'
        });
        
        // Axioms Section (Part II)
        this.configurations.set('axioms', {
            sectionId: 'axioms',
            title: 'Part II: The Axiomatic Foundations',
            subtitle: 'Information Primacy and Entropic Duality',
            visualParameters: {
                epoIntegration: 0.5,
                epoDispersion: 0.5,
                informationDensity: 0.7,
                consciousnessLevel: 0.3,
                spacetimeCurvature: 0.0,
                quantumCoherence: 0.6
            },
            colorScheme: {
                primary: [0.6, 0.4, 1.0],      // Purple foundation
                secondary: [0.4, 0.6, 1.0],    // Blue structure
                accent: [1.0, 0.8, 0.4],       // Gold axioms
                background: [0.1, 0.0, 0.2]    // Dark purple
            },
            transitionSettings: {
                duration: 2000,
                easing: 'ease-in-out',
                effectType: 'foundation-assembly'
            },
            conceptHighlights: ['axiom', 'information', 'primacy', 'duality', 'foundation'],
            readingLevel: 'intermediate'
        });
        
        // Mechanics Section (Part III)
        this.configurations.set('mechanics', {
            sectionId: 'mechanics',
            title: 'Part III: The Mechanics of Entropic Interaction',
            subtitle: 'EPO Force Law and Potential Fields',
            visualParameters: {
                epoIntegration: 0.7,
                epoDispersion: 0.6,
                informationDensity: 0.8,
                consciousnessLevel: 0.4,
                spacetimeCurvature: 0.2,
                quantumCoherence: 0.7
            },
            colorScheme: {
                primary: [0.3, 1.0, 0.6],      // Green dynamics
                secondary: [0.2, 0.8, 1.0],    // Cyan force
                accent: [1.0, 1.0, 0.6],       // Yellow energy
                background: [0.0, 0.2, 0.1]    // Dark green
            },
            transitionSettings: {
                duration: 2200,
                easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                effectType: 'force-dynamics'
            },
            conceptHighlights: ['force', 'potential', 'interaction', 'field', 'mechanics'],
            readingLevel: 'advanced'
        });
        
        // Explanatory Section (Part IV)
        this.configurations.set('explanatory', {
            sectionId: 'explanatory',
            title: 'Part IV: The Explanatory Power',
            subtitle: 'Spacetime, Gravity, and Quantum Reality',
            visualParameters: {
                epoIntegration: 0.8,
                epoDispersion: 0.4,
                informationDensity: 0.9,
                consciousnessLevel: 0.6,
                spacetimeCurvature: 0.5,
                quantumCoherence: 0.8
            },
            colorScheme: {
                primary: [1.0, 0.8, 0.2],      // Gold emergence
                secondary: [0.8, 1.0, 0.4],    // Light green
                accent: [1.0, 0.6, 0.8],       // Pink complexity
                background: [0.2, 0.2, 0.0]    // Dark gold
            },
            transitionSettings: {
                duration: 2500,
                easing: 'ease-in-out',
                effectType: 'emergence-cascade'
            },
            conceptHighlights: ['spacetime', 'gravity', 'quantum', 'emergence', 'explanation'],
            readingLevel: 'advanced'
        });
        
        // Consciousness Section (Part V)
        this.configurations.set('consciousness', {
            sectionId: 'consciousness',
            title: 'Part V: Consciousness and Cosmic Awareness',
            subtitle: 'Informational Panpsychism and Universal Mind',
            visualParameters: {
                epoIntegration: 1.0,
                epoDispersion: 0.2,
                informationDensity: 1.0,
                consciousnessLevel: 1.0,
                spacetimeCurvature: 0.8,
                quantumCoherence: 0.9
            },
            colorScheme: {
                primary: [1.0, 1.0, 0.4],      // Bright consciousness
                secondary: [1.0, 0.8, 0.6],    // Warm awareness
                accent: [0.8, 1.0, 1.0],       // Cosmic cyan
                background: [0.3, 0.3, 0.0]    // Warm dark
            },
            transitionSettings: {
                duration: 3000,
                easing: 'ease-out',
                effectType: 'consciousness-awakening'
            },
            conceptHighlights: ['consciousness', 'panpsychism', 'awareness', 'cosmic', 'mind'],
            readingLevel: 'expert'
        });
        
        // Mathematics Section
        this.configurations.set('mathematics', {
            sectionId: 'mathematics',
            title: 'Mathematical Appendix',
            subtitle: 'Formal EPO Framework and Derivations',
            visualParameters: {
                epoIntegration: 0.6,
                epoDispersion: 0.3,
                informationDensity: 1.0,
                consciousnessLevel: 0.5,
                spacetimeCurvature: 0.3,
                quantumCoherence: 0.8
            },
            colorScheme: {
                primary: [0.8, 0.8, 1.0],      // Light mathematical blue
                secondary: [0.6, 0.8, 1.0],    // Soft blue
                accent: [1.0, 1.0, 0.8],       // Light yellow
                background: [0.0, 0.0, 0.3]    // Dark blue
            },
            transitionSettings: {
                duration: 1500,
                easing: 'ease-in-out',
                effectType: 'mathematical-elegance'
            },
            conceptHighlights: ['equation', 'formula', 'derivation', 'mathematics', 'formalism'],
            readingLevel: 'expert'
        });
        
        console.log(`📐 Initialized ${this.configurations.size} section configurations`);
    }
    
    /**
     * Load user preferences from local storage
     */
    async loadUserPreferences() {
        try {
            const storedPrefs = localStorage.getItem(this.storageKeys.userPrefs);
            if (storedPrefs) {
                const preferences = JSON.parse(storedPrefs);
                
                // Merge with defaults
                this.userPreferences.set('visual', {
                    colorScheme: preferences.colorScheme || 'academic',
                    textSize: preferences.textSize || 'medium',
                    animationSpeed: preferences.animationSpeed || 'moderate',
                    effectIntensity: preferences.effectIntensity || 'subtle',
                    backgroundOpacity: preferences.backgroundOpacity || 0.6
                });
                
                this.userPreferences.set('interaction', {
                    autoAdvance: preferences.autoAdvance || false,
                    conceptHighlightDuration: preferences.conceptHighlightDuration || 3000,
                    equationInteractionMode: preferences.equationInteractionMode || 'guided',
                    navigationStyle: preferences.navigationStyle || 'smooth'
                });
                
                this.userPreferences.set('accessibility', {
                    highContrast: preferences.highContrast || false,
                    reducedMotion: preferences.reducedMotion || false,
                    largeText: preferences.largeText || false,
                    screenReaderOptimized: preferences.screenReaderOptimized || false,
                    keyboardNavigationEnhanced: preferences.keyboardNavigationEnhanced || true
                });
                
                console.log('👤 User preferences loaded from storage');
            } else {
                // Load defaults
                this.loadDefaultUserPreferences();
            }
        } catch (error) {
            console.warn('⚠️ Failed to load user preferences, using defaults:', error);
            this.loadDefaultUserPreferences();
        }
    }
    
    /**
     * Load default user preferences
     */
    loadDefaultUserPreferences() {
        this.userPreferences.set('visual', this.defaultConfigurations.get('visual-academic'));
        this.userPreferences.set('accessibility', this.defaultConfigurations.get('accessibility-standard'));
        this.userPreferences.set('interaction', {
            autoAdvance: false,
            conceptHighlightDuration: 3000,
            equationInteractionMode: 'guided',
            navigationStyle: 'smooth'
        });
    }
    
    /**
     * Load performance settings based on device capabilities
     */
    async loadPerformanceSettings() {
        try {
            const storedSettings = localStorage.getItem(this.storageKeys.performance);
            if (storedSettings) {
                const settings = JSON.parse(storedSettings);
                this.performanceSettings.set('current', settings);
            } else {
                // Auto-detect performance level
                const detectedLevel = this.detectPerformanceLevel();
                const perfConfig = this.defaultConfigurations.get(`performance-${detectedLevel}`);
                this.performanceSettings.set('current', perfConfig);
                
                console.log(`🎮 Auto-detected performance level: ${detectedLevel}`);
            }
        } catch (error) {
            console.warn('⚠️ Failed to load performance settings, using medium preset:', error);
            this.performanceSettings.set('current', this.defaultConfigurations.get('performance-medium'));
        }
    }
    
    /**
     * Auto-detect appropriate performance level based on device capabilities
     */
    detectPerformanceLevel() {
        // Check device memory
        const memory = navigator.deviceMemory;
        
        // Check hardware concurrency
        const cores = navigator.hardwareConcurrency;
        
        // Simple heuristic for performance detection
        if (memory >= 8 && cores >= 8) {
            return 'high';
        } else if (memory >= 4 && cores >= 4) {
            return 'medium';
        } else {
            return 'low';
        }
    }
    
    /**
     * Setup configuration validation system
     */
    setupConfigurationValidation() {
        // Validation rules for configuration values
        this.validationRules = {
            visualParameters: {
                epoIntegration: { min: 0, max: 1 },
                epoDispersion: { min: 0, max: 1 },
                informationDensity: { min: 0, max: 1 },
                consciousnessLevel: { min: 0, max: 1 },
                spacetimeCurvature: { min: -1, max: 1 },
                quantumCoherence: { min: 0, max: 1 }
            },
            colorScheme: {
                primary: { type: 'array', length: 3 },
                secondary: { type: 'array', length: 3 },
                accent: { type: 'array', length: 3 },
                background: { type: 'array', length: 3 }
            }
        };
    }
    
    /**
     * Get configuration for a specific section
     */
    getConfiguration(sectionId) {
        const config = this.configurations.get(sectionId);
        if (!config) {
            console.warn(`Configuration not found for section: ${sectionId}`);
            return null;
        }
        
        // Apply user preferences to configuration
        return this.applyUserPreferences(config);
    }
    
    /**
     * Apply user preferences to a configuration
     */
    applyUserPreferences(config) {
        const modifiedConfig = JSON.parse(JSON.stringify(config)); // Deep clone
        
        const visualPrefs = this.userPreferences.get('visual');
        const accessibilityPrefs = this.userPreferences.get('accessibility');
        
        if (visualPrefs) {
            // Apply visual preferences
            if (visualPrefs.effectIntensity === 'minimal') {
                Object.keys(modifiedConfig.visualParameters).forEach(key => {
                    modifiedConfig.visualParameters[key] *= 0.5;
                });
            } else if (visualPrefs.effectIntensity === 'strong') {
                Object.keys(modifiedConfig.visualParameters).forEach(key => {
                    modifiedConfig.visualParameters[key] = Math.min(1, modifiedConfig.visualParameters[key] * 1.5);
                });
            }
        }
        
        if (accessibilityPrefs) {
            // Apply accessibility modifications
            if (accessibilityPrefs.highContrast) {
                modifiedConfig.colorScheme.primary = [1.0, 1.0, 1.0];
                modifiedConfig.colorScheme.background = [0.0, 0.0, 0.0];
            }
            
            if (accessibilityPrefs.reducedMotion) {
                modifiedConfig.transitionSettings.duration *= 0.5;
                modifiedConfig.visualParameters.epoIntegration *= 0.7;
                modifiedConfig.visualParameters.epoDispersion *= 0.7;
            }
        }
        
        return modifiedConfig;
    }
    
    /**
     * Load complete configuration (combines all settings)
     */
    async loadConfiguration() {
        console.log('📋 Loading complete EPO configuration...');
        
        return {
            sections: this.configurations,
            userPreferences: this.userPreferences,
            performance: this.performanceSettings.get('current'),
            version: this.configVersion,
            activeProfile: this.activeProfile
        };
    }
    
    /**
     * Update user preference
     */
    updateUserPreference(category, key, value) {
        const prefs = this.userPreferences.get(category) || {};
        prefs[key] = value;
        this.userPreferences.set(category, prefs);
        
        // Save to localStorage
        this.saveUserPreferences();
        
        console.log(`💾 Updated user preference: ${category}.${key} = ${value}`);
    }
    
    /**
     * Save user preferences to localStorage
     */
    saveUserPreferences() {
        try {
            const allPrefs = {};
            this.userPreferences.forEach((prefs, category) => {
                Object.assign(allPrefs, prefs);
            });
            
            localStorage.setItem(this.storageKeys.userPrefs, JSON.stringify(allPrefs));
        } catch (error) {
            console.error('❌ Failed to save user preferences:', error);
        }
    }
    
    /**
     * Update performance setting
     */
    updatePerformanceSetting(key, value) {
        const currentSettings = this.performanceSettings.get('current') || {};
        currentSettings[key] = value;
        this.performanceSettings.set('current', currentSettings);
        
        // Save to localStorage
        try {
            localStorage.setItem(this.storageKeys.performance, JSON.stringify(currentSettings));
        } catch (error) {
            console.error('❌ Failed to save performance settings:', error);
        }
        
        console.log(`⚡ Updated performance setting: ${key} = ${value}`);
    }
    
    /**
     * Validate configuration object
     */
    validateConfiguration(config) {
        let isValid = true;
        const errors = [];
        
        // Validate visual parameters
        if (config.visualParameters) {
            Object.entries(config.visualParameters).forEach(([key, value]) => {
                const rule = this.validationRules.visualParameters[key];
                if (rule) {
                    if (value < rule.min || value > rule.max) {
                        isValid = false;
                        errors.push(`${key} value ${value} is outside valid range [${rule.min}, ${rule.max}]`);
                    }
                }
            });
        }
        
        return { isValid, errors };
    }
    
    /**
     * Reset configuration to defaults
     */
    resetToDefaults() {
        console.log('🔄 Resetting configuration to defaults...');
        
        // Clear localStorage
        Object.values(this.storageKeys).forEach(key => {
            localStorage.removeItem(key);
        });
        
        // Reload default configurations
        this.loadDefaultUserPreferences();
        this.performanceSettings.set('current', this.defaultConfigurations.get('performance-medium'));
        
        console.log('✅ Configuration reset to defaults');
    }
    
    /**
     * Export current configuration
     */
    exportConfiguration() {
        return {
            sections: Array.from(this.configurations.entries()),
            userPreferences: Array.from(this.userPreferences.entries()),
            performance: this.performanceSettings.get('current'),
            version: this.configVersion,
            exportDate: new Date().toISOString()
        };
    }
    
    /**
     * Import configuration from export
     */
    importConfiguration(configData) {
        try {
            if (configData.version !== this.configVersion) {
                console.warn(`⚠️ Configuration version mismatch: ${configData.version} vs ${this.configVersion}`);
            }
            
            // Import user preferences
            configData.userPreferences.forEach(([category, prefs]) => {
                this.userPreferences.set(category, prefs);
            });
            
            // Import performance settings
            if (configData.performance) {
                this.performanceSettings.set('current', configData.performance);
            }
            
            // Save imported settings
            this.saveUserPreferences();
            
            console.log('📥 Configuration imported successfully');
            return true;
            
        } catch (error) {
            console.error('❌ Failed to import configuration:', error);
            return false;
        }
    }
    
    /**
     * Get current system status
     */
    getSystemStatus() {
        return {
            configVersion: this.configVersion,
            activeProfile: this.activeProfile,
            sectionsLoaded: this.configurations.size,
            userPreferencesLoaded: this.userPreferences.size > 0,
            performanceLevel: this.performanceSettings.get('current')?.visualizationQuality || 'unknown'
        };
    }
}
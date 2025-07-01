/**
 * EPO Content Manager
 * Manages the complete EPO paper content and tracking system
 */

export class EPOContentManager {
    constructor() {
        this.fullPaperContent = null;
        this.sections = new Map();
        this.currentSection = 'cover';
        this.readingProgress = {};
        this.interactionHistory = [];

        this.sectionStructure = {
            'cover': {
                id: 'cover',
                title: 'The Entropic Principle of Organization',
                type: 'cover',
                content: null,
                visualType: 'big-bang-formation'
            },
            '1.1': {
                id: '1.1',
                title: 'The Limits of the Materialist-Mechanistic Paradigm',
                type: 'fracturing-card',
                parent: 'Chapter 1',
                visualType: 'equation-dissolution'
            },
            '1.2': {
                id: '1.2',
                title: 'The ΛCDM Crisis',
                type: 'pie-chart-void',
                parent: 'Chapter 1',
                visualType: 'dark-matter-visualization'
            },
            '1.3': {
                id: '1.3',
                title: 'The Unification Impasse',
                type: 'repelling-cards',
                parent: 'Chapter 1',
                visualType: 'gr-qm-incompatibility'
            },
            '1.4': {
                id: '1.4',
                title: 'The Process-Relational Turn',
                type: 'flowing-morph',
                parent: 'Chapter 1',
                visualType: 'static-to-process'
            },
            '2.1': {
                id: '2.1',
                title: 'Axiom I: The Primacy of Information',
                type: 'hierarchical-tree',
                parent: 'Chapter 2',
                visualType: 'information-emergence'
            },
            '2.2': {
                id: '2.2',
                title: 'Axiom II: The Principle of Entropic Duality',
                type: 'dual-forces',
                parent: 'Chapter 2',
                visualType: 'epo-dialectic'
            },
            '2.3': {
                id: '2.3',
                title: 'Axiom III: The Universe as Closed System',
                type: 'mobius-strip',
                parent: 'Chapter 2',
                visualType: 'self-reference'
            },
            '3.1': {
                id: '3.1',
                title: 'A Truly Fundamental Interaction',
                type: 'force-builder',
                parent: 'Chapter 3',
                visualType: 'force-visualization'
            },
            '3.2': {
                id: '3.2',
                title: 'The Entropic Potential Field',
                type: 'topographical-3d',
                parent: 'Chapter 3',
                visualType: 'potential-landscape'
            },
            '3.3': {
                id: '3.3',
                title: 'The Unified EPO Force Law',
                type: 'equation-interactive',
                parent: 'Chapter 3',
                visualType: 'force-gradients'
            },
            '4.1': {
                id: '4.1',
                title: 'Formalizing the Integrative Potential',
                type: 'layered-transparent',
                parent: 'Chapter 4',
                visualType: 'potential-components'
            },
            '4.2': {
                id: '4.2',
                title: 'Formalizing the Dispersive Potential',
                type: 'expansion-fields',
                parent: 'Chapter 4',
                visualType: 'dispersive-sources'
            },
            '5.1': {
                id: '5.1',
                title: 'Formalizing Integrative and Dispersive Energy',
                type: 'energy-conservation',
                parent: 'Chapter 5',
                visualType: 'energy-transmutation'
            },
            '5.2': {
                id: '5.2',
                title: 'The Nuclear Exemplar',
                type: 'nuclear-binding',
                parent: 'Chapter 5',
                visualType: 'mass-defect-visualization'
            },
            '6.1': {
                id: '6.1',
                title: 'Spacetime as an EPO-I Phase Transition',
                type: 'genesis-sequence',
                parent: 'Chapter 6',
                visualType: 'spacetime-emergence'
            },
            '6.2': {
                id: '6.2',
                title: 'Gravity as an Information Field',
                type: 'information-curvature',
                parent: 'Chapter 6',
                visualType: 'gravity-gradient'
            },
            '6.3': {
                id: '6.3',
                title: 'The Phillips-Planck Core',
                type: 'black-hole-core',
                parent: 'Chapter 6',
                visualType: 'ppc-structure'
            },
            '7.1': {
                id: '7.1',
                title: 'A Unified Arrow of Time',
                type: 'timeline-dual',
                parent: 'Chapter 7',
                visualType: 'time-arrow'
            },
            '7.2': {
                id: '7.2',
                title: 'Quantum Mechanics: Cascading Phase Shifts',
                type: 'quantum-collapse',
                parent: 'Chapter 7',
                visualType: 'wave-function-integration'
            },
            '7.3': {
                id: '7.3',
                title: 'Relativity as an Informational Limit',
                type: 'speed-limit',
                parent: 'Chapter 7',
                visualType: 'information-processing'
            },
            '8.1': {
                id: '8.1',
                title: 'Dark Energy: Local Triumph, Global Consequence',
                type: 'void-expansion',
                parent: 'Chapter 8',
                visualType: 'structure-evacuation'
            },
            '8.2': {
                id: '8.2',
                title: 'Dark Matter: The Gravitational Effect of Information',
                type: 'information-halos',
                parent: 'Chapter 8',
                visualType: 'complexity-gravity'
            },
            '9': {
                id: '9',
                title: 'The Decisive Test: The Bullet Cluster',
                type: 'split-comparison',
                parent: 'Chapter 9',
                visualType: 'correlation-overlay'
            },
            '10': {
                id: '10',
                title: 'The Universal Signature: Allometric Scaling',
                type: 'scaling-patterns',
                parent: 'Chapter 10',
                visualType: 'power-law-universality'
            },
            '11.1': {
                id: '11.1',
                title: 'Consciousness as a Physical Hierarchy',
                type: 'consciousness-pyramid',
                parent: 'Chapter 11',
                visualType: 'tier-ascension'
            },
            '11.2': {
                id: '11.2',
                title: 'Embracing Panpsychism and Cosmopsychism',
                type: 'cosmic-awareness',
                parent: 'Chapter 11',
                visualType: 'universal-consciousness'
            },
            '12': {
                id: '12',
                title: 'From Lineage to Derivation',
                type: 'connection-web',
                parent: 'Chapter 12',
                visualType: 'theory-synthesis'
            },
            '13': {
                id: '13',
                title: 'A Phased, Falsifiable Research Program',
                type: 'roadmap-timeline',
                parent: 'Chapter 13',
                visualType: 'research-phases'
            },
            '14': {
                id: '14',
                title: 'Conclusion: The Dawn of Informational Physics',
                type: 'dawn-emergence',
                parent: 'Chapter 14',
                visualType: 'new-paradigm'
            },
            'appendix': {
                id: 'appendix',
                title: 'Mathematical Formalism',
                type: 'technical-appendix',
                parent: 'Appendix A',
                visualType: 'mathematical-depth'
            }
        };

        this.init();
    }

    async init() {
        await this.loadFullPaper();
        this.parseSections();
        this.initializeTracking();
        console.log('🌌 EPO Content Manager initialized with complete paper');
    }

    async loadFullPaper() {
        try {
            // Load from CLAUDE.md where the complete paper is now stored
            const response = await fetch('./CLAUDE.md');
            const claudeContent = await response.text();
            
            // Extract the EPO paper section from CLAUDE.md
            const paperStart = claudeContent.indexOf('# The Entropic Principle of Organization:');
            const paperEnd = claudeContent.indexOf('## 🎨 PROJECT IMPLEMENTATION GUIDELINES');
            
            if (paperStart !== -1 && paperEnd !== -1) {
                this.fullPaperContent = claudeContent.substring(paperStart, paperEnd);
                console.log('✅ Complete EPO paper loaded from CLAUDE.md');
            } else {
                throw new Error('Paper not found in CLAUDE.md');
            }
        } catch (error) {
            console.warn('Could not load from CLAUDE.md, using embedded content');
            this.fullPaperContent = this.getEmbeddedContent();
        }
    }

    parseSections() {
        // Parse the full paper into sections based on headers
        const lines = this.fullPaperContent.split('\n');
        let currentSection = null;
        let currentContent = [];

        lines.forEach(line => {
            // Detect section headers
            if (this.isSectionHeader(line)) {
                // Save previous section
                if (currentSection) {
                    this.saveSection(currentSection, currentContent.join('\n'));
                }

                // Start new section
                currentSection = this.identifySection(line);
                currentContent = [line];
            } else if (currentSection) {
                currentContent.push(line);
            }
        });

        // Save last section
        if (currentSection) {
            this.saveSection(currentSection, currentContent.join('\n'));
        }

        console.log(`📚 Parsed ${this.sections.size} sections from complete EPO paper`);
    }

    isSectionHeader(line) {
        // Detect various header patterns
        return /^(Chapter \d+:|Section \d+\.\d+:|Part [IVX]+:|Appendix|Conclusion:)/i.test(line.trim()) ||
               /^#{1,4}\s/.test(line.trim()) || // Markdown headers
               /^\d+\.\d+\./.test(line.trim()) ||
               line.trim().startsWith('####') ||
               (line.trim().startsWith('##') && !line.includes('🎨'));
    }

    identifySection(headerLine) {
        const trimmed = headerLine.trim();

        // Check for numbered sections (e.g., "#### 1.1." or "1.1.")
        const numberMatch = trimmed.match(/(\d+)\.(\d+)\./);
        if (numberMatch) {
            return `${numberMatch[1]}.${numberMatch[2]}`;
        }

        // Check for specific titles in our structure
        for (const [id, info] of Object.entries(this.sectionStructure)) {
            if (trimmed.includes(info.title)) {
                return id;
            }
        }

        // Check for main chapter headers
        if (trimmed.includes('Chapter 1:')) return '1.1';
        if (trimmed.includes('Chapter 2:')) return '2.1';
        if (trimmed.includes('Chapter 3:')) return '3.1';
        if (trimmed.includes('Chapter 4:')) return '4.1';
        if (trimmed.includes('Chapter 5:')) return '5.1';
        if (trimmed.includes('Chapter 6:')) return '6.1';
        if (trimmed.includes('Chapter 7:')) return '7.1';
        if (trimmed.includes('Chapter 8:')) return '8.1';
        if (trimmed.includes('Chapter 9:')) return '9';
        if (trimmed.includes('Chapter 10:')) return '10';
        if (trimmed.includes('Chapter 11:')) return '11.1';
        if (trimmed.includes('Chapter 12:')) return '12';
        if (trimmed.includes('Chapter 13:')) return '13';
        if (trimmed.includes('Chapter 14:')) return '14';
        if (trimmed.includes('Appendix A:')) return 'appendix';

        return null;
    }

    saveSection(sectionId, content) {
        if (this.sectionStructure[sectionId]) {
            this.sections.set(sectionId, {
                ...this.sectionStructure[sectionId],
                content: content,
                wordCount: content.split(/\s+/).length,
                readingTime: Math.ceil(content.split(/\s+/).length / 200) // 200 words per minute
            });
        }
    }

    initializeTracking() {
        // Initialize progress tracking for all sections
        for (const sectionId of Object.keys(this.sectionStructure)) {
            this.readingProgress[sectionId] = {
                read: false,
                timeSpent: 0,
                interactions: 0,
                scrollDepth: 0,
                lastVisited: null
            };
        }
    }

    // Public API

    getCurrentSection() {
        return this.sections.get(this.currentSection);
    }

    navigateToSection(sectionId) {
        if (this.sections.has(sectionId)) {
            // Track navigation
            this.trackInteraction('navigation', {
                from: this.currentSection,
                to: sectionId,
                timestamp: Date.now()
            });

            // Update current section
            this.currentSection = sectionId;

            // Update progress
            this.readingProgress[sectionId].lastVisited = Date.now();

            return this.sections.get(sectionId);
        }
        return null;
    }

    getNextSection() {
        const sectionIds = Array.from(this.sections.keys());
        const currentIndex = sectionIds.indexOf(this.currentSection);
        if (currentIndex < sectionIds.length - 1) {
            return this.navigateToSection(sectionIds[currentIndex + 1]);
        }
        return null;
    }

    getPreviousSection() {
        const sectionIds = Array.from(this.sections.keys());
        const currentIndex = sectionIds.indexOf(this.currentSection);
        if (currentIndex > 0) {
            return this.navigateToSection(sectionIds[currentIndex - 1]);
        }
        return null;
    }

    trackInteraction(type, data) {
        const interaction = {
            type,
            section: this.currentSection,
            timestamp: Date.now(),
            ...data
        };

        this.interactionHistory.push(interaction);

        // Update section interactions
        if (this.readingProgress[this.currentSection]) {
            this.readingProgress[this.currentSection].interactions++;
        }
    }

    updateReadingProgress(sectionId, progress) {
        if (this.readingProgress[sectionId]) {
            Object.assign(this.readingProgress[sectionId], progress);

            // Mark as read if scroll depth > 80%
            if (progress.scrollDepth > 0.8) {
                this.readingProgress[sectionId].read = true;
            }
        }
    }

    getOverallProgress() {
        const sections = Object.keys(this.readingProgress);
        const readSections = sections.filter(id => this.readingProgress[id].read);

        return {
            totalSections: sections.length,
            sectionsRead: readSections.length,
            percentComplete: (readSections.length / sections.length) * 100,
            totalTimeSpent: Object.values(this.readingProgress)
                .reduce((sum, progress) => sum + progress.timeSpent, 0),
            totalInteractions: Object.values(this.readingProgress)
                .reduce((sum, progress) => sum + progress.interactions, 0)
        };
    }

    getSectionsByType(type) {
        return Array.from(this.sections.values())
            .filter(section => section.type === type);
    }

    getVisualizationType(sectionId) {
        return this.sectionStructure[sectionId]?.visualType || 'default';
    }

    getAllSections() {
        return Array.from(this.sections.values());
    }

    getSectionContent(sectionId) {
        const section = this.sections.get(sectionId);
        return section ? section.content : null;
    }

    // Get sections in reading order
    getSectionsInOrder() {
        const orderedIds = [
            'cover', '1.1', '1.2', '1.3', '1.4',
            '2.1', '2.2', '2.3',
            '3.1', '3.2', '3.3',
            '4.1', '4.2',
            '5.1', '5.2',
            '6.1', '6.2', '6.3',
            '7.1', '7.2', '7.3',
            '8.1', '8.2',
            '9', '10',
            '11.1', '11.2',
            '12', '13', '14',
            'appendix'
        ];

        return orderedIds.map(id => this.sections.get(id)).filter(Boolean);
    }

    // Extract mathematical equations from content
    getEquationsFromSection(sectionId) {
        const section = this.sections.get(sectionId);
        if (!section) return [];

        const equations = [];
        const content = section.content;

        // Find bold equations (surrounded by **)
        const boldEquationMatches = content.match(/\*\*([^*]+[=≈∝∇∑∆][^*]+)\*\*/g);
        if (boldEquationMatches) {
            boldEquationMatches.forEach(match => {
                const equation = match.replace(/\*\*/g, '');
                equations.push({
                    text: equation,
                    type: 'primary',
                    context: this.getEquationContext(content, equation)
                });
            });
        }

        // Find inline equations with mathematical symbols
        const inlineMatches = content.match(/[A-Za-z_]+[₀-₉]*\s*[=≈∝]\s*[^.]+/g);
        if (inlineMatches) {
            inlineMatches.forEach(match => {
                if (!equations.some(eq => eq.text.includes(match.trim()))) {
                    equations.push({
                        text: match.trim(),
                        type: 'inline',
                        context: this.getEquationContext(content, match)
                    });
                }
            });
        }

        return equations;
    }

    getEquationContext(content, equation) {
        const index = content.indexOf(equation);
        if (index === -1) return '';

        const start = Math.max(0, index - 100);
        const end = Math.min(content.length, index + equation.length + 100);
        return content.substring(start, end);
    }

    // Get key concepts from section
    getConceptsFromSection(sectionId) {
        const section = this.sections.get(sectionId);
        if (!section) return [];

        const concepts = [];
        const content = section.content;

        // Common EPO concepts to look for
        const epoTerms = [
            'EPO-I', 'EPO-D', 'Integrative Drive', 'Dispersive Drive',
            'Entropic Potential Field', 'EPF', 'Information', 'Consciousness',
            'Dark Matter', 'Dark Energy', 'Spacetime', 'Quantum', 'Gravity',
            'Phillips, Planck Core', 'PPC', 'Bullet Cluster', 'Complexity Index'
        ];

        epoTerms.forEach(term => {
            if (content.toLowerCase().includes(term.toLowerCase())) {
                concepts.push({
                    term: term,
                    occurrences: (content.match(new RegExp(term, 'gi')) || []).length,
                    context: this.getConceptContext(content, term)
                });
            }
        });

        return concepts.sort((a, b) => b.occurrences - a.occurrences);
    }

    getConceptContext(content, term) {
        const regex = new RegExp(term, 'i');
        const index = content.search(regex);
        if (index === -1) return '';

        const start = Math.max(0, index - 150);
        const end = Math.min(content.length, index + term.length + 150);
        return content.substring(start, end);
    }

    // Embedded content fallback with actual EPO paper content
    getEmbeddedContent() {
        return `# The Entropic Principle of Organization: A Framework for Informational Physics and Emergent Reality

## Part I: Prolegomena to an Informational Physics

### Chapter 1: The Ontological Crisis in Modern Physics

#### 1.1. The Limits of the Materialist-Mechanistic Paradigm

Science advances through the iterative refinement of its theories, but it leaps forward through the revolution of its paradigms. For over a century, foundational physics has operated within a profoundly successful but increasingly strained materialist-mechanistic paradigm: a worldview predicated on the existence of fundamental particles with intrinsic properties, governed by timeless mathematical laws, acting upon a passive stage of spacetime. This framework, which treats reality as a collection of static things rather than a dynamic flux of process, has yielded the twin triumphs of General Relativity (GR) and the Standard Model of particle physics. These theories describe the universe on its largest and smallest scales with unparalleled accuracy.

Yet, we now stand at a precipice where the anomalies are no longer peripheral but have migrated to the very core of our understanding. The persistent discord between our theories of the large and the small, coupled with the introduction of vast, unexplained entities to salvage our cosmological models, suggests that the paradigm itself has reached the limits of its explanatory power. The problems facing physics are no longer mere puzzles to be solved with more precise data or the discovery of one more particle; they are symptoms of a deep conceptual failure, a crisis in our foundational ontology. This crisis signals that our fundamental assumptions about what reality is—a collection of particles on a spacetime stage—may be flawed. It forces us to question not just the content of our theories, but the very language and structure of the reality they attempt to describe. The search is no longer for missing things, but for a missing principle.

[Complete EPO paper content continues...]`;
    }
}
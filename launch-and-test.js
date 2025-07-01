#!/usr/bin/env node

const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');
const path = require('path');

class EPOLauncher {
    constructor() {
        this.server = null;
        this.browser = null;
        this.page = null;
        this.port = 8081;
    }

    // Simple HTTP server to serve files
    createServer() {
        return new Promise((resolve, reject) => {
            this.server = http.createServer((req, res) => {
                let filePath = '.' + req.url;
                if (filePath === './') {
                    filePath = './index.html';
                }

                const extname = String(path.extname(filePath)).toLowerCase();
                const mimeTypes = {
                    '.html': 'text/html',
                    '.js': 'text/javascript',
                    '.css': 'text/css',
                    '.json': 'application/json',
                    '.png': 'image/png',
                    '.jpg': 'image/jpg',
                    '.gif': 'image/gif',
                    '.svg': 'image/svg+xml',
                    '.wav': 'audio/wav',
                    '.mp4': 'video/mp4',
                    '.woff': 'application/font-woff',
                    '.ttf': 'application/font-ttf',
                    '.eot': 'application/vnd.ms-fontobject',
                    '.otf': 'application/font-otf',
                    '.wasm': 'application/wasm'
                };

                const contentType = mimeTypes[extname] || 'application/octet-stream';

                fs.readFile(filePath, (error, content) => {
                    if (error) {
                        if (error.code === 'ENOENT') {
                            res.writeHead(404, { 'Content-Type': 'text/html' });
                            res.end('404 Not Found', 'utf-8');
                        } else {
                            res.writeHead(500);
                            res.end(`Server Error: ${error.code}`, 'utf-8');
                        }
                    } else {
                        res.writeHead(200, { 
                            'Content-Type': contentType,
                            'Access-Control-Allow-Origin': '*'
                        });
                        res.end(content, 'utf-8');
                    }
                });
            });

            this.server.listen(this.port, () => {
                console.log(`🚀 EPO Server running at http://localhost:${this.port}`);
                resolve();
            });

            this.server.on('error', reject);
        });
    }

    // Launch browser and take screenshots
    async launchBrowser() {
        console.log('🌐 Launching Puppeteer browser...');
        
        this.browser = await puppeteer.launch({
            headless: false, // Show browser for demo
            defaultViewport: { width: 1920, height: 1080 },
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--disable-gpu'
            ]
        });

        this.page = await this.browser.newPage();
        
        // Set viewport
        await this.page.setViewport({ width: 1920, height: 1080 });
        
        console.log('✅ Browser launched successfully');
    }

    // Test main EPO experience
    async testMainExperience() {
        console.log('🎭 Testing main EPO experience...');
        
        try {
            await this.page.goto(`http://localhost:${this.port}/index.html`, {
                waitUntil: 'networkidle2',
                timeout: 10000
            });

            // Wait for canvas to initialize
            await this.page.waitForSelector('#cosmic-canvas', { timeout: 5000 });
            
            // Take screenshot
            await this.page.screenshot({
                path: 'epo-main-experience.png',
                fullPage: false
            });
            
            console.log('📸 Main experience screenshot saved: epo-main-experience.png');
            
        } catch (error) {
            console.error('❌ Error testing main experience:', error.message);
        }
    }

    // Test enhanced EPO experience
    async testEnhancedExperience() {
        console.log('✨ Testing enhanced EPO experience...');
        
        try {
            await this.page.goto(`http://localhost:${this.port}/enhanced-epo-experience.html`, {
                waitUntil: 'networkidle2',
                timeout: 10000
            });

            // Wait for cosmic background
            await this.page.waitForSelector('#cosmic-background', { timeout: 5000 });
            
            // Take screenshot
            await this.page.screenshot({
                path: 'epo-enhanced-experience.png',
                fullPage: false
            });
            
            console.log('📸 Enhanced experience screenshot saved: epo-enhanced-experience.png');
            
        } catch (error) {
            console.error('❌ Error testing enhanced experience:', error.message);
        }
    }

    // Test interactive paper
    async testInteractivePaper() {
        console.log('📚 Testing interactive paper...');
        
        try {
            await this.page.goto(`http://localhost:${this.port}/epo-complete-interactive-paper.html`, {
                waitUntil: 'networkidle2',
                timeout: 10000
            });

            // Wait for paper content to load
            await this.page.waitForSelector('.paper-container', { timeout: 5000 });
            
            // Take screenshot
            await this.page.screenshot({
                path: 'epo-interactive-paper.png',
                fullPage: true // Full page for paper
            });
            
            console.log('📸 Interactive paper screenshot saved: epo-interactive-paper.png');
            
        } catch (error) {
            console.error('❌ Error testing interactive paper:', error.message);
        }
    }

    // Check for JavaScript errors
    async checkConsoleErrors() {
        console.log('🔍 Checking for console errors...');
        
        const errors = [];
        
        this.page.on('console', msg => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
                console.log('🚫 Console Error:', msg.text());
            }
        });

        this.page.on('pageerror', error => {
            errors.push(error.message);
            console.log('🚫 Page Error:', error.message);
        });

        return errors;
    }

    // Test scrolling behavior
    async testScrolling() {
        console.log('📜 Testing scroll behavior...');
        
        try {
            // Scroll down slowly
            for (let i = 0; i < 5; i++) {
                await this.page.evaluate(() => {
                    window.scrollBy(0, window.innerHeight * 0.5);
                });
                await this.page.waitForTimeout(1000);
                
                // Take screenshot at each scroll position
                await this.page.screenshot({
                    path: `epo-scroll-${i}.png`,
                    fullPage: false
                });
                
                console.log(`📸 Scroll screenshot ${i} saved`);
            }
            
        } catch (error) {
            console.error('❌ Error testing scroll:', error.message);
        }
    }

    // Clean up resources
    async cleanup() {
        console.log('🧹 Cleaning up...');
        
        if (this.browser) {
            await this.browser.close();
        }
        
        if (this.server) {
            this.server.close();
        }
        
        console.log('✅ Cleanup complete');
    }

    // Main test runner
    async runTests() {
        try {
            console.log('🎬 Starting EPO Visual Tests...\n');
            
            // Start server
            await this.createServer();
            
            // Launch browser
            await this.launchBrowser();
            
            // Setup error monitoring
            const errors = await this.checkConsoleErrors();
            
            // Run all tests
            await this.testMainExperience();
            await this.testEnhancedExperience();
            await this.testInteractivePaper();
            await this.testScrolling();
            
            console.log('\n🎉 All tests completed!');
            console.log('\n📊 Test Results Summary:');
            console.log('- Main Experience: epo-main-experience.png');
            console.log('- Enhanced Experience: epo-enhanced-experience.png');
            console.log('- Interactive Paper: epo-interactive-paper.png');
            console.log('- Scroll Tests: epo-scroll-0.png through epo-scroll-4.png');
            
            if (errors.length > 0) {
                console.log(`\n⚠️  Found ${errors.length} console errors`);
            } else {
                console.log('\n✅ No console errors detected');
            }
            
        } catch (error) {
            console.error('💥 Test runner failed:', error);
        } finally {
            await this.cleanup();
        }
    }
}

// Run if called directly
if (require.main === module) {
    const launcher = new EPOLauncher();
    launcher.runTests().catch(console.error);
}

module.exports = EPOLauncher;
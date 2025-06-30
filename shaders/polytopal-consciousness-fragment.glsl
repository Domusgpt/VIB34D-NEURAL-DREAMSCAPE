// 🎨 POLYTOPAL CONSCIOUSNESS FRAGMENT SHADER
// Renders consciousness fields through multidimensional polytope surfaces

precision highp float;

uniform float time;
uniform vec2 resolution;
uniform vec3 cameraPosition;
uniform sampler2D consciousnessTexture;

// Polytopal rendering uniforms
uniform float dimension;
uniform float integrationForce;
uniform float dispersionForce;
uniform float quantumCoherence;
uniform float realityDissolution;
uniform vec3 singularityPosition;

varying vec2 vUv;
varying vec3 vPosition;
varying float vConsciousness;
varying vec3 vPolytopalCoord;
varying float vDimensionalPhase;
varying vec3 vColor;

// Consciousness field functions
float consciousnessField(vec3 p) {
    float dist = length(p - singularityPosition);
    return exp(-dist * dist * 0.5) * quantumCoherence;
}

// Penrose tiling pattern for consciousness crystallization
vec2 penroseTiling(vec2 p) {
    const float phi = 1.61803398875;
    vec2 a = vec2(1.0, 0.0);
    vec2 b = vec2(cos(2.0 * 3.14159 / 5.0), sin(2.0 * 3.14159 / 5.0));
    
    // Fibonacci spiral mapping
    float r = length(p);
    float theta = atan(p.y, p.x) + time * 0.1;
    
    // 5-fold symmetry
    theta = mod(theta, 2.0 * 3.14159 / 5.0);
    
    return vec2(r * cos(theta * phi), r * sin(theta * phi));
}

// 4D Klein bottle surface parametrization
vec3 kleinBottleSurface(vec2 uv, float w) {
    float u = uv.x * 4.0 * 3.14159;
    float v = uv.y * 2.0 * 3.14159;
    
    float r = 4.0 * (1.0 - cos(u) / 2.0);
    float x, y, z;
    
    if (u < 3.14159) {
        x = 6.0 * cos(u) * (1.0 + sin(u)) + r * cos(v + 3.14159);
        y = 16.0 * sin(u);
        z = r * sin(v);
    } else {
        x = 6.0 * cos(u) * (1.0 + sin(u)) + r * cos(v);
        y = 16.0 * sin(u);
        z = r * sin(v);
    }
    
    // 4D rotation through w
    float w4 = w * 2.0 * 3.14159;
    vec3 rotated = vec3(
        x * cos(w4) - z * sin(w4),
        y,
        x * sin(w4) + z * cos(w4)
    );
    
    return rotated * 0.05;
}

// Hopf fibration for S³ → S² projection
vec3 hopfFibration(vec3 p, float phase) {
    // Stereographic projection from S³
    vec4 q = normalize(vec4(p, 1.0 - length(p)));
    
    // Hopf map
    float x = 2.0 * (q.x * q.z + q.y * q.w);
    float y = 2.0 * (q.y * q.z - q.x * q.w);
    float z = q.x * q.x + q.y * q.y - q.z * q.z - q.w * q.w;
    
    // Add phase rotation
    float c = cos(phase);
    float s = sin(phase);
    return vec3(
        x * c - y * s,
        x * s + y * c,
        z
    );
}

// Gosper curve fractal for information density
float gosperCurve(vec2 p, int iterations) {
    vec2 a = vec2(1.0, 0.0);
    vec2 b = vec2(-0.5, 0.866025);
    
    float scale = 1.0;
    vec2 offset = vec2(0.0);
    
    for (int i = 0; i < 5; i++) {
        if (i >= iterations) break;
        
        // Hexagonal transformation
        vec2 pp = p - offset;
        float d1 = dot(pp, a);
        float d2 = dot(pp, b);
        
        if (abs(d1) < abs(d2)) {
            p = vec2(d1, dot(pp, vec2(-a.y, a.x))) / dot(a, a);
            offset += a * scale;
        } else {
            p = vec2(d2, dot(pp, vec2(-b.y, b.x))) / dot(b, b);
            offset += b * scale;
        }
        
        scale /= sqrt(7.0);
    }
    
    return length(p);
}

// Main rendering function
void main() {
    vec2 uv = vUv;
    vec3 pos = vPosition;
    
    // Sample consciousness field
    float consciousness = consciousnessField(pos);
    consciousness += texture2D(consciousnessTexture, uv).r * 0.5;
    
    // Apply Penrose tiling
    vec2 penrose = penroseTiling(uv * 5.0);
    float tilingPattern = sin(penrose.x * 10.0) * cos(penrose.y * 10.0);
    
    // Klein bottle surface distortion
    vec3 kleinPos = kleinBottleSurface(uv, vDimensionalPhase);
    float kleinDist = length(kleinPos - pos);
    
    // Hopf fibration coloring
    vec3 hopfColor = hopfFibration(vPolytopalCoord, time * 0.5);
    hopfColor = normalize(hopfColor) * 0.5 + 0.5;
    
    // Gosper curve density
    float gosper = gosperCurve(uv * 3.0, 4);
    float density = 1.0 / (1.0 + gosper * gosper);
    
    // Combine color components
    vec3 baseColor = vColor;
    vec3 consciousnessColor = vec3(
        0.5 + 0.5 * sin(consciousness * 3.14159),
        0.3 + 0.7 * consciousness,
        0.8 + 0.2 * cos(consciousness * 6.28318)
    );
    
    // Reality dissolution effect
    float dissolution = realityDissolution * sin(kleinDist * 10.0 + time);
    vec3 dissolvedColor = mix(baseColor, hopfColor, dissolution);
    
    // Integration/dispersion field coloring
    float fieldBalance = integrationForce - dispersionForce;
    vec3 fieldColor = fieldBalance > 0.0 
        ? vec3(0.2, 0.8, 0.4) * fieldBalance
        : vec3(0.8, 0.2, 0.3) * -fieldBalance;
    
    // Quantum interference patterns
    float interference = sin(length(pos) * 20.0 + time * 2.0) 
                       * cos(dot(pos, vec3(1.0)) * 15.0 - time);
    interference *= quantumCoherence;
    
    // Final color composition
    vec3 finalColor = dissolvedColor;
    finalColor = mix(finalColor, consciousnessColor, consciousness * 0.6);
    finalColor += fieldColor * 0.3;
    finalColor += vec3(tilingPattern * 0.1 * density);
    finalColor += vec3(interference * 0.2);
    
    // Consciousness glow
    float glow = exp(-kleinDist * 2.0) * vConsciousness;
    finalColor += vec3(0.9, 0.7, 1.0) * glow * 0.5;
    
    // Dimensional phase shimmer
    float shimmer = sin(vDimensionalPhase * 10.0 + time * 3.0) * 0.1;
    finalColor += vec3(shimmer);
    
    // Output with gamma correction
    finalColor = pow(finalColor, vec3(0.4545));
    
    gl_FragColor = vec4(finalColor, 1.0);
}
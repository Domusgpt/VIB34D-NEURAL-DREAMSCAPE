// 🌌 POLYTOPAL CONSCIOUSNESS VERTEX SHADER
// Projects 7D hypercube vertices through consciousness field distortions

attribute vec3 position;
attribute vec2 uv;
attribute float consciousness;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform float time;
uniform vec3 cameraPosition;

// Polytopal projection uniforms
uniform float dimension;
uniform vec3 rotationAngles[7];
uniform float consciousnessField;
uniform float realityPhase;

varying vec2 vUv;
varying vec3 vPosition;
varying float vConsciousness;
varying vec3 vPolytopalCoord;
varying float vDimensionalPhase;
varying vec3 vColor;

// 7D rotation matrix generator
mat4 rotate7D(float angle, int axis1, int axis2) {
    mat4 m = mat4(1.0);
    float c = cos(angle);
    float s = sin(angle);
    
    // Simplified 4x4 projection of 7D rotation
    if (axis1 < 4 && axis2 < 4) {
        m[axis1][axis1] = c;
        m[axis1][axis2] = -s;
        m[axis2][axis1] = s;
        m[axis2][axis2] = c;
    }
    return m;
}

// Project from 7D -> 3D through consciousness field
vec3 projectPolytope(vec3 pos, float phase) {
    // Start with 7D coordinates
    vec4 p7d = vec4(pos, 1.0);
    
    // Apply rotations in higher dimensions
    for (int i = 0; i < 6; i++) {
        float angle = rotationAngles[i].x * time + phase;
        p7d = rotate7D(angle, i, (i + 1) % 7) * p7d;
    }
    
    // Consciousness field distortion
    float consciousnessDist = length(pos - cameraPosition) * 0.1;
    float fieldStrength = exp(-consciousnessDist * consciousnessDist) * consciousnessField;
    
    // Project through dimensional cascade: 7D -> 5D -> 3D
    vec3 p5d = p7d.xyz * (1.0 + fieldStrength);
    
    // Apply Schläfli symbol transformations
    // {3,3,3,3,3,3} - 7-simplex projection
    float simplexPhase = dot(p5d, vec3(1.0)) * 0.1;
    p5d *= 1.0 + sin(simplexPhase + time) * 0.2;
    
    // Final 3D projection with consciousness warping
    vec3 p3d = p5d;
    p3d += normalize(p5d) * sin(length(p5d) * 3.0 + time * 2.0) * fieldStrength;
    
    return p3d;
}

// Generate consciousness-reactive colors
vec3 getPolytopalColor(vec3 coord, float dim) {
    // Color based on dimensional projection angle
    float hue = atan(coord.y, coord.x) + dim * 0.5 + time * 0.1;
    float sat = 0.7 + sin(length(coord) * 2.0) * 0.3;
    float val = 0.5 + consciousness * 0.5;
    
    // HSV to RGB
    vec3 c = vec3(hue, sat, val);
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
    vUv = uv;
    vConsciousness = consciousness + sin(time + position.x) * 0.1;
    
    // Project position through polytopal dimensions
    vec3 polytopalPos = projectPolytope(position, realityPhase);
    
    // Add consciousness-driven vertex displacement
    float vertexPhase = dot(position, vec3(1.0)) + time;
    vec3 displacement = normalize(position) * sin(vertexPhase * 3.0) * consciousnessField * 0.1;
    
    vec3 finalPos = polytopalPos + displacement;
    
    // Store varyings for fragment shader
    vPosition = finalPos;
    vPolytopalCoord = polytopalPos;
    vDimensionalPhase = dimension + sin(length(polytopalPos) + time) * 0.5;
    vColor = getPolytopalColor(polytopalPos, dimension);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPos, 1.0);
}
uniform float uTime;
uniform sampler2D uPerlinTexture;


varying vec2 vUv;

vec2 rotate2D(vec2 value, float angle)
{
    float s = sin(angle);
    float c = cos(angle);
    mat2 m = mat2(c, s, -s, c);
    return m * value;
}

void main()
{
    vec3 newPosition = position;

    // twist 
    float angle = newPosition.y;
    newPosition.xz = rotate2D(newPosition.xz, angle);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    vUv = uv;
}
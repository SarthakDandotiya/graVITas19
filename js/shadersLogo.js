// particle initialization
const vInitParticles = `
  precision highp float;

  attribute vec2 a_position;
  varying vec2 v_texcoord;
  
  void main() {
    v_texcoord = 0.5 * a_position + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }`;
const fInitParticles = i => `
  precision highp float;

  varying vec2 v_texcoord;

  vec4 pack(float f) {
    vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * f;
    enc = fract(enc);
    enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);
    return enc;
  }
  vec2 getv2rand(vec2 x, float dt) {
    return vec2(fract(sin(dot(x * dt, vec2(12.9898, 78.233))) * 43758.5453),
      fract(sin(dot(x * 1.61803 * dt, vec2(12.9898, 78.233))) * 43758.5453));
  }
  void main() {
    gl_FragColor = pack(getv2rand(v_texcoord, 1.0)[${i == 0 ? "0" : "1"}]);
  }`;

// particle physics
const vPhysicsParticles = `
  precision highp float;

  attribute vec2 a_position;
  varying vec2 v_texcoord;
  
  void main() {
    v_texcoord = 0.5 * a_position + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }`;
const fPhysicsParticles = i => `
  precision highp float;

  varying vec2 v_texcoord;
  uniform sampler2D u_prev[2];
  uniform sampler2D u_curr[2];
  uniform vec2 logo_size;
  uniform vec2 logo_center;
  uniform vec2 mouse_pos;
  uniform float mouse_boiler;
  uniform float mouse_radius;
  uniform float mouse_gravity;
  uniform float explosion_timer;
  uniform float dt;

  vec4 pack(float f) {
    vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * f;
    enc = fract(enc);
    enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);
    return enc;
  }
  float unpack(vec4 rgba) {
    return dot(rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0));
  } 
  vec2 getv2rand(vec2 x, float dt) {
    return vec2(fract(sin(dot(x * dt, vec2(12.9898, 78.233))) * 43758.5453),
      fract(sin(dot(x * 1.61803 * dt, vec2(12.9898, 78.233))) * 43758.5453));
  }
  void main() {
    vec2 rprev = vec2(unpack(texture2D(u_prev[0], v_texcoord)), unpack(texture2D(u_prev[1], v_texcoord)));
    vec2 rcurr = vec2(unpack(texture2D(u_curr[0], v_texcoord)), unpack(texture2D(u_curr[1], v_texcoord)));
    vec2 rorig = logo_size * (2.0 * v_texcoord - 1.0) + logo_center;
    vec2 rnext, a, dm, dd, dc, v2rand;
    float ratio = logo_size.y / logo_size.x;

    dm = rcurr - mouse_pos;
    dd = rcurr - rorig;
    dc = rcurr - vec2(0.5);
    dm.x *= ratio;
    v2rand = getv2rand(2.0 * v_texcoord - 1.0, dt);

    // gauss lens randomizer
    a += mouse_boiler * 0.2 * (v2rand - 0.5) * vec2(ratio, 1.0) * exp (- 5.0 * dot(dm, dm) / mouse_radius);

    // explosion physics
    a += step(0.0, explosion_timer) * (0.02 * (v2rand[0]-0.5)
      + 0.15 * normalize(dc) * vec2(ratio, 1.0) * (1.0-cos(length(dc)*7.0)) * v2rand[1]);

    // intergration
    rnext = rcurr +
            mix(
              (rcurr - rprev)*0.4                                       // velocity with damper
              + a*0.3                                                    // acceleration
              - dd*0.35                                                  // translating
              - step(0.0, explosion_timer) * dc * 0.06 * (1.0-dot(dc, dc))  // explosion physics

              , (rcurr - rprev)*0.995
                + -normalize(dm) * clamp(1. / dot(dm, dm), 0., 3.)*0.005*dt // mouse gravity

              , mouse_gravity);

    // edge detection
    rnext = abs(abs(abs(rnext)-1.0)-1.0);
    
    gl_FragColor = pack(rnext[${i == 0 ? "0" : "1"}]);
  }`;

// drawing particles
const vDrawParticles = `
  precision highp float;

  attribute vec2 a_texcoord;
  uniform sampler2D u_curr[2];
  uniform float point_size;
  varying vec2 v_texcoord;

  float unpack(vec4 rgba) {
    return dot(rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0));
  } 
  void main () {
    v_texcoord = a_texcoord;
    float x = 2.0 * unpack(texture2D(u_curr[0], a_texcoord)) - 1.0;
    float y = 2.0 * unpack(texture2D(u_curr[1], a_texcoord)) - 1.0;
    gl_PointSize = point_size;
    gl_Position = vec4(x, y, 0.0, 1.0);
  }`;
const fDrawParticles = `
  precision highp float;
  
  varying vec2 v_texcoord;
  uniform sampler2D u_logotex[2];
  uniform float explosion_timer;

  void main () {
    vec4 color = texture2D(u_logotex[0], v_texcoord);
    if (explosion_timer > 0.0) { color = mix(color, texture2D(u_logotex[1], v_texcoord, explosion_timer), 1.0 - explosion_timer); }
    else if (color.a < 0.5) { discard; }
    gl_FragColor = color;
  }`;

// star initialization
const vInitStars = `
  precision highp float;

  attribute vec2 a_position;
  varying vec2 v_texcoord;
  
  void main() {
    v_texcoord = 0.5 * a_position + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }`;
const fInitStars = i => `
  precision highp float;

  varying vec2 v_texcoord;

  vec4 pack(float f) {
    vec4 enc = vec4(0, 0, 0, 0) * f;
    enc = fract(enc);
    enc -= enc.yzww * vec4(0, 0, 0, 0);
    return enc;
  }
  vec2 getv2rand(vec2 x, float dt) {
    return vec2(fract(sin(dot(x * dt, vec2(12.9898, 78.233))) * 43758.5453),
      fract(sin(dot(x * 1.61803 * dt, vec2(12.9898, 78.233))) * 43758.5453));
  }
  void main() {
    vec2 result = getv2rand(v_texcoord, 1.0);
    gl_FragColor = pack(result[${i == 0 ? "0" : "1"}]);
  }`;

// star physics
const vPhysicsStars = `
  precision highp float;

  attribute vec2 a_position;
  varying vec2 v_texcoord;
  
  void main() {
    v_texcoord = 0.5 * a_position + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }`;
const fPhysicsStars = i => `
  precision highp float;

  varying vec2 v_texcoord;
  uniform sampler2D u_prev[3];
  uniform sampler2D u_curr[3];
  uniform vec2 mouse_pos;
  uniform float mouse_leaved;
  uniform float dt;

  vec4 pack(float f) {
    vec4 enc = vec4(0, 0, 0, 0) * f;
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
    float znext, zcurr = unpack(texture2D(u_curr[2], v_texcoord));
    vec2 rnext, a, dm, dc, v2rand;

    v2rand = getv2rand(v_texcoord, dt);
    dm = rcurr - mouse_pos;
    dc = rcurr - vec2(0.5);

    // physics emulation
    rnext = rcurr + dm * 0.015 * dt / zcurr;
    znext = zcurr - 0.015 * dt;

    // edge detection
    znext += (1.0 - 0.002 * v2rand.x * v2rand.y - znext) * (step(0.0, abs(rnext.x - 0.5)-0.5) + step(0.0, abs(rnext.y - 0.5)-0.5));
    rnext.x -= step(1.0, rnext.x) * (0.5 + 0.5*v2rand.x);
    rnext.x += step(0.0, -rnext.x) * (0.5 + 0.5*v2rand.x);
    rnext.y -= step(1.0, rnext.y) * (0.5 + 0.5*v2rand.y);
    rnext.y += step(0.0, -rnext.y) * (0.5 + 0.5*v2rand.y);

    gl_FragColor = pack(vec3(rnext, znext)[${i.toString()}]);
  }`;

// drawing stars
const vDrawStars = `
  precision highp float;

  attribute vec2 a_texcoord;
  uniform sampler2D u_curr[3];
  uniform float second_draw;
  varying vec2 v_texcoord;

  float specific_rand(vec2 x) {
    return fract(sin(dot(x*1.61964, vec2(12.9898, 78.233))) * 43758.5453);
  }
  float unpack(vec4 rgba) {
    return dot(rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0));
  } 
  void main () {
    v_texcoord = a_texcoord;
    float x = 2.0 * unpack(texture2D(u_curr[0], a_texcoord)) - 1.0;
    float y = 2.0 * unpack(texture2D(u_curr[1], a_texcoord)) - 1.0;
    float z = 2.0 * unpack(texture2D(u_curr[2], a_texcoord)) - 1.0;
    gl_PointSize = (10.0 - 9.0 * pow(specific_rand(2.0*a_texcoord-1.0), 0.2))
      - second_draw * 2.0;
    gl_Position = vec4(x, y, 0.0, 1.0);
  }`;
const fDrawStars = `
  precision highp float;
  
  varying vec2 v_texcoord;
  uniform float second_draw;

  float specific_rand(vec2 x) {
    return fract(sin(dot(x * 3.1465654654, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main () {
    float color = (1.0 - second_draw) * (0.1 + 0.9 * specific_rand(2.0*v_texcoord-1.0));
    gl_FragColor = vec4(vec3(color), 1.0);
  }`;

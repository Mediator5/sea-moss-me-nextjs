"use client";

import { useEffect, useRef } from "react";

/**
 * Animated sea for the homepage hero.
 *
 * A WebGL canvas laid exactly over the hero photograph (same object-cover crop,
 * same 70% horizontal focus). It redraws only the water — masked by
 * /images/hero-water-mask.png — with swells rolling in toward the shore, light
 * bands travelling across the crests and small glints of sun. Everywhere
 * outside the mask the canvas is transparent, so the jar, moss, rock and
 * headland in the photograph underneath never move.
 *
 * Use it twice: `layer="water"` under the teal scrim (the moving sea itself)
 * and `layer="light"` above the scrim (only the travelling highlights and sun
 * glints, so the motion still reads through the dark teal behind the text).
 *
 * Skipped entirely for visitors who prefer reduced motion, when WebGL is not
 * available, and paused while the hero is off screen.
 */

const IMAGE_SRC = "/images/hero.jpg";
const MASK_SRC = "/images/hero-water-mask.png";
const IMAGE_W = 2000;
const IMAGE_H = 1125;
/** Matches the photograph's `object-[70%_center]`. */
const FOCUS_X = 0.7;
const FOCUS_Y = 0.5;

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = vec2(aPos.x * 0.5 + 0.5, 0.5 - aPos.y * 0.5);
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uImg;
uniform sampler2D uMask;
uniform vec2 uScale;
uniform vec2 uOffset;
uniform float uTime;
uniform float uLightOnly;

// 2D simplex noise (Ashima Arts / Stefan Gustavson, MIT).
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv * uScale + uOffset;              // position in the photograph
  float mask = texture2D(uMask, uv).r;
  if (mask < 0.004) { gl_FragColor = vec4(0.0); return; }

  // Perspective: treat the sea as a flat plane receding to the horizon, so
  // swells are small and slow far out and large and quick near the shore.
  float below = max(uv.y - 0.415, 0.012);        // distance below the horizon
  float z = 0.07 / below;                         // depth into the scene
  vec2 plane = vec2((uv.x - 0.35) * 1.78 * z, z);
  float t = uTime;

  // Crests run parallel to the shore and roll in toward the viewer.
  vec2 p1 = vec2(plane.x * 1.6 + t * 0.03, plane.y * 9.0 - t * 0.55);
  vec2 p2 = vec2(plane.x * 3.4 - t * 0.05, plane.y * 19.0 - t * 0.9);
  float n1 = snoise(p1);
  float n2 = snoise(p2);
  float swell = sin(plane.y * 26.0 - t * 1.25 + n1 * 2.2);

  // Displace the photograph, scaled by nearness and faded at the mask edge so
  // nothing outside the water is ever pulled in.
  float near = clamp(below / 0.45, 0.0, 1.0);
  float edge = smoothstep(0.55, 1.0, mask);
  vec2 disp = vec2(n2 * 0.55 + swell * 0.25, n1 * 0.8 + swell * 0.6) * (0.004 + 0.016 * near) * edge;
  vec3 col = texture2D(uImg, clamp(uv + disp, vec2(0.001), vec2(0.999))).rgb;

  // Light on the moving water: bright crests, cooler troughs, sun glints.
  float crest = smoothstep(0.35, 1.0, swell * 0.6 + n1 * 0.5);
  float trough = smoothstep(0.2, 1.0, -swell * 0.6 - n2 * 0.4);
  float g = snoise(vec2(plane.x * 14.0 + t * 0.2, plane.y * 60.0 - t * 2.4));
  float sun = 1.0 - smoothstep(0.0, 0.75, uv.x);   // sun sits to the left
  float glint = pow(max(g, 0.0), 6.0) * (0.35 + 0.65 * sun);

  if (uLightOnly > 0.5) {
    // Light layer, drawn above the teal scrim: only the moving highlights, so
    // the motion reads through the scrim. Softer behind the headline column.
    float behindText = mix(0.55, 1.0, smoothstep(0.3, 0.6, vUv.x));
    float light = (crest * (0.10 + 0.08 * near) + glint * 0.6) * behindText;
    float a = clamp(light, 0.0, 1.0) * mask;
    gl_FragColor = vec4(vec3(1.0, 0.97, 0.9) * a, a);
    return;
  }

  col += vec3(1.0, 0.97, 0.9) * crest * (0.10 + 0.10 * near);
  col -= vec3(0.10, 0.06, 0.03) * trough * (0.6 + 0.6 * near);
  col += vec3(1.0, 0.96, 0.85) * glint * 0.9;

  col = clamp(col, 0.0, 1.0);
  gl_FragColor = vec4(col * mask, mask);
}
`;

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new window.Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    gl.deleteShader(s);
    return null;
  }
  return s;
}

function texture(gl: WebGLRenderingContext, unit: number, img: HTMLImageElement) {
  const tex = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
  return tex;
}

export function HeroWater({
  layer = "water",
  className = "",
}: {
  layer?: "water" | "light";
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gl = canvas.getContext("webgl", { premultipliedAlpha: true, antialias: false });
    if (!gl) return;

    let disposed = false;
    let raf = 0;
    let visible = true;
    let ro: ResizeObserver | null = null;
    let io: IntersectionObserver | null = null;

    (async () => {
      let img: HTMLImageElement, mask: HTMLImageElement;
      try {
        [img, mask] = await Promise.all([loadImage(IMAGE_SRC), loadImage(MASK_SRC)]);
      } catch {
        return;
      }
      if (disposed) return;

      const vs = compile(gl, gl.VERTEX_SHADER, VERT);
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
      if (!vs || !fs) return;
      const prog = gl.createProgram();
      if (!prog) return;
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
      gl.useProgram(prog);

      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      const aPos = gl.getAttribLocation(prog, "aPos");
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      texture(gl, 0, img);
      texture(gl, 1, mask);
      gl.uniform1i(gl.getUniformLocation(prog, "uImg"), 0);
      gl.uniform1i(gl.getUniformLocation(prog, "uMask"), 1);
      const uScale = gl.getUniformLocation(prog, "uScale");
      const uOffset = gl.getUniformLocation(prog, "uOffset");
      const uTime = gl.getUniformLocation(prog, "uTime");
      gl.uniform1f(gl.getUniformLocation(prog, "uLightOnly"), layer === "light" ? 1 : 0);

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const cw = canvas.clientWidth;
        const ch = canvas.clientHeight;
        if (!cw || !ch) return;
        canvas.width = Math.round(cw * dpr);
        canvas.height = Math.round(ch * dpr);
        gl.viewport(0, 0, canvas.width, canvas.height);
        // Reproduce object-fit: cover with the photograph's focus point.
        const s = Math.max(cw / IMAGE_W, ch / IMAGE_H);
        const dw = IMAGE_W * s;
        const dh = IMAGE_H * s;
        const ox = (cw - dw) * FOCUS_X;
        const oy = (ch - dh) * FOCUS_Y;
        gl.uniform2f(uScale, cw / dw, ch / dh);
        gl.uniform2f(uOffset, -ox / dw, -oy / dh);
      };
      resize();
      ro = new ResizeObserver(resize);
      ro.observe(canvas);

      const start = performance.now();
      const frame = (now: number) => {
        if (disposed) return;
        gl.uniform1f(uTime, (now - start) / 1000);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        if (visible) raf = requestAnimationFrame(frame);
      };

      io = new IntersectionObserver(([entry]) => {
        const was = visible;
        visible = entry.isIntersecting;
        if (visible && !was) raf = requestAnimationFrame(frame);
      });
      io.observe(canvas);

      canvas.style.opacity = "1";
      raf = requestAnimationFrame(frame);
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro?.disconnect();
      io?.disconnect();
    };
  }, [layer]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none opacity-0 transition-opacity duration-1000 ${className}`}
    />
  );
}

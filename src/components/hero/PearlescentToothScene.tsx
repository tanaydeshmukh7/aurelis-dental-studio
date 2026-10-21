"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function PearlescentToothScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 5.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // -----------------------------------------------------------
    // PROCEDURAL ANATOMICAL PEARLESCENT TOOTH
    // -----------------------------------------------------------
    const toothGroup = new THREE.Group();
    scene.add(toothGroup);

    // High quality procedural pearlescent enamel material
    const enamelMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xfcfaf7),
      roughness: 0.14,
      metalness: 0.04,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      transmission: 0.22, // Subsurface tooth enamel light diffusion
      ior: 1.54, // Human tooth enamel index of refraction
      reflectivity: 0.92,
      sheen: 1.0,
      sheenColor: new THREE.Color(0xd4af37), // Subtle champagne sheen
      sheenRoughness: 0.3,
      specularColor: new THREE.Color(0xa1bcab), // Sage green specular highlights
    });

    // Custom shader modification for opalescent / pearlescent iridescence
    enamelMaterial.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 };
      shader.fragmentShader = `
        uniform float uTime;
        ${shader.fragmentShader}
      `;
      shader.fragmentShader = shader.fragmentShader.replace(
        `#include <dithering_fragment>`,
        `
        #include <dithering_fragment>
        // Subtle Pearlescent Fresnel iridescence
        vec3 normalV = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);
        float fresnel = pow(1.0 - max(dot(normalV, viewDir), 0.0), 2.5);
        
        // Iridescent hue shift between Champagne (#B69A72), Sage (#86A58C), and soft Opal Pearl
        vec3 champagne = vec3(0.71, 0.60, 0.45);
        vec3 sage = vec3(0.52, 0.65, 0.55);
        vec3 pearl = vec3(0.98, 0.95, 0.96);
        
        float t = sin(dot(normalV.xy, vec2(2.5, 3.2)) * 1.5 + fresnel * 2.0) * 0.5 + 0.5;
        vec3 irid = mix(champagne, sage, t);
        irid = mix(irid, pearl, 0.4);
        
        gl_FragColor.rgb += irid * fresnel * 0.45;
        `
      );
    };

    // 1. Crown Geometry — sculpt natural human molar crown
    // We create an organic composite shape: crown base + 4 distinct rounded anatomical cusps
    const crownGroup = new THREE.Group();

    // Central crown core with organic bulge
    const crownBaseGeo = new THREE.SphereGeometry(1.0, 64, 48);
    // Deform sphere to create human molar boxy-rounded shape
    const pos = crownBaseGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i);
      let y = pos.getY(i);
      let z = pos.getZ(i);

      // Boxify sphere into tooth molar profile
      x = Math.sign(x) * Math.pow(Math.abs(x), 0.88) * 1.08;
      z = Math.sign(z) * Math.pow(Math.abs(z), 0.92) * 1.02;

      // Slight cervical pinch at bottom of crown
      if (y < 0) {
        const factor = 1.0 + y * 0.22;
        x *= Math.max(0.75, factor);
        z *= Math.max(0.75, factor);
        y *= 0.85;
      } else {
        // Flatten top occlusal table and create central groove dip
        const distFromCenter = Math.sqrt(x * x + z * z);
        if (y > 0.6) {
          y -= (1.0 - Math.min(distFromCenter, 1.0)) * 0.18; // central fossa depression
        }
      }

      pos.setXYZ(i, x, y, z);
    }
    crownBaseGeo.computeVertexNormals();
    const crownBase = new THREE.Mesh(crownBaseGeo, enamelMaterial);
    crownGroup.add(crownBase);

    // 4 Cusps (Mesiobuccal, Distobuccal, Mesiolingual, Distolingual)
    const cuspPositions = [
      { x: -0.42, y: 0.82, z: -0.38, r: 0.38, sy: 0.9 },
      { x: 0.42, y: 0.82, z: -0.38, r: 0.36, sy: 0.85 },
      { x: -0.40, y: 0.84, z: 0.38, r: 0.39, sy: 0.92 },
      { x: 0.40, y: 0.83, z: 0.38, r: 0.37, sy: 0.88 },
    ];

    cuspPositions.forEach((cp) => {
      const cuspGeo = new THREE.SphereGeometry(cp.r, 32, 24);
      const cuspPos = cuspGeo.attributes.position;
      for (let i = 0; i < cuspPos.count; i++) {
        let cy = cuspPos.getY(i);
        if (cy < 0) cy *= 0.4; // flatten bottom of cusp
        cuspPos.setY(i, cy);
      }
      cuspGeo.computeVertexNormals();
      const cusp = new THREE.Mesh(cuspGeo, enamelMaterial);
      cusp.position.set(cp.x, cp.y, cp.z);
      cusp.scale.set(1.0, cp.sy, 1.0);
      crownGroup.add(cusp);
    });

    crownGroup.position.y = 0.25;
    toothGroup.add(crownGroup);

    // 2. Anatomical Roots (Bifurcated molar roots with organic taper and gentle curvature)
    const rootMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xf6ede2),
      roughness: 0.28,
      metalness: 0.02,
      clearcoat: 0.4,
      clearcoatRoughness: 0.2,
      transmission: 0.12,
      ior: 1.5,
    });

    const createRoot = (offsetX: number, curveDir: number, scale = 1.0) => {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(offsetX * 0.8, -0.35, 0),
        new THREE.Vector3(offsetX * 1.05, -0.9, curveDir * 0.1),
        new THREE.Vector3(offsetX * 0.9 + curveDir * 0.15, -1.5, curveDir * 0.22),
        new THREE.Vector3(offsetX * 0.65 + curveDir * 0.28, -2.1 * scale, curveDir * 0.28),
      ]);

      const rootGeo = new THREE.TubeGeometry(curve, 32, 0.32, 24, false);
      const rPos = rootGeo.attributes.position;
      for (let i = 0; i < rPos.count; i++) {
        const ry = rPos.getY(i);
        const t = Math.max(0, Math.min(1, (ry + 0.35) / -1.75));
        const taper = Math.max(0.2, 1.0 - t * 0.72); // Taper gracefully down to root apex
        rPos.setX(i, rPos.getX(i) * taper + (1 - taper) * (offsetX * 0.65 + curveDir * 0.28));
        rPos.setZ(i, rPos.getZ(i) * taper + (1 - taper) * (curveDir * 0.28));
      }
      rootGeo.computeVertexNormals();
      return new THREE.Mesh(rootGeo, rootMaterial);
    };

    const rootLeft = createRoot(-0.38, -0.2, 1.0);
    const rootRight = createRoot(0.38, 0.2, 0.96);
    toothGroup.add(rootLeft);
    toothGroup.add(rootRight);

    // Cervical transition ring (enamel boundary)
    const cervicalGeo = new THREE.CylinderGeometry(0.78, 0.68, 0.25, 48);
    cervicalGeo.computeVertexNormals();
    const cervical = new THREE.Mesh(cervicalGeo, enamelMaterial);
    cervical.position.y = -0.42;
    cervical.scale.set(1.08, 1, 0.98);
    toothGroup.add(cervical);

    // Initial tooth orientation & size
    toothGroup.scale.set(1.32, 1.32, 1.32);
    toothGroup.position.set(0.1, 0.1, 0);
    toothGroup.rotation.set(0.12, -0.35, -0.05);

    // -----------------------------------------------------------
    // LIGHTING: Atmospheric, Studio & Verdant Ambient Bounce
    // -----------------------------------------------------------
    // Key light: Warm champagne sunlight
    const keyLight = new THREE.DirectionalLight(0xfff6ea, 2.2);
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Fill light: Soft ivory studio bounce
    const fillLight = new THREE.DirectionalLight(0xf4efe6, 1.3);
    fillLight.position.set(-4, 2, 3);
    scene.add(fillLight);

    // Rim light: Sage green glint on crown edges
    const rimLight = new THREE.DirectionalLight(0x86a58c, 2.6);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    // Ambient light: Soft warm neutral
    const ambientLight = new THREE.AmbientLight(0xf7f5f0, 0.85);
    scene.add(ambientLight);

    // Bottom meadow bounce light: Verdant reflection from grass
    const meadowBounce = new THREE.DirectionalLight(0xa1bcab, 0.9);
    meadowBounce.position.set(0, -4, 2);
    scene.add(meadowBounce);

    // -----------------------------------------------------------
    // FLOATING LUMINESCENT PEARL PARTICLES
    // -----------------------------------------------------------
    const particleCount = 28;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 3.6;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 3.6 + 0.3;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 2.5;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color(0xd4af37),
      size: 0.045,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // -----------------------------------------------------------
    // INTERACTION & ANIMATION LOOP
    // -----------------------------------------------------------
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0.12;
    let targetRotY = -0.35;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
      targetRotY = -0.35 + x * 0.35;
      targetRotX = 0.12 - y * 0.2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle floating physics
      const floatY = Math.sin(elapsedTime * 1.1) * 0.06;
      toothGroup.position.y = 0.1 + floatY;

      // Smooth mouse rotation damping
      toothGroup.rotation.y += (targetRotY - toothGroup.rotation.y) * 0.04;
      toothGroup.rotation.x += (targetRotX - toothGroup.rotation.x) * 0.04;

      // Subtle yaw breathing
      toothGroup.rotation.z = -0.05 + Math.sin(elapsedTime * 0.8) * 0.02;

      // Particle gentle drift
      particles.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      crownBaseGeo.dispose();
      particleGeo.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[460px] sm:min-h-[560px] lg:min-h-[640px] flex items-center justify-center pointer-events-auto">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full absolute inset-0 z-10 flex items-center justify-center cursor-grab active:cursor-grabbing"
        title="Interactive 3D Pearlescent Enamel Molar — Move cursor to inspect"
      />

      {/* Fallback if WebGL is disabled */}
      {!hasWebGL && (
        <div className="relative z-10 w-72 h-80 bg-sand/30 rounded-full blur-2xl flex items-center justify-center">
          <div className="text-center p-6 bg-ivory/90 border border-espresso/10 shadow-float">
            <span className="font-serif text-2xl text-espresso block mb-1">
              AURELIS
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-sage-dark font-semibold">
              3D Pearlescent Enamel
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

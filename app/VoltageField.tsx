"use client";

import { useEffect, useRef } from "react";

export function VoltageField() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let disposed = false;
    let clean = () => {};

    (async () => {
      const THREE = await import("three");
      if (!canvas.current || disposed) return;

      const element = canvas.current;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
      camera.position.set(0, 0, 6.5);

      const renderer = new THREE.WebGLRenderer({ canvas: element, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.25));
      renderer.setClearColor(0x000000, 0);

      const uniforms = {
        time: { value: 0 },
        pointer: { value: new THREE.Vector2(0, 0) },
        scroll: { value: 0 },
      };

      const material = new THREE.ShaderMaterial({
        uniforms,
        transparent: true,
        vertexShader: `
          uniform float time;
          uniform vec2 pointer;
          uniform float scroll;
          varying vec3 vNormal;
          varying vec3 vPosition;
          float wave(vec3 p) {
            return sin(p.x*2.1 + time*.8) * .11 + sin(p.y*3.2 - time*.7) * .08 + sin(p.z*3.0 + time*.55) * .07;
          }
          void main() {
            vNormal = normal;
            float distortion = wave(position) + sin(length(position.xy)*5.0 - time)*.035;
            vec3 p = position + normal * distortion;
            p.xy += pointer * .12 * (p.z + 1.0);
            p.z += scroll * .33;
            vPosition = p;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            vec3 light = normalize(vec3(-.4, .75, 1.0));
            float diffuse = max(dot(normalize(vNormal), light), 0.0);
            float fresnel = pow(1.0 - max(dot(normalize(vNormal), normalize(cameraPosition - vPosition)), 0.0), 2.4);
            vec3 deep = vec3(.0, .05, .05);
            vec3 electric = vec3(.16, .82, .76);
            vec3 core = vec3(.02, .30, .27);
            vec3 color = mix(deep, core, diffuse*.55);
            color = mix(color, electric, fresnel*.72 + diffuse*.22);
            gl_FragColor = vec4(color, .9);
          }
        `,
      });

      const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(2.04, 4), material);
      scene.add(shell);
      const points = new THREE.Points(
        new THREE.IcosahedronGeometry(2.13, 4),
        new THREE.PointsMaterial({ color: 0x74fff0, size: 0.018, transparent: true, opacity: 0.55, sizeAttenuation: true })
      );
      scene.add(points);
      const rim = new THREE.Mesh(
        new THREE.TorusGeometry(2.48, 0.008, 6, 80),
        new THREE.MeshBasicMaterial({ color: 0x43ead9, transparent: true, opacity: 0.36 })
      );
      rim.rotation.x = 1.12;
      scene.add(rim);

      const resize = () => {
        const rect = element.getBoundingClientRect();
        renderer.setSize(rect.width, rect.height, false);
        camera.aspect = rect.width / rect.height;
        camera.updateProjectionMatrix();
      };
      const pointer = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        uniforms.pointer.value.set((event.clientX - rect.left) / rect.width - .5, -((event.clientY - rect.top) / rect.height - .5));
      };
      const onScroll = () => { uniforms.scroll.value = Math.min(scrollY / 1300, 1); };
      const clock = new THREE.Clock();

      const draw = () => {
        const elapsed = clock.getElapsedTime();
        uniforms.time.value = elapsed;
        shell.rotation.y = elapsed * .12 + uniforms.pointer.value.x * .45;
        shell.rotation.x = Math.sin(elapsed * .35) * .12 + uniforms.pointer.value.y * .25;
        points.rotation.copy(shell.rotation);
        rim.rotation.z = elapsed * .18;
        renderer.render(scene, camera);
      };

      // Only animate while the field is on screen and the tab is visible.
      let frame = 0, onScreen = true;
      const loop = () => { draw(); frame = requestAnimationFrame(loop); };
      const running = () => onScreen && !document.hidden;
      const start = () => { if (!frame && running()) { clock.getDelta(); frame = requestAnimationFrame(loop); } };
      const stop = () => { if (frame) { cancelAnimationFrame(frame); frame = 0; } };
      const sync = () => { running() ? start() : stop(); };

      const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; sync(); }, { threshold: 0 });
      io.observe(element);
      const onVis = () => sync();

      resize(); start();
      addEventListener("resize", resize);
      addEventListener("pointermove", pointer, { passive: true });
      addEventListener("scroll", onScroll, { passive: true });
      document.addEventListener("visibilitychange", onVis);
      clean = () => {
        stop(); io.disconnect();
        removeEventListener("resize", resize); removeEventListener("pointermove", pointer); removeEventListener("scroll", onScroll);
        document.removeEventListener("visibilitychange", onVis);
        shell.geometry.dispose(); material.dispose(); points.geometry.dispose(); (points.material as THREE.Material).dispose(); rim.geometry.dispose(); (rim.material as THREE.Material).dispose(); renderer.dispose();
      };
    })();
    return () => { disposed = true; clean(); };
  }, []);

  return <canvas className="voltage-field" ref={canvas} aria-label="Campo elétrico tridimensional interativo" />;
}

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulse: number;
  pulseSpeed: number;
}

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let nodes: Node[] = [];
    const CONNECTION_DIST = 220;
    const MOUSE_DIST = 280;
    const NODE_COUNT_BASE = 40;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }

    function initNodes() {
      const w = canvas!.width;
      const h = canvas!.height;
      const count = Math.floor((w * h) / (1920 * 1080) * NODE_COUNT_BASE);
      nodes = Array.from({ length: Math.max(count, 20) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.8,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.01 + 0.005,
      }));
    }

    const green = { r: 0, g: 199, b: 100 };
    const blue = { r: 46, g: 63, b: 173 };

    let gradientOffset = 0;

    function draw() {
      const w = canvas!.width;
      const h = canvas!.height;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Animated gradient background
      gradientOffset += 0.002;
      const gx = Math.sin(gradientOffset) * 0.3 + 0.5;
      const gy = Math.cos(gradientOffset * 0.7) * 0.3 + 0.5;
      const gx2 = Math.cos(gradientOffset * 1.3) * 0.3 + 0.5;
      const gy2 = Math.sin(gradientOffset * 0.9) * 0.3 + 0.5;

      ctx!.clearRect(0, 0, w, h);

      // Orb 1 — green
      const g1 = ctx!.createRadialGradient(gx * w, gy * h, 0, gx * w, gy * h, w * 0.45);
      g1.addColorStop(0, "rgba(0, 199, 100, 0.08)");
      g1.addColorStop(0.5, "rgba(0, 199, 100, 0.03)");
      g1.addColorStop(1, "rgba(0, 199, 100, 0)");
      ctx!.fillStyle = g1;
      ctx!.fillRect(0, 0, w, h);

      // Orb 2 — blue
      const g2 = ctx!.createRadialGradient(gx2 * w, gy2 * h, 0, gx2 * w, gy2 * h, w * 0.4);
      g2.addColorStop(0, "rgba(46, 63, 173, 0.1)");
      g2.addColorStop(0.5, "rgba(46, 63, 173, 0.04)");
      g2.addColorStop(1, "rgba(46, 63, 173, 0)");
      ctx!.fillStyle = g2;
      ctx!.fillRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        n.x = Math.max(0, Math.min(w, n.x));
        n.y = Math.max(0, Math.min(h, n.y));

        // Parallax repulsion from mouse
        const pdx = n.x - mx;
        const pdy = n.y - my;
        const pDist = Math.sqrt(pdx * pdx + pdy * pdy);
        if (pDist < MOUSE_DIST && pDist > 1) {
          const force = (1 - pDist / MOUSE_DIST) * 1.5;
          n.x += (pdx / pDist) * force;
          n.y += (pdy / pDist) * force;
        }
      }

      // Node-to-node connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.3;
            const color = (i + j) % 3 === 0 ? green : blue;
            ctx!.strokeStyle = `rgba(${color.r},${color.g},${color.b},${alpha})`;
            ctx!.lineWidth = 0.5;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }
      }

      // Mouse-to-node connections
      for (const n of nodes) {
        const dx = n.x - mx;
        const dy = n.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_DIST) {
          const alpha = (1 - dist / MOUSE_DIST) * 0.6;
          ctx!.strokeStyle = `rgba(${green.r},${green.g},${green.b},${alpha})`;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.moveTo(mx, my);
          ctx!.lineTo(n.x, n.y);
          ctx!.stroke();
        }
      }

      // Mouse glow
      if (mx > 0 && my > 0) {
        const grad = ctx!.createRadialGradient(mx, my, 0, mx, my, 60);
        grad.addColorStop(0, `rgba(${green.r},${green.g},${green.b},0.15)`);
        grad.addColorStop(1, `rgba(${green.r},${green.g},${green.b},0)`);
        ctx!.fillStyle = grad;
        ctx!.beginPath();
        ctx!.arc(mx, my, 60, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Draw nodes
      for (const n of nodes) {
        const pulseAlpha = 0.3 + Math.sin(n.pulse) * 0.15;
        const dxM = n.x - mx;
        const dyM = n.y - my;
        const distM = Math.sqrt(dxM * dxM + dyM * dyM);
        const nearMouse = distM < MOUSE_DIST;
        const color = nearMouse ? green : ((Math.floor(n.x + n.y)) % 3 === 0 ? green : blue);
        const boost = nearMouse ? 1.5 : 1;

        // Glow
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.radius * 4 * boost, 0, Math.PI * 2);
        const grad = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius * 4 * boost);
        grad.addColorStop(0, `rgba(${color.r},${color.g},${color.b},${pulseAlpha * 0.5 * boost})`);
        grad.addColorStop(1, `rgba(${color.r},${color.g},${color.b},0)`);
        ctx!.fillStyle = grad;
        ctx!.fill();

        // Core dot
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.radius * boost, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${color.r},${color.g},${color.b},${pulseAlpha * boost})`;
        ctx!.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    const handleResize = () => { resize(); initNodes(); };

    resize();
    initNodes();
    draw();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}

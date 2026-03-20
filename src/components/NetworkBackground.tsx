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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let nodes: Node[] = [];
    const CONNECTION_DIST = 220;
    const NODE_COUNT_BASE = 70;

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

    // MARS green and blue
    const green = { r: 0, g: 199, b: 100 }; // hsl(152 100% 39%)
    const blue = { r: 46, g: 63, b: 173 };  // hsl(228 75% 42%)

    function draw() {
      const w = canvas!.width;
      const h = canvas!.height;
      ctx!.clearRect(0, 0, w, h);

      // Update positions
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;

        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        n.x = Math.max(0, Math.min(w, n.x));
        n.y = Math.max(0, Math.min(h, n.y));
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.15;
            // Alternate colors
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

      // Draw nodes
      for (const n of nodes) {
        const pulseAlpha = 0.3 + Math.sin(n.pulse) * 0.15;
        const isGreen = Math.random() > 0.5;
        const color = isGreen ? green : blue;

        // Glow
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.radius * 4, 0, Math.PI * 2);
        const grad = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius * 4);
        grad.addColorStop(0, `rgba(${color.r},${color.g},${color.b},${pulseAlpha * 0.4})`);
        grad.addColorStop(1, `rgba(${color.r},${color.g},${color.b},0)`);
        ctx!.fillStyle = grad;
        ctx!.fill();

        // Core dot
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${color.r},${color.g},${color.b},${pulseAlpha})`;
        ctx!.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    initNodes();
    draw();

    const onResize = () => {
      resize();
      initNodes();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
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

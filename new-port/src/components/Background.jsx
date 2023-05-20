import React, { useRef, useEffect } from "react";

function ParticleAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles = [];
    const particleCount = 3500;
    const particleSize = 6;
    const particleSpeed = 1;

    function Particle(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.speed = Math.random() * particleSpeed + 0.5;
      this.value = Math.random() < 0.5 ? "0" : "1";

      this.update = () => {
        this.y += this.speed;
        if (this.y > canvas.height) {
          this.y = 0;
          this.x = Math.random() * canvas.width;
        }
      };

      this.draw = () => {
        ctx.fillStyle = this.color;
        ctx.font = `${particleSize}px Arial`;
        ctx.fillText(this.value, this.x, this.y);
      };
    }

    function createParticles() {
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const shade = Math.floor(Math.random() * 256);
        const color = `rgba(0, ${shade}, 0, 1)`;
        particles.push(new Particle(x, y, color));
      }
    }

    function animate() {
      ctx.fillStyle = "#000000"; // Set background color to black
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particleCount; i++) {
        particles[i].update();
        particles[i].draw();
      }

      requestAnimationFrame(animate);
    }

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    createParticles();
    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} />;
}

export default ParticleAnimation;

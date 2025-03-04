'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match window
    const setCanvasSize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Capture canvas dimensions for use in Particle
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    // Enhanced Particle class with different shapes and behavior
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      shape: string;
      rotate: number;
      rotateSpeed: number;
      
      constructor() {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 6 + 2; // Slightly larger particles
        this.speedX = Math.random() * 0.2 - 0.1;
        this.speedY = Math.random() * 0.2 - 0.1;
        
        // More interesting colors with a hint of blue
        const opacity = Math.random() * 0.1 + 0.05;
        const hue = Math.random() > 0.7 ? 220 : 240; // Slight variation in blue hue
        this.color = `hsla(${hue}, 70%, 70%, ${opacity})`;
        
        // Different shapes for variety
        const shapes = ['circle', 'square', 'line'];
        this.shape = shapes[Math.floor(Math.random() * shapes.length)];
        this.rotate = Math.random() * Math.PI * 2;
        this.rotateSpeed = (Math.random() * 0.02 - 0.01) * (Math.random() > 0.5 ? 1 : -1);
      }
      
      update() {
        // Drift slowly with slight wave motion
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.05;
        this.y += this.speedY + Math.cos(this.x * 0.01) * 0.05;
        this.rotate += this.rotateSpeed;
        
        // Loop around edges
        if (this.x > canvasWidth) this.x = 0;
        else if (this.x < 0) this.x = canvasWidth;
        
        if (this.y > canvasHeight) this.y = 0;
        else if (this.y < 0) this.y = canvasHeight;
      }
      
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.size / 4;
        
        // Draw different shapes
        switch(this.shape) {
          case 'circle':
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            break;
            
          case 'square':
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotate);
            ctx.fillRect(-this.size, -this.size, this.size * 2, this.size * 2);
            ctx.restore();
            break;
            
          case 'line':
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotate);
            ctx.beginPath();
            ctx.moveTo(-this.size * 2, 0);
            ctx.lineTo(this.size * 2, 0);
            ctx.stroke();
            ctx.restore();
            break;
        }
      }
    }
    
    // Create more particles for a richer effect, but still keep performance in mind
    const particles: Particle[] = [];
    const particleCount = Math.min(30, Math.floor(window.innerWidth / 80));
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Add multi-layered gradients for depth
    const createGradient = () => {
      if (!ctx || !canvas) return null;
      
      // Main background gradient - subtle radial
      const mainGradient = ctx.createRadialGradient(
        canvasWidth / 2,
        canvasHeight / 2,
        0,
        canvasWidth / 2,
        canvasHeight / 2,
        canvasWidth * 0.8
      );
      
      mainGradient.addColorStop(0, 'rgba(30, 30, 40, 0)');
      mainGradient.addColorStop(1, 'rgba(10, 10, 20, 0.05)');
      
      return mainGradient;
    };
    
    let gradient = createGradient();
    
    // Create connecting lines between nearby particles
    const connectParticles = () => {
      if (!ctx) return;
      
      const maxDistance = canvasWidth * 0.07; // Adjust based on screen size
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            // Make line opacity based on distance
            const opacity = 1 - (distance / maxDistance);
            ctx.strokeStyle = `rgba(100, 150, 255, ${opacity * 0.03})`;
            ctx.lineWidth = 1;
            
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };
    
    let animationFrameId: number;
    let frameCount = 0;
    
    // Animation loop with optimized performance
    const animate = () => {
      if (!ctx || !canvas) return;
      frameCount++;
      
      // Clear canvas with slight trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.01)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Only redraw gradient occasionally to save performance
      if (frameCount % 30 === 0) {
        gradient = createGradient();
      }
      
      // Draw base gradient
      if (gradient) {
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Draw connecting lines (can be heavy, so only do occasionally)
      if (frameCount % 2 === 0) {
        connectParticles();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Clean up animation on unmount
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-50"
      style={{ opacity: 0.7 }}
    />
  );
} 
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
        this.size = Math.random() * 6 + 3; // Slightly larger particles
        this.speedX = Math.random() * 0.2 - 0.1;
        this.speedY = Math.random() * 0.2 - 0.1;
        
        // More visible neutral colors
        const opacity = Math.random() * 0.25 + 0.1; // Increased opacity
        const brightness = Math.floor(Math.random() * 60) + 80; // 80-140 brightness range (more visible)
        this.color = `rgba(${brightness}, ${brightness}, ${brightness}, ${opacity})`;
        
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
        ctx.lineWidth = this.size / 3;
        
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
    
    // Create more particles for a richer effect
    const particles: Particle[] = [];
    const particleCount = Math.min(50, Math.floor(window.innerWidth / 60)); // Increased particle count
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Add multi-layered gradients for depth
    const createGradient = () => {
      if (!ctx || !canvas) return null;
      
      // Main background gradient - subtle radial with no blue
      const mainGradient = ctx.createRadialGradient(
        canvasWidth / 2,
        canvasHeight / 2,
        0,
        canvasWidth / 2,
        canvasHeight / 2,
        canvasWidth * 0.8
      );
      
      mainGradient.addColorStop(0, 'rgba(20, 20, 20, 0)');
      mainGradient.addColorStop(1, 'rgba(5, 5, 5, 0.05)');
      
      return mainGradient;
    };
    
    let gradient = createGradient();
    
    // Create connecting lines between nearby particles
    const connectParticles = () => {
      if (!ctx) return;
      
      const maxDistance = canvasWidth * 0.1; // Increased connection distance
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            // More visible connecting lines
            const opacity = 1 - (distance / maxDistance);
            ctx.strokeStyle = `rgba(150, 150, 150, ${opacity * 0.08})`; // Brighter and more visible
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
      
      // Clear canvas with slight trail effect - more visible trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
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
      
      // Draw connecting lines
      connectParticles();
      
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
      style={{ opacity: 1 }} // Full opacity
    />
  );
} 
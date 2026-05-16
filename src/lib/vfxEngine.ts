/**
 * VFX Particle Engine
 * Canvas-based particle system for menu enrichment effects
 *
 * Supports: flames, embers, steam, leaves, sparkles, glows
 * GPU-friendly via batched rendering and requestAnimationFrame
 */

import { VFXConfig } from '@/config/audioVfx.config';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  colour: string;
  alpha: number;
}

export class VFXEngine {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: Particle[] = [];
  private animationId: number | null = null;
  private isRunning: boolean = false;
  private emitterX: number = 0;
  private emitterY: number = 0;
  private config: VFXConfig | null = null;
  private startTime: number = 0;
  private isMobile: boolean = false;

  constructor(canvasElement: HTMLCanvasElement, isMobile: boolean = false) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d', { alpha: true });
    this.isMobile = isMobile;

    if (!this.ctx) {
      console.error('[VFXEngine] Failed to get 2D context');
    }
  }

  /**
   * Start emitting particles based on config
   */
  start(config: VFXConfig, x: number, y: number): void {
    if (!this.ctx || !this.canvas) return;

    this.config = config;
    this.emitterX = x;
    this.emitterY = y;
    this.startTime = Date.now();

    // Determine particle count based on device
    const particleCount = this.isMobile ? config.particleCountMobile : config.particleCount;

    // Create initial particles
    for (let i = 0; i < particleCount; i++) {
      this.emitParticle();
    }

    // Start animation loop
    if (!this.isRunning) {
      this.isRunning = true;
      this.animate();
    }
  }

  /**
   * Stop emitting and fade out
   */
  stop(): void {
    this.config = null;

    // Let existing particles fade out naturally
    // Animation loop will stop when particles.length === 0
  }

  /**
   * Emit a single particle based on current config
   */
  private emitParticle(): void {
    if (!this.config) return;

    const type = this.config.type;
    let particle: Particle;

    switch (type) {
      case 'flame':
        particle = this.createFlame();
        break;
      case 'ember':
        particle = this.createEmber();
        break;
      case 'steam':
        particle = this.createSteam();
        break;
      case 'leaf':
        particle = this.createLeaf();
        break;
      case 'sparkle':
        particle = this.createSparkle();
        break;
      case 'glow':
        particle = this.createGlow();
        break;
      case 'bubble':
        particle = this.createBubble();
        break;
      case 'water':
        particle = this.createWater();
        break;
      case 'coconut':
        particle = this.createCoconut();
        break;
      case 'oil':
        particle = this.createOil();
        break;
      default:
        return;
    }

    this.particles.push(particle);
  }

  /**
   * Create flame particle
   */
  private createFlame(): Particle {
    const intensity = this.config!.intensity === 'high' ? 1.5 : this.config!.intensity === 'medium' ? 1.0 : 0.6;

    return {
      x: this.emitterX + (Math.random() - 0.5) * 20,
      y: this.emitterY,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -1.5 * intensity - Math.random() * 0.5,
      life: 1.0,
      maxLife: 0.8 + Math.random() * 0.4,
      size: 8 + Math.random() * 12 * intensity,
      rotation: 0,
      rotationSpeed: 0,
      colour: this.config!.colours[Math.floor(Math.random() * this.config!.colours.length)],
      alpha: 1.0,
    };
  }

  /**
   * Create ember particle
   */
  private createEmber(): Particle {
    const intensity = this.config!.intensity === 'high' ? 1.3 : this.config!.intensity === 'medium' ? 1.0 : 0.7;

    return {
      x: this.emitterX + (Math.random() - 0.5) * 30,
      y: this.emitterY,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -0.8 * intensity - Math.random() * 0.4,
      life: 1.0,
      maxLife: 1.5 + Math.random() * 1.0,
      size: 3 + Math.random() * 5,
      rotation: 0,
      rotationSpeed: 0,
      colour: this.config!.colours[Math.floor(Math.random() * this.config!.colours.length)],
      alpha: 0.8,
    };
  }

  /**
   * Create steam particle
   */
  private createSteam(): Particle {
    return {
      x: this.emitterX + (Math.random() - 0.5) * 40,
      y: this.emitterY,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -0.6 - Math.random() * 0.3,
      life: 1.0,
      maxLife: 2.0 + Math.random() * 1.0,
      size: 20 + Math.random() * 30,
      rotation: 0,
      rotationSpeed: 0,
      colour: this.config!.colours[0], // White/charcoal
      alpha: 0.3,
    };
  }

  /**
   * Create leaf particle
   */
  private createLeaf(): Particle {
    return {
      x: this.emitterX + (Math.random() - 0.5) * 50,
      y: this.emitterY - 30 - Math.random() * 20,
      vx: (Math.random() - 0.5) * 1.2,
      vy: Math.random() * 0.8 + 0.5,
      life: 1.0,
      maxLife: 2.5 + Math.random() * 1.0,
      size: 6 + Math.random() * 8,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.1,
      colour: this.config!.colours[Math.floor(Math.random() * this.config!.colours.length)],
      alpha: 0.9,
    };
  }

  /**
   * Create sparkle particle
   */
  private createSparkle(): Particle {
    return {
      x: this.emitterX + (Math.random() - 0.5) * 60,
      y: this.emitterY + (Math.random() - 0.5) * 40,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -Math.random() * 0.8,
      life: 1.0,
      maxLife: 0.6 + Math.random() * 0.4,
      size: 3 + Math.random() * 5,
      rotation: 0,
      rotationSpeed: 0,
      colour: this.config!.colours[Math.floor(Math.random() * this.config!.colours.length)],
      alpha: 1.0,
    };
  }

  /**
   * Create glow particle (static halo)
   */
  private createGlow(): Particle {
    return {
      x: this.emitterX,
      y: this.emitterY,
      vx: 0,
      vy: 0,
      life: 1.0,
      maxLife: Number.POSITIVE_INFINITY, // Persistent
      size: 80,
      rotation: 0,
      rotationSpeed: 0,
      colour: this.config!.colours[0],
      alpha: 0.08, // Very subtle
    };
  }

  /**
   * Create bubble particle (for soup)
   */
  private createBubble(): Particle {
    return {
      x: this.emitterX + (Math.random() - 0.5) * 30,
      y: this.emitterY + 10,
      vx: (Math.random() - 0.5) * 0.2,
      vy: -1.0 - Math.random() * 0.5,
      life: 1.0,
      maxLife: 1.2 + Math.random() * 0.8,
      size: 4 + Math.random() * 8,
      rotation: 0,
      rotationSpeed: 0,
      colour: '#FAFAF9', // Charcoal 50
      alpha: 0.6,
    };
  }

  /**
   * Create water splash particle (for seafood)
   */
  private createWater(): Particle {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2.0 + Math.random() * 2.0;

    return {
      x: this.emitterX,
      y: this.emitterY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1.5, // Upward bias
      life: 1.0,
      maxLife: 0.8 + Math.random() * 0.6,
      size: 6 + Math.random() * 10,
      rotation: 0,
      rotationSpeed: 0,
      colour: this.config!.colours[Math.floor(Math.random() * this.config!.colours.length)],
      alpha: 0.7,
    };
  }

  /**
   * Create coconut particle (white chunks)
   */
  private createCoconut(): Particle {
    return {
      x: this.emitterX + (Math.random() - 0.5) * 40,
      y: this.emitterY - 20 - Math.random() * 10,
      vx: (Math.random() - 0.5) * 1.0,
      vy: Math.random() * 0.6 + 0.3,
      life: 1.0,
      maxLife: 2.0 + Math.random() * 1.0,
      size: 5 + Math.random() * 7,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.15,
      colour: this.config!.colours[Math.floor(Math.random() * this.config!.colours.length)],
      alpha: 0.85,
    };
  }

  /**
   * Create oil droplet (for fried/crispy dishes)
   */
  private createOil(): Particle {
    return {
      x: this.emitterX + (Math.random() - 0.5) * 25,
      y: this.emitterY - 10,
      vx: (Math.random() - 0.5) * 0.4,
      vy: Math.random() * 1.5 + 0.5, // Fall down
      life: 1.0,
      maxLife: 1.0 + Math.random() * 0.8,
      size: 3 + Math.random() * 6,
      rotation: 0,
      rotationSpeed: 0,
      colour: this.config!.colours[Math.floor(Math.random() * this.config!.colours.length)],
      alpha: 0.7,
    };
  }

  /**
   * Update particles and render frame
   */
  private animate(): void {
    if (!this.ctx || !this.canvas) return;

    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and render particles
    const deltaTime = 0.016; // Assume 60fps for simplicity

    this.particles = this.particles.filter((particle) => {
      // Update physics
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.rotation += particle.rotationSpeed;
      particle.life -= deltaTime / particle.maxLife;

      // Fade alpha based on life
      if (particle.life < 0.3) {
        particle.alpha = particle.life / 0.3;
      }

      // Render particle
      this.renderParticle(particle);

      // Remove if dead
      return particle.life > 0;
    });

    // Emit new particles if still active and within duration
    if (this.config && this.config.duration) {
      const elapsed = Date.now() - this.startTime;
      if (elapsed < this.config.duration) {
        // Replenish particles occasionally
        if (Math.random() < 0.3) {
          this.emitParticle();
        }
      }
    } else if (this.config) {
      // Continuous emission (for loops like glow)
      if (Math.random() < 0.15) {
        this.emitParticle();
      }
    }

    // Continue loop if particles remain or emitting
    if (this.particles.length > 0 || this.config) {
      this.animationId = requestAnimationFrame(() => this.animate());
    } else {
      this.isRunning = false;
    }
  }

  /**
   * Render a single particle
   */
  private renderParticle(particle: Particle): void {
    if (!this.ctx) return;

    this.ctx.save();
    this.ctx.globalAlpha = particle.alpha;

    // Position
    this.ctx.translate(particle.x, particle.y);
    this.ctx.rotate(particle.rotation);

    // Determine shape based on type
    const type = this.config?.type;

    switch (type) {
      case 'flame':
        // Teardrop flame shape
        this.ctx.fillStyle = particle.colour;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -particle.size);
        this.ctx.bezierCurveTo(
          particle.size / 2,
          -particle.size / 2,
          particle.size / 2,
          particle.size / 3,
          0,
          particle.size
        );
        this.ctx.bezierCurveTo(
          -particle.size / 2,
          particle.size / 3,
          -particle.size / 2,
          -particle.size / 2,
          0,
          -particle.size
        );
        this.ctx.fill();
        break;

      case 'ember':
      case 'sparkle':
        // Simple circle with glow
        const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size);
        gradient.addColorStop(0, particle.colour);
        gradient.addColorStop(1, 'transparent');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(-particle.size, -particle.size, particle.size * 2, particle.size * 2);
        break;

      case 'steam':
      case 'bubble':
        // Soft circle
        const steamGradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size);
        steamGradient.addColorStop(0, particle.colour);
        steamGradient.addColorStop(0.7, particle.colour);
        steamGradient.addColorStop(1, 'transparent');
        this.ctx.fillStyle = steamGradient;
        this.ctx.fillRect(-particle.size, -particle.size, particle.size * 2, particle.size * 2);
        break;

      case 'leaf':
        // Simple leaf shape
        this.ctx.fillStyle = particle.colour;
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, particle.size, particle.size / 2, 0, 0, Math.PI * 2);
        this.ctx.fill();
        break;

      case 'glow':
        // Radial glow
        const glowGradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size);
        glowGradient.addColorStop(0, particle.colour);
        glowGradient.addColorStop(0.5, particle.colour);
        glowGradient.addColorStop(1, 'transparent');
        this.ctx.fillStyle = glowGradient;
        this.ctx.fillRect(-particle.size, -particle.size, particle.size * 2, particle.size * 2);
        break;

      case 'water':
        // Water droplet with gradient
        const waterGradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size);
        waterGradient.addColorStop(0, particle.colour);
        waterGradient.addColorStop(0.6, particle.colour);
        waterGradient.addColorStop(1, 'transparent');
        this.ctx.fillStyle = waterGradient;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
        break;

      case 'coconut':
        // White coconut chunks (irregular shapes)
        this.ctx.fillStyle = particle.colour;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -particle.size);
        this.ctx.lineTo(particle.size * 0.7, -particle.size * 0.5);
        this.ctx.lineTo(particle.size * 0.8, particle.size * 0.3);
        this.ctx.lineTo(particle.size * 0.2, particle.size);
        this.ctx.lineTo(-particle.size * 0.5, particle.size * 0.7);
        this.ctx.lineTo(-particle.size, particle.size * 0.2);
        this.ctx.lineTo(-particle.size * 0.8, -particle.size * 0.4);
        this.ctx.closePath();
        this.ctx.fill();
        break;

      case 'oil':
        // Shiny oil droplet with highlight
        const oilGradient = this.ctx.createRadialGradient(
          -particle.size * 0.2,
          -particle.size * 0.2,
          0,
          0,
          0,
          particle.size
        );
        oilGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)'); // Highlight
        oilGradient.addColorStop(0.3, particle.colour);
        oilGradient.addColorStop(1, 'transparent');
        this.ctx.fillStyle = oilGradient;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
        break;
    }

    this.ctx.restore();
  }

  /**
   * Update emitter position (for following cursor)
   */
  setPosition(x: number, y: number): void {
    this.emitterX = x;
    this.emitterY = y;
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.particles = [];
    this.isRunning = false;
  }
}

/**
 * VFX Manager
 * Pool and manage multiple VFX engines with concurrency limits
 */
export class VFXManager {
  private engines: Map<string, VFXEngine> = new Map();
  private canvasPool: HTMLCanvasElement[] = [];
  private maxConcurrent: number = 2;
  private isMobile: boolean = false;

  constructor(maxConcurrent: number = 2, isMobile: boolean = false) {
    this.maxConcurrent = maxConcurrent;
    this.isMobile = isMobile;
  }

  /**
   * Start VFX at position
   */
  start(id: string, config: VFXConfig, x: number, y: number, container: HTMLElement): void {
    // Enforce concurrency limit
    if (this.engines.size >= this.maxConcurrent) {
      // Stop oldest effect
      const oldestId = Array.from(this.engines.keys())[0];
      this.stop(oldestId);
    }

    // Get or create canvas
    let canvas = this.canvasPool.pop();
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 400;
      canvas.style.position = 'absolute';
      canvas.style.pointerEvents = 'none';
      canvas.style.left = '-200px';
      canvas.style.top = '-200px';
      canvas.style.zIndex = '10';
    }

    // Append to container
    container.appendChild(canvas);

    // Create engine
    const engine = new VFXEngine(canvas, this.isMobile);
    this.engines.set(id, engine);

    // Start emitting
    engine.start(config, 200, 200); // Centre of 400x400 canvas
  }

  /**
   * Stop VFX by ID
   */
  stop(id: string): void {
    const engine = this.engines.get(id);
    if (!engine) return;

    engine.stop();

    // Clean up after fade
    setTimeout(() => {
      engine.destroy();
      this.engines.delete(id);

      // Return canvas to pool
      const canvas = engine['canvas'];
      if (canvas && canvas.parentElement) {
        canvas.parentElement.removeChild(canvas);
        this.canvasPool.push(canvas);
      }
    }, 1000);
  }

  /**
   * Stop all active VFX
   */
  stopAll(): void {
    const ids = Array.from(this.engines.keys());
    ids.forEach((id) => this.stop(id));
  }

  /**
   * Get active VFX count
   */
  getActiveCount(): number {
    return this.engines.size;
  }
}

// Singleton instance
export const vfxManager = new VFXManager(2, false);

// Detect mobile and recreate manager
if (typeof window !== 'undefined') {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  if (isMobile) {
    // Recreate with mobile settings
    (window as any).__vfxManager = new VFXManager(1, true);
  }
}

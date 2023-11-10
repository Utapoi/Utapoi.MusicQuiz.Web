import type { Engine } from 'tsparticles-engine'
import { loadFull } from 'tsparticles'

export function useTriangleParticles() {
  const ParticlesEngine = ref<Engine | null>(null)

  const ParticlesOptions = reactive({
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          area: 400,
        },
      },
      color: {
        value: '#ffffff',
      },
      shape: {
        type: 'triangle',
        stroke: {
          width: 1,
          color: '#efefef',
          opacity: 0.5,
        },
        polygon: {
          nb_sides: 5,
        },
      },
      opacity: {
        value: 0,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 12.783201938177186,
        random: true,
        anim: {
          enable: false,
          speed: 20,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: false,
        distance: 150,
        color: '#ffffff',
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1.734960581453156,
        direction: 'top',
        random: true,
        straight: true,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'connect',
        },
        resize: false,
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  })

  async function Initialize(engine: Engine) {
    // ? We maybe need to load the engine only once
    // Check the docs.
    await loadFull(engine)

    ParticlesEngine.value = engine
  }

  return {
    Initialize,
    ParticlesOptions,
  }
}

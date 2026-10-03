export interface SocialLink {
  name: string;
  url: string;
  handle: string;
}

export interface ProjectTimelineStage {
  angle: string;
  label: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  tagline?: string;
  technicalNote?: {
    badge: string;
    title: string;
    text: string;
    rules: string[];
  };
  timeline?: ProjectTimelineStage[];
  mediaType: 'sequence' | 'interactive-web' | 'parallax' | 'gallery';
  mediaSrc?: string;
  previewUrl?: string;
  accentNote?: string;
  aspectRatio?: string;
  stats?: { label: string; value: string }[];
  tags: string[];
}

export interface CapabilityItem {
  number: string;
  title: string;
  description: string;
  focus: string;
}

export interface ProcessStage {
  step: string;
  title: string;
  description: string;
  detail: string;
}

export interface LabExperiment {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  interactiveType: 'shader' | 'head-vector' | 'canvas-flow' | 'parallax-depth' | 'aspect-ratio' | 'audio-reactive';
  metrics: string;
  tags: string[];
}

export interface CaseStudyStep {
  number: string;
  title: string;
  headline: string;
  description: string;
  parameters: string[];
}

export interface PortfolioConfig {
  brand: {
    name: string;
    label: string;
    positioning: string;
    tagline: string;
    location: string;
    accentColor: string;
    accentGlow: string;
    fontDisplay: string;
  };
  socialLinks: SocialLink[];
  hero: {
    eyebrow: string;
    title: string;
    positioning: string;
    capabilities: string[];
    rightLabel: string;
    rightStatement: string;
    rightParagraph: string;
    scrollPrompt: string;
    sequenceTotalFrames: number;
    sequenceBaseUrl: string;
  };
  projects: ProjectItem[];
  capabilities: CapabilityItem[];
  process: ProcessStage[];
  about: {
    heading: string;
    leadParagraph: string;
    secondaryParagraph: string;
    disciplines: { title: string; desc: string }[];
  };
  lab: {
    title: string;
    subtitle: string;
    experiments: LabExperiment[];
  };
  tools: {
    category: string;
    items: string[];
  }[];
  caseStudy: {
    projectTitle: string;
    projectCategory: string;
    overview: string;
    steps: CaseStudyStep[];
  };
  contact: {
    label: string;
    heading: string;
    subtext: string;
    email: string;
    availability: string;
    primaryCta: string;
    secondaryCta: string;
  };
}

export const initialPortfolioConfig: PortfolioConfig = {
  brand: {
    name: "WAJAHAT ALI",
    label: "CREATIVE TECHNOLOGIST",
    positioning: "AI × WEB × MOTION",
    tagline: "I don't just build websites. I create visual experiences.",
    location: "BASED IN INDIA / AVAILABLE WORLDWIDE",
    accentColor: "#FF5500",
    accentGlow: "rgba(255, 85, 0, 0.25)",
    fontDisplay: "Syne, sans-serif"
  },
  socialLinks: [
    { name: "Instagram", url: "https://instagram.com", handle: "@wajahatali" },
    { name: "YouTube", url: "https://youtube.com", handle: "@wajahatali" },
    { name: "X", url: "https://x.com", handle: "@wajahatali" },
    { name: "LinkedIn", url: "https://linkedin.com", handle: "wajahatali" },
    { name: "GitHub", url: "https://github.com", handle: "wajahatali" }
  ],
  hero: {
    eyebrow: "HEY, I'M WAJAHAT ALI.",
    title: "CREATIVE\nTECHNOLOGIST",
    positioning: "AI × WEB × MOTION",
    capabilities: [
      "#01 AI VISUALS",
      "#02 INTERACTIVE WEB",
      "#03 CINEMATIC MOTION",
      "#04 AI-ASSISTED DEVELOPMENT"
    ],
    rightLabel: "WHAT I CREATE",
    rightStatement: "I BUILD DIGITAL EXPERIENCES THAT MOVE.",
    rightParagraph: "I combine AI, web development, cinematic motion and interactive design to create websites and visual experiences that feel alive.",
    scrollPrompt: "SCROLL TO EXPLORE",
    sequenceTotalFrames: 240,
    sequenceBaseUrl: "https://mlmvzqrlwghxcqtvfiqi.supabase.co/storage/v1/object/public/wajahat/ezgif-frame-"
  },
  projects: [
    {
      id: "90-upward",
      number: "01",
      title: "90° UPWARD",
      category: "AI MOTION / IMAGE → VIDEO",
      tagline: "Controlled Cranial Vector Study",
      description: "A controlled cinematic motion experiment transforming a perfectly centered portrait into a precise 90-degree upward gaze.",
      accentNote: "ONLY HEAD + EYES MOVE · ZERO BODY DRIFT",
      tags: ["Image to Video", "Controlled Motion", "Runway Gen-3", "Optical Flow"],
      stats: [
        { label: "ROTATION ARC", value: "0° → 90°" },
        { label: "TORSO DISPLACEMENT", value: "0.00 mm" },
        { label: "FRAME COUNT", value: "240 Frames" },
        { label: "GAZE ACCURACY", value: "Vertical Zenith" }
      ],
      technicalNote: {
        badge: "CONTROLLED HUMAN MOTION",
        title: "Kinetic Isolation Principle",
        text: "One subject. One controlled movement. Zero unnecessary body gestures.",
        rules: [
          "The body must remain visually frozen.",
          "Only HEAD and EYES move upward.",
          "No shoulder, arm, hand, or torso movement.",
          "No coat, tie, or pocket-watch chain movement.",
          "Camera stays fixed on a cinematic locked axis."
        ]
      },
      timeline: [
        {
          angle: "0°",
          label: "LOOKING FORWARD",
          description: "Subject looking straight ahead. Centered neutral gaze, locked shoulder line, immaculate costume geometry."
        },
        {
          angle: "30°",
          label: "INITIAL MOVEMENT",
          description: "First cranial pivot. Eyelids follow the ascending horizon. Clavicle and torso remain completely immobilized."
        },
        {
          angle: "60°",
          label: "UPWARD TRANSITION",
          description: "Controlled elevation. Chin angles toward zenith. Crisp collar and antique chain remain frozen."
        },
        {
          angle: "90°",
          label: "FINAL GAZE",
          description: "Full vertical alignment. Eyes locked skyward. Subject reaches the exact 90° upward position."
        }
      ],
      mediaType: "sequence",
      mediaSrc: "https://mlmvzqrlwghxcqtvfiqi.supabase.co/storage/v1/object/public/wajahat/ezgif-frame-001.png"
    },
    {
      id: "ai-website-experiences",
      number: "02",
      title: "AI WEBSITE EXPERIENCES",
      category: "AI × WEB DEVELOPMENT",
      tagline: "Generative Canvas & Adaptive Interfaces",
      description: "Interactive websites created with AI-assisted development, cinematic motion and modern frontend experiences.",
      accentNote: "SUB-SECOND GENERATIVE FLUIDITY",
      tags: ["AI Web", "Interactive WebGL", "Tailwind CSS", "Motion Physics"],
      stats: [
        { label: "FRAME RATE", value: "60 FPS" },
        { label: "INTERACTIONS", value: "Micro-physics" },
        { label: "RENDER ENGINE", value: "Canvas + DOM" }
      ],
      mediaType: "interactive-web",
      previewUrl: "#ai-web-preview"
    },
    {
      id: "cinematic-web",
      number: "03",
      title: "CINEMATIC WEB",
      category: "PARALLAX / SCROLL EXPERIENCE",
      tagline: "Spatial Rhythm & Multi-Plane Typography",
      description: "Scroll-driven websites where imagery, typography and motion work together as one visual experience.",
      accentNote: "ZERO-JANK COMPOSITOR PARALLAX",
      tags: ["Scroll Driven", "Parallax Depth", "Editorial Typography", "Cinematic Aspect"],
      stats: [
        { label: "Z-PLANES", value: "4 Spatial Layers" },
        { label: "SCROLL LAG", value: "0 ms" },
        { label: "ASPECT RATIO", value: "2.39:1 Anamorphic" }
      ],
      mediaType: "parallax"
    },
    {
      id: "ai-creative-experiments",
      number: "04",
      title: "AI CREATIVE EXPERIMENTS",
      category: "AI VISUALS",
      tagline: "Latent Sculptures & Neural Vignettes",
      description: "Experimental image, video and motion concepts exploring what AI-assisted creative production can become.",
      accentNote: "FRONTIER GENERATIVE RESEARCH",
      tags: ["Diffusion Models", "Latent Trajectory", "Visual Art Direction", "ComfyUI Pipelines"],
      stats: [
        { label: "SYNTHESIS", value: "Flux + Custom LoRA" },
        { label: "COLOR GRADING", value: "Kodak 5207 LUT" },
        { label: "OUTPUT RESOLUTION", value: "Native 4K Master" }
      ],
      mediaType: "gallery"
    }
  ],
  capabilities: [
    {
      number: "01",
      title: "AI VISUAL CREATION",
      description: "AI-generated imagery, cinematic visuals and creative experimentation.",
      focus: "Diffusion pipelines, custom style LoRAs, photorealistic texture synthesis"
    },
    {
      number: "02",
      title: "INTERACTIVE WEBSITES",
      description: "Modern websites with scroll-driven animation, parallax and immersive UI.",
      focus: "High-retention editorial web apps, custom micro-interactions, responsive craft"
    },
    {
      number: "03",
      title: "IMAGE → VIDEO",
      description: "Transform static imagery into realistic cinematic motion.",
      focus: "Controlled camera paths, isolated kinetic vectoring, frame interpolation"
    },
    {
      number: "04",
      title: "AI-ASSISTED DEVELOPMENT",
      description: "Build websites, internal tools and digital products faster with AI.",
      focus: "Modern TypeScript stacks, rapid iteration, high-performance architectures"
    },
    {
      number: "05",
      title: "3D / MOTION EXPERIENCES",
      description: "Interactive visual systems, 3D elements and scroll-based storytelling.",
      focus: "Canvas rendering, multi-plane parallax, inertial physics, spatial depth"
    },
    {
      number: "06",
      title: "CREATIVE DIRECTION",
      description: "Concept → visual design → motion → final digital experience.",
      focus: "Editorial typography, holistic art direction, atmospheric color grading"
    }
  ],
  process: [
    {
      step: "01",
      title: "IDEA",
      description: "Concept and visual direction.",
      detail: "Establishing core narrative tension, defining visual motifs, identifying technological opportunities."
    },
    {
      step: "02",
      title: "DESIGN",
      description: "Composition, typography, visual language and interaction.",
      detail: "High-contrast editorial typography, asymmetric grids, intentional negative space."
    },
    {
      step: "03",
      title: "AI",
      description: "Generate and refine visual assets.",
      detail: "Precision prompt engineering, latent vector exploration, upscaling to cinema-grade fidelity."
    },
    {
      step: "04",
      title: "MOTION",
      description: "Turn static frames into cinematic movement.",
      detail: "Video synthesis, optical flow locking, strict kinetic discipline over each moving vector."
    },
    {
      step: "05",
      title: "DEVELOPMENT",
      description: "Build the interactive experience.",
      detail: "Silky 60fps canvas renderers, compositor scroll triggers, resilient responsive layouts."
    },
    {
      step: "06",
      title: "FINAL",
      description: "Polish everything into one complete digital experience.",
      detail: "Frame-by-frame pacing, micro-interaction tuning, performance profiling across viewports."
    }
  ],
  about: {
    heading: "I BUILD AT THE INTERSECTION OF AI, DESIGN & CODE.",
    leadParagraph: "I experiment with AI, motion and modern web technology to create digital experiences that are visually striking, interactive and memorable.",
    secondaryParagraph: "Rather than following conventional web tropes or templated interfaces, my practice treats code as an expressive cinematographic canvas. Every scroll stroke, frame transition, and typographic anchor is composed with relentless intent.",
    disciplines: [
      {
        title: "Aesthetic Discipline",
        desc: "Strict adherence to editorial hierarchy, zero template clutter, and intentional monochrome restraint with high-voltage orange accents."
      },
      {
        title: "Controlled Kinetics",
        desc: "Motion designed with biological and mechanical plausibility. No purposeless floating, bouncing, or gratuitous effects."
      },
      {
        title: "Technical Rigor",
        desc: "Sub-200ms interaction feedback, hardware-accelerated canvas layers, and memory-conscious asset streaming."
      }
    ]
  },
  lab: {
    title: "THE LAB",
    subtitle: "EXPERIMENTS, IDEAS & THINGS I'M BUILDING.",
    experiments: [
      {
        id: "exp-01",
        title: "90° Cranial Vector Probe",
        category: "Kinetic AI",
        year: "2026",
        description: "Real-time mouse & gyroscope cursor tracking simulating the 90° upward elevation trajectory.",
        interactiveType: "head-vector",
        metrics: "90° Arc / 0% Drift",
        tags: ["Vector Math", "Anatomy", "Optical Flow"]
      },
      {
        id: "exp-02",
        title: "Neural Noise Latent Shifter",
        category: "Shader Tech",
        year: "2026",
        description: "Interactive canvas shader refracting procedural film grain and chromatic aberration in real-time.",
        interactiveType: "shader",
        metrics: "GLSL / 60 FPS",
        tags: ["WebGL", "Shaders", "Grain"]
      },
      {
        id: "exp-03",
        title: "Multi-Plane Spatial Parallax",
        category: "Spatial UI",
        year: "2026",
        description: "3D camera tilt response dynamically shifting foreground typography across background image planes.",
        interactiveType: "parallax-depth",
        metrics: "4 Z-Planes / 12ms",
        tags: ["Parallax", "3D Math", "Perspective"]
      },
      {
        id: "exp-04",
        title: "Cinematic Letterbox Ratio Matrix",
        category: "Aspect Study",
        year: "2026",
        description: "Interactive aspect ratio switcher comparing 2.39:1 anamorphic cinema, 16:9 digital, and 4:3 Academy ratios.",
        interactiveType: "aspect-ratio",
        metrics: "2.39:1 vs 1.85:1",
        tags: ["Cinema", "Framing", "Anamorphic"]
      },
      {
        id: "exp-05",
        title: "Generative Fluid Trajectory",
        category: "Generative",
        year: "2026",
        description: "Mouse-driven particle vector field emulating latent-space diffusion sampling paths.",
        interactiveType: "canvas-flow",
        metrics: "1,200 Particles / O(n)",
        tags: ["Particles", "Vectors", "Physics"]
      },
      {
        id: "exp-06",
        title: "Audio Frequency Spatializer",
        category: "Sonic Motion",
        year: "2026",
        description: "Subtle procedural soundscape synthesiser mapped to scroll velocity and viewport velocity.",
        interactiveType: "audio-reactive",
        metrics: "Web Audio / Sub-bass",
        tags: ["Web Audio", "Oscillators", "Kinetics"]
      }
    ]
  },
  tools: [
    {
      category: "AI",
      items: ["Midjourney v6.1", "Runway Gen-3 Alpha", "Kling AI", "Luma Dream Machine", "ComfyUI", "Flux.1 Dev"]
    },
    {
      category: "WEB",
      items: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Motion / Framer", "HTML5 Canvas API"]
    },
    {
      category: "MOTION",
      items: ["Scroll-Driven Timelines", "Image Sequence Orchestration", "Interpolation Curves", "Velocity Physics"]
    },
    {
      category: "DESIGN",
      items: ["Figma", "Kinetic Typography", "Cinematic Aspect Framing", "Editorial Layouts", "Grid Systems"]
    },
    {
      category: "DEVELOPMENT",
      items: ["AI-Assisted Workflows", "Modern Full-Stack", "Modular Architecture", "Web Audio API", "Performance Optimization"]
    }
  ],
  caseStudy: {
    projectTitle: "90° UPWARD",
    projectCategory: "FEATURED CASE STUDY — AI MOTION / IMAGE → VIDEO",
    overview: "A deep dive into isolating human cranial rotation using AI diffusion video models without triggering involuntary shoulder, chest, or garment deformation.",
    steps: [
      {
        number: "01",
        title: "CONCEPT",
        headline: "Defining Kinetic Boundaries",
        description: "Traditional AI video generation produces chaotic ancillary motions: clothes sway, shoulders drift, cameras track. The goal here was strict biological discipline: move only the skull and gaze precisely 90° upward.",
        parameters: ["Axis: Vertical Yaw 0° -> 90°", "Torso Lockdown: Absolute", "Aesthetic: Dark Noir Studio"]
      },
      {
        number: "02",
        title: "REFERENCE",
        headline: "Anatomical Pivot Mapping",
        description: "Mapped cervical vertebra rotation limits (C1-C7) to ensure the head movement respects biomechanical limits while keeping the clavicle level.",
        parameters: ["Pivot Anchor: Atlas-Axis Joint", "Eyelid Elevation Factor: 1.2x", "Lighting: Top Specular Key"]
      },
      {
        number: "03",
        title: "GENERATION",
        headline: "Base Anchor Synthesization",
        description: "Generated the immaculate 0° forward anchor portrait using customized prompts focused on wool coat lapel crispness, charcoal tie, and gold pocket watch chain.",
        parameters: ["Master Res: 3840 x 2160", "Prompt Weighting: Static Clothing Focus", "Seed Locking: Enforced"]
      },
      {
        number: "04",
        title: "MOTION",
        headline: "Trajectory & Optical Flow",
        description: "Fed the anchor frame into runway video motion models with a vertical motion brush applied strictly from the chin upward, masking the entire torso to 0% motion.",
        parameters: ["Motion Brush Alpha: Chin Upward 1.0", "Torso Mask: 0.00 motion multiplier", "Duration: 240 Frames"]
      },
      {
        number: "05",
        title: "REFINEMENT",
        headline: "Frame-by-Frame De-flickering",
        description: "Removed micro-temporal warping and eye reflection jitter across the 240 frames, ensuring the transition from 0° through 30°, 60°, to 90° feels organic and seamless.",
        parameters: ["Optical Flow Smoother: Enabled", "Specular Retention: 98%", "Edge Coherence: Sub-pixel"]
      },
      {
        number: "06",
        title: "FINAL",
        headline: "Interactive Web Integration",
        description: "Deployed the 240-frame sequence into a scroll-scrubbed canvas architecture with requestAnimationFrame scheduling, giving visitors tactile control over the motion.",
        parameters: ["Render Target: HTML5 Canvas", "Scroll Scrub: Bi-directional", "Memory Footprint: <45MB"]
      }
    ]
  },
  contact: {
    label: "LET'S BUILD SOMETHING.",
    heading: "YOUR NEXT IDEA COULD BE AN EXPERIENCE.",
    subtext: "Have an idea for a website, AI visual, interactive experience or digital product? Let's collaborate.",
    email: "akbar@nocode.studio",
    availability: "AVAILABLE FOR SELECT 2026 COMMISSIONS & COLLABORATIONS",
    primaryCta: "START A PROJECT",
    secondaryCta: "GET IN TOUCH"
  }
};

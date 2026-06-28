export const personal = {
  name: 'Justine Rhey M. Tambong',
  tagline: 'Backend Developer · AI Full-Stack Engineer',
  subtitle: 'I build production-grade backend systems, AI automation tools, and full-stack applications. Ships real client work — not just tutorials.',
  resumePath: './resume.pdf',
  calLink: null,
  availability: true,

  bio: [
    'Backend developer and AI engineer based in Manila. I build intelligent automation systems, SaaS products, and blockchain-integrated applications — from the API layer to the infrastructure underneath.',
    'Currently at TambayanPH, shipping AI-powered business solutions with n8n and Claude Code. I work across the stack: Rust/Java on the backend, React on the frontend, Linux/CLI in between. I reverse-engineer undocumented APIs when there\'s no documentation to follow.',
  ],

  photoPath: './images/new_profike.png',
  photoFallback: './images/new_profike.png',
  photoAlt: 'Justine Rhey M. Tambong',

  location: 'Metro Manila, Philippines',
  email: 'justrhey.tambong@gmail.com',
  github: 'github.com/justrhey',
  linkedin: 'linkedin.com/in/justrhey',

  experience: [
    {
      role: 'AI Engineer',
      company: 'TambayanPH',
      location: 'Philippines',
      period: 'Feb 2025 – Present',
      highlights: [
        'Develop SaaS products by integrating n8n automation workflows with Claude Code, enabling end-to-end AI-powered business solutions',
        'Implement AI-driven solutions using Google\'s Anti-Gravity framework and Claude by Anthropic, including experimental browser tools, PRDs, and MCP integrations',
        'Build scalable automation pipelines for business process optimization, covering HTTP request orchestration and API integrations',
        'Collaborate with core community members to architect, iterate, and ship real-world automation systems',
      ],
      clientWork: [
        {
          name: 'VetLevel',
          desc: 'Built a Facebook automation tool for veterinary businesses to manage online presence and client interactions; combined AI automation with niche industry requirements',
        },
        {
          name: 'RealmMLP × Notion Integration',
          desc: 'Reverse-engineered undocumented API endpoints using browser DevTools network interception to sync RealmMLP data into Notion; delivered a fully functional integration from zero documentation',
        },
      ],
    },
  ],
}

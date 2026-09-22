import { motion, useReducedMotion } from "framer-motion";
import windowsConsole from "../images/windows-infrastructure-console.svg";

const infrastructureProjects = [
  {
    title: "Windows Infrastructure Reliability Console",
    description:
      "Windows-focused reliability lab with PowerShell health checks, network visibility, SHA-256 backup verification, failover simulation, and Windows CI.",
    tags: ["PowerShell", "Windows", "Networking", "Backup", "React"],
    repo: "https://github.com/yeabsira-mesfin/job-listing-",
    image: windowsConsole,
    featured: true,
  },
  {
    title: "High-Availability Hosting Lab",
    description:
      "Containerized redundant hosting environment with NGINX load balancing, health checks, failover testing, and Prometheus monitoring.",
    tags: ["Docker", "NGINX", "Prometheus", "Python"],
    repo: "https://github.com/yeabsira-mesfin/high-availability-hosting-lab",
    code: "HA",
  },
  {
    title: "Secure Cloud Infrastructure as Code",
    description:
      "Terraform-based AWS architecture with multi-AZ design, load balancing, autoscaling, security groups, and encrypted versioned backup storage.",
    tags: ["Terraform", "AWS", "IaC", "Cloud Security"],
    repo: "https://github.com/yeabsira-mesfin/secure-cloud-infrastructure-iac",
    code: "IaC",
  },
  {
    title: "Infrastructure Operations Toolkit",
    description:
      "Python toolkit for HTTP/TCP monitoring, structured incident evidence, backup creation, and SHA-256 integrity verification.",
    tags: ["Python", "Monitoring", "Runbooks", "Integrity"],
    repo: "https://github.com/yeabsira-mesfin/infrastructure-operations-toolkit",
    code: "OPS",
  },
  {
    title: "Secure Login Analyzer",
    description:
      "Rule-based authentication event analyzer for repeated failures, blocked IP activity, location anomalies, validation, and automated tests.",
    tags: ["Python", "Authentication", "Detection", "Testing"],
    repo: "https://github.com/yeabsira-mesfin/secure_login_analyzer",
    code: "AUTH",
  },
];

const softwareProjects = [
  {
    title: "Tourist Trail",
    liveDemo: "https://tourist-trail.vercel.app/",
    description: "Travel discovery and planning experience with a clean, user-friendly interface.",
    tags: ["React", "Maps", "Product"],
  },
  {
    title: "TaskFlow",
    liveDemo: "https://project-managment-ten.vercel.app/",
    description: "Task management dashboard focused on clarity, workflow, and productivity.",
    tags: ["React", "Dashboard", "Productivity"],
  },
  {
    title: "ShopEase",
    liveDemo: "https://shop-ease-sigma-jade.vercel.app/",
    description: "E-commerce experience for browsing products and navigating purchase flows.",
    tags: ["React", "E-commerce", "UI"],
  },
  {
    title: "Home Of Games",
    liveDemo: "https://homeofgames.vercel.app/",
    description: "Game discovery and review experience with activity-oriented product UI.",
    tags: ["React", "Games", "Dashboard"],
  },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.48 } },
};

const TagList = ({ tags }) => (
  <div className="mt-4 flex flex-wrap gap-2">
    {tags.map((tag) => (
      <span
        key={tag}
        className="rounded-full border border-emerald-200/10 bg-emerald-200/7 px-2.5 py-1 text-[11px] font-bold text-emerald-100/75"
      >
        {tag}
      </span>
    ))}
  </div>
);

const InfrastructureCard = ({ project, reduceMotion }) => (
  <motion.article
    variants={cardVariants}
    whileHover={reduceMotion ? undefined : { y: -7 }}
    className={
      "group overflow-hidden rounded-[1.6rem] border bg-[#0a251d] shadow-2xl transition " +
      (project.featured
        ? "border-cyan-200/20 lg:col-span-2"
        : "border-white/10")
    }
  >
    {project.image ? (
      <div className="relative overflow-hidden border-b border-white/10 bg-[#07111e]">
        <img
          src={project.image}
          alt={project.title + " project snapshot"}
          className="aspect-[16/9] w-full object-cover transition duration-700 group-hover:scale-[1.035]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061b15]/50 via-transparent to-transparent" />
      </div>
    ) : (
      <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(52,211,153,0.22),transparent_36%),linear-gradient(135deg,#071b16,#0b2b24)]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:26px_26px]" />
        <div className="relative rounded-2xl border border-white/10 bg-black/20 px-8 py-6 text-center shadow-2xl backdrop-blur">
          <div className="text-4xl font-black tracking-[-0.05em] text-emerald-200">
            {project.code}
          </div>
          <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
            Infrastructure project
          </div>
        </div>
      </div>
    )}

    <div className="p-6">
      <div className="mb-2 flex items-start justify-between gap-4">
        <h3 className="text-xl font-extrabold tracking-tight text-white">{project.title}</h3>
        {project.featured && (
          <span className="shrink-0 rounded-full bg-cyan-300/10 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-cyan-200">
            Featured
          </span>
        )}
      </div>
      <p className="text-sm leading-6 text-emerald-50/62">{project.description}</p>
      <TagList tags={project.tags} />
      <a
        href={project.repo}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-emerald-300 transition group-hover:text-emerald-200"
      >
        View Repository <span aria-hidden="true">↗</span>
      </a>
    </div>
  </motion.article>
);

const SoftwareCard = ({ project, reduceMotion }) => (
  <motion.article
    variants={cardVariants}
    whileHover={reduceMotion ? undefined : { y: -6 }}
    className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0a251d] shadow-xl"
  >
    <div className="relative overflow-hidden border-b border-white/10 bg-white">
      <iframe
        src={project.liveDemo}
        title={project.title}
        className="aspect-[16/10] w-full pointer-events-none"
        scrolling="no"
        loading="lazy"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#061b15]/18 to-transparent" />
    </div>
    <div className="p-5">
      <h3 className="text-lg font-extrabold text-white">{project.title}</h3>
      <p className="mt-2 text-sm leading-6 text-emerald-50/60">{project.description}</p>
      <TagList tags={project.tags} />
      <a
        href={project.liveDemo}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-emerald-300"
      >
        Live Demo <span aria-hidden="true">↗</span>
      </a>
    </div>
  </motion.article>
);

const Projects = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="projects" className="relative overflow-hidden bg-[#061b15] px-6 py-24 text-white sm:px-8">
      <div className="absolute right-[-12rem] top-20 h-96 w-96 rounded-full bg-cyan-400/8 blur-3xl" />
      <div className="absolute bottom-20 left-[-10rem] h-96 w-96 rounded-full bg-emerald-400/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl"
        >
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-300">
            Selected work
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
            Software engineering with a growing infrastructure edge.
          </h2>
          <p className="mt-5 text-base leading-7 text-emerald-50/65">
            I still build software products, but I am also applying that engineering foundation to
            reliability, cloud infrastructure, monitoring, automation, networking, and security.
          </p>
        </motion.div>

        <div className="mt-14 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-300">
              Infrastructure & Security
            </p>
            <h3 className="mt-2 text-2xl font-extrabold text-white">Featured technical labs</h3>
          </div>
          <a
            href="https://github.com/yeabsira-mesfin"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-sm font-bold text-emerald-300 hover:text-emerald-200 sm:inline"
          >
            View GitHub ↗
          </a>
        </div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {infrastructureProjects.map((project) => (
            <InfrastructureCard
              key={project.title}
              project={project}
              reduceMotion={reduceMotion}
            />
          ))}
        </motion.div>

        <div className="mt-20">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-300">
            Software Engineering
          </p>
          <h3 className="mt-2 text-2xl font-extrabold text-white">Product and web application work</h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-emerald-50/58">
            My infrastructure focus builds on, rather than replaces, my full-stack software engineering background.
          </p>
        </div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {softwareProjects.map((project) => (
            <SoftwareCard
              key={project.title}
              project={project}
              reduceMotion={reduceMotion}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
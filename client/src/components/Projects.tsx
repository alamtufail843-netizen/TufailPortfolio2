import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, X } from "lucide-react";

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  techStack: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Automatic Timetable Generator",
    category: "Web App",
    description:
      "A smart scheduling tool that automatically generates optimized timetables for colleges and schools.",
    longDescription:
      "Automatic Timetable Generator is an intelligent web-based application that automates the process of creating academic timetables. It uses advanced algorithms to avoid conflicts, balance faculty workloads, and ensure optimal classroom utilization. Designed for educational institutions aiming for efficient and error-free scheduling.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    image: "https://github.com/alamtufail843-netizen/TufailPhotoGallery/blob/main/automatic%20timetable.jpg?raw=true",
    liveUrl: "https://example.com/timetable-generator",
    githubUrl: "https://github.com/yourusername/timetable-generator",
  },
  {
    id: 2,
    title: "Apna Dukan E-Commerce",
    category: "E-Commerce",
    description:
      "A modern e-commerce platform for seamless online shopping with secure payment integration.",
    longDescription:
      "Apna Dukan is a full-stack e-commerce web application offering a smooth shopping experience with features like product search, cart management, user authentication, and online payments. It also includes an admin panel for product and order management.",
    techStack: ["Next.js", "Firebase", "Stripe API", "Tailwind CSS"],
    image: "https://github.com/alamtufail843-netizen/TufailPhotoGallery/blob/main/apni%20dukan.jpg?raw=true",
    liveUrl: "https://example.com/apna-dukan",
    githubUrl: "https://github.com/yourusername/apna-dukan",
  },
  {
    id: 3,
    title: "BookNest Library System",
    category: "Database System",
    description:
      "A secure and efficient library management platform with student and admin login.",
    longDescription:
      "BookNest Library System is a database-driven web app that provides secure access and management for digital libraries. It supports student registration, book search, borrow tracking, and admin management for books and members. It’s built to streamline library operations with a modern UI and reliable backend.",
    techStack: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
    image: "https://github.com/alamtufail843-netizen/TufailPhotoGallery/blob/main/Booknest.jpg?raw=true",
    liveUrl: "https://example.com/library-login",
    githubUrl: "https://github.com/yourusername/library-login",
  },
];

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProject]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "/images/projects/placeholder.jpg";
  };

  return (
    <section
      id="projects"
      className="py-20 md:py-32 bg-card"
      data-testid="section-projects"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Featured Projects
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent development projects
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className="group overflow-hidden hover:shadow-2xl hover:scale-[1.02] cursor-pointer transition-all duration-500"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Image */}
              <div className="relative aspect-video overflow-hidden bg-muted">
                <img
                  src={project.image}
                  alt={project.title}
                  onError={handleImgError}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-sm text-foreground">
                    Click to view details
                  </div>
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                <Badge variant="secondary" className="text-xs">
                  {project.category}
                </Badge>

                <h3 className="text-xl font-semibold text-foreground">
                  {project.title}
                </h3>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 3).map((tech, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.techStack.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.techStack.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-lg"
          onClick={() => setSelectedProject(null)}
        >
          <div
            ref={modalRef}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 rounded-full"
              onClick={() => setSelectedProject(null)}
            >
              <X className="h-5 w-5" />
            </Button>

            <div className="p-6 md:p-8 space-y-6">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  onError={handleImgError}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3">
                <Badge variant="secondary">{selectedProject.category}</Badge>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                  {selectedProject.title}
                </h3>
              </div>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {selectedProject.longDescription}
              </p>

              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-foreground">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech, i) => (
                    <Badge key={i} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                {selectedProject.liveUrl && (
                  <Button asChild>
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      View Live
                      <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>
                  </Button>
                )}
                {selectedProject.githubUrl && (
                  <Button variant="outline" asChild>
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      View Code
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

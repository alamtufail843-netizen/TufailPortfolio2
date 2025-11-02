import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { skills as allSkills } from "@/data/portfolioData";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

type SkillCategory = "all" | "frontend" | "backend" | "tools";

// Icon map
const iconMap: Record<string, LucideIcon> = {
  react: Icons.Atom,
  code: Icons.Code,
  braces: Icons.Braces,
  palette: Icons.Palette,
  wind: Icons.Wind,
  triangle: Icons.Triangle,
  component: Icons.Component,
  "refresh-cw": Icons.RefreshCw,
  server: Icons.Server,
  zap: Icons.Zap,
  database: Icons.Database,
  leaf: Icons.Leaf,
  plug: Icons.Plug,
  hexagon: Icons.Hexagon,
  snake: Icons.Workflow,
  "git-branch": Icons.GitBranch,
  container: Icons.Container,
  cloud: Icons.Cloud,
  workflow: Icons.Workflow,
  package: Icons.Package,
  "test-tube": Icons.TestTube,
  figma: Icons.Figma,
};

// Filter out PyTorch and Scikit-learn
const skills = allSkills.filter(
  (skill) =>
    skill.name.toLowerCase() !== "pytorch" &&
    skill.name.toLowerCase() !== "scikit-learn"
);

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("all");

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  const categories = [
    { id: "all" as SkillCategory, label: "All Skills" },
    { id: "frontend" as SkillCategory, label: "Frontend" },
    { id: "backend" as SkillCategory, label: "Backend" },
    { id: "tools" as SkillCategory, label: "Tools" },
  ];

  return (
    <section
      id="skills"
      className="py-20 md:py-32 bg-gradient-to-b from-background via-muted/20 to-background"
      data-testid="section-skills"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-foreground tracking-tight">
            My Skills & Tech Stack
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of the tools and technologies that power my development workflow.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 text-sm md:text-base font-medium rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? "shadow-lg scale-105"
                  : "hover:scale-105 hover:shadow-md"
              }`}
              data-testid={`button-filter-${category.id}`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Skills Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSkills.map((skill, index) => {
            const IconComponent = iconMap[skill.icon] || Icons.Code;

            return (
              <Card
                key={skill.id}
                className="group relative overflow-hidden border border-border/30 bg-card/60 backdrop-blur-md rounded-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
                  {/* Icon */}
                  <div className="relative flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-7 h-7 text-primary animate-pulse" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 text-center md:text-left space-y-3">
                    {/* Skill Name */}
                    <h3 className="text-xl font-semibold text-foreground tracking-wide">
                      {skill.name}
                    </h3>

                    {/* Category Badge */}
                    <Badge
                      variant="secondary"
                      className="text-xs px-3 py-1 capitalize bg-muted/40"
                    >
                      {skill.category}
                    </Badge>

                    {/* Progress Bar */}
                    <div className="mt-2 space-y-2">
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-purple-400 rounded-full transition-all duration-700"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground text-right">
                        {skill.proficiency}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

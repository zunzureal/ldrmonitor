import { DATA } from "@/components/data/resume";
import { ProjectCard } from "@/components/atomic/card/project-card";
import BlurFade from "@/components/magicui/blur-fade";
import { Separator } from "@/components/ui/separator"
import BlurFadeText from "@/components/magicui/blur-fade-text";


export default function ProjectsPage() {

	const BLUR_FADE_DELAY = 0.04;

	return (
		<section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-normal font-kanit tracking-tighter sm:text-5xl">
                  Projects
                </h2>
                <Separator className="py-[2px] color-[" />
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <ProjectCard
                  href={project.href}
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  links={project.links}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
	);
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CasePage } from "@/components/fde/case-page";
import { getProject, projectSlugs } from "@/content/portfolio";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject("zh", slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.slug}`,
      languages: {
        "zh-CN": `/projects/${project.slug}`,
        en: `/en/projects/${project.slug}`,
      },
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject("zh", slug);
  if (!project) notFound();
  return <CasePage locale="zh" project={project} />;
}

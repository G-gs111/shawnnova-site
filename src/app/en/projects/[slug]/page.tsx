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
  const project = getProject("en", slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/en/projects/${project.slug}`,
      languages: {
        "zh-CN": `/projects/${project.slug}`,
        en: `/en/projects/${project.slug}`,
      },
    },
  };
}

export default async function EnglishProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject("en", slug);
  if (!project) notFound();
  return <CasePage locale="en" project={project} />;
}

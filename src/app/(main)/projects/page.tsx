import React from 'react'
import Card, {CardProps} from "@/app/components/Card";
import SkillCard, {CardSkill} from "@/app/components/SkillCard";
const projectsData:CardProps[] = [
    {
        title: 'Website Portofolio',
        description: 'Portofolio pribadi yang dibangun dengan Next.js dan Tailwind CSS.',
        tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    },
    {
        title: 'Aplikasi To-Do List',
        description: 'Aplikasi sederhana untuk manajemen tugas harian.',
        tech: ['React', 'Zustand'],
    },
]
const SkillList:CardSkill[]=[
    {
        skillName:'Next.js',
        level:'Advanced'
    },
    {
        skillName:'TypeScript',
        level:'Intermediate'
    }
]

const Page = () => {
    return (
        <>
            <section className="p-8 md:p-16">
                <h2 className="text-3xl font-bold mb-8">Proyek Saya</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projectsData.map((project) => (
                        <Card key={project.title} {...project} />
                    ))}
                </div>

            </section>
            <section className={"p-8 md:p-16"}>
                <h2 className="text-3xl font-bold mb-8"></h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {SkillList.map((skill)=>{
                        return <SkillCard key={skill.skillName} skillName={skill.skillName} level={skill.level}/>
                    })}
                </div>
            </section>
        </>

            );
}
export default Page

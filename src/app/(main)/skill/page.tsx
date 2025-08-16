import React from 'react'
import SkillCard, {CardSkill} from "@/app/components/SkillCard";

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
       <section className={"p-8 md:p-16"}>
           <h2 className="text-3xl font-bold mb-8"></h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {SkillList.map((skill)=>{
                return <SkillCard key={skill.skillName} skillName={skill.skillName} level={skill.level}/>
                               })}
           </div>
       </section>
    )
}
export default Page

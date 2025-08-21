import {CardSkill} from "@/app/components/SkillCard";

const skills: CardSkill[]=[
    { id: 1, skillName: 'Next.js', level: 'Advanced' as const },
    { id: 2, skillName: 'TypeScript', level: 'Intermediate' as const },
    { id: 3, skillName: 'React', level: 'Advanced' as const },
    { id: 4, skillName: 'JavaScript', level: 'Advanced' as const },
]

export async function GET(){
    await new Promise(resolve=>{setTimeout(resolve,5000)});
    return new Response(JSON.stringify(skills));

}
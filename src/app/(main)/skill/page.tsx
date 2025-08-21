
 import SkillCard, {CardSkill} from "@/app/components/SkillCard";
import List from "@/app/components/List"; // Asumsikan tipe Project punya id

async function getSkill(): Promise<CardSkill[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/skills`, {
        cache: 'no-store', // Selalu ambil data terbaru
    });
    if (!res.ok) throw new Error('Gagal mengambil data proyek');
    return res.json();
}

const ProjectsPage = async () => {
    const skills = await getSkill();

    return (
        <section className="p-8 md:p-16">
            <h2 className="text-3xl font-bold mb-8">Proyek Saya (Data dari API)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <List items={skills} renderItem={(skills)=>(
                   <SkillCard id={skills.id} skillName={skills.skillName} level={skills.level}/>
               )}></List>
            </div>
        </section>
    );
};

export default ProjectsPage;
import Card from '@/app/components/Card';
 import SkillCard, {CardSkill} from "@/app/components/SkillCard"; // Asumsikan tipe Project punya id

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
                {skills.map((skill) => (
                    <SkillCard
                        key={skill.id} skillName={skill.skillName} level={skill.level} id={skill.id}                    />
                ))}
            </div>
        </section>
    );
};

export default ProjectsPage;
import Greeting from './components/Greeting';
import Bio from "@/app/components/Bio";

const HomePage = () => {
  return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <Greeting name="Pengunjung" />
        <p className="mt-4 text-lg">Ini adalah portofolio saya yang dibuat dengan Next.js.</p>
        <Bio description={"ini description"}/>
     </main>
  );
};

export default HomePage;
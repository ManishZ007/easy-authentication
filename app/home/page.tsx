import { ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <section className="py-20">
      <div className="container flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <p className="text-3xl font-bold">Welcome to the home page</p>
          <ArrowRight className="h-4 w-4 " />
        </div>

        <p className="text-muted-foreground">implement your project</p>
      </div>
    </section>
  );
};

export default Home;

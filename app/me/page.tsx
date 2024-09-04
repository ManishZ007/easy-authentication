import React from "react";
import { ArrowRight } from "lucide-react";

const Page = () => {
  return (
    <section className="py-20">
      <div className="container flex flex-col gap-2">
        <div className="flex gap-4 items-center">
          <p className="text-3xl font-bold">My content</p>
          <ArrowRight className="h-5 w-5" />
        </div>
        <p className="text-muted-foreground">create your own stuff</p>
      </div>
    </section>
  );
};

export default Page;

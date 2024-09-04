import React from "react";
import { ArrowRight } from "lucide-react";

const Page = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="flex gap-4 items-center">
          <p className="text-3xl font-bold">About content</p>
          <ArrowRight className="h-4 w-4 " />
        </div>
        <p className="text-muted-foreground">about your stuff</p>
      </div>
    </section>
  );
};

export default Page;

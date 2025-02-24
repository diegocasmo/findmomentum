import type React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const features = [
  {
    title: "Activity Creation",
    description: "Design custom activities with multiple timed tasks.",
  },
  {
    title: "Flexible Task Management",
    description:
      "Set specific durations for tasks and complete them in any order.",
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your progress across tasks and complete activities at your pace.",
  },
];

export const Features = () => {
  return (
    <section className="py-20 px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
};

import type React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CheckCircle, Clock, BarChart } from "lucide-react";

const features = [
  {
    title: "Activity Creation",
    description: "Design custom activities composed of multiple timed tasks.",
    icon: CheckCircle,
  },
  {
    title: "Flexible Task Management",
    description:
      "Organize and complete tasks within your activities in any order.",
    icon: Clock,
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your progress across tasks and activities at your own pace.",
    icon: BarChart,
  },
];

export const Features = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="h-full flex flex-col">
              <CardHeader>
                <feature.icon className="w-10 h-10 mb-4 text-primary" />
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

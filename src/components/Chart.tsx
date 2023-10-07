
import { Card, Title, BarChart, Subtitle } from "@tremor/react";

const chartdata = [
  {
    name: "Amphibians",
    "Number of threatened species": 2488,
  },
  {
    name: "Birds",
    "Number of threatened species": 1445,
  },
  {
    name: "Crustaceans",
    "Number of threatened species": 743,
  },
  {
    name: "Crustaceans",
    "Number of threatened species": 550,
  },
];

const dataFormatter = (number: number) => {
  return "$ " + Intl.NumberFormat("us").format(number).toString();
};



export default function Chart() {


  return (
    <Card className="dark:bg-bgColor !dark:border-neutral-900 mt-5  max-w-full">
    <Title>Number of species threatened with extinction (2021)</Title>
    <Subtitle className="dark:text-neutral-400 text-neutral-500/50">
      The IUCN Red List has assessed only a small share of the total known species in the world.
    </Subtitle>
    <BarChart 
      className="mt-6"
      data={chartdata}
      index="name"
      categories={["Number of threatened species"]}
      colors={["blue"]}
      yAxisWidth={48}
    />
  </Card>
  )
}

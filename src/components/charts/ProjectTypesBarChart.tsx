import { Card, Title, BarChart, Subtitle } from "@tremor/react";

type propsTypes = {
  chartData:barChartType
}

export default function ProjectTypesBarChart({chartData}:propsTypes) {

  return (
    <Card className=" dark:bg-bgColor !dark:border-neutral-900 flex flex-col">
    <Title className="uppercase font-semibold text-textColor">Project Types distribution </Title>
    <Subtitle className="dark:text-neutral-400 text-neutral-500/80 text-[15px] mt-1">
      Explore a detailed breakdown of how many projects you have for each specific project type
    </Subtitle>
    <BarChart 
      className="mt-6 "
      data={chartData}
      index="name"
      showAnimation={true}
      categories={["Project type count"]}
      colors={["orange"]}
      yAxisWidth={30}
    />
  </Card>
  )
}




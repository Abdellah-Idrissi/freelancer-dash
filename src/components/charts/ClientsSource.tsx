"use client"

import { Card, Title, DonutChart, Subtitle } from "@tremor/react";

type propsTypes = {
  chartData:donutChartType
}

export default function ClientsSource({chartData}:propsTypes) {
  return (
    <Card className="  900screen:flex flex-col ">
    <Title className="font-semibold text-textColor uppercase">CLIENTS	Referral Source</Title>
    <Subtitle className="dark:text-neutral-400 text-neutral-500/80 text-[15px] mt-1">
      Discover the distribution of your clients across each referral source
    </Subtitle>
    <DonutChart
      className="mt-6 !h-80"
      data={chartData}
      category="number"
      index="name"
      variant="pie"
      showAnimation={true}
      onValueChange={() => {}}
    />
  </Card>
  )
}


import Chart from "@/components/Chart";
import Cards from "@/components/stats_cards/cards";

export default function page() {
  return (
    <div className="h-[1000px] px-[20px] lg:px-[30px] pt-[20px]">
      <Cards/>
      <Chart/>
    </div>
  )
}

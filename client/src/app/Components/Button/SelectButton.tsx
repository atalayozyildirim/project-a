import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useChartContext } from "@/context/ChartContext";

//@atalayozyildirim
export function SelectButton() {
  const { selectedChart } = useChartContext();

  return (
    <Select onValueChange={(value) => selectedChart(value)}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a chart" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Charts</SelectLabel>
          <SelectItem value="sales">Sales</SelectItem>
          <SelectItem value="Revenue">Revenue</SelectItem>
          <SelectItem value="Lead">Lead Source Chart</SelectItem>
          <SelectItem value="Conversion">Conversion Rate Chart</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

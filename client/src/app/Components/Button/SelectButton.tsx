import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
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
          <SelectItem className="w-[195px]" value="sales">
            Sales
          </SelectItem>
          <SelectItem className="w-[195px]" value="Revenue">
            Revenue Drop
          </SelectItem>
          <SelectItem className="w-[195x]" value="Lead">
            Orders
          </SelectItem>
          <SelectItem className="w-[195px]" value="Conversion">
            Orders Daily
          </SelectItem>
          <SelectItem className="w-[195px]" value="Customers">
            Customer Monthly
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

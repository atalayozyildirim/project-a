import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectButton() {
  return (
    <Select>
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
          <SelectItem value="Customer">Customer </SelectItem>
          <SelectItem value="Product">Product Performance Chart </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

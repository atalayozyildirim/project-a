import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useChartContext } from "@/context/ChartContext";
import axios from "axios";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Charts = () => {
  const { value } = useChartContext();
  const [chartData, setChartData] = useState<number[]>([]);

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: value || "Chart",
        data: chartData,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: value || "Chart",
      },
    },
  };
  const chartDataFetch = async () => {
    try {
      const res = await axios.get(
        `/api/chart/${value == null ? "sales" : value}`
      );

      res.data.map((item: { value: number }) => {
        console.log(item);
        setChartData([item.value]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    chartDataFetch();
  }, [value]);

  return (
    <div className="min-h-screen w-full p-10 bg-transparent text-white">
      <div className="w-full max-w-4xl mx-auto bg-transparent p-6 rounded-lg shadow-lg">
        <h1>{value}</h1>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Charts;

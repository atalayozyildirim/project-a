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
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: value || "chart",
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
        text: value || "chart",
      },
    },
  };

  useEffect(() => {
    const a = [65, 59, 80, 81, 56, 55, 40];
    setChartData(a);
  }, []);

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

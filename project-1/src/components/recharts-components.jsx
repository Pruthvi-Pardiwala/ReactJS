import { Pie, PieChart, Tooltip } from "recharts";

const PieChartComponent = ({
    data = [
        { name: "Page A", uv: 70 },
        { name: "Page B", uv: 200 },
        { name: "Page C", uv: 200 },
    ],
    isAnimationActive = true,
}) => {
    return (
        <>
            <h1 style={{marginTop: '80px'}}>Recharts Components</h1>
            <PieChart width={400} height={400} className="p1" >
                <Pie
                    data={data}
                    dataKey="uv"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    isAnimationActive={isAnimationActive}
                />
                <Tooltip />
            </PieChart>
        </>
    );
};

export default PieChartComponent;
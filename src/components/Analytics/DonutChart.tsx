import ReactApexChart from 'react-apexcharts';
import React from 'react';

type DonutChartProps = {
  data: {
    [key: string]: string;
  };
};

export const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const keys = Object.keys(data).reverse();
  const valuesGraphs = keys.map((key: string) => {
    return +data[key].slice(0, -1);
  });

  const series = valuesGraphs;
  const options = {
    plotOptions: {
      dataLabels: {
        enabled: true,
      },
      pie: {
        customScale: 0.7,
        donut: {
          size: '75%',
        },
      },
    },
    labels: keys.map(el => (el !== 'null' ? el : 'other')),
    chart: {
      type: 'donut',
    },
    legend: {
      position: 'bottom',
      offsetY: 0,
      height: 0,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
            displayName: 'flex',
          },
        },
      },
    ],
  };

  return (
    <div className="flex flex-1 mr-10 flex-col ">
      <h4 className="text-neutral-700 py-[15px] text-lg font-normal font-['Lato']">
        Location
      </h4>
      <div className="rounded-[10px] border px-5 py-[25px] border-solid border-neutral-200 justify-start ">
        <ReactApexChart options={options} series={series} type="donut" height={350} />
      </div>
    </div>
  );
};

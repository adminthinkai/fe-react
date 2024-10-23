import React from 'react';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

type ActivityChartProps = {
  data?: number[];
  interval?: string[];
  seriesName: string;
};

export const ActivityCharts: React.FC<ActivityChartProps> = ({
  data,
  interval,
  seriesName,
}) => {
  const dates = interval || [];
  const series = [
    {
      name: seriesName,
      data:
        data ||
        [].map((item, index) => {
          return {
            x: dates[index],
            y: item,
          };
        }),
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      intersect: false,
      shared: false,
    },
    labels: dates,
    plotOptions: {
      bar: {
        borderRadius: 10,
        borderRadiusApplication: 'end',
        // borderRadiusWhenStacked: 'last'
        columnWidth: 25,
      },
    },

    colors: ['#56C596'],
  };

  return <ReactApexChart options={options} series={series} type="bar" height={400} />;
};

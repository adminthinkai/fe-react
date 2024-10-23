import ReactApexChart from 'react-apexcharts';
import React, { Dispatch, SetStateAction } from 'react';
import { ApexOptions } from 'apexcharts';
import { intervalRage } from 'src/components/Analytics/Analytics';

type BarChartProps = {
  data: Array<number>;
  dateData: Array<string>;
  interval: 'Last 6 months' | 'Last 7 days';
  setRangeInterval: Dispatch<SetStateAction<'Last 6 months' | 'Last 7 days'>>;
};

export const BarChart: React.FC<BarChartProps> = ({
  data,
  dateData,
  setRangeInterval,
  interval,
}) => {
  const series = [
    {
      name: 'Classes created',
      data: data.map((item, index) => {
        return {
          x: dateData[index],
          y: item,
        };
      }),
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 380,
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
    labels: dateData,
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

  return (
    <div className="w-3/5 mr-10 flex-col ">
      <div className="flex justify-between items-center">
        <h4 className="text-neutral-700 py-[15px] text-lg font-normal font-['Lato']">
          Created Classes
        </h4>
        <div className="text-neutral-700 opacity-50 text-sm font-normal font-['Lato'] leading-normal">
          <select onChange={e => setRangeInterval(e.target.value)} value={interval}>
            {intervalRage.map(el => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="rounded-[10px] border px-5 py-[25px] border-solid border-neutral-200 justify-start ">
        <ReactApexChart options={options} series={series} type="bar" height={380} />
      </div>
    </div>
  );
};

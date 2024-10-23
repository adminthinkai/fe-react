import React, { Dispatch, SetStateAction } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { intervalRage } from 'src/components/Analytics/Analytics';

type AreaChartProps = {
  data: Array<number>;
  dateData: Array<string>;
  interval: 'Last 6 months' | 'Last 7 days';
  setRangeInterval: Dispatch<SetStateAction<'Last 6 months' | 'Last 7 days'>>;
};
export const AreaChart: React.FC<AreaChartProps> = ({
  data,
  dateData,
  interval,
  setRangeInterval,
}) => {
  const series = [
    {
      name: 'User',
      data: data.map((item, index) => {
        return {
          x: dateData[index],
          y: item,
        };
      }),
    },
  ];

  const options: ApexOptions = {
    colors: ['#8ed1b5'],
    chart: {
      type: 'area',
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
      },
      zoom: {
        enabled: false,
      },
    },
    labels: dateData,
    dataLabels: {
      enabled: false,
    },

    stroke: {
      curve: 'straight',
    },
    fill: {
      opacity: 0.1,
      colors: ['#56C596', '#FFFFFF'],
    },
    markers: {
      size: 6,
    },
    tooltip: {
      intersect: false,
      shared: false,
    },
    theme: {
      palette: 'palette4',
    },
  };

  return (
    <div className="flex flex-1  mr-10 flex-col ">
      <div className="flex justify-between items-center">
        <h4 className="text-neutral-700 py-[15px] text-lg font-normal font-['Lato']">
          User Signups
        </h4>
        <div className="text-neutral-700 opacity-50 text-sm font-normal font-['Lato'] leading-normal">
          <select
            value={interval}
            onChange={e => {
              // @ts-ignore
              setRangeInterval(e.target.value);
            }}
          >
            {intervalRage.map(el => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="rounded-[10px] border px-5 h-full  border-solid border-neutral-200 justify-start ">
        <ReactApexChart options={options} series={series} type="area" height={350} />
      </div>
    </div>
  );
};

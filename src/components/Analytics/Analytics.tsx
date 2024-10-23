import React, { useState } from 'react';
import { TextPlateAnalytic } from 'src/components/Analytics/TextPlateAnalytic';
import { useGetAnalyticsQuery } from 'src/api/analyticsApi';
import { AnalyticsTable } from 'src/components/Analytics/AnalyticsTable';
import { AnalyticsTableContentGen } from 'src/components/Analytics/AnalyticsTableContentGen';
import { LinearProgress } from '@mui/material';
import { AreaChart } from './AreaChart';
import { DonutChart } from './DonutChart';
import { BarChart } from './BarChart';
import { BarChartHorizontal } from './BarChartHorizontal';

export const intervalRage = ['Last 6 months', 'Last 7 days'];

export const Analytics = () => {
  const { data } = useGetAnalyticsQuery({});
  const [intervalSignUps, setIntervalSignUps] = useState<'Last 6 months' | 'Last 7 days'>(
    'Last 6 months',
  );
  const [intervalCreateClass, setIntervalCreateClass] = useState<
    'Last 6 months' | 'Last 7 days'
  >('Last 6 months');
  const [intervalInviteUser, setIntervalInviteUser] = useState<
    'Last 6 months' | 'Last 7 days'
  >('Last 6 months');
  if (!data) {
    return (
      <LinearProgress
        sx={{
          '&.bar1': {
            backgroundColor: '#119293 !important',
          },
        }}
      />
    );
  }

  return (
    <div className="px-12 py-8">
      <div className="flex flex-col gap-3 mb-10">
        <h1 className="text-neutral-700 text-3xl font-bold font-['Lato']">Analytics</h1>
        <h3 className="text-neutral-700 opacity-70 text-lg font-normal font-['Lato']">
          Monitor user signups and activity here
        </h3>
      </div>
      <div className="flex gap-5 ">
        <TextPlateAnalytic
          title="Total Users"
          value={data ? data.totalUsersCount.toString() : '0'}
          lastPeriod="all time"
        />
        <TextPlateAnalytic
          title="New users"
          value={data ? data.newUsersThisMonth.toString() : '0'}
          lastPeriod="last month"
        />
        <TextPlateAnalytic
          title="Active Users"
          value={data ? data.activeUsersThisMonthCount.toString() : '0'}
          lastPeriod="last month"
        />
      </div>
      <div className="flex ">
        <AreaChart
          interval={intervalSignUps}
          setRangeInterval={setIntervalSignUps}
          dateData={
            intervalSignUps === intervalRage[0]
              ? data?.lastSixMonthNamed
              : data?.lastSevenDaysNamed
          }
          data={
            intervalSignUps === intervalRage[0]
              ? data.signUpUsersInTheLastSixMonths
              : data.signUpUsersInTheLastSevenDays
          }
        />
        <DonutChart data={data?.countryPercentages} />
      </div>
      <div className="flex">
        <BarChart
          interval={intervalCreateClass}
          setRangeInterval={setIntervalCreateClass}
          dateData={
            intervalCreateClass === intervalRage[0]
              ? data?.lastSixMonthNamed
              : data?.lastSevenDaysNamed
          }
          data={
            intervalCreateClass === intervalRage[0]
              ? data.createdClassesInTheLastSixMonths
              : data.createdClassesInTheLastSevenDays
          }
        />
        <BarChartHorizontal
          interval={intervalInviteUser}
          setRangeInterval={setIntervalInviteUser}
          dateData={
            intervalInviteUser === intervalRage[0]
              ? data?.lastSixMonthNamed
              : data?.lastSevenDaysNamed
          }
          data={
            intervalInviteUser === intervalRage[0]
              ? data.newUsersInTheLastSixMonths
              : data.newUsersInTheLastSevenDays
          }
        />
      </div>
      <div className="flex flex-col gap-5 ">
        <AnalyticsTable data={data ? data?.lastUsersRequest.rows : []} />
        <AnalyticsTableContentGen data={data ? data?.latestContentGeneration.rows : []} />
      </div>
    </div>
  );
};

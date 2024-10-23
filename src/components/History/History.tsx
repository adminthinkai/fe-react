import React, { useState } from 'react';
import { Table2Col } from 'src/components/History/Table2Col';
import { ActivityCharts } from 'src/components/History/ActivityCharts';
import { useGetAnalyticsUserQuery } from 'src/api/analyticsApi';

export const intervalFilter = ['Last 7 days', 'Last Day'];

export const History = () => {
  const [createdClassInterval, setCreatedClassInterval] = useState(intervalFilter[0]);
  const [requestChatInterval, setRequestChatInterval] = useState(intervalFilter[0]);

  const { data } = useGetAnalyticsUserQuery({});

  const dataForClass =
    createdClassInterval === 'Last 7 days'
      ? data?.createdClassesInTheLastSevenDays
      : data?.createdClassesThisDay;

  const dataRequest =
    requestChatInterval === 'Last 7 days'
      ? data?.requestsToChatInTheLastSevenDays?.map(el => ({
          id: el.id,
          name: el.message,
          creationDate: el.creationDate,
        }))
      : data?.requestsToChatThisDay?.map(el => ({
          id: el.id,
          name: el.message,
          creationDate: el.creationDate,
        }));

  return (
    <div className="px-12 py-8">
      <div className="flex flex-col gap-3 mb-10">
        <h1 className="text-neutral-700 text-3xl font-bold font-['Lato']">History</h1>
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex gap-5">
          {!!dataForClass?.length && (
            <Table2Col
              title="Created Class"
              colName1="Class"
              colName2="Date&Time"
              data={dataForClass}
              setInterval={setCreatedClassInterval}
              interval={createdClassInterval}
            />
          )}
          {!!dataRequest?.length && (
            <Table2Col
              title="Reqests to chat bot"
              colName1="Reqest"
              colName2="Date&Time"
              data={dataRequest}
              setInterval={setRequestChatInterval}
              interval={requestChatInterval}
            />
          )}
        </div>
        <div className="flex gap-5">
          <div className="w-full">
            <div className="mb-2.5 flex items-center  justify-between">
              <h2 className="text-neutral-700 text-lg font-semibold font-['Lato']">
                Your Class Activity
              </h2>
              <div className="text-neutral-700 opacity-50 text-sm font-normal font-['Lato'] leading-normal">
                Last 7 days
              </div>
            </div>
            <div className="w-full bg-white rounded-[20px] border border-solid border-neutral-200 h-[400px]">
              <ActivityCharts
                data={data?.createdClassesActivityInTheLastSevenDays}
                interval={data?.lastSevenDays}
                seriesName="Created Class"
              />
            </div>
          </div>
          {/* <div>
            <div className="mb-2.5 flex items-center justify-between">
              <h2 className="text-neutral-700 text-xl font-semibold font-['Lato'] ">
                Activity by Class
              </h2>
              <div className="text-neutral-700 opacity-50 text-sm font-normal font-['Lato'] leading-normal">
                Last 7 days
              </div>
            </div>
            <div className="w-96 bg-white rounded-[20px] border border-solid border-neutral-200 h-[400px]">
              <ReactApexChart
                options={options}
                series={series}
                type="donut"
                height={400}
              />
            </div>
          </div> */}
          <div className="w-full">
            <div className="mb-2.5 flex items-center  justify-between">
              <h2 className="text-neutral-700 text-lg font-semibold font-['Lato']">
                Your Request Activity
              </h2>
              <div className="text-neutral-700 opacity-50 text-sm font-normal font-['Lato'] leading-normal">
                Last 7 days
              </div>
            </div>
            <div className="w-full bg-white rounded-[20px] border border-solid border-neutral-200 h-[400px]">
              <ActivityCharts
                data={data?.requestsToChatActivityInTheLastSevenDays}
                interval={data?.lastSevenDays}
                seriesName="Request Chat"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

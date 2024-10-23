import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ArrowDownSVG } from 'src/assets/svg/ArrowDownSVG';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SelectText } from 'src/components/RoundedSelect';
import { LinearProgress } from '@mui/material';
import { useUploadDocsMutation } from 'src/api/docApi';
import { TableFiles } from 'src/components/Document/TableFiles';
import { useOutsideArea } from 'src/hooks/useOutsideArea';
import moment from 'moment';
import { Input } from 'src/components';

const filesTypes = [
  { label: 'All', value: '' },
  { label: 'text/plain', value: 'text/plain' },
  {
    label: 'xml / docs',
    value: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  },
  { label: 'sffpages', value: 'application/x-iwork-pages-sffpages' },
];

export const Documentation = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [files, setFiles] = useState([]);
  const defaultStartDate = new Date(new Date().setDate(0));
  const defaultEndDate = new Date(moment().endOf('day').toString());
  const [typeFile, setTypeFile] = useState(filesTypes[0].value);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [valueSizeRequest, setValueSizeRequest] = useState<number[]>([0, 10000000]);
  const [valueSize, setValueSize] = useState<number[]>([0, 10000000]);
  const constDropdownEl = useRef(null);

  useOutsideArea(constDropdownEl, () => setIsOpen(false));

  const [handleUpload, uploadInfo] = useUploadDocsMutation();

  const onClickFilterOpen = () => setIsOpen(!isOpen);

  const handleChangeMin = (event: ChangeEvent<HTMLInputElement>) => {
    setValueSize([+event.target.value, valueSize[1]]);
  };

  const handleChangeMax = (event: ChangeEvent<HTMLInputElement>) => {
    setValueSize([valueSize[0], +event.target.value]);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFiles(Array.from(event.target.files));
  };

  useEffect(() => {
    if (files.length > 0) {
      handleUpload(files);
    }
  }, [files, handleUpload]);

  useEffect(() => {
    if (uploadInfo.isSuccess) {
      setFiles([]);
    }
  }, [uploadInfo.isSuccess]);

  useEffect(() => {
    setValueSizeRequest(valueSize);
  }, [valueSize]);

  return (
    <div className="px-12 py-8">
      <div className="flex flex-col gap-3 mb-10">
        <h1 className="text-neutral-700 text-3xl font-bold font-['Lato']">
          Documentation
        </h1>
        <div className="flex flex-row justify-between">
          <h3 className="text-neutral-700 opacity-70 text-lg font-normal font-['Lato']">
            Use the existing templates or create a new template
          </h3>
          <div className="flex gap-3">
            <div className="relative z-10">
              <button
                type="button"
                onClick={onClickFilterOpen}
                className="w-[172px] px-5 py-2.5 bg-white rounded-[100px] border border-solid border-neutral-200 justify-start items-center gap-[83px] inline-flex"
              >
                <p className="text-base font-['Lato']">Filter</p>
                <div
                  style={{ transform: isOpen ? 'rotate(180deg)' : '' }}
                  className="transform"
                >
                  <ArrowDownSVG />
                </div>
              </button>
              <div
                ref={constDropdownEl}
                style={{ display: isOpen ? 'flex' : 'none' }}
                className="absolute bg-white flex flex-col gap-6 right-0 py-6 px-5 rounded-[10px] border border-solid border-neutral-200"
              >
                <div className="flex flex-col gap-3">
                  <h3>Type</h3>
                  <SelectText
                    selectItem={typeFile}
                    onChangeSelect={e => setTypeFile(e.target.value)}
                    items={filesTypes}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <h3>Date</h3>
                  <div className="flex px-5 py-2.5 rounded-[100px] border border-solid border-neutral-200">
                    <DatePicker
                      selected={startDate}
                      onChange={date => date && setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                    />
                    <DatePicker
                      selected={endDate}
                      onChange={date => date && setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <h3>Size file kB</h3>
                  <div className="flex">
                    <Input
                      value={valueSize[0]}
                      onChange={handleChangeMin}
                      bordered
                      placeholder="From"
                      type="number"
                    />
                    <div className="flex justify-center items-center px-2"> - </div>
                    <Input
                      value={valueSize[1]}
                      onChange={handleChangeMax}
                      bordered
                      placeholder="To"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </div>
            <input
              type="file"
              id="files"
              accept="text/plain, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword, application/x-iwork-pages-sffpages, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.ms-powerpoint, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword, image/png, image/jpeg"
              multiple={false}
              onChange={handleFileChange}
              hidden
            />
            <label
              htmlFor="files"
              className="min-w-40 pb-2.5 pt-2.5 pr-[30px] pl-[30px] bg-teal-700 rounded-[100px] justify-center items-center gap-[15px] inline-flex"
            >
              <p className="text-white text-base font-semibold font-['Lato']">Upload</p>
            </label>
          </div>
        </div>
        <TableFiles
          sizes={valueSizeRequest}
          startCreationDate={startDate}
          endCreationDate={endDate}
          typeFile={typeFile}
        />
        {uploadInfo.isLoading && <LinearProgress />}
      </div>
    </div>
  );
};

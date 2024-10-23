import React, { ChangeEvent, useEffect, useState } from 'react';
import { BasicModal, ButtonGreenSmall, Input } from 'src/components';
import { SelectText } from 'src/components/RoundedSelect';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useDeleteClassMutation,
  useGenerateClassMutation,
  useGetClassesByIdQuery,
  useGetClassesListQuery,
} from 'src/api/classesApi';
import { ArrowLeftSVG, Trash } from 'src/assets/svg';
import { Paths } from 'src/enum';
import { CopySvg } from 'src/assets/svg/copySVG';
import { SettingsSvg } from 'src/assets/svg/SettingsSVG';
import { CreateClass } from 'src/components/Classes/CreateClass/CreateClass';
import { ClassTypeItem } from 'src/components/Classes/ClassTypeItem';
import Markdown from 'marked-react';
import { LinearProgress } from '@mui/material';
import { HistoryClass } from 'src/components/Classes/HistoryClass';
import Logo from '../../assets/png/comp.png';

const generations = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
];

export const Class = () => {
  const [isShowSettings, setIsShowSettings] = useState<boolean>(false);
  const [isShowHistory, setIsShowHistory] = useState<boolean>(false);
  const [generation, setGeneration] = useState(generations[0].value);
  const navigation = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data } = useGetClassesByIdQuery({ id: id || '' });

  const [handleGenerate, generateTools] = useGenerateClassMutation();
  const [handleDeleteClass, updateClassInfo] = useDeleteClassMutation();
  const { refetch } = useGetClassesListQuery({
    page: 1,
    size: 10,
    category: 'HR',
  });

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      valueInput1: data ? data.valueInput1 : '',
      valueInput2: data ? data.valueInput2 : '',
      valueInput3: data ? data.valueInput3 : '',
      valueInput4: data ? data.valueInput4 : '',
    },
    onSubmit: val => {
      for (const keyObj of Object.keys(val)) {
        if (!val[keyObj]) {
          delete val[keyObj];
        }
      }
      handleGenerate({ classId: data.id, ...val });
    },
  });

  const onClipHandle = async () => {
    await navigator.clipboard.writeText(data?.content || '');
  };

  const onChangeGenerationHandle = (e: ChangeEvent<HTMLSelectElement>) => {
    setGeneration(e.target.value);
  };

  const onCloseSettings = () => {
    setIsShowSettings(false);
  };

  useEffect(() => {
    if (data) {
      setFieldValue('valueInput1', data?.valueInput1);
      setFieldValue('valueInput2', data?.valueInput2);
      setFieldValue('valueInput3', data?.valueInput3);
      setFieldValue('valueInput4', data?.valueInput4);
    }
  }, [data, setFieldValue]);

  if (!data) {
    return <LinearProgress color="secondary" />;
  }

  return (
    <div className=" flex flex-1 ">
      <div className="flex flex-col min-h-[100%] max-w-80 rounded-br-[50px] rounded-tr-[50px]   py-8  shadow-xl">
        <div className="flex flex-col px-12 gap-3 mb-8">
          <h1 className="text-neutral-700 text-lg text-center font-bold font-['Lato']">
            {data && data.name}
          </h1>
          <p className="text-center text-neutral-700 opacity-70 text-lg font-normal font-['Lato']">
            {data && data.description}
          </p>
        </div>
        <div className="flex flex-col px-5 gap-5">
          <h2 className="text-left text-neutral-700 opacity-50 text-base font-normal font-['Lato']">
            INPUTS
          </h2>
          <div className="flex flex-col gap-3">
            <h3 className="text-neutral-700 opacity-80 text-base font-medium font-['Lato']">
              {data && data.input1}
            </h3>
            <Input
              value={values.valueInput1}
              name="valueInput1"
              onChange={handleChange}
              placeholder={data && data.placeholderInput1}
              type="text"
              bordered
            />
          </div>
          {data?.input2 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-neutral-700 opacity-80 text-base font-medium font-['Lato']">
                {data.input2}
              </h3>
              <Input
                value={values.valueInput2}
                name="valueInput2"
                onChange={handleChange}
                placeholder={data.placeholderInput2}
                type="text"
                bordered
              />
            </div>
          )}
          {data?.input3 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-neutral-700 opacity-80 text-base font-medium font-['Lato']">
                {data.input3}
              </h3>
              <Input
                value={values.valueInput3 ? values.valueInput3 : ''}
                name="valueInput3"
                onChange={handleChange}
                placeholder={data.placeholderInput3}
                type="text"
                bordered
              />
            </div>
          )}
          {data?.input4 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-neutral-700 opacity-80 text-base font-medium font-['Lato']">
                {data.input4}
              </h3>
              <Input
                value={values.valueInput4}
                name="valueInput4"
                onChange={handleChange}
                placeholder={data.placeholderInput4}
                type="text"
                bordered
              />
            </div>
          )}

          <div>
            <div className=" flex flex-col gap-3">
              <h3>Generation</h3>

              <div className="flex gap-3">
                <SelectText
                  selectItem={generation}
                  onChangeSelect={onChangeGenerationHandle}
                  items={generations}
                />
                <ButtonGreenSmall type="button" onClick={() => handleSubmit()}>
                  Generate
                </ButtonGreenSmall>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col px-12 gap-3 py-8 mb-8">
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => {
              navigation(Paths.CLASSES);
            }}
            className="flex align-middle items-center gap-5"
          >
            <ArrowLeftSVG />
            <p className="text-neutral-700 opacity-50 text-base font-medium font-['Lato']">
              Back to Home
            </p>
          </button>
          <div>
            <button
              style={{ marginRight: 15 }}
              type="button"
              onClick={() => setIsShowSettings(true)}
            >
              <SettingsSvg />
            </button>
            <button
              type="button"
              onClick={async () => {
                navigation(Paths.CLASSES);
                await handleDeleteClass({ id });
                refetch();
              }}
            >
              <Trash />
            </button>
          </div>
        </div>
        <div>
          <div className="flex py-10 justify-evenly">
            <ClassTypeItem
              title="Output"
              isActive={!isShowHistory}
              onPress={() => {
                setIsShowHistory(false);
              }}
            />
            <ClassTypeItem
              title="History"
              isActive={isShowHistory}
              onPress={() => {
                setIsShowHistory(true);
              }}
            />
          </div>
          {isShowHistory ? (
            <HistoryClass classId={data.id} />
          ) : (
            <div className="flex flex-col justify-center ">
              {data && data.content && !generateTools.isLoading ? (
                <div className="p-3 bg-green-50 rounded-tr-[10px] text-neutral-700 text-base font-normal font-['Lato'] rounded-bl-[10px] rounded-br-[10px] border justify-end items-end gap-2.5">
                  <Markdown value={data?.content} />
                  <div className="flex justify-end">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button type="button" onClick={onClipHandle}>
                      <CopySvg />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-1 py-20 flex-col items-center justify-center gap-3 ">
                  <div className="text-neutral-700 text-2xl font-bold font-['Lato']">
                    {generateTools.isLoading
                      ? 'Generating  content. Please wait...'
                      : 'Make it happen.'}
                  </div>
                  <img alt="computer" width={402} src={Logo} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <BasicModal isOpen={isShowSettings} onClose={onCloseSettings}>
        <CreateClass data={data} handleClose={onCloseSettings} />
      </BasicModal>
    </div>
  );
};

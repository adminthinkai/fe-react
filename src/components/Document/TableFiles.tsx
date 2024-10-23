import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDeleteDocMutation, useGetDocsQuery } from 'src/api/docApi';
import { LinearProgress } from '@mui/material';
import { useDebounce } from 'src/hooks/useDebounce';
import { ButtonGreenSmall, Input } from 'src/components';

type TableFilesProps = {
  sizes: number[];
  startCreationDate?: Date;
  endCreationDate?: Date;
  typeFile?: string;
};

type RenderItemProps = {
  name: string;
  type: string;
  create: string;
  size: number;
  id: string;
};

const RenderItemTable2Col: React.FC<RenderItemProps> = ({
  name,
  create,
  type,
  size,
  id,
}) => {
  const formatedDate = moment(create).format('LL').toString();
  const [handleDelete, infoDelete] = useDeleteDocMutation();

  const onDeleteFile = () => {
    handleDelete(id);
  };

  return (
    <>
      <td className="text-center px-3 py-2">{name}</td>
      <td className="text-center px-6 py-4 border-l border-solid border-zinc-100">
        {type}
      </td>
      <td className="text-center px-6 py-4 border-l border-solid border-zinc-100">
        {formatedDate}
      </td>
      <td className="text-center px-6 py-4 border-l border-solid border-zinc-100">
        {size}
      </td>
      <td className="text-center px-6 py-4 border-l border-solid border-zinc-100">
        {infoDelete.isLoading ? (
          <LinearProgress />
        ) : (
          <button type="button" onClick={onDeleteFile}>
            Delete
          </button>
        )}
      </td>
    </>
  );
};

export const TableFiles: React.FC<TableFilesProps> = ({
  startCreationDate,
  endCreationDate,
  typeFile,
  sizes,
}) => {
  const [page, setPage] = useState(1);
  const [searchName, setSearchName] = useState('');
  const debounceSearchValue = useDebounce(searchName, 300, () => {
    setPage(1);
  });

  const { data, isFetching, isSuccess } = useGetDocsQuery({
    page,
    endSize: sizes[1],
    startSize: sizes[0],
    startCreationDate,
    endCreationDate,
    keySearchValue: debounceSearchValue,
    types: [typeFile],
  });

  const onChangeSearchByName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    setPage(1);
  }, [debounceSearchValue, sizes, startCreationDate, endCreationDate]);

  return (
    data && (
      <div className="flex flex-1 flex-col gap-3 py-8">
        <Input
          style={{ width: 300 }}
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={onChangeSearchByName}
          bordered
        />
        <div className="flex justify-between items-center gap-3">
          <h1 className="text-neutral-700 text-lg font-semibold font-['Lato']">Files</h1>
        </div>
        <div>
          <div className="relative h-96 rounded-[10px] flex flex-1 overflow-x-auto overflow-y-auto">
            <table className="w-full text-left rounded-[10px] text-surface border border-solid border-zinc-100 dark:text-black">
              <thead className="text-neutral-700 bg-zinc-100 text-lg font-semibold font-['Lato'] px-6 py-4">
                <tr className="border-b border-solid border-zinc-100">
                  <th
                    scope="col"
                    className="text-center py-4 text-neutral-700 text-base font-semibold font-['Lato']"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="text-center py-4 text-neutral-700 text-base font-semibold font-['Lato']"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="text-center py-4 text-neutral-700 text-base font-semibold font-['Lato']"
                  >
                    Create
                  </th>
                  <th
                    scope="col"
                    className="text-center py-4 text-neutral-700 text-base font-semibold font-['Lato']"
                  >
                    Size
                  </th>
                  <th
                    scope="col"
                    className="text-center py-4 text-neutral-700 text-base font-semibold font-['Lato']"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="h-9">
                {data?.rows?.map(el => (
                  <tr
                    key={el.id}
                    className="bg-white text border-b border-solid border-zinc-100 text-neutral-700 text-base align-middle font-normal font-['Lato']"
                  >
                    <RenderItemTable2Col
                      key={el.id}
                      name={el.name}
                      type={el.mimetype}
                      create={el.creationDate}
                      size={el.size}
                      id={el.id}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {data && data.rows.length < data.count && (
          <div className="flex justify-center mt-4">
            <ButtonGreenSmall
              onClick={handleLoadMore}
              disabled={isFetching || data.count === data.rows.length}
            >
              {isFetching ? 'Loading...' : 'Load More'}
            </ButtonGreenSmall>
          </div>
        )}
      </div>
    )
  );
};

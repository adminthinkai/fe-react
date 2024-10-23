import React, { useEffect } from 'react';
import { ButtonGreenSmall, Input } from 'src/components';
import { ButtonBordered } from 'src/components/ButtonBorderedSmall';
import { useChangeBrandingMutation } from 'src/api/brandingApi';

type EditNamePropsType = {
  initName: string;
  handleCansel: () => void;
  id: string;
};

export const EditName: React.FC<EditNamePropsType> = ({ initName, handleCansel, id }) => {
  const [name, setName] = React.useState(initName);
  const [handleUpdate, { isSuccess, error }] = useChangeBrandingMutation();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onSaveChanges = () => {
    handleUpdate({ name, id });
  };
  const onClose = () => {
    handleCansel();
  };

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);

  return (
    <div className="min-w-[650px] flex flex-col gap-8">
      <div>
        <h1 className="text-neutral-700 text-2xl font-bold font-['Lato']">
          Edit Your name
        </h1>
        <h3 className="text-neutral-700 opacity-70 text-base font-normal font-['Lato']">
          This name is used throughout your application
        </h3>
      </div>
      <div className="flex flex-col gap-3 ">
        <h3 className="text-neutral-700 opacity-70 text-base font-normal font-['Lato']">
          Name
        </h3>
        <Input type="text" bordered value={name} onChange={onChange} />
      </div>
      {error && error.data && error.data.message && (
        <span className="text-white text-base font-normal font-['Lato']">
          {error.data.message}
        </span>
      )}
      <div className="flex gap-4 justify-end">
        <ButtonBordered onClick={onClose}>Cancel</ButtonBordered>
        <ButtonGreenSmall onClick={onSaveChanges}>Save changes</ButtonGreenSmall>
      </div>
    </div>
  );
};

import { useState } from 'react';

import { RequestCreateTicket } from '@acme/shared-models';

type CreateDialogProps = {
  submitCreate: (data: RequestCreateTicket) => void;
  onCloseDialog: () => void;
};

export function CreateDialog({
  onCloseDialog,
  submitCreate,
}: CreateDialogProps) {
  const [description, setDescription] = useState<string>('');

  const submit = () => {
    submitCreate({ description });
  };
  return (
    <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
      <div className="bg-white p-4 rounded-md text-center">
        <h1 className="text-xl mb-4 font-bold text-slate-500">
          Create new ticket
        </h1>
        <input
          id="search-input"
          className="block w-full px-4 py-2 mb-4 text-gray-800 border rounded-md  border-gray-300 focus:outline-none"
          type="text"
          autoFocus
          placeholder="Insert description"
          autoComplete="off"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={onCloseDialog}
          className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
        >
          Cancel
        </button>
        <button
          onClick={() => submit()}
          className="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default CreateDialog;

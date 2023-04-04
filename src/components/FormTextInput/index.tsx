import React, { useState } from "react";

interface IFormTextInputProps {
  onSubmit: (searchStr: string) => unknown;
}

const FormTextInput = (props: IFormTextInputProps) => {
  const { onSubmit } = props;

  const [searchStr, setSearchStr] = useState<string>("");

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(searchStr);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col gap-4 mt-4"
      data-testid="form-text-input"
    >
      <input
        type="search"
        name="users"
        id="users"
        className="bg-gray-300 text-slate-700 p-3 focus:outline-none placeholder:text-gray-500"
        placeholder="Enter username"
        value={searchStr}
        onChange={(e) => setSearchStr(e.target.value)}
        data-testid="search-input"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white font-bold p-3 disabled:bg-blue-500/50 disabled:cursor-not-allowed"
        disabled={!searchStr}
        data-testid="search-button"
      >
        Search
      </button>
    </form>
  );
};

export default FormTextInput;

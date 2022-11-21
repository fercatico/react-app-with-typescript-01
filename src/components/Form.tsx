import React, { useReducer, useState } from "react";
import { Sub } from "../types";

interface FormState {
  inputValues: Sub;
}

interface FormProps {
  onNewSub: (newSub: Sub) => void;
}

const INITIAL_STATE = {
  nick: "",
  subMonths: 0,
  avatar: "",
  description: "",
};

type FormReducerAction =
  | {
      type: "change_value";
      payload: {
        inputName: string;
        inputValue: string;
      };
    }
  | { type: "clear" };

const formReducer = (
  state: FormState["inputValues"],
  action: FormReducerAction
) => {
  switch (action.type) {
    case "change_value":
      const { inputName, inputValue } = action.payload;
      return {
        ...state,
        [inputName]: inputValue,
      };
    case "clear":
      return INITIAL_STATE;
  }
};

const Form = ({ onNewSub }: FormProps) => {
  const [inputValues, setInputValues] =
    useState<FormState["inputValues"]>(INITIAL_STATE);

  const [stateValues, dispatch] = useReducer(formReducer, INITIAL_STATE);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onNewSub(stateValues);
    dispatch({ type: "clear" });
  };

  const handleChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.target;
    dispatch({
      type: "change_value",
      payload: {
        inputName: name,
        inputValue: value,
      },
    });
  };

  const handleClear = () => {
    dispatch({ type: "clear" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValues.nick}
          onChange={handleChange}
          name="nick"
        />
        <input
          type="number"
          value={inputValues.subMonths}
          onChange={handleChange}
          name="subMonths"
        />
        <input
          type="text"
          value={inputValues.avatar}
          onChange={handleChange}
          name="avatar"
        />
        <textarea
          value={inputValues.description}
          onChange={handleChange}
          name="description"
        />
        <button onClick={handleClear} type="button">
          Clear the form!
        </button>
        <button>Save New Sub</button>
      </form>
    </div>
  );
};

export default Form;

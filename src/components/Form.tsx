import useNewSubForm from "../hooks/useNewSubForm";
import { Sub } from "../types";

interface FormProps {
  onNewSub: (newSub: Sub) => void;
}

const Form = ({ onNewSub }: FormProps) => {
  /*const [inputValues, setInputValues] =
    useState<FormState["inputValues"]>(INITIAL_STATE);*/

  const [stateValues, dispatch] = useNewSubForm();

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
          value={stateValues.nick}
          onChange={handleChange}
          name="nick"
        />
        <input
          type="number"
          value={stateValues.subMonths}
          onChange={handleChange}
          name="subMonths"
        />
        <input
          type="text"
          value={stateValues.avatar}
          onChange={handleChange}
          name="avatar"
        />
        <textarea
          value={stateValues.description}
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

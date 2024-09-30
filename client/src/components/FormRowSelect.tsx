interface FormRowSelectProps {
  labelText?: string;
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  list: string[];
}

const FormRowSelect: React.FC<FormRowSelectProps> = ({
  labelText,
  name,
  value,
  handleChange,
  list,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        className="form-select"
      >
        {list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormRowSelect;

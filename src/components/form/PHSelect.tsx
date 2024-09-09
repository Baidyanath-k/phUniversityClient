import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  placeholderItem: string;
  options: {
    value: string;
    label: string;
    disabled?: boolean;
  }[];
  defaultValue?: string;
  onChange?: (value: string) => void;
};

const PHSelect = ({
  label,
  name,
  placeholderItem,
  options,
  defaultValue,
  onChange,
}: TPHSelectProps) => {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            {...field}
            placeholder={placeholderItem}
            style={{ width: "100%", marginBottom: "10px" }}
            options={options}
            size="large"
            value={defaultValue || field.value}
            onChange={(value) => {
              field.onChange(value); // Trigger react-hook-form's onChange
              if (onChange) onChange(value); // Trigger additional onChange if provided
            }}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;

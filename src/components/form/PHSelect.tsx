import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  placeholderItem: string;
  options: {
    value: string;
    label: string;
  }[];
  disabled?: boolean;
  defaultValue?: string;
  onChange?: (value: string) => void;
  mode?: "multiple" | undefined;
};

const PHSelect = ({
  label,
  name,
  mode,
  placeholderItem,
  options,
  defaultValue,
  onChange,
  disabled,
}: TPHSelectProps) => {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            mode={mode}
            {...field}
            placeholder={placeholderItem}
            style={{ width: "100%", marginBottom: "10px" }}
            options={options}
            size="large"
            disabled={disabled}
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

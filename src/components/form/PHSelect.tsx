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
};

const PHSelect = ({
  label,
  name,
  placeholderItem,
  options,
}: TPHSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Form.Item label={label}>
          <Select
            {...field}
            placeholder={placeholderItem}
            style={{ width: "100%", marginBottom: "10px" }}
            options={options}
            size="large"
          />
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;

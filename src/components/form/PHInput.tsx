import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  defaultValue?: string;
  placeholderItem?: string;
};

const PHInput = ({
  type,
  name,
  label,
  defaultValue,
  placeholderItem,
}: TInputProps) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <Controller
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              type={type}
              id={name}
              placeholder={placeholderItem}
              value={field.value || defaultValue}
              size="large"
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHInput;

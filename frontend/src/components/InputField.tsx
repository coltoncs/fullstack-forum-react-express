import { ComponentWithAs, FormControl, FormErrorMessage, FormLabel, Input, InputProps, Textarea, TextareaProps } from "@chakra-ui/react";
import { useField } from "formik";
import { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & { 
  label: string;
  name: string; 
  textarea?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({label, textarea, size: _, ...props}) => {
  let Control: ComponentWithAs<"input" | "textarea"> = Input
  if (textarea) {
    Control = Textarea
  }
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={!!meta.error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Control {...field} {...props} />
      {meta.error ? <FormErrorMessage>{meta.error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default InputField;
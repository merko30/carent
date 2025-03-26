import { useFormStatus } from "react-dom";

import Button from "./Button";

const SubmitButton = ({
  label,
  loadingLabel,
}: {
  label: string;
  loadingLabel: string;
}) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? loadingLabel : label}
    </Button>
  );
};

export default SubmitButton;

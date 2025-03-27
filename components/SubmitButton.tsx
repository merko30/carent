import { useFormStatus } from "react-dom";

import Button from "./Button";

const SubmitButton = ({
  label,
  loadingLabel,
  className,
}: {
  label: string;
  loadingLabel: string;
  className?: string;
}) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className={className}>
      {pending ? loadingLabel : label}
    </Button>
  );
};

export default SubmitButton;

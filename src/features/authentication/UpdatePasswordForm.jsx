import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUpdateUser } from "./useUpdateUser";
import { useUser } from "./useUser";

function UpdatePasswordForm() {
  const { updateUser, isUpdating } = useUpdateUser();
  const { user } = useUser();
  const { register, getValues, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  function onSubmit({ password }) {
    if (user?.email === "darshan@example.com") {
      toast.error("The demo user’s password can’t be changed.");
      return;
    }
    updateUser({ password }, { onSuccess: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="New Password (min 8 chars)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          autoComplete="new-password"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <Button
          disabled={isUpdating}
          onClick={reset}
          type="reset"
          variation="secondary"
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;

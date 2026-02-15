import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

function CreateCabinForm({ cabin = {}, onCloseModal }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isUpdating, updateCabin } = useUpdateCabin();
  const isCreatingOrUpdating = isCreating || isUpdating;
  const { id: cabinId, ...editValues } = cabin;
  const isEditForm = Boolean(cabinId);

  const { register, getValues, handleSubmit, reset, formState } = useForm({
    defaultValues: editValues,
    disabled: isCreatingOrUpdating,
  });
  const { errors } = formState;

  function onSubmit(data) {
    if (isEditForm) {
      updateCabin(
        {
          id: cabinId,
          cabin: {
            ...data,
            image: data.image[0] instanceof File ? data.image[0] : data.image,
          },
        },
        {
          onSuccess: (data) => {
            reset(data);
            onCloseModal?.();
          },
        },
      );
      return;
    }
    createCabin(
      { ...data, image: data.image[0] },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      },
    );
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </FormRow>
      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) => {
              if (Number(value) < 0) return "Discount should be positive";
              if (Number(value) > Number(getValues().regularPrice))
                return "Discount should be less than regular price";
              return true;
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditForm ? false : "This field is required",
          })}
        />
      </FormRow>
      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          disabled={isCreatingOrUpdating}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button disabled={isCreatingOrUpdating}>
          {isEditForm ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

Form.defaultProps = {
  type: "regular",
};

export default CreateCabinForm;

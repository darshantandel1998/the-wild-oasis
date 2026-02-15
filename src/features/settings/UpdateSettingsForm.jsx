import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();

  function handleOnBlur(e) {
    const { name, value, defaultValue } = e.target;
    if (defaultValue !== value) updateSetting({ [name]: value });
  }

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          name="minBookingLength"
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={handleOnBlur}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          name="maxBookingLength"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={handleOnBlur}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          name="maxGuestsPerBooking"
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={handleOnBlur}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          name="breakfastPrice"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={handleOnBlur}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;

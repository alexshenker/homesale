import { Controller, ControllerProps } from "react-hook-form";
import Switch, { Props as SwitchProps } from "../Switch";

type Props = Omit<ControllerProps, "render"> & OmitMod<SwitchProps, "checked">;

const FormSwitch = ({ label, ...controllerProps }: Props): JSX.Element => {
  return (
    <Controller
      {...controllerProps}
      render={({ field, fieldState: _fieldState }) => {
        return (
          <Switch
            {...field}
            ref={undefined}
            checked={field.value}
            label={label}
          />
        );
      }}
    />
  );
};

export default FormSwitch;

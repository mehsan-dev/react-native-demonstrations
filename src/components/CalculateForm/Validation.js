import * as Yup from "yup";

exports.CalculateFormValidation = Yup.object().shape({
  number1: Yup.number("Number1 must be valid number").required(),
  number2: Yup.number("Number2 must be valid number").required(),
  operation: Yup.string().required(),
});

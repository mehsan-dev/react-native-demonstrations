import { useFormik } from "formik";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Input } from "react-native-elements";
import SelectDropdown from "react-native-select-dropdown";
import { OPERATIONS } from "../../constants/Constants";
import calculatorService from "../../services/calculatorService";
import { CalculateFormValidation } from "./Validation";

const CalculateForm = () => {
  const [apiError, setApiError] = useState("");
  const [result, setResult] = useState("");

  const { handleChange, handleSubmit, setFieldValue, values, errors } =
    useFormik({
      initialValues: {
        number1: "",
        number2: "",
        operation: "",
      },

      onSubmit: (values) => evaluate(values),
      validationSchema: CalculateFormValidation,
    });

  const evaluate = async (values) => {
    const { number1, number2, operation } = values;

    const { hasError, error, data } = await calculatorService.calculate({
      number1,
      number2,
      operation,
    });

    if (hasError) {
      setApiError(error.message);
    } else {
      setResult(data);
    }
  };

  return (
    <>
      <Input
        label="Number 1 *"
        placeholder="Enter a number"
        keyboardType="numeric"
        errorStyle={{ color: "red" }}
        errorMessage={errors.number1}
        value={values.number1}
        onChangeText={handleChange("number1")}
      />

      <Input
        label="Number 2 *"
        placeholder="Enter a number"
        keyboardType="numeric"
        errorStyle={{ color: "red" }}
        errorMessage={errors.number2}
        value={values.number2}
        onChangeText={handleChange("number2")}
      />
      <View>
        <Text>Operation *</Text>
        <SelectDropdown
          data={OPERATIONS}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            setFieldValue("operation", selectedItem);
          }}
          buttonStyle={{ width: "100%" }}
        />
      </View>
      <Text>{apiError}</Text>
      <View style={{ width: "100%" }}>
        {result !== "" && (
          <Text style={styles.resultText}>Result: {result || "N/A"}</Text>
        )}
      </View>
      <Button
        containerStyle={styles.calculateButton}
        title="Calculate"
        onPress={handleSubmit}
      />
    </>
  );
};

export default CalculateForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  calculateButton: { width: "100%", marginTop: 40 },
  resultText: { fontSize: 30 },
});

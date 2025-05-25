"use client";

import Input from "@/app/_components/UI/Input";
import { useState } from "react";

export default function InputTestPage() {
  const [textValue, setTextValue] = useState("");
  const [numberValue, setNumberValue] = useState<number | undefined>(undefined);
  const [textareaValue, setTextareaValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [checkboxValue, setCheckboxValue] = useState(false);

  // Error states for testing
  const [hasError, setHasError] = useState(false);

  const handleTestError = () => {
    setHasError(!hasError);
  };

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  return (
    <div className="container mx-auto py-12">
      <h1 className="mb-8 text-3xl font-bold">Input Component Test Page</h1>

      <div className="mb-4 flex space-x-2">
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white"
          onClick={handleTestError}
        >
          {hasError ? "Clear Errors" : "Show Errors"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Text Input */}
        <div className="space-y-1">
          <h2 className="mb-4 text-xl font-semibold">Standard Text Input</h2>
          <Input
            id="text-input"
            label="Text Input"
            type="text"
            placeholder="Enter some text"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            error={hasError}
            errorMessage={hasError ? "This is an error message" : undefined}
            required
          />
        </div>

        {/* Number Input */}
        <div className="space-y-1">
          <h2 className="mb-4 text-xl font-semibold">Number Input</h2>
          <Input
            id="number-input"
            label="Number Input"
            type="number"
            min={0}
            max={100}
            step={1}
            placeholder="Enter a number"
            value={numberValue}
            onChange={(e) =>
              setNumberValue(
                e.target.value === "" ? undefined : Number(e.target.value),
              )
            }
            error={hasError}
            errorMessage={hasError ? "This is an error message" : undefined}
            assistiveText="Enter a number between 0 and 100"
            required
          />
        </div>

        {/* Textarea */}
        <div className="space-y-1">
          <h2 className="mb-4 text-xl font-semibold">Textarea</h2>
          <Input
            id="textarea-input"
            label="Textarea"
            type="textarea"
            placeholder="Enter a longer text"
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            error={hasError}
            errorMessage={hasError ? "This is an error message" : undefined}
          />
        </div>

        {/* Select */}
        <div className="space-y-1">
          <h2 className="mb-4 text-xl font-semibold">Select Input</h2>
          <Input
            id="select-input"
            label="Select Input"
            type="select"
            options={options}
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
            error={hasError}
            errorMessage={hasError ? "This is an error message" : undefined}
            optionPlaceholder="Select an option"
          />
        </div>

        {/* Checkbox */}
        <div className="space-y-1">
          <h2 className="mb-4 text-xl font-semibold">Checkbox</h2>
          <Input
            id="checkbox-input"
            label="Checkbox Input"
            type="checkbox"
            checked={checkboxValue}
            onChange={(e) => setCheckboxValue(e.target.checked)}
            error={hasError}
            errorMessage={hasError ? "This is an error message" : undefined}
            required
          />
        </div>

        {/* Disabled Input */}
        <div className="space-y-1">
          <h2 className="mb-4 text-xl font-semibold">Disabled Input</h2>
          <Input
            id="disabled-input"
            label="Disabled Input"
            type="text"
            disabled
            defaultValue="This input is disabled"
          />
        </div>

        {/* Input Sizes */}
        <div className="space-y-1">
          <h2 className="mb-4 text-xl font-semibold">Input Sizes</h2>
          <div className="space-y-4">
            <Input
              id="small-input"
              label="Small Input"
              type="text"
              size="small"
              placeholder="Small input"
            />
            <Input
              id="medium-input"
              label="Medium Input"
              type="text"
              size="medium"
              placeholder="Medium input"
            />
            <Input
              id="large-input"
              label="Large Input"
              type="text"
              size="large"
              placeholder="Large input"
            />
          </div>
        </div>

        {/* Different Background Colors */}
        <div className="space-y-1">
          <h2 className="mb-4 text-xl font-semibold">
            Input Background Colors
          </h2>
          <div className="space-y-4">
            <Input
              id="white-bg-input"
              label="White Background"
              type="text"
              bgColor="white"
              placeholder="White background"
            />
            <Input
              id="gray-bg-input"
              label="Gray Background"
              type="text"
              bgColor="gray"
              placeholder="Gray background"
            />
            <Input
              id="transparent-bg-input"
              label="Transparent Background"
              type="text"
              bgColor="transparent"
              placeholder="Transparent background"
            />
          </div>
        </div>

        {/* Success State */}
        <div className="space-y-1">
          <h2 className="mb-4 text-xl font-semibold">Success State Input</h2>
          <Input
            id="success-input"
            label="Success Input"
            type="text"
            variant="success"
            defaultValue="This is valid input"
          />
        </div>
      </div>
    </div>
  );
}

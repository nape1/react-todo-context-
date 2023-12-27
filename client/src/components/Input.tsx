import React from 'react';

interface InputComponentProps {
  onInputChange?: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement>,
}

// extended the InputComponenProps with React.InputHTMLAttributes<HTMLInputElement> to include the ...props in input/HTML element
const InputComponent: React.FC<InputComponentProps & React.InputHTMLAttributes<HTMLInputElement>> = ({onInputChange, inputRef, ...props }) => {

  const handleInputChange = () => {
    if (inputRef.current) {
        const inputValue: string = inputRef.current.value
        onInputChange?.(inputValue);
    }
  };

  return (
    <input
      type="text"
      ref={inputRef}
      onChange={handleInputChange}
      placeholder="Type something..."
      {...props}
    />
  );
};

export default InputComponent

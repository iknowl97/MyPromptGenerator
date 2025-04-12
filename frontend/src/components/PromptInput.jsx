import React, { useState } from 'react';
import { Textarea } from 'hero-ui';

export default function PromptInput() {
  const [prompt, setPrompt] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const value = e.target.value;
    setPrompt(value);
    setIsValid(value.length > 10);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Textarea
        value={prompt}
        onChange={handleChange}
        placeholder="Например: 'Хочу создать React-приложение с Hero UI'"
        className={`w-full p-4 rounded-lg shadow-sm transition-all duration-200 ${
          !isValid ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
        }`}
      />
      {!isValid && (
        <p className="mt-2 text-sm text-red-500">Промпт должен содержать не менее 10 символов</p>
      )}
    </div>
  );
}
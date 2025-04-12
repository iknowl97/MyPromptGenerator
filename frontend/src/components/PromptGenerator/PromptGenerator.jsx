import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiEdit, FiInfo, FiCopy, FiExternalLink, FiCode } from 'react-icons/fi';
import PromptRecommendationBlock from './PromptRecommendationBlock';
import AIAssistantTips from './AIAssistantTips';

const PromptGenerator = () => {
  // Состояния для хранения данных формы
  const [userInput, setUserInput] = useState('');
  const [processedPrompt, setProcessedPrompt] = useState('');
  const [finalPrompt, setFinalPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGeneratingFinal, setIsGeneratingFinal] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [activeTip, setActiveTip] = useState(null);

  // Валидация ввода
  const [inputError, setInputError] = useState('');
  
  // Обработка отправки начального запроса
  const handleInitialSubmit = (e) => {
    e.preventDefault();
    
    // Валидация
    if (userInput.trim().length < 5) {
      setInputError('Пожалуйста, введите более подробное описание задачи (минимум 5 символов)');
      return;
    }
    
    setInputError('');
    setIsProcessing(true);
    
    // Имитация обработки AI (в реальном приложении здесь будет API-запрос)
    setTimeout(() => {
      // Простая обработка первого уровня
      const processed = `Создать ${userInput.toLowerCase()}\n\nДополнительные детали:\n- Современный дизайн\n- Удобный пользовательский интерфейс\n- Оптимизация производительности`;
      
      setProcessedPrompt(processed);
      setIsProcessing(false);
    }, 1500);
  };
  
  // Обработка генерации финального промпта
  const handleGenerateFinalPrompt = () => {
    setIsGeneratingFinal(true);
    
    // Имитация генерации финального промпта (в реальном приложении здесь будет API-запрос)
    setTimeout(() => {
      const finalPromptText = `# Задача: ${processedPrompt.split('\n')[0]}\n\n## Детальное описание\n${processedPrompt.split('\n\n')[1] || ''}\n\n## Технические требования\n- Использовать современные технологии и фреймворки\n- Следовать лучшим практикам разработки\n- Обеспечить кроссбраузерную совместимость\n- Реализовать адаптивный дизайн\n\n## Структура проекта\n- Компонентная архитектура\n- Модульная организация кода\n- Четкое разделение бизнес-логики и представления\n\n## Дополнительные рекомендации\n- Использовать TypeScript для типизации\n- Настроить линтеры и форматтеры кода\n- Добавить автоматические тесты\n- Настроить CI/CD для непрерывной интеграции\n\n## Ожидаемый результат\nПолностью функциональное приложение, соответствующее всем требованиям, с чистым, поддерживаемым кодом и документацией.`;
      
      setFinalPrompt(finalPromptText);
      setIsGeneratingFinal(false);
      setShowRecommendations(true);
    }, 2000);
  };
  
  // Копирование промпта в буфер обмена
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Здесь можно добавить уведомление о копировании
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Генератор AI-промптов</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Создавайте профессиональные промпты для любых AI-моделей
        </p>
      </motion.div>
      
      {/* Секция 1: Начальный ввод */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-10"
      >
        <div className="hero-card p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FiEdit className="mr-2" /> Опишите вашу задачу
          </h2>
          <form onSubmit={handleInitialSubmit}>
            <div className="mb-4">
              <textarea
                className={`hero-textarea ${inputError ? 'border-red-500' : ''}`}
                placeholder="Опишите, что вы хотите создать (например, 'Хочу создать React-приложение с Hero UI')"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                rows={4}
              />
              {inputError && (
                <p className="text-red-500 text-sm mt-1">{inputError}</p>
              )}
            </div>
            <button 
              type="submit" 
              className="hero-button-primary flex items-center justify-center w-full sm:w-auto"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Обработка...
                </>
              ) : (
                <>
                  <FiSend className="mr-2" /> Обработать
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
      
      {/* Секция 2: Обработанный промпт */}
      {processedPrompt && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="hero-card p-6 relative">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <FiEdit className="mr-2" /> Отредактируйте промпт
            </h2>
            <div className="absolute top-6 right-6 flex space-x-2">
              <button 
                onClick={() => copyToClipboard(processedPrompt)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                title="Копировать в буфер обмена"
              >
                <FiCopy />
              </button>
            </div>
            <div className="mb-4 relative">
              <textarea
                className="hero-textarea"
                value={processedPrompt}
                onChange={(e) => setProcessedPrompt(e.target.value)}
                rows={6}
              />
              <AIAssistantTips 
                activeTip={activeTip}
                setActiveTip={setActiveTip}
              />
            </div>
            <button 
              onClick={handleGenerateFinalPrompt} 
              className="hero-button-primary flex items-center justify-center w-full sm:w-auto"
              disabled={isGeneratingFinal}
            >
              {isGeneratingFinal ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Генерация...
                </>
              ) : (
                <>
                  <FiCode className="mr-2" /> Создать финальный промпт
                </>
              )}
            </button>
          </div>
        </motion.div>
      )}
      
      {/* Секция 3: Финальный промпт */}
      {finalPrompt && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="hero-card p-6 relative">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <FiCode className="mr-2" /> Финальный промпт
            </h2>
            <div className="absolute top-6 right-6 flex space-x-2">
              <button 
                onClick={() => copyToClipboard(finalPrompt)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                title="Копировать в буфер обмена"
              >
                <FiCopy />
              </button>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4 whitespace-pre-wrap font-mono text-sm overflow-auto max-h-96">
              {finalPrompt}
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Секция 4: Рекомендации моделей */}
      {showRecommendations && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PromptRecommendationBlock finalPrompt={finalPrompt} />
        </motion.div>
      )}
    </div>
  );
};

export default PromptGenerator;
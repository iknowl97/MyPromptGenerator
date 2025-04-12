import React from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiCode, FiPlay, FiCheckCircle, FiAlertCircle, FiDollarSign } from 'react-icons/fi';

// Типы статусов моделей
const STATUS_TYPES = {
  FREE: 'free',
  CONDITIONAL: 'conditional',
  PAID: 'paid'
};

// Конфигурация бейджей статуса
const statusBadge = {
  [STATUS_TYPES.FREE]: {
    label: "Бесплатно",
    icon: <FiCheckCircle className="h-4 w-4 text-green-600" />,
    color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  [STATUS_TYPES.CONDITIONAL]: {
    label: "Условно бесплатно",
    icon: <FiAlertCircle className="h-4 w-4 text-yellow-600" />,
    color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  [STATUS_TYPES.PAID]: {
    label: "Платно",
    icon: <FiDollarSign className="h-4 w-4 text-red-600" />,
    color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
};

// Рекомендуемые модели
const recommendations = [
  {
    modelId: "deepseek/deepseek-chat-v3-0324",
    name: "DeepSeek Chat V3",
    provider: "OpenRouter",
    status: STATUS_TYPES.FREE,
    description: "Оптимален для логики, генерации кода и текстов.",
    links: {
      chat: "https://chat.openrouter.ai",
      api: "https://openrouter.ai/docs",
      test: "#",
    },
  },
  {
    modelId: "google/gemini-2.5-pro-exp-03-25",
    name: "Gemini 2.5 Pro",
    provider: "OpenRouter",
    status: STATUS_TYPES.FREE,
    description: "Сильная аналитика, большие лимиты токенов.",
    links: {
      chat: "https://chat.openrouter.ai",
      api: "https://openrouter.ai/docs",
      test: "#",
    },
  },
  {
    modelId: "featherless/qwerky-72b",
    name: "Qwerky 72B",
    provider: "OpenRouter",
    status: STATUS_TYPES.FREE,
    description: "Универсальная модель с хорошей генерацией идей.",
    links: {
      chat: "https://chat.openrouter.ai",
      api: "https://openrouter.ai/docs",
      test: "#",
    },
  },
];

const PromptRecommendationBlock = ({ finalPrompt }) => {
  // Функция для тестирования промпта с выбранной моделью
  const testPrompt = (modelId) => {
    // В реальном приложении здесь будет логика для тестирования промпта
    console.log(`Тестирование промпта с моделью ${modelId}`);
    console.log(finalPrompt);
  };

  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-2xl font-bold">Лучшие модели и сервисы для запуска промпта</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {recommendations.map((rec, i) => {
          const badge = statusBadge[rec.status];
          return (
            <motion.div
              key={rec.modelId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="hero-card p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">{rec.name}</h3>
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.color}`}>
                    <span className="flex items-center">
                      {badge.icon}
                      <span className="ml-1">{badge.label}</span>
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{rec.description}</p>
                <div className="mt-auto space-y-2">
                  <button 
                    className="hero-button-primary w-full flex items-center justify-center" 
                    onClick={() => window.open(rec.links.chat, '_blank')}
                  >
                    <FiExternalLink className="mr-2" /> Перейти в чат
                  </button>
                  <button 
                    className="hero-button-secondary w-full flex items-center justify-center" 
                    onClick={() => window.open(rec.links.api, '_blank')}
                  >
                    <FiCode className="mr-2" /> Документация API
                  </button>
                  <button 
                    className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center" 
                    onClick={() => testPrompt(rec.modelId)}
                  >
                    <FiPlay className="mr-2" /> Протестировать промпт
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PromptRecommendationBlock;
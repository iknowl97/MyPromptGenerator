import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiInfo, FiX } from 'react-icons/fi';

// Массив подсказок для улучшения промпта
const tips = [
  {
    id: 'specificity',
    icon: <FiInfo />,
    title: 'Будьте конкретнее',
    content: 'Добавьте больше деталей о вашей задаче. Чем конкретнее запрос, тем точнее будет результат.',
    position: { top: '20%', right: '-20px' }
  },
  {
    id: 'structure',
    icon: <FiInfo />,
    title: 'Структурируйте запрос',
    content: 'Разделите запрос на логические части: цель, контекст, ограничения, ожидаемый результат.',
    position: { top: '40%', right: '-20px' }
  },
  {
    id: 'examples',
    icon: <FiInfo />,
    title: 'Приведите примеры',
    content: 'Добавьте примеры желаемого результата, чтобы AI лучше понял ваши ожидания.',
    position: { top: '60%', right: '-20px' }
  }
];

const AIAssistantTips = ({ activeTip, setActiveTip }) => {
  return (
    <div className="relative">
      {/* Иконки подсказок */}
      <div className="absolute right-0 top-0 h-full flex flex-col justify-around pr-2">
        {tips.map((tip) => (
          <motion.button
            key={tip.id}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${activeTip === tip.id ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTip(activeTip === tip.id ? null : tip.id)}
            title={tip.title}
          >
            {tip.icon}
          </motion.button>
        ))}
      </div>

      {/* Всплывающие подсказки */}
      <AnimatePresence>
        {activeTip && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-xs"
            style={tips.find(t => t.id === activeTip)?.position}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-primary-600 dark:text-primary-400">
                {tips.find(t => t.id === activeTip)?.title}
              </h3>
              <button 
                onClick={() => setActiveTip(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <FiX />
              </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {tips.find(t => t.id === activeTip)?.content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIAssistantTips;
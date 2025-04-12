import React from 'react';
import { Card, Button, Badge } from 'hero-ui';

export default function PromptRecommendationBlock() {
  const models = [
    {
      name: 'Claude 3 Haiku',
      description: 'Быстрая и эффективная модель для повседневных задач',
      status: 'Бесплатно',
      links: {
        chat: 'https://claude.ai',
        docs: 'https://docs.anthropic.com',
        test: 'https://openrouter.ai/playground'
      }
    },
    {
      name: 'Gemini 1.5 Free',
      description: 'Мощная мультимодальная модель от Google',
      status: 'Бесплатно',
      links: {
        chat: 'https://gemini.google.com',
        docs: 'https://ai.google.dev',
        test: 'https://openrouter.ai/playground'
      }
    },
    {
      name: 'GPT-3.5-Turbo',
      description: 'Популярная модель для широкого спектра задач',
      status: 'Бесплатно',
      links: {
        chat: 'https://chat.openai.com',
        docs: 'https://platform.openai.com/docs',
        test: 'https://openrouter.ai/playground'
      }
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      {models.map((model, index) => (
        <Card key={index} className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold mb-2">{model.name}</h3>
          <Badge variant={model.status === 'Бесплатно' ? 'success' : 'warning'} className="mb-4">
            {model.status}
          </Badge>
          <p className="text-gray-600 mb-4">{model.description}</p>
          <div className="flex flex-col space-y-2">
            <Button variant="outline" onClick={() => window.open(model.links.chat, '_blank')}>
              Перейти в чат
            </Button>
            <Button variant="outline" onClick={() => window.open(model.links.docs, '_blank')}>
              Документация API
            </Button>
            <Button variant="outline" onClick={() => window.open(model.links.test, '_blank')}>
              Протестировать промпт
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
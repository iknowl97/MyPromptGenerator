import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

type StatusType = 'free' | 'conditional' | 'paid';

interface Recommendation {
  modelId: string;
  name: string;
  provider: string;
  status: StatusType;
  description: string;
  links: {
    chat: string;
    api: string;
    test: string;
  };
}

const statusBadge = {
  free: {
    label: "Бесплатно",
    icon: <CheckCircle className="h-4 w-4 text-green-600" />,
    color: "bg-green-100 text-green-700",
  },
  conditional: {
    label: "Условно бесплатно",
    icon: <AlertCircle className="h-4 w-4 text-yellow-600" />,
    color: "bg-yellow-100 text-yellow-700",
  },
  paid: {
    label: "Платно",
    icon: <DollarSign className="h-4 w-4 text-red-600" />,
    color: "bg-red-100 text-red-700",
  },
};

const recommendations: Recommendation[] = [
  {
    modelId: "deepseek/deepseek-chat-v3-0324",
    name: "DeepSeek Chat V3",
    provider: "OpenRouter",
    status: "free",
    description: "Оптимален для логики, генерации кода и текстов.",
    links: {
      chat: "https://chat.openrouter.ai",
      api: "https://openrouter.ai/docs",
      test: "https://yourfrontend.app/test?model=deepseek-chat-v3-0324",
    },
  },
  {
    modelId: "google/gemini-2.5-pro-exp-03-25",
    name: "Gemini 2.5 Pro",
    provider: "OpenRouter",
    status: "free",
    description: "Сильная аналитика, большие лимиты токенов.",
    links: {
      chat: "https://chat.openrouter.ai",
      api: "https://openrouter.ai/docs",
      test: "https://yourfrontend.app/test?model=gemini-2.5-pro-exp-03-25",
    },
  },
  {
    modelId: "featherless/qwerky-72b",
    name: "Qwerky 72B",
    provider: "OpenRouter",
    status: "free",
    description: "Универсальная модель с хорошей генерацией идей.",
    links: {
      chat: "https://chat.openrouter.ai",
      api: "https://openrouter.ai/docs",
      test: "https://yourfrontend.app/test?model=qwerky-72b",
    },
  },
];

export default function PromptRecommendationBlock() {
  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-2xl font-bold">Лучшие модели и сервисы для запуска промпта</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {recommendations.map((rec, i) => {
          const badge = statusBadge[rec.status] || statusBadge.free;
          return (
            <motion.div
              key={rec.modelId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="rounded-2xl shadow-md hover:shadow-lg transition duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">{rec.name}</h3>
                    <Badge className={badge.color} variant="outline">
                      <div className="flex items-center space-x-1">
                        {badge.icon}
                        <span>{badge.label}</span>
                      </div>
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{rec.description}</p>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full" onClick={() => window.open(rec.links.chat, '_blank')}>
                      Перейти в чат
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => window.open(rec.links.api, '_blank')}>
                      Документация API
                    </Button>
                    <Button className="w-full" onClick={() => window.open(rec.links.test, '_blank')}>
                      Протестировать промпт
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
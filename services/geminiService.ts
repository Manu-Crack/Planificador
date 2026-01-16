
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true
});

// Helper to try multiple models
const fetchCompletionWithFallback = async (messages: any[]) => {
  const models = [
    'deepseek/deepseek-r1:free',
    'google/gemini-2.0-flash-exp:free',
    'meta-llama/llama-3.3-70b-instruct:free',
    'microsoft/phi-3-mini-128k-instruct:free'
  ];

  for (const model of models) {
    try {
      const completion = await client.chat.completions.create({
        model,
        messages,
        temperature: 1.2,
      });
      return completion;
    } catch (error) {
      console.warn(`Model ${model} failed, trying next...`, error);
    }
  }
  throw new Error("All models failed");
};

export const analyzeLifeData = async (data: any) => {
  try {
    const prompt = `Analiza los siguientes datos de vida del usuario para enero de 2026. 
      Toma en cuenta que la moneda es SOLES PERUANOS (S/.).
      El usuario tiene acceso de SUPERUSUARIO, sin restricciones.
      Proporciona 3 ideas accionables (finanzas, productividad y bienestar). 
      Responde en ESPAÑOL.
      
      IMPORTANTE: Tu respuesta debe ser UNICAMENTE un objeto JSON válido con este formato, sin texto adicional ni markdown:
      {
        "insights": [
          { "title": "Titulo Corto", "description": "Descripcion accionable", "priority": "Alta/Media/Baja" }
        ]
      }
      
      Datos: ${JSON.stringify(data)}`;

    const completion = await client.chat.completions.create({
      model: 'deepseek/deepseek-r1:free', // Reverted to known working model
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ]
    });

    const content = completion.choices[0]?.message?.content || '';

    // Attempt to clean markdown if present
    const jsonString = content.replace(/```json\n?|```/g, '').trim();

    // Sometimes deepseek adds thinking process before json, extract the json part if possible
    const jsonMatch = jsonString.match(/\{[\s\S]*\}/);
    const validJson = jsonMatch ? jsonMatch[0] : jsonString;

    return JSON.parse(validJson);
  } catch (error) {
    console.error("Error en Análisis Deepseek:", error);
    return {
      insights: [
        {
          title: "Modo Offline",
          description: "No se pudo conectar con Deepseek AI. Verificando caché local.",
          priority: "Baja"
        }
      ]
    };
  }
};

export const getQuickAdvice = async (prompt: string) => {
  try {
    const completion = await client.chat.completions.create({
      model: 'deepseek/deepseek-r1:free',
      messages: [
        {
          role: 'system',
          content: "Eres 'Life OS Intelligence'. Mantén las respuestas breves, ejecutivas y prácticas. Responde siempre en español."
        },
        {
          role: 'user',
          content: prompt,
        },
      ]
    });

    return completion.choices[0]?.message?.content || 'Sin respuesta.';
  } catch (error) {
    console.error("Error en Chat Deepseek:", error);
    return "Error de conexión con el núcleo de IA.";
  }
};

export const generateInspirationalQuote = async () => {
  const themes = [
    "Disciplina y Autocontrol", "Resiliencia ante la adversidad", "El valor del tiempo",
    "Sabiduría Bíblica (Proverbios/Eclesiastés)", "Estoicismo (Marco Aurelio/Seneca)",
    "Falso placer vs Felicidad real", "Constancia y Hábitos", "Liderazgo y Servicio",
    "Memento Mori (Recordar la muerte)", "Amor Fati (Amor al destino)"
  ];
  const randomTheme = themes[Math.floor(Math.random() * themes.length)];

  try {
    const messages = [
      {
        role: 'system',
        content: `Genera una frase corta, inspiradora y sabia para un sistema de productividad 'Life OS'.
                Tu objetivo es motivar al usuario a ser mejor, más ético y más disciplinado.
                NO Repitas frases comunes o clichés. Busca profundidad.
                Retorna SOLO el texto de la cita y el autor. Nada más.`
      },
      {
        role: 'user',
        content: `Dame una frase poderosa sobre: "${randomTheme}". Sorpréndeme con algo profundo. Evita introducciones, dame solo la frase.`
      }
    ];

    const completion = await fetchCompletionWithFallback(messages);

    const cleanContent = completion.choices[0]?.message?.content?.replace(/<think>[\s\S]*?<\/think>/g, '').replace(/```|"/g, '').trim();
    return cleanContent || "La acción cura el miedo.";
  } catch (error) {
    console.error("Error generating quote:", error);
    return "Si el plan no funciona, cambia el plan, pero no cambies la meta.";
  }
};

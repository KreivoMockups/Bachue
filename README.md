# 🌿 Bachué: Inteligencia Artificial Socrática para Triage Clínico Regional

![Status](https://img.shields.io/badge/Estado-Showroom_Ready-success)
![Tech](https://img.shields.io/badge/Stack-Vanilla_JS_|_Tailwind_CSS-blue)
![Accesibilidad](https://img.shields.io/badge/Accesibilidad-Web_Speech_API-orange)
![Región](https://img.shields.io/badge/Regi%C3%B3n-Colombia-yellow)

**Bachué** es un instrumento de Inteligencia Artificial independiente, desarrollado específicamente para el contexto clínico y epidemiológico de las regiones en Colombia. 

Este repositorio contiene la **Maqueta Interactiva (Mockup)** diseñada para presentaciones de alto nivel (Showrooms) ante tomadores de decisiones, académicos y el sector salud. Su arquitectura ligera garantiza su ejecución en cualquier entorno sin depender de APIs extranjeras restrictivas o conexiones a servidores complejos.

---

## 🎯 El Desafío y la Solución

Los sistemas de IA tradicionales operan como "cajas negras", entregando diagnósticos sin mostrar su razonamiento, lo cual genera desconfianza en la comunidad médica y académica. 

**Bachué resuelve esto mediante una arquitectura de "Agentes en Confrontación" (Inspirada en redes GAN)**. El sistema no entrega un resultado único de inmediato, sino que somete los datos del paciente a un debate algorítmico transparente:

1.  🔵 **Agente A (El Analista):** Realiza la lectura inicial de la historia clínica, identificando síntomas principales y formulando una hipótesis base.
2.  🔴 **Agente B (El Validador / Challenger):** Cuestiona las suposiciones del Agente A introduciendo variables de contexto regional (ej. deforestación, clima, altitud) y datos estadísticos duros.

**El resultado es un consenso inteligente:** Un plan de acción preventivo, justificado paso a paso, que sirve como guía de apoyo para el profesional de la salud.

---

## ⚙️ Características Principales

* **Soberanía Tecnológica:** Construido 100% con Vanilla JavaScript y HTML/CSS. No requiere frameworks pesados (React/Vue) ni servidores Node.js para ejecutarse.
* **Storytelling Interactivo:** El texto de la historia clínica se resalta dinámicamente según el agente que está analizando los datos, haciendo visible el *Thinking Process* de la IA.
* **Tiempo Dinámico de Lectura:** Incorpora un algoritmo que calcula el tiempo de interacción basándose en las palabras por minuto (WPM), garantizando un ritmo de presentación natural y digerible para el público humano.
* **Accesibilidad Integrada:** Cuenta con un asistente de voz impulsado por la *Web Speech API* nativa del navegador, con perfiles de voz distintos para cada agente (Agudo/Grave), garantizando la inclusión de personas con discapacidad visual.
* **Soporte Visual Integrado:** Capacidad de inyectar gráficos estadísticos, diagramas clínicos y resonancias magnéticas (RM) directamente en el flujo del debate para sustentar las decisiones.

---

## 📂 Arquitectura del Proyecto (Separation of Concerns)

El código mantiene una estricta separación de responsabilidades para facilitar su escalabilidad y la carga rápida de nuevos casos clínicos de prueba:

* `index.html`: La interfaz de usuario (UI), estilizada con Tailwind CSS vía CDN.
* `app.js`: El motor lógico. Gestiona los tiempos dinámicos, el renderizado del DOM y la síntesis de voz.
* `registry.js`: La base de datos local. Contiene todos los casos clínicos estructurados.
* `convert_to_registry.py`: Script de Python utilitario para ingestar datos JSON de pacientes reales (anonimizados) y agregarlos automáticamente al `registry.js`.
* `assets/img/`: Directorio para las evidencias visuales e infografías de respaldo.

---

## 🚀 Instalación y Uso (Modo Showroom)

El despliegue de Bachué está diseñado para ser inmediato en cualquier pantalla, tableta o proyector:

1. Clona este repositorio en tu máquina local:
   ```bash
   git clone [https://github.com/tu-usuario/bachue-mockup.git](https://github.com/tu-usuario/bachue-mockup.git)

⚖️ Aviso Legal y Ético
Este software es una maqueta interactiva (Mockup) con fines estrictamente de demostración tecnológica y discusión de políticas públicas. Los diagnósticos y planes médicos generados son simulaciones para mostrar la capacidad de la arquitectura de doble agente. Bachué no es un dispositivo médico y sus resultados no deben sustituir el juicio clínico, diagnóstico o tratamiento de un profesional de la salud cualificado.   

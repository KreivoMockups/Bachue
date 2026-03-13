const clinicalData = {
    patient: {
        name: "Paciente Anonimizado",
        age: "8 años",
        narrative: "El paciente presenta cuadros recurrentes de tos seca nocturna durante las últimas 3 semanas. Los padres reportan sibilancias ocasionales después de actividad física intensa en el parque. No hay fiebre presente. El apetito es normal."
    },
    vizUrl: "https://public.flourish.studio/visualisation/your-id-here/embed", // Replace with your actual Flourish ID
    dialogue: [
        {
            agent: 'A',
            text: "Detecto un paciente pediátrico (8 años). Basado en la ausencia de fiebre, el cuadro parece ser una respuesta alérgica común estacional.",
            highlight: "8 años",
            triggerViz: false
        },
        {
            agent: 'B',
            text: "No estoy de acuerdo. Las sibilancias post-esfuerzo sugieren una hiperreactividad bronquial. Estadísticamente, el 12% de los niños en esta zona geográfica desarrollan asma no diagnosticada tras estos síntomas.",
            highlight: "sibilancias ocasionales después de actividad física",
            triggerViz: true // This will trigger the Flourish overlay
        },
        {
            agent: 'A',
            text: "Detecto un paciente pediátrico (8 años). Basado en la ausencia de fiebre, el cuadro parece ser una respuesta alérgica común estacional.",
            highlight: "8 años"
        },
        {
            agent: 'B',
            text: "No estoy de acuerdo. Las sibilancias post-esfuerzo sugieren una hiperreactividad bronquial. Estadísticamente, el 12% de los niños en esta zona geográfica desarrollan asma no diagnosticada tras estos síntomas.",
            highlight: "sibilancias ocasionales después de actividad física"
        },
        {
            agent: 'A',
            text: "Punto válido. Re-evaluando narrativa... La recurrencia nocturna refuerza la hipótesis de B. Ajustando prioridad de triage a 'Preventiva Especializada'.",
            highlight: "tos seca nocturna"
        }
    ],
    plan: [
        "1. Consulta prioritaria con Pediatría para examen físico de tórax.",
        "2. Remisión a Alergología para pruebas de prick test.",
        "3. Espirometría simple para descartar asma inducida por ejercicio.",
        "4. Monitoreo de picos de tos mediante diario de síntomas por 1 semana."
    ]
};
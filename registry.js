/**
 * Bachué Mockup - Clinical Case Registry
 * Archivo autogenerado a partir de datos reales anonimizados.
 */

const BachueRegistry = {
    "CASE_001": {
        "metadata": {
            "title": "Síndrome Febril en Entorno de Deforestación",
            "region": "Zona Rural - Colombia"
        },
        "patient": {
            "age": "28 años",
            "narrative": "Paciente masculino, trabajador agrícola, procedente de una zona rural con reciente y severa deforestación. Presenta cuadro febril agudo de 4 días de evolución, mialgias y cefalea. El episodio ocurre durante un año con declaratoria de fenómeno de El Niño, registrando altas temperaturas máximas en la región."
        },
        "interactions": [
            {
                "agent": "A",
                "content": "Detecto un cuadro febril agudo. Considerando el contexto climático, el fenómeno de El Niño se asoció con un aumento significativo en la incidencia de dengue. Mi hipótesis principal es Dengue clásico.",
                "target": "fenómeno de El Niño",
                "asset": "assets/img/figure2-nino-incidence.png"
            },
            {
                "agent": "B",
                "content": "Cuidado con el sesgo urbano. El paciente proviene de una zona con pérdida de bosque. El estudio de Olivera demuestra que la deforestación se asoció significativamente con la malaria. Además, la temperatura máxima mostró una relación positiva con esta enfermedad.",
                "target": "zona rural con reciente y severa deforestación",
                "asset": "assets/img/figure4-random-forest.png"
            },
            {
                "agent": "A",
                "content": "Punto válido. La pérdida de cobertura vegetal crea hábitats más adecuados para los vectores Anopheles, alterando su comportamiento y facilitando el contacto humano. Reajustando probabilidades diagnósticas.",
                "target": "trabajador agrícola",
                "asset": null
            },
            {
                "agent": "B",
                "content": "Exacto. Como se requiere un enfoque bimodal, el cambio climático y la deforestación impactan la epidemiología de estas enfermedades simultáneamente. Sugiero pruebas de descarte para ambas.",
                "target": "cuadro febril agudo",
                "asset": null
            }
        ],
        "plan": [
            "1. Realizar prueba de gota gruesa para diagnóstico de Malaria.",
            "2. Solicitar cuadro hemático y prueba rápida de antígeno NS1 para Dengue.",
            "3. Notificación obligatoria al SIVIGILA según lineamientos del Instituto Nacional de Salud.",
            "4. Evaluar uso de toldillos en el lugar de residencia del trabajador."
        ]
    },
    "CASE_002": {
        "metadata": {
            "title": "Evaluación Financiera y Clínica en Oncología",
            "region": "Región Caribe - Colombia",
            "complexity": "Alta"
        },
        "patient": {
            "age": "56 años",
            "narrative": "Paciente femenina de 56 años con diagnóstico reciente de cáncer de mama en estadio clínico IV. Requiere inicio urgente de esquema de quimioterapia. Su entidad aseguradora se encuentra evaluando la viabilidad y el impacto económico del tratamiento integral."
        },
        "interactions": [
            {
                "agent": "A",
                "content": "Detecto una paciente de 56 años con cáncer de mama en estadio clínico IV. La administración de quimioterapia y la hospitalización son los servicios más utilizados y con mayor participación en el costo del tratamiento oncológico. El impacto económico para el sistema será muy elevado.",
                "target": "quimioterapia",
                "asset": null
            },
            {
                "agent": "B",
                "content": "Es una candidata ideal para derivación. La participación de los pacientes con cáncer de mama en los estudios clínicos representó el 24% del total de los ahorros para el sistema. Además, las mujeres entre los 55 y los 59 años generaron el mayor nivel de ahorro por paciente.",
                "target": "56 años",
                "asset": "assets/img/figura1-ahorros-edad.png"
            },
            {
                "agent": "A",
                "content": "Interesante aproximación. Analizando los datos, los pacientes clasificados en el estadio clínico IV representaron el 41,7% del total ahorrado al Sistema General de Seguridad Social en Salud. La investigación clínica contribuye al uso eficiente de los recursos sin menoscabar la oportunidad y la calidad de la atención.",
                "target": "estadio clínico IV",
                "asset": null
            },
            {
                "agent": "B",
                "content": "Exacto. Además de la mitigación de costos, los participantes reciben beneficios no económicos directos, como el acceso rápido a medicamentos innovadores. El triage debe priorizar la remisión a investigación clínica.",
                "target": "evaluando la viabilidad",
                "asset": null
            }
        ],
        "plan": [
            "1. Derivación inmediata a la Unidad de Estudios Clínicos Oncológicos.",
            "2. Evaluación de criterios de elegibilidad para inclusión en un estudio clínico fase III patrocinado.",
            "3. Suspensión de la facturación al sistema de salud por los medicamentos y procedimientos cubiertos por el patrocinador.",
            "4. Acompañamiento psicológico para inicio de tratamiento innovador."
        ]
    },
    "CASE_003": {
        "metadata": {
            "title": "Triage Neurooncológico - Glioblastoma",
            "region": "Global/Referencia",
            "complexity": "Muy Alta"
        },
        "patient": {
            "age": "64 años",
            "narrative": "Paciente masculino de 64 años presenta cuadro de cefalea severa progresiva y alteraciones neurológicas focales de 3 meses de evolución. Los síntomas progresaron rápidamente y el cuadro fue inicialmente sospechado como un accidente cerebrovascular. La resonancia magnética (RM) muestra una lesión hiperintensa en el lóbulo parietal compatible con un glioma de alto grado."
        },
        "interactions": [
            {
                "agent": "A",
                "content": "Analizando el caso. El paciente presenta una lesión compatible con glioblastoma multiforme, el tumor cerebral primario más agresivo y maligno en adultos. El cuidado estándar exige la resección quirúrgica máxima seguida de radioterapia y quimioterapia con Temozolomida.",
                "target": "lesión hiperintensa en el lóbulo parietal",
                "asset": "assets/img/figure1-mri-glioblastoma.png"
            },
            {
                "agent": "B",
                "content": "De acuerdo con el diagnóstico, pero para el manejo local sugiero evaluar la Radiocirugía Estereotáctica con Gamma Knife (GKRS). Esta técnica entrega radiación de baja energía de forma precisa, induciendo la destrucción del tejido tumoral y preservando el tejido cerebral sano circundante.",
                "target": "resección quirúrgica máxima",
                "asset": "assets/img/figure2-mri-planning.png"
            },
            {
                "agent": "A",
                "content": "Precaución. Aunque la GKRS es una opción no invasiva, el glioblastoma tiene una naturaleza altamente infiltrativa con márgenes poco claros. Además, la GKRS conlleva riesgos potenciales como la necrosis por radiación y hemorragia periférica.",
                "target": "preservando el tejido cerebral sano",
                "asset": null
            },
            {
                "agent": "B",
                "content": "Punto válido. Sin embargo, su eficacia está comprobada. Un plan integral que incluya el uso de ácido 5-aminolevulínico (5-ALA) para maximizar la resección inicial identificando el tejido mediante fluorescencia, seguido de GKRS, podría optimizar la supervivencia.",
                "target": "naturaleza altamente infiltrativa",
                "asset": null
            }
        ],
        "plan": [
            "1. Confirmación histológica mediante resección quirúrgica máxima guiada por fluorescencia (5-ALA).",
            "2. Inicio de protocolo estándar con radioterapia y quimioterapia (Temozolomida).",
            "3. Planificación de Radiocirugía Estereotáctica Gamma Knife (GKRS) para tratar de manera localizada el tejido residual.",
            "4. Monitoreo estricto con RM para vigilar signos de necrosis por radiación o hemorragia periférica."
        ]
    }
};

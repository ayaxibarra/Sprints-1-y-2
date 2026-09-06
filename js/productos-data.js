const productos = [
    {
        id: 0,
        nombre: "Aparador Uspallata",
        descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
        precio: 2000,
        imagen: "./img/Aparador Uspallata.png",
        detalles: [
            "Medidas: 180 × 45 × 75 cm",
            "Materiales: Nogal macizo FSC®, herrajes de latón",
            "Acabado: Aceite natural ecológico",
            "Peso: 68 kg",
            "Capacidad: 6 compartimentos interiores"
        ]
    },
    {
        id: 1,
        nombre: "Biblioteca Recoleta",
        descripcion: "Sistema modular de estantes abierto que combina estructura de acero Sage Green y repisas en roble claro. Perfecta para colecciones y objetos de diseño, su diseño versátil se adapta a cualquier espacio contemporáneo con elegancia funcional.",
        precio: 3000,
        imagen: "./img/Biblioteca Recoleta.png",
        detalles: [
            "Medidas: 100 × 35 × 200 cm",
            "Materiales: Estructura de acero, estantes de roble",
            "Acabado: Laca mate ecológica",
            "Capacidad: 45 kg por estante",
            "Modulares: 5 estantes ajustables"
        ]
    },
    {
        id: 2,
        nombre: "Butaca Mendoza",
        descripcion: "Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú. El respaldo curvo abraza el cuerpo y ofrece máximo confort, mientras que su diseño orgánico aporta calidez y sofisticación a cualquier ambiente contemporáneo.",
        precio: 1500,
        imagen: "./img/Butaca Mendoza.png",
        detalles: [
            "Medidas: 80 × 75 × 85 cm",
            "Materiales: Guatambú macizo, tela bouclé",
            "Acabado: Cera vegetal, tapizado premium",
            "Tapizado: Repelente al agua y manchas",
            "Confort: Espuma alta densidad"
        ]
    },
    {
        id: 3,
        nombre: "Escritorio Costa",
        descripcion: "Escritorio compacto con cajón organizado y tapa pasacables integrada en bambú laminado. Ideal para espacios de trabajo en casa, combina funcionalidad moderna con estética minimalista y sostenible, perfecto para el trabajo remoto.",
        precio: 4000,
        imagen: "./img/Escritorio Costa.png",
        detalles: [
            "Medidas: 120 × 60 × 75 cm",
            "Materiales: Bambú laminado, herrajes ocultos",
            "Acabado: Laca mate resistente",
            "Almacenamiento: 1 cajón con organizador",
            "Cables: Pasacables integrado"
        ]
    },
    {
        id: 4,
        nombre: "Mesa Comedor Pampa",
        descripcion: "Mesa extensible de roble macizo con tablero biselado y sistema de apertura suave. Su diseño robusto y elegante se adapta perfectamente a reuniones íntimas o grandes celebraciones familiares, extendiéndose de 6 a 10 comensales.",
        precio: 3000,
        imagen: "./img/Mesa Comedor Pampa.png",
        detalles: [
            "Medidas: 160-240 × 90 × 75 cm",
            "Materiales: Roble macizo FSC®, mecanismo alemán",
            "Acabado: Aceite-cera natural",
            "Capacidad: 6-10 comensales",
            "Extensión: Sistema de mariposa central"
        ]
    },
    {
        id: 5,
        nombre: "Mesa de Centro Araucaria",
        descripcion: "Mesa de centro con sobre circular de mármol Patagonia y base de tres patas en madera de nogal. Su diseño minimalista se convierte en el punto focal perfecto para cualquier sala de estar contemporánea, combinando la frialdad del mármol con la calidez de la madera.",
        precio: 2500,
        imagen: "./img/Mesa de Centro Araucaria.png",
        detalles: [
            "Medidas: 90 × 90 × 45 cm",
            "Materiales: Sobre de mármol Patagonia, patas de nogal",
            "Acabado: Mármol pulido, aceite natural en madera",
            "Peso: 42 kg",
            "Carga máxima: 25 kg distribuidos"
        ]
    },
    {
        id: 6,
        nombre: "Mesa de Noche Aconcagua",
        descripcion: "Mesa de noche con cajón oculto y repisa inferior en roble certificado FSC®. Su diseño limpio y funcional permite convivir con diferentes estilos de dormitorio, ofreciendo almacenamiento discreto y elegante para objetos personales.",
        precio: 4500,
        imagen: "./img/Mesa de Noche Aconcagua.png",
        detalles: [
            "Medidas: 45 × 35 × 60 cm",
            "Materiales: Roble macizo FSC®, herrajes soft-close",
            "Acabado: Barniz mate de poliuretano",
            "Almacenamiento: 1 cajón + repisa inferior",
            "Características: Cajón con cierre suave"
        ]
    },
    {
        id: 7,
        nombre: "Silla de Trabajo Belgrano",
        descripcion: "Silla ergonómica regulable en altura con respaldo de malla transpirable y asiento tapizado en tejido reciclado. Diseñada para largas jornadas de trabajo con máximo confort y apoyo lumbar, ideal para oficinas en casa y espacios de coworking.",
        precio: 1000,
        imagen: "./img/Silla de Trabajo Belgrano.png",
        detalles: [
            "Medidas: 60 × 60 × 90-100 cm",
            "Materiales: Malla técnica, tejido reciclado",
            "Acabado: Base cromada, tapizado premium",
            "Regulación: Altura + inclinación respaldo",
            "Certificación: Ergonomía europea EN 1335"
        ]
    },
    {
        id: 8,
        nombre: "Sillas Córdoba",
        descripcion: "Set de cuatro sillas apilables en contrachapado moldeado de nogal y estructura tubular pintada en Sage Green. Su diseño ergonómico y materiales de calidad garantizan comodidad y durabilidad en el uso diario, perfectas para comedores contemporáneos.",
        precio: 1100,
        imagen: "./img/Sillas Córdoba.png",
        detalles: [
            "Medidas: 45 × 52 × 80 cm (cada una)",
            "Materiales: Contrachapado nogal, tubo de acero",
            "Acabado: Laca mate, pintura epoxi",
            "Apilables: Hasta 6 sillas",
            "Incluye: Set de 4 sillas"
        ]
    },
    {
        id: 9,
        nombre: "Sillón Copacabana",
        descripcion: "Sillón lounge en cuero cognac con base giratoria en acero Burnt Sienna. Inspirado en la estética brasilera moderna de los 60, combina comodidad excepcional con un diseño icónico que trasciende tendencias y épocas.",
        precio: 1200,
        imagen: "./img/Sillón Copacabana.png",
        detalles: [
            "Medidas: 90 × 85 × 95 cm",
            "Materiales: Cuero curtido vegetal, acero pintado",
            "Acabado: Cuero anilina premium",
            "Rotación: 360° silenciosa y suave",
            "Garantía: 10 años en estructura"
        ]
    },
    {
        id: 10,
        nombre: "Sofá Patagonia",
        descripcion: "Sofá de tres cuerpos tapizado en lino Warm Alabaster con patas cónicas de madera. Los cojines combinan espuma de alta resiliencia con plumón reciclado, ofreciendo comodidad duradera y sostenible para el hogar moderno.",
        precio: 5500,
        imagen: "./img/Sofá Patagonia.png",
        detalles: [
            "Medidas: 220 × 90 × 80 cm",
            "Estructura: Madera de eucalipto certificada FSC®",
            "Tapizado: Lino 100% natural premium",
            "Relleno: Espuma HR + plumón reciclado",
            "Sostenibilidad: Materiales 100% reciclables"
        ]
    }
];
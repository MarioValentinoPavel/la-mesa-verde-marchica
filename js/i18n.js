/* La Mesa Verde: textos ES, zonas del plano, horarios y opiniones */
window.I18N = {
  dom: {
    es: {
      'nav.food': 'A la mesa', 'nav.plan': 'Tu mesa', 'nav.green': 'El green', 'nav.visit': 'Visítanos',
      'hero.title': 'España a la mesa, a orillas de la laguna.',
      'hero.sub': 'Gastronomía mediterránea, tapas y terraza panorámica sobre el green del golf de Atalayoun.',
      'cta.plan': 'Elegir mi mesa', 'cta.food': 'Ver la mesa', 'cta.route': 'Cómo llegar', 'cta.dm': 'Escribir por Instagram',
      'food.title': 'Gastronomía, copas', 'food.more': 'y mucho más',
      'food.lead': 'El lema que llevan bajo el logo. Tapas para compartir, platos mediterráneos y cócteles en la terraza.',
      'f1': 'Tapas', 'f1.t': 'Para compartir en el centro de la mesa', 'f2': 'Platos', 'f2.t': 'Cocina mediterránea a la española', 'f3': 'Bocados', 'f3.t': 'Para el aperitivo frente al green', 'f4': 'Copas', 'f4.t': 'Cócteles y copas en la terraza',
      'plan.title': 'Elige tu mesa', 'plan.lead': 'Toca una mesa en el plano, elige la hora y envía la petición. Plano orientativo: el equipo confirma el sitio.',
      'b.time': 'Hora', 'b.date': 'Fecha', 'b.ppl': 'Personas', 'b.send': 'Enviar la petición',
      'b.note': 'El texto de la petición se ha copiado: pégalo en el mensaje de Instagram que se abre.',
      'g.title': 'El green hasta el horizonte',
      'g.p': 'Un edificio moderno y blanco, junto a la academia de golf de Marchica. La terraza de arriba abre una vista panorámica sobre el césped, la laguna y el cielo de la tarde.',
      'rev.title': '«Repetiría sin dudarlo»',
      'v.title': 'Marchica, carretera N15, junto al golf', 'v.h': 'Horario', 'v.h.v': 'Todos los días, de 9:30 a 1:00'
    }
  },
  svg: {
    fr: { 'z.lawn': 'Green du golf', 'z.terrace': 'Terrasse haute · vue sur le green', 'z.room': 'Salle', 'z.bar': 'Bar' },
    es: { 'z.lawn': 'Green del golf', 'z.terrace': 'Terraza alta · vista al green', 'z.room': 'Salón', 'z.bar': 'Barra' }
  },
  zone: { fr: { t: 'terrasse haute', r: 'salle', b: 'bar' }, es: { t: 'terraza alta', r: 'salón', b: 'barra' } },
  slots: [['13:00'], ['14:30'], ['19:00', 'sun'], ['20:30'], ['22:00'], ['23:30']],
  ui: {
    fr: { none: 'Touchez une table sur le plan.', table: 'Table', seats: 'places', sun: 'apéritif au coucher du soleil', sum: '{n} personnes · {d} · {h}', msg: 'Bonjour La Mesa Verde, je voudrais réserver la table {t} ({z}, {s} places) le {d} à {h} pour {n} personnes. Merci !', pickFirst: 'Choisissez d’abord une table.' },
    es: { none: 'Toca una mesa en el plano.', table: 'Mesa', seats: 'plazas', sun: 'aperitivo al atardecer', sum: '{n} personas · {d} · {h}', msg: 'Hola La Mesa Verde, quiero reservar la mesa {t} ({z}, {s} plazas) el {d} a las {h} para {n} personas. ¡Gracias!', pickFirst: 'Elige primero una mesa.' }
  },
  reviews: {
    fr: [
      ['Je suis arrivé à Nador il y a peu et j’ai découvert ce nouvel endroit, à côté d’un terrain de golf incroyable. Le lieu est incroyable et la cuisine encore meilleure. J’y retournerais sans hésiter !', 'Francesco'],
      ['La cuisine était absolument incroyable : tout ce que nous avons goûté était délicieux et plein de saveur.', 'Jihad Gouk'],
      ['Excellente ambiance, vues panoramiques et très moderne.', 'Mohamed Amine Moujahid'],
      ['Cuisine et vues incroyables.', 'Troski Menganowski']
    ],
    es: [
      ['Hace poco llegué a Nador de viaje y descubrí este nuevo sitio que se encuentra al lado de un campo de golf increíble. El sitio es increíble y la comida aún mejor. ¡Repetiría sin dudarlo!', 'Francesco'],
      ['La comida fue absolutamente increíble; todo lo que probamos estaba delicioso y lleno de sabor.', 'Jihad Gouk'],
      ['Excelente ambiente, vistas panorámicas y muy moderno.', 'Mohamed Amine Moujahid'],
      ['Comida y vistas increíbles.', 'Troski Menganowski']
    ]
  }
};

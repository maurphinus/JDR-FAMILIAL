# Production des avatars
Trois états graphiques : normal, blesse, tres_blesse. Les deux variantes blessées partent indépendamment du normal validé. Le halo PV est indépendant ; seuils à confirmer.

import/ : originaux bruts, à conserver. prompts/ : gabarits. production/<personnage>/ : portrait/, references/, planches/, normal/, blesse/, tres_blesse/. Pour chaque planche, noter grille, ordre des configurations, état, référence et prompt. Ne publier dans manifest.json qu’après validation. Le générateur et le manifest restent inchangés. Le prompt blesse_leger.txt est conservé comme historique, non actif. Les nouveaux prompts restent à tester.

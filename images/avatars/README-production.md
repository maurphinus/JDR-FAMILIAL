# Production des avatars
Cette organisation complète le générateur existant. Le manifest.json existant reste inchangé et pilote l’affichage. Les nouveaux dossiers sont des espaces de préparation, pas encore reliés automatiquement au générateur.

- import/ : fichiers bruts de tous les appareils.
- prompts/ : gabarits réutilisables.
- production/<personnage>/references/ : maîtres validés.
- production/<personnage>/planches/ : planches originales et leurs métadonnées.
- production/<personnage>/normal/, blesse_leger/, blesse_important/, blesse_grave/ : images individuelles après découpe et validation.
- production/<personnage>/portrait/ : portrait fantasy distinct de l’avatar.

Pour chaque planche, conserver le nombre de lignes et colonnes, l’ordre des configurations, l’état de santé, la référence et le prompt. Ne pas supposer que toutes les planches ont la même grille. Les identifiants doivent suivre le générateur existant. Ne publier dans le manifest qu’après validation. L’épée prêtée reste indisponible tant que le prêt est actif. Le halo de PV sera un effet CSS distinct, à implémenter ultérieurement. Les états important et grave restent à tester.

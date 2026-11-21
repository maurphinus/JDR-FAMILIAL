# Générateur d'avatars par configurations

## Principe
Une image maître par personnage, et une image **complète** par combinaison d'objets tenus en main. Aucun calque d'équipement à superposer à l'affichage.

## Référence
- Ben : partir du portrait original `portrait-ben.jpg` (ou de l'image originale fournie), **pas** de l'avatar SVG simplifié ni de la planche de variantes.
- Préserver visage, fleur, barbe tressée, tatouage, tunique bleue, pantalon et bottes.
- Pour l'avatar maître, retirer ceinture et sacoche, orienter la paume droite vers l'avant. Ne pas modifier inutilement la posture.
- Valider manuellement l'image maître avant de lancer les variantes.

## Prompt maître (gabarit)
Édite **l'image de référence jointe** du personnage {nom}. Produis une seule image plein pied, au même cadrage, mêmes proportions, même style 3D, même visage, mêmes vêtements permanents, même éclairage et même fond que la référence. Ne modifie que la posture nécessaire aux objets tenus. 
Équipement possédé et transportable : {inventaire}. 
Objets tenus en main : droite={main_droite}; gauche={main_gauche}. 
Objets rangés visibles : {objets_ranges}. Chaque objet est présent au maximum une fois, soit tenu, soit rangé. Les objets non portables ou non pertinents ne doivent pas apparaître. Respecte le nombre de mains nécessaires. Évite toute collision ou traversée du corps. Ne rajoute ni texte, ni étiquette, ni objet inventé. Une seule image, pas de planche.
Si un objet est ambigu, demander sa description avant génération.

## Règles de configurations
- Deux mains libres : repos.
- Objet à une main : main droite ou gauche selon le choix de l'utilisateur.
- Deux objets à une main : une main chacun.
- Objet à deux mains : les deux mains occupées, aucun bouclier ou lanterne tenu simultanément.
- Lanterne : préciser allumée ou éteinte.
- Les objets rangés sont stables d'une variante à l'autre, sauf lorsque l'objet est tenu.
- Un objet prêté à un autre personnage ne peut pas être équipé par le propriétaire pendant le prêt.
- L'inventaire dans `personnages.json` reste la source de vérité ; ne pas inventer des possessions.

## Identifiants et cache
Identifiant de configuration : tri canonique des objets tenus, de leurs mains, de l'état (ex. lanterne allumée), plus une version de la référence et des équipements permanents. 
Conserver chaque image validée, son prompt, sa référence, son statut (à générer / à valider / validée) et son identifiant.
Une modification de l'inventaire n'efface pas les variantes déjà valides ; régénérer seulement les configurations concernées.

## Première série Ben
À confirmer avec l'inventaire effectif et les prêts : repos ; bouclier ; hache à deux mains. Les variantes épée et lanterne ne sont à activer que si ces objets sont disponibles dans sa fiche (l'épée est actuellement prêtée à Gabin ; la lanterne n'y figure pas).

## Workflow
1. Lire `personnages.json`.
2. Choisir les objets utilisables et les positions en main ; distinguer le contenu du sac de l'équipement visible.
3. Construire les combinaisons compatibles et les prompts.
4. Générer **une image par configuration**, toujours depuis l'image maître validée.
5. Vérifier visuellement, valider, enregistrer et associer à la configuration.
6. Dans la fiche, les cases d'équipement choisissent l'image correspondante ; si elle n'existe pas, afficher l'avatar maître et proposer sa génération.

La préparation des prompts est automatisable localement ; la génération d'images nécessite une action de génération ou une API d'images configurée séparément.

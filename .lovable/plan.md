

# Mise à jour de la page Opportunité avec le vrai plan de commission

Le PDF "Plan de Commission 2026" contient des données très différentes de ce qui est actuellement sur le site. Voici les corrections à apporter.

## Données à corriger

### 8 Rangs (actuellement incorrects)
Les rangs actuels sur le site sont faux. Voici les vrais :

| Rang | PV Min | GV Min | Delta | Mobility | Home |
|------|--------|--------|-------|----------|------|
| Candidat | 0 | 0 | 0% | — | — |
| Junior | 500 | 0 | 4% | — | — |
| Senior | 1 000 | 5 000 | 8% | — | — |
| Coach | 2 000 | 25 000 | 12% | 500€ | — |
| Manager | 3 000 | 75 000 | 16% | 1 250€ | 1 250€ |
| Directeur | 5 000 | 200 000 | 20% | 2 250€ | 2 250€ |
| Président | 7 500 | 500 000 | 24% | 3 500€ | 3 500€ |
| Ambassadeur | 10 000 | 1 000 000 | 28% | 6 000€ | 6 000€ |

### 5 Sources de revenus (pas "types de commissions")
1. **Commission Directe (Retail)** — sur ventes personnelles
2. **Leadership Delta** — différentiel sur BV downline
3. **Fast Start Bonus** — 250€/500€ membre + parrain (60 jours)
4. **Mobility Bonus** — prime fixe mensuelle par rang (Delta)
5. **Home Bonus** — prime fixe mensuelle par rang (Delta)

### Simulateur de revenus
Actuellement le simulateur utilise des formules inventées. Il faut le remplacer par les vrais scénarios du PDF (Scénario A terrain, Scénario B digital).

## Modifications fichiers

### 1. `src/pages/Opportunite.tsx`
- Corriger les rangs avec PV/GV/Delta/Mobility/Home
- Remplacer les 5 types de commissions par les 5 vraies sources
- Mettre à jour le Fast Start (250€+250€ à 25k BV en 60j, 500€+500€ à 50k BV)
- Ajouter section écosystème produits avec tableau des commissions par produit
- Refaire le simulateur avec les vrais taux (4% Candidat / 8% Junior+ pour Mara-A, 149€ fixe Auxil-IA, etc.)
- Ajouter section "Potentiel par rang" avec le tableau du PDF
- Ajouter mention légale "Income Disclosure"

### 2. `src/pages/Index.tsx`
- Mettre à jour la section Opportunité de la homepage avec les bons chiffres (Fast Start 250€+250€, système Delta)

### 3. `src/pages/Services.tsx`  
- Ajouter les vrais produits manquants : Ecofix Énergie, Assurances
- Corriger les descriptions avec les vrais montants de commission

## Approche technique
- Tableaux glassmorphism avec les vraies données structurées
- Simulateur interactif basé sur les vrais taux par produit
- Sections visuelles pour la formule Delta avec exemple concret
- Conformité légale en bas de page


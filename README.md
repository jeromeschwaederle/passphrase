# Password

## Explications

### Comprendre la robustesse/force d'un mot de passe

Par abus de langage, on parle souvent de « force » d’un mot de passe pour désigner sa capacité à résister à une énumération de tous les mots de passe possibles.

Cette « force » dépend de la longueur L du mot de passe et du nombre N de caractères possibles. Elle suppose que chaque caractère constituant le mot de passe est choisi de manière aléatoire. Elle se calcule aisément par la formule N^L. Mais il est plus difficile d’estimer si la valeur ainsi obtenue est suffisante ou pas.

### Comment estimer la « force » d'un mot de passe ?

La force d’un mot de passe peut être estimée par comparaison avec les techniques cryptographiques. Une taille de clé cryptographique de 64 bits est aujourd’hui considérée comme non sûre car les capacités de calcul modernes permettent de retrouver cette clé en énumérant toutes les clés possibles. Or une telle clé peut être vue comme un mot de passe de 64 caractères où les seuls caractères possibles sont 0 et 1. La « force » d’un tel mot de passe est donc 2^64 soit 64 bits.

Les règles édictées par l’ANSSI (Agence Nationale de la Sécurité des Systèmes d'Information) en matière de mécanismes cryptographiques imposent par exemple une taille de clé minimale de 100 bits. Il est même recommandé une taille de clé de 128 bits pour des clés dont l’usage présumé est de longue durée. Il est par ailleurs communément admis que des tailles de clé de 80 bits sont désormais exposées à des attaques utilisant des moyens techniques conséquents.

## Ma démarche

### Une recherche insatisfaisante

Je cherchais une méthode sûre pour facilement créer des mots de passe ou phrases de passe.
Je suis assez rapidement tombé sur [Diceware](https://fr.wikipedia.org/wiki/Diceware). La méthode est intéressante, elle repose sur une liste de 7776 mots que l'on peut trouver [ici](https://github.com/chmduquesne/diceware-fr/blob/master/diceware-fr-5-jets.txt).

On jette 5 dés et la séquence que l'on obtient nous donne le numéro du mot dans la liste. On
répète l'opération autant de fois que l'on souhaite de mot. Chaque mot joue le rôle d'un
symbole et ajoute 12,92 bits d'entropie.

En parcourant cette liste, je me suis fais la réflexion qu'elle était très (trop) longue et
contenait beaucoup (trop) de mots semblables. Cela représente, à mon sens, deux caractéristiques à éviter, si l'on souhaite pouvoir facilement imprimer la liste ou retenir la phrase. Voir l'extrait :

13155 = aida | 13156 = aidais | 13161 = aidant | 13162 = aide | 13163 = aider | 13164 = aides | 13165 = aidez | 13166 = aidiez | 13211 = aidons | 13212 = aie | 13213 = aient | 13214 = aies

### L'envie de créer une alternative

En conséquence, j'ai souhaité créer une alternative à "Diceware" en m'inspirant du [BIP-39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) de bitcoin. Plus particulièrement la partie concernant les phrases mnémoniques pour la génération de portefeuille déterministe ainsi qu'en utilisant la [version française](https://github.com/bitcoin/bips/blob/master/bip-0039/french.txt) de la liste de mots anglais servant à l'implémentation de ces phrases.

Cette liste de 2048 mots a des propriétés très intéressantes dont voici les principales :

- Priorité aux mots français simples et courants.
- Uniquement des mots de 5 à 8 lettres.
- Un mot est entièrement reconnaissable en tapant les 4 premières lettres (les caractères
  français spéciaux "é-è" sont considérés comme égaux à "e", par exemple "museau" et "musée"
  ne peuvent pas être tous les deux dans la liste).
- Uniquement des verbes infinitifs, les adjectifs et les noms.
- Pas de pronoms, pas d'adverbes, pas de prépositions, pas de conjonctions, pas
  d'interjections (sauf si un nom/adjectif est aussi populaire que son interjection comme
  "mince; chouette").
- Pas d'adjectifs numériques.
- Pas de mots au pluriel (sauf mots invariables comme "univers", ou même orthographe que
  singulier comme "heureux").
- Pas d'adjectifs féminins (sauf les mots avec la même orthographe pour les adjectifs
  masculins et féminins comme "magique").
- Pas de mots avec plusieurs sens ET une orthographe différente en parlant comme "verre-vert",
  à moins qu'un mot ait un sens beaucoup plus populaire qu'un autre comme "perle" et "pairle".
- Pas de mots très similaires avec 1 lettre de différence.
- Pas de verbes essentiellement réfléchis (sauf si un verbe est aussi un nom comme
  "souvenir").
- Aucun mot avec "ô;â;ç;ê;œ;æ;î;ï;û;ù;à;ë;ÿ".
- Aucun mot finissant par "é;ée;è;et;ai;ait".
- Pas de mots gênants (dans un cadre très, très large) ou appartenant à une religion
  particulière.

À l'instar de Diceware, chacun des 2048 mots peut être considéré comme un symbole unique et ajoute 11 bits d'entropie => log2048/log2 = 11

## Le générateur de phrase de passe

### Est-ce que je peux l'utiliser en confiance ?

Tout le code s'exécute directement dans le navigateur et rien n'est envoyé sur internet. Il s'exécutera parfaitement sur un ordinateur qui n'est pas connecté à internet, ce que je conseille de faire.

### Comment est générée l'entropie nécessaire ?

J'utilise cette [méthode](https://developer.mozilla.org/fr/docs/Web/API/Crypto/getRandomValues) pour générer 11 valeurs pseudo-aléatoires, cryptographiquement
satisfaisantes, pour chaque mot. Ces valeurs sont comprises entre -128 et 127 (int8). Je
transforme ensuite ces valeurs en 0 (de -128 à -1) ou en 1 (de 0 à 127).

Cela me donne des nombres binaires de 11 bits que je n'ai plus qu'à transformer en nombres
décimaux. Je transforme ensuite ces nombres décimaux en mots en les récupérant en fonction de leur index dans la [liste](https://github.com/bitcoin/bips/blob/master/bip-0039/french.txt).

### Mise à l'épreuve

Même dans le cas où un "attaquant" connaîtrait la liste de mots, une phrase de passe générée avec
une longueur de 6 mots sera plus robuste qu'une suite aléatoire de 10 caractères parmis les
95 ci-dessous:

!"#$%&'()\*+,-./0123456789:;<=>?@ ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^\_`abcdefghijklmno
pqrstuvwxyz{|}~

En effet, log2(2048^6) > log2(95^10).

Pour comparer les deux types de mot de passe :

Générateur de phrase de passe :
**ChiffrePétaleNoisettePoneyProblèmeFeuille**

est plus robuste que : **w~5]K%O#ih7**

### Possibilité de raccourcir la phrase de passe

Étant donné qu'un mot est entièrement reconnaissable dans la liste en tapant ses 4 premières lettres on peut ainsi réduire la longueur de la phrase de passe. En effet dans ce cas, **ChiffrePétaleNoisettePoneyProblèmeFeuille** devient **ChifPétaNoisPoneProbFeui**

# Password

## Explication

### Comprendre la robustesse/force d'un mot de passe

Par abus de langage, on parle souvent de « force » d’un mot de passe pour désigner sa capacité à résister à une énumération de tous les mots de passe possibles.

Cette « force » dépend de la longueur L du mot de passe et du nombre N de caractères possibles. Elle suppose que le mot de passe est choisi de façon aléatoire. Elle se calcule aisément par la formule N^L. Mais il est plus difficile d’estimer si la valeur ainsi obtenue est suffisante ou pas.

### Comment estimer la « force » d'un mot de passe ?

La force d’un mot de passe peut être estimée par comparaison avec les techniques cryptographiques. Une taille de clé cryptographique de 64 bits est aujourd’hui considérée comme non sûre car les capacités de calcul modernes permettent de retrouver cette clé en énumérant toutes les clés possibles. Or une telle clé peut être vue comme un mot de passe de 64 caractères où les seuls caractères possibles sont 0 et 1. La « force » d’un tel mot de passe est donc 2^64 soit 64 bits.

Les règles édictées par l’ANSSI en matière de mécanismes cryptographiques imposent par exemple une taille de clé minimale de 100 bits. Il est même recommandé une taille de clé de 128 bits pour des clés dont l’usage présumé est de longue durée. Il est par ailleurs communément admis que des tailles de clé de 80 bits sont désormais exposées à des attaques utilisant des moyens techniques conséquents.

### L'entropie

Pour comprendre ce qu'est la robustesse d'un mot de passe, il faut aussi comprendre ce
qu'est [l'entropie](https://fr.wikipedia.org/wiki/Entropie_de_Shannon).

Pour la faire courte, l'entropie est [une mesure de l'imprévisibilité](https://fr.wikipedia.org/wiki/Robustesse_d%27un_mot_de_passe#L'entropie_comme_mesure_de_la_robustesse_d'un_mot_de_passe) d'un mot de passe. L'unité de mesure de cette imprévisibilité est le [bit](https://fr.wikipedia.org/wiki/Bit) (unité la plus simple dans un système de numération, ne pouvant prendre que deux valeurs, désignées le plus souvent par les chiffres 0 et 1).
En conséquence, plus un mot de passe est difficile à deviner, plus son entropie (mesurée en
bit) est grande et meilleure est sa robustesse.

### Qu'est-ce qu'un mot de passe aléatoire ?

Définissons ensemble qu'un mot de passe aléatoire est une chaîne de symboles d'une longueur
spécifiée, tirée d'un ensemble de symboles et produite par un processus de sélection
aléatoire dans lequel chaque symbole a la même probabilité d'être sélectionné.

#### Générer du hasard (de l'entropie)

Nous venons de définir que le processus de sélection doit être aléatoire mais, en tant
qu'être humain, nous est-il possible de choisir de manière réellement aléatoire une séquence
de symboles, que ce soit des chiffres ou des lettres ? Nous allons faire l'expérience avec
Jean-Jacques.

Jean-Jacques souhaite créer un mot de passe aléatoire de 8 symboles, uniquement composé de 0
et de 1. Avec 8 symboles, il y a 2x2x2x2x2x2x2x2 = 2^8 = 256 combinaisons différentes
possibles. Pour calculer l'entropie de ce mot de passe mesurée en bit, on passe le nombre
maximal de possibilités dans une fonction logarithmique de base 2. On a donc log2(256) = 8 bits d'entropie.

Il écrit une suite aléatoire de 8 symboles, soit des 0, soit des 1. Il répète cette
opération 1000 fois en tout. Il a maintenant écrit 8000 symboles. Pour vérifier si la
distribution est réellement aléatoire, Jean-Jacques met bout à bout ses 1000 versions. Il
observe cette longue chaîne de 0 et de 1 et il lui semble que la distribution est aléatoire
mais pour le vérifier il doit tester une caractéristique : la distribution de petits groupes
de symboles.

Jean-Jacques redécoupe sa longue chaîne de 0 et de 1 en paquet de trois symboles. Il a donc
maintenant 8000/3 = 2666 paquets de trois symboles. Avec des 0 et des 1, il y a 2x2x2 = 2^3
= 8 "versions" de paquet différent.

Version 1 : 000

Version 2 : 001

Version 3 : 010

Version 4 : 011

Version 5 : 100

Version 6 : 101

Version 7 : 110

Version 8 : 111

Avec une distribution réellement aléatoire, il devrait avoir environ 2666/8 = 333 fois
chaque "version", mais il se rend compte que ça n'est pas le cas. Peut importe combien de
fois il essaie, Jean-Jacques n'y arrive pas. Il est impossible pour lui ou pour tout être humain de choisir réellement aléatoirement une suite de symboles.

Le seul moyen pour lui d'y arriver est de laisser un évènement qui a une probabilité de 50%
décider à sa place (comme de jouer à pile ou face avec une pièce de monnaie) afin que
l'imprévisibilité de l'évènement décide à sa place, **afin que sa suite de symboles contienne de l'entropie**.

## Ma démarche

### Une recherche insatisfaisante

Je cherchais une méthode sûre pour facilement créer des mots de passe ou phrases de passe.
Je suis assez rapidement tombé sur [Diceware](https://fr.wikipedia.org/wiki/Diceware). La méthode est intéressante, elle repose sur une liste de 7776 mots que l'on peut trouver [ici](https://github.com/chmduquesne/diceware-fr/blob/master/diceware-fr-5-jets.txt).

On jette 5 dés et la séquence que l'on obtient nous donne le numéro du mot dans la liste. On
répète l'opération autant de fois que l'on souhaite de mot. Chaque mot joue le rôle d'un
symbole et ajoute 12,92 bits d'entropie.

En parcourant cette liste, je me suis fais la réflexion qu'elle était très longue et
contenait beaucoup trop de mots semblables. Cela représente, à mon sens, deux caractéristiques à éviter, si l'on souhaite pouvoir facilement imprimer la liste ou retenir la phrase. Voir l'extrait :

13155 = aida

13156 = aidais

13161 = aidant

13162 = aide

13163 = aider

13164 = aides

13165 = aidez

13166 = aidiez

13211 = aidons

13212 = aie

13213 = aient

13214 = aies

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

## Le Jéjé-nérateur de mot de passe

### Est-ce que je peux l'utiliser en confiance ?

Tout le code s'exécute directement dans le navigateur et rien n'est envoyé sur internet. Il s'exécutera parfaitement sur un ordinateur qui n'est pas connecté à internet, ce que je conseille de faire.

### Comment est générée l'entropie nécessaire ?

J'utilise cette [méthode](https://developer.mozilla.org/fr/docs/Web/API/Crypto/getRandomValues) pour générer 11 valeurs pseudo-aléatoires, cryptographiquement
satisfaisantes, pour chaque mot. Ces valeurs sont comprises entre -128 et 127 (int8). Je
transforme ensuite ces valeurs en 0 (de -128 à -1) ou en 1 (de 0 à 127).

Cela me donne des nombres binaires de 11 bits que je n'ai plus qu'à transformer en nombre
décimaux. Je transforme ensuite ces nombres décimaux en mots en les récupérant en fonction de leur index dans la [liste](https://github.com/bitcoin/bips/blob/master/bip-0039/french.txt).

### Mise à l'épreuve

Même dans le cas où un "attaquant" connaitraît la liste de mots, un mot de passe généré avec
une longueur de 6 mots sera plus robuste qu'une suite aléatoire de 10 caractères parmis les
95 ci-dessous:

!"#$%&'()\*+,-./0123456789:;<=>?@ ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^\_`abcdefghijklmno
pqrstuvwxyz{|}~

En effet, log2(2048^6) > log2(95^10).

Pour comparer les deux types de mot de passe :

Jéjé-nérateur :
**ChiffrePétaleNoisettePoneyProblèmeFeuille**

est plus robuste que : **w~5K%O#ih7**

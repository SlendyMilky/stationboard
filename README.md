# stationboard

Repo contenant le code pour une réplique a ma sauce d'un tableau d'affichage des CFF.

## Description

Ce projet est une réplique d'un tableau d'affichage de la CFF, permettant de visualiser les horaires des trains en temps réel. La page web est accessible via [stationboard.slyc.ch](https://stationboard.slyc.ch). Le projet utilise l'API gratuite d'[opendata.ch](https://transport.opendata.ch/).

## Fonctionnalités

- Affichage en temps réel des horaires des trains pour une station donnée.
- Mise à jour automatique des horaires toutes les 30 secondes.
- Affichage des retards des trains.
- Utilisation d'icônes SVG spécifiques pour les différents types de trains.

## Installation

1. Clonez le dépôt :
    ```bash
    git clone https://github.com/SlendyMilky/stationboard.git
    ```

2. Accédez au répertoire du projet :
    ```bash
    cd stationboard
    ```

3. Ouvrez le fichier `index.html` dans votre navigateur pour voir le tableau d'affichage.

## Utilisation

- La station par défaut est "La Tour-de-Peilz". Vous pouvez changer la station en modifiant le paramètre `station` dans l'URL. Par exemple, pour afficher les horaires de Lausanne, utilisez :
    ```bash
    https://stationboard.slyc.ch?station=Lausanne
    ```

## Dépendances

Le projet utilise les bibliothèques suivantes :
- [jQuery](https://jquery.com/)
- [jQuery UI](https://jqueryui.com/)
- [Moment.js](https://momentjs.com/)
- [Bootstrap](https://getbootstrap.com/)

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](./LICENSE) pour plus de détails.

## Remerciements

Un grand merci à [opendata.ch](https://transport.opendata.ch/) pour leur API gratuite.

## Contribuer

Les contributions sont les bienvenues ! Veuillez soumettre une pull request ou ouvrir une issue pour discuter des changements que vous souhaitez apporter.

---

Pour toute question ou suggestion, n'hésitez pas à me contacter via [GitHub](https://github.com/SlendyMilky).

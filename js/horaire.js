$(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var station = urlParams.get('station') || 'La Tour-de-Peilz';

    function getDelay(prognosis, departure) {
        var delayMinutes = (prognosis.valueOf() - departure.valueOf()) / 60000;
        return delayMinutes >= 3 ? ' <strong>+' + delayMinutes + ' min</strong>' : '';
    }

    function createTable(platform) {
        return `
            <div class="col-md-6">
                <div class="table-responsive">
                    <table id="stationboard_platform${platform}" class="table">
                        <colgroup>
                            <col width="60">
                            <col width="80">
                            <col width="150">
                            <col width="20">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>Train</th>
                                <th>Heure</th>
                                <th>Destination</th>
                                <th>Voie</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        `;
    }

    function appendLineToTable(line, platform) {
        var match = line.match(/<td>([A-Z]+)(00)?(\d*)<\/td>/);
        if (match) {
            var trainPrefix = match[1];
            var hasDoubleZero = match[2];
            var svgPath = `assets/label/${trainPrefix}${hasDoubleZero ? '' : match[3]}.svg`;

            $.ajax({
                url: svgPath,
                type: 'HEAD',
                success: function() {
                    // Le fichier SVG spécifique existe, l'utiliser
                    var svgImage = `<img src="${svgPath}" alt="${trainPrefix}" style="width:50px; height:auto;">`;
                    var modifiedLine = line.replace(`<td>${trainPrefix}${hasDoubleZero ? '00' : ''}${match[3]}</td>`, `<td>${svgImage}</td>`);
                    $(`#stationboard_platform${platform} tbody`).append(modifiedLine);
                },
                error: function() {
                    // Le fichier SVG spécifique n'existe pas, utiliser le texte
                    console.warn(`SVG non trouvé pour le train: ${trainPrefix}${hasDoubleZero ? '00' : ''}${match[3]}, utilisation du texte.`);
                    $(`#stationboard_platform${platform} tbody`).append(line);
                }
            });
        } else {
            // Aucun numéro de train trouvé, ajouter la ligne telle quelle
            console.warn('Numéro de train non trouvé dans la ligne:', line);
            $(`#stationboard_platform${platform} tbody`).append(line);
        }
    }

    function refresh() {
        if (station) {
            $.get('https://transport.opendata.ch/v1/stationboard', { station: station, limit: 15 }, function (data) {
                var stationName = "🚉" + ' - ' + data.station.name;
                $('title').text(stationName);
                $('#station-name').text(stationName);

                $('#stationboard-container').empty();
                // Utiliser une expression régulière pour extraire le numéro de base de la voie
                var platforms = Array.from(new Set(data.stationboard.map(item => item.stop.platform.match(/^\d+/)[0]))).sort((a, b) => a - b);
                platforms.forEach(platform => {
                    $('#stationboard-container').append(createTable(platform));
                });

                var platformCounts = {};
                platforms.forEach(platform => {
                    platformCounts[platform] = 0;
                });

                $(data.stationboard).each(function () {
                    var departure = moment(this.stop.departure);
                    var prognosis = moment(this.stop.prognosis.departure);
                    var delay = getDelay(prognosis, departure);
                    var line = '<tr><td>' + (this.category || "") + (this.number || "") + '</td><td>' + departure.format('HH:mm') + delay + '</td><td>' + this.to + '</td><td>' + this.stop.platform + '</td></tr>';

                    // Utiliser le numéro de base de la voie pour l'ajout à la table
                    var basePlatform = this.stop.platform.match(/^\d+/)[0];
                    appendLineToTable(line, basePlatform);

                    platformCounts[basePlatform]++;
                });
            }, 'json').fail(function () {
                console.error("Erreur lors de la récupération des données de l'API.");
            });
        }
    }

    setInterval(refresh, 30000); // Mise à jour toutes les 30 secondes
    refresh();
});
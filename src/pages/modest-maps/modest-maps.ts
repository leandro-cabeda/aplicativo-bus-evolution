import { HomePage } from './../home/home';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { HttpErrorResponse } from '@angular/common/http';
import { Onibus } from '../../models/Onibus';

// Variavel tem que ser declarada para usar do ModestMaps do java script, Namespace dela
declare var MM: any;
declare var com: any;

@IonicPage()
@Component({
  selector: 'page-modest-maps',
  templateUrl: 'modest-maps.html',
})
export class ModestMapsPage {
  public alert: AlertController;
  public bu: Onibus;
  public bus = {
    "rotas": [
      [-28.280337621823495, -52.371343374252326],
      [-28.27937389676426, -52.37116634845734],
      [-28.279000687168416, -52.371912002563484],
      [-28.277777117422552, -52.37171351909638],
      [-28.27688423333127, -52.37366616725922],
      [-28.280550207059587, -52.37700283527375],
      [-28.27873140854655, -52.379620671272285],
      [-28.27714879236088, -52.38054871559143],
      [-28.27563701762648, -52.38150358200074],
      [-28.273444906149916, -52.38376736640931],
      [-28.27269371964141, -52.385355234146125],
      [-28.268611707908512, -52.38930344581605],
      [-28.268125068761442, -52.39146530628205],
      [-28.266542295000786, -52.395091652870185],
      [-28.26515321447945, -52.40153431892396],
      [-28.265767435990718, -52.40438282489777],
      [-28.265923353195554, -52.40687727928162],
      [-28.26170878364624, -52.40936636924744],
      [-28.262880564105377, -52.41198420524597],
      [-28.256563191965796, -52.41612017154694],
      [-28.25358628997839, -52.41812109947205],
      [-28.253175187457575, -52.418560981750495],
      [-28.250552599584, -52.4228847026825],
      [-28.24940903656801, -52.42370009422303],
      [-28.251450429721253, -52.427809238433845],
      [-28.248133146001525, -52.430899143219]
    ]
  };

  public bus2 = {
    "rotas": [
      [-28.237216569426966, -52.37420797348023],
      [-28.23731109003597, -52.37319946289063],
      [-28.23783567789382, -52.37119853496552],
      [-28.238057799903167, -52.370914220809944],
      [-28.2380767038826, -52.370345592498786],
      [-28.237807321859353, -52.370361685752876],
      [-28.236885746636037, -52.36934244632722],
      [-28.235770393667522, -52.370120286941535],
      [-28.234499066107272, -52.370860576629646],
      [-28.233397866795762, -52.370892763137824],
      [-28.234031175942825, -52.37192273139954],
      [-28.23365308138181, -52.372641563415534],
      [-28.232003628188867, -52.37197637557984],
      [-28.23197527060445, -52.371643781661994],
      [-28.232495158454743, -52.37075328826905],
      [-28.234276936689053, -52.36926198005677],
      [-28.235713680493216, -52.368387579917915],
      [-28.235973615627913, -52.36828029155732],
      [-28.23687629454122, -52.36672997474671],
      [-28.237495404982653, -52.365742921829224],
      [-28.237240199587074, -52.365603446960456],
      [-28.235373400814314, -52.36606478691101],
      [-28.232433717295322, -52.36660122871399],
      [-28.232339192365593, -52.36593067646027],
      [-28.23620519366907, -52.3650884628296],
      [-28.236673074300185, -52.36431598663331]
    ]

  }

  public bus3 = {
    "rotas": [
      [-28.231393938463267, -52.381836175918586],
      [-28.235137094843257, -52.38065600395203],
      [-28.235033120050193, -52.3829197883606],
      [-28.236101219916847, -52.378478050231934],
      [-28.236488757932854, -52.37677216529847],
      [-28.236980267538126, -52.375881671905525],
      [-28.23713150080728, -52.37503409385682],
      [-28.237528487118865, -52.3749589920044],
      [-28.25328386988733, -52.395837306976325],
      [-28.258982454254994, -52.40347623825074],
      [-28.26112761355854, -52.408068180084236],
      [-28.263934210533552, -52.41412997245789],
      [-28.26646669924784, -52.41976261138917],
      [-28.269414893872295, -52.426553964614875],
      [-28.26924480793821, -52.42868900299073],
      [-28.267071463769774, -52.43372082710267],
      [-28.265427252206493, -52.433549165725715],
      [-28.264983121742684, -52.43571639060975],
      [-28.26503036975236, -52.439782619476325],
      [-28.26226160103263, -52.43913352489472],
      [-28.262252151186875, -52.442550659179695],
      [-28.260877189698284, -52.442287802696235],
      [-28.260494465303385, -52.44433701038361],
      [-28.258968279049935, -52.444605231285095],
      [-28.259190357045977, -52.44312465190888],
      [-28.256775824641185, -52.44261503219605],
      [-28.256378909970703, -52.44495391845703],
      [-28.259469135151996, -52.445640563964844]
    ]
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.bu = this.navParams.get("bus");
  }

  ionViewDidEnter() {
    try {
      this.carregaMapa();
      console.log("Deu certo carregar mapa modest-maps");
    } catch (error) {
      this.alert.create({
        title: "Alerta",
        subTitle: "Ocorreu falha ao carregar mapa",
        buttons: [{
          text: "Confirmar",
          handler: () => {
            this.navCtrl.setRoot(HomePage);
          }
        }]
      })
    }
  }

  public carregaMapa() {
    // pegar o id do mapa
    var parent = 'map';
    // acrescentar uma configuração pro mapa
    var template = new MM.Template('http://tile.openstreetmap.org/{Z}/{X}/{Y}.png');
    // adicionar ao layer  o template para cabar dentro do escopo se não ele se expandirá pra fora
    var layer = new MM.Layer(template);


    // ja utiliza uma dimensão fixa pro mapa ou se quiser adiciona no css 100% largura e 100% altura
    //var dimensions = new MM.Point(900, 600);
    // cria o mapa com essas opçoes
    //var map = new MM.Map(parent, layer, dimensions);
    //var map = new MM.Map(parent, layer);
    var map = new com.modestmaps.Map(parent, layer);
    // Location latitude e longitude
    //var latitude = 37.7749295;
    //var longitude = -122.4194155;

    //var loc = new com.modestmaps.Location(latitude, longitude);
    //var loc=new MM.Location(latitude, longitude);

    // Jeito de criar objetos com latitude e longitude
    //var loc = { lat: latitude, lon: longitude };
    // passando a variavel com zoom ja
   /* var bu=[];

    for(let i=0;i<this.bus3.rotas.length;i++)
    {
      bu.push(new MM.Location(this.bus3.rotas[i][0],this.bus3.rotas[i][1]));
    }
    */

    var rotas=[];
    var bu=this.bu.rotas;
    for (let i = 0; i < bu.length; i++) {
      rotas.push(new MM.Location(bu[i][0],bu[i][1]));
    }

    map.setExtent(rotas);
    map.setZoomRange(12, 16);
    map.setZoom(14);

    //map.setCenterZoom(loc, 16);

    // seta um intervalo de range de zoom
    //map.setZoomRange(10, 18);
    //seta um zoom
    //map.setZoom(14);

    var info = document.getElementById('map');
    // cria uma função de retorno trazendo o centro daquela coodernada
    map.addCallback('drawn', function (m) {
      //info.innerHTML = m.getCenter().toString();
    });

    //var point = new com.modestmaps.Point(latitude, longitude);
    /*
    Point é um objeto de dados simples com propriedades x e y.
    É mais usado para representar posições de pixel na tela ou no mapa.
    */
    // cria pontos
    var p1 = new com.modestmaps.Point(10, 20);
    var p2 = new com.modestmaps.Point(20, 20);
    // depois de pontos ja criados, cria uma resposta de distancia entre os pontos
    var d = com.modestmaps.Point.distance(p1, p2);

    //p3 está no meio do caminho entre p1 e p2:
    // cria uma interpolação entre 2 pontos
    var amount = 0.5;
    var p3 = com.modestmaps.Point.interpolate(p1, p2, amount);
    //info.innerHTML="Distancia entre 2 pontos: "+d+" metros "+" interpolação de caminho"+
    //" entre os 2 pontos: "+p3;

    /*var location = new MM.Location(37.8715926, -122.272747);
    var point = map.locationPoint(location);*/
    //map.zoomByAbout(1, point);
    // zoom em um passo
    //map.zoomBy(1);
    // percorre
    //map.panBy(50, 50);



    // adicionado separado o location e o zoom
    /*map.setCenter(new MM.Location(37.7749295, -122.4194155));
    map.setZoom(11);*/
    // adiciona um ponto de localização já com o zoom no final
    //map.setCenterZoom(new MM.Location(37.7749295, - 122.4194155), 14);
    // mostra uma taxa delimitadora de coordenadas ou conjunto de pontos  usando sextExtent
    /*var locations = [
      new MM.Location(37.7749295, -122.4194155),
      new MM.Location(37.8043722, -122.2708026),
      new MM.Location(37.8715926, -122.272747)
    ];
    map.setExtent(locations);*/

    // Definir o tamanho do mapa usa assim também:
    /*map.setSize(new MM.Point(600,400));
    map.setSize(600,400); */

    /*Para fazer sobreposições que seguem o mapa ou atualizar
    partes da página quando o mapa muda, o retorno de chamada
    mais simples para registrar é 'desenhado, abaixo exemplo: */
    // Método removeCallback para manter as coisas arrumadas e remove o addCall
    // Método dispatchCallback internamente para notificar os ouvintes sobre as mudanças.
    /*var info = document.getElementById('info');
    map.addCallback('drawn', function(m) {
    // responde um novo centro
    info.innerHTML = m.getCenter().toString();
    }); */

    //Eles representam coordenadas de tile e incluem az - zoom - dimension.
    //var coord = new MM.Coordinate(row, column, zoom);

    //Exemplo de navegação de coodernadas:
    /* Obter uma chave de string para se referir a esta coordenada
  var key = coord.toKey();

  // Obtém a coordenada de número inteiro que contém um // potencial entre coordenadas
  var container = coord.container();

  // Obtenha uma cópia desta coordenada
  var copy = coord.copy();

  // Navegação com coordenadas
  var zoomedTo = coord.zoomTo(5);
  var zoomedIn = coord.zoomTo(1);
  var pannedLeft = coord.left(1);
  */




    // Metodos de distancia e circular
    /*
    //Obtém a distância entre dois pontos, em
    //metros, com uma esfera de raio r metros (padrão 6378000)
    var d = com.modestmaps.Location.distance(l1, l2, r)

    // Obtém a interpolação de dois pontos, enviesada por f,
    // ao longo do grande círculo
    var l3 = com.modestmaps.Location.interpolate(l1, l2, f)
     */

    /*pointLocation() converte de um ponto de pixel x, y para um lat, lon world location.
     locationPoint() converte de uma latitude e longitude para um x, y ponto de pixel.
     pointCoordinate() converte de um ponto x, y para uma linha, coluna, coordenada de zoom.
     coordinatePoint() converte de uma linha, coluna, coordenada de zoom para um ponto x, y.
     locationCoordinate() converte de um local longo e lat para uma linha, coluna, coordenada de zoom.
     coordinateLocation() converte de uma linha, coluna, coordenada de zoom para um local longo e lat.

     // Converter pontos, localização e coordenada
     var l1 = new MM.Location(11.7, 42.5);
       // Dijbouti on screen:
       var p1 = map.locationPoint(l1);

       // some pixels in the map:
       var p2 = new MM.Point(100, 100);

       // the geographic location of p2:
       var l2 = map.pointLocation(p2);
     */

  }

}

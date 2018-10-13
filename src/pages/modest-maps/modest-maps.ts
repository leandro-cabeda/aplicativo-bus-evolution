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

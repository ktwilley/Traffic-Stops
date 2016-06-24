import Backbone from 'backbone';
import $ from 'jquery';

export default Backbone.Model.extend({
  constructor: function(){
    Backbone.Model.apply(this, arguments);
    this.listenTo(this.get("handler"), "dataLoaded", this.update);
    this.listenTo(this.get("handler"), "dataRequestFailed", this.showError);
    this.setDOM();
    this.loader_show();
    this.setDefaultChart();
  },
  setDOM: function(){
    this.svg = $(this.get("selector"));
    this.div = $(this.svg).parent();
  },
  loader_show: function(){
    this.loader_div = $('<div>')
        .append('<p>Loading ... <i class="fa fa-cog fa-spin"></i></p>')
        .prependTo(this.div);
  },
  showError: function(){
    this.loader_hide();
    this.error_div = $('<div class="bg-warning">')
        .append('<p>An error occurred in fetching the data.</p>')
        .prependTo(this.div);
  },
  loader_hide: function(){
    this.loader_div.remove();
  },
  update: function(data){
    if(data===undefined) return;  // temporary for dummy census data
    this.data = data;
    this.loader_hide();
    this.drawStartup();
    this.drawChart();
    $(document).on('raceToggle.change', this.triggerRaceToggle.bind(this));
  },
  drawStartup: function(){
    throw "abstract method: requires override";
  },
  drawChart: function(){
    throw "abstract method: requires override";
  },
  setDefaultChart: function(){
    throw "abstract method: requires override";
  },
  triggerRaceToggle: function(e, v){}
});

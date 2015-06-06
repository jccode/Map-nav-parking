
function svg_wrapper_size() {
    var el_wrapper = document.getElementById("svg-wrapper"), 
        style = el_wrapper.currentStyle || window.getComputedStyle(el_wrapper);
    return {
        "w": el_wrapper.offsetWidth,
        "h": el_wrapper.offsetHeight - (parseInt(style.paddingBottom, 10) + parseInt(style.paddingTop, 10))
    };
}

var margin = {top: -5, right: -5, bottom: -5, left: -5};

/**
 * Usage:
 *
 *      var svg =  new SVG(svgPath);
 *      svg.load(function() {
 *          // callback
 *      });
 *
 *
 * @param seat optional. if set, map will center to this seat.
 *
 */
function SVG(path) {
    this.path = path;
    
    var ws = svg_wrapper_size();
    this.width = ws["w"];
    this.height = ws["h"];

    this.zoom = d3.behavior.zoom()
        .scaleExtent([0.5, 5])
        .on('zoomstart', this.zoomstarted.bind(this))
        .on('zoom', this.zoomed.bind(this))
        .on('zoomend', this.zoomended.bind(this));

    this.svg = d3.select("#svg-wrapper").append("svg")
        .attr("width", this.width + margin.left + margin.right)
        .attr("height", this.height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.right + ")" )
        .call(this.zoom);
    
    this.rect = this.svg.append("rect")
        .attr('width', this.width)
        .attr('height', this.height)
        .style('fill', 'none')
        .style('pointer-events', 'all');

    this.container = this.svg.append('g');

    this.bind_resize();
}

SVG.prototype = {
    zoomstarted: function() {
        d3.event.sourceEvent && d3.event.sourceEvent.stopPropagation();
    },
    
    zoomended: function() {
    }, 

    zoomed: function() {
        this.container.attr("transform", "translate("+ d3.event.translate +") scale("+ d3.event.scale +")");
    },

    _load_svg: function(path, callback) {
        var self = this;
        d3.xml(path, 'image/svg+xml', function(xml) {
            self.innersvg = self.container.append('g')
                .append(function() {
                    return xml.documentElement;
                });

            callback && callback();
        }); 
    }, 

    load: function(fn) {
        this._load_svg(this.path, fn);
    }, 


    bind_resize: function() {
        var self = this;
        $(window).on('resize', function() {
            var ws = svg_wrapper_size();
            self.width = ws["w"];
            self.height = ws["h"];
            d3.select("#svg-wrapper").select("svg")
                .attr({
                    'width': self.width + margin.left + margin.right,
                    'height': self.height + margin.top + margin.bottom
                })
                .select('rect')
                .attr({
                    'width': self.width,
                    'height': self.height
                });
            
        });
        // end
    }

};


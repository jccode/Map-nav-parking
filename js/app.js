
var svg;

jQuery(function($) {

    // Load svg.
    svg = new SVG("../images/garage-animated.svg");
    svg.load(function() {
        console.log( 'svg loaded' );
    });


    // Zoom
    var manual_zoom = function(ratio) {
        svg.zoom.scale(ratio);
        svg.zoom.event(svg.svg);
    };
    
    var zoom_step = 0.1;
    $("#tZPSVGZoomIn0").on("click", function() {
        var ratio = svg.zoom.scale() - zoom_step;
        if(ratio > 0.5) {
            manual_zoom(ratio);
        }
    });

    $("#tZPSVGZoomOut0").on("click", function() {
        var ratio = svg.zoom.scale() + zoom_step;
        if(ratio < 5) {
            manual_zoom(ratio);
        }
    });


    /*
    var motion=document.createElementNS("http://www.w3.org/2000/svg","animateMotion");
    motion.setAttribute("xlink:href", "#arrow");
    motion.setAttribute("id", "pathanim");
    motion.setAttribute("dur", "10s");
    motion.setAttribute("fill", "freeze");
    motion.setAttribute("rotate", "auto");
    motion.setAttribute("begin", "1.5s"); // indefinite
    motion.setAttribute("repeatCount", "10s"); // indefinite
     */
    
    $("#showRoute").on("click", function() {
        
    });
    
});

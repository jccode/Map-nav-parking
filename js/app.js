

jQuery(function($) {

    // Load svg.
    var svg = new SVG("../images/garage-animated.svg");
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
    
    
    $("#showRoute").on("click", function() {
        $("#pathanim").get(0).beginElement(); 
    });
    
});

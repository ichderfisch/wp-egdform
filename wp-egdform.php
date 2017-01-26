<?php
/*
  Plugin Name: EGD Form
  Plugin URI: https://github.com/ichderfisch/wp-egdform
  Description: Plugin that adds a shortcode which outputs a player search within the European Go Database (EGD)
  Version: 0.0.1
  Author: Daniel Maslowski, Dennis Fischer
  Author URI: http://www.ichderfisch.de
*/

/**
 * Add CSS & JS
 */
function register_egdform_css_js() {

  // Register CSS
  wp_register_style( 'egdform', plugins_url( 'wp-egdform/css/style.css' ) );

  // Register JS
  wp_register_script(
    'egdform',
    plugins_url( 'wp-egdform/js/script.js' ),
    array( 'jquery' )
  );
  wp_register_script(
    'egdtable',
    plugins_url( 'wp-egdform/js/table.js' ),
    array( 'jquery' )
  );
  // Enqueue them all
  wp_enqueue_style( 'egdform' );
  wp_enqueue_script( 'egdform' );
  wp_enqueue_script( 'egdtable' );
}

add_action( 'wp_enqueue_scripts', 'register_egdform_css_js' );



// Add Shortcode
function show_egdform_results( $atts ) {

	// Attributes
	$atts = shortcode_atts(array(), $atts);
  
  $bracketIdCssUrl = 'http://www.eurogofed.org/newick/tournament.css?id=' . $atts['id'];
  $bracketIdJsUrl = 'http://www.eurogofed.org/newick/script.js?id=' . $atts['id'];
	
	$output = ' <div class="egd-search">
                <div class="egd-search__form">
                <span class="egd-search__helper">Find your EGD ID:</span>
                <label class="egd-search__label visually-hidden" for="egd-first-name">First name</label>
                <input class="egd-search__input" id="egd-first-name" placeholder="First name"/>
                <label class="egd-search__label visually-hidden" for="egd-last-name">Last name</label>
                <input class="egd-search__input" id="egd-last-name" placeholder="Last Name"/>
                <button id="egd-find-id" class="fusion-button button-default button-small">Search</button>
                <img id="edg-spinner" src="http://localhost/wp-includes/images/spinner-2x.gif" style="display: none;" />
              </div>
            </div>
            <ul id="egd-search-results"></ul>';
	
	return $output;

}

add_shortcode( 'egd-form', 'show_egdform_results' );

?>

/*global define */
define( function() {
	
	/**
	 * @class ui.Html
	 * @singleton
	 * 
	 * Utility class for doing html/text transformations.
	 */
	var Html = {
		
		/**
		 * Converts certain characters (&, <, >, and ") to their HTML entity equivalents for literal display in web pages, and for
		 * using HTML strings within HTML attributes.
		 * 
		 * @method encode
		 * @param {String} value The string to encode
		 * @return {String} The encoded text
		 */
		encode : function( value ) {
			return !value ? value : String( value ).replace( /&/g, "&amp;" ).replace( />/g, "&gt;" ).replace( /</g, "&lt;" ).replace( /"/g, "&quot;" );
		},
		
		
		/**
		 * Converts certain characters (&, <, >, and ") from their HTML entity equivalents.
		 * 
		 * @method decode
		 * @param {String} value The string to decode
		 * @return {String} The decoded text
		 */
		decode : function( value ) {
			return !value ? value : String( value ).replace( /&gt;/g, ">" ).replace( /&lt;/g, "<" ).replace( /&quot;/g, '"' ).replace( /&amp;/g, "&" ).replace( /&nbsp;/g, " " );
		},
		
		
		/**
		 * Returns the html with all tags stripped.
		 * 
		 * @method stripTags
		 * @param {String} v The html to be stripped.
		 * @return {String} The resulting text.
		 */
		stripTags : function( v ) {
			return !v ? v : String( v ).replace( /<[^>]+>/g, "" );
		},
		
		
		/**
		 * Replace newlines with &lt;br /&gt; tags
		 * 
		 * @method nl2br
		 * @param {String} text The text to convert newlines into &lt;br /&gt; tags.
		 * @return {String} The converted text.
		 */
		nl2br : function( text ) {
			return text.replace( /\n/g, "<br />" );
		}
		
	};
	
	return Html;
	
} );
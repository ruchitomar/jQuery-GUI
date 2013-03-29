/*global define, describe, beforeEach, afterEach, it, expect */
/*jshint loopfunc:true */
define( [
	'jquery',
	'lodash',
	'ui/form/field/Text'
], function( jQuery, _, TextField ) {
	
	describe( '.ui.form.field.Text', function() {
		
		describe( "Test the 'change' Event", function() {
			
			it( "Setting the initial value to the field should *not* fire the 'change' event", function() {
				for( var rendered = 0; rendered <= 1; rendered++ ) {
					var eventFired = false;
					
					var textField = new TextField( {
						renderTo: ( rendered ) ? document.body : undefined,
						value : "test value",
						listeners : { 'change' : function() { eventFired = true; } } 
					} );
					
					expect( eventFired ).toBe( false );  // orig YUI Test err msg: "rendered = " + !!rendered
					
					textField.destroy();  // clean up
				}
			} );
			
			
			it( "Setting the value after instantiation time should fire the 'change' event exactly once", function() {
				for( var rendered = 0; rendered <= 1; rendered++ ) {
					var eventFiredCount = 0;
					
					var textField = new TextField( {
						renderTo: ( rendered ) ? document.body : undefined,
						listeners : { 'change' : function() { eventFiredCount++; } }
					} );
					
					textField.setValue( "test value" );
					expect( eventFiredCount ).toBe( 1 );  // orig YUI Test err msg: "rendered = " + !!rendered
					
					textField.destroy();  // clean up
				}
			} );
			
		} );
		
		
		describe( "Test the Setting of the Initial Value", function() {
			
			it( "The initial value should be normalized into a string, even if its a non-string value", function() {
				for( var rendered = 0; rendered <= 1; rendered++ ) {
					var textField = new TextField( {
						renderTo: ( rendered ) ? document.body : undefined,
						value : undefined
					} );
					expect( textField.getValue() ).toBe( "" );  // orig YUI Test err msg: "undefined should convert to empty string. rendered = " + !!rendered
					textField.destroy();  // clean up
					
					
					textField = new TextField( {
						renderTo: ( rendered ) ? document.body : undefined,
						value : null
					} );
					expect( textField.getValue() ).toBe( "" );  // orig YUI Test err msg: "null should convert to empty string. rendered = " + !!rendered
					textField.destroy();  // clean up
					
					
					textField = new TextField( {
						renderTo: ( rendered ) ? document.body : undefined,
						value : 0
					} );
					expect( textField.getValue() ).toBe( "0" );  // orig YUI Test err msg: "The number 0 should convert to its string representation. rendered = " + !!rendered 
					textField.destroy();  // clean up
					
					
					textField = new TextField( {
						renderTo: ( rendered ) ? document.body : undefined,
						value : 1
					} );
					expect( textField.getValue() ).toBe( "1" );  // orig YUI Test err msg: "The number 1 should convert to its string representation. rendered = " + !!rendered
					textField.destroy();  // clean up
					
					
					textField = new TextField( {
						renderTo: ( rendered ) ? document.body : undefined,
						value : true
					} );
					expect( textField.getValue() ).toBe( "true" );  // orig YUI Test err msg: "The boolean true should convert to its string representation. rendered = " + !!rendered
					textField.destroy();  // clean up
					
					
					textField = new TextField( {
						renderTo: ( rendered ) ? document.body : undefined,
						value : false
					} );
					expect( textField.getValue() ).toBe( "false" );  // orig YUI Test err msg: "The boolean false should convert to its string representation. rendered = " + !!rendered
					textField.destroy();  // clean up
					
					
					textField = new TextField( {
						renderTo: ( rendered ) ? document.body : undefined,
						value : ""
					} );
					expect( textField.getValue() ).toBe( "" );  // orig YUI Test err msg: "A empty string value should have remained an empty string value. rendered = " + !!rendered
					textField.destroy();  // clean up
					
					
					textField = new TextField( {
						renderTo: ( rendered ) ? document.body : undefined,
						value : "asdf"
					} );
					expect( textField.getValue() ).toBe( "asdf" );  // orig YUI Test err msg: "A string value should have remained a string value. rendered = " + !!rendered
					textField.destroy();  // clean up
					
					
					textField = new TextField( {
						renderTo: ( rendered ) ? document.body : undefined,
						value : {}
					} );
					expect( textField.getValue() ).toBe( "[object Object]" );  // orig YUI Test err msg: "An object should have been converted to its string value (toString() called). rendered = " + !!rendered
					textField.destroy();  // clean up
					
					
					textField = new TextField( {
						renderTo: ( rendered ) ? document.body : undefined,
						value : { toString: function() { return "my object"; } }
					} );
					expect( textField.getValue() ).toBe( "my object" );  // orig YUI Test err msg: "An object should have been converted to its string value (toString() called). rendered = " + !!rendered
					textField.destroy();  // clean up
				}
			} );
			
			
			it( "Setting the initial value to characters that are HTML entities should work correctly", function() {
				for( var rendered = 0; rendered <= 1; rendered++ ) {
					var textField = new TextField( {
						renderTo : ( rendered ) ? document.body : undefined,
						value : "\"quoted\". stuff&stuff. this<that>those"
					} );
					
					expect( textField.getValue() ).toBe( "\"quoted\". stuff&stuff. this<that>those" );  // orig YUI Test err msg: "rendered = " + !!rendered
					
					textField.destroy();  // clean up
				}
			} );
			
		} );
		
		
		describe( "Test setValue()", function() {
			
			it( "setValue() should normalize non-strings into strings", function() {
				for( var rendered = 0; rendered <= 1; rendered++ ) {
					var textField = new TextField( {
						renderTo: ( rendered ) ? document.body : undefined
					} );
					
					textField.setValue( undefined );
					expect( textField.getValue() ).toBe( "" );  // orig YUI Test err msg: "undefined should have been converted into an empty string. rendered = " + !!rendered
					
					textField.setValue( null );
					expect( textField.getValue() ).toBe( "" );  // orig YUI Test err msg: "null should have been converted into an empty string. rendered = " + !!rendered
					
					textField.setValue( 0 );
					expect( textField.getValue() ).toBe( "0" );  // orig YUI Test err msg: "the number 0 should have been converted into its string form. rendered = " + !!rendered
					
					textField.setValue( 1 );
					expect( textField.getValue() ).toBe( "1" );  // orig YUI Test err msg: "the number 1 should have been converted into its string form. rendered = " + !!rendered
					
					textField.setValue( true );
					expect( textField.getValue() ).toBe( "true" );  // orig YUI Test err msg: "boolean true should have been converted into its string form. rendered = " + !!rendered
					
					textField.setValue( false );
					expect( textField.getValue() ).toBe( "false" );  // orig YUI Test err msg: "boolean false should have been converted into its string form. rendered = " + !!rendered
					
					textField.setValue( "" );
					expect( textField.getValue() ).toBe( "" );  // orig YUI Test err msg: "an empty string should have remained an empty string. rendered = " + !!rendered
					
					textField.setValue( "asdf" );
					expect( textField.getValue() ).toBe( "asdf" );  // orig YUI Test err msg: "any actual string should have remained the same. rendered = " + !!rendered
					
					textField.setValue( {} );
					expect( textField.getValue() ).toBe( "[object Object]" );  // orig YUI Test err msg: "an object should have been converted to its string form '[object Object]'. rendered = " + !!rendered
					
					textField.setValue( { toString: function() { return "my object"; } } );
					expect( textField.getValue() ).toBe( "my object" );  // orig YUI Test err msg: "an object with a toString() method should have been converted to its return value from its toString() method. rendered = " + !!rendered
					
					// clean up
					textField.destroy(); 
				}
			} );
			
		} );
		
		
		describe( "Test normalizeValue()", function() {
			
			it( "normalizeValue() should handle all datatypes", function() {
				var normalizeValue = TextField.prototype.normalizeValue;
				
				expect( normalizeValue( undefined ) ).toBe( "" );  // orig YUI Test err msg: "undefined should have been converted into an empty string"
				expect( normalizeValue( null ) ).toBe( "" );  // orig YUI Test err msg: "null should have been converted into an empty string"
				expect( normalizeValue( 0 ) ).toBe( "0" );  // orig YUI Test err msg: "the number 0 should have been converted into its string form"
				expect( normalizeValue( 1 ) ).toBe( "1" );  // orig YUI Test err msg: "the number 1 should have been converted into its string form"
				expect( normalizeValue( true ) ).toBe( "true" );  // orig YUI Test err msg: "boolean true should have been converted into its string form"
				expect( normalizeValue( false ) ).toBe( "false" );  // orig YUI Test err msg: "boolean false should have been converted into its string form"
				expect( normalizeValue( "" ) ).toBe( "" );  // orig YUI Test err msg: "an empty string should have remained an empty string"
				expect( normalizeValue( "asdf" ) ).toBe( "asdf" );  // orig YUI Test err msg: "any actual string should have remained the same"
				expect( normalizeValue( {} ) ).toBe( "[object Object]" );  // orig YUI Test err msg: "an object should have been converted to its string form '[object Object]'"
				expect( normalizeValue( { toString: function() { return "my object"; } } ) ).toBe( "my object" );  // orig YUI Test err msg: "an object with a toString() method should have been converted to its return value from its toString() method"
			} );
			
		} );
		
		
		describe( "Test the emptyText functionality", function() {
			
			it( "A TextField with emptyText and no initial value should initially have the value of the emptyText", function() {
				for( var rendered = 0; rendered <= 1; rendered++ ) {
					var textField = new TextField( {
						renderTo: ( rendered ) ? document.body : undefined,
						emptyText : "test empty text"
					} );
					
					expect( textField.getValue() ).toBe( "test empty text" );  // orig YUI Test err msg: "rendered = " + !!rendered
					
					textField.destroy();  // clean up
				}
			} );
			
			
			it( "A TextField which has emptyText and restoreEmptyText=false, and then is set to empty string afterward should return empty string", function() {
				for( var rendered = 0; rendered <= 1; rendered++ ) {
					var textField = new TextField( {
						renderTo: ( rendered ) ? document.body : undefined,
						emptyText : "test empty text",
						restoreEmptyText: false
					} );
					
					// Set to empty string after initialization
					textField.setValue( "" );
					expect( textField.getValue() ).toBe( "" );  // orig YUI Test err msg: "rendered = " + !!rendered
					
					textField.destroy();  // clean up
				}
			} );
			
		} );
		
		
		describe( "Test setting the 'inputName' config", function() {
			
			it( "The 'for' of the label and the 'name' of the field should match the 'inputName' when set", function() {
				var textField = new TextField( {
					renderTo: document.body,
					inputName: 'foo'
				} );
				
				var $container = textField.getEl(),
					$label = $container.find( 'label' ),
					$input = $container.find( 'input' );
				
				expect( 1 ).toEqual( $label.length );  // orig YUI Test err msg: "there should be exactly one label"
				expect( 1 ).toEqual( $input.length );  // orig YUI Test err msg: "there should be exactly one input"
				expect( 'foo' ).toEqual( $label.attr( 'for' ) );  // orig YUI Test err msg: "the label's 'for' attribute should match the 'inputName'"
				expect( 'foo' ).toEqual( $input.attr( 'name' ) );  // orig YUI Test err msg: "the input's 'name' attribute should match the 'inputName'"
				
				textField.destroy();  // clean up
			} );
			
		} );
		
	} );
	
} );
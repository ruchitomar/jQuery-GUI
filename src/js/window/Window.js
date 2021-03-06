/*global define */
define( [
	'jquery',
	'lodash',
	'gui/ComponentManager',
	'gui/Overlay'
], function( jQuery, _, ComponentManager, Overlay ) {
	
	/**
	 * @class gui.window.Window
	 * @extends gui.Overlay
	 * @alias type.window
	 * 
	 * Basic class for creating a window (also known as a dialog). As a subclass of {@link gui.panel.Panel Panel}, the Window
	 * may accept a {@link #title}, and it also adds a {@link #closeButton close button} to the top right  
	 */
	var Window = Overlay.extend( {
		
		/**
		 * @cfg {Boolean} closeButton
		 * 
		 * `true` to show the close button on the top right, `false` to hide it.
		 */
		closeButton : true,
		
		/**
		 * @cfg {Boolean} modal
		 * 
		 * `true` to make this window a modal window (as opposed to a modeless window). When the Window is modal,
		 * a mask is placed behind it, covering the rest of the document as to force the user to interact with 
		 * the Window until it is hidden.
		 */
		modal : false,
		
		/**
		 * @cfg {String} closeAction
		 * 
		 * The action to take when the {@link #closeButton} is clicked, or the Window is closed by the 'esc' button.
		 * Acceptable values are: 
		 * 
		 * - `'{@link #method-destroy}'`: Destroys the Window for automatic cleanup from the DOM. The Window will not be available to
		 *   be shown again using the {@link #method-show} method.
		 *    
		 * - `'{@link #method-hide}'`: Hides the Window. The Window will be available to be shown again using the {@link #method-show} method.
		 *   The Window must be manually {@link #method-destroy destroyed} when it is no longer needed.
		 */
		closeAction : 'destroy',
		
		/**
		 * @cfg {Boolean} closeOnEscape
		 * 
		 * `true` to have the Window close when the 'esc' key is pressed. Set to `false` to disable this behavior. The action taken (whether
		 * the Window is {@link #method-destroy destroyed} or simply {@link #method-hide hidden}) is governed by the {@Link #closeAction} config.
		 */
		closeOnEscape : true,
		
		/**
		 * @cfg
		 * @inheritdoc
		 */
		baseCls : 'gui-window',
		
		/**
		 * @cfg
		 * @inheritdoc
		 */
		x : 'center',
		
		/**
		 * @cfg
		 * @inheritdoc
		 */
		y : 'center',
		
		
		/**
		 * @protected
		 * @property {jQuery} $modalMaskEl
		 * 
		 * The element that is used to mask the document when the Window is shown, and {@link #modal} is enabled.
		 * This will only be created when the Window is shown the first time.
		 */
		
		/**
		 * @private
		 * @property {Function} maskResizeHandler
		 * 
		 * The bound handler function that is a handler of the window resize event, which resizes the {@link #$modalMaskEl}
		 * when the browser window is resized.
		 */
		
		
		/**
		 * @inheritdoc
		 */
		initComponent : function() {
			// Add the close button if the config is true
			if( this.closeButton ) {
				this.toolButtons = ( this.toolButtons || [] ).concat( {
					toolType : 'close',
					
					handler  : this.doClose,
					scope    : this
				} );
			}
			
			this._super( arguments );
		},
		
		
		/**
		 * @inheritdoc
		 */
		onRender : function() {
			this._super( arguments );
			
			// If the closeOnEscape config is true, set up a keydown event for it to close the overlay.
			if( this.closeOnEscape ) {
				var me = this;  // for closure
				this.$el.keyup( function( evt ) {
					if( evt.keyCode === 27 && me.closeOnEscape ) {  // 27 == 'esc' char
						me.doClose();
					}
				} );
			}
			
			// Set up a handler to resize the modal mask, if enabled
			if( this.modal ) {
				this.maskResizeHandler = _.debounce( _.bind( this.resizeModalMask, this ), 100, { maxWait: 300 } );
				jQuery( window ).on( 'resize', this.maskResizeHandler );
			}
		},
		
		
		/**
		 * Extension of hook method from superclass, which shows the {@link #modal} mask, if enabled.
		 * 
		 * @protected
		 * @param {Object} options The options object which was originally provided to the {@link #method-show} method.
		 */
		onShow : function( options ) {
			this._super( arguments );
			
			if( this.modal ) {
				var $modalMaskEl = this.$modalMaskEl;
				
				if( !$modalMaskEl ) {
					$modalMaskEl = this.$modalMaskEl = this.createModalMaskEl();
				}
				$modalMaskEl.appendTo( 'body' );  // make sure it is appended to the body (it is detached on hide)
				this.resizeModalMask();
				
				$modalMaskEl.show();
			}
		},
		
		
		/**
		 * Sizes the modal mask to the browser window's size.
		 * 
		 * @protected
		 */
		resizeModalMask : function() {
			var $modalMaskEl = this.$modalMaskEl;
			
			// Only size it if the window is shown, and the element has been created
			if( this.isVisible() && $modalMaskEl ) {
				var $window = jQuery( window );
				this.$modalMaskEl.css( {
					width  : $window.width(),
					height : $window.height()
				} );
			}
		},
		

		/**
		 * Extension of hook method from superclass, which hides the {@link #modal} mask, if enabled.
		 * 
		 * @protected
		 * @param {Object} options The options object which was originally provided to the {@link #method-hide} method.
		 */
		onHide : function( options ) {
			if( this.modal ) {
				this.$modalMaskEl.detach();
			}
			
			this._super( arguments );
		},
		
		
		/**
		 * Creates the {@link #$modalMaskEl}, for use when the Window is set to be {@link #modal}.
		 * 
		 * @protected
		 * @return {jQuery} The modal masking element, which is appended to the document body.
		 */
		createModalMaskEl : function() {
			return jQuery( '<div class="' + this.baseCls + '-modalMask" />' );
		},
		
		
		/**
		 * Protected method which handles the {@link #closeAction} of the Window.
		 * 
		 * @protected
		 */
		doClose : function() {
			this.hide();
				
			if( this.closeAction === 'destroy' ) {
				if( this.hiding )  // in the process of hiding (i.e. animating its hide), then wait until it's complete before destroying
					this.on( 'afterhide', function() { this.destroy(); }, this );  // don't call destroy() with any arguments
				else 
					this.destroy();
			}
		},
		
		
		// -----------------------------------
		
		
		/**
		 * @inheritdoc
		 */
		onDestroy : function() {
			if( this.$modalMaskEl ) {
				this.$modalMaskEl.remove();
			}
			
			if( this.maskResizeHandler ) {
				jQuery( window ).off( 'resize', this.maskResizeHandler );
			}
			
			this._super( arguments );
		}
		
	} );
	
	
	ComponentManager.registerType( 'window', Window );
	
	return Window;
	
} );
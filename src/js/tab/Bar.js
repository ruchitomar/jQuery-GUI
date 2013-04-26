/*global define */
define( [
	'jqc/ComponentManager',
	'jqc/Container',
	'jqc/tab/Tab'
], function( ComponentManager, Container, Tab ) {
	
	/**
	 * @class jqc.tab.Bar
	 * @extends jqc.Container
	 * @alias type.tabbar
	 * 
	 * Specialized container for a {@link jqc.tab.Panel Tab Panel's} tabs.
	 */
	var TabBar = Container.extend( {
		
		/**
		 * @cfg
		 * @inheritdoc
		 */
		defaultType : 'tab',
		
		/**
		 * @cfg
		 * @inheritdoc
		 */
		componentCls : 'jqc-TabPanel-Bar',
		
		
		/**
		 * Sets the "active" tab based on the given activated {@link jqc.panel.Panel Panel} which corresponds
		 * to it.
		 * 
		 * @param {jqc.panel.Panel} panel The Panel that corresponds to the Tab that should be made active.
		 * @chainable
		 */
		setActiveTab : function( panel ) {
			var tabs = this.getItems(), 
			    tab;
			
			for( var i = 0, len = tabs.length; i < len; i++ ) {
				tab = tabs[ i ];
				
				tab[ ( tab.getCorrespondingPanel() === panel ) ? 'setActive' : 'setInactive' ]();
			}
			return this;
		}
		
	} );
	
	
	ComponentManager.registerType( 'tabbar', TabBar );
	
	return TabBar;
	
} );
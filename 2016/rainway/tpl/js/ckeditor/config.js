/*
Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.editorConfig = function( config )
{
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = 'pink';
	 config.width = '800px';
	
	config.filebrowserBrowseUrl = '/tpl/js/ckfinder/ckfinder.html';
	config.filebrowserImageBrowseUrl = '/tpl/js/ckfinder/ckfinder.html?type=Images';
	config.filebrowserFlashBrowseUrl = '/tpl/js/ckfinder/ckfinder.html?type=Flash';
	config.filebrowserUploadUrl = '/tpl/js/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files';
	config.filebrowserImageUploadUrl = '/tpl/js/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images';
	config.filebrowserFlashUploadUrl = '/tpl/js/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Flash';
	
};


CKEDITOR.on( 'dialogDefinition', function( ev )
{
    // Take the dialog name and its definition from the event data.
    var dialogName = ev.data.name;
    var dialogDefinition = ev.data.definition;

    // Check if the definition is from the dialog window you are interested in (the "Image" dialog window).
    if ( dialogName == 'image' )
    {
        // Get a reference to the "Image Advanced" tab.
        var infoTab = dialogDefinition.getContents( 'advanced' );

        var cssField = infoTab.get( 'txtGenClass' );
        cssField['default'] = 'dshpFancy';
    }
}); 

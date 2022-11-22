


CKEDITOR.dialog.add('youtube-widget', function (editor) {
    return {
        title: "YouTube Video",  //Title bar of the floating dialog
        minWidth: 500, //Width/Height attributes of the dialog
        minHeight: 200,
        contents: //This should be an array of objects, separated by a comma:  contents: [{ tab1 : [{ elements }], tab2 : [{ elements }], tab3 : [{ elements }] }], using object notation
            [{
                id: 'youtubeTab', //this is the id of the tab itself.  You can add more tabs
                expand: true,
                elements:
                    [{
                        id: 'txtEmbed', //id of the first element in the first tab
                        type: 'textarea', //textarea/textbox/select, etc.
                        label: "Embed", //text label visible by user
                        autofocus: 'autofocus',  //optional - autofocuses this input
                        //This part validates the input - this custom widget looks for empty string, and "http://something"
                        validate: function () {
                            if (this.isEnabled()) {
                                if (!this.getValue()) {
                                    alert("Empty");
                                    return false;
                                }
                                else
                                    if (this.getValue().length === 0 || this.getValue().indexOf('//') === -1) {
                                        alert("No video.");
                                        return false;
                                    }
                            }
                        },
                        //Extremely important - this sets the value of the textarea to our data.youtubeVideo that we instantiated in the "init" function in "plugin.js"
                        //Basically, it sets the value of the input when the user edits the widget
                        setup: function (widget) {
                            this.setValue(widget.data.youtubeVideo);
                        },
                        //Necessary to do *anything* with this dialog - sets the widget.data.youtubeVideo to the value in the textarea
                        commit: function (widget) {
                            widget.setData('youtubeVideo', this.getValue());
                        }
                    }]
            }]
    };
});



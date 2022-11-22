function setDocumentUsers(documentUsers = []) {

    console.log(documentUsers)
    for (let documentUser of documentUsers) {
        CKEDITOR.dialog.getCurrent().getContentElement("signatureDate", "_cke_saved_filled_by").add(documentUser.name, documentUser.value)
    }
}

CKEDITOR.dialog.add('signatureDateDialog', function (editor) {
    function autoCommit(data) {
        var element = data.element;
        var value = this.getValue();

        value ? element.setAttribute(this.id, value) : element.removeAttribute(this.id);
    }

    function autoSetup(element) {
        var value = element.hasAttribute(this.id) && element.getAttribute(this.id);
        this.setValue(value || '');
    }

    return {
        title: 'Date Signed',
        minWidth: 350,
        minHeight: 150,
        getModel: function (editor) {
            var element = editor.getSelection().getSelectedElement();

            if (element && element.getName() == 'input' &&
                element.getAttribute('type') == 'date' && element.getAttribute('field-type') == "DATE_SIGNED") {
                return element;
            }

            return null;
        },
        onShow: function () {

            var element = this.getModel(this.getParentEditor());

            if (element) {
                this.setupContent(element);
            }
        },
        onOk: function () {
            var editor = this.getParentEditor(),
                element = this.getModel(editor),
                isInsertMode = this.getMode(editor) == CKEDITOR.dialog.CREATION_MODE;

            if (isInsertMode) {
                element = editor.document.createElement('input');
                element.setAttribute('type', 'date');
                element.setAttribute('field-type', 'DATE_SIGNED');

            }

            var data = { element: element };

            if (isInsertMode) {
                editor.insertElement(data.element);
            }

            this.commitContent(data);

            // Element might be replaced by commitment.
            if (!isInsertMode) {
                editor.getSelection().selectElement(data.element);
            }
        },
        onLoad: function (editor) {
            setDocumentUsers(this._.editor.config.documentUsers)
            this.foreach(function (contentObj) {
                if (contentObj.getValue) {
                    if (!contentObj.setup)
                        contentObj.setup = autoSetup;
                    if (!contentObj.commit)
                        contentObj.commit = autoCommit;
                }
            });
        },
        contents: [{
            id: 'signatureDate',
            label: 'Signature Date',
            title: 'Singature Date',
            elements: [{
                type: 'hbox',
                widths: ['50%', '50%'],
                children: [{
                    id: '_cke_saved_name',
                    type: 'text',
                    label: 'Name',
                    'default': '',
                    accessKey: 'N',
                    setup: function (element) {
                        this.setValue(element.data('cke-saved-name') || element.getAttribute('data-name') || '');
                    },
                    commit: function (data) {

                        var element = data.element;
                        if (this.getValue()) {
                            element.data('cke-saved-name', this.getValue());
                            element.data('name', this.getValue());
                            data._cke_saved_name = this.getValue()
                            data.name = this.getValue()
                        }
                        else {
                            element.data('cke-saved-name', false);
                            element.removeAttribute('name');
                        }
                    },
                    validate: function () {
                        if (!this.getValue()) {
                            alert("Name could not be empty")
                            return false;
                        }
                    }
                },
                {
                    id: '_cke_saved_filled_by',
                    type: 'select',
                    label: 'Filled By',
                    'default': '',
                    accessKey: 'N',
                    items: [

                    ],
                    setup: function (element) {

                        this.setValue(element.data('cke-saved-filled-by') || element.getAttribute('filled-by') || '');
                    },
                    commit: function (data) {

                        var element = data.element;
                        if (this.getValue()) {
                            element.data('cke-saved-filled-by', this.getValue());
                            element.data('filled_by', this.getValue());
                            data._cke_saved_filled_by = this.getValue()
                            data.filled_by = this.getValue()
                        }
                        else {
                            element.data('cke-saved-name', false);
                            element.removeAttribute('cke-saved-filled-by');
                        }
                    },
                    validate: function () {
                        if (!this.getValue()) {
                            alert("Filled By could not be empty")
                            return false;
                        }
                    }
                }

                ]
            }]
        }]
    };
});




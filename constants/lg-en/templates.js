export default {

    allFields: [
        {
            name: "Single Line Text",
            inputType: "SINGLE_LINE_TEXT",
            type: "FIELD",
            min_height: 25,
            min_width: 120,

            max_height: 100,
            max_width: 400,

            height: 70,
            width: 200,
            img_url: "SingleLine.svg",
            filled_by: "SENDER",
            components: {
                view: "SingleLineTextView",
                edit: "SingleLineText",
                execute: "SingleLineTextExecute"
            }
        },
        {
            name: "Multi Line Text",
            inputType: "MULTI_LINE_TEXT",
            type: "FIELD",
            min_height: 70,
            min_width: 200,

            max_width: 800,
            max_height: 700,
            height: 100,
            width: 200,
            img_url: "MultiLine.svg",
            filled_by: "SENDER",
            components: {
                view: "MultiLineTextView",
                edit: "MultiLineText",
                execute: "MultiLineTextExecute"
            }
        },
        {
            name: "Select",
            inputType: "SELECT",
            type: "FIELD",
            min_height: 70,

            min_width: 200,

            max_height: 100,
            max_width: 400,

            height: 70,
            width: 200,
            img_url: "Select.svg",
            filled_by: "SENDER",
            components: {
                view: "SelectView",
                edit: "Select",
                execute: "SelectExecute"
            }
        },
        {
            name: "Multiple Select",
            inputType: "MULTI_SELECT",
            type: "FIELD",
            min_height: 70,
            min_width: 200,

            max_height: 100,
            max_width: 400,

            height: 70,
            width: 200,
            img_url: "MultiSelect.svg",
            filled_by: "SENDER",
            components: {
                view: "MultiSelectTextView",
                edit: "MultiSelectText",
                execute: "MultiSelectTextExecute"
            }
        },
        {
            name: "Number",
            inputType: "NUMBER",
            type: "FIELD",
            min_height: 70,
            min_width: 120,
            max_height: 100,
            max_width: 400,

            height: 70,
            width: 200,
            img_url: "Number.svg",
            filled_by: "SENDER",
            components: {
                view: "NumberView",
                edit: "Number",
                execute: "NumberExecute"
            }
        },
        {
            name: "Date",
            inputType: "DATE",
            type: "FIELD",
            min_height: 70,
            min_width: 200,

            max_height: 100,
            max_width: 400,
            filled_by: "SENDER",

            height: 70,
            width: 200,
            img_url: "Date.svg",
            components: {
                view: "DateView",
                edit: "Date",
                execute: "DateExecute"
            }
        },
        {
            name: "Yes or No",
            inputType: "YES_OR_NO",
            min_height: 70,
            type: "FIELD",
            min_width: 200,

            max_height: 100,
            max_width: 500,

            height: 70,
            width: 200,
            img_url: "YesNo.svg",
            filled_by: "SENDER",
            components: {
                view: "YesOrNoView",
                edit: "YesOrNo",
                execute: "YesOrNoExecute"
            }
        },
        {
            name: "Checkbox",
            inputType: "CHECKBOX",
            filled_by: "SENDER",
            type: "FIELD",
            min_height: 25,
            min_width: 25,

            max_height: 80,
            max_width: 80,

            height: 25,
            width: 25,
            img_url: "CheckBox.svg",
            components: {
                view: "CheckboxView",
                edit: "Checkbox",
                execute: "CheckboxExecute"
            }
        },
        {
            name: "Document",
            inputType: "FILE",
            min_height: 90,
            max_height: 120,
            max_width: 500,
            min_width: 200,
            height: 90,
            filled_by: "SENDER",

            width: 200,
            img_url: "File.svg",
            components: {
                view: "FileView",
                edit: "File",
                execute: "FileExecute"
            }
        },
        {
            name: "Heading",
            inputType: "HEADING",
            type: "CONTENT",
            min_height: 25,
            min_width: 200,
            img_url: "Heading.svg",
            components: {
                view: "HeadingView",
                edit: "Heading",
                execute: "HeadingExecute"
            }
        },
        {
            name: "Signature",
            inputType: "SIGNATURE",
            type: "FIELD",
            min_height: 90,
            max_height: 120,
            filled_by: "SENDER",

            max_width: 300,
            min_width: 200,
            height: 90,
            width: 200,
            img_url: "Signature.svg",
            components: {
                view: "ESignatureView",
                edit: "ESignature",
                execute: "ESignatureExecute"
            }
        },
        {
            name: "Global Variable",
            inputType: "GLOBAL_VARIABLE",
            type: "FIELD",
            filled_by: "SENDER",

            min_height: 90,
            max_height: 120,
            max_width: 500,
            min_width: 200,
            height: 90,
            width: 200,
            dialog_width: "100%",

            img_url: "Signature.svg",
            dialog_fullscreen: true,
            dialog_customClass: "glodal-variable-dialog",

            components: {
                view: "GlobalVariableView",
                edit: "GlobalVariable",
                execute: "GlobalVariableExecute"
            }
        },
        {
            name: "Entity Variable",
            inputType: "ENTITY_VARIABLE",
            type: "FIELD",
            min_height: 90,
            max_height: 120,
            max_width: 500,
            min_width: 200,
            height: 90,
            filled_by: "SENDER",

            width: 200,
            img_url: "glodal_variable.svg",
            components: {
                view: "EntityVariableView",
                edit: "EntityVariable",
                execute: "EntityVariableExecute"
            }
        },
        {
            name: "Paragraph",
            inputType: "PARAGRAPH",
            type: "CONTENT",
            min_height: 25,
            max_height: 2000,
            max_width: 2000,
            min_width: 200,
            height: 400,
            filled_by: "SENDER",

            width: 600,
            img_url: "Signature.svg",
            components: {
                view: "ParagraphView",
                edit: "Paragraph",
                execute: "ParagraphExecute"
            }
        },
        {
            name: "Single Line Content",
            inputType: "SINGLE_LINE_CONTENT",
            type: "CONTENT",
            min_height: 25,
            max_height: 40,
            max_width: 2000,
            min_width: 200,
            height: 40,


            width: 500,
            img_url: "Signature.svg",
            components: {
                view: "SingleLineContentView",
                edit: "SingleLineContent",
                execute: "SingleLineContentExecute"
            }
        },
        {
            name: "Authorized Signature",
            inputType: "AUTHORIZED_SIGNATURE",
            type: "CONTENT",
            min_height: 140,
            max_height: 320,
            max_width: 500,
            min_width: 200,
            height: 140,
            width: 200,
            img_url: "Signature.svg",
            components: {
                view: "AuthorizedSignatureView",
                edit: "AuthorizedSignature",
                execute: "AuthorizedSignatureExecute"
            }
        },
        {
            name: "Image",
            inputType: "IMAGE",
            type: "CONTENT",
            min_height: 1,
            max_height: 6000,
            max_width: 6000,
            min_width: 100,
            height: 1,
            width: 100,
            img_url: "File.svg",
            components: {
                view: "ImageView",
                edit: "Image",
                execute: "ImageExecute"
            }
        },
        {
            name: "Video",
            inputType: "VIDEO",
            type: "CONTENT",
            min_height: 100,
            max_height: 6000,
            max_width: 6000,
            min_width: 100,
            height: 100,
            width: 100,
            img_url: "File.svg",
            components: {
                view: "VideoView",
                edit: "Video",
                execute: "VideoExecute"
            }
        },
        {
            name: "Formula",
            inputType: "FORMULA",
            type: "FIELD",
            min_height: 90,
            max_height: 120,
            max_width: 500,
            min_width: 200,
            height: 90,
            width: 200,
            img_url: "Number.svg",
            dialog_fullscreen: true,
            components: {
                view: "FormulaView",
                edit: "Formula",
                execute: "FormulaExecute"
            }
        },
        {
            name: "Action Button",
            inputType: "ACTION_BUTTON",
            type: "CONTENT",
            min_height: 15,
            max_height: 120,
            max_width: 500,
            min_width: 50,
            height: 30,
            width: 200,
            img_url: "Number.svg",
            components: {
                view: "ActionButtonView",
                edit: "ActionButton",
                execute: "ActionButtonExecute"
            }
        },
        {
            name: "HTML",
            inputType: "HTML_CONTENT",
            type: "CONTENT",
            min_height: 70,
            min_width: 200,

            max_height: 1000,
            max_width: 4000,

            height: 70,
            width: 200,
            components: {
                view: "HtmlView",
                edit: "Html",
                execute: "HtmlExecute"
            }
        },
        {
            name: "Divider",
            inputType: "HORIZONTAL_LINE",
            type: "CONTENT",
            min_height: 40,
            max_height: 90,
            max_width: 1200,
            min_width: 100,
            height: 40,
            width: 300,
            img_url: "divider.svg",
            dialog_width: "50%",
            dialog_fullscreen: false,
            components: {
                view: "HorizontalLineView",
                edit: "HorizontalLine",
                execute: "HorizontalLineExecute"
            }
        },
        {
            name: "Block",
            inputType: "DIVISION",
            type: "CONTENT",
            min_height: 70,
            min_width: 200,

            max_height: 1000,
            max_width: 4000,
            height: 70,
            width: 200,
            components: {
                view: "DIVView",
                edit: "DIV",
                execute: "DIVExecute"
            }
        },
        {
            name: "Aggregate Function",
            inputType: "AGGREGATE_FUNCTION",
            type: "FIELD",
            min_height: 90,
            max_height: 120,
            max_width: 500,
            min_width: 200,
            height: 90,
            width: 200,
            img_url: "Number.svg",
            dialog_fullscreen: false,
            components: {
                view: "AggregateFunctionView",
                edit: "AggregateFunction",
                execute: "AggregateFunctionExecute"
            }
        }

    ],

    allFormFields: [{
            name: "Single Line Text",
            inputType: "SINGLE_LINE_TEXT",
            type: "FIELD",
            min_height: 25,
            min_width: 120,

            max_height: 100,
            max_width: 400,
            filled_by: "SENDER",


            height: 70,
            width: 200,
            img_url: "SingleLine.svg",
            dialog_width: "50%",
            dialog_fullscreen: false
        },
        {
            name: "Multi Line Text",
            inputType: "MULTI_LINE_TEXT",
            type: "FIELD",
            filled_by: "SENDER",

            min_height: 70,
            min_width: 200,

            max_width: 800,
            max_height: 700,
            height: 100,
            width: 200,
            img_url: "MultiLine.svg",
            dialog_width: "50%",
            dialog_fullscreen: false
        },
        {
            name: "Select",
            inputType: "SELECT",
            type: "FIELD",
            filled_by: "SENDER",

            min_height: 70,

            min_width: 200,

            max_height: 100,
            max_width: 400,

            height: 70,
            width: 200,
            img_url: "Select.svg",
            dialog_width: "50%",
            dialog_fullscreen: false
        },

        {
            name: "Multiple Select",
            inputType: "MULTI_SELECT",
            type: "FIELD",
            min_height: 70,
            filled_by: "SENDER",

            min_width: 200,

            max_height: 100,
            max_width: 400,

            height: 70,
            width: 200,
            img_url: "MultiSelect.svg",
            dialog_width: "50%",
            dialog_fullscreen: false
        },
        {
            name: "Number",
            inputType: "NUMBER",
            type: "FIELD",
            min_height: 70,
            min_width: 120,

            max_height: 100,
            filled_by: "SENDER",

            max_width: 400,

            height: 70,
            width: 200,
            img_url: "Number.svg",
            dialog_width: "50%",
            dialog_fullscreen: false
        },
        {
            name: "Date",
            inputType: "DATE",
            type: "FIELD",
            min_height: 70,
            min_width: 200,

            max_height: 100,
            max_width: 400,

            height: 70,
            filled_by: "SENDER",

            width: 200,
            img_url: "Date.svg",
            dialog_width: "50%",
            dialog_fullscreen: false
        },
        {
            name: "Yes or No",
            inputType: "YES_OR_NO",
            min_height: 70,
            type: "FIELD",
            min_width: 200,
            filled_by: "SENDER",


            max_height: 100,
            max_width: 500,

            height: 70,
            width: 200,
            img_url: "YesNo.svg",
            dialog_width: "50%",
            dialog_fullscreen: false
        },
        {
            name: "Checkbox",
            inputType: "CHECKBOX",
            type: "FIELD",
            min_height: 25,
            filled_by: "SENDER",

            min_width: 25,

            max_height: 80,
            max_width: 80,

            height: 25,
            width: 25,
            img_url: "CheckBox.svg",
            dialog_width: "50%",
            dialog_fullscreen: false
        },
        {
            name: "Document",
            inputType: "FILE",
            min_height: 90,
            max_height: 120,
            max_width: 500,
            filled_by: "SENDER",

            min_width: 200,
            height: 90,
            width: 200,
            img_url: "File.svg",
            dialog_width: "50%",
            dialog_fullscreen: false
        },
    ],
    allContentFields: [{
            name: "Heading",
            inputType: "HEADING",
            type: "CONTENT",
            min_height: 25,
            min_width: 200,
            img_url: "Heading.svg",
            dialog_width: "50%",
            dialog_fullscreen: false
        },
        {
            name: "Signature",
            inputType: "SIGNATURE",
            type: "FIELD",
            min_height: 90,
            max_height: 120,
            max_width: 300,
            min_width: 200,
            height: 90,
            width: 200,
            img_url: "Signature.svg",
            dialog_width: "50%",
            dialog_fullscreen: false
        },
        {
            name: "Global Variable",
            inputType: "GLOBAL_VARIABLE",
            type: "FIELD",
            min_height: 90,
            max_height: 120,
            max_width: 500,
            min_width: 200,
            height: 90,
            width: 200,
            img_url: "glodal_variable.svg",
            dialog_width: "100%",
            dialog_fullscreen: true,
        },

        {
            name: "Entity Variable",
            inputType: "ENTITY_VARIABLE",
            type: "FIELD",
            min_height: 90,
            max_height: 120,
            max_width: 500,
            min_width: 200,
            height: 90,
            width: 200,
            img_url: "glodal_variable.svg",
            dialog_width: "50%",
            dialog_fullscreen: false
        },

        {
            name: "Paragraph",
            inputType: "PARAGRAPH",
            type: "CONTENT",
            min_height: 25,
            max_height: 2000,
            max_width: 2000,
            min_width: 200,
            height: 400,
            width: 600,
            img_url: "paragraph.svg",
            dialog_width: "50%",
            dialog_fullscreen: false
        },
        {
            name: "Single Line Content",
            inputType: "SINGLE_LINE_CONTENT",
            type: "CONTENT",
            min_height: 25,
            max_height: 40,
            max_width: 2000,
            min_width: 200,
            height: 40,
            width: 500,
            img_url: "single_paragraph.svg",
            dialog_width: "50%",
            dialog_fullscreen: false
        },
        {
            name: "Authorized Signature",
            inputType: "AUTHORIZED_SIGNATURE",
            type: "CONTENT",
            min_height: 140,
            max_height: 320,
            max_width: 500,
            min_width: 200,
            height: 140,
            width: 200,
            img_url: "authorized_signature.svg",
            dialog_width: "50%",
            dialog_fullscreen: false
        },
        {
            name: "Image",
            inputType: "IMAGE",
            type: "CONTENT",
            min_height: 1,
            max_height: 6000,
            max_width: 6000,
            min_width: 1,
            height: 1,
            width: 100,
            img_url: "File.svg",
            dialog_width: "50%",
            dialog_fullscreen: false
        },
        {
            name: "Video",
            inputType: "VIDEO",
            type: "CONTENT",
            min_height: 100,
            max_height: 6000,
            max_width: 6000,
            min_width: 100,
            height: 100,
            width: 100,
            img_url: "File.svg",
            dialog_width: "50%",
            dialog_fullscreen: false
        },
        {
            name: "Formula",
            inputType: "FORMULA",
            type: "FIELD",
            min_height: 90,
            max_height: 120,
            max_width: 500,
            min_width: 200,
            height: 90,
            width: 200,
            img_url: "formula.svg",
            dialog_width: "50%",
            dialog_fullscreen: true
        },
        {
            name: "Action Button",
            inputType: "ACTION_BUTTON",
            type: "CONTENT",
            min_height: 30,
            max_height: 120,
            max_width: 500,
            min_width: 200,
            height: 30,
            width: 200,
            img_url: "button.svg",
            dialog_width: "50%",
            dialog_fullscreen: false
        },
        {
            name: "HTML",
            inputType: "HTML_CONTENT",
            type: "CONTENT",
            min_height: 300,
            max_height: 9000,
            max_width: 8000,
            min_width: 600,
            height: 300,
            width: 600,
            img_url: "html.svg",
            dialog_width: "50%",
            dialog_fullscreen: false

        },
        {
            name: "Horizontal Line",
            inputType: "HORIZONTAL_LINE",
            type: "CONTENT",
            min_height: 40,
            max_height: 90,
            max_width: 1200,
            min_width: 100,
            height: 40,
            width: 300,
            img_url: "divider.svg",
            dialog_width: "50%",
            dialog_fullscreen: false

        },
        {
            name: "Division",
            inputType: "DIVISION",
            type: "CONTENT",
            min_height: 70,
            min_width: 200,

            max_height: 1000,
            max_width: 4000,

            height: 70,
            width: 200,
            img_url: "block.svg",
            dialog_width: "50%",
            dialog_fullscreen: false
        },
        {
            name: "Aggregate Function",
            inputType: "AGGREGATE_FUNCTION",
            type: "FIELD",
            min_height: 90,
            max_height: 120,
            max_width: 500,
            min_width: 200,
            height: 90,
            width: 200,
            img_url: "formula.svg",
            dialog_width: "50%",
            dialog_fullscreen: false
        }
    ],
    globalVariables: [{
            name: "Single Line Text",
            inputType: "SINGLE_LINE_TEXT",
            type: "FIELD",
            filled_by: "SENDER",

            min_height: 70,
            min_width: 120,

            max_height: 100,
            max_width: 400,


            height: 70,
            width: 200,
            img_url: "SingleLine.svg"
        },
        {
            name: "Multi Line Text",
            inputType: "MULTI_LINE_TEXT",
            type: "FIELD",
            min_height: 70,
            min_width: 200,

            max_width: 800,
            filled_by: "SENDER",

            max_height: 700,
            height: 100,
            width: 200,
            img_url: "MultiLine.svg"
        },
        {
            name: "Select",
            inputType: "SELECT",
            type: "FIELD",
            min_height: 70,

            min_width: 200,

            max_height: 100,
            max_width: 400,

            height: 70,
            width: 200,
            img_url: "Select.svg"
        },
        {
            name: "Multiple Select",
            inputType: "MULTI_SELECT",
            type: "FIELD",
            min_height: 70,
            min_width: 200,
            disabled: true,


            filled_by: "SENDER",

            max_height: 100,
            max_width: 400,

            height: 70,
            width: 200,
            img_url: "MultiSelect.svg"
        },
        {
            name: "Number",
            inputType: "NUMBER",
            type: "FIELD",
            min_height: 70,
            min_width: 120,

            max_height: 100,
            max_width: 400,

            height: 70,
            width: 200,
            img_url: "Number.svg"
        },
        {
            name: "Date",
            inputType: "DATE",
            type: "FIELD",
            min_height: 70,
            min_width: 200,

            max_height: 100,
            max_width: 400,

            height: 70,
            width: 200,
            img_url: "Date.svg"
        }, {
            name: "Time",
            inputType: "TIME",
            type: "FIELD",
            min_height: 70,
            min_width: 200,

            max_height: 100,
            max_width: 400,

            height: 70,
            width: 200,
            img_url: "Date.svg"
        },  {
            name: "Date Time",
            inputType: "DATE_TIME",
            type: "FIELD",
            min_height: 70,
            min_width: 200,

            max_height: 100,
            max_width: 400,

            height: 70,
            width: 200,
            img_url: "Date.svg"
        }, {
            name: "Html",
            inputType: "HTML_CONTENT",
            type: "CONTENT",
            min_height: 70,
            min_width: 200,

            max_height: 100,
            max_width: 400,

            height: 70,
            width: 200,
            img_url: "html.svg"
        }, {
            name: "Image",
            inputType: "IMAGE",
            type: "CONTENT",
            min_height: 1,
            min_width: 200,

            max_height: 100,
            max_width: 400,

            height: 1,
            width: 200,
            img_url: "Date.svg"
        },

        // {
        //   name: "Image",
        //   inputType: "IMAGE",
        //   type: "CONTENT",
        //   min_height: 70,
        //   min_width: 200,
        //
        //   max_height: 100,
        //   max_width: 400,
        //
        //   height: 70,
        //   width: 200,
        //   img_url: "Date.svg"
        // },
        {
            name: "List",
            inputType: "LIST",
            type: "CONTENT",
            list_data: []
        },
        {
            name: "Currency",
            inputType: "CURRENCY",
            type: "FIELD",
            min_height: 70,
            min_width: 120,

            max_height: 100,
            max_width: 400,

            height: 70,
            width: 200,
            img_url: "Number.svg"
        },
    ],
    emailPattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phonePattern: /^\+?[0-9]{3}-?[0-9]{6,12}$/,
    faxPattern: /^\\+[0-9]{1,3}-[0-9]{3}-[0-9]{7}$/,
    currencyPattern: /^([1-9]+\d{0,2},(\d{3},)*\d{3}(\.\d{1,2})?|[1-9]+\d*(\.\d{1,2})?)$/,
    decimalPattern: /^-?([1-9]+\d{0,2},(\d{3},)*\d{3}(\.\d{1,2})?|[1-9]+\d*(\.\d{1,2})?)$/,
    numberPattern: /^-?(0|[1-9]\d*)$/
}
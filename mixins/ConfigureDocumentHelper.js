export default {
  data() {
    return {
      allKeys: {},
      refreshIndex: -1
    }
  },
  computed:{
    getAddtextBoxStyle() {
      let style = `height: ${
        this.endingY - this.startingY
      }px !important; width: ${
        this.endingX - this.startingX
      }px !important; font-size: 16px !important; font-family: Times New Roman; line-height: 1.2;`;
      return style;
    },
  },
  methods: {
    addFieldsOnDocument() {
      this.fieldsAlertModel = false;
      let dateFormat = /^\d{2}\/\d{2}\/\d{4}$/;
      (Object.keys(this.pdfFormFields) || []).forEach((doc) => {
        (Object.keys(this.pdfFormFields[doc]) || []).forEach((page) => {
          let pageData = this.pdfFormFields[doc][page];
          if (pageData && pageData.fields && pageData.fields.length) {
            let selectedPage = document.getElementById(
              `${pageData.docId}_canvas_${pageData.pageId}`
            );
            let pageHeight = selectedPage.height;
            pageData.fields.forEach((el) => {
              let font = {
                name: "Helvetica",
                size: 16,
                style: 0,
                color: "#000000",
              };
              let isDate =
                el.fieldName && el.fieldName.toLowerCase().includes("date")
                  ? el.fieldName.toLowerCase().includes("date")
                  : false;
              let x = el.rect[0] * this.scale + selectedPage.offsetLeft;
              let y =
                pageHeight - el.rect[3] * this.scale + selectedPage.offsetTop;
              if (el.fieldType == "Tx" && el.rect) {
                let fieldType = el.multiLine
                  ? "MULTI_LINE_TEXT"
                  : isDate
                  ? "DATE"
                  : "SINGLE_LINE_TEXT";
                let indx = this.getLastIndexOfElement(fieldType);
                indx = indx + 1;
                let fieldHeight = font.size * 1.5;
                let fieldWidth = 150;

                let sizeOfLast = this.getTheLastSize();
                if (sizeOfLast !== null) {
                  fieldWidth = sizeOfLast.width;
                }
                fieldWidth = (el.rect[2] - el.rect[0]) * this.scale;
                fieldHeight = (el.rect[3] - el.rect[1]) * this.scale;
                if (fieldType == "SINGLE_LINE_TEXT" || fieldType == "DATE") {
                  let value =
                    fieldHeight / 1.5 && fieldHeight / 1.5 < 8
                      ? 8
                      : fieldHeight / 1.5;
                  font.size = Math.round(value);
                }             
                let singleLineTextMetaData = {
                  type: fieldType,
                  section: "input",
                  style: "background:#cbe2d8;",
                  index: indx,
                  font: font,
                  label: fieldType + " " + indx,
                  placeholder: `${
                    fieldType == "Select DATE" ? "Date" : "Enter Value"
                  }`,
                  filled_by: this.selectedRecipient || "SENDER",
                  required: false,
                  value: isDate ? dateFormat.test(el.fieldValue) ? el.fieldValue : '' : el.fieldValue,
                  files: [],
                  sample_files: [],
                  requiredFiles: 1,
                  file_names: [],
                  options: [],
                };
                let positionSize = {
                  x: x,
                  y: y,
                  height: fieldHeight,
                  width: fieldWidth,
                };
                let singleLineTextElement = {
                  ...singleLineTextMetaData,
                  ...positionSize,
                };
                this.elements.push(singleLineTextElement);
              } else if (el.fieldType == "Btn") {
                console.log("Checkbox", el.fieldValue)
                let indx = this.getLastIndexOfElement("CHECKBOX");
                indx = indx + 1;
                let check_height = 30;
                let check_width = 30;
                if (this.elements.length) {
                  const citrus = this.elements
                    .slice()
                    .reverse()
                    .findIndex((x) => x["type"] === "CHECKBOX");
                  let count = this.elements.length - 1;
                  let finalIndex = citrus >= 0 ? count - citrus : citrus;
                  if (finalIndex > -1) {
                    check_width = this.elements[finalIndex].width;
                    check_height = this.elements[finalIndex].height;
                  }
                }
                check_width = (el.rect[2] - el.rect[0]) * this.scale;
                check_height = (el.rect[3] - el.rect[1]) * this.scale;
                this.elements.push({
                  type: "CHECKBOX",
                  section: "input",
                  style: "background:#cbe2d8;",
                  height: check_height + 2,
                  width: check_width + 2,
                  x: x - 2,
                  y: y - 3,
                  field_type: "CUSTOM_FIELD",
                  index: indx,
                  label: "Checkbox " + indx,
                  placeholder: "Checkbox " + indx,
                  value: el.fieldValue && el.fieldValue != undefined && (el.fieldValue.toLowerCase() == "on" || el.fieldValue.toLowerCase() == 'yes') ? true : false,
                  required: false,
                  filled_by: this.selectedRecipient || "SENDER",
                  files: [],
                  font: font,
                  sample_files: [],
                  requiredFiles: 1,
                  file_names: [],
                  options: [],
                });
              } else if (el.fieldType == "Ch") {
                console.log("Select", el.fieldValue)
                let indx = this.getLastIndexOfElement("SELECT");
                indx = indx + 1;
                let font = {
                  name: "Helvetica",
                  size: 16,
                  style: 0,
                  color: "#000000",
                };

                let fontOfLast = this.getTheLastFont();
                if (fontOfLast !== null) {
                  font = fontOfLast;
                }
                let fieldWidth = (200 * font.size) / 16;
                let fieldHeight = 1.5 * font.size;
                fieldWidth = (el.rect[2] - el.rect[0]) * this.scale;
                fieldHeight = (el.rect[3] - el.rect[1]) * this.scale;
                font.size = fieldHeight / 1.5;
                let options = el.options
                  .filter((e) => e.displayValue && e.displayValue.length)
                  .flatMap((e) => e.displayValue);
                this.elements.push({
                  type: "SELECT",
                  section: "input",
                  style: "background:#cbe2d8;",
                  height: fieldHeight,
                  width: fieldWidth,
                  value: el.fieldValue && el.fieldValue[0] && el.fieldValue[0].length > 0 ? el.fieldValue[0] : '',
                  options: options,
                  x: x,
                  y: y,
                  font: font,
                  index: indx,
                  label: "Select " + indx,
                  placeholder: "Please select...",
                  required: false,
                  filled_by: this.selectedRecipient || "SENDER",
                  files: [],
                  sample_files: [],
                  requiredFiles: 1,
                  file_names: [],
                });
                if (options && !options.length) {
                  let index = this.elements.length - 1;
                  this.addItemDataDialogVisible = true;
                  const choosenElement = JSON.parse(
                    JSON.stringify(this.elements[index])
                  );
                  this.selectedItem = { ...{}, ...choosenElement };
                  this.selectedItemIndex = index;
                }
              } else if (el.fieldType == "Sig") {
                let indx = this.getLastIndexOfElement("SIGNATURE");
                indx = indx + 1;
                let fieldHeight = 36;
                let fieldWidth = 225;
                this.elements.push({
                  type: "SIGNATURE",
                  section: "input",
                  style: "background:#cbe2d8;",
                  label: "Signature",
                  placeholder: "Signature " + indx,
                  height: fieldHeight,
                  field_type: "CUSTOM_FIELD",
                  width: fieldWidth,
                  font: font,
                  required: true,
                  x: x,
                  y: y,
                  index: indx,
                  filled_by: this.selectedRecipient || "SENDER",
                  files: [],
                  sample_files: [],
                  requiredFiles: 1,
                  file_names: [],
                  options: [],
                });
              }
            });
          }
        });
      });
    },
    mouseDownOnDocument(e) {
      if (this.$refs.formBuilder && this.isEarserMode || this.isDrawLine) {
        let data = this.getXandYOnCanvas(e);
        console.log(" !this.isEarserSelect ",  !this.isEarserSelect, !this.isEarserDraw, !this.isDrawingLine)
        if (
          this.isEditMode &&
          !this.isEarserSelect &&
          !this.isEarserDraw &&
          !this.isDrawingLine &&
          data.x > -1 &&
          data.y > -1 &&
          !this.isEditingText &&
          data.currentPage &&
          !this.isDrawLineColorChange
        ) {
          this.startingX = data.x + data.currentPage.offsetLeft;
          this.startingY = data.y + data.currentPage.offsetTop;
          if(this.isEarserMode){
            this.isEarserDraw = true;
          }else if(this.isDrawLine){
            this.isDrawingLine = true;
          }
        }else{
          console.log("executed", !this.isEarserSelect)
        }
      }
    },
    mouseUpOnDocument(e, isEnd) {
      if (this.$refs.formBuilder && this.isEarserMode || this.isDrawLine) {
        let data = this.getXandYOnCanvas(e);
        if (
          this.startingX > -1 &&
          this.startingY > -1 &&
          data.x > -1 &&
          data.y > -1 &&
          data.currentPage &&
          !this.isDrawLineColorChange
        ) {
          if (isEnd && this.endingX > -1 && this.endingY > -1) {
            this.isEarserSelect = true;
          } else if (
            this.isEarserDraw &&
            this.isEditMode &&
            !this.isEarserSelect &&
            !isEnd &&
            !this.isDrawLine
          ) {
            this.endingX = data.x + data.currentPage.offsetLeft;
            this.endingY = data.y + data.currentPage.offsetTop;
            let textBox = document.getElementById("whiteRectangle");
            textBox.style.display = "block";
            textBox.style.background = "#FFFFFF";
            textBox.style.height = this.endingY - this.startingY + "px";
            textBox.style.width = this.endingX - this.startingX + "px";
            textBox.style.top = this.startingY + "px";
            textBox.style.left = this.startingX + "px";
            textBox.style.zIndex = "200";
          } else if(this.isDrawLine && this.isEditMode && !this.isEarserSelect && !isEnd && this.isDrawingLine){
            this.endingX = data.x + data.currentPage.offsetLeft;
            this.endingY = data.y + data.currentPage.offsetTop;
            let textBox = document.getElementById("LineRectangle");
            textBox.style.display = "block";
            textBox.style.background = this.drawLineColor ? this.drawLineColor : "#000000";
            textBox.style.height = 2 + "px";
            textBox.style.width = this.endingX - this.startingX + "px";
            textBox.style.top = this.startingY + "px";
            textBox.style.left = this.startingX + "px";
            textBox.style.zIndex = "200";
          } else if(this.isDrawLine && this.isEditMode && this.isEarserSelect && !isEnd && this.isDrawingLine){
            this.saveRectangle(true);
          }
        }
      }
    },
    getXandYOnCanvas(e) {
      const domEle = this.$refs.formBuilder.getBoundingClientRect();
      if (
        domEle.x <= e.pageX &&
        domEle.y <= e.pageY &&
        e.pageX <= domEle.width + domEle.x &&
        e.pageY <= domEle.height
      ) {
        let pageBoundary = this.getPagesBoundaries(e.pageY - domEle.y);
        let docId =
          pageBoundary &&
          pageBoundary.data &&
          Number.isInteger(pageBoundary.data.docId)
            ? pageBoundary.data.docId
            : 0;
        let pageId =
          pageBoundary &&
          pageBoundary.data &&
          Number.isInteger(pageBoundary.data.pageId)
            ? pageBoundary.data.pageId + 1
            : 1;
        let id = docId + "_canvas_" + pageId;
        let currentPage = document.getElementById(id.toString());
        if (currentPage) {
          let xOnPage = e.pageX - domEle.x;
          let yOnPage = e.pageY - domEle.y;
          if (
            xOnPage >= currentPage.offsetLeft &&
            xOnPage <= currentPage.offsetLeft + currentPage.width
          ) {
            return {
              x: xOnPage - currentPage.offsetLeft,
              y: yOnPage - currentPage.offsetTop,
              currentPage: currentPage,
            };
          }
        }
      }
      return {
        x: -1,
        y: -1,
        currentPage: null,
      };
    },
    changeSelectedTextColor() {
      this.isChangeColor = true;
    },
    makeSelectedTextItalic() {
      this.isMakeBold = true;
      if (this.selectedText) {
        if (this.selectedText.style.weight == 2) {
          this.selectedText.style.weight = 0;
        } else if (this.selectedText.style.weight == 3) {
          this.selectedText.style.weight = 1;
        } else if (this.selectedText.style.weight == 1) {
          this.selectedText.style.weight = 3;
        } else {
          this.selectedText.style.weight = 2;
        }
      }
    },
    makeSelectedTextBold() {
      this.isMakeItalic = true;
      if (this.selectedText) {
        if (this.selectedText.style.weight == 1) {
          this.selectedText.style.weight = 0;
        } else if (this.selectedText.style.weight == 3) {
          this.selectedText.style.weight = 2;
        } else if (this.selectedText.style.weight == 2) {
          this.selectedText.style.weight = 3;
        } else {
          this.selectedText.style.weight = 1;
        }
      }
    },
    hideTextEdit() {
      if (
        this.isEditingText &&
        this.selectedText &&
        !this.isMakeItalic &&
        !this.isMakeBold &&
        !this.isChangeColor
      ) {
        let currentPage = document.getElementById(
          this.selectedText.currentPage
        );
        if (currentPage) {
          let textX = this.selectedText.transform[4] * this.scale;
          let textY =
            currentPage.height - this.selectedText.transform[5] * this.scale;
          let x = textX;
          let y = textY - this.selectedText.height * this.scale;
          let width = this.selectedText.width * this.scale;
          let style = this.selectedText.style;
          let height =
            this.selectedText.height * this.scale +
            ((this.selectedText.height * this.scale) / 100) * 25;
          let ctx = currentPage.getContext("2d");
          let pixelData = ctx.getImageData(x - 5, y + 5, 1, 1).data;
          let backgroundColor = style.backgroundColorl
            ? style.backgroundColor
            : `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
          // let backgroundColor = "rgb(255,255,255)";
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(x, y, width, height);
          ctx.fillStyle = style.color ? style.color : "#000000";
          let fontHeight =
            this.selectedText.height * this.scale
              ? this.selectedText.height * this.scale
              : 12;
          let fontWeight = "";
          if (this.selectedText.style.weight) {
            if (this.selectedText.style.weight == 1) {
              fontWeight = "bold";
            } else if (this.selectedText.style.weight == 2) {
              fontWeight = "italic";
            } else if (this.selectedText.style.weight == 3) {
              fontWeight = "italic bold";
            }
          }
          ctx.font = `${fontWeight} ${fontHeight}px ${style.fontFamily}`;
          ctx.fillText(
            this.selectedTextInPdf,
            x,
            y + this.selectedText.height * this.scale
          );
          if (
            this.selectedTextPageIndex > -1 &&
            this.selectedTextDocIndex > -1 &&
            this.allPdfText[this.selectedTextDocIndex] &&
            this.selectedTextIndex > -1 &&
            this.allPdfText[this.selectedTextDocIndex][
              this.selectedTextPageIndex
            ].fields &&
            this.allPdfText[this.selectedTextDocIndex][
              this.selectedTextPageIndex
            ].fields[this.selectedTextIndex]
          ) {
            let obj = this.selectedText;
            if (
              this.selectedTextInPdf &&
              obj.str &&
              this.selectedTextInPdf.length > obj.str.length &&
              obj.width
            ) {
              let differ = this.selectedTextInPdf.length - obj.str.length;
              obj.width += differ * this.selectedTextRation;
            }
            this.allPdfText[this.selectedTextDocIndex][
              this.selectedTextPageIndex
            ].fields[this.selectedTextIndex] = JSON.parse(
              JSON.stringify({
                ...obj,
                ...{ str: this.selectedTextInPdf, style: style },
              })
            );
          }
          let existedChangesIndex = this.pdfEditingChanges.findIndex(
            (e) =>
              e.index == this.selectedTextIndex &&
              e.pageIndex == this.selectedTextPageIndex &&
              e.docIndex == this.selectedTextDocIndex
          );
          if (existedChangesIndex != -1) {
            this.pdfEditingChanges[existedChangesIndex] = {
              item: this.allPdfText[this.selectedTextDocIndex][
                this.selectedTextPageIndex
              ].fields[this.selectedTextIndex],
              index: this.selectedTextIndex,
              pageIndex: this.selectedTextPageIndex,
              docIndex: this.selectedTextDocIndex,
              text: this.selectedTextInPdf,
              backgroundColor: backgroundColor,
            };
          } else {
            this.pdfEditingChanges.push({
              item: this.allPdfText[this.selectedTextDocIndex][
                this.selectedTextPageIndex
              ].fields[this.selectedTextIndex],
              index: this.selectedTextIndex,
              pageIndex: this.selectedTextPageIndex,
              docIndex: this.selectedTextDocIndex,
              text: this.selectedTextInPdf,
              backgroundColor: backgroundColor,
            });
          }
          this.selectedTextPageIndex = -1;
          this.selectedTextDocIndex = -1;
          this.selectedTextIndex = -1;
        }
        let textBox = document.getElementById("textHighlight");
        this.isEditingText = false;
        this.selectedText = {};
        this.selectedTextRation = 1;
        this.selectedTextInPdf = "";
        textBox.style.display = "none";
        this.isMakeItalic = false;
        this.isMakeBold = false;
        this.isChangeColor = false;
      }
    },
    hexToRgb(color) {
      const codes = color.slice(color.indexOf("(") + 1, color.lastIndexOf(")"));
      if (codes) {
        let colors = codes.split(",").map((e) => parseInt(e) / 255);
        return colors;
      } else {
        return [1, 1, 1];
      }
    },
    checkPdfChanges() {
      if (
        (this.pdfEditingChanges && this.pdfEditingChanges.length) ||
        ((this.pdfRectangleChanges &&
          this.pdfRectangleChanges.length) || (this.pdfLineChanges && this.pdfLineChanges.length) &&
          !this.isEditMode)
      ) {
        this.$confirm(
          "Looks like you have not saved your changes. Do you want to Save your changes?",
          "Warning",
          {
            confirmButtonText: "Save",
            cancelButtonText: "Discard",
          }
        )
          .then(() => {
            this.editPdf();
          })
          .catch(async () => {
            this.isPdfEditing = true;
            this.documentDataLoading = true;
            this.allPdfData = [];
            await this.renderAllDocuments(false);
            this.pdfEditingChanges = [];
            this.pdfRectangleChanges = [];
            this.pdfLineChanges = [];
          });
      }
    },
    updateTextBoxHeight(){
      const element = document.getElementById(`earserTextBox`);
      let textBox = document.getElementById("whiteRectangle");
      let y = 0;
      if(element && element.scrollHeight > (this.endingY - this.startingY)){
        y = element.scrollHeight - (this.endingY - this.startingY);
      }
      console.log("calleddd", y)
      this.endingY = this.endingY + y*4;
      textBox.style.height = this.endingY - this.startingY + "px";
    },
    addTextRectangle() {
      this.isAddingText = true;
    },
    addTextOnRectangle(context, text, x, y, maxWidth, lineHeight) {
      let words = text.split(" ");
      let line = "";
      console.log("y at start", y, lineHeight)
      context.fillStyle = "#000000";
      context.font = `${16}px Times New Roman`;
      for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + " ";
        let metrics = context.measureText(testLine);
        let testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          context.fillText(line, x, y);
          line = words[n] + " ";
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      context.fillText(line, x, y);
      return y
    },
    saveRectangle(isEarser = false) {
      let pageBoundary = this.getPagesBoundaries(this.startingY);
      let docId =
        pageBoundary &&
        pageBoundary.data &&
        Number.isInteger(pageBoundary.data.docId)
          ? pageBoundary.data.docId
          : 0;
      let pageId =
        pageBoundary &&
        pageBoundary.data &&
        Number.isInteger(pageBoundary.data.pageId)
          ? pageBoundary.data.pageId + 1
          : 1;
      let id = docId + "_canvas_" + pageId;
      let currentPage = document.getElementById(id.toString());
      let ctx = currentPage.getContext("2d");
      this.startingX = this.startingX - currentPage.offsetLeft;
      this.startingY = this.startingY - currentPage.offsetTop;
      this.endingX = this.endingX - currentPage.offsetLeft;
      this.endingY = this.endingY - currentPage.offsetTop;
      if(isEarser){
        let aRgbHex = this.drawLineColor.replace('#','').match(/.{1,2}/g);
        let aRgb = [
            parseInt(aRgbHex[0], 16),
            parseInt(aRgbHex[1], 16),
            parseInt(aRgbHex[2], 16)
        ];
        ctx.beginPath();
        ctx.strokeStyle = this.drawLineColor;
        ctx.moveTo(this.startingX, this.startingY+1);
        ctx.lineWidth = 2;
        ctx.lineTo(this.endingX, this.startingY+1);
        ctx.stroke();
        let textBox = document.getElementById("LineRectangle");
        textBox.style.display = "none";
        this.pdfLineChanges.push({
          docId: docId,
          x: this.startingX,
          y: this.startingY,
          urx: this.endingX,
          ury: this.endingY,
          color: aRgb,
          pageIndex: pageId,
        });
        this.startingX = -1;
        this.startingY = -1;
        this.endingX = -1;
        this.endingY = -1;
        // setTimeout(() => {
          this.isEarserDraw = false;
          this.isEarserSelect = false;
          this.addedTextOnRectangle = "";
          this.isAddingText = false;
          this.isDrawingLine = false;
        // }, 500);
      }else{
        this.pdfRectangleChanges.push({
          docId: docId,
          x: this.startingX,
          y: this.startingY,
          width: this.endingX - this.startingX,
          height: this.endingY - this.startingY,
          color: [255, 255, 255],
          pageIndex: pageId,
        });
        ctx.beginPath();
        ctx.fillStyle = "#FFFFFF";
        ctx.rect(
          this.startingX,
          this.startingY,
          this.endingX - this.startingX,
          this.endingY - this.startingY
        );
        ctx.fill();
        if (this.isAddingText && this.addedTextOnRectangle) {
          this.addTextOnRectangle(
            ctx,
            this.addedTextOnRectangle,
            this.startingX,
            this.startingY+14,
            this.endingX - this.startingX,
            22
          );
          // if(newY > this.endingY){
          //   this.endingY = newY+newY
          // }
          let h = this.endingY - this.startingY
          this.pdfRectangleTextChanges.push({
            docId: docId,
            x: this.startingX,
            y: this.startingY-12,
            width: this.endingX - this.startingX,
            height: h + (h/2),
            color: [0, 0, 0],
            pageIndex: pageId,
            text: this.addedTextOnRectangle.replace( /[\r\n]+/gm, "" ),
          });
        }
        let textBox = document.getElementById("whiteRectangle");
        textBox.style.display = "none";
        this.startingX = -1;
        this.startingY = -1;
        this.endingX = -1;
        this.endingY = -1;
        // setTimeout(() => {
          this.isEarserDraw = false;
          this.isEarserSelect = false;
          this.addedTextOnRectangle = "";
          this.isAddingText = false;
          this.isDrawingLine = false;
        // }, 500);
      }
    },
    deleteRectangle() {
      let textBox = document.getElementById("whiteRectangle");
      textBox.style.display = "none";
      this.startingX = -1;
      this.startingY = -1;
      this.endingX = -1;
      this.endingY = -1;
      setTimeout(() => {
        this.isEarserDraw = false;
        this.isEarserSelect = false;
        this.addedTextOnRectangle = "";
        this.isAddingText = false;
      }, 500);
    },
    checkCurrency(item, index) {
      if (typeof item.value !== "number") {
        item.value = 0;
        this.elements[index] = { ...item };
        this.refreshIndex = index;
        setTimeout(() => {
          this.refreshIndex = -1;
        });
      }
    },
    auto_grow(id) {
      const element = document.getElementById(id)  
      this.activatedItem.height = element.scrollHeight; 
    },
    addCurrency() {
      let indx = this.getLastIndexOfElement("CURRENCY");
      indx = indx + 1;
      // let offset = this.getElementYOffet("singleLineTextEle");

      let font = {
        name: "Helvetica",
        size: 16,
        style: 0,
        color: "#000000",
      };

      let fontOfLast = this.getTheLastFont();
      if (fontOfLast !== null) {
        font = fontOfLast;
      }
      let fieldWidth = 150;
      let fieldHeight = font.size * 1.5;
      let sizeOfLast = this.getTheLastSize();
      if (sizeOfLast !== null) {
        fieldWidth = sizeOfLast.width;
        // fieldHeight = sizeOfLast.height;
      }
      // console.log('>>> addPrimaryField(), fontOfLast, sizeOfLast', fontOfLast, sizeOfLast);
      let singleLineTextMetaData = {
        type: "CURRENCY",
        section: "input",
        style: "background:#cbe2d8;",
        index: indx,
        font: font,
        label: "Currency " + indx,
        placeholder: "Enter value",
        filled_by: this.recipientSelection || "SENDER_OR_RECEIVER",
        required: this.recipientSelection ? true : false,
        files: [],
        sample_files: [],
        requiredFiles: 1,
        file_names: [],
        options: [],
        value: 0,
        validations:{
          currency: "USD",
          locale: "en-US",
          required: false,
          type: "NUMBER"
        },
      };

      let positionSize = {
        x:
          this.mouseX +
          this.$refs.formBuilder.scrollLeft -
          this.$refs.formBuilder.getBoundingClientRect().x -
          this.deltaX,
        y:
          this.mouseY +
          this.$refs.formBuilder.scrollTop -
          this.$refs.formBuilder.getBoundingClientRect().y -
          this.deltaY +
          this.dragItemHeight -
          fieldHeight,
        height: fieldHeight,
        width: fieldWidth,
      };

      let singleLineTextElement = {
        ...singleLineTextMetaData,
        ...positionSize,
      };

      const x =
        this.mouseX +
        this.$refs.formBuilder.scrollLeft -
        this.$refs.formBuilder.getBoundingClientRect().x -
        this.deltaX;

      // if (x > this.pageWidth - this.deltaXOfPageWidth) {
      //   return;
      // }
      const y =
        this.mouseY +
        this.$refs.formBuilder.scrollTop -
        this.$refs.formBuilder.getBoundingClientRect().y -
        this.deltaY +
        this.dragItemHeight -
        fieldHeight;
      let pageBoundary = this.getPagesBoundaries(y);
      if (
        pageBoundary &&
        // pageBoundary.pageOffset &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          // x + fieldWidth > pageBoundary.pageOffset + pageBoundary.pageWidth)
          x >= pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        return;
      }
      if (
        pageBoundary &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          x + fieldWidth > pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        singleLineTextElement.x =
          pageBoundary.pageOffset + pageBoundary.pageWidth - fieldWidth;
      }
      this.elements.push(singleLineTextElement);
      this.getFieldsFromElements();
      // console.log(this.elements);
    },
    addFormula(){
      let indx = this.getLastIndexOfElement("FORMULA");
      indx = indx + 1;
      // let offset = this.getElementYOffet("dropdownEle");
      let font = {
        name: "Helvetica",
        size: 16,
        style: 0,
        color: "#000000",
      };
      let fontOfLast = this.getTheLastFont();
      if (fontOfLast !== null) {
        font = fontOfLast;
      }
      let fieldWidth = (200 * font.size) / 16;
      let fieldHeight = 1.5 * font.size;
  var x =
        this.mouseX +
        this.$refs.formBuilder.scrollLeft -
        this.$refs.formBuilder.getBoundingClientRect().x -
        this.deltaX;
      const y =
        this.mouseY +
        this.$refs.formBuilder.scrollTop -
        this.$refs.formBuilder.getBoundingClientRect().y -
        this.deltaY +
        this.dragItemHeight -
        fieldHeight;
      let pageBoundary = this.getPagesBoundaries(y);
      if (
        pageBoundary &&
        // pageBoundary.pageOffset &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          // x + fieldWidth > pageBoundary.pageOffset + pageBoundary.pageWidth)
          x >= pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        return;
      }
      if (
        pageBoundary &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          x + fieldWidth > pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        x = pageBoundary.pageOffset + pageBoundary.pageWidth - fieldWidth;
      }
      this.elements.push({
        type: "FORMULA",
        section: "input",
        style: "background:#cbe2d8;",
        height: fieldHeight,
        width: fieldWidth,
        value: "",
        files: [],
        sample_files: [],
        selected_fields: [],
        formula: '',
        validations:{
          currency: "",
          locale: "en-US",
          required: false,
          type: "NUMBER"
        },
        requiredFiles: 1,
        file_names: [],
        options: [],
        x: x,
        y:
          this.mouseY +
          this.$refs.formBuilder.scrollTop -
          this.$refs.formBuilder.getBoundingClientRect().y -
          this.deltaY +
          this.dragItemHeight -
          fieldHeight,
        font: font,
        index: indx,
        label: "Formula " + indx,
        placeholder: "Formula",
        required: this.recipientSelection ? true : false,
        filled_by: this.recipientSelection || "SENDER_OR_RECEIVER",
      });
      let index = this.elements.length - 1;
      this.getFieldsFromElements();
      this.addItemDataDialogVisible = true;
      const choosenElement = JSON.parse(JSON.stringify(this.elements[index]));
      this.selectedItem = { ...{}, ...choosenElement };
      this.selectedItemIndex = index;
    },
    addHorizontalLine() {
      let indx = this.getLastIndexOfElement("HORIZONTAL_LINE");
      indx = indx + 1;
      let font = {
        name: "Helvetica",
        size: 46,
        style: 0,
        color: "#000000",
      };
      let fieldWidth = 200;
      let fieldHeight = 80;
      var x =
        this.mouseX +
        this.$refs.formBuilder.scrollLeft -
        this.$refs.formBuilder.getBoundingClientRect().x -
        this.deltaX;
      const y =
        this.mouseY +
        this.$refs.formBuilder.scrollTop -
        this.$refs.formBuilder.getBoundingClientRect().y -
        this.deltaY +
        this.dragItemHeight -
        fieldHeight;
      let pageBoundary = this.getPagesBoundaries(y);
      if (
        pageBoundary &&
        // pageBoundary.pageOffset &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          // x + fieldWidth > pageBoundary.pageOffset + pageBoundary.pageWidth)
          x >= pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        return;
      }
      if (
        pageBoundary &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          x + fieldWidth > pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        x = pageBoundary.pageOffset + pageBoundary.pageWidth - fieldWidth;
      }
      this.elements.push({
        type:"HORIZONTAL_LINE",
        inputType: "HORIZONTAL_LINE",
        section: "display",
        label: "Horizontal Line",
        height: fieldHeight,
        width: fieldWidth,
        color: "#000000",
        field_type: "CUSTOM_FIELD",
        name: "Horizontal Line",
        content:"<hr>",
        x: x,
        y:
          this.mouseY +
          this.$refs.formBuilder.scrollTop -
          this.$refs.formBuilder.getBoundingClientRect().y -
          this.deltaY +
          this.dragItemHeight -
          fieldHeight,
        text: "",
        font: font,
        index: indx,
        filled_by: "SENDER",
      });

    },
    addPrimaryField(ref, field) {
      if (this.recipientSelection) {
        // let offset = this.getElementYOffet(ref);
        let labelName = this.userFields[field];
        let indx = this.getLastIndexOfElement("PRIMARY_FIELDS", field);
        // console.log('>>> addPrimaryField() , PRIMARY_FIELDS, field, indx', "PRIMARY_FIELDS", field, indx);

        let font = {
          name: "Helvetica",
          size: 16,
          style: 0,
          color: "#000000",
        };

        let fontOfLast = this.getTheLastFont();
        if (fontOfLast !== null) {
          font = fontOfLast;
        }
        let fieldWidth = 100;
        let fieldHeight = font.size * 1.5;
        let sizeOfLast = this.getTheLastSize();
        if (sizeOfLast !== null) {
          fieldWidth = sizeOfLast.width;
          // fieldHeight = sizeOfLast.height;
        }

        indx = indx + 1;
        let label = labelName + " " + indx;
        let fieldContent = this.getFieldVal(field, this.recipientSelection)
          ? this.getFieldVal(field, this.recipientSelection)
          : "";
        console.log("repselec", this.recipientSelection);
        if (this.elements.length) {
          const citrus = this.elements
            .slice()
            .reverse()
            .findIndex((x) => x["type"] === "PRIMARY_FIELDS");
          let count = this.elements.length - 1;
          let finalIndex = citrus >= 0 ? count - citrus : citrus;
          if (finalIndex > -1) {
            // let lastItem = this.elements[finalIndex];
            // font.name = lastItem.font.name;
            // font.size = lastItem.font.size;
            // font.style = lastItem.font.style;
            // font.color = lastItem.font.color;
            // fieldHeight = font.size * 1.5;
            if (fieldContent.length < 6) {
              fieldWidth = font.size * 3;
            } else if (fieldContent.length < 14) {
              fieldWidth = font.size * 6.5;
            } else {
              fieldWidth = font.size * 12;
            }
          } else {
            if (fieldContent.length > 2 && fieldContent.length <= 5) {
              fieldWidth = 50;
            }
            if (fieldContent.length > 5 && fieldContent.length <= 20) {
              fieldWidth = fieldContent.length * 10 - 5;
            }
            if (fieldContent.length > 20) {
              fieldWidth = fieldContent.length * 12;
            }
          }
        } else {
          if (fieldContent.length > 2 && fieldContent.length <= 5) {
            fieldWidth = 50;
          }
          if (fieldContent.length > 5 && fieldContent.length <= 20) {
            fieldWidth = fieldContent.length * 10;
          }
          if (fieldContent.length > 20) {
            fieldWidth = fieldContent.length * 12;
          }
        }
        if (fieldContent.length < 1) {
          fieldWidth = 130;
        }
        if(field === 'address') {
          fieldWidth = (300 * font.size) / 16;
          fieldHeight = 3 * font.size;
        }    
        var x =
          this.mouseX +
          this.$refs.formBuilder.scrollLeft -
          this.$refs.formBuilder.getBoundingClientRect().x -
          this.deltaX;
        const y =
          this.mouseY +
          this.$refs.formBuilder.scrollTop -
          this.$refs.formBuilder.getBoundingClientRect().y -
          this.deltaY +
          this.dragItemHeight -
          fieldHeight;
        let pageBoundary = this.getPagesBoundaries(y);
        if (
          pageBoundary &&
          // pageBoundary.pageOffset &&
          pageBoundary.pageWidth &&
          (x < pageBoundary.pageOffset ||
            // x + fieldWidth > pageBoundary.pageOffset + pageBoundary.pageWidth)
            x >= pageBoundary.pageOffset + pageBoundary.pageWidth)
        ) {
          return;
        }
        if (
          pageBoundary &&
          pageBoundary.pageWidth &&
          (x < pageBoundary.pageOffset ||
            x + fieldWidth > pageBoundary.pageOffset + pageBoundary.pageWidth)
        ) {
          x = pageBoundary.pageOffset + pageBoundary.pageWidth - fieldWidth;
        }
        // if (x > this.pageWidth - this.deltaXOfPageWidth) {
        //   return;
        // }

        this.elements.push({
          type: "PRIMARY_FIELDS",
          section: "display",
          label: label,
          height: fieldHeight,
          font: font,
          width: fieldWidth,
          field_type: "CUSTOM_FIELD",
          selected_tag: field,
          content: fieldContent,
          selected_user: this.recipientSelection,
          filled_by: this.recipientSelection,
          placeholder: this.getPlaceHolder("PRIMARY_FIELDS", field),
          x: x,
          y:
            this.mouseY +
            this.$refs.formBuilder.scrollTop -
            this.$refs.formBuilder.getBoundingClientRect().y -
            this.deltaY +
            this.dragItemHeight -
            fieldHeight,
          index: indx,
          files: [],
          sample_files: [],
          requiredFiles: 1,
          file_names: [],
          options: [],
        });
        this.getFieldsFromElements();
      } else {
        this.$message({
          message: "Please Select a Receipent User.",
          type: "warning",
        });
      }
      // console.log('>>> addPrimaryField(), this.elements', this.elements);
    },
    addSingleLineText() {
      let indx = this.getLastIndexOfElement("SINGLE_LINE_TEXT");
      indx = indx + 1;
      // let offset = this.getElementYOffet("singleLineTextEle");

      let font = {
        name: "Helvetica",
        size: 16,
        style: 0,
        color: "#000000",
      };

      let fontOfLast = this.getTheLastFont();
      if (fontOfLast !== null) {
        font = fontOfLast;
      }
      let fieldWidth = 150;
      let fieldHeight = font.size * 1.5;
      let sizeOfLast = this.getTheLastSize();
      if (sizeOfLast !== null) {
        fieldWidth = sizeOfLast.width;
        // fieldHeight = sizeOfLast.height;
      }
      // console.log('>>> addPrimaryField(), fontOfLast, sizeOfLast', fontOfLast, sizeOfLast);
      let singleLineTextMetaData = {
        type: "SINGLE_LINE_TEXT",
        section: "input",
        style: "background:#cbe2d8;",
        index: indx,
        font: font,
        label: "Single Line Text " + indx,
        placeholder: "Enter value",
        filled_by: this.recipientSelection || "SENDER_OR_RECEIVER",
        required: this.recipientSelection ? true : false,
        files: [],
        sample_files: [],
        requiredFiles: 1,
        file_names: [],
        options: [],
      };

      let positionSize = {
        x:
          this.mouseX +
          this.$refs.formBuilder.scrollLeft -
          this.$refs.formBuilder.getBoundingClientRect().x -
          this.deltaX,
        y:
          this.mouseY +
          this.$refs.formBuilder.scrollTop -
          this.$refs.formBuilder.getBoundingClientRect().y -
          this.deltaY +
          this.dragItemHeight -
          fieldHeight,
        height: fieldHeight,
        width: fieldWidth,
      };

      let singleLineTextElement = {
        ...singleLineTextMetaData,
        ...positionSize,
      };

      const x =
        this.mouseX +
        this.$refs.formBuilder.scrollLeft -
        this.$refs.formBuilder.getBoundingClientRect().x -
        this.deltaX;

      // if (x > this.pageWidth - this.deltaXOfPageWidth) {
      //   return;
      // }
      const y =
        this.mouseY +
        this.$refs.formBuilder.scrollTop -
        this.$refs.formBuilder.getBoundingClientRect().y -
        this.deltaY +
        this.dragItemHeight -
        fieldHeight;
      let pageBoundary = this.getPagesBoundaries(y);
      if (
        pageBoundary &&
        // pageBoundary.pageOffset &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          // x + fieldWidth > pageBoundary.pageOffset + pageBoundary.pageWidth)
          x >= pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        return;
      }
      if (
        pageBoundary &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          x + fieldWidth > pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        singleLineTextElement.x =
          pageBoundary.pageOffset + pageBoundary.pageWidth - fieldWidth;
      }
      this.elements.push(singleLineTextElement);
      this.getFieldsFromElements();
      // console.log(this.elements);
    },
    addMultilineText() {
      let indx = this.getLastIndexOfElement("MULTI_LINE_TEXT");
      indx = indx + 1;
      // let offset = this.getElementYOffet("multiLineTextEle");
      let font = {
        name: "Helvetica",
        size: 16,
        style: 0,
        color: "#000000",
      };

      let fontOfLast = this.getTheLastFont();
      if (fontOfLast !== null) {
        font = fontOfLast;
      }

      var x =
        this.mouseX +
        this.$refs.formBuilder.scrollLeft -
        this.$refs.formBuilder.getBoundingClientRect().x -
        this.deltaX;

      // if (x > this.pageWidth - this.deltaXOfPageWidth) {
      //   return;
      // }
      let fieldWidth = (300 * font.size) / 16;
      let fieldHeight = 3 * font.size;
      const y =
        this.mouseY +
        this.$refs.formBuilder.scrollTop -
        this.$refs.formBuilder.getBoundingClientRect().y -
        this.deltaY +
        this.dragItemHeight -
        fieldHeight;
      let pageBoundary = this.getPagesBoundaries(y);
      if (
        pageBoundary &&
        // pageBoundary.pageOffset &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          // x + fieldWidth > pageBoundary.pageOffset + pageBoundary.pageWidth)
          x >= pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        return;
      }
      if (
        pageBoundary &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          x + fieldWidth > pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        x = pageBoundary.pageOffset + pageBoundary.pageWidth - fieldWidth;
      }
      this.elements.push({
        type: "MULTI_LINE_TEXT",
        section: "input",
        style: "background:#cbe2d8;",
        height: fieldHeight,
        width: fieldWidth,
        font: font,
        files: [],
        sample_files: [],
        requiredFiles: 1,
        file_names: [],
        options: [],
        x: x,
        y:
          this.mouseY +
          this.$refs.formBuilder.scrollTop -
          this.$refs.formBuilder.getBoundingClientRect().y -
          this.deltaY +
          this.dragItemHeight -
          fieldHeight,
        index: indx,
        label: "Multi Line text " + indx,
        placeholder: "Enter value",
        required: this.recipientSelection ? true : false,
        filled_by: this.recipientSelection || "SENDER_OR_RECEIVER",
      });
      this.getFieldsFromElements();
    },
    addDropDown() {
      let indx = this.getLastIndexOfElement("SELECT");
      indx = indx + 1;
      // let offset = this.getElementYOffet("dropdownEle");
      let font = {
        name: "Helvetica",
        size: 16,
        style: 0,
        color: "#000000",
      };

      let fontOfLast = this.getTheLastFont();
      if (fontOfLast !== null) {
        font = fontOfLast;
      }
      let fieldWidth = (200 * font.size) / 16;
      let fieldHeight = 1.5 * font.size;
      var x =
        this.mouseX +
        this.$refs.formBuilder.scrollLeft -
        this.$refs.formBuilder.getBoundingClientRect().x -
        this.deltaX;
      // if (x > this.pageWidth - this.deltaXOfPageWidth) {
      //   return;
      // }
      const y =
        this.mouseY +
        this.$refs.formBuilder.scrollTop -
        this.$refs.formBuilder.getBoundingClientRect().y -
        this.deltaY +
        this.dragItemHeight -
        fieldHeight;
      let pageBoundary = this.getPagesBoundaries(y);
      if (
        pageBoundary &&
        // pageBoundary.pageOffset &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          // x + fieldWidth > pageBoundary.pageOffset + pageBoundary.pageWidth)
          x >= pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        return;
      }
      if (
        pageBoundary &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          x + fieldWidth > pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        x = pageBoundary.pageOffset + pageBoundary.pageWidth - fieldWidth;
      }
      this.elements.push({
        type: "SELECT",
        section: "input",
        style: "background:#cbe2d8;",
        height: fieldHeight,
        width: fieldWidth,
        value: "",
        files: [],
        sample_files: [],
        requiredFiles: 1,
        file_names: [],
        options: [],
        x: x,
        y:
          this.mouseY +
          this.$refs.formBuilder.scrollTop -
          this.$refs.formBuilder.getBoundingClientRect().y -
          this.deltaY +
          this.dragItemHeight -
          fieldHeight,
        font: font,
        index: indx,
        label: "Select " + indx,
        placeholder: "Please select...",
        required: this.recipientSelection ? true : false,
        filled_by: this.recipientSelection || "SENDER_OR_RECEIVER",
      });
      let index = this.elements.length - 1;
      this.addItemDataDialogVisible = true;
      const choosenElement = JSON.parse(JSON.stringify(this.elements[index]));
      this.selectedItem = { ...{}, ...choosenElement };
      this.selectedItemIndex = index;
      this.getFieldsFromElements();
    },
    addMultiSelect() {
      let indx = this.getLastIndexOfElement("MULTI_SELECT");
      indx = indx + 1;
      // let offset = this.getElementYOffet("multiSlectedEle");
      let font = {
        name: "Helvetica",
        size: 16,
        style: 0,
        color: "#000000",
      };

      let fontOfLast = this.getTheLastFont();
      if (fontOfLast !== null) {
        font = fontOfLast;
      }

      var x =
        this.mouseX +
        this.$refs.formBuilder.scrollLeft -
        this.$refs.formBuilder.getBoundingClientRect().x -
        this.deltaX;

      // if (x > this.pageWidth - this.deltaXOfPageWidth) {
      //   return;
      // }

      let fieldWidth = (200 * font.size) / 16;
      let fieldHeight = 1.5 * font.size;
      const y =
        this.mouseY +
        this.$refs.formBuilder.scrollTop -
        this.$refs.formBuilder.getBoundingClientRect().y -
        this.deltaY +
        this.dragItemHeight -
        fieldHeight;
      let pageBoundary = this.getPagesBoundaries(y);
      if (
        pageBoundary &&
        // pageBoundary.pageOffset &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          // x + fieldWidth > pageBoundary.pageOffset + pageBoundary.pageWidth)
          x >= pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        return;
      }
      if (
        pageBoundary &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          x + fieldWidth > pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        x = pageBoundary.pageOffset + pageBoundary.pageWidth - fieldWidth;
      }
      this.elements.push({
        type: "MULTI_SELECT",
        section: "input",
        style: "background:#cbe2d8;",
        height: fieldHeight,
        width: fieldWidth,
        value: "",
        files: [],
        sample_files: [],
        requiredFiles: 1,
        file_names: [],
        options: [],
        font: font,
        x: x,
        y:
          this.mouseY +
          this.$refs.formBuilder.scrollTop -
          this.$refs.formBuilder.getBoundingClientRect().y -
          this.deltaY +
          this.dragItemHeight -
          fieldHeight,
        index: indx,
        label: "Multi Select " + indx,
        placeholder: "Please select...",
        required: this.recipientSelection ? true : false,
        filled_by: this.recipientSelection || "SENDER_OR_RECEIVER",
      });
      let index = this.elements.length - 1;
      this.addItemDataDialogVisible = true;
      const choosenElement = JSON.parse(JSON.stringify(this.elements[index]));
      this.selectedItem = { ...{}, ...choosenElement };
      this.selectedItemIndex = index;
      this.getFieldsFromElements();
    },
    addCheckbox() {
      let indx = this.getLastIndexOfElement("CHECKBOX");
      indx = indx + 1;
      // let offset = this.getElementYOffet("checkboxEle");
      let check_height = 30;
      let check_width = 30;
      if (this.elements.length) {
        const citrus = this.elements
          .slice()
          .reverse()
          .findIndex((x) => x["type"] === "CHECKBOX");
        let count = this.elements.length - 1;
        let finalIndex = citrus >= 0 ? count - citrus : citrus;
        if (finalIndex > -1) {
          check_width = this.elements[finalIndex].width;
          check_height = this.elements[finalIndex].height;
        }
      }

      var x =
        this.mouseX +
        this.$refs.formBuilder.scrollLeft -
        this.$refs.formBuilder.getBoundingClientRect().x -
        this.deltaX;

      const y =
        this.mouseY +
        this.$refs.formBuilder.scrollTop -
        this.$refs.formBuilder.getBoundingClientRect().y -
        this.deltaY +
        this.dragItemHeight -
        check_height;
      let pageBoundary = this.getPagesBoundaries(y);
      if (
        pageBoundary &&
        // pageBoundary.pageOffset &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          // x + check_width > pageBoundary.pageOffset + pageBoundary.pageWidth)
          x >= pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        return;
      }
      if (
        pageBoundary &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          x + check_width > pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        x = pageBoundary.pageOffset + pageBoundary.pageWidth - check_width;
      }
      // if (x > this.pageWidth - this.deltaXOfPageWidth) {
      //   return;
      // }

      this.elements.push({
        type: "CHECKBOX",
        section: "input",
        style: "background:#cbe2d8;",
        height: check_height,
        width: check_width,
        font: {
          name: "Helvetica",
          size: 16,
          style: 0,
          color: "#000000",
        },
        x: x,
        y:
          this.mouseY +
          this.$refs.formBuilder.scrollTop -
          this.$refs.formBuilder.getBoundingClientRect().y -
          this.deltaY +
          this.dragItemHeight -
          check_height,
        field_type: "CUSTOM_FIELD",
        index: indx,
        label: "Checkbox " + indx,
        placeholder: "Checkbox " + indx,
        required: false,
        filled_by: this.recipientSelection || "SENDER_OR_RECEIVER",
        files: [],
        sample_files: [],
        requiredFiles: 1,
        file_names: [],
        options: [],
      });
      this.getFieldsFromElements();
    },
    addYesOrNo() {
      let indx = this.getLastIndexOfElement("YES_OR_NO");
      indx = indx + 1;
      // let offset = this.getElementYOffet("yesOrNoEle");
      let font = {
        name: "Helvetica",
        size: 16,
        style: 0,
        color: "#000000",
      };

      let fontOfLast = this.getTheLastFont();
      if (fontOfLast !== null) {
        font = fontOfLast;
      }
      let fieldWidth = (140 * font.size) / 16;
      let fieldHeight = 1.5 * font.size;
      var x =
        this.mouseX +
        this.$refs.formBuilder.scrollLeft -
        this.$refs.formBuilder.getBoundingClientRect().x -
        this.deltaX;

      // if (x > this.pageWidth - this.deltaXOfPageWidth) {
      //   return;
      // }
      const y =
        this.mouseY +
        this.$refs.formBuilder.scrollTop -
        this.$refs.formBuilder.getBoundingClientRect().y -
        this.deltaY +
        this.dragItemHeight -
        fieldHeight;

      let pageBoundary = this.getPagesBoundaries(y);
      if (
        pageBoundary &&
        // pageBoundary.pageOffset &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          // x + fieldWidth > pageBoundary.pageOffset + pageBoundary.pageWidth)
          x >= pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        return;
      }
      if (
        pageBoundary &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          x + fieldWidth > pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        x = pageBoundary.pageOffset + pageBoundary.pageWidth - fieldWidth;
      }
      this.elements.push({
        type: "YES_OR_NO",
        section: "input",
        style: "background:#cbe2d8;",
        height: fieldHeight,
        width: fieldWidth,
        font: font,
        x: x,
        y:
          this.mouseY +
          this.$refs.formBuilder.scrollTop -
          this.$refs.formBuilder.getBoundingClientRect().y -
          this.deltaY +
          this.dragItemHeight -
          fieldHeight,
        field_type: "CUSTOM_FIELD",
        index: indx,
        label: "Yes or No " + indx,
        placeholder: "Yes or No " + indx,
        required: false,
        filled_by: this.recipientSelection || "SENDER_OR_RECEIVER",
        files: [],
        sample_files: [],
        requiredFiles: 1,
        file_names: [],
        options: [],
      });
      this.getFieldsFromElements();
    },
    addDateElement() {
      let indx = this.getLastIndexOfElement("DATE");
      console.log("last onme", this.elements[indx]);
      indx = indx + 1;
      // let offset = this.getElementYOffet("dateEle");
      let font = {
        name: "Helvetica",
        size: 16,
        style: 0,
        color: "#000000",
      };

      let fontOfLast = this.getTheLastFont();
      if (fontOfLast !== null) {
        font = fontOfLast;
      }

      var x =
        this.mouseX +
        this.$refs.formBuilder.scrollLeft -
        this.$refs.formBuilder.getBoundingClientRect().x -
        this.deltaX;

      // if (x > this.pageWidth - this.deltaXOfPageWidth) {
      //   return;
      // }

      let fieldWidth = (180 * font.size) / 16;
      let fieldHeight = font.size * 1.5;
      const y =
        this.mouseY +
        this.$refs.formBuilder.scrollTop -
        this.$refs.formBuilder.getBoundingClientRect().y -
        this.deltaY +
        this.dragItemHeight -
        fieldHeight;
      let pageBoundary = this.getPagesBoundaries(y);
      if (
        pageBoundary &&
        // pageBoundary.pageOffset &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          // x + fieldWidth > pageBoundary.pageOffset + pageBoundary.pageWidth)
          x >= pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        return;
      }
      if (
        pageBoundary &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          x + fieldWidth > pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        x = pageBoundary.pageOffset + pageBoundary.pageWidth - fieldWidth;
      }
      this.elements.push({
        type: "DATE",
        section: "input",
        style: "background:#cbe2d8;",
        height: fieldHeight,
        width: fieldWidth,
        font: font,
        x: x,
        y:
          this.mouseY +
          this.$refs.formBuilder.scrollTop -
          this.$refs.formBuilder.getBoundingClientRect().y -
          this.deltaY +
          this.dragItemHeight -
          fieldHeight,
        index: indx,
        label: "Date " + indx,
        placeholder: "Select date",
        required: this.recipientSelection ? true : false,
        filled_by: this.recipientSelection || "SENDER_OR_RECEIVER",
        value: "",
        files: [],
        sample_files: [],
        requiredFiles: 1,
        file_names: [],
        options: [],
      });
      this.getFieldsFromElements();
    },

    addDateSigned() {
      if (this.recipientSelection) {
        let indx = this.getLastIndexOfElement("DATE_SIGNED");
        indx = indx + 1;
        // let offset = this.getElementYOffet("dateSingedEle");
        let font = {
          name: "Helvetica",
          size: 16,
          style: 0,
          color: "#000000",
        };

        let fontOfLast = this.getTheLastFont();
        if (fontOfLast !== null) {
          font = fontOfLast;
        }

        var x = 0;
        if (
          this.checkElementIsBefore("SIGNATURE", this.recipientSelection) &&
          this.recipientSelection != "SENDER"
        ) {
          let fieldWidth = (120 * font.size) / 16;
          let fieldHeight = 1.5 * font.size;
          x =
            this.mouseX +
            this.$refs.formBuilder.scrollLeft -
            this.$refs.formBuilder.getBoundingClientRect().x -
            this.deltaX;
          const y =
            this.mouseY +
            this.$refs.formBuilder.scrollTop -
            this.$refs.formBuilder.getBoundingClientRect().y -
            this.deltaY +
            this.dragItemHeight -
            fieldHeight;

          // if (x > this.pageWidth - this.deltaXOfPageWidth) {
          //   return;
          // }

          let pageBoundary = this.getPagesBoundaries(y);
          if (
            pageBoundary &&
            // pageBoundary.pageOffset &&
            pageBoundary.pageWidth &&
            (x < pageBoundary.pageOffset ||
              // x + fieldWidth > pageBoundary.pageOffset + pageBoundary.pageWidth)
              x >= pageBoundary.pageOffset + pageBoundary.pageWidth)
          ) {
            return;
          }
          if (
            pageBoundary &&
            pageBoundary.pageWidth &&
            (x < pageBoundary.pageOffset ||
              x + fieldWidth > pageBoundary.pageOffset + pageBoundary.pageWidth)
          ) {
            x = pageBoundary.pageOffset + pageBoundary.pageWidth - fieldWidth;
          }
          this.elements.push({
            type: "DATE_SIGNED",
            section: "input",
            style: "background:#cbe2d8;",
            height: fieldHeight,
            font: font,
            width: fieldWidth,
            x: x,
            y:
              this.mouseY +
              this.$refs.formBuilder.scrollTop -
              this.$refs.formBuilder.getBoundingClientRect().y -
              this.deltaY +
              this.dragItemHeight -
              fieldHeight,
            field_type: "CUSTOM_FIELD",
            signature_field_id: "",
            signature_field_key: "",
            signature_field: {},
            index: indx,
            label: "Date Signed " + indx,
            placeholder: "Date signed",
            required: false,
            filled_by: this.recipientSelection || "SENDER_OR_RECEIVER",
          });
        } else if (
          (this.checkElementIsBefore("SIGNATURE", this.recipientSelection) ||
            this.checkElementIsBefore(
              "my-signature",
              this.recipientSelection
            )) &&
          this.recipientSelection == "SENDER"
        ) {
          let fieldWidth = (120 * font.size) / 16;
          let fieldHeight = 1.5 * font.size;
          x =
            this.mouseX +
            this.$refs.formBuilder.scrollLeft -
            this.$refs.formBuilder.getBoundingClientRect().x -
            this.deltaX;
          const y =
            this.mouseY +
            this.$refs.formBuilder.scrollTop -
            this.$refs.formBuilder.getBoundingClientRect().y -
            this.deltaY +
            this.dragItemHeight -
            fieldHeight;
          // if (x > this.pageWidth - this.deltaXOfPageWidth) {
          //   return;
          // }
          let pageBoundary = this.getPagesBoundaries(y);
          if (
            pageBoundary &&
            // pageBoundary.pageOffset &&
            pageBoundary.pageWidth &&
            (x < pageBoundary.pageOffset ||
              // x + fieldWidth > pageBoundary.pageOffset + pageBoundary.pageWidth)
              x >= pageBoundary.pageOffset + pageBoundary.pageWidth)
          ) {
            return;
          }
          if (
            pageBoundary &&
            pageBoundary.pageWidth &&
            (x < pageBoundary.pageOffset ||
              x + fieldWidth > pageBoundary.pageOffset + pageBoundary.pageWidth)
          ) {
            x = pageBoundary.pageOffset + pageBoundary.pageWidth - fieldWidth;
          }
          this.elements.push({
            type: "DATE_SIGNED",
            section: "input",
            style: "background:#cbe2d8;",
            height: fieldHeight,
            font: font,
            width: fieldWidth,
            x: x,
            y:
              this.mouseY +
              this.$refs.formBuilder.scrollTop -
              this.$refs.formBuilder.getBoundingClientRect().y -
              this.deltaY +
              this.dragItemHeight -
              fieldHeight,
            field_type: "CUSTOM_FIELD",
            signature_field_id: "",
            signature_field_key: "",
            signature_field: {},
            index: indx,
            label: "Date Signed " + indx,
            placeholder: "Date signed",
            required: false,
            filled_by: this.recipientSelection || "SENDER_OR_RECEIVER",
          });
        } else {
          this.$message({
            message:
              "Sign Date is linked Receipent user's signature. Please include a Signature field.",
            type: "warning",
          });
        }
      } else {
        this.$message({
          message: "Please Select a Receipent User.",
          type: "warning",
        });
      }
    },
    addAttachment() {
      let indx = this.getLastIndexOfElement("ATTACHMENT");
      indx = indx + 1;
      // let offset = this.getElementYOffet("initialEle");
      if (this.recipientSelection) {
        var x =
          this.mouseX +
          this.$refs.formBuilder.scrollLeft -
          this.$refs.formBuilder.getBoundingClientRect().x -
          this.deltaX;

        // if (x > this.pageWidth - this.deltaXOfPageWidth) {
        //   return;
        // }
        const y =
          this.mouseY +
          this.$refs.formBuilder.scrollTop -
          this.$refs.formBuilder.getBoundingClientRect().y -
          this.deltaY +
          this.dragItemHeight -
          50;
        let pageBoundary = this.getPagesBoundaries(y);
        if (
          pageBoundary &&
          // pageBoundary.pageOffset &&
          pageBoundary.pageWidth &&
          (x < pageBoundary.pageOffset ||
            // x + 120 > pageBoundary.pageOffset + pageBoundary.pageWidth)
            x >= pageBoundary.pageOffset + pageBoundary.pageWidth)
        ) {
          return;
        }
        if (
          pageBoundary &&
          pageBoundary.pageWidth &&
          (x < pageBoundary.pageOffset ||
            x + 120 > pageBoundary.pageOffset + pageBoundary.pageWidth)
        ) {
          x = pageBoundary.pageOffset + pageBoundary.pageWidth - 120;
        }
        this.elements.push({
          type: "ATTACHMENT",
          section: "input",
          label: "Attachment " + indx,
          height: 50,
          width: 120,
          field_type: "CUSTOM_FIELD",
          value: "",
          files: [],
          sample_files: [],
          requiredFiles: 1,
          file_names: [],
          options: [],
          x: x,
          y:
            this.mouseY +
            this.$refs.formBuilder.scrollTop -
            this.$refs.formBuilder.getBoundingClientRect().y -
            this.deltaY +
            this.dragItemHeight -
            50,
          index: indx,
          text: "",
          color: "",
          font: {
            name: "Helvetica",
            size: 16,
            style: 0,
            color: "#000000",
          },
          required: this.recipientSelection ? true : false,
          filled_by: this.recipientSelection || "SENDER_OR_RECEIVER",
        });
        this.getFieldsFromElements();
      } else {
        this.$message({
          message: "Please Select a Receipent User.",
          type: "warning",
        });
      }
    },
    addNumber() {
      let indx = this.getLastIndexOfElement("NUMBER");
      indx = indx + 1;
      // let offset = this.getElementYOffet("numberEle");
      let font = {
        name: "Helvetica",
        size: 16,
        style: 0,
        color: "#000000",
      };

      let fontOfLast = this.getTheLastFont();
      if (fontOfLast !== null) {
        font = fontOfLast;
      }
      let fieldWidth = 150;
      let fieldHeight = font.size * 1.5;
      let sizeOfLast = this.getTheLastSize();
      if (sizeOfLast !== null) {
        fieldWidth = sizeOfLast.width;
        // fieldHeight = sizeOfLast.height;
      }
      // console.log('>>> addPrimaryField(), fontOfLast, sizeOfLast', fontOfLast, sizeOfLast);

      let numberMetaData = {
        type: "NUMBER",
        section: "input",
        font: font,
        style: "background:#cbe2d8;",
        index: indx,
        label: "Number " + indx,
        placeholder: "Enter Number",
        filled_by: this.recipientSelection || "SENDER_OR_RECEIVER",
        required: this.recipientSelection ? true : false,
        files: [],
        sample_files: [],
        requiredFiles: 1,
        file_names: [],
        options: [],
      };

      let positionSize = {
        x:
          this.mouseX +
          this.$refs.formBuilder.scrollLeft -
          this.$refs.formBuilder.getBoundingClientRect().x -
          this.deltaX,
        y:
          this.mouseY +
          this.$refs.formBuilder.scrollTop -
          this.$refs.formBuilder.getBoundingClientRect().y -
          this.deltaY +
          this.dragItemHeight -
          fieldHeight,
        height: fieldHeight,
        width: fieldWidth,
      };

      const x =
        this.mouseX +
        this.$refs.formBuilder.scrollLeft -
        this.$refs.formBuilder.getBoundingClientRect().x -
        this.deltaX;
      const y =
        this.mouseY +
        this.$refs.formBuilder.scrollTop -
        this.$refs.formBuilder.getBoundingClientRect().y -
        this.deltaY +
        this.dragItemHeight -
        fieldHeight;
      let pageBoundary = this.getPagesBoundaries(y);
      if (
        pageBoundary &&
        // pageBoundary.pageOffset &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          // x + fieldWidth > pageBoundary.pageOffset + pageBoundary.pageWidth)
          x >= pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        return;
      }
      if (
        pageBoundary &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          x + fieldWidth > pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        positionSize.x =
          pageBoundary.pageOffset + pageBoundary.pageWidth - fieldWidth;
      }
      // if (x > this.pageWidth - this.deltaXOfPageWidth) {
      //   return;
      // }

      let numberElement = {
        ...numberMetaData,
        ...positionSize,
      };
      this.elements.push(numberElement);
      this.getFieldsFromElements();
    },
    addSignature() {
      var fieldHeight = 36;
      var fieldWidth = 225;
      var x =
        this.mouseX +
        this.$refs.formBuilder.scrollLeft -
        this.$refs.formBuilder.getBoundingClientRect().x -
        this.deltaX;
      const y =
        this.mouseY +
        this.$refs.formBuilder.scrollTop -
        this.$refs.formBuilder.getBoundingClientRect().y -
        this.deltaY +
        this.dragItemHeight -
        fieldHeight;

      // if (x > this.pageWidth - this.deltaXOfPageWidth) {
      //   return;
      // }
      let pageBoundary = this.getPagesBoundaries(y);
      if (
        pageBoundary &&
        // pageBoundary.pageOffset &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          // x + 200 > pageBoundary.pageOffset + pageBoundary.pageWidth)
          x >= pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        return;
      }
      if (
        pageBoundary &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          x + fieldWidth > pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        x = pageBoundary.pageOffset + pageBoundary.pageWidth - fieldWidth;
      }
      if (this.recipientSelection) {
        let indx = this.getLastIndexOfElement("SIGNATURE");
        indx = indx + 1;
        // let offset = this.getElementYOffet("signatureEle");

        this.elements.push({
          type: "SIGNATURE",
          section: "input",
          style: "background:#cbe2d8;",
          label: "Signature",
          placeholder: "Signature " + indx,
          height: fieldHeight,
          field_type: "CUSTOM_FIELD",
          width: fieldWidth,
          required: true,
          x: x,
          y:
            this.mouseY +
            this.$refs.formBuilder.scrollTop -
            this.$refs.formBuilder.getBoundingClientRect().y -
            this.deltaY +
            this.dragItemHeight -
            fieldHeight,
          index: indx,
          filled_by: this.recipientSelection || "SENDER_OR_RECEIVER",
          files: [],
          sample_files: [],
          requiredFiles: 1,
          file_names: [],
          options: [],
          font: {
            name: "Helvetica",
            size: 16,
            style: 0,
            color: "#000000",
          },
        });
        this.getFieldsFromElements();
      } else {
        this.$message({
          message: "Please Select a Receipent User.",
          type: "warning",
        });
      }
    },
    addInitial() {
      var x =
        this.mouseX +
        this.$refs.formBuilder.scrollLeft -
        this.$refs.formBuilder.getBoundingClientRect().x -
        this.deltaX;
      const y =
        this.mouseY +
        this.$refs.formBuilder.scrollTop -
        this.$refs.formBuilder.getBoundingClientRect().y -
        this.deltaY +
        this.dragItemHeight -
        50;

      // if (x > this.pageWidth - this.deltaXOfPageWidth) {
      //   return;
      // }
      let pageBoundary = this.getPagesBoundaries(y);
      if (
        pageBoundary &&
        // pageBoundary.pageOffset &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          // x + 100 > pageBoundary.pageOffset + pageBoundary.pageWidth)
          x >= pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        return;
      }
      if (
        pageBoundary &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          x + 100 > pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        x = pageBoundary.pageOffset + pageBoundary.pageWidth - 100;
      }
      let indx = this.getLastIndexOfElement("INITIAL");
      indx = indx + 1;
      // let offset = this.getElementYOffet("initialEle");
      if (this.recipientSelection) {
        this.elements.push({
          type: "INITIAL",
          section: "input",
          label: "Initial" + indx,
          height: 50,
          width: 100,
          field_type: "CUSTOM_FIELD",
          value: "",
          x: x,
          y:
            this.mouseY +
            this.$refs.formBuilder.scrollTop -
            this.$refs.formBuilder.getBoundingClientRect().y -
            this.deltaY +
            this.dragItemHeight -
            50,
          index: indx,
          text: "",
          color: "",
          required: this.recipientSelection ? true : false,
          filled_by: this.recipientSelection || "SENDER_OR_RECEIVER",
          files: [],
          sample_files: [],
          requiredFiles: 1,
          file_names: [],
          options: [],
          font: {
            name: "Helvetica",
            size: 16,
            style: 0,
            color: "#000000",
          },
        });
        this.getFieldsFromElements();
      } else {
        this.$message({
          message: "Please Select a Receipent User.",
          type: "warning",
        });
      }
    },
    async updateWidthAndHeight() {
      if (this.activatedItem.type == "PRIMARY_FIELDS") {
        this.activatedItem.height = this.activatedItem.font.size * 1.5;
        if (this.activatedItem.content.length < 6) {
          this.activatedItem.width = this.activatedItem.font.size * 3;
        } else if (this.activatedItem.content.length < 14) {
          this.activatedItem.width = this.activatedItem.font.size * 6;
        } else {
          this.activatedItem.width = this.activatedItem.font.size * 12;
        }
      } else if (this.activatedItem.type == "PARAGRAPH") {
        let lines = this.activatedItem.content.split("\n");
        if (lines.length > 1) {
          this.activatedItem.height =
            lines.length * (this.activatedItem.font.size * 1.5);
        }
        var max = lines[0].length;
        lines.map((v) => (max = Math.max(max, v.length)));
        let result = lines.filter((v) => v.length == max);
        if (result[0].length > 11) {
          this.activatedItem.width =
            result[0].length * (this.activatedItem.font.size * 3.3);
        }
      } else if (
        this.activatedItem.type == "SINGLE_LINE_TEXT" ||
        this.activatedItem.type == "DATE" ||
        this.activatedItem.type == "SELECT" ||
        this.activatedItem.type == "NUMBER" ||
        this.activatedItem.type == "MULTI_LINE_TEXT" ||
        this.activatedItem.type == "MULTI_SELECT" ||
        this.activatedItem.type == "DATE_SIGNED" ||
        this.activatedItem.type == "CURRENCY" ||
        this.activatedItem.type == "FORMULA" ||
        this.activatedItem.type == 'ENTITY' ||
        this.activatedItem.type == 'REPEATABLE_PARENT'
      ) {
        if (this.activatedItem.type !== "MULTI_LINE_TEXT") {
          this.activatedItem.height = this.activatedItem.font.size * 1.5;
        }
        if (this.activatedItem.label.length < 6) {
          this.activatedItem.width = this.activatedItem.font.size * 3;
        } else if (this.activatedItem.label.length < 14) {
          this.activatedItem.width = this.activatedItem.font.size * 6;
        } else {
          this.activatedItem.width = this.activatedItem.font.size * 12;
        }
      } else if (this.activatedItem.type == "YES_OR_NO") {
        this.activatedItem.height = this.activatedItem.font.size * 1.5;
        if (this.activatedItem.font.size < 10) {
          this.activatedItem.width =
            94 + (this.activatedItem.font.size - 8) * 5;
        } else if (this.activatedItem.font.size <= 16) {
          this.activatedItem.width =
            94 + (this.activatedItem.font.size - 8) * 5;
        } else if (this.activatedItem.font.size <= 20) {
          this.activatedItem.width =
            94 + (this.activatedItem.font.size - 8) * 4;
        } else {
          this.activatedItem.width =
            94 + (this.activatedItem.font.size - 8) * 3;
        }
      }

      let x = this.activatedItem.x;
      let y = this.activatedItem.y;
      let pageBoundary = this.getPagesBoundaries(y);
      if (
        pageBoundary &&
        // pageBoundary.pageOffset &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          x + this.activatedItem.width >
            pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        if (this.activatedItem.width > pageBoundary.pageWidth) {
          this.activatedItem.width = pageBoundary.pageWidth - 10;
        }
        this.activatedItem.x =
          pageBoundary.pageOffset +
          pageBoundary.pageWidth -
          this.activatedItem.width;
      }
    },
    getHandleByType(type) {
      let defaultHandles = ["tl", "tm", "tr", "mr", "br", "bm", "bl", "ml"];
      switch (type) {
        case "ENTITY":
          return ["mr", "ml"];
        case "REPEATABLE_PARENT":
            return ["mr", "ml"];
        case "FORMULA":
          return ["mr", "ml"]; 
        case "SELECT":
          return ["mr", "ml"];
        case "CURRENCY":
          return ["mr", "ml"];
        case "MULTI_SELECT":
          return ["mr", "ml"];
        case "DATE":
          return ["mr", "ml"];
        case "CHECKBOX":
          return defaultHandles;
        case "SINGLE_LINE_TEXT":
          return ["mr", "ml"];
        case "YES_OR_NO":
          return ["mr", "ml"];
        case "NUMBER":
          return ["mr", "ml"];
        case "ATTACHMENT":
          return defaultHandles;
        case "PRIMARY_FIELDS":
          return ["mr", "ml"];
        default:
          return defaultHandles;
      }
    },
    getTheLastFont() {
      if (this.elements.length) {
        let font = {};
        const citrus = this.elements
          .slice()
          .reverse()
          .findIndex(
            (x) =>
              x["type"] === "PRIMARY_FIELDS" ||
              x["type"] === "PARAGRAPH" ||
              x["type"] === "SINGLE_LINE_TEXT" ||
              x["type"] === "MULTI_LINE_TEXT" ||
              x["type"] === "SELECT" ||
              x["type"] === "MULTI_SELECT" ||
              x["type"] === "NUMBER" ||
              x["type"] === "YES_OR_NO" ||
              x["type"] === "DATE" ||
              x["type"] === "DATE_SIGNED" ||
              x["type"] === "CURRENCY" ||
              x["type"] === "FORMULA"
          );
        let count = this.elements.length - 1;
        let finalIndex = citrus >= 0 ? count - citrus : citrus;
        if (finalIndex > -1) {
          let lastItem = this.elements[finalIndex];
          font.name = lastItem.font.name;
          font.size = lastItem.font.size;
          font.style = lastItem.font.style;
          font.color = lastItem.font.color;
        } else {
          return null;
        }
        return font;
      }
      return null;
    },
    getTheLastSize() {
      if (this.elements.length) {
        let size = {};
        const citrus = this.elements
          .slice()
          .reverse()
          .findIndex(
            (x) =>
              x["type"] === "PRIMARY_FIELDS" ||
              x["type"] === "SINGLE_LINE_TEXT" ||
              x["type"] === "NUMBER" ||
              x["type"] === "CURRENCY" ||
              x["type"] === "FORMULA"
          );
        let count = this.elements.length - 1;
        let finalIndex = citrus >= 0 ? count - citrus : citrus;
        if (finalIndex > -1) {
          let lastItem = this.elements[finalIndex];
          size.width = lastItem.width;
          size.height = lastItem.height;
        } else {
          return null;
        }
        return size;
      }
      return null;
    },
  },
};

export default {
  data() {
      return {}
  },
  methods: {
    getDefaultSizeRangesByFieldType(inputType) {
      let data = this.fieldActionsObject[inputType];
      return {
        min_height: data.min_height,
        min_width: data.min_width,
        max_height: data.max_height,
        max_width: data.max_width
      };
    },
    calculateRelativeWidth(width) {
      if (
        this.storedFormBuilderWidth &&
        this.currentFormBuilderWidth &&
        this.currentFormBuilderWidth != this.storedFormBuilderWidth
      ) {
        return Math.round(
          (this.currentFormBuilderWidth / this.storedFormBuilderWidth) * width
        );
      }
      return width;
    },
    calculateRelativeLeft(x) {
      if (
        this.storedFormBuilderWidth &&
        this.currentFormBuilderWidth &&
        this.currentFormBuilderWidth != this.storedFormBuilderWidth
      ) {
        return Math.round(
          (this.currentFormBuilderWidth / this.storedFormBuilderWidth) * x
        );
      }
      return x;
    },

    calculateRelativeTop(y) {
      if (
        this.storedFormBuilderWidth &&
        this.currentFormBuilderWidth &&
        this.currentFormBuilderWidth != this.storedFormBuilderWidth
      ) {
        return Math.round(
          (this.currentFormBuilderWidth / this.storedFormBuilderWidth) * y
        );
      }
      return y;
    },
    setSizeAndPositionForElements(elements) {
      return elements.map(field => {
        field = {
          ...field,
          ...this.getDefaultSizeRangesByFieldType(field.input_type)
        };
        field.x = this.calculateRelativeLeft(field.x);
        field.y = this.calculateRelativeTop(field.y);

        let width = this.calculateRelativeWidth(field.width);
        let height = this.calculateRelativeWidth(field.height);

        if (width > field.max_width) {
          field.width = field.max_width;
        } else if (width < field.min_width) {
          field.width = field.min_width;
        } else {
          field.width = width;
        }
        if (height > field.max_height) {
          field.height = field.max_height;
        } else if (height < field.min_height) {
          field.height = field.min_height;
        } else {
          field.height = height;
        }
        return field;
      });
    },
  }
}
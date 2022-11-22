export default {

    data() {
        return {

        }
    },
    computed: {
        getElementStyle() {
            return data => {
                let borderStyle = "";
                if (data.styles) {
                    let type = data.styles.border_type
                        ? data.styles.border_type
                        : "solid";
                    let size = data.styles.border_size
                        ? data.styles.border_size + "px"
                        : "0px";
                    let color = data.styles.border_color
                        ? data.styles.border_color
                        : "";

                    borderStyle = "border:" + type + " " + " " + size + " " + color;

                    borderStyle += ";";
                    borderStyle += data.styles.background
                        ? `background: ${data.styles.background}`
                        : "";
                }
                return borderStyle;
            }

        }
    }
}
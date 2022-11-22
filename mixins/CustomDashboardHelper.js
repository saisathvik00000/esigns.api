import moment from "moment";

export default {
  methods: {
    mapDateFilters(filters){
      return filters.map(e =>{
        if(e.operator == 'real_time' && e.data_type == 'DATE'){
          let data = this.getDatePickerHelper(e.selected_date_picker);
          e.value = data.value;
          e.today = data.today;
        }
        return e
      });
    },
    getTemplateFieldsByType(data, types) {
      let fields = [];
      data.sections.forEach((e) => {
        fields = [...fields, ...e.fields];
      });
      if (types && types.length) {
        fields = fields.filter((e) => types.indexOf(e.input_type) !== -1);
      }
      fields = fields.map((e) => {
        e.template_id = data._id;
        e.key = data._id + "#" + e.key;
        e.template_name = data.name;
        e.data_type =
          e.validations && e.validations.type ? e.validations.type : "STRING";
        return e;
      });
      return fields;
    },
    getRequiredFields(fields, entity_id) {
      let resultFilters = [];
      if(fields && fields.length){
        fields.forEach((filter) => {
          if (filter.entity_id === entity_id) {
            resultFilters.push(filter);
          }
        });
      }
      return resultFilters;
    },
    getDateByDays(days = 0, date = new Date()) {
      date = new Date(date);
      date.setTime(date.getTime() - 3600 * 1000 * 24 * days);
      return moment(date).format("yyyy-MM-DD") + 'T18:30:00.000Z';
    },
    getDatePickerHelper(picker) {
      let field = {
        value: '',
        today: ''
      };
      switch (picker) {
        case "today":
          field.value = this.getDateByDays(1);
          break;
        case "yesterday":
          field.value = this.getDateByDays(2);
          break;
        case "last_week":
          field.value = this.getDateByDays(1, moment().subtract(1, 'weeks').startOf('week').format('YYYY-MM-DD'));
          field.today = this.getDateByDays(1, moment().subtract(1, 'weeks').endOf('week').format('YYYY-MM-DD'));
          break;
        case "last_month":
          field.value = this.getDateByDays(1, moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD'));
          field.today = this.getDateByDays(1, moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD'));
          break;
        case "last_year":
          field.value = this.getDateByDays(1, moment().subtract(1, 'years').startOf('year').format('YYYY-MM-DD'));
          field.today = this.getDateByDays(1, moment().subtract(1, 'years').endOf('year').format('YYYY-MM-DD'));
          break;
        case "this_year":
          field.value = this.getDateByDays(1, moment().startOf('year').format('YYYY-MM-DD'));
          field.today = this.getDateByDays(1, moment().endOf('year').format('YYYY-MM-DD'));
          break;
        case "this_quarter":
          field.value = this.getDateByDays(1, moment().startOf('quarter').format('YYYY-MM-DD'));
          field.today = this.getDateByDays(1, moment().endOf('quarter').format('YYYY-MM-DD'));
          break;
        case "last_quarter":
          field.value = this.getDateByDays(1, moment().subtract(1, 'quarter').startOf('quarter').format('YYYY-MM-DD'));
          field.today = this.getDateByDays(1, moment().subtract(1, 'quarter').endOf('quarter').format('YYYY-MM-DD'));
          break;
        case "this_week": 
          field.value = this.getDateByDays(1, moment().startOf('week').format('YYYY-MM-DD'));
          field.today = this.getDateByDays(1, moment().endOf('week').format('YYYY-MM-DD'));
          break;
        case "this_month":
          field.value = this.getDateByDays(1, moment().startOf('month').format('YYYY-MM-DD'));
          field.today = this.getDateByDays(1, moment().endOf('month').format('YYYY-MM-DD'));
          break;
        case "next_week": 
          field.value = this.getDateByDays(1, moment().add(1, 'weeks').startOf('week').format('YYYY-MM-DD'));
          field.today = this.getDateByDays(1, moment().add(1, 'weeks').endOf('week').format('YYYY-MM-DD'));
          break;
        case "next_month": 
          field.value = this.getDateByDays(1, moment().add(1, 'months').startOf('month').format('YYYY-MM-DD'));
          field.today = this.getDateByDays(1, moment().add(1, 'months').endOf('month').format('YYYY-MM-DD'));
          break;
        case "next_quarter": 
          field.value = this.getDateByDays(1, moment().add(1, 'quarter').startOf('quarter').format('YYYY-MM-DD'));
          field.today = this.getDateByDays(1, moment().add(1, 'quarter').endOf('quarter').format('YYYY-MM-DD'));
          break;
        case "next_year": 
          field.value = this.getDateByDays(1, moment().add(1, 'years').startOf('year').format('YYYY-MM-DD'));
          field.today = this.getDateByDays(1, moment().add(1, 'years').endOf('year').format('YYYY-MM-DD'));
          break;
      }
      return field
    },
  },
};

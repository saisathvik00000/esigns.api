export default {
  data() {
    var validateEmail = (rule, value, callback) => {
      var emailReg = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      let emails = this.getAllContacts.data.map((user) => user.email);
      if (
        this.selectedUser &&
        this.selectedUser.email &&
        this.selectedUser.email == value
      ) {
        emails = [];
      }
      if (value === "") {
        callback(new Error("Email is Required"));
      } else if (!emailReg.test(value)) {
        callback(new Error("Email is not valid"));
      } else if (emails.indexOf(value) != -1) {
        callback(new Error("Email already existed"));
      } else {
        callback();
      }
    };
    return {
      newUserFormRules: {
        first_name: [
          {
            required: true,
            message: "First name is required",
            trigger: "blur",
          },
        ],
        last_name: [
          { required: true, message: "Last name is required", trigger: "blur" },
        ],
        company_name: [
          { required: false, message: "Company is required", trigger: "blur" },
        ],
        phone: [
          { required: false, message: "Phone is required", trigger: "blur" },
        ],
     
        
        contact_type: [
          {
            required: true,
            message: "Contact Type is required",
            trigger: "blur",
          },
        ],
        email: [{ required: true, validator: validateEmail, trigger: "blur" }],
      },
      colors: [
        '#FF9FF3',
        '#FECA57',
        '#A3CB38',
        '#1DD1A1',
        '#009432',
        '#54A0FF',
        '#0652DD',
        '#5F27CD',
        '#F368E0',
        '#00D2D3',
        '#01A3A4',
        '#FF9F43',
        '#1B1464',
        '#006266',
        '#EE5A24',
        '#833471',
        '#EA2027',
        '#9980FA',
        '#E15F41',
        '#786FA6',
        '#E66767',
        '#303952',
        '#218C74',
        '#706FD3',
      ],
      defined_colors:[
       '#FF495C',
        '#3777FF',
        '#EE964B',
        '#03CEA4',
        
      ]
    }
  },
  methods: {
    getUserName(id) {
      let data = this.getUserTypes.data.find(x => x._id == id);
      return data.name || '';
    },
    getRandomColor(existColors) {
      //  console.log(existColors)
      // console.log(index)
      let filterdColors = []
      let indx=-1

      if (existColors && existColors.length) {
        // getting only non existed colors
        filterdColors = this.defined_colors.filter(color => existColors.indexOf(color) == -1)
        // console.log(filterdColors)
        if(filterdColors  && filterdColors.length){
          indx = Math.floor(Math.random() * filterdColors.length);
        }
        else{
          filterdColors=[]
          filterdColors = this.colors.filter(color => existColors.indexOf(color) == -1)
              // getting randam index of array based on length
          indx = Math.floor(Math.random() * filterdColors.length); 
          
        }
      } else {
        filterdColors = this.defined_colors;
      }

      

      return filterdColors[indx]
    }
  }
}
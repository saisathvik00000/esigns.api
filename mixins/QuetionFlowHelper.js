// import VueScrollTo from "vue-scrollto";

export default {
    props: [],
    data() {
        return {
            showBefore: false,
            showQuestion: false,
            showOptions: false,
            showAfter: false,
            user_answer: "",
            user_answer_text: "",
            countWord: 0,
            typingEffect: {
                before: false,
                question: false,
                after: false
            },
            timeForReadingLetter: 160,
            minimumDelayTime: 1000
        };
    },

    methods: {
        questionAnswered() {
            this.displayTypingEffect("after");
            this.displayAfter();
            var self = this;
            setTimeout(() => {
                self.$emit("question-answered");
            }, self.delayToFireLoadQuestionEvent());
        },

        delayForBefore() {
            return 100
        },

        delayForQuestion() {
            // return this.delayForBefore() + this.getTimeToReadBefore();
            return 500;
        },

        delayForOptions() {
            // return this.delayForQuestion() + this.getTimeToReadQuestion();
            return 100;
        },

        delayForAfter() {
            return 500;
        },

        displayTypingEffect(status) {
            var self = this
            self.typingEffect = {
                before: false,
                question: false,
                after: false
            };
            self.typingEffect[status] = true;
        },

        displayBefore() {
            var self = this;
            // self.$emit("question-displayed");
            self.typingEffect.before = true;

            setTimeout(() => {
                self.typingEffect.before = false;
                self.showBefore = true;
                // self.$emit("question-displayed");
            }, self.delayForBefore());
        },

        displayQuestion() {
            var self = this;
            setTimeout(() => {
                self.typingEffect.question = false;
                self.showQuestion = true;
                self.$emit("question-displayed");
            }, self.delayForQuestion());
        },

        displayOptions() {
            var self = this;
            setTimeout(() => {
                self.showOptions = true;
                self.$emit("options-displayed");
                
                setTimeout(() => {
                    // VueScrollTo.scrollTo("#currentQuestion" + this.questionIndex, 100, {
                    //     container: "#formBuilder",
                    // });
                });

            }, self.delayForOptions());
        },

        displayAfter() {
            console.log("afrer")
            var self = this;
            setTimeout(() => {
                self.typingEffect.after = true;
            }, self.delayForAfter());
            this.typingEffect.after = false;
            console.log("123", this.typingEffect.after)
            this.showAfter = true;
        },

        delayToFireLoadQuestionEvent() {
            // return this.getTimeToReadAfter() + 500;
            return 100;
        },

        getTimeToReadBefore() {
            return this.timeToReadValue(this.questionDetails.question_before);
        },
        getTimeToReadQuestion() {
            return this.timeToReadValue(this.questionDetails.question_text) / 10;
        },
        getTimeToReadOptions() {
            let options = this.questionDetails.options.reduce(
                (a, b) => a.concat(b),
                ""
            );
            return this.timeToReadValue(options);
        },
        getTimeToReadAfter() {
            return this.timeToReadValue(this.questionDetails.question_after);
        },
        timeToReadValue(value) {
            let noOfLetters;
            if (value) {
                noOfLetters = value.replace(/\s/g, "").length;
            } else {
                noOfLetters = 0;
            }
            return noOfLetters * this.timeForReadingLetter;
        }

    }
};

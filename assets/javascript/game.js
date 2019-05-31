// declare global variables
const TIME_LIMIT = 7; 
var timer;
var timeHandle;

var trivia = {
    numQuiz: 10,
    numRights: 0,
    numWrongs: 0,
    currQuiz: 0,

    selectedQuiz: [],

    reset: function() {
        this.numRights = 0;
        this.numWrongs = 0;
        var quizArr =[];
        for(var i=0; i<quizList.length; i++) {
            quizArr.push(i);
        }
        this.selectedQuiz = [];
        var quizId;
        for(var i=0; i<this.numQuiz; i++) {
            quizId = Math.floor(Math.random() * quizArr.length);
            this.selectedQuiz.push(quizArr[quizId]);
            quizArr.splice(quizId,1);
        }
        console.log("selected : " + this.selectedQuiz);

        this.currQuiz = 0;
    },
}

function displayQuiz() {
    var quiz = quizList[trivia.selectedQuiz[trivia.currQuiz]];
    console.log(quiz);
    timer = TIME_LIMIT;
    $("#text-timer").text(timer);
    $("#text-question").text(quiz.q);

    for(var i=1; i<=4; i++) {
        $("label[for=id-ans" + i + "]").html(quiz.choice[i-1]);  
        $("#id-ans" + i).prop("checked", false);
    }

    $("#btn-choose").attr("disabled", true);
    timeHandle = setInterval(decrement, 1000);
}

function decrement() {

    timer--;

    $("#text-timer").text(timer);

    if (timer === 0) {
       
       var quiz = quizList[trivia.selectedQuiz[trivia.currQuiz]];
       showResult("Time's UP!","Correct Answer: " + quiz.choice[quiz.a] )
    }
}

function nextQuiz() {
    trivia.currQuiz++;
    console.log("next q : " + trivia.currQuiz);
    if (trivia.currQuiz < trivia.selectedQuiz.length) {
        displayQuiz();
    } else {
        // game summary page
    }
}

function showResult(line1, line2) {
    clearInterval(timeHandle);
    $("#text-status").text(line1);
    $("#text-detail").text(line2);
    $('#myModal').modal({backdrop: "static", keyboard: false});

    setTimeout(function() {
        $("#myModal").modal("hide");
        nextQuiz();
    }, 3000);
}

$(".form-check-input").on("click", function() {
    $("#btn-choose").attr("disabled", false);
})

$("#btn-choose").on("click", function() {
    var quiz = quizList[trivia.selectedQuiz[trivia.currQuiz]];

    if ($("#id-ans" + (quiz.a+1)).prop("checked")) {
        showResult("Congratulation!","You chose the correct answer!");
    } else {
        showResult("Wrong answer!","Correct Answer: " + quiz.choice[quiz.a] );
    }
})


trivia.reset();
displayQuiz();
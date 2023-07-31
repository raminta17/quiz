//Task: create simple quiz app: 1 st page "How much do you know?" and button "Let's go"
//pages with questions and possible answers with radio buttons
// on first page will be button "next", on other ones 2 buttons: prev and next
//last page will display results: how many % was true.

//pseudo code:
//1. Create html, 3 pages front-page, question-page, result page
//2. Style it in css
//3. Start TypeScript:
//4. write all const (variables)
//5. create: arrayQuestions (in arr will be objects for each question(question, answers with one or more true value, answers)), define parameters
//6. Think about mechanics: On front-page "Let's go btn" is clicked
//first Q - page is displayed
//Using type script innerHtml method display first Q in UI
//then clicked answer btn write response to array (push answer to array - boolean),
//then btn "next" is clicked display next Q-page (page is the same, just take new obj from Arr with new Question)
//repeat, last page shows result: how many question where, how many answered, and not
//display - x %.

 // -------------------variables--------------------------------------------

// -- first Page variables --
const firstPage = document.querySelector('.firstPage') as HTMLElement;
const startQuizBtn = document.querySelector('.firstPage button') as HTMLElement;

// -- question page variables --
const questionPage = document.querySelector('.questionPage') as HTMLElement;
const questionDiv = document.querySelector('.questionDiv') as HTMLElement;
const answersDiv = document.querySelector('.answersDiv') as HTMLElement;
const prevQBtn = document.querySelector('#prevQBtn') as HTMLElement;
const nextQBtn = document.querySelector('#nextQBtn') as HTMLElement;

// -- score page variables --
const scorePage = document.querySelector('.scorePage') as HTMLElement;
const scoreDiv = document.querySelector('.score') as HTMLElement;
const takeQuizAgainBtn = document.querySelector('.scorePage button') as HTMLElement;

// -- questions array --
type Quiz = [
    {
        question: string,
        options: string[],
        answer: number
    },
    {
        question: string,
        options: string[],
        answer: number
    },
    {
        question: string,
        options: string[],
        answer: number
    },
    {
        question: string,
        options: string[],
        answer: number
    },
    {
        question: string,
        options: string[],
        answer: number
    },
    {
        question: string,
        options: string[],
        answer: number
    },
    {
        question: string,
        options: string[],
        answer: number
    },
    {
        question: string,
        options: string[],
        answer: number
    },
    {
        question: string,
        options: string[],
        answer: number
    },
    {
        question: string,
        options: string[],
        answer: number
    }
]

const questions:Quiz = [
    {
        question: "1. What is the primary goal of physiotherapy?",
        options: [
            "A. Treating psychological disorders",
            "B. Managing chronic pain",
            "C. Diagnosing medical conditions",
            "D. Restoring physical function"
        ],
        answer: 3
    },
    {
        question: "2. Which healthcare professionals are trained in physiotherapy?",
        options: [
            "A. Surgeons",
            "B. Radiologists",
            "C. Physiotherapists",
            "D. Pharmacists"
        ],
        answer: 2
    },
    {
        question: "3. What does 'RICE' stand for in the context of injury management?",
        options: [
            "A. Rest, Inflammation, Compression, Elevation",
            "B. Running, Ice, Cycling, Exercise",
            "C. Rehabilitation, Improvement, Cardio, Endurance",
            "D. Relaxation, Isolation, Conditioning, Endurance"
        ],
        answer: 0
    },
    {
        question: "4. Which type of physiotherapy uses water to aid in rehabilitation?",
        options: [
            "A. Hydrotherapy",
            "B. Acupuncture",
            "C. Electrotherapy",
            "D. Manual Therapy"
        ],
        answer: 0
    },
    {
        question: "5. What is the purpose of therapeutic exercises in physiotherapy?",
        options: [
            "A. To improve cardiovascular fitness",
            "B. To promote muscle growth",
            "C. To increase flexibility",
            "D. To restore physical function and strength"
        ],
        answer: 3
    },
    {
        question: "6. Which area does pediatric physiotherapy focus on?",
        options: [
            "A. Treating older adults",
            "B. Managing sports injuries",
            "C. Providing care for children",
            "D. Rehabilitation after surgery"
        ],
        answer: 2
    },
    {
        question: "7. What is the role of a physiotherapist in post-stroke rehabilitation?",
        options: [
            "A. Prescribing medication",
            "B. Conducting surgery",
            "C. Assisting with walking and mobility",
            "D. Providing psychological counseling"
        ],
        answer: 2
    },
    {
        question: "8. Which modality involves the application of electrical stimulation?",
        options: [
            "A. Acupuncture",
            "B. Hydrotherapy",
            "C. Manual Therapy",
            "D. Electrotherapy"
        ],
        answer: 3
    },
    {
        question: "9. What does 'ROM' stand for in the context of physiotherapy?",
        options: [
            "A. Return of Movement",
            "B. Range of Motion",
            "C. Rehabilitation of Muscles",
            "D. Restoring Optimal Mobility"
        ],
        answer: 1
    },
    {
        question: "10. Which of the following conditions may benefit from physiotherapy?",
        options: [
            "A. Heart attack",
            "B. Type 2 diabetes",
            "C. Depression",
            "D. Back pain"
        ],
        answer: 3
    }
];
let questionCount:number = 0;
type submitAnswer = {
    submittedAnswer : string,
    ifCorrect: boolean
}
let selectedAnswers:submitAnswer[]| any = [];
let score:number = 0;
questions.forEach((question:any) => {
    selectedAnswers.push(null);
})
// -- events --

// -- first Page events --
startQuizBtn.onclick = () => {
    firstPage.style.display = 'none';
    questionPage.style.display = 'flex';
    generateQuestion();
}

// -- question page events --
nextQBtn.onclick = () => {
    saveSelectedAnswer();
    questionCount++;
    if(questionCount < questions.length){
        generateQuestion();
        showSelectedAnswer();
    } else {
        questionPage.style.display = 'none';
        scorePage.style.display = 'flex';
        score = selectedAnswers.filter((answer:submitAnswer) => answer.ifCorrect).length;
        scoreDiv.textContent = `Your score is ${score} ouf of ${questions.length}`;
    }
}
prevQBtn.onclick = () => {
    if(questionCount > 0){
        saveSelectedAnswer();
        questionCount--;
        generateQuestion();
        showSelectedAnswer();

    } else {
        questionPage.style.display = 'none';
        firstPage.style.display = 'flex';
    }
}
// -- score page events --
takeQuizAgainBtn.onclick = ()=> {
    scorePage.style.display = 'none';
    firstPage.style.display = 'flex';
    questionCount = 0;
    selectedAnswers = [];
}
// -- functions --

function generateQuestion() {
    questionDiv.textContent = questions[questionCount].question;
    answersDiv.innerHTML = '';
    questions[questionCount].options.forEach((option:string, index:number) => {
        answersDiv.innerHTML += `
        <div>
                <input type="radio" name="${questions[questionCount].question}" id="${index}" value="${option}">
                <label for="${index}">${option}</label>
            </div>
    `
    })
}
function saveSelectedAnswer(){
    const radioSelected = document.querySelectorAll('input[type=radio]') as NodeListOf<HTMLInputElement>;
    radioSelected.forEach((radioOption: HTMLInputElement, radioIndex:number) => {
        if(radioOption.checked){
            let submittedAnswer: submitAnswer = {
                submittedAnswer : radioOption.value,
                ifCorrect: radioIndex === questions[questionCount].answer
            }
            selectedAnswers[questionCount] = submittedAnswer;
        }
    })
}
function showSelectedAnswer(){
    const radioSelected = document.querySelectorAll('input[type=radio]') as NodeListOf<HTMLInputElement>;
    questions[questionCount].options.forEach((option:string, optionIndex:number) => {
        if(selectedAnswers[questionCount]){
            let selected:string = selectedAnswers[questionCount].submittedAnswer;
            option === selected ? radioSelected[optionIndex].checked = true : '';
        }
    })
}
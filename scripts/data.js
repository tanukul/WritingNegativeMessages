var ColorCodes = {
    black: "#00000",
    white: "#FFFFFF",
    red: "#B22222",
    green: "#01662C",
    blue: "#4E7092",
}

var _Settings = {
    dataRoot: "pagedata/",
    assetsRoot: "assets/",
    enableCache: true,
    topMargin: 144,
    minHeight: 437
}

var _QData = {
    "Q1": {
        Qid: "Q1",
        tryCount: 0,
        totalTry: 2,
        totalPoints: 1,
        type: "question",
        options: [{
            type: "input",
            id: "inputCal",
            answer: "3000",
            answerId: ""
        }],
        feedback: ["l1p2/q1c1.htm", "ic1.htm", "l1p2/q1ic2.htm"]
    }
}
//Anu 10-sep-2018
var _donotshowmsgagain = false;
//Anu 20-sep-2018 removed studemail - no more used
var courseId = 'course-1';
var moduleId = 'module-1';
var assignmentId = 'asgnmnt-1';
var prevQNumber = -1
var prevPgId = '';
//Anu 20-sep-2018 studid is now varchar
var studId = "";
var studFirstname = "";
var studLastname = "";

var teamId = undefined;
var tempTeamSel = undefined;
var teamMaxSize = 5;
var prevRes = undefined;
var teamRes = undefined;
var totalqcnt = 26;
var lastquestionid = 23;
var finaltotalqcnt = 0;
var selOption = "";
var iscorrect = 0;
var questionId = 1;
var currPageUrl = "";
var currentAttempt = 1;
var gStudentScore = 0;
//var gURL = "https://author-stg.knowdl.com/teamassignmenttool"
var gURL = "https://pe-ta.knowdl.com"
//ajax select team page ajax timer var
var selectteampgtimer = null;
var intropgtimer = null;
var questionpgtimer = null;
var classaveragepgtimer = null;
var questionlist = { "1": "l1p2", "2": "l1p9", "3": "l1p12", "4": "l1p15", "5": "l1p18", "6": "l1p21", "7": "l1p23", "8": "l1p25", "9": "l1p26", "10": "l1p10", "11": "l1p13", "12": "l1p16", "13": "l1p19", "14": "l1p11", "15": "l1p14", "16": "l1p17", "17": "l1p20", "18": "l1p22", "19": "l1p24" };
var sourceSSE = null;
var sourceTeamSSE = null;
var sourceClassAverageSSE = null;

//Anu 24-sep-2018 PollingResult possible values
var pollingresultlist = ["never","submit","selection"];
var pollingresult = "submit";
var isQueSubmited = false;

//Anu 6-oct-2018 score per stored globally
var tScoreObj = '';

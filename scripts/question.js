function QuestionOptionChanged(_ths) {
	if(_ths.attributes.opt_id.value != undefined) {
		selOption = _ths.attributes.opt_id.value;
	}
	if(_ths.attributes.iscorrect.value != undefined) {
		iscorrect = _ths.attributes.iscorrect.value;
	}
}

function SubmitQuestionResponse() {
    var curPage = _Navigator.GetCurrentPage();
    if (curPage.QuestionType == "checklist") {
        tempObj = _Navigator.GetSelectedOptionNumberForMulticheck();
        selOption = tempObj.selOption;
        iscorrect = tempObj.iscorrect;
    }
    $("#btnSubmit").k_disable();
    $('.option-group').k_disable();
    $("#infoDetails").find(".submitFeedbackPopup").remove();
    $("#transcriptDetails").find(".submitFeedbackPopup").remove();
    $(".submitFeedbackPopup").find("div.instrCustomMsg").remove();
    $(".submitFeedbackPopup").show();    
    
    $(".submitFeedbackPopup").find("#fdk[opt_id=" + selOption + "]").show();
     $('html,body').animate({ scrollTop: document.body.scrollHeight }, 1000, function () {           
        });
    
  
    curPage.StudSelOption = selOption;
    curPage.isQuestionAttempted = true;
    curPage.userScore = Number($('.option-group').find("tr[opt_id=" + selOption + "]").attr("qScore"));
  
    $('.option-group').find("tr[opt_id=" + selOption + "]").css({
        "border": "1px solid #33A7C0"
             
            
         });
    $("#btnSubmit").k_disable();
    $('.option-group').k_disable();
    $("#linknext").k_enable();

    $(".submitFeedbackPopup").append(document.getElementById('lastspanNext').outerHTML); 
    $(".submitFeedbackPopup").find("#lastspanNext").css("display", "block").show();  
    
    showupdateTranscript();
}

function SubmitQuestionScore() {
    var tScore = _Navigator.GetUserScore();
    //var classAvg = _Navigator.GetClassAverageScore();

    $("#yScore").addClass("p" + tScore.userScorePerc);
    $("#inCirTxt1").html(tScore.userScorePerc + "%");
    $("#inScrTxt1").html("Your score: " + tScore.userScorePerc + "%");    

    var finalScore = (tScore.userScorePerc) / 100;
    //grade_problem_and_report(finalScore);
    
    //$("#aScore").addClass("p" + classAvg.ClassAvgScore);
    //$("#inCirTxt3").html(classAvg.ClassAvgScore + "%");
    //$("#inScrTxt3").html("Class average: " + classAvg.ClassAvgScore + "%");
}

//Anu 26-sep-2018 gSessionId is not there in direct params cond
function grade_problem_and_report(finalScore) {
	if(gSessionId == undefined || gSessionId == "") {
		return;
	}
    var studentdata = {};
    studentdata.score = finalScore;
    studentdata.duration = "1";
    studentdata.submissionCount = "1";
    studentdata.nAttempts = "1";
    studentdata.answers = "1";
    studentdata.problemNumber = gProbNumber;
    var jsonSerialized = JSON.stringify(studentdata);

    var p_gid = 'usefromsession';
    sid = gSessionId;  //document.location.href.split("#")[1].replace("/", "").replace("/", "");
    var _serviceurl = window.location.origin + "/econservice";
    var servcUrl = _serviceurl + "/gldata/grade_problem_and_report/" + sid + "/" + p_gid + "/";
    $.ajax({
        type: "POST",
        url: servcUrl,
        data: jsonSerialized,           
        success: function (result) {
            if (JSON.parse(JSON.stringify(result)).indexOf("<Response [200]>") > -1) {
                $("#gradeSuccessText").html('<p style="margin-bottom: 10px;">Your score has been successfully posted to the gradebook. Your score is calculated based on the settings by the instructor (' + tScoreObj.TeamPercentage + '% of team score + ' + tScoreObj.StudPercentage + '% of your score). Click on close to return to MyLab.</p>');
                $("#gradeSuccessButton").html('<input type="button" class="btn" id="btnclose" value="Close" onclick="window.close();">'); 
            } else {
                $("#gradeSuccessText").html('<p style="margin-bottom: 10px;">Due to some technical issues, your score was not posted to the gradebook. It has been reported to the support team, and will be manually updated in the gradebook. Your score is calculated based on the settings by the instructor (' + tScoreObj.TeamPercentage + '% of team score + ' + tScoreObj.StudPercentage + '% of your score). Click on close to return to MyLab. </p>');
                $("#gradeSuccessButton").html('<input type="button" class="btn" id="btnclose" value="Close" onclick="window.close();">');
            }
            console.log("done")            
        },
        error: function (error) { console.log("not done " + error) }
    });    
}

function getBookmarkData() {
    //url: gURL + "/getstudtrackingdata",
        //https://pe-ta.knowdl.com/getstudtrackingdata/?studid=Vinod1&moduleid=MM1&assignmentid=A1
    var serviceUrl = gURL + "/getstudtrackingdata/?studid=" + studId + "&moduleid=" + moduleId + "&assignmentid=" + assignmentId
    var outResult;

    $.ajax({
        type: 'GET',
        url: serviceUrl,
        dataType: "json",
        async: false,
        cache: false,
        success: function (result) {
            outResult = result;
            ShowMsg("Bookmarked data retrieved successfully.", true);
        },
        error: function (xhr, data, message) {
            ShowMsg("Error while fetching bookmark data. Please contact administrator.");
        }
    });
    return outResult;
}

function saveBookmarkData() {
    var trackingData = _Navigator.getBookmarkData();
    var JSONAttemptData = JSON.stringify(trackingData);
    //replace special characters.
    JSONAttemptData = JSONAttemptData.replace(/[^a-zA-Z ',"<>!~@#$%&*.+-=|\?()\[\]_{}\\ ]/g, "");

    $.ajax({
        type: 'POST',
        url: gURL + "/setstudtrackingdata/",
        data: { "studid": studId, "moduleid": moduleId, "assignmentid": assignmentId, "studentscore": gStudentScore, "trackingdata": JSONAttemptData },
        success: function (data) {
            ShowMsg("Data Bookmarked successfully.", true);
        },
        error: function (xhr, data, message) {
            ShowMsg("Error while bookmarking data.");
        }
    });
}

function getCommonData() {
    //url: gURL + "/getstudtrackingdata",
    //https://pe-ta.knowdl.com/getstudtrackingdata/?studid=Vinod1&moduleid=MM1&assignmentid=A1
    var serviceUrl = gURL + "/getcommondata/?teamid=" + teamId + "&moduleid=" + moduleId + "&assignmentid=" + assignmentId
    var outResult;

    $.ajax({
        type: 'GET',
        url: serviceUrl,
        dataType: "json",
        async: false,
        cache: false,
        success: function (result) {
            outResult = result;
            ShowMsg("Common data retrieved successfully.", true);
        },
        error: function (xhr, data, message) {
            ShowMsg("Error while fetching common data. Please contact administrator.");
        }
    });
    return outResult;
}

function saveCommonData() {
    var commonData = _Navigator.GetModuleCommonData();
    var JSONCommonData = JSON.stringify(commonData);
    //replace special characters.
    JSONCommonData = JSONCommonData.replace(/[^a-zA-Z ',"<>!~@#$%&*.+-=|\?()\[\]_{}\\ ]/g, "");

    $.ajax({
        type: 'POST',
        url: gURL + "/setcommondata/",
        data: { "teamid": teamId, "moduleid": moduleId, "assignmentid": assignmentId, "commondata": JSONCommonData },
        success: function (data) {
            ShowMsg("Common data saved successfully.", true);
            gCommonData = getCommonData();
        },
        error: function (xhr, data, message) {
            ShowMsg("Error while saving common data.");
        }
    });
}

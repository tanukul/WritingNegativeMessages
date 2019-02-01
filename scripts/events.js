$(document).on("click", ".question-band tr", function (event) {
    $('.question-band tr').removeClass("optionselected");
    $('.question-band tr').find(".option_icon").find("div").removeClass("optionspanselected");
    $(this).find(".option_icon").find("div").addClass("optionspanselected");
    $(this).addClass("optionselected");
    _Navigator.enabledisabelSubmitBtn();
});

$(document).on("click", ".info-icon,.pageinfo-details", function (event) {
    $("#infoDetails").load("pagedata/aboutpopup.htm");
    $("#transcriptDetails").slideUp("slow", function () {    // Animation complete.
    });
    //$("#transcriptDetails").hide();
    $("#infoDetails").slideToggle("slow", function () {
        //$("#infoDetails").find("footer").css("display", "none");        
    });
});
$(document).on("click", "#resultexpand", function (event) {
    debugger;
    $("#resultcollapse").show();
    $("#resultexpand").hide();
    $(".qArrowlink").each(function () {
        var qID = $(this).parent()[0].attributes[1].value;
        if ($("div[qID=" + qID + "]").css('display') != 'none') {


            if ($("div[qID=" + qID + "]").find(".qArrowlink img").hasClass("selctImg")) {

            } else {
                $("div[qID=" + qID + "]").find(".qArrowlink img").addClass("selctImg");
                $("div[qID=" + qID + "]").find(".qArrowlink img").attr("src", "assets/images/arrow_down_r.png");
                $("#" + qID).slideToggle("slow", function () {
                });

            }

        }

    })


});
$(document).on("click", "#resultcollapse", function (event) {
    $("#resultcollapse").hide();
    $("#resultexpand").show();
    $(".qArrowlink").each(function () {
        var qID = $(this).parent()[0].attributes[1].value;
        if ($("div[qID=" + qID + "]").css('display') != 'none') {

            if ($("div[qID=" + qID + "]").find(".qArrowlink img").hasClass("selctImg")) {
                $("#" + qID).slideToggle("slow", function () {
                });
                $("div[qID=" + qID + "]").find(".qArrowlink img").removeClass("selctImg");
                $("div[qID=" + qID + "]").find(".qArrowlink img").attr("src", "assets/images/arrow_side_r.png");
            }
            else {
                //$("div[qID=" + qID + "]").find(".qArrowlink img").addClass("selctImg");
                //$("div[qID=" + qID + "]").find(".qArrowlink img").attr("src", "assets/images/arrow_down_r.png");
                //$("#" + qID).slideToggle("slow", function () { });
            }

        }
    })
});
$(document).on("click", ".transcript-popup", function (event) {
    if ($(".transcript-popup").attr("aria-expanded") == "false") {
        $(".transcript-popup").attr("aria-expanded", "true");
        $("#transcriptDetails").load("pagedata/transcript.htm", function () {
            showupdateTranscript();
            $("#transcriptDetails").show();
            $("#infoDetails").hide();
        });
    }
    else {
        $("#transcriptDetails").hide();
        $(".transcript-popup").attr("aria-expanded", "false");
    }
});
$(document).on("click", "#btntranscriptclose", function (event) {
    debugger;

    $('#transcriptDetails').slideUp('slow', function () { });
    $("html, body").scrollTop(0);
});

$(document).on("click", "#btnaboutsimclose", function (event) {
    debugger;

    $('#infoDetails').slideUp('slow', function () { });
    $("html, body").scrollTop(0);
});
//Result page
$(document).on("click", ".qArrowlink,.qTitle", function (event) {
    var qID = $(this).parent()[0].attributes[1].value;

    if ($("div[qID=" + qID + "]").find(".qArrowlink img").hasClass("selctImg")) {
        $("div[qID=" + qID + "]").find(".qArrowlink img").removeClass("selctImg");
        $("div[qID=" + qID + "]").find(".qArrowlink img").attr("src", "assets/images/arrow_side_r.png");
    } else {
        $("div[qID=" + qID + "]").find(".qArrowlink img").addClass("selctImg");
        $("div[qID=" + qID + "]").find(".qArrowlink img").attr("src", "assets/images/arrow_down_r.png");
    }
    $("#" + qID).slideToggle("slow", function () {
    });
});

function showupdateTranscript() {
    var pageDt = _Navigator.Get();
    $.each(pageDt, function (key, value) {
        var curPage = _Navigator.GetCurrentPage();
        $.each(transcriptIDs, function (tkey, tValue) {
            if (value.pageId == tValue) {
                $("#transcriptDetails").find("div[id=" + value.pageId + "]").css("display", "inline-block");
                var tPageID = $("#transcriptDetails").find("div[id=" + value.pageId + "]");
                if (value.QuestionType == "DnD" && value.isQuestionAttempted && value.IsComplete) {
                    AddDraggableReviewTranscript(tPageID, value);
                }

                else {
                    if ((value.StudSelOption != undefined && value.StudSelOption.trim() != "")) {
                        if (value.QuestionType == "checklist") {
                            var tempAr = value.StudSelOption.split("_");
                            $(tPageID).find(".Toption[opt_id=" + tempAr[0] + "]").show();
                            $(tPageID).find(".Toption[opt_id=" + tempAr[1] + "]").show();
                        } else {
                            $(tPageID).find(".Toption[opt_id=" + value.StudSelOption + "]").show();
                            $(tPageID).find(".Toption[opt_id=" + value.StudSelOption + "]").css("display", "inline-block");
                        }
                    }
                }
            }
        });
    });
    updateLearningObjectives(false);
}


function retryModule() {
    _Navigator.IncreamentAttempt();
    _Navigator.RetryAttempt();
}

$(document).on('click', function (event) {
    if (event.target.id != "appmenulibar" && event.target.id != "appmenu" && event.target.id != "appmenulist") {
        $("#appmenu > li").attr('aria-expanded', "false");
        $("#appmenu > li").css("border", "0px");
        $("#appmenu > li").find(".dummyMenuDiv").hide();
    }
})

$(document).on("click", "#appmenu > li li a", function (event) {
    var levelPageId = $(this).attr("data-id");
    //alert(levelPageId)
    var jsonObj = {};
    jsonObj.isMenuVisit = true;
    jsonObj.pageId = levelPageId;
    _Navigator.LoadPage(levelPageId, jsonObj);
    //$("#appmenu li").attr("aria-expanded", false).css({ 'background': '#045C42' });
    //$("#appmenu li img").attr("src", "scripts/external/menu/menu-icon.png");
    event.preventDefault();
    event.stopPropagation();
    return false;
});

//Anu 20-sep-2018
//method gets ids of session data from econservice and call service to load team assignment setup details
var gSessionId = ""
var gProbNumber = -1;
var gTAUserName = "shwom4e"
var gAllowedAttempts = 0;
function GetQueryParams() {
    //Anu 26-sep-2018 added condition for direct params
    var t = $.url('?assignmentId');
    if ((t != undefined && t != "") || (document.location.href.indexOf("/preview/") != -1)) {
        UseQueryParams();
        //method gets first page details of team assignment setup
        GetAboutPageData();
    }
    else {
        var t = document.location.href.split("#");
        var t1 = decodeURI(t[1]);
        gSessionId = t1.replace("/", "").replace("/", "")
        //var turl = "https://pe-xl-dev.knowdl.com/econservice/gldata/get_session_data"; 
        var turl = "/econservice/gldata/get_session_data";
        turl = turl + t1;
        $.ajax({
            type: 'GET',
            url: turl,
            success: function (data) {
                if (data != undefined) {
                    var temp = JSON.parse(data);
                    if (temp.launch_data != undefined) {
                        if (temp.launch_data.custom_resource_id != undefined) {
                            assignmentId = temp.launch_data.custom_resource_id;
                        }
                        if (temp.launch_data.custom_course_id != undefined) {
                            courseId = temp.launch_data.custom_course_id;
                        }
                        if (eval("temp.launch_data.custom_target_" + temp.launch_data.custom_currentquestion) != undefined) {
                            moduleId = eval("temp.launch_data.custom_target_" + temp.launch_data.custom_currentquestion);
                        }
                        if (temp.launch_data.user_id != undefined) {
                            studId = temp.launch_data.user_id;
                        }
                        if (temp.launch_data.custom_firstname != undefined) {
                            studFirstname = temp.launch_data.custom_firstname;
                        }
                        if (temp.launch_data.custom_lastname != undefined) {
                            studLastname = temp.launch_data.custom_lastname;
                        }
                        if (temp.launch_data.custom_currentquestion != undefined) {
                            gProbNumber = temp.launch_data.custom_currentquestion;
                            //gProbNumber = eval("temp.launch_data.custom_target_" + temp.launch_data.custom_currentquestion)
                        }
                        if (eval("temp.launch_data.custom_target_" + temp.launch_data.custom_currentquestion) != undefined) {
                            gTAUserName = eval("temp.launch_data.custom_target_" + temp.launch_data.custom_currentquestion).split("/")[eval("temp.launch_data.custom_target_" + temp.launch_data.custom_currentquestion).split("/").length - 1];
                        }

                        if (temp.launch_data.custom_attemptsallowed != undefined) {
                            gAllowedAttempts = Number(temp.launch_data.custom_attemptsallowed);
                            attemptsRemaining = Number(temp.launch_data.custom_attemptsallowed);
                        }

                        //method gets first page details of team assignment setup
                        GetAboutPageData();
                    }
                }
            },
            error: function (xhr, data, message) {

            }
        });
    }
}

//Anu 26-sep-2018 added condition for direct params
function UseQueryParams() {
    var t = $.url('?assignmentId');
    if (t != undefined) {
        assignmentId = t;
    }
    else {
        assignmentId = Math.random();
    }
    t = $.url('?courseId');
    if (t != undefined) {
        courseId = t;
    }
    else {
        courseId = Math.random();
    }
    t = $.url('?moduleId');
    if (t != undefined) {
        moduleId = t;
    }
    else {
        moduleId = Math.random();
    }
    t = $.url('?studId');
    if (t != undefined) {
        studId = t;
    }
    else {
        studId = Math.random();
    }
    t = $.url('?studFirstname');
    if (t != undefined) {
        studFirstname = t;
    }
    else {
        studFirstname = "Test "
    }
    t = $.url('?studLastname');
    if (t != undefined) {
        studLastname = t;
    }
    else {
        studLastname = "Test "
    }
    t = $.url('?gProbNumber');
    if (t != undefined) {
        gProbNumber = t;
    }
    else {
        gProbNumber = Math.random();
    }
}

/* Dnd page code */
function initiateDragItems() {
    $(".dragDiv").draggable({
        cancel: "a.ui-icon",
        revert: "invalid",
        containment: ".wrapperimage",
        cursor: "move",
        drag: function (event, ui) {
        },
        start: function (event, ui) {
            $(ui.helper).css("z-Index", 100);
            ui.helper.data('rejected', true);
            ui.helper.data('original-position', ui.helper.offset());
        },
        revert: function (event, ui) {
            $(this).data("draggable");
            return !event;
        },
        stop: function (event, ui) {
            if (ui.helper.data('rejected') === true) {
                ui.helper.offset(ui.helper.data('original-position'));
            }
        }
    });
    $(".dropDiv1").droppable({
        accept: ".dragDiv",
        drop: function (event, ui) {
            ui.helper.data('rejected', false);
            AddDraggable(ui.draggable, ".dropDiv1");
        }
    });
    $(".dropDiv2").droppable({
        accept: ".dragDiv",
        drop: function (event, ui) {
            ui.helper.data('rejected', false);
            AddDraggable(ui.draggable, ".dropDiv2");
        }
    });
}

function AddDraggable($item, draggableClass) {
    var $dummyItem;
    if ($(draggableClass).find(".itemdropped").length == 8) {
        $item.offset($item.data('original-position'));
        return;
    }
    $item.appendTo(draggableClass)
    $item.addClass("itemdropped")
    if ($item.attr("crtDrop") == $(draggableClass).attr("DropId")) {
        $item.attr("isCrt", "true");

    } else {
        $item.attr("isCrt", "false");
    }
    $item.attr("crntDrop", $(draggableClass).attr("DropId"));


    $($item).append('<span id="delItem"><img src="assets/images/close-white.png" alt=""></span>')
    var top1 = 10;
    var top2 = 10;
    var i = 0;
    $(draggableClass).find(".itemdropped").each(function () {
        $(this).css({ left: "5px", top: "9px" });
    });
    if ($(".itemdropped").length == 8) {
        $("#btnSubmitDnD").k_enable();
    } else {
        $("#btnSubmitDnD").k_disable();
    }
}
function AddDraggableReview(_isTran, _selector, _isResult, _curPage) {
    var selector;
    var curPage;

    if (_isResult == undefined) {
        selector = $("." + _selector);
    } else {
        selector = $("#div" + _selector)
    }

    if (_isResult == undefined) {
        curPage = _Navigator.GetCurrentPage();
    } else {
        curPage = _curPage;
    }

    selectedOptID = curPage.questions[0];
    for (var n31 = 0; n31 < selectedOptID.length; n31++) {
        $(selector).find(".dragDiv[optionID='" + (selectedOptID[n31].optionID) + "']").attr("isCrt", selectedOptID[n31].isCrt);
        var cHTml = $(selector).find(".dragDiv[optionID='" + (selectedOptID[n31].optionID) + "']")[0].outerHTML;

        if (selectedOptID[n31].crntDrop == "1") {
            $(selector).find(".dropDiv1").append(cHTml)
        } else if (selectedOptID[n31].crntDrop == "2") {
            $(selector).find(".dropDiv2").append(cHTml)

        }
    }

    $(selector).find("#dropArea").find(".dragDiv").each(function () {
        if ($(selector).find(this).attr('isCrt') == "true")
            $(selector).find(this).css({ top: "10px", left: "9px", position: "relative", border: "1px solid green" });
        else
            $(selector).find(this).css({ top: "10px", left: "9px", position: "relative", border: "1px solid red" });
    });
    $(selector).find("#dragArea").html('');

    if (_isResult == undefined) {

        $(".submitFeedbackPopup").find("div#fdk[corrSequence='" + (selectedOptID.CorrectSequence) + "']").show();
        $('.option-group').k_disable();
        $(".submitFeedbackPopup").show();
        $(".submitFeedbackPopup").find("#lastspanNext").css("display", "block");
        $("#btnSubmitDnD").k_disable();
    }
    else {
        $(selector).find(".submitFeedbackPopup").find("div#fdk[corrSequence='" + (selectedOptID.CorrectSequence) + "']").show();
        $(selector).find('.option-group').k_disable();
        $(selector).find(".submitFeedbackPopup").show();
        $(selector).find(".submitFeedbackPopup").find("#lastspanNext").css("display", "block");
        $(selector).find("#btnSubmitDnD").k_disable();
    }
    if (_isResult == undefined) {
        $("#linknext").k_enable();
    } else {
        $(selector).find(".submitFeedbackPopup").addClass("submitFeedbackPopupSummary");
    }

}

function AddDraggableReviewTranscript(_selector, _curPage) {
    debugger;
    curPage = _curPage;
    selectedOptID = curPage.questions[0];
    var crntId;
    for (var k = 0; k < $(_selector).find(".droppedText").length; k++) {
        $(_selector).find(".droppedText")[k].innerHTML = '';
        crntId = $(_selector).find(".droppedText")[k].attributes[1].nodeValue;
        for (var n31 = 0; n31 < selectedOptID.length; n31++) {
            if (selectedOptID[n31].crntDrop == crntId) {
                $($(_selector).find(".droppedText")[k]).append((selectedOptID[n31].htm))
            }
        }
    }

}
$(document).on('click', "#delItem", function () {
    $(this).closest("div").removeAttr("isCrt");
    $(this).closest("div").removeAttr("crntDrop");
    $(this).closest("div").removeAttr("style");
    $(this).closest("div").removeClass("itemdropped")
    var HTML = $(this).closest("div")[0].outerHTML;
    $(this).closest("div").remove();
    $("#dragArea").append(HTML);
    $("#dragArea").find("#delItem").remove();
    initiateDragItems();
    if ($(".itemdropped").length == 8) {
        $("#btnSubmitDnD").k_enable();
    } else {
        $("#btnSubmitDnD").k_disable();
    }
});
$(document).on('keyup', "#delItem", function (event) {
    if (window.event) {
        key = window.event.keyCode;
    } else if (event) {
        key = event.keyCode;
    }
    if (key == 13) {
        $(this).trigger('click');
    }
});

$(document).on('click', "#btnSubmitDnD", function () {
    debugger
    $("#infoDetails").find(".submitFeedbackPopup").remove();
    $("#dropArea").find("span#delItem").each(function () {
        $(this).remove();
    });
    var curPage = _Navigator.GetCurrentPage();
    var totalScore = 0;
    var _Score = 0;
    var corrSequence = 0;
    selectedOptID = [];
    var dropId = $("#dropArea").attr('dropid');

    $("#dropArea").find(".dragDiv").each(function (_trIndex, _tr) {
        obj = {}
        obj.optionID = _trIndex + 1;
        obj.isCrt = $(".dragDiv[optionID='" + (_trIndex + 1) + "']").attr("isCrt")
        obj.htm = $(".dragDiv[optionID='" + (_trIndex + 1) + "']").html();
        if (obj.isCrt == "true") {
            $(".dragDiv[optionID='" + (_trIndex + 1) + "']").css("border", "1px solid green")
            totalScore++;
        }
        else {

            $(".dragDiv[optionID='" + (_trIndex + 1) + "']").css("border", "1px solid red")
        }
        obj.crntDrop = $(".dragDiv[optionID='" + (_trIndex + 1) + "']").attr("crntDrop");
        selectedOptID.push(obj);
    });

    if (totalScore == 8) {
        _Score = 5;
        corrSequence = 1;
    }
    else if (totalScore == 7 || totalScore == 6 || totalScore == 5) {
        _Score = 3;
        corrSequence = 2;
    }
    else if (totalScore == 4 || totalScore == 3 || totalScore == 2) {
        _Score = 1;
        corrSequence = 3;
    }
    else {
        _Score = 0;
        corrSequence = 4;

    }

    selectedOptID.CorrectSequence = corrSequence;
    $(".submitFeedbackPopup").find("div#fdk[corrSequence='" + (selectedOptID.CorrectSequence) + "']").show();
    curPage.questions.push(selectedOptID);
    curPage.questions[0].isCurrent = true;
    curPage.questions[0].isAnswered = true;
    curPage.isQuestionAttempted = true;
    curPage.userScore = _Score;

    $('.option-group').k_disable();
    $(".submitFeedbackPopup").show();
    $(".submitFeedbackPopup").find("#lastspanNext").css("display", "block");
    $("#btnSubmitDnD").k_disable();
    $("#linknext").k_enable();
    $('html,body').animate({ scrollTop: document.body.scrollHeight }, 1000, function () { });
    //saveBookmarkData();
});
$(document).on('keyup', "#btnSubmitDnD", function (event) {
    if (window.event) {
        key = window.event.keyCode;
    } else if (event) {
        key = event.keyCode;
    }
    if (key == 13) {
        $(this).trigger('click');
    }
});



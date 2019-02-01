//This api will contain navigation logic and page load.
//It will also handle the question navigation if the page is having multiple questions.
var transcriptIDs = [];
var tScoreObj = '';
var gVisitedPages = [];
var gCommonData = '';
var gRandomData = [];

var _Navigator = (function () {
    var _currentPageId = "";
    var _currentPageObject = {};
    var progressLevels = [20];
    var _NData = {
        "l1p1": {
            pageId: "l1p1",
            prevPageId: "",
            nextPageId: "l1p2",
            dataurl: "intro_s1.htm",
            datalevel: 1,
            isStartPage: true,
            options: [{
                NextPgId: "l1p2"
            }]
        },
        "l1p2": {
            pageId: "l1p2",
            prevPageId: "l1p1",
            nextPageId: "",
            dataurl: "page2_q1.htm",
            datalevel: 1,
            questions: [],
            isQuestion: true,
            isQuestionAttempted: false,
            isCustomNext: true,
            isRandomOpt: true,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 1,
            options: [{
                NextPgId: 'l1p3'
            },
             {
                 NextPgId: 'l1p4'
             },
            {
                NextPgId: 'l1p5'
            }]
        },
        "l1p3": {
            pageId: "l1p3",
            prevPageId: "l1p2",
            nextPageId: "l1p6",
            dataurl: "page3_q2a.htm",
            datalevel: 1,
            questions: [],
            isQuestion: true,
            isQuestionAttempted: false,
            isRandomOpt: true,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 2,
            options: [{
                NextPgId: 'l1p6'
            }]
        },
        "l1p4": {
            pageId: "l1p4",
            prevPageId: "l1p2",
            nextPageId: "l1p6",
            dataurl: "page4_q2b.htm",
            datalevel: 1,
            questions: [],
            isQuestion: true,
            isQuestionAttempted: false,
            isRandomOpt: true,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 2,
            options: [{
                NextPgId: 'l1p6'
            }]
        },
        "l1p5": {
            pageId: "l1p5",
            prevPageId: "l1p2",
            nextPageId: "l1p6",
            dataurl: "page5_q2c.htm",
            datalevel: 1,
            questions: [],
            isQuestion: true,
            isQuestionAttempted: false,
            isRandomOpt: true,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 2,
            options: [{
                NextPgId: 'l1p6'
            }]
        },
        "l1p6": {
            pageId: "l1p6",
            prevPageId: "l1p7",
            nextPageId: "l1p7",
            isMMPage:true,
            dataurl: "page6_m1.htm",
            datalevel: 1,
            options: [{
                NextPgId: "l1p7"
            }]
        },
        "l1p7": {
            pageId: "l1p7",
            prevPageId: "l1p6",
            nextPageId: "l1p8",
            dataurl: "page7_q3.htm",
            datalevel: 1,
            questions: [],

            isCustomQuestion: true,
            isQuestionAttempted: false,
            maxScore: 5,
            QuestionType: "DnD",
            questionId: 2,
            options: [{
                NextPgId: 'l1p8'
            }]
        },
        "l1p8": {
            pageId: "l1p8",
            prevPageId: "l1p7",
            nextPageId: "",
            dataurl: "page8_q4.htm",
            datalevel: 1,
            questions: [],
            isQuestion: true,
            isQuestionAttempted: false,
            isCustomNext: true,
            isRandomOpt: true,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 1,
            options: [{
                NextPgId: 'l1p9'
            },
             {
                 NextPgId: 'l1p10'
             },
            {
                NextPgId: 'l1p11'
            }]
        },
        "l1p9": {
            pageId: "l1p9",
            prevPageId: "l1p8",
            nextPageId: "l1p12",
            dataurl: "page9_q5a.htm",
            datalevel: 1,
            questions: [],
            isQuestion: true,
            isQuestionAttempted: false,
            isRandomOpt: true,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 2,
            options: [{
                NextPgId: 'l1p12'
            }]
        },
        "l1p12": {
            pageId: "l1p12",
            prevPageId: "l1p9",
            nextPageId: "l1p15",
            dataurl: "page12_q6a.htm",
            datalevel: 1,
            questions: [],
            isQuestion: true,
            isQuestionAttempted: false,
            isRandomOpt: true,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 2,
            options: [{
                NextPgId: 'l1p15'
            }]
        },
        "l1p15": {
            pageId: "l1p15",
            prevPageId: "l1p12",
            nextPageId: "l1p18",
            dataurl: "page15_q7a.htm",
            datalevel: 1,
            questions: [],
            isQuestion: true,
            isQuestionAttempted: false,
            isRandomOpt: true,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 2,
            options: [{
                NextPgId: 'l1p18'
            }]
        },
        "l1p10": {
            pageId: "l1p10",
            prevPageId: "l1p8",
            nextPageId: "l1p13",
            dataurl: "page10_q5b.htm",
            datalevel: 1,
            questions: [],
            isQuestion: true,
            isQuestionAttempted: false,
            isRandomOpt: true,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 2,
            options: [{
                NextPgId: 'l1p13'
            }]
        },
        "l1p13": {
            pageId: "l1p13",
            prevPageId: "l1p10",
            nextPageId: "l1p16",
            dataurl: "page13_q6b.htm",
            datalevel: 1,
            questions: [],
            isQuestion: true,
            isQuestionAttempted: false,
            isRandomOpt: true,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 2,
            options: [{
                NextPgId: 'l1p16'
            }]
        },
        "l1p16": {
            pageId: "l1p16",
            prevPageId: "l1p13",
            nextPageId: "l1p18",
            dataurl: "page16_q7b.htm",
            datalevel: 1,
            questions: [],
            isQuestion: true,
            isQuestionAttempted: false,
            isRandomOpt: true,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 2,
            options: [{
                NextPgId: 'l1p18'
            }]
        },
        "l1p11": {
            pageId: "l1p11",
            prevPageId: "l1p8",
            nextPageId: "l1p14",
            dataurl: "page11_q5c.htm",
            datalevel: 1,
            questions: [],
            isQuestion: true,
            isQuestionAttempted: false,
            isRandomOpt: true,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 2,
            options: [{
                NextPgId: 'l1p14'
            }]
        },
        "l1p14": {
            pageId: "l1p14",
            prevPageId: "l1p11",
            nextPageId: "l1p17",
            dataurl: "page14_q6c.htm",
            datalevel: 1,
            questions: [],
            isQuestion: true,
            isQuestionAttempted: false,
            isRandomOpt: true,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 2,
            options: [{
                NextPgId: 'l1p17'
            }]
        },
        "l1p17": {
            pageId: "l1p17",
            prevPageId: "l1p14",
            nextPageId: "l1p18",
            dataurl: "page17_q7c.htm",
            datalevel: 1,
            questions: [],
            isQuestion: true,
            isQuestionAttempted: false,
            isRandomOpt: true,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 2,
            options: [{
                NextPgId: 'l1p18'
            }]
        },
        "l1p18": {
            pageId: "l1p18",
            prevPageId: "l1p15",
            nextPageId: "l1p19",
            isMMPage:true,
            dataurl: "page18_m2.htm",
            datalevel: 1,
            options: [{
                NextPgId: "l1p19"
            }]
        },
        "l1p19": {
            pageId: "l1p19",
            prevPageId: "l1p18",
            nextPageId: "l1p33",
            dataurl: "page19_q8.htm",
            datalevel: 1,
            questions: [],
            isQuestion: true,
            isQuestionAttempted: false,
            isRandomOpt: true,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 3,
            options: [{
                NextPgId: "l1p33"
            }]
        },

        "l1p33": {
            pageId: "l1p33",
            prevPageId: "l1p26",
            nextPageId: "",
            dataurl: "result.htm",
            datalevel: 1,
            isLastPage: true,
            options: [{
                NextPgId: null
            }]
        }

    }
    //var arrRandomPagesSettings = {
    //    'l1p18': {
    //        pgid: ['l1p21','l1p22']
    //    },
    //    'l1p19': {
    //        pgid: ['l1p21','l1p22']
    //    },
    //    'l1p20': {
    //        pgid: ['l1p21','l1p22']
    //    }
    //};
    var _StateData = {};

    function OnPageLoad() {

        $("#infoDetails").hide();
        $("#transcriptDetails").hide();
        var currPage = _Navigator.GetCurrentPage();
        if (currPage.isStartPage) {
            updateLearningObjectives(false);
        }
    }
    return {
        Get: function () {
            return _NData;
        },
        Set: function (_bkNdata) {
            _NData = _bkNdata;
        },
        GetAttemptNumber: function () {
            return currentAttempt;
        },
        IncreamentAttempt: function () {
            currentAttempt++;
        },
        getBookmarkData: function () {
            var currPage = _Navigator.GetCurrentPage();
            var bkobj = {}
            bkobj.transcriptIDs = transcriptIDs;
            bkobj.tScoreObj = tScoreObj;
            bkobj.teamId = teamId;
            bkobj.gStudentScore = gStudentScore;
            bkobj.currentAttempt = currentAttempt;
            bkobj.gVisitedPages = gVisitedPages;
            bkobj.gCommonData = gCommonData;
            bkobj.gRandomData = gRandomData;
            bkobj._NData = _Navigator.Get();
            bkobj.lastVisitedPageID = currPage.pageId;
            return bkobj;
        },
        setBookmarkData: function (bkobj) {
            if (bkobj.transcriptIDs != undefined) {
                transcriptIDs = bkobj.transcriptIDs;
            }
            if (bkobj.transcriptIDs != undefined) {
                tScoreObj = bkobj.tScoreObj;
            }
            teamId = bkobj.teamId;
            gStudentScore = bkobj.gStudentScore
            currentAttempt = bkobj.currentAttempt;
            if (bkobj.gVisitedPages != undefined) {
                gVisitedPages = bkobj.gVisitedPages;
            }
            if (bkobj.gCommonData != undefined) {
                gCommonData = bkobj.gCommonData;
            }
            if (bkobj.gRandomData != undefined) {
                gRandomData = bkobj.gRandomData;
            }
            if (bkobj._NData != undefined) {
                _Navigator.Set(bkobj._NData)
            }
        },
        Start: function () {
            var Dataurl = $.url('?page');
            if (Dataurl == "" || Dataurl == undefined) {
                this.LoadPage("l1p1");
                isPrev = false;
            } else {
                this.LoadPage(Dataurl);
            }
        },
        LoadPage: function (pageId, jsonObj) {
            if (jsonObj == undefined) {
                jsonObj = {};
            }
            _currentPageId = pageId;
            _currentPageObject = _NData[_currentPageId];

            if (transcriptIDs.length == 0) {
                transcriptIDs.push(_currentPageObject.pageId);
            } else {
                var isAdded = false;
                $.each(transcriptIDs, function (key, value) {
                    if (value == _currentPageObject.pageId) {
                        isAdded = true;
                    }
                });
                if (!isAdded) {
                    transcriptIDs.push(_currentPageObject.pageId);
                }
            }

            if (_currentPageObject.IsComplete == undefined || !_currentPageObject.IsComplete) {
                if (_currentPageObject.pageId != "l1p1") {
                    this.CompletePage()
                }
            }
            this.UpdateProgressBar();

            $("#linkprevious").k_enable();
            $("#linknext").k_enable();
            if (_currentPageObject.isStartPage != undefined && _currentPageObject.isStartPage) {
                $("#linkprevious").k_disable();
                $("#linknext").k_enable();
            }
            if (_currentPageObject.isLastPage != undefined && _currentPageObject.isLastPage) {
                $("#linknext").k_disable();
            }

            _currentPageObject.isVisited = true;

            if (gVisitedPages.length == 0) {
                var pageDt = _Navigator.Get();
                $.each(pageDt, function (key, value) {
                    if (value.isVisited) {
                        gVisitedPages.push(_currentPageObject.pageId);
                    }
                });
            } else {
                var isAdded = false;
                $.each(gVisitedPages, function (key, value) {
                    if (value == _currentPageObject.pageId) {
                        isAdded = true;
                    }
                });
                if (!isAdded) {
                    gVisitedPages.push(_currentPageObject.pageId);
                }
            }


            if (prevPgId != undefined && prevPgId != '') {
                _currentPageObject.prevPageId = prevPgId;
                prevPgId = '';
            }


            var pageUrl = _Settings.dataRoot + _currentPageObject.dataurl + _Caching.GetUrlExtension();;
            if (_currentPageObject.isStartPage) {
                $(".main-content").load(pageUrl, function () {
                    OnPageLoad();
                    $("h1").focus();
                    if (!isPrev) {
                        _Navigator.AddMenuList(_currentPageId);
                        $("#wrapper").find(".submitFeedbackPopup").remove();
                    } else {
                        $("#wrapper").find(".submitFeedbackPopup").remove();
                        $("#linknext").k_enable();
                    }
                });
            }
            else if (_currentPageObject.isLastPage) {
                $(".main-content").fadeTo(250, 0.25, function () {
                    $(".main-content").load(pageUrl, function () {
                        $(this).fadeTo(600, 1)
                        OnPageLoad();
                        $("h2.pageheading").focus();
                        if (!isPrev) {
                            _Navigator.AddMenuList(_currentPageId);

                            _Navigator.LoadSummaryPage();
                            $("#wrapper").find(".submitFeedbackPopup").hide();
                            $(".qData").find(".submitFeedbackPopup").show();
                            SubmitQuestionScore();
                            updateLearningObjectives(true);
                            _Navigator.checkRetryButton();
                            $("#linknext").k_disable();
                        }
                        else if (isPrev) {
                            _Navigator.LoadSummaryPage();
                            $("#wrapper").find(".submitFeedbackPopup").hide();
                            $(".qData").find(".submitFeedbackPopup").show();
                            SubmitQuestionScore();
                            updateLearningObjectives(true);
                            _Navigator.checkRetryButton();
                            $("#linknext").k_disable();
                        }
                    });
                });
            }
            else {
                $(".main-content").fadeTo(250, 0.25, function () {
                    $(".main-content").load(pageUrl, function () {
                        $(this).fadeTo(600, 1)
                        OnPageLoad();
                        $("h2.pageheading").focus();
                        if (!isPrev) {

                            if (_currentPageObject.isQuestion == true) {
                                _Navigator.initializeFdkdiv();
                            } else if (_currentPageObject.isCustomQuestion == true) {
                                _Navigator.initializeCustomFdkdiv();
                            } else {
                                $("#wrapper").find(".submitFeedbackPopup").remove();
                            }
                            _Navigator.AddMenuList(_currentPageId);
                            //RA22Oct18 - not required
                            //tempgCommonData = getCommonData();
                            //if ((gCommonData == '' || gCommonData==undefined) && tempgCommonData == undefined) {
                            //    saveCommonData();
                            //} else {
                            //    gCommonData = getCommonData();
                            //}                          
                        }
                        else {
                            if (_currentPageObject.isQuestion == true) {
                                _Navigator.initializeFdkdiv();
                            } else if (_currentPageObject.isCustomQuestion == true) {
                                _Navigator.initializeCustomFdkdiv();
                            }
                            else {
                                $("#wrapper").find(".submitFeedbackPopup").remove();
                                $("#linknext").k_enable();
                            }
                            $("#appmenu > li").attr('aria-expanded', "false");
                            $("#appmenu > li").css("border", "0px");
                            $("#appmenu > li").find(".dummyMenuDiv").hide();

                        }
                    });
                });
            }
            //saveBookmarkData();
            $("html, body").scrollTop(0);
        },
        LoadDefaultQuestion: function () {
            if (_currentPageObject.questions.length > 0) {
                _questionId = 0;
                _currentPageObject.questions[0].isQuestionVisit = true;
                for (var i = 0; i < _currentPageObject.questions.length; i++) {
                    if (_currentPageObject.questions[i].isCurrent) {
                        _questionId = i;
                    }
                }
                //second parameter is to disable question effect.
                _Question.Load(_currentPageObject.questions[_questionId], {
                    disableEffect: true
                });
            }
        },
        Prev: function () {
            // StopQuestionSSEorAjax();
            isPrev = true;
            this.LoadPage(_currentPageObject.prevPageId);
        },
        Next: function () {
            isPrev = false;
            $("#linkprevious").k_enable();
            //Anu 26-sep-2018 stop all existing SSE or ajax timers
            //  StopQuestionSSEorAjax(); //stop question SSE/ajax
            prevQNumber = _currentPageObject.questionId;
            prevPgId = _currentPageObject.pageId;
            if (_currentPageObject.isCustomNext != undefined && _currentPageObject.isCustomNext) {
                if (_currentPageObject.nextPageId == '') {
                    var _nxtPgID = _Navigator.GetRandomPageId();
                    _currentPageObject.nextPageId = _nxtPgID;
                    this.LoadPage(_nxtPgID);
                } else {
                    this.LoadPage(_currentPageObject.nextPageId);
                }
            }
            else {
                this.LoadPage(_currentPageObject.nextPageId);
            }
        },
        GetProgressData: function () {
            var progData = [];
            var visitpage = 0;
            for (var p = 1; p <= progressLevels.length; p++) {
                //var visitpage = 0;
                for (var i in _NData) {
                    if (p == _NData[i].datalevel) {
                        if (_NData[i].IsComplete) {
                            visitpage++;
                        }
                    }
                }
                progData.push(visitpage);
            }
            return visitpage;
        },
        UpdateProgressBar: function () {
            if (_currentPageObject.isVisited) {
                return;
            }
            var TotalLength = _Navigator.LongestPath(_Navigator.Get(), _Navigator.Get()[_currentPageObject.pageId]).TotalLength;
            var progData = this.GetProgressData();
            console.log(TotalLength)
            //for (var i = 0; i < progData.length; i++) {
            var lprog_pecent = (progData / ((TotalLength + progData) - 1) * 100).toFixed(2);
            $(".progressForeground.ProgressForeGroundColor").css("width", lprog_pecent + "%");
            $("#progressInnrDiv").text("Progress " + Math.round(lprog_pecent) + "%");
            if (lprog_pecent == 100) {
                $(".progressForeground.ProgressForeGroundColor").css("width", "100%");
                $("#progressInnrDiv").text("Progress 100%");
            }
        },
        GetCurrentPage: function () {
            return _currentPageObject;
        },
        CompletePage: function (extendedJson) {
            _currentPageObject.IsComplete = true;
            _currentPageObject = $.extend(true, _currentPageObject, extendedJson)
            _StateData[_currentPageObject.pageId] = $.extend(true, {}, _currentPageObject);
        },
        GetTotalScore: function () {
            var ObtainPoint = 0;
            var totalPoints = 0;
            for (var i in _NData) {
                if (_NData[i].questions.length > 0) {
                    for (var j = 0; j < _NData[i].questions.length; j++) {
                        totalPoints = totalPoints + _QData[_NData[i].questions[j].Id].totalPoints;
                        if (_NData[i].questions[j].isAnswered != undefined && _NData[i].questions[j].isAnswered) {
                            ObtainPoint = ObtainPoint + (_NData[i].questions[j].points);
                        }
                    }
                }
            }
            var score = (ObtainPoint / totalPoints) * 100;
            return score.toFixed(0);
        },
        UpdateScore: function () {
            var percScore = this.GetTotalScore()
            $("#scoreInnrDiv").html(percScore + "%");
        },
        AddMenuList: function (_currentPageId) {
            var curPage = _Navigator.GetCurrentPage();
            if (curPage.isMenuVisited == undefined && curPage.hideheaderNav == undefined) {
                if ((curPage.isQuestion != undefined && curPage.isQuestion) || curPage.isStartPage || (curPage.isMMPage != undefined && curPage.isMMPage) || (curPage.isCustomQuestion != undefined && curPage.isCustomQuestion)) {
                    var pageHeading = $(".main-content").find(".pageheading").text();
                } else if (curPage.isLastPage) {
                    var pageHeading = $(".main-content").find(".resultTitle").text();
                }
                curPage.PageTitle = pageHeading;
                $("#appmenulist").append('<li role="menuitem"><a href="javascript:void(0)" class="menuitem" data-id="' + _currentPageId + '">' + pageHeading + '</a></li>');
            }
            curPage.isMenuVisited = true;
            $("#appmenu > li").attr('aria-expanded', "false");
            $("#appmenu > li").css("border", "0px");
            $("#appmenu > li").find(".dummyMenuDiv").hide();
            if (curPage.isLastPage == undefined)
                showupdateTranscript()

        },
        //RA-11Sep18-Cudtom Question Logic functions
        initializeCustomFdkdiv: function () {
            var tempDiv = $("main").find(".submitFeedbackPopup")[0].outerHTML;
            $("main").find(".submitFeedbackPopup").remove();
            $("header").find(".submitFeedbackPopup").remove();
            $("#infoDetails").find(".submitFeedbackPopup").remove()
            $("#wrapper").find(".submitFeedbackPopup").remove();
            $(tempDiv).insertBefore("footer");
            _Navigator.initializeCustomQuestion();
        },
        initializeCustomQuestion: function () {
            var curPage = _Navigator.GetCurrentPage();
            if (curPage.isQuestionAttempted) {
                _Navigator.initializeCustomQuestionReview();
            } else {
                $("#btnSubmitResp").k_disable();
                $("#btnSubmitDnD").k_disable();
                $("#btnSubmitImg").k_disable();
                $("#linknext").k_disable();
                if (curPage.QuestionType == "DnD") {
                    initiateDragItems();
                }
            }
        },
        initializeCustomQuestionReview: function (key, value, isResult) {
            //Logic Pending
            var curPage;
            if (isResult != undefined && isResult) {
                curPage = value;
            } else {
                curPage = _Navigator.GetCurrentPage();
            }
            if (curPage.QuestionType == "DnD" && curPage.isQuestionAttempted) {
                if (key == undefined) {
                    key = "container";
                }
                AddDraggableReview(false, key, isResult, curPage);
            } else { }

            $(".submitFeedbackPopup").find("#lastspanNext").css("display", "block");
            $("#btnSubmitResp").k_disable();
            $("#btnSubmitDND").k_disable();
            $("#btnSubmitImg").k_disable();
            $("#linknext").k_enable();
        },

        //RA-11Sep18-Question Logic functions
        initializeFdkdiv: function () {
            var tempDiv = $("main").find(".submitFeedbackPopup")[0].outerHTML;
            $("main").find(".submitFeedbackPopup").remove();
            $("header").find(".submitFeedbackPopup").remove();
            $("#infoDetails").find(".submitFeedbackPopup").remove()
            $("#wrapper").find(".submitFeedbackPopup").remove();
            $(tempDiv).insertBefore("footer");
            _Navigator.initializeQuestion();
        },
        initializeQuestion: function () {
            var curPage = _Navigator.GetCurrentPage();
            if (curPage.isQuestionAttempted) {
                $("#btnSubmit").k_disable();
                _Navigator.initializeQuestionReview();
            } else {
                $("#btnSubmit").k_disable();
                $("#linknext").k_disable();
            }
            if (curPage.isShowHideOpt != undefined && curPage.isShowHideOpt == true) {
                _Navigator.ShowHideOptions(curPage);
            }
            if (curPage.isRandomOpt != undefined && curPage.isRandomOpt == true) {
                _Navigator.RandomizeQuestionOptions(curPage);
            }

        },
        ShowHideOptions: function (curPage, isReult, key) {
            var _table;
            if (isReult != undefined && isReult == true) {
                _table = $("#div" + key).find(".option-group table");
            } else {
                _table = $(".option-group table");
            }
        },
        RandomizeQuestionOptions: function (curPage, isReult, key) {
            var obj = {};
            obj.optClass = [];
            var _table;
            if (isReult != undefined && isReult == true) {
                _table = $("#div" + key).find(".option-group table");
            } else {
                _table = $(".option-group table");
            }
            var tableTRLength = _table.find("tr").length;
            var tableTRArray = [];
            for (var k = 0; k < tableTRLength; k++) {
                if ($(_table.find("tr")[k]).is(":visible")) {
                    tableTRArray.push(_table.find("tr")[k].outerHTML);
                }
            }
            _table.html('');

            if (curPage.isQuestionAttempted) {
                var tempData;
                for (var n11 = 0; n11 < gRandomData.length; n11++) {
                    if (curPage.pageId == gRandomData[n11].pageId) {
                        tempData = gRandomData[n11];
                    }
                }
                if (tempData != undefined) {
                    for (var n = 0; n < tempData.optClass.length; n++) {
                        for (var k = 0; k < tableTRArray.length; k++) {
                            var getClass = $(tableTRArray[k]).attr("class");
                            getClass = getClass.replace(' optionselected', '');
                            getClass = getClass.trim();
                            if (tempData.optClass[n] == getClass) {
                                $(_table).append(tableTRArray[k]);
                            }
                        }
                    }
                }
            } else {
                obj.pageId = curPage.pageId;
                tableTRArray = _Navigator.ShuffleArray(tableTRArray);
                for (var n = 0; n < tableTRArray.length; n++) {
                    $(_table).append(tableTRArray[n]);
                    obj.optClass.push($(tableTRArray[n]).attr("class"));
                }
                if (gRandomData.length == 0) {
                    gRandomData.push(obj);
                } else {
                    for (var n11 = 0; n11 < gRandomData.length; n11++) {
                        if (curPage.pageId == gRandomData[n11].pageId) {
                            gRandomData.splice(n11, 1);
                        }
                    }
                    gRandomData.push(obj);
                }
            }
        },
        ShuffleArray: function (arr) {
            for (
                var j, x, i = arr.length; i;
                j = parseInt(Math.random() * i),
                x = arr[--i], arr[i] = arr[j], arr[j] = x
            );
            return arr;
        },
        enabledisabelSubmitBtn: function () {
            var curPage = _Navigator.GetCurrentPage();
            if (curPage.QuestionType == "checklist") {
                var checkedCount = 0;
                for (var n21 = 0; n21 < $('.option-group').find("input").length; n21++) {
                    var inputT = $('.option-group').find("input")[n21];
                    if ($(inputT).prop("checked")) {
                        checkedCount++;
                    }
                }
                if (checkedCount == 2) {
                    $("#btnSubmit").k_enable();
                } else {
                    $("#btnSubmit").k_disable();
                }
            } else {
                $("#btnSubmit").k_enable();
            }
        },
        initializeQuestionReview: function () {
            var curPage = _Navigator.GetCurrentPage();
            if (curPage.QuestionType == "checklist") {
                for (var n21 = 0; n21 < $('.option-group').find("input").length; n21++) {
                    var inputT = $('.option-group').find("input")[n21];
                    for (n22 = 0; n22 < curPage.questions[0].length; n22++) {
                        if ($(inputT).attr("opt_id") == curPage.questions[0][n22]) {
                            $(inputT).prop("checked", "true");
                            $(inputT).closest("tr").find(".option_icon").find("span").addClass("optionspanselected");
                            $(inputT).closest("tr").addClass("optionselected");

                        }
                    }
                }
            } else {
                for (var n21 = 0; n21 < $('.option-group').find("tr").length; n21++) {
                    var inputT = $('.option-group').find("tr")[n21];

                    //  for (n22 = 0; n22 < getData.length; n22++) {

                    if ($(inputT).attr("opt_id") == curPage.StudSelOption) {
                        $(inputT).find(".option_icon").find("div").addClass("optionspanselected");
                        $(inputT).addClass("optionselected");
                        $(inputT).attr("selected", true).css("border", "1px solid #33A7C0");
                        // }
                    }
                    //  }
                }
                $(".submitFeedbackPopup").show();
                for (var n21 = 0; n21 < $(".submitFeedbackPopup").find("div#fdk").length; n21++) {
                    var currOptionID = $(".submitFeedbackPopup").find("div#fdk")[n21].attributes[1].nodeValue;
                    // for (n22 = 0; n22 < curPage.questions[0].length; n22++) {
                    currOptionID = currOptionID.replace(currOptionID, "option" + currOptionID);
                    if (currOptionID == curPage.StudSelOption) {
                        $($(".submitFeedbackPopup").find("div#fdk")[n21]).show();
                    }
                    // }
                }
                $(".submitFeedbackPopup").append(document.getElementById('lastspanNext').outerHTML);
                $(".submitFeedbackPopup").find("#lastspanNext").css("display", "block").show();
            }
            $('.option-group').k_disable();
            $("#linknext").k_enable();
        },
        optionPageSubmitButtonClick: function (_data) {
            var curPage = _Navigator.GetCurrentPage();
            var selectedOptID = []
            if (curPage.QuestionType == "checklist") {
                for (var n21 = 0; n21 < $('.option-group').find("input").length; n21++) {
                    var inputT = $('.option-group').find("input")[n21];
                    if ($(inputT).prop("checked")) {
                        selectedOptID.push($(inputT).attr("optionID"));
                    }
                }
            } else {
                for (var n21 = 0; n21 < $('.option-group').find("tr").length; n21++) {
                    var inputT = $('.option-group').find("tr")[n21];
                    if ($(inputT).hasClass("optionselected")) {
                        selectedOptID.push($(inputT).attr("opt_id"));
                    }
                }
            }

            $('.option-group').k_disable();
            $(".submitFeedbackPopup").show();
            for (var n21 = 0; n21 < $(".submitFeedbackPopup").find("#fdk").length; n21++) {
                var currOptionID = $(".submitFeedbackPopup").find("#fdk")[n21].attributes[2].nodeValue;
                for (n22 = 0; n22 < selectedOptID.length; n22++) {
                    if (currOptionID == selectedOptID[n22]) {
                        $($(".submitFeedbackPopup").find("#fdk")[n21]).show();
                    }
                }
            }

            $("#btnSubmit").k_disable();
            $("#linknext").k_enable();
            curPage.questions.push(selectedOptID);
            curPage.questions[0].isCurrent = true;
            curPage.questions[0].isAnswered = true;
            curPage.isQuestionAttempted = true;
        },
        //end
        //RA-18Sep18-Result page/objective logic
        LoadSummaryPage: function () {
            debugger;
            finaltotalqcnt = 0;
            var pageDt = _Navigator.Get();
            $.each(pageDt, function (key, value) {
                if ((value.isCustomQuestion != undefined && value.isCustomQuestion == true) || (value.isQuestion != undefined && value.isQuestion == true)) {
                    if (value.isVisited) {
                        var curPage = value;
                        var tSelector = $("#div" + key).find('.option-group');
                        var tfSelector = $("#div" + key).find(".submitFeedbackPopup");
                        var tpieImage = $("div[qID=div" + key + "]").find(".pieimage");
                        var tqDataScoreSelector = $("div[qID=div" + key + "]").find(".qScore");

                        if (value.isCustomQuestion != undefined && value.isCustomQuestion == true) {
                            $("#infoDetails").find(".submitFeedbackPopup").remove();
                            _Navigator.initializeCustomQuestionReview(key, value, true);
                        } else {
                            _Navigator.RandomizeQuestionOptions(curPage, true, key);
                            $(tfSelector).show();
                            $(tfSelector).addClass("submitFeedbackPopupSummary");
                            $("#infoDetails").find(".submitFeedbackPopup").remove();

                            $(tfSelector).find("#fdk[opt_id=" + curPage.StudSelOption + "]").show();

                            $(tSelector).find("#span_" + curPage.StudSelOption).closest("tr").css({
                                "border": "4px solid #003058",
                                "border-radius": "5px",
                                "padding-top": "10px",
                                "padding-bottom": "10px",
                                "padding-left": "5px"
                            });

                            $(tSelector).find("#span_" + curPage.StudSelOption).closest("tr").addClass("optionselected")
                            $(tSelector).find("#span_" + curPage.StudSelOption).closest("tr").find(".option_icon").find("div").addClass("optionspanselected");
                            $(tSelector).find("#span_" + curPage.StudSelOption).closest("tr").css({
                                "border": "4px solid #003058",
                                "border-radius": "5px",
                                "padding-top": "10px",
                                "padding-bottom": "10px",
                                "padding-left": "5px"
                            });


                            $("#div" + key).find('.option-group').k_disable();
                        }
                        _image = "assets/images/" + curPage.userScore + "point.png";
                        $(tpieImage).html("<img alt='piechart' style='width:15px;height:16px;margin-top:4px;'src='" + _image + "'></img>");
                        finalScore = "Points " + curPage.userScore + " out of 5"
                        $(tqDataScoreSelector).html("<p><strong> " + finalScore + "</strong></p>");
                        $("#div" + key).hide();


                    } else {
                        $("div[qID=div" + key + "]").hide();
                        $("#div" + key).hide();
                    }
                }
            });
        },
        checkRetryButton: function () {
            var attemptsRemainingText = '';
            if (gAllowedAttempts == 0 || (_Navigator.GetAttemptNumber() < gAllowedAttempts)) {
                if (gAllowedAttempts != 0) {
                    var attemptsRemaining = (gAllowedAttempts - _Navigator.GetAttemptNumber());
                    attemptsRemainingText = 'Number of attempts remaining: ' + attemptsRemaining;
                } else {
                    attemptsRemainingText = 'Number of attempts remaining: Unlimited';
                }
                $("#retryattemptText").html(attemptsRemainingText);

            } else {
                attemptsRemainingText = 'Number of attempts remaining: none';
                $("#btnRetryResult").k_disable();
                $("#retryattemptText").html(attemptsRemainingText);
            }
        },
        RetryAttempt: function () {
            transcriptIDs = [];
            //tScoreObj = '';
            gVisitedPages = [];
            gStudentScore = 0;
            gCommonData = '';
            tempgCommonData = undefined;
            isPrev = false;
            var pageDt = _Navigator.Get();
            $.each(pageDt, function (key, value) {
                if (value.isQuestion != undefined && value.isQuestion == true) {
                    delete value.userScore;
                    value.isQuestionAttempted = false;
                    value.StudSelOption = "";
                    if (value.isCustomNext) {
                        value.nextPageId = '';
                    }
                }
                if (value.isCustomQuestion != undefined && value.isCustomQuestion == true) {
                    value.isQuestionAttempted = false;
                    delete value.userScore;
                    value.questions = [];
                }
                value.IsComplete = false;
                value.isVisited = false;
                delete value.isMenuVisited;
                delete value.PageTitle;
            });
            _Navigator.LoadPage("l1p1");
            //$.ajax({
            //    type: 'POST',
            //    url: gURL + "/retrysimandcleardata/",
            //    data: { "moduleid": moduleId, "assignmentid": assignmentId, "courseid": courseId, "teamid": teamId, "totalqcnt": finaltotalqcnt },
            //    success: function (data) {
            //        ShowMsg("Data cleared successfully.", true);
            //        _Navigator.LoadPage("l1p3");
            //    },
            //    error: function (xhr, data, message) {
            //        ShowMsg("Error while clearing data.");
            //    }
            //});        
        },
        GetClassAverageScore: function () {
            var serviceUrl = gURL + "/getteamandclassavg/?moduleid=" + moduleId + "&assignmentid=" + assignmentId + "&courseid=" + courseId + "&teamid=" + teamId
            var outResult;

            $.ajax({
                type: 'GET',
                url: serviceUrl,
                dataType: "json",
                async: false,
                cache: false,
                success: function (result) {
                    outResult = result;
                    ShowMsg("Class Average retrieved successfully.", true);
                },
                error: function (xhr, data, message) {
                    ShowMsg("Error while fetching Class Average. Please contact administrator.");
                }
            });
            return outResult;
        },
        GetUserScore: function () {
            var pageDt = _Navigator.Get();
            var totUserScore = 0, totMaxScore = 0;
            var userScorePerc = 0;

            $.each(pageDt, function (key, value) {
                if (!isNaN(value.userScore) && value.userScore != undefined && ((value.isQuestion != undefined && value.isQuestion == true) || (value.isCustomQuestion != undefined && value.isCustomQuestion == true))) {
                    totUserScore += Number(value.userScore);
                    totMaxScore += Number(value.maxScore);
                }
            });

            userScorePerc = Math.round((totUserScore / totMaxScore) * 100)

            var obj = {};
            obj.userScorePerc = userScorePerc;

            return obj;
        },
        GetSelectedOptionNumberForMulticheck: function () {
            var curPage = _Navigator.GetCurrentPage();
            var selectedOptID = [];
            var score = 0;
            for (var n21 = 0; n21 < $('.option-group').find("input").length; n21++) {
                var inputT = $('.option-group').find("input")[n21];
                if ($(inputT).prop("checked")) {
                    selectedOptID.push($(inputT).attr("opt_id"));
                }
            }
            var selOptString = selectedOptID[0] + "_" + selectedOptID[1]
            if (selOptString == "option1_option2") {
                score = 1;
            }
            var obj = {};
            obj.selOption = selOptString;
            obj.iscorrect = score;
            return obj;
        },

        GetRandomPageId: function () {
            var pageId = '';
            if (_currentPageObject.pageId == 'l1p2') { //Q1
                var _ctrlId = _currentPageObject.StudSelOption;
                switch (_ctrlId) {
                    case 'option1':
                        _nxtPgId = 'l1p3';

                        break;
                    case 'option2':
                        _nxtPgId = 'l1p4';
                        break;
                    case 'option3':
                        _nxtPgId = 'l1p5';
                        break;
                }
                pageId = _nxtPgId;
            } else if (_currentPageObject.pageId == 'l1p8') { //Q4
                var _ctrlId = _currentPageObject.StudSelOption;
                switch (_ctrlId) {
                    case 'option1':
                        _nxtPgId = 'l1p9';
                        break;
                    case 'option2':
                        _nxtPgId = 'l1p10';
                        break;
                    case 'option3':
                        _nxtPgId = 'l1p11';
                        break;
                }
                pageId = _nxtPgId;
            }

            return pageId;
        },
        //end
        //Save common module specific data
        GetModuleCommonData: function () { },
        GetProgressLevelNumber: function (_qNo, _curPLevel, _optNo) {
            if (_qNo == 2) {
                if (_optNo == 1) {

                }
            }
        },
        RandomFromArray: function (arr) {
            return arr.pgid[Math.floor(Math.random() * arr.pgid.length)];
        },
        LongestPath: function (NodeTree, startNode) {
            var paths = [];
            function findAllPaths(startNode, currentCost, optionCost, pathstr) {
                for (var i = 0; i < startNode.options.length; i++) {
                    var child = startNode.options[i];
                    if (child.NextPgId == null) {
                        paths.push({
                            TotalLength: currentCost,
                            TotalOptionCount: optionCost,
                            Path: pathstr
                        });
                    } else {
                        var optCost = startNode.isQuestion == true ? optionCost + 1 : optionCost;
                        findAllPaths(NodeTree[child.NextPgId], currentCost + 1, optCost, pathstr + "-" + child.NextPgId);
                    }
                }
                pathstr = "";
            }
            findAllPaths(startNode, 1, 0, startNode.pageId + "");
            function getMax(arr, prop) {
                var max;
                for (var i = 0; i < arr.length; i++) {
                    if (!max || parseInt(arr[i][prop]) > parseInt(max[prop]))
                        max = arr[i];
                }
                return max;
            }
            return getMax(paths, 'TotalLength');
        }
        //end
    }

})();

$(document).on("click", "#linkprevious", function (event) {
    if ($(this).k_IsDisabled()) return;
    $("#linkprevious").k_disable();
    _Navigator.Prev();
});
$(document).on("click", "#linknext", function (event) {
    if ($(this).k_IsDisabled()) return;
    $("#linknext").k_disable();
    _Navigator.Next();
});

function ShowMsg(whatMsg, shouldHide) {
    return;
    $("#Messanger").text(whatMsg)
    $("#Messanger").fadeIn(500);
    if (shouldHide) {
        setTimeout('$("#Messanger").fadeOut(500)', 3000)
    }

}
function removeCSS(cssFileToRemove) {
    for (var w = 0; w < document.styleSheets.length; w++) {
        if (document.styleSheets[w].href.indexOf(cssFileToRemove) != -1) {
            document.styleSheets[w].disabled = true;
        }
    }
}
function addCSS(cssFileToAdd) {
    var isCSSAlreadyAdded = false;
    for (var w = 0; w < document.styleSheets.length; w++) {
        if (document.styleSheets[w].href.indexOf(cssFileToAdd) != -1) {
            isCSSAlreadyAdded = false;
        }
    }
    console.log(isCSSAlreadyAdded + " --")
    if (!isCSSAlreadyAdded) {
        var newlink = document.createElement("link");
        newlink.setAttribute("rel", "stylesheet");
        newlink.setAttribute("type", "text/css");
        newlink.setAttribute("href", cssFileToAdd);
        document.getElementsByTagName("head").item(0).appendChild(newlink);
    }
}
//RA-11Oct18 - Branching logic change

//Objective Definitions- Pls do not add other code to this block
var ObjectiveDefinitions = [
    {
        Id: "1",
        CustomTarget: "qualsims/management/fom_planning/shwom4e",
        Title: "shwom4e",
        ObjectiveDetails: [
            {
                Id: "LO1",
                Name: "SQ 6.1",
                TargetLink: "",
                Title: "How should you analyze and plan a bad-news message?",
                PageIds: ['l1p2']
            },
             {
                Id: "LO2",
                Name: "SQ 6.2",
                TargetLink: "",
                Title: "What are effective strategies for composing bad-news messages? ",
                PageIds: ['l1p3', 'l1p4', 'l1p5', 'l1p7', 'l1p9', 'l1p10', 'l1p11', 'l1p12', 'l1p13', 'l1p14', 'l1p15', 'l1p16', 'l1p17','l1p19']
            }  
        ]
    },
    
{
    Id: "2",
    CustomTarget: "qualsims/management/fom_planning/boveethill13e ",
    Title: "",
    ObjectiveDetails: [
    {
        Id: "LO1",
        Name: "LO 10.1",
        TargetLink: "",
        Title: "Apply the three-step writing process to negative messages.",
        PageIds: ['l1p2']
    },
     {
         Id: "LO2",
         Name: "LO 10.2",
         TargetLink: "",
         Title: "Explain how to use the direct approach effectively when conveying negative news.",
         PageIds: ['l1p3','l1p5']
     },
     {
         Id: "LO3",
         Name: "LO 10.3",
         TargetLink: "",
         Title: "Explain how to use the indirect approach effectively when conveying negative news.",
         PageIds: ['l1p4']
     },
     {
         Id: "LO4",
         Name: "LO 10.5",
         TargetLink: "",
         Title: "Describe successful strategies for sending negative messages on routine business matters.",
         PageIds: ['l1p9', 'l1p10', 'l1p11', 'l1p12', 'l1p13', 'l1p14', 'l1p15', 'l1p16', 'l1p17','l1p19']
     }        
]
},
{
    Id: "3",
    CustomTarget: "qualsims/management/fom_planning/boveethill8e",
    Title: "",
    ObjectiveDetails: [
        {
            Id: "LO1",
            Name: "LO 8.1",
            TargetLink: "",
            Title: "Apply the three-step writing process to negative messages.",
            PageIds: ['l1p2']
        },
         {
             Id: "LO2",
             Name: "LO 8.2",
             TargetLink: "",
             Title: "Explain how to use the direct approach effectively when conveying negative news.",
             PageIds: ['l1p3', 'l1p5']
         },
         {
             Id: "LO3",
             Name: "LO 8.3",
             TargetLink: "",
             Title: "Explain how to use the indirect approach effectively when conveying negative news.",
             PageIds: ['l1p4' ]
         },
         {
             Id: "LO4",
             Name: "LO 8.4",
             TargetLink: "",
             Title: "Describe successful strategies for sending negative messages on routine business matters.",
             PageIds: ['l1p9', 'l1p10', 'l1p11', 'l1p12', 'l1p13', 'l1p14', 'l1p15', 'l1p16', 'l1p17', 'l1p19']
         }
    ]
},
{
    Id: "4",
    CustomTarget: "qualsims/management/fom_planning/boveethill14e",
    Title: "",
    ObjectiveDetails: [
        {
            Id: "LO1",
            Name: "LO 11.1",
            TargetLink: "",
            Title: "Apply the three-step writing process to negative messages.",
            PageIds: ['l1p2']
        },
         {
             Id: "LO2",
             Name: "LO 11.2",
             TargetLink: "",
             Title: "Explain how to use the direct approach effectively when conveying negative news.",
             PageIds: ['l1p3', 'l1p5']
         },
         {
             Id: "LO3",
             Name: "LO 11.3",
             TargetLink: "",
             Title: "Explain how to use the indirect approach effectively when conveying negative news.",
             PageIds: ['l1p4']
         },
         {
             Id: "LO4",
             Name: "LO 11.5",
             TargetLink: "",
             Title: "Describe successful strategies for sending negative messages on routine business matters.",
             PageIds: ['l1p9', 'l1p10', 'l1p11', 'l1p12', 'l1p13', 'l1p14', 'l1p15', 'l1p16', 'l1p17', 'l1p19']
         }
    ]
}
]

function updateLearningObjectives(isSummary) {
    debugger;
    for (var k = 0; k < ObjectiveDefinitions.length; k++) {
       var userName = ObjectiveDefinitions[k].CustomTarget.split("/")[ObjectiveDefinitions[k].CustomTarget.split("/").length - 1];
        if (userName == "shwom4e") {
            var objDefLength = ObjectiveDefinitions[k].ObjectiveDetails.length;
            if (isSummary) {
                for (var n = 0; n < objDefLength; n++) {
                    var objDefIDLength = ObjectiveDefinitions[k].ObjectiveDetails[n].PageIds.length;
                    for (var p = 0; p < objDefIDLength; p++) {
                        var pageID = ObjectiveDefinitions[k].ObjectiveDetails[n].PageIds[p];
                        if (ObjectiveDefinitions[k].ObjectiveDetails[n].TargetLink == "") {
                            var tempPHtml = '<div class="LOResultPMain"><div class="LOResultName"><p><strong>' + ObjectiveDefinitions[k].ObjectiveDetails[n].Name + ': </strong>' + ObjectiveDefinitions[k].ObjectiveDetails[n].Title + '</p><br></div><div class="LOResulteText"><p>Read more about it in the eText</p></div></div >';

                        } else {
                            var tempPHtml = '<div class="LOResultPMain"><div class="LOResultName"><p><strong>' + ObjectiveDefinitions[k].ObjectiveDetails[n].Name + ': </strong>' + ObjectiveDefinitions[k].ObjectiveDetails[n].Title + '</p><br></div><div class="LOResulteText"><p><a class="objLink" style="color: #000;" target="_blank" href="' + ObjectiveDefinitions[k].ObjectiveDetails[n].TargetLink + '">Read more about it in the eText</a></p></div></div >';
                        }
                        $("div[LOquesid=" + pageID + "]").append(tempPHtml);
                    }
                }                
            } else {
                var tempLOHtml = "<nav><ul>"
                for (var n = 0; n < objDefLength; n++) {
                    tempLOHtml += "<li><strong>" + ObjectiveDefinitions[k].ObjectiveDetails[n].Name + ": </strong>" + ObjectiveDefinitions[k].ObjectiveDetails[n].Title + "</li>";
                }
                tempLOHtml += "</ul></nav>"
                $(".pagedesc-1").find("nav").remove();
                $(".resultPageDesc").find("nav").remove();
                $(".pagedesc-1").append(tempLOHtml);
                $(".resultPageDesc").append(tempLOHtml);
            }
        }        
    }
}
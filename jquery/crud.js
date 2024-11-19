$(function () {
    var userdetails1 = new Array();
    $("#edit,#e1,#e2,#e3").hide();

    var txt1 = $("#x1");
    var txt2 = $("#x2");
    var txt3 = $("#x3");

    var e1 = $("#e1");
    var e2 = $("#e2");
    var e3 = $("#e3");

    function calculateage(dob) {
        var d = new Date();
        return d.getFullYear() - dob.split("-")[0];
    }

    function getuserdetails1() {
        var userdetails1 = localStorage.getItem("userdetails1");
        var counter = 0;
        if(userdetails1!==null){
            userdetails1 = JSON.parse(userdetails1);
            $(".userdata").html("");
        
        userdetails1 && userdetails1.length > 0 && $.each(userdetails1, function (i, { name, age, dob, place }) {
            $(".userdata").append(`
              <tr id="${counter}">
                        <td>${name}</td>
                        <td>${dob}</td>
                       <td>${age}</td>
                      <td>${place}</td>
                   <td class="edit"><img src="https://cdn1.iconfinder.com/data/icons/material-core/18/create-1024.png" alt="" style="width: 25px; height: 25px; "></td>
                    <td class="delete"><img src="https://cdn4.iconfinder.com/data/icons/navigation-40/24/cross-1024.png " alt="" style="width: 30px; height: 30px; "></td>
                </tr>
                
                `)
                counter++;

        })

    }
}

getuserdetails1();

    $("#add").click(function () {

        (txt1.val() == "") ? (e1.show().addClass("text-danger")) : (e1.hide());
        (txt2.val() == "") ? (e2.show().addClass("text-danger")) : (e2.hide());
        (txt3.val() == "") ? (e3.show().addClass("text-danger")) : (e3.hide());

        if (txt1.val() != "" && txt2.val() != "" && txt3.val() != "") {
            var userage = calculateage(txt2.val());
            var userobj = {
                name: txt1.val(),
                dob: txt2.val(),
                place: txt3.val(),
                age: userage

            }

            var userdetails = localStorage.getItem("userdetails1")
            console.log(userdetails);

            if (userdetails === null) {
                userdetails1.push(userobj);
                    
                var datatostore = JSON.stringify(userdetails1);
                console.log(datatostore);
                localStorage.setItem("userdetails1", datatostore);
            }
            else {
                  console.log("2nd record onward");
                  console.log(userdetails);
                  
                  var arr = JSON.parse(userdetails);
                  console.log(arr);

                  arr.push(userobj);
                  var datatostore = JSON.stringify(arr);
                  console.log(datatostore);
                  localStorage.setItem("userdetails1", datatostore);
            }

            // userdetails.push(userobj);
            txt1.val("");
            txt2.val("");
            txt3.val("");
            $(".errmsg").text("user Added").addClass("alert alert-success");
            setTimeout(function () {
                $(".errmsg").fadeOut();
            }, 3000)
            getuserdetails1();

        }
    });
    txt1.bind("blur keyup", function () {
        (txt1.val() == "") ? (e1.show().addClass("text-danger")) : (e1.hide());
    })
    txt2.bind("blur change", function () {
        (txt2.val() == "") ? (e2.show().addClass("text-danger")) : (e2.hide());
    })
    txt3.bind("blur keyup", function () {
        (txt3.val() == "") ? (e1.show().addClass("text-danger")) : (e3.hide());
    })

    $(document).on("click",".delete",function(){
        // console.log($(this));
        // console.log($(this).parent());
        // $(this).parent().remove();
        var id = $(this).parent().attr("id");
        console.log(id);

        var userdetails1 = localStorage.getItem("userdetails1");
        var userdetails1 = JSON.parse(userdetails1);

        // userdetails1.filter(obj=>{
        //     console.log(obj);
        // })
        // userdetails1.filter((obj,i)=>{
        //     console.log(i);
        // })
        
        var finaloutput = userdetails1.filter((obj,i)=> i!=id);
        console.log(finaloutput);

        localStorage.setItem("userdetails1", JSON.stringify(finaloutput));
        $(this).parent().remove();
    });

    $(document).on("click",".edit",function(){
        console.log($(this));
        console.log($(this).prev().text());
        console.log($(this).prev().prev().prev().text());
        console.log($(this).prev().prev().prev().prev().text());

        var name = $(this).prev().prev().prev().prev().text()
        var dob = $(this).prev().prev().prev().text()
        var place = $(this).prev().text();
        txt1.val(name);
        txt2.val(dob);
        txt3.val(place);
        $("#edit").show();
        $("#add").hide();

    });
    $(document).on("click","#edit",function(){
        var userage = calculateage(txt2.val());
        var userobj = {
            name:txt1.val(),
            dob:txt2.val(),
            place:txt3.val(),
            age:userage
        }
        console.log(userobj);

        
       
    })

});

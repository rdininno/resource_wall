$(() => {
  $(".loginButton").click(function () {
    $(".loginButton").css("display", "none");
    $(".userLogin").css("display", "block");
  });

  $(".userButton").on("click", function (e) {
    const user_id = $(e.target).val();
    $.post(`/users/set/${user_id}`).then(() => {
      location.reload();
    });
    // $.ajax({
    //   type: "GET",
    //   url: `/users`,
    //   success: function () {
    //     $(".home_title").text("My Resources");
    //     // if (window.location.pathname === "/") {
    //     //   $.ajax({
    //     //     type: "GET",
    //     //     url: "/",
    //     //   });
    //     // }
    //     loadResources();
    //   },
    // });

    // $(".userLogin").css("display", "none");
  });

  $(".logout").click(function () {
    $.post("/users/logout").then(() => {
      location.reload();
    });

    // $.ajax({
    //   type: "GET",
    //   url: `/users`,
    //   success: function () {
    //     $(".home_title").text("My Resources");
    //     loadResources();
    //   },
    // });
    $(".logout").css("display", "none");
    $(".loginButton").css("display", "block");
  });
});

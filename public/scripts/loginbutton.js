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
  });

  $(".logout").click(function () {
    $.post("/users/logout").then(() => {
      window.location = `/explore`;
    });
  });
});

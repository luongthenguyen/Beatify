$(".message a").click(function () {
  $("form").animate({ height: "toggle", opacity: "toggle" }, "slow");
});

$(document).ready(function () {
  $("#registerBtn").on("click", function (e) {
    e.preventDefault();
    validateRegisterForm();
  });

  $("#loginBtn").on("click", function (e) {
    e.preventDefault();
    validateLoginForm();
  });
});

function validateRegisterForm() {
  var fullName = $("#fullName").val().trim();
  var username = $("#username").val().trim();
  var email = $("#email").val().trim();
  var password = $("#password").val().trim();
  var hasError = false;

  // Kiểm tra dữ liệu đầu vào trước khi thực hiện các kiểm tra khác
  if (fullName === "") {
    alert("Tên của người dùng không được để trống!");
    $("#fullName").focus().addClass("error");
    hasError = true;
    return;
  }

  if (username === "") {
    alert("Tên tài khoản không được bỏ trống!");
    $("#username").focus().addClass("error");
    hasError = true;
    return;
  }

  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email) || email === "") {
    alert("Email phải có định dạng :(abc123@gmail.com)");
    $("#email").focus().addClass("error");
    hasError = true;
    return;
  }

  if (password === "") {
    alert("Mật khẩu không được bỏ trống!");
    $("#password").focus().addClass("error");
    hasError = true;
    return;
  }

  console.log("No errors, submitting form.");

  // Lấy dữ liệu từ Local Storage và kiểm tra
  var userData = JSON.parse(localStorage.getItem("userData"));

  if (!Array.isArray(userData)) {
    // Nếu userData không phải là một mảng, tạo một mảng mới
    userData = [];
  }

  // Kiểm tra xem email hoặc username đã tồn tại hay chưa
  var emailExists = userData.some(function (user) {
    return user.email === email;
  });

  var usernameExists = userData.some(function (user) {
    return user.username === username;
  });

  if (emailExists) {
    alert("Email đã tồn tại. Vui lòng nhập email khác.");
    $("#email").focus().addClass("error");
    return;
  }

  if (usernameExists) {
    alert("Username đã tồn tại. Vui lòng chọn username khác.");
    $("#username").focus().addClass("error");
    return;
  }

  // Nếu không có lỗi, tiến hành lưu thông tin tài khoản vào Local Storage
  var newUserData = {
    fullName: fullName,
    username: username,
    email: email,
    password: password,
  };

  userData.push(newUserData);
  localStorage.setItem("userData", JSON.stringify(userData));

  // Hiển thị thông báo thành công
  alert("Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.");

  // Xóa dữ liệu trong các trường nhập
  $("#fullName").val("");
  $("#username").val("");
  $("#email").val("");
  $("#password").val("");

  // Ẩn form đăng ký và hiển thị form đăng nhập
  $(".register-form").hide();
  $(".login-form").show();
}

function validateLoginForm() {
  var username = $("#loginUsername").val().trim();
  var password = $("#loginPassword").val().trim();
  var userData = JSON.parse(localStorage.getItem("userData"));

  var user = userData.find(function (user) {
    return user.username === username && user.password === password;
  });
  var hasError = false;

  if (username === "") {
    alert("Tên tài khoản không được bỏ trống!");
    $("#loginUsername").focus().addClass("error");
    hasError = true;
  } else {
    $("#loginUsername").removeClass("error");
  }

  if (password === "") {
    alert("Mật khẩu không được bỏ trống!");
    $("#loginPassword").focus().addClass("error");
    hasError = true;
  } else {
    $("#loginPassword").removeClass("error");
  }
  // Nêsu 1 trong 2 trường bị bỏ trống thì ngưng việc kiểm tra tinhs chính xác
  if (hasError) {
    return;
  }
  if (user) {
    // alert("Đăng nhập thành công!");
    window.location.href = "Home.html";
  } else {
    alert("Tên người dùng hoặc mật khẩu không chính xác. Vui lòng thử lại.");
  }
  if (!hasError) {
    console.log("No errors, submitting form.");
    $("#login-form").submit();
  }
}

$(document).ready(function () {
  $("#loginBtn").on("click", function (e) {
    e.preventDefault();
    validateLoginForm();
  });
});

// Sự kiện khi ấn nút login bên trang Home.html
$(document).ready(function () {
  $("#dangnhap").on("click", function () {
    window.location.href = "index.html";
  });
});

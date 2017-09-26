$(function(){
    var verifyCode = new GVerify("v_container");
    
    particlesJS('particles', {
        "particles": {
        "number": {
            "value": 80,
            "density": {
            "enable": true,
            "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
            "width": 0,
            "color": "#000000"
            },
            "polygon": {
            "nb_sides": 5
            },
            "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
            }
        },
        "size": {
            "value": 5,
            "random": true,
            "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
            }
        }
        },
        "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
            "enable": true,
            "mode": "repulse"
            },
            "onclick": {
            "enable": true,
            "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
                    },
                "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
                },
                "repulse": {
                "distance": 200
                },
                "push": {
                "particles_nb": 4
                },
                "remove": {
                "particles_nb": 2
                }
            }
        },
        "retina_detect": true,
        "config_demo": {
        "hide_card": false,
        "background_color": "#b61924",
        "background_image": "",
        "background_position": "50% 50%",
        "background_repeat": "no-repeat",
        "background_size": "cover"
        }
    });

    $('.login-btn').on('click',function(e){
        checkForm(verifyCode);
    });
});

function checkForm(verifyCode){
    
    if(checkQCR(verifyCode)){
        validateUser();
    }else{
        $(".error").html("<p style='color:red;font-size:12px;'>验证码错误.</p>");
    }
}

var checkQCR = function(verifyCode){
    var res = verifyCode.validate(document.getElementById("code_input").value);
    if(res){
        return true;  
    }else{
        return false;
    }
}

var validateUser = function(){
    var username = $('#username').val();
    var password = $('#password').val();
    console.log(username);
    if(username != '' && password != ''){
        $.ajax({
            type: 'POST',
            url: '/signin',
            data: {
                username: username,
                password:password
            },
            timeout:3000, //超时时间
            success: function(result,status) {
                if(status == 'success'){ 
                    location.href = '/home';
                }
            },
            fail:function (err) {
                if(status == 'error'){ 
                    location.href = '/login';
                }
            }
        });
    }else{
        $(".error").html("<p style='color:red;font-size:12px;'>"+账号密码不能为空+"</p>");
    }
}

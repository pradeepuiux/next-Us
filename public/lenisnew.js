

const windowWidth = $(window).width(),
    lenis = new Lenis({
        duration: $(window).width() < 1200 ? siteLenisData.pageSpeed.mobile ?? 1 : siteLenisData.pageSpeed.desktop ?? 1.5
    });

function raf(e) {
    lenis.raf(e), requestAnimationFrame(raf)
}
lenis.on("scroll", e => {}), gsap.ticker.add(e => {
    lenis.raf(1e3 * e)
}), requestAnimationFrame(raf), window, document, jQuery, $(document).ready(function() {
    const e = new class {
        constructor() {
            this.startPage(), this.section1(), this.section2(), this.section3(), this.section4(), this.section5(), this.section6(), this.section7(), this.startMarquee(), this.video(), this.buttonsInit()
        }
        startPage() {
            0 === $(window).scrollTop() && gsap.to("#movement1", {
                y: this.getElementCenter("#lenisTopTitle3 strong", "#movement1").top,
                x: this.getElementCenter("#lenisTopTitle3 strong", "#movement1").left,
                width: this.checkWindowWidth() < 1200 ? 104 : 300,
                height: this.checkWindowWidth() < 1200 ? 104 : 300
            })
        }
        checkWindowWidth() {
            return $(window).width()
        }
        getElementCenter(e, t, o = !1, r = !1) {
            var e = $(e),
                t = $(t),
                i = e.width(),
                s = e.height(),
                n = r ? e.position() : e.offset(),
                i = n.left + i / 2 - t.width() / 2,
                t = n.top + s / 2 - t.height() / 2;
            return o ? r ? e.position() : e.offset() : {
                top: t,
                left: i
            }
        }
        init() {
            gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
        }
        showContent(e, o) {
            e.forEach((e, t) => {
                gsap.to(e, {
                    opacity: 1,
                    startAt: {
                        opacity: 0 - t / 2
                    },
                    ease: "none",
                    scrollTrigger: o
                })
            })
        }
        getDistanceBetweenMouseElements(e, t) {
            const o = document.querySelector(t);
            var r = e.clientX,
                i = e.clientY,
                t = o.getBoundingClientRect(),
                e = t.left + t.width / 2,
                t = t.top + t.height / 2;
            return Math.sqrt((r - e) ** 2 + (i - t) ** 2)
        }
        section1() {
            this.init();
            var e = document.querySelector("#lenisTopTitle1"),
                t = document.querySelector("#lenisTopTitle2"),
                o = {
                    trigger: "#lenisTop2",
                    start: "top top",
                    end: "center top",
                    scrub: !0
                };
            gsap.to("#lenisTop1", {
                ease: "none",
                startAt: {
                    y: 0
                },
                scrollTrigger: {
                    trigger: "#lenisTop2",
                    start: "bottom bottom",
                    end: "bottom top",
                    scrub: !0
                }
            }), gsap.to(e, {
                y: "-100%",
                opacity: -2,
                ease: "none",
                scrollTrigger: o
            }), gsap.to(t, {
                y: "-100%",
                opacity: 1,
                ease: "none",
                scrollTrigger: o
            }), gsap.to(".lenisTop_desciription-scroll", {
                y: "-100%",
                opacity: -2,
                ease: "none",
                scrollTrigger: o
            }), gsap.to("#movement1", {
                x: this.getElementCenter("#lenisTopTitle2 strong", "#movement1").left,
                y: this.getElementCenter("#lenisTopTitle3 strong", "#movement1").top - $(window).scrollTop(),
                width: this.checkWindowWidth() < 1200 ? 104 : 300,
                height: this.checkWindowWidth() < 1200 ? 104 : 300,
                startAt: {
                    x: this.getElementCenter("#lenisTopTitle1 strong", "#movement1").left,
                    y: this.getElementCenter("#lenisTopTitle3 strong", "#movement1").top - $(window).scrollTop(),
                    width: this.checkWindowWidth() < 1200 ? 104 : 300,
                    height: this.checkWindowWidth() < 1200 ? 104 : 300
                },
                ease: "none",
                scrollTrigger: o
            }), gsap.to("#lenisTop1", {
                opacity: 0,
                y: "-100vh",
                startAt: {
                    opacity: 1,
                    y: 0
                },
                ease: "none",
                scrollTrigger: {
                    trigger: "#lenisTop3",
                    start: "bottom bottom",
                    end: "bottom top",
                    scrub: !0,
                    onUpdate: e => {
                        1 <= e.progress ? ($("#lenisTop1").css("z-index", -1), $(".lenisAfter").css("z-index", 1)) : ($("#lenisTop1").css("z-index", 1), $(".lenisAfter").css("z-index", -1))
                    }
                }
            })
        }
       
        startMarquee() {
            const e = document.querySelectorAll(".lenisTeam_team");
            e.forEach(e => {
                const t = new Swiper(e, {
                    direction: "vertical",
                    slidesPerView: 3,
                    spaceBetween: 15,
                    simulateTouch: !1,
                    loop: !0,
                    speed: 2e3,
                    autoplay: {
                        delay: 0
                    }
                });
                t.autoplay.start()
            }), new Swiper(".lenisSlider_slider", {
                loop: !0,
                slidesPerView: 2.5,
                spaceBetween: 10,
                simulateTouch: !1,
                speed: 5e3,
                autoplay: {
                    delay: 0
                },
                breakpoints: {
                    420: {
                        slidesPerView: 3
                    },
                    1200: {
                        slidesPerView: 7
                    }
                }
            }), new Swiper(".lenisTop_images-swipper", {
                loop: !0,
                slidesPerView: 2.5,
                spaceBetween: 30,
                simulateTouch: !1,
                speed: 5e3,
                autoplay: {
                    delay: 0
                },
                breakpoints: {
                    1200: {
                        slidesPerView: 8,
                        spaceBetween: 30
                    }
                }
            })
        }
        video() {
            $(".video-play").modalVideo()
        }
        buttonsInit() {
            $(document).on("click", ".headerLenis_btn", function() {
                $(".popup").css("display", "flex"), $(".popup .form_form").removeClass("hide_popup"), $(".popup .form_form").addClass("show_popup"), $(".popup_xbtn").focus()
            }), $(document).on("click", ".lenisTop_next", function() {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: ".lenisAfter",
                    ease: "Power1.easeInOut"
                })
            }), setInterval(() => {
                $(".lenisSection_btn").addClass("skew_hover"), setTimeout(() => {
                    $(".lenisSection_btn").removeClass("skew_hover")
                }, 1e3)
            }, 3500)
        }
    };
    addEventListener("resize", e => {
        window.innerWidth !== windowWidth && setTimeout(() => {
            window.location.reload()
        }, 300)
    });
    let t = setInterval(() => {
        "complete" === document.readyState && (clearInterval(t), !window.localStorage.getItem("first-render") && e.checkWindowWidth() < 1200 ? (window.localStorage.setItem("first-render", !0), window.location.reload()) : setTimeout(() => {
            $(".lenisLoader").css("top", "-100vh"), setTimeout(() => {
                $(".lenisLoader").hide(), $(".lenisTop_desciription").addClass("show_description")
            }, 300)
        }, 500))
    }, 100)
});
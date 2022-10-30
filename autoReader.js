; (function () {
    var vHeight = window.getViewportSize().height
    var sHeight = window.getScrollSize().height
    var isPlay = false
    var t = null

    var AutoReader = function (opt) {
        this.playBtn = opt.playBtn
        this.sTopBtn = opt.sTopBtn

        var _self = this
        this.sTopBtn.addEventListener('click', function () {
            clearInterval(t)
            _self.playBtn.innerText = 'PLAY'
            window.scrollTo(0, 0)
        })

        window.addEventListener('scroll', function () {
            _self.sTopBtnShow.call(_self)
            var sTop = window.getScrollOffset().top
            if (sHeight <= vHeight + sTop + 5) {
                clearInterval(t)
                _self.playBtn.innerText = 'PLAY'
                _self.playBtn.style.display = 'none'
                _self.sTopBtn.style.bottom = '25px'
            } else {
                _self.playBtn.style.display = 'block'
                _self.sTopBtn.style.bottom = '100px'
            }
        })

        this.playBtn.addEventListener('click', function () {
            _self.autoRead.call(_self)
        })
    }
    AutoReader.prototype = {
        sTopBtnShow: function () {
            var sTop = getScrollOffset().top
            sTopBtn = this.sTopBtn
            this.sTopBtn.style.display = sTop ? 'block' : 'none'
        },
        autoRead: function () {
            var _self = this
            var sTop = window.getScrollOffset().top
            if (sHeight <= sTop + vHeight) return
            isPlay = !isPlay
            if (isPlay) {
                t = setInterval(() => {
                    var sTop = window.getScrollOffset().top
                    if (sHeight <= vHeight + sTop + 5) {
                        clearInterval(t)
                        _self.playBtn.style.display = 'none'
                        _self.sTopBtn.style.bottom = '25px'
                        isPlay = false
                    } else {
                        _self.playBtn.innerText = 'STOP'
                        window.scrollBy(0, 1)
                    }
                }, 10)
            } else {
                _self.playBtn.innerText = 'PLAY'
                clearInterval(t)
                return
            }

        }
    }
    // 构造函数给window让它变成全局的变量
    window.AutoReader = AutoReader
})();
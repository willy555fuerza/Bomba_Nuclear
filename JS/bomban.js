(function () {
    var elementoButton, tiempoDeClick, intervaloDeTiempo;
  
    var duracionDeClick = 5000;
    var inicioDeClick = null;
  
    function cuandoseActivepronto() {
      elementoButton = document.querySelector(".seguro_para_armar");
      elementoButton.addEventListener("click", ClickNoButton);
      elementoButton.addEventListener("click", ClickLentoNoButton);
      elementoButton.addEventListener("mousedown", cuandoOButtonMouseBajar);
      elementoButton.addEventListener("mouseup", cuandoButtonMouseSubir);
      elementoButton.addEventListener("mouseleave", cuandoMouseSalir);
    }
  
    function cuandoMouseSalir(e) {
      cancelarClickLento(e);
    }
  
    function cuandoButtonMouseSubir(e) {
      cancelarClickLento(e);
    }
  
    function cuandoOButtonMouseBajar(e) {
      iniciarClickLento(e);
    }
  
    function iniciarClickLento(e) {
      inicioDeClick = Date.now();
  
      clearTimeout(tiempoDeClick);
      tiempoDeClick = setTimeout(function () {
        completeSlowClick(e);
      }, duracionDeClick);
  
      clearInterval(intervaloDeTiempo);
      intervaloDeTiempo = setInterval(function () {
        continuarClickLento(e);
      }, 1000 / 60);
    }
  
    function continuarClickLento(e) {
      var tiempoDecorrido = Date.now() - inicioDeClick;
      var intervalo = tiempoDecorrido / duracionDeClick;
      var porcentaje = (intervalo * 100).toFixed(4) + "%";
      var gradienteDeColores = [
        "rgba(246, 0, 4, .8)",
        "rgba(246, 0, 4, 0.8) " + porcentaje,
        "transparent " + porcentaje,
      ];
  
      var classeParaSacudir = "";
      if (intervalo > 0.05) {
        classeParaSacudir = "shake shake-little";
      }
      if (intervalo > 0.33) {
        classeParaSacudir = "shake";
      }
      if (intervalo > 0.75) {
        classeParaSacudir = "shake shake-hard";
      }
  
      e.target.className =
        "seguro_para_armar shake-constant " + classeParaSacudir;
  
      e.target.style.backgroundImage =
        "linear-gradient(to right, " + gradienteDeColores.join(", ") + " )";
    }
  
    function completeSlowClick(e) {
      continuarClickLento(e);
      var click = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      click.slowClick = true;
      e.target.dispatchEvent(click);
      finalClick(e);
    }
  
    function cancelarClickLento(e) {
      finalClick(e);
    }
  
    function finalClick(e) {
      e.target.style.background = null;
      e.target.className = "seguro_para_armar shake-constant";
      clearTimeout(tiempoDeClick);
      clearInterval(intervaloDeTiempo);
    }
  
    function ClickNoButton(e) {
      if (e.slowClick !== true) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
      }
    }
  
    function ClickLentoNoButton(e) {
      window.location.href = "https://i.imgur.com/rU7rGx7.mp4";
    }
  
    document.addEventListener("DOMContentLoaded", cuandoseActivepronto);
  })();
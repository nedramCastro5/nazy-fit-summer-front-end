<template>
  <footer class="footer">
    <div class="footer-content">

      <div class="footer-section">
        <h3 class="footer-title">Nazy Fit Summer</h3>
        <p class="footer-description">
          My fit nasceu em meio a dor, a dor de uma mulher que precisou se reencontrar 
          quando se viu perdida, quando se olhava no espelho e já não sabia mais quem era. 
          My fit foi criado para trazer vida, cura e transformação.
        </p>
      </div>

      <div class="footer-grid">

        <div class="footer-section">
          <h4 class="footer-subtitle">Saiba Mais</h4>
          <ul class="footer-links">
            <li><a href="#">Quem Somos</a></li>
            <li><a href="#">Perguntas Frequentes</a></li>
            <li><a href="#">Trocas e Devoluções</a></li>
            <li><a href="#">Política de Fretes</a></li>
            <li><a href="#">Política de Privacidade</a></li>
            <li><a href="#">Como Comprar</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4 class="footer-subtitle">Atendimento</h4>
          <ul class="footer-hours">
            <li>Seg a Qui: 09:00 - 17:00</li>
            <li>Sexta: 09:00 - 16:00</li>
            <li class="closed">Sábados, Domingos e Feriados: Fechado</li>
          </ul>
        </div>

        <div class="footer-section">
          <h4 class="footer-subtitle">Pagamento</h4>
          <div class="payment-list">
            <div class="payment-item">
              <span class="dot mpesa"></span>
              <span>M-Pesa (Vodacom)</span>
            </div>
            <div class="payment-item">
              <span class="dot emola"></span>
              <span>Emola (Movitel)</span>
            </div>
            <div class="payment-item">
              <span class="dot standard"></span>
              <span>Standard Bank</span>
            </div>
          </div>

          <h4 class="footer-subtitle shipping-title">Meios de envio</h4>
          <div class="shipping">
            <span class="shipping-dot"></span>
            <span class="shipping-dot"></span>
          </div>
        </div>

      </div>
    </div>

    <div class="footer-bottom">
      <span>Nazy Fit Summer - Todos os direitos reservados</span>
    </div>

    <div class="footer-credits">
      <p>criado por CodeLink - 2026.</p>
    </div>
  </footer>
</template>

<style scoped>

.footer{
  background: #d6336c;
  color: #eee;
  padding: 40px 10%;
  font-size: 14px;
}

.footer-content{
  max-width: 1200px;
  margin: auto;
}

.footer-grid{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 30px;
}

.footer-section{
  display: flex;
  flex-direction: column;
}

.footer-title{
  font-size: 18px;
  margin-bottom: 10px;
}

.footer-subtitle{
  font-size: 15px;
  margin-bottom: 10px;
}

.footer-description{
  color: #ccc;
  line-height: 1.5;
}

.footer-links{
  list-style: none;
  padding: 0;
}

.footer-links li{
  margin-bottom: 6px;
}

.footer-links a{
  color: #ccc;
  text-decoration: none;
}

.footer-links a:hover{
  text-decoration: underline;
}

.footer-hours{
  list-style: none;
  padding: 0;
}

.closed{
  color: #c0a5a5;
}

.payment-list{
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.payment-item{
  display: flex;
  align-items: center;
  gap: 6px;
}

.dot{
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.mpesa{ background: green; }
.emola{ background: orange; }
.standard{ background: blue; }

.shipping{
  display: flex;
  gap: 6px;
  margin-top: 5px;
}

.shipping-dot{
  width: 12px;
  height: 12px;
  background: #ccc;
  border-radius: 50%;
}

.footer-bottom{
  margin-top: 30px;
  border-top: 1px solid #333;
  padding-top: 15px;
  text-align: center;
}

.footer-credits{
  text-align: center;
  margin-top: 10px;
  font-size: 12px;
  color: #aaa;
}

@media (max-width: 768px){
  .footer-grid{
    grid-template-columns: 1fr;
  }
}

</style>
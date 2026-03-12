function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("show");
}

document.addEventListener('click', function (event) {
  const menu = document.getElementById('menu');
  const button = document.querySelector('.menu-toggle');

  const clickedOutside = !menu.contains(event.target) && !button.contains(event.target);

  if (clickedOutside && menu.classList.contains('show')) {
    menu.classList.remove('show');
  }
});

document.querySelectorAll('#menu a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('menu').classList.remove('show');
  });
});

const contatoForm = document.querySelector('#contato form');
if (contatoForm) {
  contatoForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const dados = {
      nome: formData.get('nome'),
      email: formData.get('email'),
      conteudo: formData.get('mensagem')
    };

    //console.log(dados)

    try {
      const resposta = await fetch('save_message.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
      });

      const resultado = await resposta.json();
      alert(resultado.mensagem);
      this.reset(); // Limpa o formulário após envio
    } catch (erro) {
      console.error('Erro ao enviar:', erro);
      alert('Erro ao enviar a mensagem.');
    }

  });
}

let currentFontSizeRem = 1.0;

function changeFontSize(step) {
  const contentSection = document.getElementById('sobre');
  if (!contentSection) return;

  currentFontSizeRem += step;

  if (currentFontSizeRem < 0.8) currentFontSizeRem = 0.8;
  if (currentFontSizeRem > 2.5) currentFontSizeRem = 2.5;

  contentSection.style.fontSize = `${currentFontSizeRem}rem`;
}

function resetFontSize() {
  const contentSection = document.getElementById('sobre');
  if (!contentSection) return;

  currentFontSizeRem = 1.0;
  contentSection.style.fontSize = `1rem`;
}
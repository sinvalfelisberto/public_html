<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

// Dados extraídos do arquivo externo seguro
require_once 'config.php';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['mensagem' => 'Erro ao conectar: ' . $conn->connect_error]);
    exit;
}

// Receber dados JSON
$dados = json_decode(file_get_contents("php://input"), true);
$nome = $dados['nome'] ?? '';
$conteudo = $dados['conteudo'] ?? '';
$email = $dados['email'] ?? '';

// Validação
if (empty($nome) || empty($conteudo) || empty($email)) {
    http_response_code(400);
    echo json_encode(['mensagem' => 'Campos obrigatórios não enviados.']);
    exit;
}

// Inserção segura
$stmt = $conn->prepare("INSERT INTO message (nome, email, conteudo) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $nome, $email, $conteudo);
$stmt->execute();
//enviarMensagemAnteriorPorEmail($conn, "sinval@dominio.com");
if ($stmt->affected_rows > 0) {
    echo json_encode(['mensagem' => 'Mensagem enviada com sucesso!']);
} else {
    http_response_code(500);
    echo json_encode(['mensagem' => 'Erro ao salvar a mensagem.']);
}

$stmt->close();
$conn->close();

function enviarMensagemAnteriorPorEmail($conn, $emailDestino) {
    // Recupera o ID da última mensagem salva
    $resultadoUltima = $conn->query("SELECT id FROM message ORDER BY id DESC LIMIT 1");
    
    if ($resultadoUltima && $rowUltima = $resultadoUltima->fetch_assoc()) {
        $idUltima = (int) $rowUltima['id'];
        $idAnterior = $idUltima - 1;

        // Busca o registro anterior
        $resultadoAnterior = $conn->query("SELECT nome, email, conteudo, data_envio FROM message WHERE id = $idAnterior");

        if ($resultadoAnterior && $rowAnterior = $resultadoAnterior->fetch_assoc()) {
            $nome = $rowAnterior['nome'];
            $email = $rowAnterior['email'];
            $conteudo = $rowAnterior['conteudo'];
            $dataEnvio = $rowAnterior['data_envio']; // Assumindo que há uma coluna 'data_envio'

            // Monta o conteúdo do e-mail
            $assunto = "Mensagem anterior registrada";
            $mensagem = "Mensagem anterior recebida:\n\n";
            $mensagem .= "Nome: $nome\n";
            $mensagem .= "Email: $email\n";
            $mensagem .= "Data/Hora: $dataEnvio\n";
            $mensagem .= "Conteúdo:\n$conteudo";

            // Cabeçalhos
            $headers = "From: notificador@seudominio.com\r\n";
            $headers .= "Reply-To: notificador@seudominio.com\r\n";
            $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

            // Envia o e-mail
            if (mail($emailDestino, $assunto, $mensagem, $headers)) {
                return true;
            } else {
                error_log("Erro ao enviar o e-mail da mensagem anterior.");
            }
        }
    }

    return false;
}

?>


<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);

// PHPMailer-Klassen einbinden
require_once('PHPMailer/Exception.php');
require_once('PHPMailer/PHPMailer.php');
require_once('PHPMailer/SMTP.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json');

// CORS-Header hinzufügen, falls nötig
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

// Honeypot-Feldname
$honeypotField = "honeypot"; // Passe den Namen des Honeypot-Felds an

// Formulardaten empfangen
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data)) {
    // Überprüfen, ob das Honeypot-Feld leer ist
    if (empty($data[$honeypotField])) {
        // Eingabedaten validieren und sanitizen
        $name = htmlspecialchars(trim($data['name']));
        $email = filter_var(trim($data['email']), FILTER_VALIDATE_EMAIL);
        $message = htmlspecialchars(trim($data['message']));
        $privacyPolicy = isset($data['privacyPolicy']) ? $data['privacyPolicy'] : false;

        if ($name && $email && $message && $privacyPolicy) {
            try {
                // PHPMailer initialisieren
                $mail = new PHPMailer(true);

                // SMTP-Einstellungen
                $mail->isSMTP();
                $mail->Host = 'host-004.gn2.hosting'; // SMTP-Server
                $mail->SMTPAuth = true;
                $mail->Username = 'formular@marc-braun.com'; // SMTP-Benutzername
                $mail->Password = 'kHyUzsLAUx9psZs'; // SMTP-Passwort
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
                $mail->Port = 465; // Port für SMTPS

                // Absender und Empfänger
                $mail->setFrom('formular@marc-braun.com', $name); // Absenderadresse und Name
                $mail->addAddress('formular@marc-braun.com'); // Empfängeradresse
                $mail->addReplyTo($email, $name);

                // Inhalt der E-Mail
                $mail->isHTML(false);
                $mail->Subject = 'Neue Nachricht von ' . $name;
                $mail->Body    = "Name: $name\nEmail: $email\nNachricht:\n$message";

                $mail->SMTPDebug = 0;

                $mail->send();
                echo json_encode(['success' => true, 'message' => 'Email sent successfully.']);
            } catch (Exception $e) {
                // Fehlermeldung zurückgeben
                echo json_encode(['success' => false, 'message' => 'Mailer Error: ' . $mail->ErrorInfo]);
            }
        } else {
            // Fehlende oder ungültige Eingabedaten
            echo json_encode(['success' => false, 'message' => 'Invalid input.']);
        }
    } else {
        // Honeypot-Feld wurde ausgefüllt - wahrscheinlich Spam
        echo json_encode(['success' => false, 'message' => 'Spam detected.']);
    }
} else {
    // Keine Daten empfangen
    echo json_encode(['success' => false, 'message' => 'No data received.']);
}
?>

/**
 * Servicio de generación de PDF usando la API de PDFShift.
 * Documentación: https://pdfshift.io/documentation
 * 
 * Este servicio envía HTML diseñado al servidor de PDFShift
 * y recibe un archivo PDF binario como respuesta.
 */

const PDFSHIFT_API_URL = 'https://api.pdfshift.io/v3/convert/pdf';
const PDFSHIFT_API_KEY = import.meta.env.VITE_PDFSHIFT_API_KEY;

/**
 * Genera el HTML del comprobante de cita con diseño premium.
 */
function generateAppointmentHTML({ clientName, service, date, time, notes, email }) {
  const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('es-CO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;600;700&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Outfit', sans-serif;
      background: #0a0a0a;
      color: #f5e9c8;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .container {
      max-width: 560px;
      width: 100%;
      margin: 0 auto;
    }

    .card {
      background: linear-gradient(145deg, #141210, #0d0b08);
      border: 2px solid rgba(153, 101, 21, 0.45);
      border-radius: 24px;
      padding: 3rem 2.5rem;
      box-shadow: 0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(201,148,42,0.15);
      position: relative;
      overflow: hidden;
    }

    .card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, transparent, #996515, #FFD700, #996515, transparent);
    }

    .brand {
      text-align: center;
      margin-bottom: 2rem;
    }

    .brand-icon {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      display: block;
    }

    .brand-name {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.2rem;
      font-weight: 700;
      color: #FFD700;
      letter-spacing: 1px;
    }

    .brand-sub {
      font-size: 0.85rem;
      color: rgba(255,255,255,0.35);
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-top: 0.25rem;
    }

    .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(201,148,42,0.5), transparent);
      margin: 1.5rem 0;
    }

    .status-badge {
      display: inline-block;
      background: rgba(39, 174, 96, 0.15);
      border: 1px solid rgba(39, 174, 96, 0.35);
      color: #2ecc71;
      padding: 0.4rem 1.25rem;
      border-radius: 50px;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 1.5rem;
    }

    .title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2rem;
      font-weight: 600;
      color: #f5e9c8;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .detail-grid {
      display: grid;
      gap: 1rem;
    }

    .detail-row {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1rem;
      background: rgba(255,255,255,0.03);
      border-radius: 12px;
      border: 1px solid rgba(153,101,21,0.15);
    }

    .detail-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(153,101,21,0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #c9942a;
      font-size: 1rem;
      flex-shrink: 0;
    }

    .detail-content {
      flex: 1;
    }

    .detail-label {
      font-size: 0.75rem;
      color: rgba(255,255,255,0.35);
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 0.2rem;
    }

    .detail-value {
      font-size: 1.05rem;
      color: #f5e9c8;
      font-weight: 600;
    }

    .notes-section {
      margin-top: 1rem;
      padding: 1rem;
      background: rgba(153,101,21,0.06);
      border-radius: 12px;
      border: 1px solid rgba(153,101,21,0.12);
    }

    .notes-label {
      font-size: 0.75rem;
      color: rgba(255,255,255,0.35);
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 0.4rem;
    }

    .notes-text {
      font-size: 0.95rem;
      color: rgba(255,255,255,0.6);
      font-style: italic;
      line-height: 1.6;
    }

    .footer {
      text-align: center;
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(153,101,21,0.15);
    }

    .footer-text {
      font-size: 0.85rem;
      color: rgba(255,255,255,0.3);
      line-height: 1.8;
    }

    .footer-highlight {
      color: #c9942a;
      font-weight: 600;
    }

    .footer-address {
      font-size: 0.8rem;
      color: rgba(255,255,255,0.25);
      margin-top: 0.5rem;
    }

    .timestamp {
      text-align: center;
      font-size: 0.7rem;
      color: rgba(255,255,255,0.15);
      margin-top: 1.5rem;
      letter-spacing: 1px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="brand">
        <span class="brand-icon">✦</span>
        <div class="brand-name">Essence De Toi</div>
        <div class="brand-sub">Salón &amp; Spa Premium</div>
      </div>

      <div class="divider"></div>

      <div style="text-align: center;">
        <span class="status-badge">✓ Cita Confirmada</span>
      </div>

      <h2 class="title">Comprobante de Cita</h2>

      <div class="detail-grid">
        <div class="detail-row">
          <div class="detail-icon">👤</div>
          <div class="detail-content">
            <div class="detail-label">Cliente</div>
            <div class="detail-value">${clientName}</div>
          </div>
        </div>

        <div class="detail-row">
          <div class="detail-icon">💆</div>
          <div class="detail-content">
            <div class="detail-label">Servicio</div>
            <div class="detail-value">${service}</div>
          </div>
        </div>

        <div class="detail-row">
          <div class="detail-icon">📅</div>
          <div class="detail-content">
            <div class="detail-label">Fecha</div>
            <div class="detail-value">${formattedDate}</div>
          </div>
        </div>

        <div class="detail-row">
          <div class="detail-icon">🕐</div>
          <div class="detail-content">
            <div class="detail-label">Hora</div>
            <div class="detail-value">${time}</div>
          </div>
        </div>

        <div class="detail-row">
          <div class="detail-icon">📧</div>
          <div class="detail-content">
            <div class="detail-label">Correo de Confirmación</div>
            <div class="detail-value">${email || 'N/A'}</div>
          </div>
        </div>
      </div>

      ${notes ? `
      <div class="notes-section">
        <div class="notes-label">Notas Adicionales</div>
        <div class="notes-text">"${notes}"</div>
      </div>
      ` : ''}

      <div class="footer">
        <p class="footer-text">
          ¡Gracias por confiar en <span class="footer-highlight">Essence De Toi</span>!<br>
          Te esperamos para consentirte.
        </p>
        <p class="footer-address">📍 Calle 123, Neiva, Huila, Colombia &nbsp;|&nbsp; 📞 +1 234 567 890</p>
      </div>

      <div class="timestamp">
        Generado el ${new Date().toLocaleString('es-CO')} · ID: ${Date.now().toString(36).toUpperCase()}
      </div>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Llama a la API de PDFShift para convertir el HTML en un PDF descargable.
 * @param {Object} appointmentData - Datos de la cita
 * @returns {Promise<Blob>} - Blob del archivo PDF
 */
export async function generateAppointmentPDF(appointmentData) {
  const html = generateAppointmentHTML(appointmentData);

  if (!PDFSHIFT_API_KEY || PDFSHIFT_API_KEY === 'tu_api_key_aqui') {
    throw new Error(
      'API Key de PDFShift no configurada. ' +
      'Regístrate en https://pdfshift.io y coloca tu key en el archivo .env como VITE_PDFSHIFT_API_KEY'
    );
  }

  const response = await fetch(PDFSHIFT_API_URL, {
    method: 'POST',
    headers: {
      'X-API-Key': PDFSHIFT_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      source: html,
      landscape: false,
      use_print: false,
      format: 'A4',
      margin: '20px',
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error('PDFShift Error:', errorData);
    throw new Error(`Error al generar el PDF (${response.status}). Verifica tu API Key.`);
  }

  return await response.blob();
}

/**
 * Descarga un Blob como un archivo en el navegador del usuario.
 */
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

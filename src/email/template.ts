export const createEmailTemplate = (data: {
  fullName: string;
  email: string;
  subject: string;
  description: string;
}) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form Submission</title>

  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <style>
    :root {
      color-scheme: light dark;
      supported-color-schemes: light dark;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #090b11;
      background: #f3f4f7;
      padding: 20px;
    }
    
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0px 4px 16px rgba(9, 11, 17, 0.08);
      border: 1px solid #c3cadb;
    }
    
    .header {
      background: linear-gradient(135deg, #0751cf, #3e8bff);
      padding: 32px 24px;
      text-align: center;
    }
    
    .header h1 {
      color: white;
      font-size: 24px;
      font-weight: 600;
      margin: 0;
    }
    
    .header p {
      color: rgba(255, 255, 255, 0.9);
      font-size: 14px;
      margin-top: 8px;
      font-weight: 400;
    }
    
    .content {
      padding: 32px 24px;
    }
    
    .field {
      margin-bottom: 24px;
    }
    
    .field:last-child {
      margin-bottom: 0;
    }
    
    .field-label {
      display: block;
      font-size: 14px;
      font-weight: 600;
      color: #0751cf;
      margin-bottom: 8px;
      letter-spacing: 0.5px;
    }
    
    .field-value {
      background: #f3f4f7;
      padding: 16px;
      border-radius: 12px;
      border: 1px solid #c3cadb;
      font-size: 16px;
      color: #090b11;
      white-space: pre-wrap;
      word-break: break-word;
      margin: 0;
    }
    
    .message-field .field-value {
      min-height: 120px;
    }
    
    .footer {
      background: #f3f4f7;
      padding: 20px 24px;
      text-align: center;
      border-top: 1px solid #c3cadb;
    }
    
    .footer p {
      color: #505d84;
      font-size: 13px;
      margin: 0;
    }
    
    @media (prefers-color-scheme: dark) {
      body {
        color: #f3f4f7;
        background: #090b11;
      }
      
      .container {
        background: #141925;
        border: 1px solid #3d4663;
        box-shadow: 0px 4px 16px rgba(255, 255, 255, 0.05);
      }
      
      .field-value {
        background: #283044;
        border: 1px solid #3d4663;
        color: #f3f4f7;
      }
      
      .footer {
        background: #283044;
        border-top: 1px solid #3d4663;
      }
      
      .footer p {
        color: #a3acc8;
      }
    }
    
    @media (max-width: 600px) {
      body {
        padding: 10px;
      }
      
      .container {
        border-radius: 12px;
      }
      
      .header {
        padding: 24px 16px;
      }
      
      .content {
        padding: 24px 16px;
      }
      
      .footer {
        padding: 16px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
      <p>Someone reached out through your portfolio</p>
    </div>
    
    <div class="content">
      <div class="field">
        <span class="field-label">From</span>
        <p class="field-value">${data.fullName}</p>
      </div>
      
      <div class="field">
        <span class="field-label">Email</span>
        <p class="field-value">${data.email}</p>
      </div>
      
      <div class="field">
        <span class="field-label">Subject</span>
        <p class="field-value">${data.subject}</p>
      </div>
      
      <div class="field message-field">
        <span class="field-label">Message</span>
        <p class="field-value">${data.description}</p>
      </div>
    </div>
    
    <div class="footer">
      <p>Sent from your portfolio contact form at dushmanta.dev</p>
    </div>
  </div>
</body>
</html>`;
};

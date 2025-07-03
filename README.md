# ----
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Meri Shahzadi Rukayya</title>
  <style>
    body {
      background: linear-gradient(to right, #ffd8ec, #ffe4e1);
      font-family: 'Segoe UI', sans-serif;
      text-align: center;
      padding: 30px;
    }

    h1 {
      color: #d63384;
      margin-bottom: 10px;
      font-size: 2rem;
    }

    .quote-box {
      background-color: #fff0f6;
      border-radius: 20px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.1);
      padding: 20px;
      margin: 20px auto;
      width: 90%;
      max-width: 600px;
    }

    .quote {
      font-size: 1.2rem;
      color: #6c757d;
      margin: 10px 0;
      font-style: italic;
    }

    .extra-msg {
      font-size: 1rem;
      color: #5a5a5a;
      margin-top: 10px;
    }

    .highlight {
      color: #d63384;
      font-weight: bold;
    }

    #faceContainer {
      position: relative;
      display: inline-block;
      margin-top: 30px;
    }

    #face {
      width: 200px;
      transition: transform 0.5s ease-in-out;
    }

    #fruit {
      position: absolute;
      top: 20px;
      left: -80px;
      width: 70px;
      transition: all 1s ease-in-out;
    }

    .open-mouth #face {
      transform: scaleY(1.1);
    }

    .open-mouth #fruit {
      left: 80px;
      top: 80px;
    }

    button {
      margin-top: 40px;
      padding: 12px 24px;
      font-size: 1.2rem;
      background-color: #ff4081;
      border: none;
      color: white;
      border-radius: 30px;
      cursor: pointer;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      transition: background-color 0.3s;
    }

    button:hover {
      background-color: #d63384;
    }

    footer {
      margin-top: 50px;
      font-size: 0.9rem;
      color: #555;
    }
  </style>
</head>
<body>

  <h1>Meri Shahzadi Rukayya 💖</h1>

  <div class="quote-box">
    <div class="quote">"Meri akhri khushi, meri pehli mohabbat – meri Rukayya 💖"</div>
    <div class="quote">"Tu hasi to zindagi haseen, tu royi to dil roye – meri akloti shahzadi 🌸"</div>
    <div class="extra-msg">
      🍑 <span class="highlight">Rukayya ka favourite fruit</span> – Nectarine!  
      <br>
      Aur dekh lo, fruit bhi kehta hai: <em>"Main bhi usi ke mooh mein jaana chahta hoon!"</em> 😂  
    </div>
    <div class="extra-msg">
      💌 <strong>Muzamil ka paighaam:</strong> <br>
      "Tere bina sab khaali lagta hai. Tu hai to sab kuch hai. Tu meri zindagi ki sabse meethi feeling hai – jaise ek nectar-filled fruit 🍑"
    </div>
    <div class="extra-msg">
      💫 Rukayya, tu sirf meri mohabbat nahi – meri *jaan*, meri *jaanat*, meri *jaaneman* hai ❤️
    </div>
  </div>

  <div id="faceContainer">
    <img id="face" src="https://res.cloudinary.com/dxjkbpmgm/image/upload/v1744658409/Picsart_25-04-14_00-56-51-907_ztwdk2.jpg" alt="Face of Rukayya">
    <img id="fruit" src="https://res.cloudinary.com/dxjkbpmgm/image/upload/v1751542439/nectarine-white-ss-600x441-1_nx5ivp.jpg" alt="Fruit">
  </div>

  <br>
  <button onclick="openMouth()">Mou Kholo 🍑</button>

  <footer>
    Designed with 💖 by Muzamil only for his one and only Rukayya 🌹
  </footer>

  <script>
    function openMouth() {
      const container = document.getElementById("faceContainer");
      container.classList.toggle("open-mouth");
    }
  </script>
</body>
</html>
